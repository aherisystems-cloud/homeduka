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

// ==========================================
// 4. MASTER PRODUCT TAXONOMY (THE KENYAN SOKO)
// Universal, Exhaustive, Unambiguous Product Categories
// ==========================================
export interface SubCategoryDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  popularSearches: string[];
}

export interface MasterCategoryDef {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
  subcategories: SubCategoryDef[];
}

export const MASTER_PRODUCT_CATEGORIES: MasterCategoryDef[] = [
  {
    id: "electronics_phones",
    name: "Phones, Computers & Electronics",
    shortName: "Electronics",
    icon: "📱",
    tagline: "iPhones, Android Phones, Laptops, Smart TVs, Woofers & CCTV Cameras",
    subcategories: [
      {
        id: "smartphones_tablets",
        name: "Smartphones & Tablets",
        description: "iPhones, Samsung, Tecno, Infinix, Redmi, iPads & Kabambe phones",
        icon: "📱",
        popularSearches: ["iPhone 15 Nairobi", "Samsung A-Series price", "Redmi Note 13", "iPad Air Kenya", "Kabambe dual SIM"]
      },
      {
        id: "laptops_computers",
        name: "Laptops & Computers",
        description: "HP, Dell, Lenovo, MacBooks, Desktops, Monitors & Printers",
        icon: "💻",
        popularSearches: ["HP Core i5 refurbished", "MacBook Air M2 Nairobi", "Dell Latitude Eldoret", "Epson EcoTank printer", "Curved gaming monitor"]
      },
      {
        id: "tvs_audio_entertainment",
        name: "Smart TVs & Soundbars",
        description: "Smart Android TVs, 4K UHD, Soundbars, Home Theatres & Woofers",
        icon: "📺",
        popularSearches: ["55 inch smart TV price", "Vitron 43 inch TV", "Sony soundbar with subwoofer", "Ampex woofer system", "Startimes decoder"]
      },
      {
        id: "power_chargers_accessories",
        name: "Power Banks & Audio",
        description: "Fast charging power banks, AirPods, Bluetooth speakers & Smartwatches",
        icon: "🔋",
        popularSearches: ["Oraimo 20000mAh power bank", "Type-C 65W fast charger", "Wireless earbuds ANC", "Smartwatch with calls", "JBL Bluetooth speaker"]
      },
      {
        id: "cctv_security_cameras",
        name: "CCTV, Security & Cameras",
        description: "Hikvision CCTV kits, 4G solar security cameras & ring lights",
        icon: "📷",
        popularSearches: ["Hikvision 4-camera CCTV kit", "Solar wireless CCTV camera", "Ring light with tripod Nairobi", "Canon DSLR camera", "Door spy camera"]
      }
    ]
  },
  {
    id: "home_kitchen_furniture",
    name: "Home, Kitchen & Furniture",
    shortName: "Home & Living",
    icon: "🛋️",
    tagline: "Hardwood Sofas, Beds, Dining Sets, Cookers, Fridges & Non-Stick Cookware",
    subcategories: [
      {
        id: "living_room_furniture",
        name: "Living Room Furniture",
        description: "7-Seater sofas, Chesterfield sectionals, TV wall consoles & coffee tables",
        icon: "🛋️",
        popularSearches: ["Chesterfield 7-seater sofa", "L-shape couch Kamakis", "Floating TV wall unit", "Wooden coffee table set", "Shoe rack cabinet"]
      },
      {
        id: "bedroom_furniture_mattresses",
        name: "Beds, Wardrobes & Mattresses",
        description: "Solid mahogany beds, hydraulic storage beds, orthopedic mattresses & wardrobes",
        icon: "🛏️",
        popularSearches: ["6x6 storage bed Nairobi", "Mobra high density mattress", "Fitted 4-door wardrobe", "Dressing table with mirror", "Bunk bed kids"]
      },
      {
        id: "dining_kitchen_furniture",
        name: "Dining Sets & Cabinets",
        description: "4, 6, 8-seater dining tables, kitchen pantry cabinets & bar stools",
        icon: "🪑",
        popularSearches: ["6-seater mahogany dining table", "Modern bar stools Nairobi", "Kitchen pantry organizer", "Buffet sideboard cabinet"]
      },
      {
        id: "cookers_fridges_appliances",
        name: "Cookers, Fridges & Appliances",
        description: "Standing gas/electric cookers, double-door fridges, microwaves & washing machines",
        icon: "❄️",
        popularSearches: ["Ramtons 4-burner standing cooker", "Double door fridge Kenya", "Air fryer 6L Nairobi", "Front load washing machine", "Microwave oven"]
      },
      {
        id: "sufurias_cookware_utensils",
        name: "Cookware & Sufuria Sets",
        description: "Non-stick granite pots, pressure cookers, blenders & water dispensers",
        icon: "🥘",
        popularSearches: ["Dessini non-stick cookware set", "Aluminum heavy duty sufurias", "Electric pressure cooker", "Commercial blender 2L", "Water dispenser table top"]
      },
      {
        id: "curtains_carpets_decor",
        name: "Curtains, Carpets & Decor",
        description: "Heavy blackout curtains, Turkish living room carpets, mirrors & chandeliers",
        icon: "🪟",
        popularSearches: ["Heavy blackout curtain fabric", "Turkish shaggy carpet 5x8", "Full length gold wall mirror", "Modern LED chandelier", "Sheer curtains wholesale"]
      }
    ]
  },
  {
    id: "hardware_building_electricals",
    name: "Hardware, Building & Electricals",
    shortName: "Hardware & Building",
    icon: "🧱",
    tagline: "Cement, TMT Steel, Iron Sheets, Timber, Water Tanks, Solar & Tiles",
    subcategories: [
      {
        id: "cement_steel_masonry",
        name: "Cement, Steel & Masonry",
        description: "Simba/Bamburi Cement 50kg, Deformed Steel Bars Y10-Y16 & BRC Mesh",
        icon: "🏗️",
        popularSearches: ["Simba cement 50kg price", "TMT steel bars Y12 Y16", "BRC mesh A142 price", "Machine cut stones Juja", "Binding wire roll"]
      },
      {
        id: "roofing_timber_boards",
        name: "Iron Sheets, Timber & Plywood",
        description: "Box profile & versatile iron sheets, cypress roofing timber & marine plywood",
        icon: "🪵",
        popularSearches: ["Box profile gauge 30 price Kenya", "Versatile roofing sheets", "Cypress roofing timber 2x2 2x3", "Marine plywood 18mm", "MDF boards Gikomba"]
      },
      {
        id: "plumbing_pipes_tanks",
        name: "PPR/PVC Pipes & Water Tanks",
        description: "1000L-10,000L plastic water tanks, PPR hot water pipes, booster pumps & taps",
        icon: "🚰",
        popularSearches: ["Roto water tank 5000L price", "Water booster pump apartment", "PPR pipe fittings PN20", "Submersible pump borehole", "Stainless steel kitchen sink"]
      },
      {
        id: "paints_coatings_gypsum",
        name: "Paints, Gypsum & Ceilings",
        description: "Crown / DuraCoat interior paints, gypsum boards, channel studs & cornices",
        icon: "🎨",
        popularSearches: ["Crown Ruff N Tuff paint 20L", "Gypsum board 9mm 12mm price", "Undercoat white paint 20L", "Gypsum cornices design", "Wall filler putty"]
      },
      {
        id: "electrical_wiring_solar",
        name: "Wiring, Solar & Inverters",
        description: "Single-core copper wiring, consumer units, solar panels, inverters & batteries",
        icon: "⚡",
        popularSearches: ["East African Cables 1.5mm 2.5mm", "Solar hybrid inverter 5kVA", "Lithium battery 48V Kenya", "Circuit breakers distribution board", "Solar flood light 300W"]
      },
      {
        id: "tiles_flooring_cabro",
        name: "Floor Tiles, Wall Tiles & Cabro",
        description: "Polished porcelain floor tiles, bathroom ceramic tiles, tile adhesive & cabro paving",
        icon: "🧱",
        popularSearches: ["Porcelain floor tiles 60x60 price", "Bathroom wall tiles", "Tile adhesive cement 25kg", "Heavy duty cabro blocks", "Granite floor slabs"]
      }
    ]
  },
  {
    id: "fashion_clothes_shoes",
    name: "Fashion, Clothes & Footwear",
    shortName: "Fashion & Wear",
    icon: "👟",
    tagline: "Men's Official Suits, Sneakers, Women's Dresses, Kids Wear & Leather Bags",
    subcategories: [
      {
        id: "mens_clothing",
        name: "Men's Clothing",
        description: "Official suits, blazers, cotton shirts, khaki trousers, jeans & casual jackets",
        icon: "👔",
        popularSearches: ["Men official suit Nairobi CBD", "Cotton polo t-shirts", "Slim fit khaki trousers", "Denim jeans men", "Bomber jackets Nairobi"]
      },
      {
        id: "mens_shoes",
        name: "Men's Shoes & Boots",
        description: "Genuine leather official shoes, casual sneakers, loafers, safari boots & sandals",
        icon: "👞",
        popularSearches: ["Clarks official leather shoes", "Nike Air Jordan sneakers", "Casual loafers men", "Safari boots genuine leather", "Leather sandals"]
      },
      {
        id: "womens_clothing",
        name: "Women's Clothing",
        description: "Official trouser suits, elegant dresses, tops, blouses, jeans & evening wear",
        icon: "👗",
        popularSearches: ["Official trouser suit ladies", "Maxi dresses Nairobi", "High waist denim jeans", "Chiffon tops blouses", "Warm cardigans trench coats"]
      },
      {
        id: "womens_shoes",
        name: "Women's Shoes & Heels",
        description: "Comfortable block heels, flat pumps, white sneakers, ankle boots & slides",
        icon: "👠",
        popularSearches: ["Block heels office wear", "Comfortable flat shoes ladies", "White sneakers women", "Ankle boots leather", "Platform slides sandals"]
      },
      {
        id: "kids_baby_clothing",
        name: "Kids & Baby Clothing",
        description: "Baby shawls, rompers, boys & girls outfits, school shoes & uniforms",
        icon: "👶",
        popularSearches: ["Newborn baby gift set Kenya", "Girls birthday party dress", "Boys denim jackets", "Toughees school shoes", "Kids warm pyjamas"]
      },
      {
        id: "bags_luggage_accessories",
        name: "Bags, Luggage & Accessories",
        description: "Ladies handbags, travel suitcases, laptop backpacks, leather belts & watches",
        icon: "👜",
        popularSearches: ["Tote handbag ladies", "Luggage suitcase 3-piece set", "Waterproof laptop backpack", "Men leather wallet and belt", "Casio wristwatch"]
      }
    ]
  },
  {
    id: "vehicles_auto_spares",
    name: "Vehicles, Auto Spares & Motorbikes",
    shortName: "Auto Spares",
    icon: "🚗",
    tagline: "Car Engine Oils, Tyres, Batteries, Android Screens & Boda Boda Spares",
    subcategories: [
      {
        id: "engine_service_parts",
        name: "Engine Oils & Service Parts",
        description: "Engine oil (Total, Shell, Castrol), oil/air/fuel filters, spark plugs & brake pads",
        icon: "🛢️",
        popularSearches: ["Total Quartz 5W30 engine oil", "Brembo brake pads Toyota Fielder", "Genuine oil filters Toyota", "NGK spark plugs", "KYB shock absorbers Nairobi"]
      },
      {
        id: "car_tyres_rims_batteries",
        name: "Tyres, Rims & Batteries",
        description: "Car tyres (Maxxis, Dunlop, Yokohama), alloy wheel rims & maintenance-free batteries",
        icon: "🛞",
        popularSearches: ["Tyre 195/65R15 price Nairobi", "Alloy rims 16 inch 5-hole", "Chloride Exide maintenance free battery", "Car tyre puncture repair kit", "Tubeless valve stems"]
      },
      {
        id: "car_electronics_interior",
        name: "Car Android Screens & Audio",
        description: "Android touch screens, reverse cameras, subwoofers, seat covers & 7D floor mats",
        icon: "📻",
        popularSearches: ["Car Android screen 9 inch with GPS", "Reverse camera full HD", "Leather car seat covers custom", "7D floor mats Toyota Harrier", "Car dash camera dual lens"]
      },
      {
        id: "boda_boda_motorcycle_spares",
        name: "Boda Boda & Bike Spares",
        description: "Boxer BM150, TVS King & Dayun motorcycle spares, tyres, helmets & chains",
        icon: "🏍️",
        popularSearches: ["Boxer BM150 cylinder piston kit", "Motorcycle tyre 3.00-17", "DOT certified motorbike helmet", "Heavy duty drive chain sprocket", "Boda boda side mirrors"]
      },
      {
        id: "trucks_canters_heavy_commercial",
        name: "Canters & Commercial Trucks",
        description: "Isuzu NPR, Mitsubishi Canter spare parts, heavy duty leaf springs & commercial tyres",
        icon: "🚚",
        popularSearches: ["Isuzu NPR 4HF1 clutch plate", "Canter leaf springs heavy duty", "Commercial truck battery 120Ah", "Canter brake shoes Nairobi"]
      }
    ]
  },
  {
    id: "farm_agriculture_agrovet",
    name: "Farm, Agriculture & Agrovet",
    shortName: "Farm & Agri",
    icon: "🌾",
    tagline: "Certified Seeds, Fertilizers, Dairy Feeds, Drip Irrigation & Chaff Cutters",
    subcategories: [
      {
        id: "certified_seeds_fertilizers",
        name: "Seeds, Fertilizers & Agrochemicals",
        description: "Certified maize/bean seeds, DAP, CAN, NPK fertilizers, herbicides & pesticides",
        icon: "🌱",
        popularSearches: ["Certified hybrid maize seed Kenya", "DAP fertilizer 50kg price", "CAN fertilizer top dressing", "Roundup weed herbicide", "Fungicide for tomatoes"]
      },
      {
        id: "animal_feeds_supplements",
        name: "Animal Feeds & Salt Licks",
        description: "High-yield dairy meal, poultry layers/broilers mash, pig feeds & mineral salts",
        icon: "🐄",
        popularSearches: ["Dairy meal 50kg high yield Nakuru", "Kienyeji poultry feed mash", "Mineral salt block cows", "Layers mash 50kg price", "Dog food 20kg wholesale"]
      },
      {
        id: "irrigation_pumps_pipes",
        name: "Irrigation Kits & Pumps",
        description: "Drip irrigation kits, drip lines, petrol water pumps & borehole solar pumps",
        icon: "💧",
        popularSearches: ["Drip irrigation 1-acre kit price Kenya", "Drip lines 16mm button drippers", "Petrol water pump 3 inch", "Solar borehole water pump", "Knapsack sprayer 16L"]
      },
      {
        id: "farm_machinery_tools",
        name: "Chaff Cutters & Farm Tools",
        description: "Silage chaff cutters, posho mill machines, egg incubators, wheelbarrows & pangas",
        icon: "🚜",
        popularSearches: ["Electric motor chaff cutter 3HP", "Automatic egg incubator 500 eggs", "Heavy duty construction wheelbarrow", "Crocodile panga Kenya", "Milking machine portable"]
      },
      {
        id: "greenhouse_veterinary_supplies",
        name: "Greenhouse & Vet Supplies",
        description: "Dam liners for water ponds, shade nets, greenhouse polythene, dewormers & vet drugs",
        icon: "🛖",
        popularSearches: ["Dam liner 0.5mm 1mm price per sqm", "Shade net 75% agricultural", "Greenhouse polythene UV treated", "Livestock dewormer albendazole", "Tick spray acaricide"]
      }
    ]
  },
  {
    id: "health_beauty_personal_care",
    name: "Health, Beauty & Personal Care",
    shortName: "Beauty & Health",
    icon: "💄",
    tagline: "Skincare, Serums, Human Hair Wigs, Perfumes & Blood Pressure Monitors",
    subcategories: [
      {
        id: "skincare_sunscreen",
        name: "Skincare & Sunscreen",
        description: "Gentle facial cleansers, Vitamin C serums, daily moisturizers & SPF 50 sunscreens",
        icon: "🧴",
        popularSearches: ["SPF 50 mineral sunscreen Kenya", "Vitamin C brightening serum", "CeraVe hydrating cleanser", "Raw shea butter wholesale", "Acne treatment salicylic acid"]
      },
      {
        id: "hair_care_styling_wigs",
        name: "Hair Care, Wigs & Braids",
        description: "100% human hair wigs, French curls braids, hair growth oils & professional clippers",
        icon: "💇",
        popularSearches: ["Human hair bone straight wig", "French curl braids colors", "Chebe hair growth butter oil", "Kemei cordless hair clipper", "Blow dryer professional 2200W"]
      },
      {
        id: "perfumes_colognes_deodorants",
        name: "Perfumes, Colognes & Mists",
        description: "Original designer perfumes, long-lasting perfume oils & fresh body mists",
        icon: "✨",
        popularSearches: ["Lattafa Yara perfume Nairobi", "Original designer colognes men", "Pure undiluted perfume oils", "Victoria Secret body mist", "Antiperspirant roll on"]
      },
      {
        id: "oral_personal_hygiene",
        name: "Oral & Personal Hygiene",
        description: "Electric toothbrushes, teeth whitening charcoal, sanitary pads & shaving kits",
        icon: "🪥",
        popularSearches: ["Sonic electric toothbrush", "Teeth whitening powder kit", "Heavy flow sanitary pads", "Safety double edge razor", "Beard oil and wash set"]
      },
      {
        id: "health_monitors_supplements",
        name: "Health Monitors & Supplements",
        description: "Digital blood pressure monitors, glucometers, multivitamins & gym whey protein",
        icon: "🩺",
        popularSearches: ["Omron digital blood pressure monitor", "Accu-Chek blood sugar test strips", "Whey protein powder 5lbs", "Cod liver oil capsules", "First aid emergency kit box"]
      }
    ]
  },
  {
    id: "supermarket_food_gas",
    name: "Supermarket, Foodstuffs & Cooking Gas",
    shortName: "Supermarket & Food",
    icon: "🛒",
    tagline: "Cooking Gas Refills, Grains, Cereals, Vegetable Oils & Laundry Detergents",
    subcategories: [
      {
        id: "cereals_grains_flours",
        name: "Cereals, Grains & Flours",
        description: "Grade 1 Maize flour (Unga ya Ugali), Pishori rice, wheat flour, ndengu & beans",
        icon: "🌾",
        popularSearches: ["Hostess / Pembe unga ya ugali 2kg", "Pure Mwea Pishori rice 25kg", "Baking wheat flour 2kg", "Polished yellow beans 50kg", "Green grams ndengu wholesale"]
      },
      {
        id: "cooking_gas_cylinders_refill",
        name: "Cooking Gas (LPG) & Refills",
        description: "6kg & 13kg gas cylinders, doorstep refills (K-Gas, Total, Rubis, Afrigas) & regulators",
        icon: "🔥",
        popularSearches: ["13kg gas refill doorstep delivery", "6kg gas cylinder with burner grill", "Low pressure gas regulator pipe", "Total gas refill Nairobi", "EPRA verified gas station"]
      },
      {
        id: "cooking_oils_spices_tea",
        name: "Cooking Oils, Spices & Tea",
        description: "Refined vegetable cooking oils, pure Kenyan tea leaves, coffee, sugar & spices",
        icon: "🧂",
        popularSearches: ["Salit / Fresh Fri cooking oil 10L", "Kericho Gold tea leaves 500g", "Pure cane sugar 50kg bag", "Royco mchuzi mix wholesale", "Sea salt iodine 1kg"]
      },
      {
        id: "drinking_water_beverages",
        name: "Drinking Water & Drinks",
        description: "20-litre water dispenser refills, bottled mineral water packs, juices & fresh milk",
        icon: "🚰",
        popularSearches: ["20L water dispenser refill exchange", "Bottled water 500ml pack of 24", "Del Monte juice 1L", "Long life UHT milk cartoon", "Soda 300ml crate"]
      },
      {
        id: "cleaning_detergents_soaps",
        name: "Detergents & Cleaning Soaps",
        description: "Washing powder, multipurpose liquid detergent, bar soaps, bleach & toilet paper",
        icon: "🧼",
        popularSearches: ["Ariel / Omo washing powder 3.5kg", "Multipurpose liquid soap 5L", "Jik regular bleach 750ml", "Toilet tissue paper 10-pack", "Steelwool dish washing soap"]
      }
    ]
  },
  {
    id: "office_stationery_books",
    name: "Office, Stationery & School Books",
    shortName: "Office & School",
    icon: "📚",
    tagline: "Printing Paper Reams, School Books, Calculators, Thermal POS Rolls & Safes",
    subcategories: [
      {
        id: "printing_paper_thermal_rolls",
        name: "Printing Paper & POS Rolls",
        description: "A4 printing paper reams (Chamex, Double A), thermal receipt rolls & invoice books",
        icon: "📄",
        popularSearches: ["Chamex A4 paper 80gsm box 5 reams", "Thermal receipt paper 80x80mm", "Self carbonated invoice book 2-ply", "Brown Manila folders pack", "Sticky notes colored"]
      },
      {
        id: "school_books_stationery",
        name: "School Books & Stationery",
        description: "Exercise books, mathematical sets, ballpoint pens, highlighters & calculators",
        icon: "✏️",
        popularSearches: ["Oxford mathematical set original", "Casio fx-82MS scientific calculator", "Bic ballpoint pens box of 50", "Kasuku exercise books A4 200 pages", "Geometry compass set"]
      },
      {
        id: "office_equipment_safes",
        name: "Office Equipment & Safes",
        description: "Money counting machines, electronic cash safes, laminators, shredders & whiteboards",
        icon: "🗄️",
        popularSearches: ["Banknote currency counter with fake detector", "Digital electronic safe box office", "A3 laminating machine heavy duty", "Paper shredder cross cut", "Magnetic whiteboard 4x3ft"]
      }
    ]
  }
];

