import nodemailer from "nodemailer";
import { siteConfig } from "./siteConfig";

const smtpHost = process.env.SMTP_HOST || "mail.bmtredingplc.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
const smtpUser = process.env.SMTP_USER || "info@bmtredingplc.com";
const smtpPass = process.env.SMTP_PASSWORD || "";
const smtpSecure = process.env.SMTP_SECURE !== "false"; // default true for port 465 SSL

export function getTransporter() {
  if (!smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert issues on cPanel
    },
  });
}

export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendMailOptions): Promise<{ success: boolean; messageId?: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Email Simulation - bmtredingplc] To: ${to} | Subject: ${subject}`);
    return { success: true, messageId: "simulated-id" };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${siteConfig.name}" <${smtpUser}>`,
      to,
      subject,
      text,
      html,
      replyTo,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email Error - bmtredingplc]", error);
    return { success: false };
  }
}

