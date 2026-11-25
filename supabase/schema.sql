-- ==============================================================================
-- bmtradingplc - Master PostgreSQL / Supabase Schema
-- Complete Database Architecture, Row-Level Security, Indexes, and Constraints
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. SITE SETTINGS & CONFIGURATION TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL DEFAULT 'bmtradingplc',
    legal_name TEXT NOT NULL DEFAULT 'bmtradingplc',
    tagline TEXT DEFAULT 'Safarian Boards & Structural Plywood Solutions',
    description TEXT,
    contact_email TEXT NOT NULL DEFAULT 'info@bmtradingplc.com',
    sales_email TEXT NOT NULL DEFAULT 'sales@bmtradingplc.com',
    phone TEXT NOT NULL DEFAULT '+251911247821',
    phone_display TEXT NOT NULL DEFAULT '0911 247 821',
    secondary_phone TEXT DEFAULT '0911 221 261',
    tertiary_phone TEXT DEFAULT '0910 953 373',
    whatsapp TEXT DEFAULT '+251911247821',
    telegram TEXT DEFAULT '+251911247821',
    street_address TEXT DEFAULT 'Addis Ababa, Ayer Tena, Shamo Tower, 3rd Floor',
    factory_address TEXT DEFAULT 'Central Ethiopia, Werabe City',
    city TEXT DEFAULT 'Addis Ababa',
    region TEXT DEFAULT 'Addis Ababa',
    country TEXT DEFAULT 'Ethiopia',
    business_hours TEXT DEFAULT 'Monday – Saturday: 08:30 – 17:30 (EAT)',
    years_experience INT DEFAULT 10,
    major_clients_count INT DEFAULT 200,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. PRODUCT CATEGORIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. PRODUCTS & SPECIFICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    short_description TEXT,
    description TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '{}'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock', 'on_order')),
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. QUOTE REQUESTS (RFQs) TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quotes (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    company_name TEXT,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    product_requested TEXT NOT NULL,
    thickness TEXT,
    grade TEXT,
    quantity TEXT NOT NULL,
    delivery_type TEXT DEFAULT 'delivery' CHECK (delivery_type IN ('delivery', 'yard_pickup')),
    delivery_address TEXT,
    target_date TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'sent', 'accepted', 'declined')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. CONTACT INQUIRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    product TEXT NOT NULL,
    quantity TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. PARTNERS & CLIENT ORGANIZATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    initials TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. TESTIMONIALS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    project_type TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. MEDIA ASSETS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_assets (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INT NOT NULL,
    folder TEXT DEFAULT 'products',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. INDEXES FOR HIGH-PERFORMANCE QUERYING
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_order ON public.categories(order_index);

-- ------------------------------------------------------------------------------
-- 10. ROW-LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Partners" ON public.partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (is_active = true);

CREATE POLICY "Public Insert Quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Full Access Settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Quotes" ON public.quotes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Partners" ON public.partners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Media" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT INSERT ON public.quotes, public.inquiries TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
