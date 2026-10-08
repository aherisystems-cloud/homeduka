import { BusinessProfile, HomeService } from '../types/schema';

export const SAMPLE_KENYAN_HOME_LISTINGS: BusinessProfile[] = [
  {
    id: "biz-kamakis-hardwood-001",
    slug: "classic-hardwood-furniture-kamakis",
    business_name: "Classic Hardwood & Bespoke Carpentry",
    tagline: "Kiln-Dried Mahogany & Mvule Living Room & Bedroom Sets",
    description: "Specialized in custom solid hardwood furniture, contemporary sofa sets, and orthopedic bed frames. Located along Eastern Bypass with customer parking and live workshop viewing.",
    primary_vertical: "home",
    categories: ["furniture", "carpentry_cabinetry"],
    location: {
      country: "Kenya",
      county: "Kiambu",
      sub_county: "Ruiru",
      neighborhood: "Kamakis",
      landmark: "Opposite Shell Petrol Station, 150m off Eastern Bypass",
      stage_name: "Kamakis Stage",
      road_or_bypass: "Eastern Bypass",
      coordinates: {
        latitude: -1.1824,
        longitude: 36.9841
      },
      service_coverage_areas: ["Ruiru", "Nairobi Metro", "Membley", "Kahawa Sukari", "Thika", "Nationwide Parcel Delivery"]
    },
    contact: {
      primary_phone: "254712345678",
      whatsapp_number: "254712345678",
      secondary_phone: "254722998877",
      instagram_handle: "@classichardwood_ke",
      tiktok_handle: "@classichardwood",
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
      total_reviews: 42,
      completed_jobs_count: 180,
      response_time_minutes: 8
    },
    attributes: {
      has_customer_parking: true,
      samples_showroom_available: true,
      uses_solid_hardwood: true,
      custom_orders_accepted: true,
      delivery_available: true,
      delivery_scope: "nairobi_free",
      assembly_service_included: true,
      payment_terms: "deposit_required",
      deposit_percentage_required: 30,
      written_warranty_provided: true,
      warranty_duration_months: 24
    },
    seo: {
      meta_title: "Classic Hardwood & Sofa Makers in Ruiru, Kamakis | Real Solid Wood",
      meta_description: "Bespoke hardwood furniture, 7-seater sofas, and mahogany beds in Ruiru Kamakis. Free delivery in Nairobi and 2-year warranty.",
      keywords: ["hardwood furniture kamakis", "sofa makers ruiru", "mahogany beds eastern bypass", "custom carpentry kiambu"],
      canonical_url: "https://homekenya.co.ke/shop/classic-hardwood-furniture-kamakis"
    },
    created_at: "2026-08-01T08:00:00Z",
    updated_at: "2026-09-20T14:30:00Z"
  },
  {
    id: "biz-kilimani-plumbing-002",
    slug: "quickfix-plumbers-kilimani",
    business_name: "QuickFix 24/7 Plumbing & Solar Water Systems",
    tagline: "Licensed Emergency Plumbers, Borehole Pumps & Solar Heating",
    description: "Licensed plumbing professionals serving Kilimani, Kileleshwa, Lavington and Westlands. Leak detection, bathroom remodels, and solar water heating repair with zero inspection fee if hired.",
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
      coordinates: {
        latitude: -1.2921,
        longitude: 36.7858
      },
      service_coverage_areas: ["Kilimani", "Kileleshwa", "Lavington", "Westlands", "Ngong Road", "Hurlingham"]
    },
    contact: {
      primary_phone: "254799112233",
      whatsapp_number: "254799112233",
      email: "info@quickfixplumbing.co.ke",
      website_url: "https://quickfixplumbing.co.ke"
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
      total_reviews: 67,
      completed_jobs_count: 420,
      response_time_minutes: 5
    },
    attributes: {
      brings_own_tools: true,
      provides_materials: true,
      labor_only_option: true,
      emergency_callout: true,
      ncaw_certified_plumber: true,
      written_warranty_provided: true,
      warranty_duration_months: 6
    },
    seo: {
      meta_title: "Emergency Plumbers in Kilimani & Kileleshwa | 24/7 Response",
      meta_description: "Call verified 24/7 emergency plumbers in Kilimani, Kileleshwa & Lavington. Solar water systems, pipe bursts, and bathroom fittings.",
      keywords: ["emergency plumber kilimani", "plumbing services kileleshwa", "solar water heater repair nairobi"],
      canonical_url: "https://homekenya.co.ke/shop/quickfix-plumbers-kilimani"
    },
    created_at: "2026-07-01T09:00:00Z",
    updated_at: "2026-09-15T11:20:00Z"
  },
  {
    id: "biz-mombasa-nyali-003",
    slug: "swahili-teak-furniture-nyali",
    business_name: "Swahili Teak & Lamu Craft Workshops",
    tagline: "Carved Solid Teak & Mvule Coastal Furniture & Doors",
    description: "Authentic coastal hardwood masters in Nyali, Mombasa. Specializing in carved Lamu beds, teak outdoor patio dining sets, and intricate wooden front doors with weather-resistant finishing.",
    primary_vertical: "home",
    categories: ["furniture", "carpentry_cabinetry"],
    location: {
      country: "Kenya",
      county: "Mombasa",
      sub_county: "Nyali",
      neighborhood: "Nyali Links Road",
      landmark: "Near City Mall Nyali, opposite Naivas Links Road",
      road_or_bypass: "Links Road",
      coordinates: {
        latitude: -4.0321,
        longitude: 39.7118
      },
      service_coverage_areas: ["Nyali", "Bamburi", "Mtwapa", "Diani Beach", "Mombasa Island", "Kilifi"]
    },
    contact: {
      primary_phone: "254711445566",
      whatsapp_number: "254711445566",
      instagram_handle: "@swahiliteak_mombasa"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "cash_on_delivery", "bank_transfer"],
      mpesa_till_number: "612984",
      price_rating: "$$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-08-20T08:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "08:00 - 18:00",
      saturday: "08:30 - 16:30",
      sunday: "Closed",
      emergency_service_24_7: false
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      ],
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.9,
      total_reviews: 31,
      completed_jobs_count: 140,
      response_time_minutes: 10
    },
    attributes: {
      has_customer_parking: true,
      uses_solid_hardwood: true,
      custom_orders_accepted: true,
      delivery_available: true,
      delivery_scope: "nairobi_paid",
      written_warranty_provided: true,
      warranty_duration_months: 36
    },
    seo: {
      meta_title: "Swahili Teak & Lamu Doors in Nyali, Mombasa | Hardwood Furniture",
      meta_description: "Carved solid teak beds, patio sets, and antique doors in Nyali Mombasa. Delivery across Coast and Nairobi.",
      keywords: ["swahili teak furniture nyali", "lamu doors mombasa", "coastal outdoor furniture diani"],
      canonical_url: "https://homekenya.co.ke/shop/swahili-teak-furniture-nyali"
    },
    created_at: "2026-08-10T10:00:00Z",
    updated_at: "2026-09-22T16:00:00Z"
  },
  {
    id: "biz-nakuru-solar-004",
    slug: "rift-solar-borehole-nakuru",
    business_name: "Rift Valley Solar & Borehole Pump Specialists",
    tagline: "Certified EPRA Solar Water Heating, Inverters & Pump Automation",
    description: "Serving Nakuru, Naivasha, Gilgil, and Njoro. Borehole submersible pump repairs, residential solar hybrid inverter backup systems, and solar water heating installations with certified warranties.",
    primary_vertical: "home",
    categories: ["electrical_solar", "plumbing"],
    location: {
      country: "Kenya",
      county: "Nakuru",
      sub_county: "Nakuru East",
      neighborhood: "Section 58",
      landmark: "Near Section 58 Quickmart, along Nakuru-Nairobi Highway",
      road_or_bypass: "Nakuru-Nairobi Highway",
      coordinates: {
        latitude: -0.2831,
        longitude: 36.0833
      },
      service_coverage_areas: ["Nakuru City", "Milimani Nakuru", "Section 58", "Naivasha", "Gilgil", "Njoro"]
    },
    contact: {
      primary_phone: "254733889900",
      whatsapp_number: "254733889900"
    },
    commercial: {
      has_physical_shop: true,
      accepts_cash_on_delivery: true,
      payment_methods: ["lipa_na_mpesa_till", "mpesa_paybill"],
      mpesa_till_number: "928371",
      price_rating: "$$"
    },
    verification: {
      tier: "verified_pro",
      is_claimed: true,
      verified_at: "2026-09-01T11:00:00Z",
      id_or_registration_verified: true,
      physical_visit_verified: true,
      guarantee_or_warranty_offered: true
    },
    operating_hours: {
      monday_friday: "08:00 - 18:00",
      saturday: "08:30 - 15:00",
      sunday: "Closed",
      emergency_service_24_7: true
    },
    media: {
      cover_image_url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
      workshop_photos: [],
      portfolio_work_photos: []
    },
    reputation: {
      rating: 4.8,
      total_reviews: 24,
      completed_jobs_count: 95,
      response_time_minutes: 12
    },
    attributes: {
      brings_own_tools: true,
      provides_materials: true,
      emergency_callout: true,
      licensed_electrician_epra: true,
      written_warranty_provided: true,
      warranty_duration_months: 12
    },
    seo: {
      meta_title: "Solar Water Heating & Borehole Pumps in Nakuru | Section 58",
      meta_description: "EPRA certified solar installations and borehole pump repairs in Nakuru Section 58 and Milimani.",
      keywords: ["solar water heating nakuru", "borehole pump repair section 58", "solar inverter installation naivasha"],
      canonical_url: "https://homekenya.co.ke/shop/rift-solar-borehole-nakuru"
    },
    created_at: "2026-09-01T09:00:00Z",
    updated_at: "2026-09-30T10:00:00Z"
  },
  {
    id: "biz-syokimau-gypsum-005",
    slug: "syokimau-gypsum-cabro-interiors",
    business_name: "Syokimau Gypsum Ceilings & Cabro Paving",
    tagline: "Modern Gypsum Design, Cornices, Epoxy & Driveway Cabro Blocks",
    description: "Specialized in contemporary gypsum ceilings with hidden LED strip lighting, Cabro interlocking driveway paving, and exterior boundary wall painting across Syokimau, Athi River, and Kitengela.",
    primary_vertical: "home",
    categories: ["painting_gypsum", "tiles_flooring"],
    location: {
      country: "Kenya",
      county: "Machakos",
      sub_county: "Mavoko",
      neighborhood: "Syokimau",
      landmark: "Near Gateway Mall / Syokimau Railway Station, Mombasa Road",
      road_or_bypass: "Mombasa Road",
      coordinates: {
        latitude: -1.3654,
        longitude: 36.9247
      },
      service_coverage_areas: ["Syokimau", "Mlolongo", "Athi River", "Kitengela", "South B", "South C"]
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
      is_claimed: true,
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
      total_reviews: 38,
      completed_jobs_count: 160,
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
      meta_title: "Gypsum Ceilings & Cabro Paving in Syokimau | Mombasa Road",
      meta_description: "Top rated gypsum ceiling fitters and cabro paving contractors in Syokimau, Mlolongo, and Kitengela.",
      keywords: ["gypsum ceiling syokimau", "cabro paving athi river", "house painters mlolongo"],
      canonical_url: "https://homekenya.co.ke/shop/syokimau-gypsum-cabro-interiors"
    },
    created_at: "2026-09-05T08:00:00Z",
    updated_at: "2026-10-02T12:00:00Z"
  }
];

export const SAMPLE_KENYAN_HOME_SERVICES: HomeService[] = [
  {
    id: "srv-plumb-001",
    business_id: "biz-kilimani-plumbing-002",
    title: "Emergency Pipe Burst, Leak Detection & Pressure Pump Repair",
    slug: "emergency-pipe-burst-repair-kilimani",
    service_category: "plumbing",
    description: "Rapid response plumbing repair across Kilimani, Kileleshwa, and Lavington. Covers burst PPR pipes, dripping mixers, faulty float valves, and booster pump automation. 20-minute dispatch for emergencies.",
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
      warranty_guarantee_days: 30,
      service_radius_km: 15
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Free assessment via WhatsApp video • Free site visit in Kilimani & Kileleshwa"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-01T08:00:00Z"
  },
  {
    id: "srv-solar-002",
    business_id: "biz-nakuru-solar-004",
    title: "EPRA Certified Solar Water Heater Installation & Element Replacement",
    slug: "solar-water-heater-repair-nakuru",
    service_category: "electrical_solar",
    description: "Installation and repair of vacuum tube & flat plate solar water heaters, thermostat replacements, sacrificial anode cleaning, and backup electrical heating elements across Nakuru and Naivasha.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 3500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: true,
      estimated_duration_hours: 4,
      materials_included: false,
      warranty_guarantee_days: 90,
      service_radius_km: 40
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Send solar panel / controller photo on WhatsApp for free instant quote"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-10T08:00:00Z"
  },
  {
    id: "srv-gypsum-003",
    business_id: "biz-syokimau-gypsum-005",
    title: "Modern Multi-Level Gypsum Ceilings & Warm LED Cove Lighting",
    slug: "gypsum-ceiling-installation-syokimau",
    service_category: "painting_gypsum",
    description: "Architectural gypsum ceiling design with metal framing, acoustic boards, recessed LED spotlights, and concealed LED strip cove lighting for living rooms and master bedrooms across Mombasa Road and Nairobi.",
    pricing: {
      price_type: "fixed",
      starting_price_kes: 1800,
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
  {
    id: "srv-cabro-004",
    business_id: "biz-syokimau-gypsum-005",
    title: "Driveway Interlocking Cabro Paving Blocks & Perimeter Drainage",
    slug: "cabro-paving-installation-syokimau",
    service_category: "tiles_flooring",
    description: "Supply and machine-compaction installation of heavy-duty 60mm and 80mm colored interlocking cabro blocks, quarry dust leveling, sand blinding, and edge curbing for driveways and compounds.",
    pricing: {
      price_type: "fixed",
      starting_price_kes: 1450,
      unit: "per_sqm",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 72,
      materials_included: true,
      warranty_guarantee_days: 730,
      service_radius_km: 35
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Free compound area measurement & block samples brought to your gate"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-18T08:00:00Z"
  },
  {
    id: "srv-carpentry-005",
    business_id: "biz-kamakis-hardwood-001",
    title: "Custom Built-in Kitchen Cabinets & MDF/Hardwood Wardrobes",
    slug: "custom-kitchen-cabinets-kamakis",
    service_category: "carpentry_cabinetry",
    description: "Tailor-made kitchen cabinetry with soft-close hinges, granite worktop fitting, and floor-to-ceiling bedroom wardrobes in marine plywood or solid mahogany. Custom measurements taken on site.",
    pricing: {
      price_type: "starting_from",
      starting_price_kes: 8500,
      unit: "fixed_job",
      waives_inspection_fee_if_hired: true
    },
    service_terms: {
      emergency_available: false,
      estimated_duration_hours: 36,
      materials_included: true,
      warranty_guarantee_days: 730,
      service_radius_km: 25
    },
    affirmed_commitments: {
      free_whatsapp_assessment: true,
      free_local_measurement: true,
      coverage_note: "Free site measurement & 3D sketch across Ruiru, Kamakis, Thika Road & Nairobi"
    },
    portfolio_photos: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: "2026-09-20T08:00:00Z"
  }
];
