"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  Category,
  Quote,
  Inquiry,
  Partner,
  Testimonial,
  SiteSettings,
  MediaAsset,
  Customer,
  InventoryAdjustment,
  AdminRole,
} from "@/types";
import {
  products as initialProducts,
  categories as initialCategories,
  partners as initialPartners,
  testimonials as initialTestimonials,
  customers as initialCustomers,
  inventoryAdjustments as initialAdjustments,
} from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";

const seedQuotes: Quote[] = [
  {
    id: "quote-101",
    client_name: "Dawit Tesfaye",
    company_name: "MIDROC Investment Group",
    client_email: "procurement@midroc-et.com",
    client_phone: "+251 911 445 566",
    product_requested: "Plywood (18mm - Special Product)",
    quantity: "800 Sheets",
    status: "reviewing",
    notes: "Destination: Addis Ababa Commercial Project | Target: Immediate Dispatch | Heavy-duty architectural joinery.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "quote-102",
    client_name: "Selamawit Bekele",
    company_name: "Mina Furniture",
    client_email: "production@minafurniture.et",
    client_phone: "+251 912 334 455",
    product_requested: "Safarian (08mm & 12mm)",
    quantity: "450 Sheets",
    status: "pending",
    notes: "Destination: Addis Ababa | Scheduled workshop batch for wardrobe cabinetry and partitions.",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "quote-103",
    client_name: "Yohannes Abebe",
    company_name: "Classic Furniture",
    client_email: "supply@classicfurniture.et",
    client_phone: "+251 913 778 899",
    product_requested: "Plywood (16mm & 18mm - Special Product)",
    quantity: "600 Sheets",
    status: "sent",
    notes: "Destination: Addis Ababa Showroom & Plant | Flagship 18mm Plywood allocation confirmed from Werabe.",
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
  {
    id: "quote-104",
    client_name: "Mulugeta Kebede",
    company_name: "Warit Furniture",
    client_email: "operations@waritfurniture.et",
    client_phone: "+251 911 889 900",
    product_requested: "Safarian (03mm & 06mm)",
    quantity: "500 Sheets",
    status: "accepted",
    notes: "Destination: Addis Ababa | Drawer bottoms and backing boards allocation confirmed.",
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

const seedInquiries: Inquiry[] = [
  {
    id: "inq-201",
    name: "Henok Tadesse",
    company: "Mina Furniture",
    email: "henok@minafurniture.et",
    phone: "+251 911 654 321",
    product: "18mm Special Product Plywood",
    quantity: "350 Sheets",
    message: "Please confirm batch readiness for 18mm Special Product Plywood and 08mm Safarian sheets for pickup or delivery.",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "inq-202",
    name: "Tigist Girma",
    company: "Warit Furniture",
    email: "tigist@waritfurniture.et",
    phone: "+251 912 998 877",
    product: "Safarian (03mm, 06mm, 12mm)",
    quantity: "400 Sheets",
    message: "Following up on monthly Safarian thickness allocation from Werabe factory.",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
];

const initialSettings: SiteSettings = {
  id: "settings-1",
  company_name: siteConfig.name,
  tagline: siteConfig.tagline,
  contact_email: siteConfig.contact.email,
  sales_email: siteConfig.contact.salesEmail,
  phone: siteConfig.contact.phoneDisplay,
  secondary_phone: siteConfig.contact.secondaryPhoneDisplay,
  tertiary_phone: siteConfig.contact.tertiaryPhoneDisplay,
  whatsapp: siteConfig.contact.whatsapp,
  telegram: siteConfig.contact.telegram,
  address: siteConfig.contact.address.full,
  factory_address: siteConfig.contact.factory.full,
  business_hours: siteConfig.contact.hours,
  hero_title: "Precision Safarian & 18mm Special Plywood in Ethiopia",
  hero_subtitle: siteConfig.description,
  meta_description: siteConfig.description,
};

const seedMedia: MediaAsset[] = [
  {
    id: "media-1",
    file_name: "safarian-main.jpg",
    file_url: "/images/products/safarian-main.jpg",
    file_size_bytes: 664245,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 240).toISOString(),
  },
  {
    id: "media-2",
    file_name: "plywood-18mm-special.jpg",
    file_url: "/images/products/plywood-18mm-special.jpg",
    file_size_bytes: 792933,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 200).toISOString(),
  },
  {
    id: "media-3",
    file_name: "plywood-16mm-stack.jpg",
    file_url: "/images/products/plywood-16mm-stack.jpg",
    file_size_bytes: 699264,
    mime_type: "image/jpeg",
    folder: "products",
    created_at: new Date(Date.now() - 3600000 * 150).toISOString(),
  },
  {
    id: "media-4",
    file_name: "safarian-detail.jpg",
    file_url: "/images/products/safarian-detail.jpg",
    file_size_bytes: 735075,
    mime_type: "image/jpeg",
    folder: "gallery",
    created_at: new Date(Date.now() - 3600000 * 100).toISOString(),
  },
];

interface AdminContextType {
  products: Product[];
  categories: Category[];
  quotes: Quote[];
  inquiries: Inquiry[];
  partners: Partner[];
  testimonials: Testimonial[];
  media: MediaAsset[];
  settings: SiteSettings;
  customers: Customer[];
  inventoryAdjustments: InventoryAdjustment[];
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
  isLoaded: boolean;
  undoDeletedProduct: Product | null;
  addProduct: (product: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  undoDeleteProduct: () => void;
  addCategory: (cat: Omit<Category, "id">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateCustomerStatus: (id: string, status: Customer["status"]) => void;
  adjustStock: (
    productId: string,
    delta: number,
    reason: InventoryAdjustment["reason"],
    notes?: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateQuoteStatus: (id: string, status: Quote["status"], notes?: string) => void;
  deleteQuote: (id: string) => void;
  updateInquiryStatus: (id: string, status: Inquiry["status"], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  addPartner: (partner: Omit<Partner, "id">) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  addTestimonial: (item: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addMediaAsset: (asset: Omit<MediaAsset, "id" | "created_at">) => void;
  deleteMediaAsset: (id: string) => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: "bmt_admin_products_v3",
  CATEGORIES: "bmt_admin_categories_v3",
  QUOTES: "bmt_admin_quotes_v2",
  INQUIRIES: "bmt_admin_inquiries_v2",
  PARTNERS: "bmt_admin_partners_v3",
  TESTIMONIALS: "bmt_admin_testimonials_v3",
  MEDIA: "bmt_admin_media_v3",
  SETTINGS: "bmt_admin_settings_v2",
  CUSTOMERS: "bmt_admin_customers_v2",
  ADJUSTMENTS: "bmt_admin_adjustments_v2",
  ROLE: "bmt_admin_role_v2",
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [quotes, setQuotes] = useState<Quote[]>(seedQuotes);
  const [inquiries, setInquiries] = useState<Inquiry[]>(seedInquiries);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [media, setMedia] = useState<MediaAsset[]>(seedMedia);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [inventoryAdjustments, setInventoryAdjustments] =
    useState<InventoryAdjustment[]>(initialAdjustments);
  const [currentRole, setCurrentRole] = useState<AdminRole>("super_admin");
  const [isLoaded, setIsLoaded] = useState(false);
  const [undoDeletedProduct, setUndoDeletedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let active = true;

    const hydrateLocal = () => {
      try {
        const p = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (p) setProducts(JSON.parse(p));

        const c = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        if (c) setCategories(JSON.parse(c));

        const q = localStorage.getItem(STORAGE_KEYS.QUOTES);
        if (q) setQuotes(JSON.parse(q));

        const i = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
        if (i) setInquiries(JSON.parse(i));

        const part = localStorage.getItem(STORAGE_KEYS.PARTNERS);
        if (part) setPartners(JSON.parse(part));

        const t = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
        if (t) setTestimonials(JSON.parse(t));

        const m = localStorage.getItem(STORAGE_KEYS.MEDIA);
        if (m) setMedia(JSON.parse(m));

        const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (s) setSettings(JSON.parse(s));

        const cust = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
        if (cust) setCustomers(JSON.parse(cust));

        const adj = localStorage.getItem(STORAGE_KEYS.ADJUSTMENTS);
        if (adj) setInventoryAdjustments(JSON.parse(adj));

        const role = localStorage.getItem(STORAGE_KEYS.ROLE);
        if (role) setCurrentRole(role as AdminRole);
      } catch (e) {
        console.warn("Could not load from localStorage:", e);
      }

      setIsLoaded(true);
    };

    queueMicrotask(() => {
      if (active) hydrateLocal();
    });

    fetch("/api/admin/sync-supabase")
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (!active || !res) return;
        if (res.configured && res.data) {
          if (res.data.products?.length > 0) setProducts(res.data.products);
          if (res.data.categories?.length > 0) setCategories(res.data.categories);
          if (res.data.quotes?.length > 0) setQuotes(res.data.quotes);
          if (res.data.inquiries?.length > 0) setInquiries(res.data.inquiries);
          if (res.data.partners?.length > 0) setPartners(res.data.partners);
          if (res.data.testimonials?.length > 0) setTestimonials(res.data.testimonials);
          if (res.data.media?.length > 0) setMedia(res.data.media);
          if (res.data.settings) setSettings(res.data.settings);
        }
      })
      .catch((err) => console.warn("[Supabase Initial Fetch Note]", err));

    return () => {
      active = false;
    };
  }, []);

  const syncSupabase = (
    entity: string,
    action: "upsert" | "delete",
    data?: unknown,
    id?: string
  ) => {
    fetch("/api/admin/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity, action, data, id }),
    }).catch((err) => console.warn("[Supabase Mutation Sync Warn]", err));
  };

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
      localStorage.setItem(STORAGE_KEYS.ADJUSTMENTS, JSON.stringify(inventoryAdjustments));
      localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [
    products,
    categories,
    quotes,
    inquiries,
    partners,
    testimonials,
    media,
    settings,
    customers,
    inventoryAdjustments,
    currentRole,
    isLoaded,
  ]);

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

  const updateCustomerStatus = (id: string, status: Customer["status"]) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

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
        error: `Stock cannot become negative (${currentQty} available, requested delta ${delta}).`,
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

    const adjustment: InventoryAdjustment = {
      id: `adj-${Date.now()}`,
      product_id: productId,
      product_name: prod.name,
      previous_stock: currentQty,
      new_stock: newQty,
      delta,
      reason,
      adjusted_by: "Admin User",
      notes,
      created_at: new Date().toISOString(),
    };

    updateProduct(productId, { stock_quantity: newQty, stock_status: newStatus });
    setInventoryAdjustments((prev) => [adjustment, ...prev]);
    return { success: true };
  };

  const addCategory = (cat: Omit<Category, "id">) => {
    const newCat: Category = { ...cat, id: `cat-${Date.now()}` };
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

  const updateQuoteStatus = (id: string, status: Quote["status"], notes?: string) => {
    setQuotes((prev) => {
      const updatedList = prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status,
              notes: notes !== undefined ? notes : q.notes,
              sent_at: status === "sent" ? new Date().toISOString() : q.sent_at,
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

  const updateInquiryStatus = (id: string, status: Inquiry["status"], notes?: string) => {
    setInquiries((prev) => {
      const updatedList = prev.map((inq) =>
        inq.id === id
          ? {
              ...inq,
              status,
              notes: notes !== undefined ? notes : inq.notes,
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

  const addPartner = (item: Omit<Partner, "id">) => {
    const newPartner: Partner = { ...item, id: `part-${Date.now()}` };
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

  const addTestimonial = (item: Omit<Testimonial, "id">) => {
    const newTestimonial: Testimonial = { ...item, id: `test-${Date.now()}` };
    setTestimonials((prev) => [...prev, newTestimonial]);
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
    setPartners(initialPartners);
    setTestimonials(initialTestimonials);
    setMedia(seedMedia);
    setSettings(initialSettings);
    setCustomers(initialCustomers);
    setInventoryAdjustments(initialAdjustments);
    Object.values(STORAGE_KEYS).forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {}
    });
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        quotes,
        inquiries,
        partners,
        testimonials,
        media,
        settings,
        customers,
        inventoryAdjustments,
        currentRole,
        setCurrentRole,
        isLoaded,
        undoDeletedProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        undoDeleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateCustomerStatus,
        adjustStock,
        updateQuoteStatus,
        deleteQuote,
        updateInquiryStatus,
        deleteInquiry,
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