import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { categories, products, partners, testimonials } from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";

const isConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && key && !url.includes("placeholder-project"));
};

export async function GET() {
  const admin = await requireAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isConfigured()) {
    return NextResponse.json({
      configured: false,
      message: "Supabase credentials not configured, using local seed data.",
    });
  }

  try {
    const supabase = createAdminClient();
    const [prodRes, catRes, quoteRes, inqRes, partRes, testRes, mediaRes, setRes] =
      await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("order_index", { ascending: true }),
        supabase.from("quotes").select("*").order("created_at", { ascending: false }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("partners").select("*").order("order_index", { ascending: true }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
        supabase.from("media_assets").select("*").order("created_at", { ascending: false }),
        supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      ]);

    const mappedMedia = (mediaRes.data || []).map((m: Record<string, unknown>) => ({
      id: m.id,
      file_name: m.filename,
      file_url: m.file_url,
      mime_type: m.file_type,
      file_size_bytes: m.file_size,
      folder: m.folder,
      created_at: m.created_at,
    }));

    const mappedSettings = setRes.data
      ? {
          id: setRes.data.id,
          company_name: setRes.data.company_name,
          tagline: setRes.data.tagline,
          contact_email: setRes.data.contact_email,
          sales_email: setRes.data.sales_email,
          phone: setRes.data.phone,
          secondary_phone: setRes.data.secondary_phone || siteConfig.contact.secondaryPhoneDisplay,
          tertiary_phone: setRes.data.tertiary_phone || siteConfig.contact.tertiaryPhoneDisplay,
          whatsapp: setRes.data.whatsapp,
          telegram: setRes.data.telegram || siteConfig.contact.telegram,
          address: setRes.data.street_address,
          factory_address: setRes.data.factory_address || siteConfig.contact.factory.full,
          business_hours: setRes.data.business_hours,
          hero_title: siteConfig.tagline,
          hero_subtitle: setRes.data.description || siteConfig.description,
          meta_description: setRes.data.description || siteConfig.description,
        }
      : null;

    return NextResponse.json({
      configured: true,
      data: {
        products: prodRes.data || [],
        categories: catRes.data || [],
        quotes: quoteRes.data || [],
        inquiries: inqRes.data || [],
        partners: partRes.data || [],
        testimonials: testRes.data || [],
        media: mappedMedia,
        settings: mappedSettings,
      },
    });
  } catch (err) {
    console.error("[Admin Supabase GET Sync Error]", err);
    return NextResponse.json(
      { configured: true, error: "Failed to fetch live database state" },
      { status: 500 }
    );
  }
}

export async function POST() {
  const admin = await requireAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Supabase service key missing in .env.local" },
      { status: 400 }
    );
  }

  try {
    const supabase = createAdminClient();
    const results: Record<string, string> = {};

    const { error: catErr } = await supabase.from("categories").upsert(
      categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        image_url: c.image_url,
        order_index: c.order_index,
        is_active: c.is_active,
      })),
      { onConflict: "id" }
    );
    results.categories = catErr ? `error: ${catErr.message}` : "seeded";

    const { error: prodErr } = await supabase.from("products").upsert(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category_id: p.category_id,
        short_description: p.short_description,
        description: p.description,
        images: p.images,
        specs: p.specs,
        applications: p.applications,
        is_featured: p.is_featured,
        status: p.status,
        pdf_url: p.pdf_url,
      })),
      { onConflict: "id" }
    );
    results.products = prodErr ? `error: ${prodErr.message}` : "seeded";

    const { error: partErr } = await supabase.from("partners").upsert(
      partners.map((pt) => ({
        id: pt.id,
        name: pt.name,
        category: pt.category || "Commercial Partner",
        initials: pt.initials || "BM",
        logo_url: pt.logo_url || null,
        website_url: pt.website_url,
        order_index: pt.order_index,
        is_active: pt.is_active ?? true,
      })),
      { onConflict: "id" }
    );
    results.partners = partErr ? `error: ${partErr.message}` : "seeded";

    const { error: testErr } = await supabase.from("testimonials").upsert(
      testimonials.map((ts) => ({
        id: ts.id,
        client_name: ts.client_name,
        company: ts.company,
        role: ts.role,
        content: ts.content,
        rating: ts.rating,
        avatar_url: ts.avatar_url || null,
        project_type: ts.project_type,
        is_active: ts.is_active,
      })),
      { onConflict: "id" }
    );
    results.testimonials = testErr ? `error: ${testErr.message}` : "seeded";

    const { data: existingSettings } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    const settingsPayload = {
      company_name: siteConfig.name,
      legal_name: siteConfig.legalName,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      contact_email: siteConfig.contact.email,
      sales_email: siteConfig.contact.salesEmail,
      phone: siteConfig.contact.phone,
      phone_display: siteConfig.contact.phoneDisplay,
      secondary_phone: siteConfig.contact.secondaryPhoneDisplay,
      tertiary_phone: siteConfig.contact.tertiaryPhoneDisplay,
      whatsapp: siteConfig.contact.whatsapp,
      telegram: siteConfig.contact.telegram,
      street_address: siteConfig.contact.address.full,
      factory_address: siteConfig.contact.factory.full,
      city: siteConfig.contact.address.city,
      region: siteConfig.contact.address.region,
      country: siteConfig.contact.address.country,
      business_hours: siteConfig.contact.hours,
      years_experience: 10,
      major_clients_count: 200,
    };

    const { error: setErr } = existingSettings
      ? await supabase.from("site_settings").update(settingsPayload).eq("id", existingSettings.id)
      : await supabase.from("site_settings").insert(settingsPayload);
    results.settings = setErr ? `error: ${setErr.message}` : "seeded";

    return NextResponse.json({
      success: true,
      message: "Synchronized Safarian & Plywood catalog data with Supabase",
      results,
    });
  } catch (err: unknown) {
    console.error("[Admin Supabase POST Sync Error]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Database synchronization error" },
      { status: 500 }
    );
  }
}