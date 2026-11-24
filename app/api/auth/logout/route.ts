import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("bmt_staff_session");

    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore if supabase is not initialized
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Logout API Error]", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}

