import { BusinessProfile } from '../types/schema';

export const SAMPLE_KENYAN_HOME_LISTINGS: BusinessProfile[] = [
  {
    id: "biz-kamakis-hardwood-001",
    slug: "classic-hardwood-furniture-kamakis",
    business_name: "Classic Hardwood & Bespoke Carpentry",
    tagline: "Kiln-Dried Mahogany & Mvule Living Room & Bedroom Furniture",
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
      service_coverage_areas: ["Nairobi County", "Kiambu Metro", "Machakos", "Kajiado"]
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
      canonical_url: "https://homekenya.co.ke/biz/classic-hardwood-furniture-kamakis"
    },
    created_at: "2026-08-01T08:00:00Z",
    updated_at: "2026-09-20T14:30:00Z"
  },
  {
    id: "biz-kilimani-plumbing-002",
    slug: "quickfix-plumbers-kilimani-kileleshwa",
    business_name: "QuickFix 24/7 Plumbing & Solar Water Systems",
    tagline: "Certified Emergency Plumbers, Borehole Pumps & Solar Heating",
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
      service_coverage_areas: ["Kilimani", "Kileleshwa", "Lavington", "Westlands", "Ngong Road"]
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
      canonical_url: "https://homekenya.co.ke/biz/quickfix-plumbers-kilimani-kileleshwa"
    },
    created_at: "2026-07-01T09:00:00Z",
    updated_at: "2026-09-15T11:20:00Z"
  }
];
