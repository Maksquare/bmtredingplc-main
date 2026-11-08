import { NextRequest, NextResponse } from "next/server";
import { quoteApiSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";
import { siteConfig } from "@/lib/siteConfig";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // 1. Zod Validation
    const parsed = quoteApiSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid quote data" },
        { status: 400 }
      );
    }

    const {
      fullName,
      companyName,
      email,
      phone,
      productName,
      thickness,
      grade,
      quantity,
      deliveryType,
      deliveryAddress,
      targetDate,
      notes,
      hp_field,
    } = parsed.data;

    // 2. Honeypot check
    if (hp_field) {
      return NextResponse.json({ success: true });
    }

    // 3. Database Insertion (Supabase) if configured
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createAdminClient();
        await supabase.from("quotes").insert({
          client_name: fullName,
          client_email: email,
          client_phone: phone,
          product_requested: `${productName} (${thickness}, ${grade})`,
          quantity,
          status: "pending",
          notes: `Delivery Mode: ${deliveryType} | Destination: ${deliveryAddress || "Yard Pickup"} | Target Date: ${targetDate || "Immediate"} | Notes: ${notes || "None"}`,
        });
      }
    } catch (dbErr) {
      console.warn("[Quote DB Insert Note - Operating in Static/Hybrid Mode]", dbErr);
    }

    // 4. Send Email Notification
    await sendEmail({
      to: siteConfig.contact.salesEmail || siteConfig.contact.email,
      replyTo: email,
      subject: `[Formal Quote Request] ${productName} (${quantity}) - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5DCCE; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #C8832A; padding: 20px; color: #FAF7F2;">
            <h2 style="margin: 0; color: #FFFFFF;">${siteConfig.name} - Formal RFQ Received</h2>
            <p style="margin: 5px 0 0 0; color: #FAF7F2; font-size: 13px;">High Priority Commercial Quote Request</p>
          </div>
          <div style="padding: 24px; color: #1F2420;">
            <h3 style="margin-top: 0; color: #1C3A2F;">Client Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ""}
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>

            <hr style="border: 0; border-top: 1px solid #E5DCCE; margin: 20px 0;" />

            <h3 style="color: #1C3A2F;">Specifications Requested</h3>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Thickness:</strong> ${thickness}</p>
            <p><strong>Bond / Grade:</strong> ${grade}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Dispatch Mode:</strong> ${deliveryType === "delivery" ? "Jobsite Flatbed Delivery" : "Yard Gate Collection"}</p>
            ${deliveryAddress ? `<p><strong>Destination:</strong> ${deliveryAddress}</p>` : ""}
            ${targetDate ? `<p><strong>Target Timeline:</strong> ${targetDate}</p>` : ""}
            ${notes ? `<p><strong>Client Notes:</strong> ${notes}</p>` : ""}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Quote request registered successfully. Proforma will be delivered within 2 hours.",
    });
  } catch (error) {
    console.error("[Quote API Error]", error);
    return NextResponse.json(
      { error: "Internal server error. Please contact sales desk." },
      { status: 500 }
    );
  }
}

