import { BusinessProfile, HomeService, HomeProduct, HomeRoom, HomeDeal, VerifiedReview } from '../types/schema';

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
    description: "Located along Eastern Bypass Kamakis, WoodCraft Living is a trusted local furniture shop and yard specializing in Kenyan hardwoods (Mahogany, Mvule, Bluegum). Known for 7-seater sofas, hydraulic storage beds, and custom 6-8 seater dining tables. Open showroom and yard with customer parking. Delivers countrywide.",
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
    contact_person: {
      name: "John M. Mwangi",
      role: "Workshop & Showroom Manager",
      phone: "0712 345 678",
      id_verified: true
    },
    recommendations: {
      percent: 98,
      count: 148
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "cash_on_delivery", "bank_transfer"],
      mpesa_till_number: "894211",
      seller_terms_badge: "Pay When Delivered",
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
    contact_person: {
      name: "Grace W. Njuguna",
      role: "Lead Cabinetry Designer",
      phone: "0722 883 344",
      id_verified: true
    },
    recommendations: {
      percent: 97,
      count: 112
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "bank_transfer"],
      mpesa_till_number: "761902",
      seller_terms_badge: "30% Deposit (Made for You)",
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
    contact_person: {
      name: "Eng. Brian Oduor",
      role: "Lead Systems Engineer",
      phone: "0799 112 233",
      id_verified: true
    },
    recommendations: {
      percent: 99,
      count: 89
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill", "mpesa_pochi_la_biashara", "cash_on_delivery"],
      mpesa_till_number: "776512",
      mpesa_paybill_number: "400200",
      mpesa_paybill_account: "SOLARIA",
      mpesa_pochi_number: "0799 112 233",
      seller_terms_badge: "Pay After Work is Done",
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
    contact_person: {
      name: "David Kariuki",
      role: "Technical Site Supervisor",
      phone: "0722 554 433",
      id_verified: true
    },
    recommendations: {
      percent: 96,
      count: 134
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill", "cash_on_delivery"],
      mpesa_till_number: "482019",
      mpesa_paybill_number: "247247",
      mpesa_paybill_account: "APEX482",
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
    contact_person: {
      name: "Mercy Akinyi",
      role: "Operations Coordinator",
      phone: "0711 998 877",
      id_verified: true
    },
    recommendations: {
      percent: 98,
      count: 220
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
  },

  // 6. Nairobi Tech Point Electronics (Phones, Laptops, TVs, CCTV, Audio)
  {
    id: "biz-nairobi-tech-hub-006",
    slug: "nairobi-tech-point-electronics",
    business_name: "Nairobi Tech Point & Gadgets",
    tagline: "Brand New & Ex-UK Laptops, iPhones, Samsung, Smart TVs & CCTV Systems",
    description: "Located along Kimathi Street & Luthuli Avenue, Nairobi Tech Point is a verified tech and electronics dealer stocking brand new and certified refurbished laptops, smartphones, 4K TVs, and security camera installations. Countrywide parcel dispatch via Modern Coast and Easy Coach.",
    primary_vertical: "home",
    categories: ["appliances_electronics", "security_cctv"],
    location: {
      country: "Kenya",
      county: "Nairobi",
      sub_county: "Starehe",
      neighborhood: "Nairobi CBD",
      landmark: "Opposite Nation Centre, Kimathi House 2nd Floor Shop 14",
      stage_name: "Ambassadeur Stage",
      road_or_bypass: "Kimathi Street / Luthuli Ave",
      coordinates: { latitude: -1.2841, longitude: 36.8228 },
      service_coverage_areas: ["Nairobi CBD", "All 47 Counties (Matatu Courier)"]
    },
    contact: {
      primary_phone: "254722889900",
      whatsapp_number: "254722889900",
      instagram_handle: "@nairobibitechelectronics",
      google_maps_url: "https://maps.google.com/?q=-1.2841,36.8228"
    },
    contact_person: {
      name: "Peter Kimani",
      role: "Store Manager",
      phone: "0722 889 900",
      id_verified: true
    },
    recommendations: {
      percent: 97,
      count: 310
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill", "cash_on_delivery"],
      mpesa_till_number: "712894",
      price_rating: "$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-09-20T10:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "08:00 - 19:00",
      saturday: "08:30 - 18:00",
      sunday: "10:00 - 16:00",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80",
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.9,
      total_reviews: 82,
      completed_jobs_count: 540,
      response_time_minutes: 4
    },
    attributes: {
      written_warranty_provided: true,
      warranty_duration_months: 12
    },
    seo: {
      meta_title: "Nairobi Tech Point | Laptops, Phones & TVs Nairobi CBD",
      meta_description: "Best direct shop prices on HP laptops, iPhones, Android TVs & Hikvision CCTV in Nairobi.",
      keywords: ["laptops nairobi cbd", "iphone prices kenya", "smart tvs kimathi street"],
      canonical_url: "https://homekenya.co.ke/shop/nairobi-tech-point-electronics"
    },
    created_at: "2026-09-01T08:00:00Z",
    updated_at: "2026-10-18T10:00:00Z"
  },

  // 7. Apex Steel & Building Hardware Yard (Cement, Steel, Iron Sheets, Tanks, Tiles)
  {
    id: "biz-kenya-hardware-steelyard-007",
    slug: "apex-steel-hardware-yard",
    business_name: "Apex Steel & Building Supplies Yard",
    tagline: "Factory Direct Simba Cement, TMT Steel Bars, Box Profile Iron Sheets & Roto Tanks",
    description: "Located along Enterprise Road, Industrial Area with a distribution yard along Eastern Bypass Kamakis. Wholesale and retail prices direct from manufacturers. Free loading, direct site delivery by crane truck across Nairobi Metro and Kiambu.",
    primary_vertical: "home",
    categories: ["hardware_building", "tiles_flooring"],
    location: {
      country: "Kenya",
      county: "Nairobi",
      sub_county: "Industrial Area",
      neighborhood: "Enterprise Road",
      landmark: "Near Kobil Petrol Station, Enterprise Road Gate 4",
      stage_name: "Enterprise Stage",
      road_or_bypass: "Enterprise Road / Eastern Bypass",
      coordinates: { latitude: -1.3102, longitude: 36.8521 },
      service_coverage_areas: ["Nairobi Metro", "Kiambu", "Machakos", "Kajiado"]
    },
    contact: {
      primary_phone: "254733445566",
      whatsapp_number: "254733445566",
      instagram_handle: "@apexsteelkenya"
    },
    contact_person: {
      name: "Samuel Mutua",
      role: "Yard Logistics Supervisor",
      phone: "0733 445 566",
      id_verified: true
    },
    recommendations: {
      percent: 99,
      count: 180
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill", "bank_transfer"],
      mpesa_till_number: "554120",
      mpesa_paybill_number: "888200",
      mpesa_paybill_account: "APEXSTEEL",
      price_rating: "$$"
    },
    verification: {
      tier: "featured_partner",
      is_claimed: true,
      verified_at: "2026-09-15T09:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "07:00 - 18:00",
      saturday: "07:00 - 15:00",
      sunday: "Closed",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.8,
      total_reviews: 95,
      completed_jobs_count: 820,
      response_time_minutes: 6
    },
    attributes: {
      provides_materials: true,
      written_warranty_provided: true,
      warranty_duration_months: 60
    },
    seo: {
      meta_title: "Apex Steel & Building Supplies Yard | Wholesale Prices Kenya",
      meta_description: "Direct mill prices on TMT steel bars Y12, Simba cement 50kg, and Roto water tanks in Kenya.",
      keywords: ["cement price kenya", "tmt steel bars enterprise road", "box profile iron sheets"],
      canonical_url: "https://homekenya.co.ke/shop/apex-steel-hardware-yard"
    },
    created_at: "2026-08-20T08:00:00Z",
    updated_at: "2026-10-15T12:00:00Z"
  },

  // 8. Rift Valley Agrovet & Farm Machinery Hub
  {
    id: "biz-rift-agrovet-machinery-008",
    slug: "rift-agrovet-machinery-hub",
    business_name: "Rift Agrovet & Farm Machinery Centre",
    tagline: "Certified Hybrid Seeds, DAP/CAN Fertilizers, Dairy Feeds, Drip Kits & Chaff Cutters",
    description: "Located in Nakuru City with branch in Eldoret. The premier agrovet and farm implements hub in the Rift Valley. Stocking KEPHIS certified seeds, high-yield animal feeds, motor chaff cutters, and solar irrigation pumps. Delivers to farm gates countrywide.",
    primary_vertical: "home",
    categories: ["gardening_landscaping"],
    location: {
      country: "Kenya",
      county: "Nakuru",
      sub_county: "Nakuru East",
      neighborhood: "Nakuru City CBD",
      landmark: "Opposite Nakuru Wholesale Market, George Morara Avenue",
      stage_name: "Main Stage Nakuru",
      road_or_bypass: "George Morara Avenue",
      coordinates: { latitude: -0.2833, longitude: 36.0667 },
      service_coverage_areas: ["Nakuru", "Uasin Gishu", "Nyandarua", "Kericho", "Countrywide"]
    },
    contact: {
      primary_phone: "254701234567",
      whatsapp_number: "254701234567",
      instagram_handle: "@riftagrovet"
    },
    contact_person: {
      name: "Joshua Kiprop",
      role: "Agro Equipment Specialist",
      phone: "0701 234 567",
      id_verified: true
    },
    recommendations: {
      percent: 98,
      count: 95
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill"],
      mpesa_till_number: "389104",
      price_rating: "$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-09-10T11:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "07:30 - 18:00",
      saturday: "08:00 - 17:00",
      sunday: "Closed",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.9,
      total_reviews: 64,
      completed_jobs_count: 430,
      response_time_minutes: 8
    },
    attributes: {
      written_warranty_provided: true,
      warranty_duration_months: 24
    },
    seo: {
      meta_title: "Rift Agrovet & Farm Machinery | Nakuru & Eldoret",
      meta_description: "Certified hybrid maize seeds, fertilizers, dairy meal, and electric chaff cutters in Nakuru and Eldoret.",
      keywords: ["seeds nakuru agrovet", "chaff cutter machine kenya", "drip irrigation kits"],
      canonical_url: "https://homekenya.co.ke/shop/rift-agrovet-machinery-hub"
    },
    created_at: "2026-09-05T08:00:00Z",
    updated_at: "2026-10-12T14:00:00Z"
  },

  // 9. Nairobi Wholesale & Spares Merchants (Fashion, Auto Spares, Supermarket Goods)
  {
    id: "biz-gikomba-fashion-auto-009",
    slug: "nairobi-wholesale-spares-merchants",
    business_name: "Nairobi Wholesale & Auto Spares Merchants",
    tagline: "Genuine Auto Replacement Parts, Tyres, Cooking Gas, Men's & Women's Fashion",
    description: "Direct importers and wholesale traders based at Kirinyaga Road and River Road, Nairobi. Genuine Toyota, Isuzu, and Nissan engine parts, tubeless tyres, and high quality clothing apparel. Same-day parcel dispatch across East Africa.",
    primary_vertical: "home",
    categories: ["furniture"],
    location: {
      country: "Kenya",
      county: "Nairobi",
      sub_county: "Starehe",
      neighborhood: "Kirinyaga Road / River Road",
      landmark: "Near Kirinyaga Road junction, Plaza House Ground Floor",
      stage_name: "River Road Stage",
      road_or_bypass: "Kirinyaga Road",
      coordinates: { latitude: -1.2825, longitude: 36.8291 },
      service_coverage_areas: ["Nairobi", "All Towns in Kenya"]
    },
    contact: {
      primary_phone: "254714556677",
      whatsapp_number: "254714556677",
      instagram_handle: "@nairobiautospareske"
    },
    contact_person: {
      name: "Hassan Omar",
      role: "Wholesale & Spares Manager",
      phone: "0714 556 677",
      id_verified: true
    },
    recommendations: {
      percent: 96,
      count: 140
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill"],
      mpesa_till_number: "662190",
      price_rating: "$"
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
      monday_friday: "08:00 - 18:30",
      saturday: "08:00 - 17:00",
      sunday: "Closed",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.8,
      total_reviews: 73,
      completed_jobs_count: 610,
      response_time_minutes: 5
    },
    attributes: {
      written_warranty_provided: true,
      warranty_duration_months: 12
    },
    seo: {
      meta_title: "Nairobi Auto Spares & Wholesale Hub | Kirinyaga Road",
      meta_description: "Genuine car spare parts, tyres, and quality fashion wear wholesale and retail in Nairobi.",
      keywords: ["car spares kirinyaga road", "tyres nairobi", "mens official suits nairobi"],
      canonical_url: "https://homekenya.co.ke/shop/nairobi-wholesale-spares-merchants"
    },
    created_at: "2026-09-12T08:00:00Z",
    updated_at: "2026-10-16T11:00:00Z"
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
  },

  // 7. Appliances & Electronics - Ramtons Gas Cooker & Oven
  {
    id: "prod-cooker-007",
    business_id: "biz-fineline-kitchens-002",
    title: "Ramtons 4-Burner Gas Cooker with Electric Oven & Grill (50x50cm)",
    slug: "ramtons-4-burner-gas-cooker-oven",
    category: "appliances_electronics",
    subcategory: "cookers_ovens",
    room: "kitchen_dining",
    description: "Stainless steel 4-gas burner standing cooker with push-button auto ignition, spacious electric oven, internal light, and rotisserie grill. 1-year official warranty.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 34500,
      negotiable: false
    },
    specifications: {
      material: "Stainless Steel Body & Cast Iron Trivets",
      dimensions: "50cm x 50cm x 85cm",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 12
    },
    delivery: {
      nairobi_delivery_fee_kes: 500,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-10T08:00:00Z"
  },

  // 8. Appliances & Electronics - Smart TV
  {
    id: "prod-tv-008",
    business_id: "biz-apex-gypsum-004",
    title: "Hisense 55-Inch 4K UHD Smart Frameless Android TV (Bluetooth, YouTube & Netflix)",
    slug: "hisense-55-inch-4k-smart-tv",
    category: "appliances_electronics",
    subcategory: "tvs_audio",
    room: "living_room",
    description: "Crystal clear 4K Ultra HD smart television with bezel-less frame, built-in Google Assistant, Dolby Audio, dual HDMI 2.1 ports, and digital DVB-T2 tuner for free Kenyan local channels.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 48000,
      negotiable: true
    },
    specifications: {
      material: "Frameless LED Panel",
      dimensions: "55 Inch Diagonal Screen",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 24
    },
    delivery: {
      nairobi_delivery_fee_kes: 500,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-12T08:00:00Z"
  },

  // 9. Bedding & Decor - Curtains & Sheers
  {
    id: "prod-curtains-009",
    business_id: "biz-woodcraft-kamakis-001",
    title: "Heavy Thermal Blackout Living Room Curtains with Matching White Sheers",
    slug: "heavy-thermal-blackout-curtains-sheers",
    category: "bedding_decor",
    subcategory: "curtains_sheers",
    room: "living_room",
    description: "Custom tailored 3-meter drop blackout velvet curtains with anti-rust metal eyelet rings and high-density soft sheer drapes. Keeps room cool and blocks 95% of sunlight.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 12500,
      negotiable: true
    },
    specifications: {
      material: "Heavy Jacquard Velvet & Chiffon Sheers",
      dimensions: "Set of 2 Panels (3m x 2.8m each)",
      in_stock: true,
      is_made_to_order: true,
      lead_time_days: 2,
      warranty_months: 12
    },
    delivery: {
      nairobi_delivery_fee_kes: 300,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-15T08:00:00Z"
  },

  // 10. Bedding & Decor - Living Room Shaggy Carpet
  {
    id: "prod-carpet-010",
    business_id: "biz-cleannest-pro-005",
    title: "Turkish 7x10 Feet Fluffy High-Pile Shaggy Living Room Carpet",
    slug: "turkish-fluffy-shaggy-living-room-carpet-7x10",
    category: "bedding_decor",
    subcategory: "carpets_rugs",
    room: "living_room",
    description: "Super soft non-shedding Turkish shaggy area rug with anti-slip rubber backing. Stain resistant and easy to vacuum clean. Perfect for 7-seater sitting room arrangements.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 16500,
      negotiable: false
    },
    specifications: {
      material: "100% Polypropylene Yarn & Anti-Slip Base",
      dimensions: "7ft x 10ft (Large Living Room Size)",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 12
    },
    delivery: {
      nairobi_delivery_fee_kes: 500,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-09-18T08:00:00Z"
  },

  // 11. Kitchenware & Utensils - Granitestone Sufuria Cookware Set
  {
    id: "prod-sufuria-011",
    business_id: "biz-fineline-kitchens-002",
    title: "12-Piece Non-Stick Granite Cookware Set (Sufurias, Frying Pan & Glass Lids)",
    slug: "12-piece-non-stick-granite-sufuria-set",
    category: "kitchenware_utensils",
    subcategory: "cookware_pots",
    room: "kitchen_dining",
    description: "Heavy-duty die-cast aluminum pots with stone marble coating. Induction and gas compatible. Scratch resistant, uses zero cooking oil, and features heat-insulated wooden soft-touch handles.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 9800,
      negotiable: false
    },
    specifications: {
      material: "Die-Cast Aluminum with Granite Non-Stick Coating",
      dimensions: "Sizes: 20cm, 24cm, 28cm, 32cm pots + 28cm deep pan",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 6
    },
    delivery: {
      nairobi_delivery_fee_kes: 300,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1584990347449-a65c275990ec?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-09-20T08:00:00Z"
  },

  // 12. Hardware & Paint - Crown Paints Exterior Weatherguard
  {
    id: "prod-paint-012",
    business_id: "biz-apex-gypsum-004",
    title: "Crown Paints Permacote Ultraguard with Silicone Exterior Paint (20L Bucket)",
    slug: "crown-paints-permacote-exterior-paint-20l",
    category: "hardware_building",
    subcategory: "paints_waterproofing",
    room: "whole_house",
    description: "Premium anti-fungal silicone exterior wall finish. 100% waterproof, prevents wall dampness and peeling during rainy seasons. Covers up to 140 sqm per 20L bucket.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 14800,
      negotiable: false
    },
    specifications: {
      material: "Silicone Acrylic Emulsion Paint",
      dimensions: "20 Litre Drum",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 60
    },
    delivery: {
      nairobi_delivery_fee_kes: 500,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-09-22T08:00:00Z"
  },

  // ====================================================
  // PHONES, COMPUTERS & ELECTRONICS (electronics_phones)
  // ====================================================
  {
    id: "prod-elec-phone-013",
    business_id: "biz-nairobi-tech-hub-006",
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium (Physical Nano-SIM + eSIM)",
    slug: "apple-iphone-15-pro-max-256gb-nairobi",
    category: "electronics_phones",
    subcategory: "smartphones_tablets",
    description: "Brand new factory unlocked iPhone 15 Pro Max in Natural Titanium. Grade A sealed box with Apple 1-Year International Warranty. A17 Pro Bionic chip, 48MP periscope zoom lens, and Type-C charging. Same-day delivery across Nairobi.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 168000,
      discount_price_kes: 162000,
      negotiable: true
    },
    specifications: {
      material: "Titanium Frame & Ceramic Shield Glass",
      dimensions: "6.7 Inch Super Retina XDR OLED",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 12,
      condition: "Brand New Sealed",
      authenticity_disclosure: "Apple Original Sealed Box"
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-25T08:00:00Z"
  },
  {
    id: "prod-elec-laptop-014",
    business_id: "biz-nairobi-tech-hub-006",
    title: "HP EliteBook 840 G6 Intel Core i5 8th Gen (16GB RAM, 512GB NVMe SSD, Backlit)",
    slug: "hp-elitebook-840-g6-core-i5-16gb-ssd",
    category: "electronics_phones",
    subcategory: "laptops_computers",
    description: "Ex-UK Grade A+ business laptop. Slim aluminum body, 14-inch Full HD anti-glare display, Intel Core i5-8365U quad-core processor, Bang & Olufsen audio, fast fingerprint scanner, and 6+ hours genuine battery life. Pre-installed Windows 11 Pro and MS Office.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 34500,
      discount_price_kes: 32000,
      negotiable: false
    },
    specifications: {
      material: "Full CNC Aluminum Chassis",
      dimensions: "14-Inch FHD (1920x1080)",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 6,
      condition: "Refurbished Ex-UK",
      authenticity_disclosure: "Grade A+ Clean Tested"
    },
    delivery: {
      nairobi_delivery_fee_kes: 300,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-26T08:00:00Z"
  },
  {
    id: "prod-elec-cctv-015",
    business_id: "biz-nairobi-tech-hub-006",
    title: "Hikvision 4-Camera 1080P Full HD Security CCTV System with 1TB Surveillance HDD",
    slug: "hikvision-4-camera-cctv-kit-1tb",
    category: "electronics_phones",
    subcategory: "cctv_security_cameras",
    description: "Complete security surveillance kit for shops, apartments, and homesteads. Includes 2 outdoor weatherproof bullet cameras, 2 indoor dome cameras, 4-Channel DVR, 1TB Seagate SkyHawk hard drive, 100m RG59 coaxial cable, and mobile phone remote viewing app.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 24500,
      negotiable: false
    },
    specifications: {
      material: "Weatherproof Metal Alloy & ABS",
      dimensions: "4 Camera Complete Kit",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 24,
      condition: "Brand New Sealed",
      authenticity_disclosure: "Original Hikvision Distribution"
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-09-27T08:00:00Z"
  },

  // ====================================================
  // HARDWARE, BUILDING & ELECTRICALS (hardware_building_electricals)
  // ====================================================
  {
    id: "prod-hard-cement-016",
    business_id: "biz-kenya-hardware-steelyard-007",
    title: "Simba Cement Power Plus 42.5N Structural Cement (50kg Bag) - Mill Direct",
    slug: "simba-cement-power-plus-42-5n-50kg",
    category: "hardware_building_electricals",
    subcategory: "cement_steel_masonry",
    description: "High-strength structural cement designed for multi-storey concrete columns, slabs, and heavy masonry foundations. Mill direct pricing with prompt crane truck dispatch to site across Nairobi, Kiambu, and Machakos. Minimum order 50 bags for free site delivery.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 740,
      negotiable: true
    },
    specifications: {
      material: "Portland Pozzolana Cement Grade 42.5N",
      dimensions: "50kg Heavy Ply Paper Bag",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-28T08:00:00Z"
  },
  {
    id: "prod-hard-steel-017",
    business_id: "biz-kenya-hardware-steelyard-007",
    title: "Deformed High Yield TMT Steel Reinforcement Bars Y12 (BS 4449 Certified)",
    slug: "tmt-deformed-steel-bars-y12",
    category: "hardware_building_electricals",
    subcategory: "cement_steel_masonry",
    description: "Standard 12-metre length high tensile deformed bars for slab reinforcement and ring beams. Meets KEBS and BS 4449 international standards. Direct from ISO-certified rolling mills.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 1280,
      negotiable: true
    },
    specifications: {
      material: "High Yield Thermo-Mechanically Treated Steel (500N/mm²)",
      dimensions: "12mm Diameter x 12m Standard Length",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-09-29T08:00:00Z"
  },
  {
    id: "prod-hard-tank-018",
    business_id: "biz-kenya-hardware-steelyard-007",
    title: "Roto Tanks 5,000 Litres Cylindrical Plastic Water Storage Tank (FDA Food Grade)",
    slug: "roto-tank-5000-litres-water-tank",
    category: "hardware_building_electricals",
    subcategory: "plumbing_pipes_tanks",
    description: "UV-stabilized double-layer antibacterial water tank with threaded lid and brass brass outlets. Certified food grade for drinking water storage. Withstands extreme Kenyan sunlight without cracking. 30-year manufacturer warranty.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 42000,
      discount_price_kes: 39500,
      negotiable: true
    },
    specifications: {
      material: "100% Virgin Food-Grade Polyethylene (LLDPE)",
      dimensions: "5,000 Litre Capacity (Dia: 1.8m, H: 2.1m)",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 360
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-09-30T08:00:00Z"
  },

  // ====================================================
  // FARM, AGRICULTURE & AGROVET (farm_agriculture_agrovet)
  // ====================================================
  {
    id: "prod-farm-seed-019",
    business_id: "biz-rift-agrovet-machinery-008",
    title: "Kenya Seed Company H614D Certified Hybrid Highland Maize Seed (2kg Packet)",
    slug: "kenya-seed-h614d-hybrid-maize-2kg",
    category: "farm_agriculture_agrovet",
    subcategory: "certified_seeds_fertilizers",
    description: "Genuine KEPHIS tamper-proof scratch card verified highland hybrid maize seed. High tolerance to maize streak virus and leaf blight. Produces heavy double cobs with well-filled dent grains. Suitable for Rift Valley, Western, and Central highlands.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 580,
      negotiable: false
    },
    specifications: {
      material: "Treated Certified Seed Packet with KEPHIS SMS Verification",
      dimensions: "2kg Sealed Bag",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-10-01T08:00:00Z"
  },
  {
    id: "prod-farm-chaff-020",
    business_id: "biz-rift-agrovet-machinery-008",
    title: "Electric 3HP Motorized Silage & Napier Grass Chaff Cutter Machine (2-in-1)",
    slug: "electric-3hp-chaff-cutter-silage-machine",
    category: "farm_agriculture_agrovet",
    subcategory: "farm_machinery_tools",
    description: "Heavy duty steel frame chaff cutter powered by a 3.0HP copper-wire electric motor. Cuts dry and wet fodder (Napier grass, maize stalks, hay) into 15mm-25mm fine cuts for high milk yield dairy feeding. Processes 800-1200kg per hour.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 36000,
      discount_price_kes: 34000,
      negotiable: true
    },
    specifications: {
      material: "Cast Iron Body & 4 High-Carbon Hardened Steel Blades",
      dimensions: "3HP Single Phase 240V Motor",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 18
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-10-02T08:00:00Z"
  },
  {
    id: "prod-farm-drip-021",
    business_id: "biz-rift-agrovet-machinery-008",
    title: "Complete 1-Acre Drip Irrigation Kit with 16mm Drip Lines & Screen Filter",
    slug: "1-acre-drip-irrigation-kit-kenya",
    category: "farm_agriculture_agrovet",
    subcategory: "irrigation_pumps_pipes",
    description: "Full gravity-flow drip kit for tomatoes, capsicum, onions, and cabbages. Includes 8 rolls of 16mm pre-punched drip tape (0.3mm wall, 20cm spacing), 32mm HDPE main line, disk filter, control valves, end caps, and joiners.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 38000,
      negotiable: true
    },
    specifications: {
      material: "UV-Treated Polyethylene Drip Lines & Compression Fittings",
      dimensions: "1 Acre Full Coverage (8,000 Metres Drip Tape)",
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
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-10-03T08:00:00Z"
  },

  // ====================================================
  // VEHICLES & AUTO SPARE PARTS (vehicles_auto_spares)
  // ====================================================
  {
    id: "prod-auto-tyre-022",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "Sailun Atrezzo 205/55R16 High Performance Tubeless Passenger Car Tyre",
    slug: "sailun-atrezzo-205-55r16-tyre-nairobi",
    category: "vehicles_auto_spares",
    subcategory: "tyres_rims_batteries",
    description: "Brand new tubeless passenger radial tyre. Fits Toyota Fielder, Premio, Allion, Axio, Subaru Impreza, and VW Golf. Excellent wet grip, low road noise, and reinforced shoulder design for Kenyan potholes. Free fitting and computerized wheel balancing at our Kirinyaga Road yard.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 7200,
      discount_price_kes: 6800,
      negotiable: false
    },
    specifications: {
      material: "Silica-Enhanced All-Season Tread Compound",
      dimensions: "205/55 R16 (Speed Rating: V - 240 km/h)",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 36
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-10-04T08:00:00Z"
  },
  {
    id: "prod-auto-screen-023",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "Universal 9-Inch Android Car Touchscreen Multimedia System (Wireless CarPlay & GPS)",
    slug: "universal-9-inch-android-car-screen-carplay",
    category: "vehicles_auto_spares",
    subcategory: "audio_android_screens",
    description: "IPS 2.5D capacitive curved touchscreen with wireless Apple CarPlay and Android Auto. Built-in GPS navigation with offline Kenyan maps, Bluetooth 5.0 hands-free calling, reverse camera input, and 2GB RAM + 32GB ROM storage.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 13500,
      discount_price_kes: 11999,
      negotiable: false
    },
    specifications: {
      material: "IPS HD Display & Aluminum Back Heatsink",
      dimensions: "9-Inch Universal Double-DIN Fitment",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 12
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-10-05T08:00:00Z"
  },

  // ====================================================
  // SUPERMARKET, FOODSTUFFS & COOKING GAS (supermarket_food_gas)
  // ====================================================
  {
    id: "prod-gas-13kg-024",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "13kg TotalEnergies Cooking Gas (LPG) Doorstep Refill Exchange with Free Safety Seal",
    slug: "totalenergies-13kg-gas-refill-doorstep",
    category: "supermarket_food_gas",
    subcategory: "cooking_gas_cylinders_refill",
    description: "Official EPRA verified TotalEnergies 13kg gas cylinder refill. Inspected for tare weight and leak-free valve before dispatch. Delivered to your kitchen in under 30 minutes with free weight scale check at your doorstep. Verified Lipa na M-Pesa on arrival.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 2950,
      negotiable: false
    },
    specifications: {
      material: "EPRA Compliant Pressurized LPG Gas (13.0kg Net)",
      dimensions: "Standard 13kg Gas Cylinder Size",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: false,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    is_monthly_restock: true,
    restock_frequency: "monthly",
    created_at: "2026-10-06T08:00:00Z"
  },
  {
    id: "prod-food-rice-025",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "Pure Mwea Pishori Grade 1 Aromatic Rice 25kg Bag (Kilombero Pure Grain)",
    slug: "pure-mwea-pishori-rice-25kg-bag",
    category: "supermarket_food_gas",
    subcategory: "cereals_grains_flours",
    description: "Freshly milled long-grain aromatic Pishori rice directly from Mwea irrigation scheme, Kirinyaga. 100% pure aroma with zero broken grain mixing or bleaching. Fluffy non-sticky texture when cooked. Wholesale duka price.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 4600,
      discount_price_kes: 4350,
      negotiable: false
    },
    specifications: {
      material: "Grade 1 Polished Natural Rice Grains",
      dimensions: "25kg Heavy Gunny Bag",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    is_monthly_restock: true,
    restock_frequency: "monthly",
    created_at: "2026-10-07T08:00:00Z"
  },

  // ====================================================
  // FASHION, CLOTHES & FOOTWEAR (fashion_clothes_shoes)
  // ====================================================
  {
    id: "prod-fash-suit-026",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "Men's 3-Piece Slim Fit Official & Wedding Suit - Royal Blue (Jacket, Vest & Trouser)",
    slug: "mens-3-piece-slim-fit-suit-royal-blue",
    category: "fashion_clothes_shoes",
    subcategory: "mens_casual_official",
    description: "Tailored British-cut slim fit suit crafted from breathable wool-blend fabric with satin inner lining. Includes single-breasted two-button blazer jacket, tailored five-button waistcoat vest, and flat-front trousers with adjustable waistbands. Available in sizes 46 to 58.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 12500,
      discount_price_kes: 10500,
      negotiable: true
    },
    specifications: {
      material: "Wool Blend & Polyester Microfiber",
      dimensions: "Chest Sizes: 38R, 40R, 42R, 44R, 46R",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-10-08T08:00:00Z"
  },
  {
    id: "prod-fash-boots-027",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "Men's Handcrafted Full-Grain Genuine Leather Chelsea Boots - Dark Tan",
    slug: "mens-leather-chelsea-boots-dark-tan",
    category: "fashion_clothes_shoes",
    subcategory: "mens_shoes_sneakers",
    description: "Handcrafted 100% full-grain Kenyan cowhide leather ankle boots with elastic side gussets, cushioned memory foam insoles, and durable non-slip rubber lug outsoles. Pairs well with official trousers and denim jeans.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 4800,
      negotiable: false
    },
    specifications: {
      material: "Full Grain Kenyan Cow Leather & Vibram Rubber Sole",
      dimensions: "EU Shoe Sizes: 40, 41, 42, 43, 44, 45",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 12
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-10-09T08:00:00Z"
  },

  // ====================================================
  // HEALTH, BEAUTY & PERSONAL CARE (health_beauty_personal_care)
  // ====================================================
  {
    id: "prod-beauty-cerave-028",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "CeraVe Hydrating Facial Cleanser for Normal to Dry Skin with Hyaluronic Acid (473ml)",
    slug: "cerave-hydrating-cleanser-473ml",
    category: "health_beauty_personal_care",
    subcategory: "skincare_sunscreen",
    description: "Original US-imported dermatologist recommended daily face and body wash. Formulated with 3 essential ceramides and hyaluronic acid to restore skin barrier without stripping natural moisture. Non-comedogenic, fragrance-free.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 2850,
      negotiable: false
    },
    specifications: {
      material: "Liquid Lotion Cleanser with Pump Dispenser",
      dimensions: "473ml (16 FL OZ)",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: false,
    created_at: "2026-10-10T08:00:00Z"
  },
  {
    id: "prod-beauty-omron-029",
    business_id: "biz-gikomba-fashion-auto-009",
    title: "Omron M2 Basic Digital Blood Pressure Monitor with Upper Arm Cuff (Clinically Validated)",
    slug: "omron-m2-digital-blood-pressure-monitor",
    category: "health_beauty_personal_care",
    subcategory: "health_monitors_supplements",
    description: "Automatic digital blood pressure and pulse monitor with Intellisense technology for comfortable and accurate readings. Large easy-to-read LCD screen with irregular heartbeat indicator. Includes standard 22-32cm arm cuff and 4 AA batteries.",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 6500,
      discount_price_kes: 5800,
      negotiable: false
    },
    specifications: {
      material: "ABS Plastic Medical Grade Body & Nylon Cuff",
      dimensions: "Upper Arm Standard Size",
      in_stock: true,
      is_made_to_order: false,
      warranty_months: 36
    },
    delivery: {
      nairobi_delivery_fee_kes: 0,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-10-11T08:00:00Z"
  },

  // ====================================================
  // OFFICE, STATIONERY & SCHOOL BOOKS (office_stationery_books)
  // ====================================================
  {
    id: "prod-office-paper-030",
    business_id: "biz-nairobi-tech-hub-006",
    title: "Chamex A4 80GSM Ultra-White Multi-Purpose Copy Printing Paper (Box of 5 Reams / 2500 Sheets)",
    slug: "chamex-a4-paper-80gsm-box-5-reams",
    category: "office_stationery_books",
    subcategory: "printing_paper_thermal_rolls",
    description: "Premium high-opacity 80GSM A4 copy paper manufactured from 100% eucalyptus pulp. Jam-free performance for high-speed laser printing, inkjet printers, and photocopying. Factory sealed box containing 5 reams (500 sheets per ream).",
    pricing: {
      price_type: "fixed",
      regular_price_kes: 3400,
      negotiable: true
    },
    specifications: {
      material: "100% Virgin Eucalyptus Pulp 80GSM (98% Brightness)",
      dimensions: "A4 Size (210mm x 297mm) - Box of 5 Reams",
      in_stock: true,
      is_made_to_order: false
    },
    delivery: {
      nairobi_delivery_fee_kes: 200,
      delivers_countrywide: true,
      pickup_available: true
    },
    images: [
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80"
    ],
    is_featured: true,
    created_at: "2026-10-12T08:00:00Z"
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
  },

  // 7. Appliance Repair Fundi (Fridge, Washing Machine, Microwave)
  {
    id: "srv-appliance-007",
    business_id: "biz-solaria-water-003",
    title: "Refrigerator Gas Refill, Washing Machine & Cooker Repair Fundi",
    slug: "refrigerator-washing-machine-cooker-repair-nairobi",
    service_category: "electrical_solar",
    room: "kitchen_dining",
    is_recurring: false,
    description: "Same-day doorstep diagnostic and repair for domestic fridges (gas leaks, thermostat, compressor failure), automatic washing machines, and microwave ovens. Genuine spare parts with 90-day warranty.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 1500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: true,
      estimated_duration_hours: 2,
      materials_included: false,
      warranty_guarantee_days: 90,
      service_radius_km: 25
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Send photo or video of appliance issue on WhatsApp for free fast estimate"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-20T08:00:00Z"
  },

  // 8. Welder & Metal Fabricator (Window Grills & Gates)
  {
    id: "srv-welder-008",
    business_id: "biz-apex-gypsum-004",
    title: "Heavy-Duty Window Security Grills, Steel Gates & Balcony Railings",
    slug: "window-security-grills-steel-gates-welder",
    service_category: "carpentry_cabinetry",
    room: "whole_house",
    is_recurring: false,
    description: "Custom decorative and burglar-proof window grills, heavy compound security gates, sliding gate rails, and modern balcony railings. Primed with anti-rust red oxide and high-gloss enamel.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 4500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 24,
      materials_included: true,
      warranty_guarantee_days: 365,
      service_radius_km: 30
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Free site measurements for gates & window grills across Nairobi and Kiambu"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-22T08:00:00Z"
  },

  // 9. House Moving & Transport
  {
    id: "srv-movers-009",
    business_id: "biz-cleannest-pro-005",
    title: "House Moving, Packing Boxes & Enclosed Truck Transport",
    slug: "house-moving-packing-truck-transport-nairobi",
    service_category: "moving_relocation",
    room: "whole_house",
    is_recurring: false,
    description: "Stress-free residential moving with enclosed weather-proof trucks, bubble wrap for delicate electronics/TVs, wardrobe boxes, mattress covers, and expert furniture dismantling & reassembly.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 8500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: true,
      estimated_duration_hours: 5,
      materials_included: true,
      warranty_guarantee_days: 14,
      service_radius_km: 50
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Send room photos or inventory list on WhatsApp for instant flat-rate quote"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-25T08:00:00Z"
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
    id: "rec-water-00",
    title: "Pure Drinking Water 20L Bottle Refill",
    frequency: "Weekly / Monthly Refill",
    priceEstimate: "From KSh 250 / 20L refill",
    icon: "🚰",
    description: "Doorstep delivery of sanitized 20-litre drinking water bottles. Fast exchange with dispenser pump check.",
    providerId: "biz-solaria-water-003"
  },
  {
    id: "rec-gas-00",
    title: "Cooking Gas (LPG) Cylinder Refill (6kg & 13kg)",
    frequency: "Monthly Refill",
    priceEstimate: "From KSh 1,250 (6kg) • KSh 2,800 (13kg)",
    icon: "🔥",
    description: "Prompt 30-minute doorstep gas exchange. Genuine safety seal, weight scale verification, and free regulator leak check.",
    providerId: "biz-solaria-water-003"
  },
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
    id: "rec-septic-05",
    title: "Septic Tank Vacuum Exhaustion & Bowser Emptying",
    frequency: "Every 6–12 Months",
    priceEstimate: "From KSh 8,500 / trip",
    icon: "🚛",
    description: "Clean bowser vacuum exhaustion for residential compounds and apartments. Prompt NEMA-licensed disposal.",
    providerId: "biz-cleannest-pro-005"
  },
  {
    id: "rec-garden-06",
    title: "Compound & Garden Care",
    frequency: "Monthly",
    priceEstimate: "From KSh 2,500",
    icon: "🌿",
    description: "Mow the lawn, trim hedges, weed flowers, and sweep the compound.",
    providerId: "biz-apex-gypsum-004"
  }
];

// ==========================================
// SELLER DEALS (Today's Deals vs Deals of the Month)
// ==========================================
export const SAMPLE_KENYAN_DEALS: HomeDeal[] = [
  // TODAY'S DEALS (Flash 24-Hour Price Cuts - HomeDuka Sponsored)
  {
    id: "deal-today-01",
    business_id: "biz-woodcraft-kamakis-001",
    product_id: "prod-sofa-001",
    title: "Chesterfield 7-Seater Modern Sofa Set (Kiln-Dried Mahogany)",
    slug: "chesterfield-7-seater-kamakis-deal",
    category: "furniture",
    original_price_kes: 68000,
    deal_price_kes: 55000,
    discount_percentage: 19,
    duration_type: "today",
    is_sponsored: true,
    sponsor_label: "HomeDuka Sponsored",
    badge_text: "Today Only • Save KSh 13,000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    slots_left: 2,
    created_at: "2026-10-08T06:00:00Z",
    expires_at: "2026-10-08T23:59:59Z"
  },
  {
    id: "deal-today-02",
    business_id: "biz-apex-gypsum-004",
    product_id: "prod-tv-008",
    title: "Hisense 55-Inch 4K UHD Smart Frameless Android TV",
    slug: "hisense-55-inch-smart-tv-deal",
    category: "electronics",
    original_price_kes: 48000,
    deal_price_kes: 41500,
    discount_percentage: 14,
    duration_type: "today",
    is_sponsored: true,
    sponsor_label: "HomeDuka Sponsored",
    badge_text: "Flash 24H • Save KSh 6,500",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    slots_left: 3,
    created_at: "2026-10-08T06:00:00Z",
    expires_at: "2026-10-08T23:59:59Z"
  },
  {
    id: "deal-today-03",
    business_id: "biz-cleannest-pro-005",
    service_id: "srv-sofa-shampoo-005",
    title: "7-Seater Sofa & Mattress Deep Machine Foam Wash & Stain Removal",
    slug: "sofa-deep-machine-wash-today-deal",
    category: "services",
    original_price_kes: 3800,
    deal_price_kes: 2800,
    discount_percentage: 26,
    duration_type: "today",
    is_sponsored: true,
    sponsor_label: "HomeDuka Sponsored",
    badge_text: "Today Only • Save KSh 1,000",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    slots_left: 5,
    created_at: "2026-10-08T06:00:00Z",
    expires_at: "2026-10-08T23:59:59Z"
  },
  {
    id: "deal-today-04",
    business_id: "biz-fineline-kitchens-002",
    product_id: "prod-sufuria-011",
    title: "12-Piece Non-Stick Granite Sufuria Cookware Set with Glass Lids",
    slug: "12-piece-non-stick-granite-sufuria-deal",
    category: "kitchen",
    original_price_kes: 9800,
    deal_price_kes: 7500,
    discount_percentage: 23,
    duration_type: "today",
    is_sponsored: true,
    sponsor_label: "HomeDuka Sponsored",
    badge_text: "Flash Deal • Save KSh 2,300",
    image: "https://images.unsplash.com/photo-1584990347449-a65c275990ec?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    slots_left: 4,
    created_at: "2026-10-08T06:00:00Z",
    expires_at: "2026-10-08T23:59:59Z"
  },

  // DEALS OF THE MONTH (Curated Monthly Price Drops)
  {
    id: "deal-month-05",
    business_id: "biz-woodcraft-kamakis-001",
    product_id: "prod-bed-002",
    title: "6x6 Bespoke Storage Bed with 4 Underbed Drawers (Solid Mvule)",
    slug: "6x6-bespoke-storage-bed-monthly-deal",
    category: "furniture",
    original_price_kes: 45000,
    deal_price_kes: 38000,
    discount_percentage: 16,
    duration_type: "month",
    badge_text: "Deal of the Month • Save KSh 7,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    created_at: "2026-10-01T00:00:00Z",
    expires_at: "2026-10-31T23:59:59Z"
  },
  {
    id: "deal-month-06",
    business_id: "biz-solaria-water-003",
    product_id: "prod-solar-water-005",
    title: "200L High-Pressure Pressurized Solar Water Heater System (EPRA)",
    slug: "200l-solar-water-heater-monthly-deal",
    category: "electronics",
    original_price_kes: 78000,
    deal_price_kes: 68000,
    discount_percentage: 13,
    duration_type: "month",
    badge_text: "Deal of the Month • Save KSh 10,000",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    created_at: "2026-10-01T00:00:00Z",
    expires_at: "2026-10-31T23:59:59Z"
  },
  {
    id: "deal-month-07",
    business_id: "biz-fineline-kitchens-002",
    product_id: "prod-cooker-007",
    title: "Ramtons 4-Burner Standing Gas Cooker with Electric Oven & Grill",
    slug: "ramtons-gas-cooker-monthly-deal",
    category: "kitchen",
    original_price_kes: 34500,
    deal_price_kes: 29900,
    discount_percentage: 13,
    duration_type: "month",
    badge_text: "Deal of the Month • Save KSh 4,600",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    created_at: "2026-10-01T00:00:00Z",
    expires_at: "2026-10-31T23:59:59Z"
  },
  {
    id: "deal-month-08",
    business_id: "biz-cleannest-pro-005",
    service_id: "srv-tank-clean-006",
    title: "Water Tank Deep Cleaning, Mud Extraction & Chlorine Disinfection",
    slug: "water-tank-cleaning-monthly-deal",
    category: "services",
    original_price_kes: 3500,
    deal_price_kes: 2800,
    discount_percentage: 20,
    duration_type: "month",
    badge_text: "Monthly Upkeep Deal • Save KSh 700",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    created_at: "2026-10-01T00:00:00Z",
    expires_at: "2026-10-31T23:59:59Z"
  },
  {
    id: "deal-month-09",
    business_id: "biz-cleannest-pro-005",
    product_id: "prod-carpet-010",
    title: "Turkish 7x10 Feet Fluffy High-Pile Shaggy Living Room Carpet",
    slug: "turkish-shaggy-carpet-monthly-deal",
    category: "decor",
    original_price_kes: 16500,
    deal_price_kes: 13500,
    discount_percentage: 18,
    duration_type: "month",
    badge_text: "Monthly Decor Deal • Save KSh 3,000",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    created_at: "2026-10-01T00:00:00Z",
    expires_at: "2026-10-31T23:59:59Z"
  },
  {
    id: "deal-month-10",
    business_id: "biz-woodcraft-kamakis-001",
    product_id: "prod-curtains-009",
    title: "Heavy Thermal Blackout Living Room Curtains with Matching Sheers",
    slug: "heavy-blackout-curtains-monthly-deal",
    category: "decor",
    original_price_kes: 12500,
    deal_price_kes: 9800,
    discount_percentage: 22,
    duration_type: "month",
    badge_text: "Monthly Special • Save KSh 2,700",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    created_at: "2026-10-01T00:00:00Z",
    expires_at: "2026-10-31T23:59:59Z"
  }
];

// ==========================================
// 8. VERIFIED BUYER REVIEWS (Anti-Fake Safeguard)
// ==========================================
export const SAMPLE_VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: "rev-001",
    business_id: "biz-woodcraft-kamakis-001",
    product_id: "prod-sofa-001",
    item_purchased_title: "7-Seater Modern Chesterfield Sofa Set (Dark Grey Velvet)",
    item_type: "product",
    rating: 5,
    review_text: "Ordered directly via WhatsApp after seeing their Kamakis shop photos. Paid 30% deposit via Till and balance on delivery. Delivered exactly on day 6 to Kileleshwa. Solid mahogany frame, very heavy, and high-density foam cushions!",
    buyer_name: "Wanjiru M.",
    buyer_neighborhood: "Kileleshwa, Nairobi",
    verified_method: "mpesa_till",
    mpesa_receipt_snippet: "QK89***712 (Lipa na M-Pesa Till 894211)",
    buyer_photo_urls: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2026-09-28",
    helpful_count: 24
  },
  {
    id: "rev-002",
    business_id: "biz-fundi-omondi-002",
    service_id: "srv-leak-001",
    item_purchased_title: "Emergency Pipe Burst Repair & Booster Pump Calibration",
    item_type: "service",
    rating: 5,
    review_text: "Omondi arrived within 25 mins on a Saturday evening. Had all copper fittings in his motorbike toolbox. Sorted the burst pipe under our kitchen sink and calibrated our pressure pump. Clear labor quote upfront, zero surprise charges.",
    buyer_name: "Kevin O.",
    buyer_neighborhood: "Membley Estate, Ruiru",
    verified_method: "mpesa_till",
    mpesa_receipt_snippet: "QL21***804 (Lipa na M-Pesa Verified)",
    date: "2026-10-02",
    helpful_count: 19
  },
  {
    id: "rev-003",
    business_id: "biz-solaria-water-003",
    product_id: "prod-solar-water-005",
    item_purchased_title: "200L High-Pressure Pressurized Solar Water Heater System",
    item_type: "product",
    rating: 5,
    review_text: "Free site assessment on WhatsApp was genuine. Team did neat piping to our roof in 1 day. Scalding hot water even on overcast Nairobi mornings. Saved us ~KSh 4,500 monthly on KPLC token bills.",
    buyer_name: "Dr. Mutua K.",
    buyer_neighborhood: "Runda / Whispers, Nairobi",
    verified_method: "storefront_invoice",
    mpesa_receipt_snippet: "QK54***119 (EPRA Certified Invoice)",
    buyer_photo_urls: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2026-09-14",
    helpful_count: 31
  },
  {
    id: "rev-004",
    business_id: "biz-gypsum-kileleshwa-003",
    service_id: "srv-gypsum-003",
    item_purchased_title: "Multi-Level Gypsum Ceiling & Warm LED Profile Lighting",
    item_type: "service",
    rating: 5,
    review_text: "Laser level alignment and zero sagging. Finished our 3-bedroom living room within 4 days. Very clean fundis, covered our tiles before plastering and sand-papering. Quality work.",
    buyer_name: "Amina H.",
    buyer_neighborhood: "South C, Nairobi",
    verified_method: "site_visit",
    mpesa_receipt_snippet: "QK77***330 (Site Inspection Verified)",
    date: "2026-09-22",
    helpful_count: 15
  },
  {
    id: "rev-005",
    business_id: "biz-cleannest-pro-005",
    service_id: "srv-tank-clean-006",
    item_purchased_title: "Water Tank Deep Cleaning, Sludge Extraction & Disinfection",
    item_type: "service",
    rating: 5,
    review_text: "Our 5,000L underground tank hadn't been washed in 2 years. They sucked out 3 buckets of silt and disinfected thoroughly with zero chlorine smell in taps. Highly recommended.",
    buyer_name: "Grace N.",
    buyer_neighborhood: "Kahawa Sukari, Kiambu",
    verified_method: "mpesa_till",
    mpesa_receipt_snippet: "QL02***491 (Lipa na M-Pesa Till 782019)",
    date: "2026-10-05",
    helpful_count: 12
  },
  {
    id: "rev-006",
    business_id: "biz-woodcraft-kamakis-001",
    product_id: "prod-bed-002",
    item_purchased_title: "6x6 Hydraulic Storage Bed in Solid Mahogany",
    item_type: "product",
    rating: 5,
    review_text: "The hydraulic lift system is German-grade and lifts smoothly with one hand even with heavy orthopedic mattress on top. Massive storage underneath for duvets and suitcases. Great craftsmanship.",
    buyer_name: "Dennis M.",
    buyer_neighborhood: "Westlands, Nairobi",
    verified_method: "mpesa_till",
    mpesa_receipt_snippet: "QK41***529 (Lipa na M-Pesa Till 894211)",
    buyer_photo_urls: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    date: "2026-09-19",
    helpful_count: 27
  }
];

// ==========================================
// UNIVERSAL PRODUCT & BUSINESS ACCESSORS
// ==========================================
export function getBusinessById(businessId: string): BusinessProfile | undefined {
  return SAMPLE_KENYAN_HOME_LISTINGS.find(b => b.id === businessId);
}

export function getBusinessBySlug(slug: string): BusinessProfile | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();

  // 1. Exact slug match
  let found = SAMPLE_KENYAN_HOME_LISTINGS.find(b => b.slug.toLowerCase() === normalized);
  if (found) return found;

  // 2. Exact ID match
  found = SAMPLE_KENYAN_HOME_LISTINGS.find(b => b.id.toLowerCase() === normalized);
  if (found) return found;

  // 3. Known aliases
  if (normalized === 'classic-hardwood-furniture-kamakis' || normalized === 'woodcraft') {
    return SAMPLE_KENYAN_HOME_LISTINGS.find(b => b.slug === 'woodcraft-living-kamakis');
  }

  // 4. Fuzzy fallback
  found = SAMPLE_KENYAN_HOME_LISTINGS.find(b => 
    b.slug.includes(normalized) || normalized.includes(b.slug)
  );
  return found;
}

export function getProductsForMasterCategory(masterId: string): HomeProduct[] {
  // Map legacy home categories if querying home_kitchen_furniture
  if (masterId === 'home_kitchen_furniture') {
    return SAMPLE_KENYAN_HOME_PRODUCTS.filter(p => 
      p.category === 'home_kitchen_furniture' ||
      p.category === 'furniture' || 
      p.category === 'kitchenware_utensils' || 
      p.category === 'bedding_decor' ||
      p.category === 'appliances_electronics'
    );
  }

  return SAMPLE_KENYAN_HOME_PRODUCTS.filter(p => p.category === masterId);
}

export function getProductsForSubcategory(masterId: string, subcategoryId: string): HomeProduct[] {
  const masterProducts = getProductsForMasterCategory(masterId);
  return masterProducts.filter(p => p.subcategory === subcategoryId);
}


