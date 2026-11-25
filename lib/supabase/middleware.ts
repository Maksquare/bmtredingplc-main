import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  STAFF_SESSION_COOKIE,
  verifySignedStaffToken,
} from "@/lib/auth/session";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const rawStaffSession = request.cookies.get(STAFF_SESSION_COOKIE)?.value;
  const verifiedStaff = verifySignedStaffToken(rawStaffSession);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let hasAuthUser = Boolean(verifiedStaff);

  if (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("placeholder-project")
  ) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      hasAuthUser = true;
    }
  }

  // Clear invalid or tampered cookie if present
  if (rawStaffSession && !verifiedStaff && !hasAuthUser) {
    supabaseResponse.cookies.delete(STAFF_SESSION_COOKIE);
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!hasAuthUser) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }
  }

  // If already logged in and visiting /auth/login, redirect to /admin
  if (pathname === "/auth/login" && hasAuthUser) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
