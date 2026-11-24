import { NextRequest, NextResponse } from "next/server";
import { uploadFileToCpanel } from "@/lib/storage/cpanel";
import { insertSupabaseMediaAsset } from "@/lib/supabase/db";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "application/pdf",
];

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const rawFolder = (formData.get("folder") as string) || "products";
    const allowedFolders = ["products", "gallery", "specs", "brand", "general"];
    const folder = allowedFolders.includes(rawFolder) ? rawFolder : "products";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 25MB limit" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type (${file.type}). Allowed: JPG, PNG, WEBP, AVIF, SVG, PDF` },
        { status: 400 }
      );
    }

    // 1. Upload to cPanel (local cPanel disk or remote cPanel HTTP Bridge)
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

    // 2. Persist media asset metadata in Supabase PostgreSQL
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
      { error: "Failed to process upload to cPanel storage." },
      { status: 500 }
    );
  }
}
