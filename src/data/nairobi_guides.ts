export interface FairPriceItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Kitchen & Storage' | 'Fundis & Repairs' | 'Building Materials';
  icon: string;
  fairPrice: string;
  unit: string;
  goodQuality: string;
  warningNote: string;
  searchTag: string;
}

export interface ShoppingStreetCluster {
  id: string;
  name: string;
  road: string;
  icon: string;
  specialty: string;
  whyGoHere: string;
  typicalSavings: string;
  landmark: string;
  topItems: string[];
  shopCount: number;
  countrywideDeliveryNote: string;
}

// Backwards-compatible alias
export type WorkshopCluster = ShoppingStreetCluster;

export const NAIROBI_FAIR_PRICES: FairPriceItem[] = [
  {
    id: 'bed-6x6-mahogany',
    name: '6x6 Solid Wood Bed',
    category: 'Furniture',
    icon: '🛏️',
    fairPrice: 'Ksh 45,000 – 65,000',
    unit: 'Per Bed (Solid Mahogany or Mvule)',
    goodQuality: 'Heavy hardwood frame. Heavy slats. Does not shake or make noise when you sleep.',
    warningNote: 'Cheap beds under Ksh 20,000 use soft pine wood or thin chipboard. They bend and break within 6 months.',
    searchTag: 'bed'
  },
  {
    id: 'sofa-7-seater',
    name: '7-Seater Living Room Sofa Set',
    category: 'Furniture',
    icon: '🛋️',
    fairPrice: 'Ksh 55,000 – 90,000',
    unit: 'Complete Set (3 + 2 + 1 + 1 or L-Shape)',
    goodQuality: 'High-density foam (Grade 30 or higher). Hardwood internal frame. Strong fabric that wipes clean.',
    warningNote: 'Cheap sofas under Ksh 30,000 use soft packing foam. They sink flat like pancakes in 3 months.',
    searchTag: 'sofa'
  },
  {
    id: 'dining-6-seater',
    name: '6-Seater Hardwood Dining Table',
    category: 'Furniture',
    icon: '🍽️',
    fairPrice: 'Ksh 40,000 – 70,000',
    unit: 'Table with 6 Chairs',
    goodQuality: 'Thick solid wood top. Mortise joints. Smooth clear varnish that resists hot plates and water stains.',
    warningNote: 'Cheap tables use thin veneer that peels off when water spills on it.',
    searchTag: 'dining'
  },
  {
    id: 'fitted-kitchen-cabinets',
    name: 'Fitted Kitchen Cabinets',
    category: 'Kitchen & Storage',
    icon: '🍳',
    fairPrice: 'Ksh 12,000 – 18,000',
    unit: 'Per Running Meter',
    goodQuality: 'Marine board or moisture-resistant MDF. Soft-close hinges that do not bang loudly.',
    warningNote: 'Cheap standard MDF swells up and rots when water splashes near the kitchen sink.',
    searchTag: 'kitchen'
  },
  {
    id: 'sliding-wardrobe',
    name: '3-Door Sliding Wardrobe',
    category: 'Kitchen & Storage',
    icon: '🚪',
    fairPrice: 'Ksh 35,000 – 60,000',
    unit: 'Complete Wardrobe',
    goodQuality: 'Heavy aluminum track rails. Smooth rollers. Hanging rail does not bend under heavy jackets.',
    warningNote: 'Cheap plastic rollers jam and jump off the track after a few weeks.',
    searchTag: 'wardrobe'
  },
  {
    id: 'plumber-repair',
    name: 'Plumber Tap or Pipe Repair',
    category: 'Fundis & Repairs',
    icon: '🔧',
    fairPrice: 'Ksh 1,500 – 3,500',
    unit: 'Labor only (per job)',
    goodQuality: 'Carries test tools. Replaces bad washers. Tests water pressure before leaving your home.',
    warningNote: 'Always buy your own replacement valves (PPR or brass) so you know they are genuine.',
    searchTag: 'plumber'
  },
  {
    id: 'house-painting',
    name: 'Painting 2-Bedroom Apartment',
    category: 'Fundis & Repairs',
    icon: '🎨',
    fairPrice: 'Ksh 8,000 – 15,000',
    unit: 'Labor only (Interior walls & ceiling)',
    goodQuality: 'Fills holes with filler first. Sands walls smooth. Applies 2 full coats with clean tape edges.',
    warningNote: 'Rushed painters skip sandpapering. Paint will peel off like tape after 2 months.',
    searchTag: 'painter'
  },
  {
    id: 'electrician-socket-lights',
    name: 'Electrician (Wiring & Sockets)',
    category: 'Fundis & Repairs',
    icon: '⚡',
    fairPrice: 'Ksh 1,500 – 4,000',
    unit: 'Labor only (per circuit or room)',
    goodQuality: 'Uses insulated tester tools. Checks earthing. Labels breakers in your power box.',
    warningNote: 'Never hire someone without an insulated voltage tester. Faulty wiring causes house fires.',
    searchTag: 'electrician'
  },
  {
    id: 'timber-cypress-plank',
    name: 'Cypress Building Timber (6x2)',
    category: 'Building Materials',
    icon: '🪵',
    fairPrice: 'Ksh 50 – 75',
    unit: 'Per Running Foot',
    goodQuality: 'Straight grain. Air-dried so it does not bend after roofing.',
    warningNote: 'Wet fresh green timber will twist and bend your roof trusses when the sun comes out.',
    searchTag: 'timber'
  }
];

export const NAIROBI_SHOPPING_CLUSTERS: ShoppingStreetCluster[] = [
  {
    id: 'ngong-road',
    name: 'Ngong Road & Dagoretti Corner',
    road: 'Ngong Road, Nairobi',
    icon: '🌳',
    specialty: 'Real Hardwood Beds & Outdoor Furniture',
    whyGoHere: 'The biggest roadside strip of master carpenters and furniture shops. See hundreds of finished beds and tables displayed right along the road.',
    typicalSavings: 'Save 25% – 35% compared to big mall furniture stores.',
    landmark: 'Between Adams Arcade and Dagoretti Corner',
    topItems: ['Mahogany Beds', 'Patio Outdoor Sets', 'Coffee Tables', 'Pallet Seats'],
    shopCount: 142,
    countrywideDeliveryNote: 'Daily parcel and lorry delivery to Mombasa, Kisumu, Nakuru, Eldoret & countrywide.'
  },
  {
    id: 'mombasa-road',
    name: 'Mombasa Road & Industrial Area',
    road: 'Mombasa Road & Enterprise Road',
    icon: '🏭',
    specialty: 'Modern Kitchens, Sliding Wardrobes & Tiles',
    whyGoHere: 'Large manufacturing yards and showrooms with modern cutting machines. Best for fitted kitchens, quartz worktops, and sliding wardrobes.',
    typicalSavings: 'Direct factory pricing with clean machine-cut edges.',
    landmark: 'Near City Cabanas and Enterprise Road junction',
    topItems: ['Fitted Kitchens', 'Sliding Wardrobes', 'Granite Worktops', 'Wall Tiles'],
    shopCount: 88,
    countrywideDeliveryNote: 'Heavy truck dispatch to all 47 counties in Kenya.'
  },
  {
    id: 'gikomba-kamukunji',
    name: 'Gikomba & Kamukunji Timber Yards',
    road: 'Quarry Road & Landhies Road',
    icon: '🪵',
    specialty: 'Raw Hardwood Planks & Strong Steel Gates',
    whyGoHere: 'Wholesale timber and metal yard central. Buy raw mahogany, cypress, and camphor planks directly by the foot from the yards.',
    typicalSavings: 'Cheapest wholesale timber prices in East Africa.',
    landmark: 'Near Machakos Country Bus & Quarry Road',
    topItems: ['Roofing Timber', 'Hardwood Planks', 'Steel Compound Gates', 'Metal Doors'],
    shopCount: 210,
    countrywideDeliveryNote: 'Direct timber lorry transport to any site across Kenya.'
  },
  {
    id: 'ruiru-eastern-bypass',
    name: 'Ruiru & Eastern Bypass Furniture Hub',
    road: 'Eastern Bypass, Ruiru',
    icon: '🛣️',
    specialty: 'Fast Custom Carpentry & Affordable Sofas',
    whyGoHere: 'Rapidly growing furniture and carpentry shops. Great parking, fast delivery, and very friendly prices for new homeowners.',
    typicalSavings: 'Save 30% on sofas and wardrobes with quick 3-day delivery.',
    landmark: 'Along Eastern Bypass near Kamakis & Ruiru toll station',
    topItems: ['L-Shape Sofas', 'TV Wall Units', 'Storage Beds', 'Shoe Racks'],
    shopCount: 95,
    countrywideDeliveryNote: 'Quick dispatch along Thika Road, Kenol, Nyeri, Meru and countrywide.'
  },
  {
    id: 'jogoo-road',
    name: 'Jogoo Road & Eastlands Upholstery Hub',
    road: 'Jogoo Road, Eastlands',
    icon: '🛋️',
    specialty: 'Chesterfield Sofas & Dining Chairs',
    whyGoHere: 'Famous for fabric masters and upholstery shops. Choose your exact velvet or leather fabric and watch them cushion your sofa.',
    typicalSavings: 'Save 40% on sofa upholstery and custom cushion refills.',
    landmark: 'Between City Stadium and Makadara',
    topItems: ['Chesterfield Sofas', 'Dining Chair Re-covering', 'Bed Headboards', 'Floor Cushions'],
    shopCount: 114,
    countrywideDeliveryNote: 'Wrapped in waterproof plastic and sent via countrywide parcel matatus & lorries.'
  }
];

// Backwards-compatible export
export const NAIROBI_WORKSHOP_CLUSTERS = NAIROBI_SHOPPING_CLUSTERS;
