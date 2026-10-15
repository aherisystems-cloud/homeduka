import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  HOME_ROOMS, 
  SAMPLE_KENYAN_HOME_PRODUCTS, 
  SAMPLE_KENYAN_HOME_SERVICES, 
  SAMPLE_KENYAN_HOME_LISTINGS 
} from '../../../data/mock_listings';
import ProductCard from '../../../components/ProductCard';
import ServiceCard from '../../../components/ServiceCard';
import { 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  HelpCircle, 
  FileText,
  DollarSign
} from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return HOME_ROOMS.map((room) => ({
    slug: room.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = HOME_ROOMS.find((r) => r.id === slug);

  if (!room) {
    return {
      title: 'Room Not Found | HomeDuka Kenya',
    };
  }

  const title = `${room.title} Furniture & Fittings in Kenya | Prices, Shops & Fundis`;
  const description = `Shop verified ${room.title.toLowerCase()} furniture, custom fittings, and fundis in Kenya. Direct yard prices from Ngong Road, Kamakis & Gikomba. Pay on delivery.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://homeduka.co.ke/room/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://homeduka.co.ke/room/${slug}`,
      siteName: 'HomeDuka Kenya',
      locale: 'en_KE',
      type: 'website',
      images: [
        {
          url: room.bannerImage,
          width: 1200,
          height: 630,
          alt: `${room.title} Furniture Kenya`,
        },
      ],
    },
  };
}

// Room-specific expert FAQs for SEO, AIEO & Google rich snippets
const ROOM_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  living_room: [
    {
      question: "How much does a good 7-seater sofa set cost in Kenya?",
      answer: "A quality 7-seater fabric or velvet sofa handcrafted with seasoned hardwood (Mahogany or Mvule) ranges between Ksh 45,000 and Ksh 75,000 when bought directly from trusted yards along Ngong Road or Kamakis. High-density foam (HD 32 or 36) ensures the cushions stay firm for 5+ years without sinking."
    },
    {
      question: "What wood is best for living room coffee tables and TV units in Nairobi?",
      answer: "Kiln-dried Kenyan Mahogany and Mvule are top choices for solid timber. They withstand humidity changes and resist wood borers. For modern floating TV walls, marine plywood with scratch-resistant Egger boards or high-gloss laminates is recommended."
    },
    {
      question: "How are large sofas and TV units delivered to estates across Kenya?",
      answer: "Heavy sofas are delivered via Canters or flatbed pickups with cardboard corner guards and plastic shrink wrap. Smaller items like coffee tables or lighting can arrive via Boda Boda riders or Pickup Mtaani. Countrywide delivery to towns like Mombasa, Nakuru, and Eldoret is handled via trusted parcel logistics."
    }
  ],
  bedroom: [
    {
      question: "What is the fair price of a 6x6 mahogany storage bed in Kenya?",
      answer: "A solid 6x6 (King Size) hardwood bed with hydraulic lift storage or underbed drawers costs between Ksh 38,000 and Ksh 55,000. Beware of roadside beds made with unseasoned wet Cypress that squeaks or splits within 6 months."
    },
    {
      question: "How do fitted bedroom wardrobes work in rented vs owned homes?",
      answer: "In Kenya, modular wardrobes can be built as freestanding units that can be disassembled when moving, or as floor-to-ceiling fitted wardrobes using German Blum soft-close hinges. Average cost is Ksh 12,000 to Ksh 18,000 per linear foot."
    },
    {
      question: "Can I inspect the bed before paying the final balance?",
      answer: "Yes! Verified sellers on HomeDuka allow pay-on-delivery or require only a modest carpentry deposit (usually 30%). You inspect the joinery, drawer runners, and finish at your gate before paying the remaining balance."
    }
  ],
  kitchen_dining: [
    {
      question: "What is the difference between custom kitchen cabinets and ready-made units?",
      answer: "Custom kitchen cabinets use water-resistant marine plywood or MDF with granite or quartz countertops tailored to your exact kitchen dimensions. Ready-made units are cheaper but often use standard particle board that swells when exposed to sink water leaks."
    },
    {
      question: "What is the fair price for a 6-seater solid wood dining table in Nairobi?",
      answer: "A 6-seater solid mahogany or bluegum dining table with 6 padded chairs ranges from Ksh 35,000 to Ksh 52,000 directly from verified makers. Glass-top alternatives range from Ksh 30,000 to Ksh 48,000."
    },
    {
      question: "How can cookware sets and blenders be delivered fast in Nairobi?",
      answer: "Cookware sets (such as 12-piece granite sufurias) and blenders can be delivered within 1 to 2 hours via Boda Boda rider or next-day collection via Pickup Mtaani for as little as Ksh 100 to Ksh 250."
    }
  ],
  bathroom: [
    {
      question: "Which water booster pump is best for low water pressure in Kenyan estates?",
      answer: "For low water pressure in apartments or bungalows, a 0.5HP to 1.0HP automatic pressure booster pump with an electronic flow controller (e.g., Davis & Shirtliff Dayliff or Pedrollo) costs between Ksh 12,000 and Ksh 24,000."
    },
    {
      question: "How often should an overhead domestic water tank be washed?",
      answer: "Health guidelines recommend cleaning and disinfecting domestic water tanks every 3 months to prevent silt buildup, algae, and bacterial growth. Verified tank cleaners charge Ksh 2,500 to Ksh 4,500 per tank."
    },
    {
      question: "Are solar water heaters worth it in Kenya?",
      answer: "Yes. With Kenya Power token rates, a 200L or 300L pressurized solar water heater reduces monthly electricity bills by 40% to 60%, paying for itself within 18 to 24 months."
    }
  ],
  outdoor_compound: [
    {
      question: "How much does cabro paving cost per square meter in Kenya?",
      answer: "Heavy-duty 60mm to 80mm cabro paving blocks cost approximately Ksh 850 to Ksh 1,200 per square meter, with expert fundi installation (grading, sand bedding, edge compaction) costing an additional Ksh 350 to Ksh 500 per square meter."
    },
    {
      question: "What metal gauge is recommended for perimeter gates in Kenya?",
      answer: "Security perimeter gates should use heavy gauge square tubes (Gauge 14 or 16) with anti-rust red oxide primer and weather-resistant polyurethane enamel. Avoid thin Gauge 18 which bends easily."
    },
    {
      question: "Can outdoor garden furniture withstand Nairobi sun and rain?",
      answer: "Yes, when crafted with treated Teak, seasoned Cedar, or powder-coated wrought iron with UV-resistant all-weather cushions."
    }
  ],
  home_office: [
    {
      question: "What is the best ergonomic study desk size for an apartment study?",
      answer: "A 4ft x 2ft (120cm x 60cm) hardwood desk with built-in cable management and side drawers fits neatly in study nooks and bedrooms. Custom solid wood desks cost Ksh 14,000 to Ksh 26,000."
    },
    {
      question: "How to choose a reliable work-from-home ergonomic mesh chair?",
      answer: "Look for high-density foam seats, adjustable lumbar support, 3D armrests, and Class-4 hydraulic gas lifts certified for 8+ hours of daily sitting."
    },
    {
      question: "Can home office furniture be delivered countrywide?",
      answer: "Yes! Desks and study chairs are flat-packed or pre-assembled and shipped via courier or matatu parcel to any town in Kenya within 24 to 48 hours."
    }
  ]
};

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = HOME_ROOMS.find((r) => r.id === slug);

  if (!room) {
    notFound();
  }

  // Filter products and services for this room
  const products = SAMPLE_KENYAN_HOME_PRODUCTS.filter((p) => p.room === slug);
  const services = SAMPLE_KENYAN_HOME_SERVICES.filter((s) => s.room === slug);
  const faqs = ROOM_FAQS[slug] || [];

  // Structured Data (JSON-LD) for SEO, AIEO & Local GEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${room.title} Furniture & Fittings in Kenya`,
    description: room.tagline,
    url: `https://homeduka.co.ke/room/${slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'HomeDuka Kenya',
      url: 'https://homeduka.co.ke',
    },
    about: {
      '@type': 'Thing',
      name: `${room.title} in Kenyan Homes`,
    },
    hasPart: products.map((p) => ({
      '@type': 'Product',
      name: p.title,
      description: p.description,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'KES',
        price: p.pricing.discount_price_kes || p.pricing.regular_price_kes,
        availability: p.specifications.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      },
    })),
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://homeduka.co.ke',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop by Room',
        item: 'https://homeduka.co.ke/rooms',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: room.title,
        item: `https://homeduka.co.ke/room/${slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <div className="border-b border-stone-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/rooms" className="hover:text-stone-900 transition">Shop by Room</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-bold">{room.title}</span>
        </div>
      </div>

      {/* Hero Banner for this Room */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={room.bannerImage}
            alt={`${room.title} banner`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-12 sm:py-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold backdrop-blur">
            <span className="text-lg">{room.icon}</span>
            <span>Dedicated Room Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl">
            {room.title} in Kenya
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            {room.tagline}. Discover verified local furniture shops, timber yards, and skilled fundis who deliver across Nairobi, Mombasa, Nakuru, Eldoret, Kisumu, and countrywide.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-stone-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800/80 rounded-full border border-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Local Makers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800/80 rounded-full border border-stone-700">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              Boda • Pickup Mtaani • Matatu • Lorry
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800/80 rounded-full border border-stone-700">
              <Scale className="w-3.5 h-3.5 text-[#B45309]" />
              Pay on Delivery Available
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 pt-10 space-y-16">
        {/* AIEO Answer Box: Key Buying Facts for this Room */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-extrabold text-base sm:text-lg">
            <Sparkles className="w-5 h-5 text-[#B45309]" />
            <span>Buyer's Price & Quality Guide for {room.title} in Kenya</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
            <div>
              <strong className="text-stone-900 font-bold block mb-1">
                💰 Price Ranges:
              </strong>
              <span>
                Standard pieces range from direct yard rates up to showroom finishes. Buying directly from makers along Ngong Road, Kamakis, and Gikomba saves 30% to 45%.
              </span>
            </div>
            <div>
              <strong className="text-stone-900 font-bold block mb-1">
                🪵 Recommended Materials:
              </strong>
              <span>
                Seasoned Kenyan Mahogany, Mvule, or Bluegum hardwood. High-density foam (HD 32/36) and stain-resistant velvet or linen fabrics.
              </span>
            </div>
            <div>
              <strong className="text-stone-900 font-bold block mb-1">
                🚚 Delivery & Inspection:
              </strong>
              <span>
                Always inspect the joinery and finish at your gate or Pickup Mtaani counter before releasing payment. Use our <Link href="/delivery-check" className="text-[#B45309] font-bold underline">Gate Delivery Checklist</Link>.
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Products in this Room (Expansive 4-Column Catalog Shelf) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Direct From Verified Shops & Yards
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {room.title} Products & Furniture
              </h2>
            </div>
            <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
              {products.length} Items Available
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-3">
              <span className="text-3xl">📦</span>
              <h3 className="font-bold text-stone-800 text-base">New Products Being Added Daily</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Verified carpenters and suppliers are updating their catalog for {room.title}. You can generate a custom quotation directly on WhatsApp.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
              >
                <span>Hire a Custom Fundi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </section>

        {/* Section 2: Related Fundis & Services */}
        {services.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Installation & Repairs
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Verified Fundis for {room.title}
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-[#B45309] hover:underline flex items-center gap-1"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Delivery Options Callout */}
        <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base sm:text-lg">
            <Truck className="w-5 h-5 text-emerald-700" />
            <span>How {room.title} Items Are Delivered Across Kenya</span>
          </div>

          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-3xl">
            Sellers on HomeDuka support all common Kenyan transport modes. Small home items travel via <strong>Pickup Mtaani</strong> (Ksh 100–250) or <strong>Boda Boda</strong> (Ksh 200–500). Heavy beds and dining tables travel via <strong>Canters & Lorries</strong> or <strong>Matatu Stage Drops</strong> along Nairobi commuter corridors.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/delivery-check"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Read Gate Inspection Guide</span>
            </Link>
            <Link
              href="/verify-till"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold text-xs transition"
            >
              <span>Verify Seller M-Pesa Till / Paybill</span>
            </Link>
          </div>
        </div>

        {/* Section 4: Room Specific FAQs for SEO & AIEO (Spacious 2-Column Grid) */}
        {faqs.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-stone-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Frequently Asked Questions about {room.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
