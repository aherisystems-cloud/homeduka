-- ============================================================================
-- HOME KENYA DIGITAL MARKETPLACE: POSTGRESQL & POSTGIS SCHEMA
-- Target Database: Supabase (PostgreSQL 16)
-- License: MIT / Proprietary
-- ============================================================================

-- Enable PostGIS for spatial and radial distance queries (e.g. "within 5km of Ruiru")
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BUSINESSES / SHOWROOMS TABLE
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    tagline TEXT,
    description TEXT,
    primary_vertical VARCHAR(50) DEFAULT 'home',
    categories TEXT[] NOT NULL,
    
    -- Location & Kenyan Mental Geography
    county VARCHAR(100) NOT NULL,
    sub_county VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    landmark VARCHAR(255) NOT NULL,
    stage_name VARCHAR(100),
    road_or_bypass VARCHAR(100),
    coordinates GEOMETRY(Point, 4326), -- PostGIS spatial point (lon, lat)
    service_coverage_areas TEXT[],
    
    -- Contact & Communication
    primary_phone VARCHAR(50) NOT NULL,
    whatsapp_number VARCHAR(50) NOT NULL,
    secondary_phone VARCHAR(50),
    email VARCHAR(255),
    website_url TEXT,
    instagram_handle VARCHAR(100),
    tiktok_handle VARCHAR(100),
    
    -- Commercial & Trust Architecture
    has_physical_shop BOOLEAN DEFAULT true,
    accepts_cash_on_delivery BOOLEAN DEFAULT true,
    payment_methods TEXT[] DEFAULT ARRAY['lipa_na_mpesa_till', 'cash_on_delivery'],
    mpesa_till_number VARCHAR(50),
    mpesa_paybill_number VARCHAR(50),
    price_rating VARCHAR(10) DEFAULT '$$',
    
    -- Verification & Claiming
    verification_tier VARCHAR(50) DEFAULT 'unverified', -- unverified, phone_verified, location_checked, verified_pro, featured_partner
    is_claimed BOOLEAN DEFAULT false,
    magic_auth_token VARCHAR(255),
    token_expires_at TIMESTAMPTZ,
    guarantee_or_warranty_offered BOOLEAN DEFAULT true,
    
    -- Reputation & Stats
    rating NUMERIC(3,2) DEFAULT 4.8,
    total_reviews INT DEFAULT 0,
    completed_jobs_count INT DEFAULT 0,
    response_time_minutes INT DEFAULT 15,
    
    -- Media
    cover_image_url TEXT,
    workshop_photos TEXT[],
    portfolio_work_photos TEXT[],
    
    -- Deep Attribute Graph (JSONB)
    attributes JSONB DEFAULT '{}'::jsonb,
    
    -- SEO Metadata
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT[],
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for high-performance searching
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_county ON public.businesses(county);
CREATE INDEX IF NOT EXISTS idx_businesses_neighborhood ON public.businesses(neighborhood);
CREATE INDEX IF NOT EXISTS idx_businesses_categories ON public.businesses USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_businesses_attributes ON public.businesses USING GIN(attributes);
CREATE INDEX IF NOT EXISTS idx_businesses_coordinates ON public.businesses USING GIST(coordinates);

-- 2. PRODUCTS TABLE (Furniture, Appliances, Decor)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    
    -- Pricing
    price_type VARCHAR(50) DEFAULT 'fixed',
    regular_price_kes NUMERIC(12,2) NOT NULL,
    discount_price_kes NUMERIC(12,2),
    is_negotiable BOOLEAN DEFAULT false,
    
    -- Specifications & Lead Times
    material VARCHAR(255),
    dimensions VARCHAR(100),
    color_options TEXT[],
    in_stock BOOLEAN DEFAULT true,
    is_made_to_order BOOLEAN DEFAULT false,
    lead_time_days INT DEFAULT 5,
    warranty_months INT DEFAULT 12,
    
    -- Delivery Scope
    nairobi_delivery_fee_kes NUMERIC(10,2) DEFAULT 0,
    delivers_countrywide BOOLEAN DEFAULT true,
    pickup_available BOOLEAN DEFAULT true,
    
    images TEXT[] NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_business_id ON public.products(business_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);

-- 3. SERVICES TABLE (Fundis, Repairs, Moving)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    service_category VARCHAR(100) NOT NULL,
    description TEXT,
    
    price_type VARCHAR(50) DEFAULT 'starting_from',
    unit VARCHAR(50) DEFAULT 'per_job',
    starting_price_kes NUMERIC(12,2),
    inspection_fee_kes NUMERIC(10,2) DEFAULT 0,
    waives_inspection_fee_if_hired BOOLEAN DEFAULT true,
    
    emergency_available BOOLEAN DEFAULT false,
    materials_included BOOLEAN DEFAULT false,
    warranty_guarantee_days INT DEFAULT 30,
    service_radius_km INT DEFAULT 25,
    
    portfolio_photos TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_business_id ON public.services(business_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(service_category);

-- 4. CHANNEL DROPS TABLE (WhatsApp Daily Monetization Drops)
CREATE TABLE IF NOT EXISTS public.channel_drops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    drop_date DATE NOT NULL,
    category_slot VARCHAR(50) NOT NULL, -- furniture, improvement, decor
    drop_price_kes NUMERIC(10,2) NOT NULL DEFAULT 500.00,
    mpesa_receipt_number VARCHAR(100),
    is_paid BOOLEAN DEFAULT false,
    is_broadcasted BOOLEAN DEFAULT false,
    broadcasted_at TIMESTAMPTZ,
    channel_clicks INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_channel_drops_date ON public.channel_drops(drop_date);

-- 5. LEAD & ENGAGEMENT EVENTS (Analytics & Attribution)
CREATE TABLE IF NOT EXISTS public.lead_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL, -- whatsapp_click, phone_call, magic_link_view
    referrer_url TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_business_id ON public.lead_events(business_id);
CREATE INDEX IF NOT EXISTS idx_lead_events_created_at ON public.lead_events(created_at);

-- 6. SEED DATA (Authentic Pilot Records)
INSERT INTO public.businesses (
    slug, business_name, tagline, description, primary_vertical, categories,
    county, sub_county, neighborhood, landmark, road_or_bypass,
    primary_phone, whatsapp_number, has_physical_shop, accepts_cash_on_delivery,
    mpesa_till_number, verification_tier, is_claimed,
    cover_image_url, workshop_photos, attributes,
    meta_title, meta_description
) VALUES 
(
    'classic-hardwood-furniture-kamakis',
    'Classic Hardwood & Bespoke Carpentry',
    'Kiln-Dried Mahogany & Mvule Living Room & Bedroom Sets',
    'Specialized in custom solid hardwood furniture, contemporary sofa sets, and orthopedic bed frames along Eastern Bypass.',
    'home',
    ARRAY['furniture', 'carpentry_cabinetry'],
    'Kiambu', 'Ruiru', 'Kamakis', 'Opposite Shell Station, 150m off Bypass', 'Eastern Bypass',
    '+254712345678', '+254712345678', true, true,
    '894211', 'verified_pro', true,
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'],
    '{"uses_solid_hardwood": true, "has_customer_parking": true, "written_warranty_provided": true, "warranty_duration_months": 24, "delivery_scope": "nairobi_free"}'::jsonb,
    'Classic Hardwood & Sofa Makers in Ruiru, Kamakis | Real Solid Wood',
    'Bespoke hardwood furniture, 7-seater sofas, and mahogany beds in Ruiru Kamakis with free Nairobi delivery.'
),
(
    'quickfix-plumbers-kilimani',
    'QuickFix 24/7 Plumbing & Solar Water Systems',
    'Licensed Emergency Plumbers, Solar Heating & Borehole Pumps',
    'Licensed plumbing professionals serving Kilimani, Kileleshwa, and Westlands with zero inspection fee if hired.',
    'home',
    ARRAY['plumbing', 'electrical_solar'],
    'Nairobi', 'Dagoretti North', 'Kilimani', 'Near Quickmart Chania Avenue', 'Argwings Kodhek Road',
    '+254799112233', '+254799112233', true, true,
    '776512', 'verified_pro', true,
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    ARRAY['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'],
    '{"emergency_callout": true, "ncaw_certified_plumber": true, "brings_own_tools": true, "written_warranty_provided": true}'::jsonb,
    'Emergency Plumbers in Kilimani & Kileleshwa | 24/7 Response',
    'Call verified 24/7 emergency plumbers in Kilimani and Kileleshwa. Solar water systems and pipe bursts.'
)
ON CONFLICT (slug) DO NOTHING;
