import { createClient as createBrowserClient } from "./client";
import { createClient as createServerClient, createAdminClient } from "./server";
import {
  Product,
  Category,
  Quote,
  Inquiry,
  GalleryItem,
  Partner,
  Testimonial,
  SiteSettings,
  MediaAsset,
} from "@/types";
import {
  products as initialProducts,
  categories as initialCategories,
  galleryItems as initialGallery,
  partners as initialPartners,
  testimonials as initialTestimonials,
} from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("placeholder-project"));
};

// ============================================================================
// 1. PRODUCTS DATABASE OPERATIONS
// ============================================================================
export async function getSupabaseProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return initialProducts;

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return initialProducts;
    }

    return data.map((item) => ({
      ...item,
      specs: typeof item.specs === "string" ? JSON.parse(item.specs) : item.specs || {},
      applications:
        typeof item.applications === "string"
          ? JSON.parse(item.applications)
          : item.applications || [],
      images:
        typeof item.images === "string" ? JSON.parse(item.images) : item.images || [],
    }));
  } catch (err) {
    console.warn("[Supabase getProducts Fallback]", err);
    return initialProducts;
  }
}

export async function getSupabaseProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return initialProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return initialProducts.find((p) => p.slug === slug) || null;
    }

    return {
      ...data,
      specs: typeof data.specs === "string" ? JSON.parse(data.specs) : data.specs || {},
      applications:
        typeof data.applications === "string"
          ? JSON.parse(data.applications)
          : data.applications || [],
      images:
        typeof data.images === "string" ? JSON.parse(data.images) : data.images || [],
    };
  } catch (err) {
    console.warn("[Supabase getProductBySlug Fallback]", err);
    return initialProducts.find((p) => p.slug === slug) || null;
  }
}

export async function upsertSupabaseProduct(product: Partial<Product>): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").upsert({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category_id: product.category_id,
      short_description: product.short_description,
      description: product.description,
      specs: product.specs,
      applications: product.applications,
      images: product.images,
      is_featured: product.is_featured,
      status: product.status,
      pdf_url: product.pdf_url,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("[Supabase upsertProduct Error]", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Supabase upsertProduct Exception]", err);
    return false;
  }
}

export async function deleteSupabaseProduct(id: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("[Supabase deleteProduct Error]", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Supabase deleteProduct Exception]", err);
    return false;
  }
}

// ============================================================================
// 2. CATEGORIES DATABASE OPERATIONS
// ============================================================================
export async function getSupabaseCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return initialCategories;

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialCategories;
    }
    return data;
  } catch (err) {
    console.warn("[Supabase getCategories Fallback]", err);
    return initialCategories;
  }
}

export async function upsertSupabaseCategory(category: Partial<Category>): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("categories").upsert({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image_url: category.image_url,
      order_index: category.order_index,
      is_active: category.is_active ?? true,
      updated_at: new Date().toISOString(),
    });

    return !error;
  } catch {
    return false;
  }
}

export async function deleteSupabaseCategory(id: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ============================================================================
// 3. QUOTES DATABASE OPERATIONS
// ============================================================================
export async function getSupabaseQuotes(): Promise<Quote[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function insertSupabaseQuote(quote: Omit<Quote, "id" | "created_at">): Promise<Quote | null> {
  try {
    const supabase = createAdminClient();
    const id = `quote-${Date.now()}`;
    const payload = {
      id,
      client_name: quote.client_name,
      company_name: quote.company_name,
      client_email: quote.client_email,
      client_phone: quote.client_phone,
      product_requested: quote.product_requested,
      quantity: quote.quantity,
      estimated_amount: quote.amount,
      currency: quote.currency || "ETB",
      status: quote.status || "pending",
      internal_notes: quote.notes,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("quotes")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("[Supabase insertQuote Error]", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[Supabase insertQuote Exception]", err);
    return null;
  }
}

export async function updateSupabaseQuoteStatus(
  id: string,
  status: Quote["status"],
  notes?: string,
  amount?: number
): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const updates: Record<string, any> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (notes !== undefined) updates.internal_notes = notes;
    if (amount !== undefined) updates.estimated_amount = amount;

    const { error } = await supabase.from("quotes").update(updates).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ============================================================================
// 4. INQUIRIES DATABASE OPERATIONS
// ============================================================================
export async function getSupabaseInquiries(): Promise<Inquiry[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function insertSupabaseInquiry(inq: Omit<Inquiry, "id" | "created_at">): Promise<Inquiry | null> {
  try {
    const supabase = createAdminClient();
    const id = `inq-${Date.now()}`;
    const payload = {
      id,
      name: inq.name,
      company: inq.company,
      email: inq.email,
      phone: inq.phone,
      product: inq.product,
      quantity: inq.quantity,
      message: inq.message,
      status: inq.status || "new",
      internal_notes: inq.notes,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("inquiries")
      .insert(payload)
      .select()
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function updateSupabaseInquiryStatus(
  id: string,
  status: Inquiry["status"],
  notes?: string
): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const updates: Record<string, any> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (notes !== undefined) updates.internal_notes = notes;

    const { error } = await supabase.from("inquiries").update(updates).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

// ============================================================================
// 5. GALLERY, PARTNERS, TESTIMONIALS & SETTINGS
// ============================================================================
export async function getSupabaseGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return initialGallery;

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) return initialGallery;
    return data;
  } catch {
    return initialGallery;
  }
}

export async function getSupabasePartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured()) return initialPartners;

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) return initialPartners;
    return data;
  } catch {
    return initialPartners;
  }
}

export async function getSupabaseTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return initialTestimonials;

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return initialTestimonials;
    return data;
  } catch {
    return initialTestimonials;
  }
}

export async function getSupabaseMediaAssets(): Promise<MediaAsset[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map((item) => ({
      id: item.id,
      file_name: item.filename,
      file_url: item.file_url,
      mime_type: item.file_type,
      file_size_bytes: item.file_size,
      folder: item.folder,
      created_at: item.created_at,
    }));
  } catch {
    return [];
  }
}

export async function insertSupabaseMediaAsset(asset: Omit<MediaAsset, "id" | "created_at">): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("media_assets").insert({
      id: `media-${Date.now()}`,
      filename: asset.file_name,
      file_url: asset.file_url,
      file_type: asset.mime_type || "application/octet-stream",
      file_size: asset.file_size_bytes || 0,
      folder: asset.folder || "products",
      created_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}

