import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, and metadata assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.png|opengraph-image|twitter-image|images/|specs/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|pdf|ico)$).*)",
  ],
};
