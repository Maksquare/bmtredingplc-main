import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes("placeholder-project")) {
      return NextResponse.json({
        success: true,
        note: "Supabase not configured; operating in local reactive mode.",
      });
    }

    const supabase = createAdminClient();
    const { entity, action, data, id } = await request.json();

    if (action === "delete" && id) {
      const tableMap: Record<string, string> = {
        product: "products",
        category: "categories",
        quote: "quotes",
        inquiry: "inquiries",
        gallery: "gallery_items",
        partner: "partners",
        testimonial: "testimonials",
        media: "media_assets",
      };

      const tableName = tableMap[entity];
      if (tableName) {
        await supabase.from(tableName).delete().eq("id", id);
      }
      return NextResponse.json({ success: true });
    }

    if (action === "upsert" && data) {
      if (entity === "product") {
        await supabase.from("products").upsert({
          id: data.id,
          name: data.name,
          slug: data.slug,
          category_id: data.category_id,
          short_description: data.short_description,
          description: data.description,
          specs: data.specs,
          applications: data.applications,
          images: data.images,
          is_featured: data.is_featured,
          status: data.status,
          pdf_url: data.pdf_url,
          updated_at: new Date().toISOString(),
        });
      } else if (entity === "category") {
        await supabase.from("categories").upsert({
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          image_url: data.image_url,
          order_index: data.order_index,
          is_active: data.is_active ?? true,
          updated_at: new Date().toISOString(),
        });
      } else if (entity === "quote") {
        await supabase.from("quotes").upsert({
          id: data.id,
          client_name: data.client_name,
          company_name: data.company_name,
          client_email: data.client_email,
          client_phone: data.client_phone,
          product_requested: data.product_requested,
          quantity: data.quantity,
          estimated_amount: data.amount,
          currency: data.currency || "ETB",
          status: data.status,
          internal_notes: data.notes,
          updated_at: new Date().toISOString(),
        });
      } else if (entity === "inquiry") {
        await supabase.from("inquiries").upsert({
          id: data.id,
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          product: data.product,
          quantity: data.quantity,
          message: data.message,
          status: data.status,
          internal_notes: data.notes,
          updated_at: new Date().toISOString(),
        });
      } else if (entity === "gallery") {
        await supabase.from("gallery_items").upsert({
          id: data.id,
          title: data.title,
          project_name: data.project_name,
          category: data.category,
          image_url: data.image_url,
          description: data.description,
          order_index: data.order_index,
          is_active: true,
        });
      } else if (entity === "partner") {
        await supabase.from("partners").upsert({
          id: data.id,
          name: data.name,
          category: data.category || "General Contractor Grade 1",
          initials: data.initials || data.name.slice(0, 3).toUpperCase(),
          website_url: data.website_url,
          order_index: data.order_index,
          is_active: true,
        });
      } else if (entity === "testimonial") {
        await supabase.from("testimonials").upsert({
          id: data.id,
          client_name: data.client_name,
          company: data.company,
          role: data.role,
          content: data.content,
          rating: data.rating,
          project_type: data.project_type,
          is_active: data.is_active ?? true,
        });
      } else if (entity === "settings") {
        await supabase.from("site_settings").upsert({
          company_name: data.company_name,
          tagline: data.tagline,
          description: data.meta_description,
          contact_email: data.contact_email,
          sales_email: data.sales_email,
          phone: data.phone,
          whatsapp: data.whatsapp,
          street_address: data.address,
          business_hours: data.business_hours,
          updated_at: new Date().toISOString(),
        });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.warn("[Admin Mutate Warning]", error);
    return NextResponse.json({ success: false, error: error?.message });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes("placeholder-project")) {
      return NextResponse.json({ configured: false });
    }

    const supabase = createAdminClient();

    const [productsRes, categoriesRes, quotesRes, inquiriesRes, galleryRes, partnersRes, testimonialsRes] =
      await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("order_index", { ascending: true }),
        supabase.from("quotes").select("*").order("created_at", { ascending: false }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("gallery_items").select("*").order("order_index", { ascending: true }),
        supabase.from("partners").select("*").order("order_index", { ascending: true }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      ]);

    return NextResponse.json({
      configured: true,
      data: {
        products: productsRes.data || [],
        categories: categoriesRes.data || [],
        quotes: quotesRes.data || [],
        inquiries: inquiriesRes.data || [],
        gallery: galleryRes.data || [],
        partners: partnersRes.data || [],
        testimonials: testimonialsRes.data || [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ configured: false, error: error?.message });
  }
}

