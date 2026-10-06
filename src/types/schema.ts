/**
 * HOME DIGITAL MARKETPLACE ENGINE (KENYA)
 * Core Domain Schema & Types
 * 
 * Designed for:
 * 1. Low-friction, multi-channel ingestion (WhatsApp, Audio, Scraping, Forms)
 * 2. Deterministic attribute-based decision engine
 * 3. Programmatic SEO and collection routing
 * 4. High-trust Kenyan local commerce (M-Pesa, Landmark navigation, Physical proof)
 */

export type KenyanCounty = 
  | 'Nairobi'
  | 'Kiambu'
  | 'Machakos'
  | 'Kajiado'
  | 'Mombasa'
  | 'Nakuru'
  | 'Kisumu'
  | 'Uasin Gishu'
  | string;

export type VerificationTier = 
  | 'unverified'       // Scraped or self-submitted basic profile
  | 'phone_verified'   // OTP or Safaricom phone ownership confirmed
  | 'location_checked' // Physical workshop/shop GPS & landmark confirmed
  | 'verified_pro'     // M-Pesa Till verified + past work portfolio checked
  | 'featured_partner';// Sponsored / vetted flagship vendor

export type PriceType = 
  | 'fixed'
  | 'starting_from'
  | 'range'
  | 'contact_for_quote'
  | 'inspection_fee';

export type PaymentMethod = 
  | 'lipa_na_mpesa_till'     // Buy Goods Till (High trust in Kenya)
  | 'mpesa_paybill'          // Business Paybill
  | 'mpesa_send_money'       // Standard mobile number
  | 'cash_on_delivery'       // Critical trust factor for furniture/decor
  | 'bank_transfer'
  | 'card';

// ==========================================
// 1. LOCATION SCHEMA (Kenyan Mental Geography)
// ==========================================
export interface KenyanLocation {
  country: 'Kenya';
  county: KenyanCounty;
  sub_county: string;          // e.g., 'Ruiru', 'Westlands', 'Dagoretti North'
  neighborhood: string;        // e.g., 'Kamakis', 'Kahawa Sukari', 'Kilimani', 'Kileleshwa'
  landmark: string;            // e.g., 'Behind Quickmart Kamakis', 'Opposite shell station'
  stage_name?: string;         // e.g., 'Stage ya flyover', 'Kabuiku stage'
  road_or_bypass?: string;     // e.g., 'Eastern Bypass', 'Ngong Road', 'Waiyaki Way'
  shop_number_or_floor?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  service_coverage_areas?: string[]; // e.g. ['Nairobi County', 'Kiambu Metro', 'Machakos']
}

// ==========================================
// 2. BUSINESS / VENDOR PROFILE
// ==========================================
export interface BusinessProfile {
  id: string;                  // UUID or slug-based ID
  slug: string;                // e.g. "classic-hardwood-furniture-kamakis"
  business_name: string;
  tagline?: string;
  description: string;         // Clean, human, non-AI corporate speak
  
  // Vertical & Categorization
  primary_vertical: 'home';
  categories: Array<
    | 'furniture'
    | 'interior_decor'
    | 'kitchen_appliances'
    | 'plumbing'
    | 'electrical_solar'
    | 'painting_gypsum'
    | 'carpentry_cabinetry'
    | 'house_moving'
    | 'cleaning_fumigation'
    | 'security_cctv'
    | 'tiles_flooring'
    | 'gardening_landscaping'
  >;
  
  // Location
  location: KenyanLocation;
  
  // Contact & Communication Channels
  contact: {
    primary_phone: string;     // 2547XXXXXXXX
    whatsapp_number: string;   // 2547XXXXXXXX (Direct chat anchor)
    secondary_phone?: string;
    email?: string;
    website_url?: string;
    instagram_handle?: string;
    tiktok_handle?: string;
    google_maps_url?: string;
  };
  
  // Commercial & Trust Architecture
  commercial: {
    has_physical_shop: boolean;
    accepts_cash_on_delivery: boolean;
    payment_methods: PaymentMethod[];
    mpesa_till_number?: string;
    mpesa_paybill_number?: string;
    price_rating: '$' | '$$' | '$$$' | '$$$$'; // Budget, Moderate, Premium, Luxury
  };

  verification: {
    tier: VerificationTier;
    is_claimed: boolean;
    verified_at?: string;
    verified_by?: string;
    id_or_registration_verified?: boolean;
    physical_visit_verified?: boolean;
    guarantee_or_warranty_offered: boolean;
  };

  operating_hours: {
    monday_friday: string;     // e.g. "08:00 - 18:00"
    saturday: string;          // e.g. "08:30 - 17:00"
    sunday: string;            // e.g. "Closed" or "10:00 - 16:00"
    emergency_service_24_7: boolean;
  };

  media: {
    logo_url?: string;
    cover_image_url: string;
    workshop_photos: string[];
    portfolio_work_photos: string[];
    video_tour_url?: string;
  };

  reputation: {
    rating: number;             // e.g. 4.8
    total_reviews: number;
    completed_jobs_count?: number;
    response_time_minutes?: number; // e.g. 15 (WhatsApp average)
  };

  // Structured Metadata & Extensible Graph
  attributes: BusinessAttributes;
  
  // SEO & Distribution State
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
    canonical_url: string;
  };
  
  created_at: string;
  updated_at: string;
}

// ==========================================
// 3. HOME ATTRIBUTES GRAPH (Decision Engine)
// ==========================================
export interface BusinessAttributes {
  // Physical / Shop attributes
  has_customer_parking?: boolean;
  wheelchair_accessible?: boolean;
  samples_showroom_available?: boolean;
  
  // Fundi / Service attributes
  brings_own_tools?: boolean;
  provides_materials?: boolean;
  labor_only_option?: boolean;
  emergency_callout?: boolean;
  licensed_electrician_epra?: boolean; // Kenya EPRA certified
  ncaw_certified_plumber?: boolean;
  written_warranty_provided?: boolean;
  warranty_duration_months?: number;

  // Furniture / Product capabilities
  uses_solid_hardwood?: boolean;      // Mahogany, Mvule, Teak, Bluegum
  custom_orders_accepted?: boolean;
  delivery_available?: boolean;
  delivery_scope?: 'nairobi_free' | 'nairobi_paid' | 'countrywide_matatu_sacco' | 'customer_pickup';
  assembly_service_included?: boolean;
  payment_terms?: 'pay_on_delivery' | 'deposit_required' | 'flexible_installments';
  deposit_percentage_required?: number; // e.g., 30 for custom furniture
}

// ==========================================
// 4. PRODUCT SCHEMA (Furniture, Decor, Appliances)
// ==========================================
export interface HomeProduct {
  id: string;
  business_id: string;
  title: string;               // e.g. "Modern Chesterfield 7-Seater Sofa Set"
  slug: string;
  category: string;
  subcategory: string;
  description: string;

  pricing: {
    price_type: PriceType;
    regular_price_kes: number;
    discount_price_kes?: number;
    negotiable: boolean;
  };

  specifications: {
    material?: string;         // e.g. "Kiln-dried Mahogany & Velvet Fabric"
    dimensions?: string;       // e.g. "6ft x 6ft King Size"
    color_options?: string[];
    in_stock: boolean;
    is_made_to_order: boolean;
    lead_time_days?: number;   // e.g. 5-7 days for bespoke carpentry
    warranty_months?: number;
  };

  delivery: {
    nairobi_delivery_fee_kes: number; // 0 if free
    delivers_countrywide: boolean;
    pickup_available: boolean;
  };

  images: string[];
  is_featured: boolean;
  created_at: string;
}

// ==========================================
// 5. SERVICE SCHEMA (Fundis, Repairs, Moving)
// ==========================================
export interface HomeService {
  id: string;
  business_id: string;
  title: string;               // e.g. "Gypsum Ceiling Design, Installation & Lighting"
  slug: string;
  service_category: string;
  description: string;

  pricing: {
    price_type: PriceType;
    unit?: 'per_sqm' | 'per_point' | 'per_room' | 'per_day' | 'fixed_job' | 'inspection_only';
    starting_price_kes?: number;
    inspection_or_consultation_fee_kes?: number;
    waives_inspection_fee_if_hired: boolean;
  };

  service_terms: {
    emergency_available: boolean;
    estimated_duration_hours?: number;
    materials_included: boolean;
    warranty_guarantee_days?: number;
    service_radius_km?: number;
  };

  portfolio_photos: string[];
  created_at: string;
}

// ==========================================
// 6. PROGRAMMATIC ASSET & COLLECTION DEFINITION
// ==========================================
export interface ProgrammaticCollectionPage {
  slug: string;                // e.g. "sofa-makers-in-ruiru-kamakis"
  h1_title: string;            // e.g. "Custom Sofa Makers & Upholstery in Ruiru (Kamakis)"
  meta_title: string;          // e.g. "Top 10 Verified Sofa Makers in Ruiru, Kamakis | Prices & Delivery"
  meta_description: string;
  filter_query: {
    category?: string;
    sub_county?: string;
    neighborhood?: string;
    attribute_filters?: Record<string, any>;
  };
  breadcrumbs: Array<{ label: string; url: string }>;
  faq_schema: Array<{ question: string; answer: string }>;
}
