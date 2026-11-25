import nodemailer from "nodemailer";
import { siteConfig } from "./siteConfig";

const smtpHost = process.env.SMTP_HOST || "mail.bmtradingplc.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
const smtpUser = process.env.SMTP_USER || "info@bmtradingplc.com";
const smtpPass = process.env.SMTP_PASSWORD || "";
const smtpSecure = process.env.SMTP_SECURE !== "false";

function sanitizeHeaderValue(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function getTransporter() {
  if (!smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
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
  const safeTo = sanitizeHeaderValue(to) || siteConfig.contact.email;
  const safeSubject = sanitizeHeaderValue(subject) || "bmtradingplc Notification";
  const safeReplyTo = sanitizeHeaderValue(replyTo);

  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Email Simulation - bmtradingplc] To: ${safeTo} | Subject: ${safeSubject}`);
    return { success: true, messageId: "simulated-id" };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${siteConfig.name}" <${smtpUser}>`,
      to: safeTo,
      subject: safeSubject,
      text,
      html,
      replyTo: safeReplyTo,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email Error - bmtradingplc]", error);
    return { success: false };
  }
}
