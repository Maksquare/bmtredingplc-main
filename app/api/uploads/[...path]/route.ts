import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ||
  path.join(process.cwd(), "uploads");

const MIME_MAP: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  pdf: "application/pdf",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path;

    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const relativePath = pathSegments.join("/");
    const resolvedUploadDir = path.resolve(/*turbopackIgnore: true*/ UPLOAD_DIR);
    const filePath = path.resolve(/*turbopackIgnore: true*/ resolvedUploadDir, relativePath);

    // Prevent path traversal
    if (!filePath.startsWith(resolvedUploadDir)) {
      return new NextResponse("Access Denied", { status: 403 });
    }

    if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const stat = fs.statSync(/*turbopackIgnore: true*/ filePath);
    if (!stat.isFile()) {
      return new NextResponse("Access Denied", { status: 403 });
    }

    const ext = path.extname(filePath).toLowerCase().replace(".", "");
    const contentType = MIME_MAP[ext] || "application/octet-stream";

    const fileStream = fs.createReadStream(/*turbopackIgnore: true*/ filePath);

    // Stream response with security headers & 30-day cache
    const response = new NextResponse(fileStream as unknown as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=2592000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });

    return response;
  } catch (error) {
    console.error("[Fallback File Server Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
