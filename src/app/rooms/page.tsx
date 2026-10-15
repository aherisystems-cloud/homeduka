import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HOME_ROOMS, SAMPLE_KENYAN_HOME_PRODUCTS, SAMPLE_KENYAN_HOME_SERVICES } from '../../data/mock_listings';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  HelpCircle 
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Shop by Room & Space in Kenya | Living Room, Bedroom, Kitchen & Compound",
  description: "Browse verified Kenyan furniture, cabinetry, appliances, and skilled fundis categorized by room. Direct prices from Ngong Road, Gikomba, and Kamakis shops.",
  alternates: {
    canonical: 'https://homeduka.co.ke/rooms',
  },
  openGraph: {
    title: "Shop by Room & Space in Kenya | HomeDuka",
    description: "Browse verified Kenyan furniture, cabinetry, appliances, and skilled fundis categorized by room. Direct prices and countrywide delivery.",
    url: 'https://homeduka.co.ke/rooms',
    siteName: 'HomeDuka Kenya',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RoomsDirectoryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Home Furniture & Fittings by Room in Kenya',
    description: 'Browse verified Kenyan furniture, cabinetry, appliances, and skilled fundis categorized by room.',
    url: 'https://homeduka.co.ke/rooms',
    isPartOf: {
      '@type': 'WebSite',
      name: 'HomeDuka Kenya',
      url: 'https://homeduka.co.ke',
    },
    about: {
      '@type': 'Thing',
      name: 'Home Furniture, Decor, and Home Services in Kenya',
    },
    hasPart: HOME_ROOMS.map((room) => ({
      '@type': 'WebPage',
      name: room.title,
      description: room.tagline,
      url: `https://homeduka.co.ke/room/${room.id}`,
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
    ],
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

      {/* Breadcrumb Navigation */}
      <div className="border-b border-stone-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-bold">Shop by Room</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-stone-200/80 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Complete Room Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Furnish Your Home, Room by Room
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Whether you are moving into a new apartment or upgrading your family house, browse verified items and fundis tailored to each living space in Kenya.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold text-stone-600">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-50 rounded-full border border-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Local Shops & Yards
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-50 rounded-full border border-stone-200">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              Boda • Pickup Mtaani • Lorry Delivery
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-50 rounded-full border border-stone-200">
              <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
              Countrywide Town Delivery
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HOME_ROOMS.map((room) => {
            const productCount = SAMPLE_KENYAN_HOME_PRODUCTS.filter(p => p.room === room.id).length;
            const serviceCount = SAMPLE_KENYAN_HOME_SERVICES.filter(s => s.room === room.id).length;

            return (
              <div 
                key={room.id}
                className="bg-white rounded-3xl border border-stone-200/90 hover:border-stone-400 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Room Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img 
                      src={room.bannerImage} 
                      alt={`${room.title} furniture and fittings in Kenya`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-3xl drop-shadow-md">
                      {room.icon}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-black px-2.5 py-1 rounded-full bg-stone-900/90 text-white backdrop-blur border border-white/20">
                      {productCount > 0 ? `${productCount}+ Items` : 'Featured Space'}
                    </span>
                  </div>

                  {/* Room Details */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-extrabold text-stone-900 group-hover:text-[#B45309] transition">
                      {room.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {room.tagline}
                    </p>

                    {/* Popular Items Chips */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                        Popular in Kenya:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {room.popularSearches.map((item, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation CTA */}
                <div className="p-6 pt-0 border-t border-stone-100 mt-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 py-3">
                    <span>{serviceCount > 0 ? `${serviceCount} Verified Fundis` : 'Direct Yard Rates'}</span>
                    <span className="text-emerald-700 font-semibold">Pay On Delivery</span>
                  </div>

                  <Link
                    href={`/room/${room.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition shadow-2xs group-hover:shadow-md"
                  >
                    <span>Explore {room.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* AIEO Answer Box: Quick Buying Guide for Kenya */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                How Kenyan Homeowners Furnish Each Room Smartly
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Direct insights from verified local carpenters, welders, and interior fundis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <strong className="text-stone-900 font-extrabold block text-sm">
                1. Buy Direct from Timber & Metal Yards
              </strong>
              <p>
                Shops along Ngong Road, Kamakis (Eastern Bypass), and Gikomba manufacture custom sofas, dining tables, and beds. You save 30% to 45% compared to mall showrooms because you buy direct from the makers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <strong className="text-stone-900 font-extrabold block text-sm">
                2. Test Kiln-Dried Hardwoods
              </strong>
              <p>
                In Kenya, look for seasoned Mahogany, Mvule, or Bluegum. Avoid wet Cypress or cheap untreated pine that warps or attracts wood borers during Nairobi rainy seasons.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2">
              <strong className="text-stone-900 font-extrabold block text-sm">
                3. Check Delivery Means Upfront
              </strong>
              <p>
                Small decor and stools travel safely via Boda Boda or Pickup Mtaani. Large 6x6 beds and 7-seater sofas require a Canter flatbed with corner cardboard protectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
