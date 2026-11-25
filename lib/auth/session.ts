import crypto from "node:crypto";

const COOKIE_NAME = "bmt_staff_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface StaffSessionPayload {
  id?: string;
  email: string;
  name: string;
  role: "administrator" | "manager" | "staff";
  exp: number;
}

function getSessionSecret(): string {
  return (
    process.env.AUTH_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.CPANEL_UPLOAD_SECRET ||
    "bmtradingplc-dev-session-signing-secret-2026"
  );
}

function toBase64Url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf.toString("base64url");
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signData(data: string): string {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(data)
    .digest("base64url");
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token for staff auth.
 */
export function createSignedStaffToken(
  payload: Omit<StaffSessionPayload, "exp">
): string {
  const fullPayload: StaffSessionPayload = {
    ...payload,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = toBase64Url(JSON.stringify(fullPayload));
  const signature = signData(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies signature Integrity + expiration timestamp in constant time.
 */
export function verifySignedStaffToken(
  token: string | undefined | null
): StaffSessionPayload | null {
  if (!token || typeof token !== "string") return null;

  const dotIdx = token.indexOf(".");
  if (dotIdx <= 0) return null;

  const encodedPayload = token.slice(0, dotIdx);
  const providedSig = token.slice(dotIdx + 1);
  if (!encodedPayload || !providedSig) return null;

  const expectedSig = signData(encodedPayload);
  const providedBuf = Buffer.from(providedSig, "utf8");
  const expectedBuf = Buffer.from(expectedSig, "utf8");

  if (providedBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(fromBase64Url(encodedPayload)) as StaffSessionPayload;
    if (!parsed?.email || typeof parsed.exp !== "number" || parsed.exp <= Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export { COOKIE_NAME as STAFF_SESSION_COOKIE };
