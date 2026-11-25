import { NextRequest, NextResponse } from "next/server";
import { quoteApiSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/lib/siteConfig";
import { createAdminClient } from "@/lib/supabase/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`quote:${ip}`, 8, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many quote submissions. Please wait a few minutes before trying again.",
        },
        {
          status: 429,
          headers: { "Retry-After": rate.retryAfterSeconds.toString() },
        }
      );
    }

    const body = await request.json();
    const parsed = quoteApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please verify all required fields and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.hp_field) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const quoteId = `quote-${Date.now()}`;

    // Database Insertion (Supabase) if configured
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createAdminClient();
        await supabase.from("quotes").insert({
          id: quoteId,
          client_name: data.name,
          company_name: data.company || "",
          client_email: data.email,
          client_phone: data.phone,
          product_requested: data.product,
          thickness: data.thickness,
          grade: data.application || "Commercial & Furniture",
          quantity: data.quantity,
          delivery_type: "delivery",
          delivery_address: data.location || "Addis Ababa",
          target_date: data.timeline || "Immediate Dispatch",
          status: "pending",
          internal_notes: data.notes || "",
          created_at: new Date().toISOString(),
        });
      }
    } catch (dbErr) {
      console.warn("[Quote DB Insert Note - Operating in Static/Hybrid Mode]", dbErr);
    }

    // Notification email (optional if SMTP is configured)
    await sendEmail({
      to: siteConfig.contact.salesEmail,
      replyTo: data.email,
      subject: `[bmtradingplc Quote Request] ${data.product} — ${data.quantity}`,
      text: `Quote ID: ${quoteId}\nClient: ${data.name}\nCompany: ${data.company || "N/A"}\nPhone: ${data.phone}\nEmail: ${data.email}\nProduct: ${data.product}\nThickness: ${data.thickness}\nQuantity: ${data.quantity}\nApplication: ${data.application || "N/A"}\nLocation: ${data.location || "N/A"}\nSchedule: ${data.timeline || "N/A"}\nNotes: ${data.notes || "None"}`,
    });

    return NextResponse.json(
      {
        success: true,
        id: quoteId,
        message: "Quote request received. Our Addis Ababa sales team will follow up shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Quote API Error]", error);
    return NextResponse.json(
      { success: false, error: "Could not register quote request." },
      { status: 500 }
    );
  }
}