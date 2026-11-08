export type ProductStatus = "draft" | "published";

export interface ProductSpecs {
  thickness: string;
  standard_size: string;
  grade: string;
  glue_type: string;
  core_species: string;
  surface_finish: string;
  moisture_content?: string;
  density?: string;
  formaldehyde_emission?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  category_id: string;
  category_name?: string;
  images: string[];
  specs: ProductSpecs;
  applications: string[];
  is_featured: boolean;
  status: ProductStatus;
  pdf_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
  product_count?: number;
}

export type InquiryStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  thickness_interest?: string;
  delivery_location?: string;
  message: string;
  status: InquiryStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export type QuoteStatus = "pending" | "sent" | "accepted" | "declined";

export interface Quote {
  id: string;
  inquiry_id?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  product_requested: string;
  quantity: string;
  amount?: number;
  currency?: string;
  pdf_url?: string;
  status: QuoteStatus;
  notes?: string;
  sent_at?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  author_role?: string;
  read_time: string;
  tags: string[];
  status: "draft" | "published";
  published_at: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar_url?: string;
  project_type?: string;
  is_active: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  order_index: number;
  is_active: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  order_index: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  project_name: string;
  category: string;
  image_url: string;
  description?: string;
  order_index: number;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  tagline: string;
  contact_email: string;
  sales_email: string;
  phone: string;
  whatsapp: string;
  address: string;
  business_hours: string;
  hero_title: string;
  hero_subtitle: string;
  meta_description: string;
  logo_url?: string;
  favicon_url?: string;
}

