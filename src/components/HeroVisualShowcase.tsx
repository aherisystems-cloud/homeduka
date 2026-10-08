'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, MessageSquare, MapPin, ShieldCheck, Flame, 
  ArrowRight, CheckCircle2, UserCheck
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  type: 'product' | 'fundi' | 'cleaning' | 'deal';
  title: string;
  price: string;
  originalPrice?: string;
  badge: string;
  location: string;
  image: string;
  whatsappUrl: string;
  linkUrl: string;
  personName: string;
  personRole: string;
  personAvatar: string;
}

export default function HeroVisualShowcase() {
  const [filter, setFilter] = useState<'all' | 'products' | 'fundis' | 'deals'>('all');

  const items: ShowcaseItem[] = [
    {
      id: 'sc-1',
      type: 'deal',
      title: 'Chesterfield 7-Seater Modern Sofa Set (Kiln-Dried Mahogany)',
      price: 'KSh 55,000',
      originalPrice: 'KSh 68,000',
      badge: '🔥 Today Only • Save KSh 13k',
      location: 'Kamakis Eastern Bypass',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254712345678?text=Habari%20Francis,%20nimeona%20Chesterfield%207-Seater%20sofa%20ya%20KSh%2055,000%20kwenye%20Home%20Kenya.',
      linkUrl: '/shop/woodcraft-living-kamakis',
      personName: 'Francis Kamau',
      personRole: 'Master Furniture Maker • Kamakis Workshop',
      personAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-2',
      type: 'fundi',
      title: 'Emergency Pipe Burst & Mixer Tap Repair (Under 30 Min Dispatch)',
      price: 'From KSh 1,800',
      badge: '🔧 Verified Plumber',
      location: 'Kilimani, Kileleshwa & Westlands',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254799112233?text=Habari%20John,%20niko%20na%20leaking%20pipe%20inahitaji%20emergency%20fundi%20wa%20plumbing.',
      linkUrl: '/services?category=plumbing',
      personName: 'John Mwangi',
      personRole: 'Licensed EPRA Plumber • Kilimani',
      personAvatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-3',
      type: 'product',
      title: 'Ramtons 4-Burner Standing Gas Cooker with Electric Oven & Grill',
      price: 'KSh 29,900',
      originalPrice: 'KSh 34,500',
      badge: '🍳 Kitchen Deal',
      location: 'Parklands Westlands',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254722334455?text=Habari%20Salim,%20nimeona%20Ramtons%20gas%20cooker%20ya%20KSh%2029,900.',
      linkUrl: '/#products',
      personName: 'Salim & Team',
      personRole: 'Kitchenware Specialist • Parklands',
      personAvatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-4',
      type: 'cleaning',
      title: 'Water Tank Deep Cleaning, Mud Removal & Chlorine Sanitizing',
      price: 'KSh 2,800',
      originalPrice: 'KSh 3,500',
      badge: '💧 Home Care Plan',
      location: 'Nairobi & Kiambu Counties',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254733445566?text=Habari%20Dennis,%20ninataka%20kusafisha%20water%20tank%20ya%20nyumba.',
      linkUrl: '/#recurring',
      personName: 'Dennis Mutisya',
      personRole: 'Water Tank Sanitizer • Kiambu & Nairobi',
      personAvatar: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-5',
      type: 'product',
      title: '6x6 Bespoke Storage Bed with 4 Smooth Sliding Underbed Drawers',
      price: 'KSh 38,000',
      originalPrice: 'KSh 45,000',
      badge: '🛏️ Solid Hardwood',
      location: 'Ruiru Kamakis',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254712345678?text=Habari%20David,%20nimeona%20storage%20bed%20ya%206x6%20ya%20KSh%2038,000.',
      linkUrl: '/#products',
      personName: 'David Kariuki',
      personRole: 'Solid Hardwood Craftsman • Ruiru',
      personAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-6',
      type: 'fundi',
      title: 'Modern Floating Gypsum Ceilings with Warm Cove LED Lighting',
      price: 'KSh 1,900 / sqm',
      badge: '🎨 Ceiling Designer',
      location: 'Syokimau, Kitengela & Nairobi',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254700998877?text=Habari%20Brian,%20ninataka%20free%20quote%20ya%20gypsum%20ceiling%20design.',
      linkUrl: '/services?category=painting_gypsum',
      personName: 'Brian Otieno',
      personRole: 'Gypsum Ceiling Designer • Syokimau',
      personAvatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-7',
      type: 'cleaning',
      title: '7-Seater Sofa & Mattress Deep Machine Foam Wash & Stain Removal',
      price: 'KSh 2,800',
      originalPrice: 'KSh 3,800',
      badge: '🧽 Dries in 3 Hours',
      location: 'Doorstep Service Across Nairobi',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254733445566?text=Habari%20Mary,%20ninataka%20ku-book%20deep%20sofa%20wash.',
      linkUrl: '/#recurring',
      personName: 'Mary Wanjiku',
      personRole: 'Upholstery Care Specialist • Nairobi',
      personAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'sc-8',
      type: 'deal',
      title: 'Hisense 55-Inch 4K UHD Smart Frameless Android TV (Bluetooth & HDR)',
      price: 'KSh 41,500',
      originalPrice: 'KSh 48,000',
      badge: '📺 Flash 24H Deal',
      location: 'Mombasa Road & Nairobi',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
      whatsappUrl: 'https://wa.me/254700998877?text=Habari%20Kevin,%20bado%20mko%20na%20Hisense%2055%20inch%20TV%20ya%20KSh%2041,500?',
      linkUrl: '/deals',
      personName: 'Kevin Mutua',
      personRole: 'Home Electronics Dealer • Mombasa Road',
      personAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'products' && (item.type === 'product' || item.type === 'deal')) return true;
    if (filter === 'fundis' && (item.type === 'fundi' || item.type === 'cleaning')) return true;
    if (filter === 'deals' && (item.type === 'deal' || item.originalPrice)) return true;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Category Pills for Showcase */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-stone-500 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Top Picks:
          </span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            All Real Items
          </button>
          <button
            onClick={() => setFilter('products')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'products'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            🛋️ Furniture & Kitchen
          </button>
          <button
            onClick={() => setFilter('fundis')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'fundis'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            🔧 Vetted Fundis
          </button>
          <button
            onClick={() => setFilter('deals')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'deals'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            🔥 Slashed Deals
          </button>
        </div>

        <Link
          href="/deals"
          className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
        >
          <span>View All Today&apos;s Deals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Horizontal Visual Cards Slider with Real Kenyan Faces */}
      <div className="flex gap-6 overflow-x-auto pb-5 pt-2 scrollbar-thin scrollbar-thumb-stone-300 snap-x">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="w-80 sm:w-96 shrink-0 bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group snap-start"
          >
            <div>
              {/* Product/Service Work Photo */}
              <div className="relative h-52 w-full bg-stone-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black bg-stone-900/90 text-white backdrop-blur shadow-xs border border-white/20">
                    {item.badge}
                  </span>
                </div>

                {/* Location Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-1.5 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {/* Title, Price & Real Person Profile */}
              <div className="p-5 space-y-3.5">
                <h4 className="font-bold text-sm sm:text-base text-stone-900 leading-snug line-clamp-2">
                  {item.title}
                </h4>

                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-stone-900">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Lipa na M-Pesa
                  </span>
                </div>

                {/* Real Kenyan Person Attribution Avatar & Name */}
                <div className="flex items-center gap-2.5 pt-2.5 border-t border-stone-100">
                  <img
                    src={item.personAvatar}
                    alt={item.personName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-stone-900 block truncate">
                      {item.personName}
                    </span>
                    <span className="text-[10px] text-stone-500 block truncate">
                      {item.personRole}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="p-4 pt-0">
              <a
                href={item.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition active:scale-95 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
