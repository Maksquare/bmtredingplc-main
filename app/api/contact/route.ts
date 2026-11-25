import { NextRequest, NextResponse } from "next/server";
import { contactApiSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/lib/siteConfig";
import { createAdminClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`, 8, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiry requests. Please wait a few minutes before sending again.",
        },
        {
          status: 429,
          headers: { "Retry-After": rate.retryAfterSeconds.toString() },
        }
      );
    }

    const body = await request.json();
    const parsed = contactApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the highlighted form fields and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.website_hp) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 1. Database Insertion (Supabase) if configured
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createAdminClient();
        await supabase.from("inquiries").insert({
          id: `inq-${Date.now()}`,
          name: data.name,
          company: data.company || "",
          email: data.email,
          phone: data.phone,
          product: data.product,
          quantity: data.quantity,
          message: data.message,
          status: "new",
          created_at: new Date().toISOString(),
        });
      }
    } catch (dbErr) {
      console.warn("[Inquiry DB Insert Note - Operating in Static/Hybrid Mode]", dbErr);
    }

    // 2. Notification email (optional if SMTP is configured)
    await sendEmail({
      to: siteConfig.contact.email,
      replyTo: data.email,
      subject: `[bmtradingplc Inquiry] ${data.product} — ${data.name}`,
      text: `Name: ${data.name}\nCompany: ${data.company || "N/A"}\nPhone: ${data.phone}\nEmail: ${data.email}\nProduct Interest: ${data.product}\n\nMessage:\n${data.message}`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, error: "Could not send inquiry right now." },
      { status: 500 }
    );
  }
}