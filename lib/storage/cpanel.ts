import fs from "fs";
import path from "path";

export interface CpanelUploadResult {
  success: boolean;
  file_url: string;
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  folder: string;
  storage_type: "cpanel_disk" | "cpanel_http_bridge" | "local_fallback";
  error?: string;
}

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ||
  path.join(process.cwd(), "uploads");

const CPANEL_MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_CPANEL_MEDIA_URL ||
  process.env.NEXT_PUBLIC_ASSETS_BASE_URL ||
  "";

const CPANEL_UPLOAD_ENDPOINT = process.env.CPANEL_UPLOAD_ENDPOINT || "";
const CPANEL_UPLOAD_SECRET = process.env.CPANEL_UPLOAD_SECRET || "";

/**
 * Uploads a file either directly to cPanel local disk,
 * via remote cPanel HTTP Bridge, or via local filesystem fallback.
 */
export async function uploadFileToCpanel({
  file,
  folder = "products",
}: {
  file: File;
  folder?: string;
}): Promise<CpanelUploadResult> {
  const originalName = file.name || "asset";
  const ext = path.extname(originalName).toLowerCase();
  const baseName = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);
  const sanitizedFileName = `${Date.now()}-${baseName}${ext}`;

  // =========================================================================
  // Strategy 1: Remote cPanel HTTP Bridge (if CPANEL_UPLOAD_ENDPOINT is set)
  // Used when Next.js is deployed externally (Vercel/Cloud) and stores files into cPanel
  // =========================================================================
  if (CPANEL_UPLOAD_ENDPOINT && CPANEL_UPLOAD_ENDPOINT.startsWith("http")) {
    try {
      const formData = new FormData();
      formData.append("file", file, sanitizedFileName);
      formData.append("folder", folder);

      const headers: Record<string, string> = {};
      if (CPANEL_UPLOAD_SECRET) {
        headers["Authorization"] = `Bearer ${CPANEL_UPLOAD_SECRET}`;
      }

      const res = await fetch(CPANEL_UPLOAD_ENDPOINT, {
        method: "POST",
        headers,
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.file_url) {
          return {
            success: true,
            file_url: data.file_url,
            file_name: originalName,
            file_size_bytes: file.size,
            mime_type: file.type,
            folder,
            storage_type: "cpanel_http_bridge",
          };
        }
      }
      console.warn("[cPanel HTTP Bridge returned non-200, falling back to disk]", res.status);
    } catch (err) {
      console.warn("[cPanel HTTP Bridge Request Failed, falling back to disk]", err);
    }
  }

  // =========================================================================
  // Strategy 2: Direct cPanel Disk (when running on cPanel hosting) or Local Disk
  // =========================================================================
  try {
    const resolvedUploadDir = path.resolve(/*turbopackIgnore: true*/ UPLOAD_DIR);
    const targetDir = path.resolve(/*turbopackIgnore: true*/ resolvedUploadDir, folder);

    if (!fs.existsSync(/*turbopackIgnore: true*/ targetDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ targetDir, { recursive: true });
    }

    const targetFilePath = path.resolve(/*turbopackIgnore: true*/ targetDir, sanitizedFileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.promises.writeFile(/*turbopackIgnore: true*/ targetFilePath, buffer);

    // If CPANEL_MEDIA_BASE_URL is configured (e.g. https://files.bmtradingplc.com or https://bmtradingplc.com/uploads)
    let publicUrl: string;
    if (CPANEL_MEDIA_BASE_URL && CPANEL_MEDIA_BASE_URL.startsWith("http")) {
      const cleanBase = CPANEL_MEDIA_BASE_URL.replace(/\/+$/, "");
      publicUrl = `${cleanBase}/${folder}/${sanitizedFileName}`;
    } else {
      publicUrl = `/api/uploads/${folder}/${sanitizedFileName}`;
    }

    const isRunningOnCpanel =
      process.env.UPLOAD_DIR?.includes("/home/") ||
      process.env.PWD?.includes("/home/");

    return {
      success: true,
      file_url: publicUrl,
      file_name: originalName,
      file_size_bytes: file.size,
      mime_type: file.type,
      folder,
      storage_type: isRunningOnCpanel ? "cpanel_disk" : "local_fallback",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Disk write error";
    console.error("[cPanel Disk Upload Failed]", err);
    return {
      success: false,
      file_url: "",
      file_name: originalName,
      file_size_bytes: file.size,
      mime_type: file.type,
      folder,
      storage_type: "local_fallback",
      error: message,
    };
  }
}

