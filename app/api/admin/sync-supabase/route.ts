import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import {
  products as initialProducts,
  categories as initialCategories,
  galleryItems as initialGallery,
  partners as initialPartners,
  testimonials as initialTestimonials,
} from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes("placeholder-project")) {
      return NextResponse.json(
        {
          error:
            "Supabase is not configured yet. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Sync Categories
    const categoriesPayload = initialCategories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image_url: c.image_url,
      order_index: c.order_index,
      is_active: c.is_active ?? true,
      updated_at: new Date().toISOString(),
    }));
    const { error: catErr } = await supabase.from("categories").upsert(categoriesPayload);
    if (catErr) console.warn("[Supabase Sync Categories Warn]", catErr);

    // 2. Sync Products
    const productsPayload = initialProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category_id: p.category_id,
      short_description: p.short_description,
      description: p.description,
      specs: p.specs,
      applications: p.applications,
      images: p.images,
      is_featured: p.is_featured,
      status: p.status,
      pdf_url: p.pdf_url || null,
      updated_at: new Date().toISOString(),
    }));
    const { error: prodErr } = await supabase.from("products").upsert(productsPayload);
    if (prodErr) console.warn("[Supabase Sync Products Warn]", prodErr);

    // 3. Sync Gallery Items
    const galleryPayload = initialGallery.map((g) => ({
      id: g.id,
      title: g.title,
      project_name: g.project_name,
      category: g.category,
      image_url: g.image_url,
      description: g.description,
      order_index: g.order_index,
      is_active: true,
    }));
    const { error: galErr } = await supabase.from("gallery_items").upsert(galleryPayload);
    if (galErr) console.warn("[Supabase Sync Gallery Warn]", galErr);

    // 4. Sync Partners
    const partnersPayload = initialPartners.map((part) => ({
      id: part.id,
      name: part.name,
      category: part.category || "General Contractor Grade 1",
      initials: part.initials || part.name.slice(0, 3).toUpperCase(),
      website_url: part.website_url || null,
      order_index: part.order_index,
      is_active: true,
    }));
    const { error: partErr } = await supabase.from("partners").upsert(partnersPayload);
    if (partErr) console.warn("[Supabase Sync Partners Warn]", partErr);

    // 5. Sync Testimonials
    const testimonialsPayload = initialTestimonials.map((t) => ({
      id: t.id,
      client_name: t.client_name,
      company: t.company,
      role: t.role,
      content: t.content,
      rating: t.rating,
      project_type: t.project_type || "Commercial Development",
      is_active: t.is_active ?? true,
    }));
    const { error: testErr } = await supabase.from("testimonials").upsert(testimonialsPayload);
    if (testErr) console.warn("[Supabase Sync Testimonials Warn]", testErr);

    // 6. Sync Site Settings
    const settingsPayload = {
      company_name: siteConfig.name,
      legal_name: siteConfig.legalName,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      contact_email: siteConfig.contact.email,
      sales_email: siteConfig.contact.salesEmail,
      phone: siteConfig.contact.phone,
      phone_display: siteConfig.contact.phoneDisplay,
      whatsapp: siteConfig.contact.whatsapp,
      street_address: siteConfig.contact.address.street,
      city: siteConfig.contact.address.city,
      country: siteConfig.contact.address.country,
      business_hours: siteConfig.contact.hours,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("site_settings").upsert(settingsPayload);

    return NextResponse.json({
      success: true,
      message: "Database tables synchronized to Supabase PostgreSQL successfully.",
      counts: {
        products: initialProducts.length,
        categories: initialCategories.length,
        gallery: initialGallery.length,
        partners: initialPartners.length,
        testimonials: initialTestimonials.length,
      },
    });
  } catch (error: any) {
    console.error("[Supabase Sync Route Error]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to synchronize database to Supabase" },
      { status: 500 }
    );
  }
}

