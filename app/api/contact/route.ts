import { NextRequest, NextResponse } from "next/server";
import { contactApiSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/lib/siteConfig";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // 1. Zod Validation
    const parsed = contactApiSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const { name, email, phone, product, quantity, message, company, website_hp } =
      parsed.data;

    // 2. Honeypot Bot Check
    if (website_hp) {
      return NextResponse.json({ success: true }); // Silent drop
    }

    // 3. Database Insertion (Supabase) if configured
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createAdminClient();
        await supabase.from("inquiries").insert({
          name,
          email,
          phone,
          product,
          quantity,
          message: company ? `[Company: ${company}]\n${message}` : message,
          status: "new",
        });
      }
    } catch (dbErr) {
      console.warn("[Inquiry DB Insert Note - Operating in Static/Hybrid Mode]", dbErr);
    }

    // 4. Send Email Notification to Sales Desk
    await sendEmail({
      to: siteConfig.contact.email,
      replyTo: email,
      subject: `[New Inquiry] ${product} (${quantity}) - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DCCE; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1C3A2F; padding: 20px; color: #FAF7F2;">
            <h2 style="margin: 0; color: #FAF7F2;">${siteConfig.name} - Commercial Inquiry</h2>
            <p style="margin: 5px 0 0 0; color: #EAA84F; font-size: 13px;">New Web Specification Form Submission</p>
          </div>
          <div style="padding: 24px; color: #1F2420;">
            <p><strong>Customer Name:</strong> ${name}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <hr style="border: 0; border-top: 1px solid #E5DCCE; margin: 20px 0;" />
            <p><strong>Product Requested:</strong> ${product}</p>
            <p><strong>Estimated Quantity:</strong> ${quantity}</p>
            <p><strong>Message / Project Notes:</strong></p>
            <div style="background-color: #F4EFE6; padding: 14px; border-radius: 8px; font-size: 14px; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received. Our sales desk will respond within 2 hours.",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Internal server error. Please call our sales hotline directly." },
      { status: 500 }
    );
  }
}

