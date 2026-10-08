/**
 * COMPREHENSIVE KENYAN TAXONOMY & GEOGRAPHIC HIERARCHY
 * Covers all major regions of Kenya down to micro-neighborhoods and estates.
 * Maps authentic Kenyan search phrases, Sheng slang, and local intent.
 */

// ==========================================
// 1. NATIONAL & REGIONAL GEOGRAPHY HIERARCHY
// ==========================================
export interface KenyanRegion {
  id: string;
  name: string; // e.g. "Nairobi Metro", "Coast Region", "Rift Valley"
  counties: {
    name: string;
    majorTowns: string[];
    microNeighborhoods: string[];
  }[];
}

export const KENYAN_REGIONS: KenyanRegion[] = [
  {
    id: "nairobi_metro",
    name: "Nairobi Metropolitan",
    counties: [
      {
        name: "Nairobi",
        majorTowns: ["Westlands", "Dagoretti", "Lang'ata", "Kasarani", "Embakasi", "Starehe", "Kamukunji"],
        microNeighborhoods: [
          "Kilimani", "Kileleshwa", "Lavington", "Westlands", "Parklands", "Karen",
          "South B", "South C", "Roysambu", "Kasarani", "Kahawa West", "Lang'ata",
          "Rongai (Border)", "Syokimau (Border)", "Utawala", "Donholm", "Buruburu",
          "Pangani", "Ngara", "Hurlingham", "Riverside", "Kyuna", "Spring Valley", "Runda"
        ]
      },
      {
        name: "Kiambu",
        majorTowns: ["Ruiru", "Thika", "Kiambu Town", "Kikuyu", "Limuru", "Karuri"],
        microNeighborhoods: [
          "Kamakis (Eastern Bypass)", "Membley", "Kahawa Sukari", "Kahawa Wendani",
          "Ruaka", "Banana", "Ndenderu", "Two Rivers Area", "Thindigua", "Kiambu Road",
          "Edenville", "Fourways Junction", "Juja", "Witeithie", "Tatu City", "Mugutha"
        ]
      },
      {
        name: "Machakos",
        majorTowns: ["Machakos Town", "Mavoko (Athi River)", "Kangundo", "Tala"],
        microNeighborhoods: [
          "Syokimau", "Mlolongo", "Athi River", "Kyumvi / Junction", "Katani", "Kinanie", "Chumvi"
        ]
      },
      {
        name: "Kajiado",
        majorTowns: ["Kajiado Town", "Ngong", "Kitengela", "Ongata Rongai"],
        microNeighborhoods: [
          "Kitengela (Yukos, Chuna, EPZ)", "Ongata Rongai (Rimpa, Maasai Mall)",
          "Ngong Town", "Kiserian", "Matasia", "Olekasasi", "Nkoroi"
        ]
      }
    ]
  },
  {
    id: "coast_region",
    name: "Coast Region",
    counties: [
      {
        name: "Mombasa",
        majorTowns: ["Mombasa Island", "Nyali", "Kisauni", "Likoni", "Changamwe", "Jomvu"],
        microNeighborhoods: [
          "Nyali", "Bamburi", "Shanzu", "Old Town", "Ganjoni", "Kizingo", "Tudor",
          "Mkomani", "Kongowea", "Bamburi Beach", "Mtwapa (Border)", "Changamwe"
        ]
      },
      {
        name: "Kilifi",
        majorTowns: ["Kilifi Town", "Malindi", "Mtwapa", "Watamu"],
        microNeighborhoods: ["Mtwapa", "Watamu Beach", "Malindi Town", "Kilifi Bofa", "Vipingo Ridge"]
      },
      {
        name: "Kwale",
        majorTowns: ["Ukunda", "Diani Beach", "Msambweni"],
        microNeighborhoods: ["Diani Beach", "Ukunda Town", "Tiwi", "Galu Kinondo"]
      }
    ]
  },
  {
    id: "rift_valley",
    name: "Rift Valley Region",
    counties: [
      {
        name: "Nakuru",
        majorTowns: ["Nakuru City", "Naivasha", "Gilgil", "Molo", "Njoro"],
        microNeighborhoods: [
          "Milimani (Nakuru)", "Section 58", "Naka", "Kiamunyi", "Free Area",
          "Lanet", "Pipeline", "Naivasha Town", "Moi South Lake", "Greensteds"
        ]
      },
      {
        name: "Uasin Gishu",
        majorTowns: ["Eldoret"],
        microNeighborhoods: [
          "Elgon View", "Pioneer", "Kapsoya", "West Indies", "Annex", "Langas", "Maili Nne"
        ]
      }
    ]
  },
  {
    id: "western_nyanza",
    name: "Western & Nyanza Region",
    counties: [
      {
        name: "Kisumu",
        majorTowns: ["Kisumu City", "Ahero", "Maseno"],
        microNeighborhoods: [
          "Milimani (Kisumu)", "Riat Hills", "Kondele", "Tom Mboya", "Mamboleo",
          "Nyamasaria", "Migosi", "Kibuye"
        ]
      },
      {
        name: "Kakamega",
        majorTowns: ["Kakamega Town", "Mumias"],
        microNeighborhoods: ["Milimani (Kakamega)", "Amalemba", "Lurambi", "Kefinco"]
      }
    ]
  },
  {
    id: "central_mt_kenya",
    name: "Central & Mt. Kenya Region",
    counties: [
      {
        name: "Nyeri",
        majorTowns: ["Nyeri Town", "Karatina", "Othaya"],
        microNeighborhoods: ["Ring Road", "Skuta", "King'ong'o", "Kiganjo", "Karatina Town"]
      },
      {
        name: "Meru",
        majorTowns: ["Meru Town", "Nkubu", "Maua"],
        microNeighborhoods: ["Milimani Meru", "Makutano", "Kinoru", "Nkubu"]
      }
    ]
  }
];

// ==========================================
// 2. EXHAUSTIVE CATEGORY TAXONOMY FOR HOME
// ==========================================
export interface CategoryTaxonomy {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  subcategories: {
    id: string;
    name: string;
    popularSearches: string[];
  }[];
}

export const HOME_CATEGORIES_TAXONOMY: CategoryTaxonomy[] = [
  {
    id: "furniture_living",
    name: "Living Room & Furniture",
    icon: "🛋️",
    tagline: "Sofas, Recliners, TV Consoles, Solid Hardwood & Coffee Tables",
    subcategories: [
      {
        id: "sofas_sectionals",
        name: "Sofas, L-Shapes & Chesterfields",
        popularSearches: [
          "Chesterfield 7 seater sofa Kamakis",
          "L-shape sofa sets Ruiru",
          "Recliner sofa sets Nairobi",
          "Velvet waterproof fabric sofa",
          "Sofa set price in Kenya under 40k",
          "Ngong road sofa makers"
        ]
      },
      {
        id: "tv_stands_consoles",
        name: "TV Stands, Consoles & Wall Units",
        popularSearches: [
          "Modern floating TV stand Nairobi",
          "Gypsum TV wall unit design",
          "Solid mahogany TV console",
          "Minimalist TV cabinet Kilimani"
        ]
      },
      {
        id: "coffee_tables_accent",
        name: "Coffee Tables & Accent Chairs",
        popularSearches: [
          "Marble top coffee table Nairobi",
          "Round wooden coffee table Kamakis",
          "Wingback accent chairs Kenya"
        ]
      },
      {
        id: "shoe_racks_entryway",
        name: "Shoe Racks & Entryway Units",
        popularSearches: [
          "Wooden shoe rack cabinet Nairobi",
          "Custom entryway storage bench"
        ]
      }
    ]
  },
  {
    id: "bedroom_bedding",
    name: "Bedroom, Beds & Mattresses",
    icon: "🛏️",
    tagline: "Solid Hardwood Beds, Orthopedic Mattresses, Wardrobes & Closets",
    subcategories: [
      {
        id: "hardwood_beds",
        name: "Solid Hardwood & Storage Beds",
        popularSearches: [
          "6 by 6 mahogany bed Kamakis price",
          "Hydraulic storage bed Nairobi",
          "Mvule wood bed frames",
          "King size upholstered tufted bed",
          "5 by 6 bed with drawers"
        ]
      },
      {
        id: "mattresses_bedding",
        name: "Mattresses & Orthopedic Bedding",
        popularSearches: [
          "High density orthopedic mattress Kenya",
          "Dr Mattress alternatives Nairobi",
          "Spring mattress 6x6 price Kenya",
          "Waterproof mattress protector"
        ]
      },
      {
        id: "wardrobes_closets",
        name: "Wardrobes, Closets & Dressers",
        popularSearches: [
          "Fitted MDF wardrobe sliding doors",
          "4 door wooden wardrobe price Nairobi",
          "Dressing table with mirror and lights"
        ]
      }
    ]
  },
  {
    id: "kitchen_dining",
    name: "Kitchen & Dining",
    icon: "🍳",
    tagline: "Dining Tables, Fitted Cabinets, Sinks, Cookers & Appliances",
    subcategories: [
      {
        id: "dining_sets",
        name: "Dining Tables & Chairs",
        popularSearches: [
          "6 seater solid mahogany dining set",
          "8 seater dining table Kamakis",
          "Glass top dining table Nairobi"
        ]
      },
      {
        id: "kitchen_cabinets",
        name: "Kitchen Fitters & Island Cabinets",
        popularSearches: [
          "Granite kitchen countertop installation price Kenya",
          "Modern kitchen pantry cabinets Nairobi",
          "MDF kitchen cabinet fitters Ruaka"
        ]
      },
      {
        id: "cookers_appliances",
        name: "Cookers, Ovens & Large Appliances",
        popularSearches: [
          "Ramtons 4 burner gas cooker oven",
          "Mika built-in oven and microwave",
          "Double door refrigerator Nairobi"
        ]
      }
    ]
  },
  {
    id: "plumbing_water",
    name: "Plumbing, Pumps & Solar Water",
    icon: "🔧",
    tagline: "24/7 Emergency Plumbers, Borehole Pumps, Solar Heaters & Tanks",
    subcategories: [
      {
        id: "emergency_plumbers",
        name: "24/7 Emergency Repairs & Leaks",
        popularSearches: [
          "Emergency plumber Kilimani",
          "Burst pipe repair fundi Westlands",
          "Fundi wa maji choo Nairobi",
          "Bathroom mixer tap leak repair",
          "Blocked toilet drainage unblocking"
        ]
      },
      {
        id: "solar_water_heating",
        name: "Solar Water Heaters & Sensors",
        popularSearches: [
          "Solar water heater repair Nairobi",
          "Solar heating installation price Kenya 300L",
          "EPRA licensed solar water technician"
        ]
      },
      {
        id: "water_pumps_tanks",
        name: "Borehole Pumps & Water Tanks",
        popularSearches: [
          "Borehole submersible pump repair Ruiru",
          "Water booster pump installation apartment",
          "Roto / Kentank 5000 liters price Nairobi"
        ]
      }
    ]
  },
  {
    id: "electrical_solar_power",
    name: "Electrical, Solar & Power Backup",
    icon: "⚡",
    tagline: "Licensed EPRA Electricians, Lithium Inverters & Lighting",
    subcategories: [
      {
        id: "epra_electricians",
        name: "Licensed House Electricians",
        popularSearches: [
          "EPRA licensed electrician Kilimani",
          "Fundi wa stima wiring house Nairobi",
          "Short circuit fault finding electrician",
          "Token meter bypass inspection KPLC"
        ]
      },
      {
        id: "solar_inverters_backup",
        name: "Inverters, Lithium Batteries & Solar",
        popularSearches: [
          "Home solar inverter backup system Kenya",
          "5kVA hybrid solar inverter price Nairobi",
          "Lithium ion battery for home backup"
        ]
      },
      {
        id: "chandeliers_lighting",
        name: "Chandeliers, LED & Smart Lighting",
        popularSearches: [
          "Modern living room chandelier lighting Kenya",
          "Warm white LED strip lights ceiling",
          "Outdoor solar floodlights with sensor"
        ]
      }
    ]
  },
  {
    id: "painting_gypsum",
    name: "Painting, Gypsum & Finishing",
    icon: "🎨",
    tagline: "Gypsum Ceilings, Crown / Duracoat Painters, Wall Panels & Epoxy",
    subcategories: [
      {
        id: "gypsum_ceilings",
        name: "Gypsum Ceiling & Cornice Designers",
        popularSearches: [
          "Gypsum ceiling price per square meter Nairobi",
          "Modern gypsum ceiling designs sitting room",
          "Acoustic ceiling board fitters Kilimani"
        ]
      },
      {
        id: "house_painters",
        name: "Interior & Exterior Painters",
        popularSearches: [
          "Fundi wa rangi house painter Nairobi",
          "Crown paints silk vinyl labor rates per day",
          "Waterproof exterior wall paint application"
        ]
      },
      {
        id: "wallpapers_panels",
        name: "3D Wall Panels, Wood Slats & Wallpaper",
        popularSearches: [
          "Fluted wall panel acoustic wood slats Nairobi",
          "3D PVC wall panels installation price"
        ]
      }
    ]
  },
  {
    id: "tiles_masonry_paving",
    name: "Tiles, Cabro Paving & Countertops",
    icon: "🧱",
    tagline: "Floor Tiling, Cabro Paving Driveways, Granite Tops & Terrazzo",
    subcategories: [
      {
        id: "tile_fitting",
        name: "Porcelain & Ceramic Tile Fitters",
        popularSearches: [
          "Fundi wa tiles bathroom floor Nairobi",
          "Porcelain floor tiles fitting labor per sqm",
          "Kitchen backsplash tile installer"
        ]
      },
      {
        id: "cabro_paving",
        name: "Cabro Paving & Driveway Contractors",
        popularSearches: [
          "Cabro blocks price per piece Kenya",
          "Cabro paving installation labor per square meter",
          "Interlocking driveway paving contractors Ruiru"
        ]
      },
      {
        id: "granite_quartz",
        name: "Granite & Quartz Countertops",
        popularSearches: [
          "Black galaxy granite countertop supply fitting",
          "Quartz kitchen island countertop Nairobi"
        ]
      }
    ]
  },
  {
    id: "moving_relocation",
    name: "House Moving & Packaging",
    icon: "📦",
    tagline: "Closed Truck Movers, TV Unmounting, Packing Boxes & Upcountry",
    subcategories: [
      {
        id: "residential_movers",
        name: "Apartment & House Movers",
        popularSearches: [
          "Affordable house movers in Kilimani",
          "Best moving companies Nairobi 2 bedroom cost",
          "Movers in Ruaka and Westlands",
          "Lori ya kuhama Nairobi contacts"
        ]
      },
      {
        id: "upcountry_relocation",
        name: "Upcountry Long Distance Movers",
        popularSearches: [
          "Moving house from Nairobi to Mombasa",
          "Nairobi to Kisumu / Eldoret house moving rates",
          "Goods in transit insurance moving company"
        ]
      }
    ]
  },
  {
    id: "cleaning_fumigation",
    name: "Deep Cleaning & Fumigation",
    icon: "🧹",
    tagline: "Post-Construction Cleaning, Carpet Wash & Pest Control",
    subcategories: [
      {
        id: "deep_cleaning",
        name: "Deep House & Post-Construction Clean",
        popularSearches: [
          "Post construction cleaning services Nairobi",
          "Sofa set shampoo cleaning at home Kilimani",
          "Mattress steam cleaning Nairobi"
        ]
      },
      {
        id: "fumigation_pest",
        name: "Fumigation & Pest Control",
        popularSearches: [
          "Bedbugs fumigation pest control Nairobi price",
          "Cockroaches pest control chemicals Kenya",
          "Termite treatment foundation building"
        ]
      }
    ]
  },
  {
    id: "security_smart_home",
    name: "Security, Gates & CCTV",
    icon: "🛡️",
    tagline: "CCTV Cameras, Electric Fences, Razor Wire & Automated Gates",
    subcategories: [
      {
        id: "cctv_installation",
        name: "CCTV Cameras & Remote Mobile Viewing",
        popularSearches: [
          "Hikvision CCTV installation package price Kenya",
          "Home security cameras with audio Nairobi",
          "Wireless solar CCTV cameras 4G SIM"
        ]
      },
      {
        id: "electric_fences_gates",
        name: "Electric Fence & Gate Automation",
        popularSearches: [
          "Electric fence installation price per meter Kenya",
          "Sliding gate automation motor Centurion Nairobi",
          "Razor wire installation fundi"
        ]
      }
    ]
  }
];

// ==========================================
// 3. KENYAN SLANG & SEARCH INTENT ALIASES
// ==========================================
export const KENYAN_SEARCH_INTENT_MAP: Record<string, string> = {
  // Swahili & Sheng Fundi Queries
  "fundi wa stima": "epra_electricians",
  "fundi wa maji": "emergency_plumbers",
  "fundi wa choo": "emergency_plumbers",
  "fundi wa mbao": "furniture_living",
  "fundi wa rangi": "house_painters",
  "fundi wa tiles": "tile_fitting",
  "fundi wa gypsum": "gypsum_ceilings",
  "lori ya kuhama": "residential_movers",
  "lori ya mchanga": "tiles_masonry_paving",
  "dawa ya kunguni": "fumigation_pest",
  "dawa ya mende": "fumigation_pest",

  // Bed Dimensions
  "6 by 6": "hardwood_beds",
  "6x6": "hardwood_beds",
  "5 by 6": "hardwood_beds",
  "5x6": "hardwood_beds",
  "kitanda": "hardwood_beds",

  // Sofa & Furniture Slang
  "l shape": "sofas_sectionals",
  "l-shape": "sofas_sectionals",
  "chesterfield": "sofas_sectionals",
  "viti vya sitting room": "sofas_sectionals",
  "sofa za ngong road": "sofas_sectionals",
  "sofa kamakis": "sofas_sectionals",
  
  // Power & Water
  "stima imepotea": "solar_inverters_backup",
  "generator": "solar_inverters_backup",
  "inverter": "solar_inverters_backup",
  "solar ya maji": "solar_water_heating",
  "borehole pump": "water_pumps_tanks",

  // Moving
  "kuhama": "residential_movers",
  "moving": "residential_movers"
};
