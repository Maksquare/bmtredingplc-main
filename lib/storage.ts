import fs from "fs";
import path from "path";
import crypto from "crypto";

// Default upload directory outside the application build tree
const UPLOAD_DIR =
  process.env.UPLOAD_DIR ||
  path.join(process.cwd(), "uploads");

const ASSETS_BASE_URL =
  process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "https://files.bmtredingplc.com";

// Allowed extensions and magic byte signatures
const ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "pdf",
];

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB
const MAX_PDF_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export interface UploadOptions {
  folder: "products" | "gallery" | "blog" | "specs" | "team" | "brand";
  buffer: Buffer;
  originalFilename: string;
  mimeType: string;
}

export interface UploadResult {
  url: string;
  relativePath: string;
  filename: string;
  size: number;
}

/**
 * Checks magic byte signatures for real file format verification.
 */
function verifyMagicBytes(buffer: Buffer): string | null {
  if (buffer.length < 8) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg";
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "png";
  }

  // WebP: RIFF ... WEBP
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }

  // PDF: %PDF
  if (buffer.toString("ascii", 0, 4) === "%PDF") {
    return "pdf";
  }

  // AVIF: ....ftypavif
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 4, 12).includes("ftyp")
  ) {
    return "avif";
  }

  return null;
}

/**
 * Uploads a file safely to UPLOAD_DIR
 */
export async function uploadFile({
  folder,
  buffer,
  originalFilename,
  mimeType,
}: UploadOptions): Promise<UploadResult> {
  // 1. Verify extension and magic bytes
  const extFromName = path.extname(originalFilename).toLowerCase().replace(".", "");
  const detectedExt = verifyMagicBytes(buffer);

  if (!detectedExt) {
    throw new Error("Invalid file signature. Only standard images and PDFs are permitted.");
  }

  const finalExt = detectedExt;
  if (!ALLOWED_EXTENSIONS.includes(finalExt)) {
    throw new Error(`File format .${finalExt} is not permitted.`);
  }

  // 2. Size Check
  const maxSize = finalExt === "pdf" ? MAX_PDF_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;
  if (buffer.length > maxSize) {
    throw new Error(`File size exceeds maximum permitted limit (${maxSize / (1024 * 1024)}MB).`);
  }

  // 3. Generate randomized, safe path: {folder}/{yyyy}/{mm}/{random}.{ext}
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const randomName = `${crypto.randomBytes(16).toString("hex")}.${finalExt}`;

  const relativeDir = path.join(folder, year, month);
  const targetDir = path.resolve(UPLOAD_DIR, relativeDir);

  // Path Traversal Security Verification
  if (!targetDir.startsWith(path.resolve(UPLOAD_DIR))) {
    throw new Error("Security Violation: Path traversal attempt detected.");
  }

  // Ensure target directory exists (0755)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true, mode: 0o755 });
  }

  const finalFilePath = path.join(targetDir, randomName);
  const relativeFilePath = path.join(relativeDir, randomName).replace(/\\/g, "/");

  // Write file with permissions 0644
  fs.writeFileSync(finalFilePath, buffer, { mode: 0o644 });

  const publicUrl = getPublicUrl(relativeFilePath);

  return {
    url: publicUrl,
    relativePath: relativeFilePath,
    filename: randomName,
    size: buffer.length,
  };
}

/**
 * Returns the public URL for a stored asset.
 * If subdomain is files.bmtredingplc.com, points to it.
 * Otherwise falls back to /api/uploads/{path}.
 */
export function getPublicUrl(relativePath: string): string {
  const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;

  if (process.env.USE_FALLBACK_FILE_SERVER === "true") {
    return `/api/uploads/${cleanPath}`;
  }

  return `${ASSETS_BASE_URL.replace(/\/+$/, "")}/${cleanPath}`;
}

/**
 * Deletes a file from the server disk.
 */
export async function deleteFile(relativePath: string): Promise<boolean> {
  try {
    const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
    const fullPath = path.resolve(UPLOAD_DIR, cleanPath);

    // Verify inside UPLOAD_DIR
    if (!fullPath.startsWith(path.resolve(UPLOAD_DIR))) {
      throw new Error("Security Violation: Path traversal attempt detected.");
    }

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("[Storage Delete Error]", error);
    return false;
  }
}

