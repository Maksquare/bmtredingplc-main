import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  STAFF_SESSION_COOKIE,
  verifySignedStaffToken,
  StaffSessionPayload,
} from "@/lib/auth/session";

export interface VerifiedAdmin {
  email: string;
  name: string;
  source: "supabase" | "staff_token";
}

/**
 * Verifies an active authenticated admin session via signed cookie or Supabase Auth.
 * Safe to invoke in Route Handlers and Server Actions before sensitive mutations or reads.
 */
export async function requireAdminSession(): Promise<VerifiedAdmin | null> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(STAFF_SESSION_COOKIE)?.value;
  const staffPayload: StaffSessionPayload | null = verifySignedStaffToken(rawToken);

  if (staffPayload) {
    return {
      email: staffPayload.email,
      name: staffPayload.name,
      source: "staff_token",
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("placeholder-project")) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        return {
          email: user.email,
          name: (user.user_metadata?.full_name as string) || "Admin Staff",
          source: "supabase",
        };
      }
    } catch {
      return null;
    }
  }

  return null;
}
