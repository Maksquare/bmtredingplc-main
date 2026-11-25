import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/require-admin";

const isConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && key && !url.includes("placeholder-project"));
};

const VALID_ENTITIES = new Set([
  "product",
  "category",
  "quote",
  "inquiry",
  "partner",
  "testimonial",
  "media",
  "settings",
]);

export async function POST(request: NextRequest) {
  const admin = await requireAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized mutation request" }, { status: 401 });
  }

  if (!isConfigured()) {
    return NextResponse.json({
      success: true,
      mode: "local",
      message: "Updated local dashboard store (Supabase not configured)",
    });
  }

  try {
    const body = await request.json();
    const { entity, action, data, id } = body;

    if (typeof entity !== "string" || !VALID_ENTITIES.has(entity)) {
      return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
    }

    const supabase = createAdminClient();

    if (action === "delete" && typeof id === "string" && id.trim()) {
      const tableMap: Record<string, string> = {
        product: "products",
        category: "categories",
        quote: "quotes",
        inquiry: "inquiries",
        partner: "partners",
        testimonial: "testimonials",
        media: "media_assets",
      };

      const table = tableMap[entity];
      if (!table) {
        return NextResponse.json({ error: `Entity cannot be deleted: ${entity}` }, { status: 400 });
      }

      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true, deletedId: id });
    }

    if (action === "upsert" && data && typeof data === "object") {
      if (entity === "product") {
        const { error } = await supabase.from("products").upsert({
          id: data.id,
          name: data.name,
          slug: data.slug,
          category_id: data.category_id,
          short_description: data.short_description,
          description: data.description,
          images: data.images || [],
          specs: data.specs || {},
          applications: data.applications || [],
          is_featured: Boolean(data.is_featured),
          status: data.status || "published",
          pdf_url: data.pdf_url || null,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
      } else if (entity === "category") {
        const { error } = await supabase.from("categories").upsert({
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          image_url: data.image_url,
          order_index: data.order_index || 0,
          is_active: data.is_active ?? true,
        });
        if (error) throw error;
      } else if (entity === "quote") {
        const { error } = await supabase.from("quotes").upsert({
          id: data.id,
          client_name: data.client_name,
          company_name: data.company_name,
          client_email: data.client_email,
          client_phone: data.client_phone,
          product_requested: data.product_requested,
          quantity: data.quantity,
          status: data.status || "pending",
          internal_notes: data.notes,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
      } else if (entity === "inquiry") {
        const { error } = await supabase.from("inquiries").upsert({
          id: data.id,
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          product: data.product,
          quantity: data.quantity,
          message: data.message,
          status: data.status || "new",
          internal_notes: data.notes,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
      } else if (entity === "partner") {
        const { error } = await supabase.from("partners").upsert({
          id: data.id,
          name: data.name,
          category: data.category || "Client Partner",
          initials: data.initials || "BM",
          logo_url: data.logo_url || null,
          website_url: data.website_url,
          order_index: data.order_index || 0,
          is_active: data.is_active ?? true,
        });
        if (error) throw error;
      } else if (entity === "testimonial") {
        const { error } = await supabase.from("testimonials").upsert({
          id: data.id,
          client_name: data.client_name,
          company: data.company,
          role: data.role,
          content: data.content,
          rating: data.rating || 5,
          avatar_url: data.avatar_url || null,
          project_type: data.project_type,
          is_active: data.is_active ?? true,
        });
        if (error) throw error;
      } else if (entity === "media") {
        const { error } = await supabase.from("media_assets").upsert({
          id: data.id,
          filename: data.file_name,
          file_url: data.file_url,
          file_type: data.mime_type || "image/jpeg",
          file_size: data.file_size_bytes || 0,
          folder: data.folder || "products",
        });
        if (error) throw error;
      } else if (entity === "settings") {
        const { data: existing } = await supabase
          .from("site_settings")
          .select("id")
          .limit(1)
          .maybeSingle();

        const payload = {
          company_name: data.company_name,
          tagline: data.tagline,
          contact_email: data.contact_email,
          sales_email: data.sales_email,
          phone: data.phone,
          phone_display: data.phone,
          secondary_phone: data.secondary_phone,
          tertiary_phone: data.tertiary_phone,
          whatsapp: data.whatsapp,
          telegram: data.telegram,
          street_address: data.address,
          factory_address: data.factory_address,
          business_hours: data.business_hours,
          description: data.meta_description,
          updated_at: new Date().toISOString(),
        };

        if (existing?.id) {
          const { error } = await supabase
            .from("site_settings")
            .update(payload)
            .eq("id", existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("site_settings").insert(payload);
          if (error) throw error;
        }
      }

      return NextResponse.json({ success: true, entity });
    }

    return NextResponse.json({ error: "Invalid action or payload" }, { status: 400 });
  } catch (err) {
    console.error("[Admin Supabase Mutation Error]", err);
    return NextResponse.json(
      { error: "Failed to persist change to Supabase PostgreSQL" },
      { status: 500 }
    );
  }
}
