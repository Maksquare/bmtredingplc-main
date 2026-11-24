"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  Order,
  OrderStatus,
  Customer,
  InventoryAdjustment,
  AdminRole,
} from "@/types";
import {
  products as initialProducts,
  categories as initialCategories,
  galleryItems as initialGallery,
  partners as initialPartners,
  testimonials as initialTestimonials,
  orders as initialOrders,
  customers as initialCustomers,
  inventoryAdjustments as initialAdjustments,
} from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";

// Initial seed Quotes for real-time dashboard preview
const seedQuotes: Quote[] = [
  {
    id: "quote-101",
    client_name: "Eng. Dawit Haile",
    client_email: "dawit.h@midrocconstruction.com",
    client_phone: "+251 911 445 566",
    product_requested: "ProForm Dynea Film-Faced Shuttering Plywood (18mm, 120g/m² Dynea Phenolic)",
    quantity: "1,200 Sheets (2 Full Containers)",
    status: "reviewing",
    amount: 3450000,
    currency: "ETB",
    notes: "Delivery Mode: delivery | Destination: Bole Commercial Tower Project, Addis Ababa | Target Date: End of month | Notes: Urgent concrete pour phase 2.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "quote-102",
    client_name: "Bethlehem Tadesse",
    client_email: "bethlehem@addiscraftinteriors.et",
    client_phone: "+251 912 334 455",
    product_requested: "VeneerCraft Bintangor Commercial Hardwood Plywood (12mm, B/BB Grade)",
    quantity: "450 Sheets",
    status: "pending",
    amount: 1120000,
    currency: "ETB",
    notes: "Delivery Mode: yard_pickup | Destination: Yard Pickup | Target Date: Next week | Notes: Automated CNC cabinet pressing batch.",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "quote-103",
    client_name: "Eng. Yohannes Bekele",
    client_email: "yohannes.b@afrotsion.com",
    client_phone: "+251 913 778 899",
    product_requested: "AquaShield BS 1088 Marine Grade Plywood (18mm, 100% Solid Gurjan Core)",
    quantity: "800 Sheets",
    status: "sent",
    amount: 2890000,
    currency: "ETB",
    notes: "Delivery Mode: delivery | Destination: Bridge Abutment Site, Oromia Regional Corridor | Target Date: 10 days | Notes: Lab boil test report required with proforma.",
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
  {
    id: "quote-104",
    client_name: "Mulugeta Assefa",
    client_email: "mulugeta@flintstoneeng.com",
    client_phone: "+251 911 889 900",
    product_requested: "TitanDeck Keruing Wiremesh Anti-Slip Plywood (21mm, Heavy Duty)",
    quantity: "300 Sheets",
    status: "accepted",
    amount: 1450000,
    currency: "ETB",
    notes: "Delivery Mode: delivery | Destination: Kality Logistics Depot, Addis Ababa | Target Date: Completed | Notes: Truck bed scaffolding deck installation.",
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

// Initial seed Inquiries from contact form
const seedInquiries: Inquiry[] = [
  {
    id: "inq-201",
    name: "Almaz Kebede",
    company: "Varnero Construction PLC",
    email: "almaz.k@varneroet.com",
    phone: "+251 911 654 321",
    product: "ProForm 18mm Shuttering Plywood",
    quantity: "600 Sheets",
    message: "We need 600 sheets of 18mm high-pour shuttering plywood for our residential tower project in Kazanchis. Please confirm stock availability and flatbed delivery timing.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "inq-202",
    name: "Tewodros Girma",
    company: "Sunshine Construction",
    email: "tewodros@sunshineplc.com",
    phone: "+251 912 998 877",
    product: "AquaShield BS 1088 Marine 25mm",
    quantity: "200 Sheets",
    message: "Requesting quotation for 25mm BS 1088 marine plywood with 72-hour boil test certification. Yard pickup.",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: "inq-203",
    name: "Semira Nur",
    company: "Addis Hotel Furnishings",
    email: "semira@addishotelfurniture.com",
    phone: "+251 914 112 233",
    product: "SolidCore Hardwood Blockboard 18mm",
    quantity: "350 Sheets",
    message: "Supplying 150 hotel guestroom wardrobe units. Can we inspect sample blockboard specimens at your Bole yard tomorrow?",
    status: "quoted",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

// Initial Site Settings
const initialSettings: SiteSettings = {
  id: "default-settings",
  company_name: siteConfig.name,
  tagline: siteConfig.tagline,
  contact_email: siteConfig.contact.email,
  sales_email: siteConfig.contact.salesEmail,
  phone: siteConfig.contact.phone,
  whatsapp: siteConfig.contact.whatsapp,
  address: siteConfig.contact.address.full,
  business_hours: siteConfig.contact.hours,
  hero_title: "Architectural Timber & Industrial Plywood Solutions in Ethiopia",
  hero_subtitle: "Certified BS 1088 marine plywood, Dynea film-faced shuttering panels, and architectural joinery boards direct from primary importer yards in Addis Ababa.",
  meta_description: siteConfig.description,
};

// Initial Media Library Assets
const seedMedia: MediaAsset[] = [
  {
    id: "media-1",
    file_name: "proform-dynea-shuttering-18mm.jpg",
    file_url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop",
    file_size_bytes: 1420000,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 240).toISOString(),
  },
  {
    id: "media-2",
    file_name: "aquashield-bs1088-marine-plywood.jpg",
    file_url: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1000&auto=format&fit=crop",
    file_size_bytes: 1840000,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 210).toISOString(),
  },
  {
    id: "media-3",
    file_name: "veneercraft-bintangor-hardwood.jpg",
    file_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    file_size_bytes: 1180000,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 180).toISOString(),
  },
  {
    id: "media-4",
    file_name: "titandeck-wiremesh-anti-slip.jpg",
    file_url: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1000&auto=format&fit=crop",
    file_size_bytes: 2040000,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 140).toISOString(),
  },
  {
    id: "media-5",
    file_name: "addis-commercial-bank-hq-formwork.jpg",
    file_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=1000&auto=format&fit=crop",
    file_size_bytes: 2450000,
    mime_type: "image/jpeg",
    folder: "gallery",
    created_at: new Date(Date.now() - 3600000 * 100).toISOString(),
  },
  {
    id: "media-6",
    file_name: "bole-luxury-residences-cabinetry.jpg",
    file_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    file_size_bytes: 1680000,
    mime_type: "image/jpeg",
    folder: "gallery",
    created_at: new Date(Date.now() - 3600000 * 70).toISOString(),
  },
  {
    id: "media-7",
    file_name: "bmtradingplc-bs1088-spec-sheet.pdf",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    file_size_bytes: 480000,
    mime_type: "application/pdf",
    folder: "specs",
    created_at: new Date(Date.now() - 3600000 * 50).toISOString(),
  },
  {
    id: "media-8",
    file_name: "bmtradingplc-primary-brand-mark.svg",
    file_url: "/globe.svg",
    file_size_bytes: 32000,
    mime_type: "image/svg+xml",
    folder: "brand",
    created_at: new Date(Date.now() - 3600000 * 300).toISOString(),
  },
];

interface AdminContextType {
  products: Product[];
  categories: Category[];
  quotes: Quote[];
  inquiries: Inquiry[];
  gallery: GalleryItem[];
  partners: Partner[];
  testimonials: Testimonial[];
  media: MediaAsset[];
  settings: SiteSettings;
  orders: Order[];
  customers: Customer[];
  inventoryAdjustments: InventoryAdjustment[];
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
  // Product actions
  addProduct: (product: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  undoDeletedProduct: Product | null;
  undoDeleteProduct: () => void;
  // Category actions
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // Order actions
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  // Customer actions
  updateCustomerStatus: (id: string, status: Customer["status"]) => void;
  // Inventory actions
  adjustStock: (
    productId: string,
    delta: number,
    reason: InventoryAdjustment["reason"],
    notes?: string
  ) => Promise<{ success: boolean; error?: string }>;
  // Quote actions
  updateQuoteStatus: (id: string, status: Quote["status"], notes?: string, amount?: number) => void;
  deleteQuote: (id: string) => void;
  // Inquiry actions
  updateInquiryStatus: (id: string, status: Inquiry["status"], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  // Gallery actions
  addGalleryItem: (item: Omit<GalleryItem, "id" | "created_at">) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  // Partner actions
  addPartner: (partner: Omit<Partner, "id">) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  // Testimonial actions
  addTestimonial: (test: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  // Media actions
  addMediaAsset: (asset: Omit<MediaAsset, "id" | "created_at">) => void;
  deleteMediaAsset: (id: string) => void;
  // Settings actions
  updateSettings: (updates: Partial<SiteSettings>) => void;
  // Reset store
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: "bmt_admin_products",
  CATEGORIES: "bmt_admin_categories",
  QUOTES: "bmt_admin_quotes",
  INQUIRIES: "bmt_admin_inquiries",
  GALLERY: "bmt_admin_gallery",
  PARTNERS: "bmt_admin_partners",
  TESTIMONIALS: "bmt_admin_testimonials",
  MEDIA: "bmt_admin_media",
  SETTINGS: "bmt_admin_settings",
  ORDERS: "bmt_admin_orders",
  CUSTOMERS: "bmt_admin_customers",
  ADJUSTMENTS: "bmt_admin_adjustments",
  ROLE: "bmt_admin_role",
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [quotes, setQuotes] = useState<Quote[]>(seedQuotes);
  const [inquiries, setInquiries] = useState<Inquiry[]>(seedInquiries);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [media, setMedia] = useState<MediaAsset[]>(seedMedia);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [inventoryAdjustments, setInventoryAdjustments] = useState<InventoryAdjustment[]>(initialAdjustments);
  const [currentRole, setCurrentRole] = useState<AdminRole>("super_admin");
  const [undoDeletedProduct, setUndoDeletedProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted data on client mount and synchronize with Supabase if configured
  useEffect(() => {
    try {
      const p = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (p) setProducts(JSON.parse(p));

      const c = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (c) setCategories(JSON.parse(c));

      const q = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (q) setQuotes(JSON.parse(q));

      const i = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (i) setInquiries(JSON.parse(i));

      const g = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (g) setGallery(JSON.parse(g));

      const part = localStorage.getItem(STORAGE_KEYS.PARTNERS);
      if (part) setPartners(JSON.parse(part));

      const t = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (t) setTestimonials(JSON.parse(t));

      const m = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (m) setMedia(JSON.parse(m));

      const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (s) setSettings(JSON.parse(s));
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }

    // Attempt live Supabase synchronization
    fetch("/api/admin/mutate")
      .then((res) => res.json())
      .then((res) => {
        if (res.configured && res.data) {
          if (res.data.products?.length > 0) setProducts(res.data.products);
          if (res.data.categories?.length > 0) setCategories(res.data.categories);
          if (res.data.quotes?.length > 0) setQuotes(res.data.quotes);
          if (res.data.inquiries?.length > 0) setInquiries(res.data.inquiries);
          if (res.data.gallery?.length > 0) setGallery(res.data.gallery);
          if (res.data.partners?.length > 0) setPartners(res.data.partners);
          if (res.data.testimonials?.length > 0) setTestimonials(res.data.testimonials);
        }
      })
      .catch((err) => console.warn("[Supabase Initial Fetch Note]", err));
  }, []);

  const syncSupabase = (entity: string, action: "upsert" | "delete", data?: any, id?: string) => {
    fetch("/api/admin/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity, action, data, id }),
    }).catch((err) => console.warn("[Supabase Mutation Sync Warn]", err));
  };

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
      localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [products, categories, quotes, inquiries, gallery, partners, testimonials, media, settings, isLoaded]);

  // Product Actions
  const addProduct = (item: Omit<Product, "id" | "created_at">) => {
    const newProduct: Product = {
      ...item,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    syncSupabase("product", "upsert", newProduct);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item
      );
      const updatedItem = updatedList.find((i) => i.id === id);
      if (updatedItem) syncSupabase("product", "upsert", updatedItem);
      return updatedList;
    });
  };

  const deleteProduct = (id: string) => {
    const toDelete = products.find((p) => p.id === id);
    if (toDelete) {
      setUndoDeletedProduct(toDelete);
      setTimeout(() => setUndoDeletedProduct(null), 10000);
    }
    setProducts((prev) => prev.filter((item) => item.id !== id));
    syncSupabase("product", "delete", undefined, id);
  };

  const undoDeleteProduct = () => {
    if (!undoDeletedProduct) return;
    setProducts((prev) => [undoDeletedProduct, ...prev]);
    syncSupabase("product", "upsert", undoDeletedProduct);
    setUndoDeletedProduct(null);
  };

  // Order Actions
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === id
          ? {
              ...ord,
              status,
              updated_at: new Date().toISOString(),
              estimated_delivery:
                status === "delivered"
                  ? "Delivered successfully"
                  : status === "out_for_delivery"
                  ? "Arriving today by 17:00 EAT"
                  : ord.estimated_delivery,
            }
          : ord
      );
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Customer Actions
  const updateCustomerStatus = (id: string, status: Customer["status"]) => {
    setCustomers((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, status } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Inventory Stock Adjustment Actions
  const adjustStock = async (
    productId: string,
    delta: number,
    reason: InventoryAdjustment["reason"],
    notes?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return { success: false, error: "Product not found" };

    const currentQty = prod.stock_quantity ?? 100;
    const newQty = currentQty + delta;

    if (newQty < 0) {
      return {
        success: false,
        error: `Negative stock prevented! Current yard balance is ${currentQty} sheets. Delta ${delta} would result in ${newQty}.`,
      };
    }

    const newStatus =
      newQty === 0
        ? "out_of_stock"
        : newQty <= 15
        ? "low_stock"
        : newQty > 500
        ? "overstocked"
        : "in_stock";

    // Update product in state
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stock_quantity: newQty,
              stock_status: newStatus,
            }
          : p
      )
    );

    // Create adjustment log entry
    const newLog: InventoryAdjustment = {
      id: `adj-${Date.now()}`,
      product_id: productId,
      product_name: `${prod.name} (${prod.specs.thickness.split(",")[0].trim()})`,
      previous_stock: currentQty,
      new_stock: newQty,
      delta,
      reason,
      adjusted_by: `${currentRole.replace("_", " ")} (Admin)`,
      notes,
      created_at: new Date().toISOString(),
    };

    setInventoryAdjustments((prev) => [newLog, ...prev]);

    return { success: true };
  };

  // Category Actions
  const addCategory = (cat: Omit<Category, "id">) => {
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    syncSupabase("category", "upsert", newCat);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      const updatedItem = updatedList.find((i) => i.id === id);
      if (updatedItem) syncSupabase("category", "upsert", updatedItem);
      return updatedList;
    });
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
    syncSupabase("category", "delete", undefined, id);
  };

  // Quote Actions
  const updateQuoteStatus = (id: string, status: Quote["status"], notes?: string, amount?: number) => {
    setQuotes((prev) => {
      const updatedList = prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status,
              ...(notes !== undefined ? { notes } : {}),
              ...(amount !== undefined ? { amount } : {}),
            }
          : q
      );
      const updatedQuote = updatedList.find((q) => q.id === id);
      if (updatedQuote) syncSupabase("quote", "upsert", updatedQuote);
      return updatedList;
    });
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    syncSupabase("quote", "delete", undefined, id);
  };

  // Inquiry Actions
  const updateInquiryStatus = (id: string, status: Inquiry["status"], notes?: string) => {
    setInquiries((prev) => {
      const updatedList = prev.map((inq) =>
        inq.id === id
          ? {
              ...inq,
              status,
              ...(notes !== undefined ? { notes } : {}),
              updated_at: new Date().toISOString(),
            }
          : inq
      );
      const updatedInq = updatedList.find((i) => i.id === id);
      if (updatedInq) syncSupabase("inquiry", "upsert", updatedInq);
      return updatedList;
    });
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    syncSupabase("inquiry", "delete", undefined, id);
  };

  // Gallery Actions
  const addGalleryItem = (item: Omit<GalleryItem, "id" | "created_at">) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [newItem, ...prev]);
    syncSupabase("gallery", "upsert", newItem);
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGallery((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      const updatedItem = updatedList.find((i) => i.id === id);
      if (updatedItem) syncSupabase("gallery", "upsert", updatedItem);
      return updatedList;
    });
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    syncSupabase("gallery", "delete", undefined, id);
  };

  // Partner Actions
  const addPartner = (item: Omit<Partner, "id">) => {
    const newPartner: Partner = {
      ...item,
      id: `part-${Date.now()}`,
    };
    setPartners((prev) => [...prev, newPartner]);
    syncSupabase("partner", "upsert", newPartner);
  };

  const updatePartner = (id: string, updates: Partial<Partner>) => {
    setPartners((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      const updatedItem = updatedList.find((i) => i.id === id);
      if (updatedItem) syncSupabase("partner", "upsert", updatedItem);
      return updatedList;
    });
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((item) => item.id !== id));
    syncSupabase("partner", "delete", undefined, id);
  };

  // Testimonial Actions
  const addTestimonial = (item: Omit<Testimonial, "id">) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `test-${Date.now()}`,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
    syncSupabase("testimonial", "upsert", newTestimonial);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      const updatedItem = updatedList.find((i) => i.id === id);
      if (updatedItem) syncSupabase("testimonial", "upsert", updatedItem);
      return updatedList;
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
    syncSupabase("testimonial", "delete", undefined, id);
  };

  // Media Actions
  const addMediaAsset = (item: Omit<MediaAsset, "id" | "created_at">) => {
    const newAsset: MediaAsset = {
      ...item,
      id: `media-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setMedia((prev) => [newAsset, ...prev]);
    syncSupabase("media", "upsert", newAsset);
  };

  const deleteMediaAsset = (id: string) => {
    setMedia((prev) => prev.filter((item) => item.id !== id));
    syncSupabase("media", "delete", undefined, id);
  };

  // Settings Actions
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      syncSupabase("settings", "upsert", newSettings);
      return newSettings;
    });
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setCategories(initialCategories);
    setQuotes(seedQuotes);
    setInquiries(seedInquiries);
    setGallery(initialGallery);
    setPartners(initialPartners);
    setTestimonials(initialTestimonials);
    setMedia(seedMedia);
    setSettings(initialSettings);
    localStorage.clear();
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        quotes,
        inquiries,
        gallery,
        partners,
        testimonials,
        media,
        settings,
        orders,
        customers,
        inventoryAdjustments,
        currentRole,
        setCurrentRole,
        addProduct,
        updateProduct,
        deleteProduct,
        undoDeletedProduct,
        undoDeleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        updateCustomerStatus,
        adjustStock,
        updateQuoteStatus,
        deleteQuote,
        updateInquiryStatus,
        deleteInquiry,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addPartner,
        updatePartner,
        deletePartner,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addMediaAsset,
        deleteMediaAsset,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminProvider");
  }
  return context;
}
