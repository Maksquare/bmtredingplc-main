import { NextRequest, NextResponse } from "next/server";
import { uploadFileToCpanel } from "@/lib/storage/cpanel";
import { insertSupabaseMediaAsset } from "@/lib/supabase/db";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

// SVG excluded from direct uploads to prevent active inline script execution (XSS)
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "application/pdf",
]);

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

function matchesMagicBytes(buf: Buffer, mime: string): boolean {
  if (buf.length < 12) return false;

  switch (mime) {
    case "image/jpeg":
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    case "image/png":
      return (
        buf[0] === 0x89 &&
        buf[1] === 0x50 &&
        buf[2] === 0x4e &&
        buf[3] === 0x47
      );
    case "image/webp":
      return (
        buf.subarray(0, 4).toString("ascii") === "RIFF" &&
        buf.subarray(8, 12).toString("ascii") === "WEBP"
      );
    case "image/avif":
      return buf.subarray(4, 8).toString("ascii") === "ftyp";
    case "application/pdf":
      return buf.subarray(0, 5).toString("ascii") === "%PDF-";
    default:
      return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized upload access" }, { status: 401 });
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`upload:${ip}`, 20, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Upload rate limit reached. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": rate.retryAfterSeconds.toString() },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const rawFolder = (formData.get("folder") as string) || "products";
    const allowedFolders = ["products", "gallery", "specs", "brand", "general"];
    const folder = allowedFolders.includes(rawFolder) ? rawFolder : "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File size must be between 1 byte and 25MB" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type (${file.type}). Allowed: JPG, PNG, WEBP, AVIF, PDF` },
        { status: 400 }
      );
    }

    const headerBytes = Buffer.from(await file.slice(0, 16).arrayBuffer());
    if (!matchesMagicBytes(headerBytes, file.type)) {
      return NextResponse.json(
        { error: "File signature does not match declared file format." },
        { status: 400 }
      );
    }

    const result = await uploadFileToCpanel({ file, folder });
    if (!result.success || !result.file_url) {
      return NextResponse.json(
        { error: result.error || "Failed to store file to cPanel" },
        { status: 500 }
      );
    }

    const asset = {
      id: `media-${Date.now()}`,
      file_name: result.file_name,
      file_url: result.file_url,
      file_size_bytes: result.file_size_bytes,
      mime_type: result.mime_type,
      folder: result.folder as "products" | "gallery" | "specs" | "brand" | "general",
      created_at: new Date().toISOString(),
      storage_type: result.storage_type,
    };

    try {
      await insertSupabaseMediaAsset(asset);
    } catch (dbErr) {
      console.warn("[Media Asset DB Insert Note]", dbErr);
    }

    return NextResponse.json({
      success: true,
      asset,
      storage: result.storage_type,
    });
  } catch (error) {
    console.error("[Upload Handler Error]", error);
    return NextResponse.json(
      { error: "Failed to process upload." },
      { status: 500 }
    );
  }
}
