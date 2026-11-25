export type ProductStatus = "draft" | "published";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "overstocked";

export interface ProductVariant {
  id: string;
  thickness: string;
  size: string;
  stock_status: StockStatus;
  stock_quantity: number;
  is_special?: boolean;
}

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
  stock_status?: StockStatus;
  stock_quantity?: number;
  brand?: string;
  sku?: string;
  variants?: ProductVariant[];
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
  company?: string;
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

export type QuoteStatus = "pending" | "reviewing" | "sent" | "accepted" | "declined";

export interface Quote {
  id: string;
  inquiry_id?: string;
  client_name: string;
  company_name?: string;
  client_email: string;
  client_phone: string;
  product_requested: string;
  quantity: string;
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
  logo_url?: string;
  website_url?: string;
  order_index: number;
  category?: string;
  initials?: string;
  is_active?: boolean;
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
  secondary_phone?: string;
  tertiary_phone?: string;
  whatsapp: string;
  telegram?: string;
  address: string;
  factory_address?: string;
  business_hours: string;
  hero_title: string;
  hero_subtitle: string;
  meta_description: string;
  logo_url?: string;
  favicon_url?: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_size_bytes?: number;
  mime_type?: string;
  folder: "products" | "gallery" | "specs" | "brand" | "general";
  created_at: string;
}

// Quote Cart Model
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  thickness: string;
  size: string;
  grade: string;
  quantity: number;
  price?: number;
  stockLimit: number;
  minOrderQty: number;
  isUnavailable?: boolean;
  priceChanged?: boolean;
}

// Orders & Payment Status Flow
export type OrderStatus =
  | "new"
  | "confirmed"
  | "packed"
  | "dispatched"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "paid" | "unpaid" | "partial" | "refunded" | "failed";

export interface OrderItem {
  product_id: string;
  product_name: string;
  thickness: string;
  quantity: number;
  unit_price?: number;
  total_price?: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_company?: string;
  customer_email: string;
  customer_phone: string;
  destination: string;
  destination_zone: string;
  items: OrderItem[];
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_amount: number;
  currency: string;
  tracking_number?: string;
  invoice_url?: string;
  estimated_delivery?: string;
  created_at: string;
  updated_at?: string;
}

// Customers
export type CustomerStatus = "active" | "blocked" | "new" | "returning";

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  total_orders: number;
  total_spend: number;
  last_order_at?: string;
  created_at: string;
}

// Inventory Adjustments & Stock Logs
export interface InventoryAdjustment {
  id: string;
  product_id: string;
  product_name: string;
  previous_stock: number;
  new_stock: number;
  delta: number;
  reason: "Damage" | "Yard Recount" | "Direct Sale" | "Supplier Consignment" | "Return";
  adjusted_by: string;
  notes?: string;
  created_at: string;
}

// Admin Roles
export type AdminRole = "super_admin" | "manager" | "staff" | "viewer";



