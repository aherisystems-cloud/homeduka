import { BusinessProfile, HomeService, HomeProduct, HomeRoom } from '../types/schema';

// ==========================================
// MASTER ROOM TAXONOMY FOR HOME KENYA
// ==========================================
export interface RoomCategoryDef {
  id: HomeRoom;
  title: string;
  tagline: string;
  icon: string;
  popularSearches: string[];
  bannerImage: string;
}

export const HOME_ROOMS: RoomCategoryDef[] = [
  {
    id: 'living_room',
    title: 'Living Room',
    tagline: 'Sofas, TV consoles, coffee tables, curtains & lighting',
    icon: '🛋️',
    popularSearches: ['7-Seater Sofas', 'Chesterfields', 'TV Wall Units', 'Curtain Sheers', 'Coffee Tables'],
    bannerImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    tagline: 'Hardwood beds, wardrobes, orthopedic mattresses & bedding',
    icon: '🛏️',
    popularSearches: ['6x6 Mahogany Beds', 'Fitted Wardrobes', 'Storage Beds', 'Orthopedic Mattresses'],
    bannerImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kitchen_dining',
    title: 'Kitchen & Dining',
    tagline: 'Dining tables, modular cabinetry, granite worktops & cookware',
    icon: '🍳',
    popularSearches: ['6-Seater Dining', 'Modular Kitchens', 'Granite Worktops', 'Pantry Organizers'],
    bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bathroom',
    title: 'Bathroom & Water',
    tagline: 'Solar water heaters, booster pumps, mixer taps & tiles',
    icon: '🚿',
    popularSearches: ['Solar Water Heaters', 'Pressure Pumps', 'Mixer Showers', 'Bathroom Vanities'],
    bannerImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'outdoor_compound',
    title: 'Compound & Outdoor',
    tagline: 'Driveway cabro, perimeter gates, patio sets & garden plants',
    icon: '🌿',
    popularSearches: ['Cabro Paving', 'Outdoor Patio Sets', 'Compound Gates', 'Garden Landscaping'],
    bannerImage: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'home_office',
    title: 'Home Office & Study',
    tagline: 'Hardwood desks, ergonomic study chairs & bookshelves',
    icon: '💼',
    popularSearches: ['Study Desks', 'Bookcases', 'Ergonomic Chairs', 'Wall Shelves'],
    bannerImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
  }
];

// ==========================================
// 5 PREMIER FLAGSHIP KENYAN HOME VENDORS
// ==========================================
export const SAMPLE_KENYAN_HOME_LISTINGS: BusinessProfile[] = [
  // 1. WoodCraft Living Kenya (Living Room, Bedroom, Dining)
  {
    id: "biz-woodcraft-kamakis-001",
    slug: "woodcraft-living-kamakis",
    business_name: "WoodCraft Living Kenya",
    tagline: "Solid Kiln-Dried Mahogany & Mvule Living, Bedroom & Dining Pieces",
    description: "Located along Eastern Bypass Kamakis, WoodCraft Living is a trusted artisan workshop specializing in kiln-dried Kenyan hardwoods (Mahogany, Mvule, Bluegum). Known for heirloom 7-seater sofas, hydraulic storage beds, and custom 6-8 seater dining tables. Open workshop with customer parking.",
    primary_vertical: "home",
    categories: ["furniture", "carpentry_cabinetry"],
    location: {
      country: "Kenya",
      county: "Kiambu",
      sub_county: "Ruiru",
      neighborhood: "Kamakis",
      landmark: "Opposite Shell Petrol Station, 120m off Eastern Bypass",
      stage_name: "Kamakis Stage",
      road_or_bypass: "Eastern Bypass",
      coordinates: { latitude: -1.1824, longitude: 36.9841 },
      service_coverage_areas: ["Ruiru", "Nairobi Metro", "Membley", "Kahawa Sukari", "Thika Road", "Countrywide Matatu Parcel"]
    },
    contact: {
      primary_phone: "254712345678",
      whatsapp_number: "254712345678",
      instagram_handle: "@woodcraft_living_ke",
      google_maps_url: "https://maps.google.com/?q=-1.1824,36.9841"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "cash_on_delivery", "bank_transfer"],
      mpesa_till_number: "894211",
      price_rating: "$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-08-15T10:00:00Z",
      verified_by: "Kenyan Operations Field Check",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "08:00 - 18:30",
      saturday: "08:30 - 17:30",
      sunday: "10:00 - 16:00",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80"
      ],
      portfolio_work_photos: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
      ]
    },
    reputation: {
      rating: 4.9,
      total_reviews: 48,
      completed_jobs_count: 210,
      response_time_minutes: 6
    },
    attributes: {
      has_customer_parking: true,
      samples_showroom_available: true,
      uses_solid_hardwood: true,
      custom_orders_accepted: true,
      delivery_available: true,
      delivery_scope: "nairobi_free",
      assembly_service_included: true,
      written_warranty_provided: true,
      warranty_duration_months: 24,
      affirmed_free_whatsapp_assessment: true,
      affirmed_free_local_measurement: true,
      free_measurement_coverage_neighborhoods: ["Kamakis", "Ruiru", "Membley", "Kahawa Sukari"]
    },
    seo: {
      meta_title: "WoodCraft Living Kenya | Custom Mahogany Sofas & Beds in Kamakis",
      meta_description: "Bespoke hardwood furniture, Chesterfield sofas, and mahogany beds along Eastern Bypass Kamakis. Free delivery in Nairobi and 2-year warranty.",
      keywords: ["hardwood furniture kamakis", "sofa makers ruiru", "mahogany beds eastern bypass", "custom carpentry nairobi"],
      canonical_url: "https://homekenya.co.ke/shop/woodcraft-living-kamakis"
    },
    created_at: "2026-08-01T08:00:00Z",
    updated_at: "2026-10-02T14:30:00Z"
  },

  // 2. FineLine Fitted Kitchens & Wardrobes (Kitchen, Pantry, Bedroom)
  {
    id: "biz-fineline-kitchens-002",
    slug: "fineline-fitted-kitchens-parklands",
    business_name: "FineLine Fitted Kitchens & Wardrobes",
    tagline: "Modern Modular Kitchens, Granite Worktops & Floor-to-Ceiling Wardrobes",
    description: "Nairobi's trusted interior cabinetry specialists based on Ojijo Road, Parklands. We design and install scratch-resistant modular acrylic and marine-ply kitchens with German soft-close hinges, quartz worktops, and custom walk-in bedroom wardrobes.",
    primary_vertical: "home",
    categories: ["carpentry_cabinetry", "interior_decor"],
    location: {
      country: "Kenya",
      county: "Nairobi",
      sub_county: "Westlands",
      neighborhood: "Parklands",
      landmark: "Ojijo Road, opposite Parklands Sports Club Gate 2",
      stage_name: "Museum Hill / Ojijo Stage",
      road_or_bypass: "Ojijo Road / Kipande Road",
      coordinates: { latitude: -1.2678, longitude: 36.8124 },
      service_coverage_areas: ["Parklands", "Westlands", "Lavington", "Kileleshwa", "Kilimani", "Gigiri", "Runda", "Karen"]
    },
    contact: {
      primary_phone: "254722883344",
      whatsapp_number: "254722883344",
      instagram_handle: "@fineline_kitchens_ke"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "bank_transfer"],
      mpesa_till_number: "761902",
      price_rating: "$$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-08-25T11:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "08:30 - 18:00",
      saturday: "09:00 - 16:00",
      sunday: "Closed",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [],
      portfolio_work_photos: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
      ]
    },
    reputation: {
      rating: 4.9,
      total_reviews: 36,
      completed_jobs_count: 145,
      response_time_minutes: 8
    },
    attributes: {
      has_customer_parking: true,
      samples_showroom_available: true,
      custom_orders_accepted: true,
      delivery_available: true,
      written_warranty_provided: true,
      warranty_duration_months: 36,
      affirmed_free_whatsapp_assessment: true,
      affirmed_free_local_measurement: true,
      free_measurement_coverage_neighborhoods: ["Parklands", "Westlands", "Lavington", "Kileleshwa"]
    },
    seo: {
      meta_title: "FineLine Fitted Kitchens & Wardrobes | Parklands, Westlands Nairobi",
      meta_description: "Custom modular kitchens, granite worktops and fitted wardrobes in Parklands & Westlands Nairobi. 3-year warranty.",
      keywords: ["fitted kitchens nairobi", "modular wardrobes parklands", "granite worktops westlands", "custom cabinetry kenya"],
      canonical_url: "https://homekenya.co.ke/shop/fineline-fitted-kitchens-parklands"
    },
    created_at: "2026-08-10T09:00:00Z",
    updated_at: "2026-10-01T12:00:00Z"
  },

  // 3. Solaria Energy & Water Systems (Bathroom, Solar Water, Plumbing)
  {
    id: "biz-solaria-water-003",
    slug: "solaria-energy-water-kilimani",
    business_name: "Solaria Energy & Water Systems",
    tagline: "Certified EPRA Solar Water Heating, Pressure Booster Pumps & 24/7 Plumbing",
    description: "Premier residential water engineering specialists serving Kilimani, Kileleshwa, Lavington, and Karen. Licensed EPRA solar water heating installations, low-pressure booster pumps, bathroom mixer fittings, and emergency pipe burst repairs.",
    primary_vertical: "home",
    categories: ["plumbing", "electrical_solar"],
    location: {
      country: "Kenya",
      county: "Nairobi",
      sub_county: "Dagoretti North",
      neighborhood: "Kilimani",
      landmark: "Near Quickmart Chania Avenue, opposite Yaya Centre junction",
      stage_name: "Yaya Stage",
      road_or_bypass: "Argwings Kodhek Road",
      coordinates: { latitude: -1.2921, longitude: 36.7858 },
      service_coverage_areas: ["Kilimani", "Kileleshwa", "Lavington", "Westlands", "Ngong Road", "Karen", "South C"]
    },
    contact: {
      primary_phone: "254799112233",
      whatsapp_number: "254799112233"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill", "cash_on_delivery"],
      mpesa_till_number: "776512",
      price_rating: "$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-07-10T12:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours",
      emergency_service_24_7: true
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [],
      portfolio_work_photos: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
      ]
    },
    reputation: {
      rating: 4.8,
      total_reviews: 73,
      completed_jobs_count: 380,
      response_time_minutes: 5
    },
    attributes: {
      brings_own_tools: true,
      provides_materials: true,
      labor_only_option: true,
      emergency_callout: true,
      licensed_electrician_epra: true,
      ncaw_certified_plumber: true,
      written_warranty_provided: true,
      warranty_duration_months: 12,
      affirmed_free_whatsapp_assessment: true,
      affirmed_free_local_measurement: true,
      free_measurement_coverage_neighborhoods: ["Kilimani", "Kileleshwa", "Lavington", "Hurlingham"]
    },
    seo: {
      meta_title: "Solar Water Heaters & 24/7 Plumbers in Kilimani | Solaria Kenya",
      meta_description: "EPRA certified solar water heating and fast-dispatch emergency plumbers in Kilimani & Kileleshwa.",
      keywords: ["solar water heaters kilimani", "emergency plumber lavington", "water pressure pump nairobi"],
      canonical_url: "https://homekenya.co.ke/shop/solaria-energy-water-kilimani"
    },
    created_at: "2026-07-01T09:00:00Z",
    updated_at: "2026-09-28T11:20:00Z"
  },

  // 4. Apex Gypsum Ceilings & Lighting (Living Room, Finishing, Compound)
  {
    id: "biz-apex-gypsum-004",
    slug: "apex-gypsum-lighting-syokimau",
    business_name: "Apex Gypsum Ceilings & Architectural Lighting",
    tagline: "Modern Floating Gypsum Ceilings, Warm LED Cove Strips & Interior Repainting",
    description: "Specialized in luxury contemporary living room ceiling transformations, acoustic drywall partitions, warm recessed LED lighting, and driveway interlocking cabro paving across Syokimau, Athi River, and Mombasa Road.",
    primary_vertical: "home",
    categories: ["painting_gypsum", "tiles_flooring"],
    location: {
      country: "Kenya",
      county: "Machakos",
      sub_county: "Mavoko",
      neighborhood: "Syokimau",
      landmark: "Near Gateway Mall / Syokimau Railway Station, Mombasa Road",
      road_or_bypass: "Mombasa Road",
      coordinates: { latitude: -1.3654, longitude: 36.9247 },
      service_coverage_areas: ["Syokimau", "Mlolongo", "Athi River", "Kitengela", "South B", "South C", "Nairobi West"]
    },
    contact: {
      primary_phone: "254722554433",
      whatsapp_number: "254722554433"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "cash_on_delivery"],
      mpesa_till_number: "482019",
      price_rating: "$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: false, // PRE-BUILT / UNCLAIMED TO DRIVE ONBOARDING ENGAGEMENT
      verified_at: "2026-09-12T14:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "08:00 - 18:00",
      saturday: "08:00 - 16:00",
      sunday: "Closed",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [],
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.8,
      total_reviews: 41,
      completed_jobs_count: 185,
      response_time_minutes: 7
    },
    attributes: {
      brings_own_tools: true,
      provides_materials: true,
      labor_only_option: true,
      written_warranty_provided: true,
      warranty_duration_months: 18,
      affirmed_free_whatsapp_assessment: true,
      affirmed_free_local_measurement: true,
      free_measurement_coverage_neighborhoods: ["Syokimau", "Mlolongo", "Athi River", "Kitengela"]
    },
    seo: {
      meta_title: "Gypsum Ceilings & Lighting in Syokimau | Apex Interiors Kenya",
      meta_description: "Top rated floating gypsum ceilings and LED cove lighting in Syokimau, Mlolongo, and Mombasa Road.",
      keywords: ["gypsum ceiling syokimau", "led ceiling lighting mombasa road", "cabro paving athi river"],
      canonical_url: "https://homekenya.co.ke/shop/apex-gypsum-lighting-syokimau"
    },
    created_at: "2026-09-05T08:00:00Z",
    updated_at: "2026-10-02T12:00:00Z"
  },

  // 5. CleanNest Pro Home Care & Relocations (Monthly Recurring, Sofa Extraction, Moving)
  {
    id: "biz-cleannest-pro-005",
    slug: "cleannest-home-care-movers",
    business_name: "CleanNest Pro Home Care & Relocations",
    tagline: "Monthly Deep Cleaning, Sofa Steam Shampooing, Eco Fumigation & Safe Moving",
    description: "The complete monthly maintenance and relocation partner for apartments and homes in Nairobi. We specialize in scheduled water tank scrubbing, deep fabric sofa foam extraction, certified bedbug fumigation, and stress-free residential house moving with packing blankets.",
    primary_vertical: "home",
    categories: ["cleaning_fumigation", "house_moving"],
    location: {
      country: "Kenya",
      county: "Nairobi",
      sub_county: "Langata",
      neighborhood: "Karen & Kilimani",
      landmark: "Near Karen Crossroad, branch in Kilimani Chania Avenue",
      stage_name: "Karen Shopping Centre",
      road_or_bypass: "Ngong Road / Langata Road",
      coordinates: { latitude: -1.3197, longitude: 36.7062 },
      service_coverage_areas: ["Karen", "Kilimani", "Kileleshwa", "Lavington", "Westlands", "Runda", "Syokimau", "Ruiru"]
    },
    contact: {
      primary_phone: "254711998877",
      whatsapp_number: "254711998877",
      instagram_handle: "@cleannest_pro_ke"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill"],
      mpesa_till_number: "904123",
      price_rating: "$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-09-18T10:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "07:30 - 18:30",
      saturday: "08:00 - 18:00",
      sunday: "09:00 - 16:00",
      emergency_service_24_7: true
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [],
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.9,
      total_reviews: 56,
      completed_jobs_count: 310,
      response_time_minutes: 5
    },
    attributes: {
      brings_own_tools: true,
      provides_materials: true,
      written_warranty_provided: true,
      warranty_duration_months: 6,
      affirmed_free_whatsapp_assessment: true,
      affirmed_free_local_measurement: true,
      free_measurement_coverage_neighborhoods: ["Karen", "Kilimani", "Lavington", "Kileleshwa"]
    },
    seo: {
      meta_title: "CleanNest Home Care & Movers | Nairobi Deep Cleaning & Relocations",
      meta_description: "Monthly home deep cleaning, sofa steam shampooing, fumigation, and house moving in Karen & Kilimani.",
      keywords: ["sofa cleaning nairobi", "house movers karen", "pest control kilimani", "water tank cleaning nairobi"],
      canonical_url: "https://homekenya.co.ke/shop/cleannest-home-care-movers"
    },
    created_at: "2026-09-10T08:00:00Z",
    updated_at: "2026-10-04T15:00:00Z"
  }
];

// ==========================================
// CURATED HOME PRODUCTS (By Room & Need)
// ==========================================
export const SAMPLE_KENYAN_HOME_PRODUCTS: HomeProduct[] = [
  // WoodCraft Living Products
  {
    id: "prod-sofa-001",
    business_id: "biz-woodcraft-kamakis-001",
    title: "Chesterfield 7-Seater Solid Mahogany Modern Sofa Set",
    slug: "chesterfield-7-seater-mahogany-sofa",
    category: "furniture",
    subcategory: "sofas",
    room: "living_room",
    description: "Kiln-dried solid mahogany frame with premium high-density resilience foam and stain-resistant velvet upholstery. Includes 1 three-seater, 1 two-seater, and 2 single accent armchairs.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 58000,
      negotiable: true
    },
    specifications: {
      material: "Kiln-Dried Solid Mahogany & Velvet Fabric",
      dimensions: "Standard 7-Seater Layout",
      color_options: ["Emerald Green", "Navy Blue", "Warm Charcoal", "Mocha Beige"],
      in_stock: true,
      is_made_to_order: false,
      lead_time_days: 0,
      warranty_months: 24
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-08-15T08:00:00Z"
  },
  {
    id: "prod-bed-002",
    business_id: "biz-woodcraft-kamakis-001",
    title: "6x6 Bespoke Storage Bed with Hydraulic Lift Underbed Drawers",
    slug: "6x6-bespoke-storage-bed-mvule",
    category: "furniture",
    subcategory: "beds",
    room: "bedroom",
    description: "Handcrafted from solid Mvule hardwood with hidden hydraulic lift under-mattress storage and 4 smooth sliding drawer compartments. Finished in satin polyurethane.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 42000,
      negotiable: true
    },
    specifications: {
      material: "Solid Mvule Hardwood & Tufted Headboard",
      dimensions: "6ft x 6ft (King Size)",
      in_stock: true,
      is_made_to_order: true,
      lead_time_days: 5,
      warranty_months: 36
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-08-18T08:00:00Z"
  },
  {
    id: "prod-dining-003",
    business_id: "biz-woodcraft-kamakis-001",
    title: "6-Seater Solid Hardwood Dining Table with Padded Chairs",
    slug: "6-seater-solid-hardwood-dining-table",
    category: "furniture",
    subcategory: "dining_tables",
    room: "kitchen_dining",
    description: "Solid mahogany dining table measuring 6ft x 3.5ft with 6 high-back ergonomically padded dining chairs upholstered in wipe-clean fabric.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 46000,
      negotiable: true
    },
    specifications: {
      material: "Solid Mahogany Top & Legs",
      dimensions: "6ft x 3.5ft Table",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 24
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-08-20T08:00:00Z"
  },

  // FineLine Kitchens Products
  {
    id: "prod-wardrobe-004",
    business_id: "biz-fineline-kitchens-002",
    title: "Floor-to-Ceiling 4-Door Fitted Bedroom Wardrobe with Mirrors",
    slug: "fitted-bedroom-wardrobe-4-door",
    category: "carpentry_cabinetry",
    subcategory: "wardrobes",
    room: "bedroom",
    description: "Custom built wardrobe with German Blum soft-close hinges, dual hanging rails, shoe racks, and full-length mirrored door panels in scratch-resistant Egger board.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 52000,
      negotiable: false
    },
    specifications: {
      material: "Marine Plywood Core & Melamine Face",
      dimensions: "8ft Height x 6ft Width",
      in_stock: false,
      is_made_to_order: true,
      lead_time_days: 7,
      warranty_months: 36
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: false,
      pickup_available: false
    },
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-08-25T08:00:00Z"
  },

  // Solaria Water Products
  {
    id: "prod-solar-water-005",
    business_id: "biz-solaria-water-003",
    title: "200L High-Pressure Pressurized Solar Water Heater (EPRA Certified)",
    slug: "200l-solar-water-heater-system",
    category: "electrical_solar",
    subcategory: "solar_water_heaters",
    room: "bathroom",
    description: "Complete 200 Litre pressurized solar water heating system with high-efficiency vacuum heat pipes, stainless steel inner cylinder, electrical backup element, and digital controller.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 78000,
      negotiable: true
    },
    specifications: {
      material: "SUS304 Food Grade Stainless Steel & Copper Heat Pipes",
      dimensions: "200 Litre Capacity",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 60
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-01T08:00:00Z"
  },
  {
    id: "prod-pump-006",
    business_id: "biz-solaria-water-003",
    title: "Automatic 0.75HP Domestic Water Booster Pump with Flow Switch",
    slug: "automatic-water-booster-pump-075hp",
    category: "plumbing",
    subcategory: "water_pumps",
    room: "bathroom",
    description: "Silent automatic water pressure boosting pump for multi-storey apartments and bungalows. Automatically starts when showers or taps open and stops when closed.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 24500,
      negotiable: false
    },
    specifications: {
      material: "Cast Iron Body & Brass Impeller",
      dimensions: "0.75 HP / 550W",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 12
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-05T08:00:00Z"
  }
];

// ==========================================
// CURATED SERVICES & MONTHLY RECURRING NEEDS
// ==========================================
export const SAMPLE_KENYAN_HOME_SERVICES: HomeService[] = [
  // Apex Gypsum - Living Room / Ceilings
  {
    id: "srv-gypsum-001",
    business_id: "biz-apex-gypsum-004",
    title: "Modern Multi-Level Floating Gypsum Ceilings with Warm LED Lighting",
    slug: "modern-floating-gypsum-ceiling-installation",
    service_category: "painting_gypsum",
    room: "living_room",
    is_recurring: false,
    description: "Architectural gypsum ceiling design with galvanized metal framing, acoustic boards, recessed LED spotlights, and concealed warm LED strip cove lighting for living rooms and master bedrooms.",
    pricing: {
      price_type: "fixed",
      starting_price_kes: 1900,
      unit: "per_sqm",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 48,
      materials_included: true,
      warranty_guarantee_days: 365,
      service_radius_km: 30
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Free site measurement across Syokimau, Mlolongo, Kitengela & South C"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-15T08:00:00Z"
  },

  // FineLine - Kitchen Modular Fitting
  {
    id: "srv-kitchen-fit-002",
    business_id: "biz-fineline-kitchens-002",
    title: "Complete Modular L-Shaped Kitchen Cabinetry Design & Fitting",
    slug: "modular-kitchen-cabinetry-fitting",
    service_category: "carpentry_cabinetry",
    room: "kitchen_dining",
    is_recurring: false,
    description: "Custom fabrication and on-site fitting of lower cabinets, overhead wall units, soft-close cutlery drawers, and granite/quartz countertop fitting with sink cutout.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 95000,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 72,
      materials_included: true,
      warranty_guarantee_days: 1095,
      service_radius_km: 25
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Free 3D kitchen design & site visit in Parklands, Westlands & Lavington"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-18T08:00:00Z"
  },

  // Solaria - Emergency Plumbing & Solar Leak
  {
    id: "srv-plumb-003",
    business_id: "biz-solaria-water-003",
    title: "Emergency Pipe Burst, Mixer Tap Leak & Solar Heating Element Repair",
    slug: "emergency-pipe-burst-solar-leak-repair",
    service_category: "plumbing",
    room: "bathroom",
    is_recurring: false,
    description: "Fast-dispatch 20-minute emergency plumbing across Kilimani and Kileleshwa. Repairs for burst PPR lines, dripping mixers, pressure pump flow failures, and faulty solar elements.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 1800,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: true,
      estimated_duration_hours: 2,
      materials_included: false,
      warranty_guarantee_days: 30,
      service_radius_km: 15
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Send photo/video on WhatsApp for free instant quote • Under 20 min response"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-01T08:00:00Z"
  },

  // CleanNest - Monthly Recurring Deep Cleaning
  {
    id: "srv-clean-monthly-004",
    business_id: "biz-cleannest-pro-005",
    title: "Monthly Recurring Full-Home Deep Cleaning & Kitchen Degreasing",
    slug: "monthly-home-deep-cleaning-subscription",
    service_category: "cleaning_fumigation",
    room: "whole_house",
    is_recurring: true,
    description: "Scheduled monthly comprehensive home sanitation: steam tile scrubbing, kitchen grease removal, oven & hood descaling, window washing, and bathroom lime-scale extraction.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 6500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: true,
      estimated_duration_hours: 6,
      materials_included: true,
      warranty_guarantee_days: 7,
      service_radius_km: 30
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Custom recurring monthly schedule with dedicated vetted crew"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-10T08:00:00Z"
  },

  // CleanNest - Sofa & Mattress Steam Shampoo
  {
    id: "srv-sofa-shampoo-005",
    business_id: "biz-cleannest-pro-005",
    title: "7-Seater Sofa & Mattress Deep Machine Shampoo Wash",
    slug: "7-seater-sofa-mattress-steam-shampoo",
    service_category: "cleaning_fumigation",
    room: "living_room",
    is_recurring: true,
    description: "Deep shampoo machine wash for fabric and velvet sofas. Cleans tough stains, dust mites, and odors. Dry and ready to use in 3 hours.",
    pricing: {
      price_type: "fixed",
      starting_price_kes: 3800,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 3,
      materials_included: true,
      warranty_guarantee_days: 14,
      service_radius_km: 25
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Send sofa photo on WhatsApp for instant quote and same-day booking"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-12T08:00:00Z"
  },

  // CleanNest - Water Tank Cleaning & Fumigation
  {
    id: "srv-tank-clean-006",
    business_id: "biz-cleannest-pro-005",
    title: "Water Tank Deep Cleaning, Mud Removal & Safe Chlorination",
    slug: "water-tank-scrubbing-chlorination-nairobi",
    service_category: "cleaning_fumigation",
    room: "outdoor_compound",
    is_recurring: true,
    description: "Complete draining, high-pressure washing, mud removal, and safe chlorine disinfection for 1,000L to 10,000L domestic water tanks across Nairobi.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 3500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 4,
      materials_included: true,
      warranty_guarantee_days: 90,
      service_radius_km: 30
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Recommended every 3-6 months for clean household tap water"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-15T08:00:00Z"
  }
];

// ==========================================
// MONTHLY RECURRING HOME ESSENTIALS CATALOG
// ==========================================
export interface RecurringHomeServiceCard {
  id: string;
  title: string;
  frequency: string;
  priceEstimate: string;
  icon: string;
  description: string;
  providerId: string;
}

export const MONTHLY_RECURRING_HOME_SERVICES: RecurringHomeServiceCard[] = [
  {
    id: "rec-tank-01",
    title: "Water Tank Deep Cleaning & Chlorination",
    frequency: "Every 3 Months",
    priceEstimate: "From KSh 3,500",
    icon: "💧",
    description: "Drain water, remove mud and silt, pressure wash walls, and disinfect with safe chlorine.",
    providerId: "biz-cleannest-pro-005"
  },
  {
    id: "rec-fumig-02",
    title: "Pest Control & Bedbug Spray",
    frequency: "Every 2–4 Months",
    priceEstimate: "From KSh 4,500",
    icon: "🐜",
    description: "Safe spray and gel for bedbugs, cockroaches, and ants. Child and pet friendly.",
    providerId: "biz-cleannest-pro-005"
  },
  {
    id: "rec-sofa-03",
    title: "Deep Sofa & Carpet Machine Wash",
    frequency: "Every 1–2 Months",
    priceEstimate: "From KSh 3,800",
    icon: "🧽",
    description: "Deep shampoo machine wash for sitting room sofas, dining chairs, and mattresses to remove stains and dust.",
    providerId: "biz-cleannest-pro-005"
  },
  {
    id: "rec-solar-04",
    title: "Solar Water Heater Service & Check",
    frequency: "Every 6 Months",
    priceEstimate: "From KSh 3,500",
    icon: "☀️",
    description: "Clean solar tubes, remove scale, and check heating elements so you always have hot water.",
    providerId: "biz-solaria-water-003"
  },
  {
    id: "rec-garden-05",
    title: "Compound & Garden Care",
    frequency: "Monthly",
    priceEstimate: "From KSh 2,500",
    icon: "🌿",
    description: "Mow the lawn, trim hedges, weed flowers, and sweep the compound.",
    providerId: "biz-apex-gypsum-004"
  }
];
