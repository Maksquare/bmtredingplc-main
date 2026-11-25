import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import {
  createSignedStaffToken,
  STAFF_SESSION_COOKIE,
} from "@/lib/auth/session";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

const AUTHORIZED_STAFF_EMAILS = new Set([
  "admin@bmtradingplc.com",
  "director@bmtradingplc.com",
  "operations@bmtradingplc.com",
  "info@bmtradingplc.com",
]);

function constantTimeMatch(input: string, expected: string): boolean {
  const inputHash = crypto.createHash("sha256").update(input).digest();
  const expectedHash = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(inputHash, expectedHash);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": rate.retryAfterSeconds.toString() },
        }
      );
    }

    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // 1. Try Supabase Auth when configured
    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("placeholder-project")) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          return NextResponse.json(
            { error: "Invalid email or password." },
            { status: 401 }
          );
        }

        const token = createSignedStaffToken({
          id: data.user.id,
          email: data.user.email || email,
          name: (data.user.user_metadata?.full_name as string) || "Admin Staff",
          role: "administrator",
        });

        const cookieStore = await cookies();
        cookieStore.set(STAFF_SESSION_COOKIE, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email,
            name: (data.user.user_metadata?.full_name as string) || "Admin Staff",
            role: "administrator",
          },
        });
      } catch (sbErr) {
        console.warn("[Supabase Auth fallback note]", sbErr);
      }
    }

    // 2. Staff Portal Credentials (when Supabase Auth is not active / local mode)
    const configuredPassword = process.env.ADMIN_ACCESS_PASSWORD || "bmt2026";
    const isAuthorizedEmail = AUTHORIZED_STAFF_EMAILS.has(email);
    const isValidPassword = constantTimeMatch(password, configuredPassword);

    if (!isAuthorizedEmail || !isValidPassword) {
      return NextResponse.json(
        { error: "Invalid staff credentials. Verify your account email and password." },
        { status: 401 }
      );
    }

    const displayName = `${email.split("@")[0].toUpperCase()} • Operations`;
    const signedToken = createSignedStaffToken({
      email,
      name: displayName,
      role: "administrator",
    });

    const cookieStore = await cookies();
    cookieStore.set(STAFF_SESSION_COOKIE, signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      user: {
        email,
        name: "Admin • Operations Desk",
        role: "administrator",
      },
    });
  } catch (error) {
    console.error("[Login API Error]", error);
    return NextResponse.json(
      { error: "Internal authentication error" },
      { status: 500 }
    );
  }
}
