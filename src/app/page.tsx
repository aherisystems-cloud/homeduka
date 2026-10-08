'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Sparkles, ShieldCheck, CheckCircle2, 
  MessageSquare, ArrowRight, Layers, ShoppingBag, Wrench, RefreshCw,
  Flame, Tv, Bed, Sofa, Utensils, Shield
} from 'lucide-react';
import BrowseByRoom from '../components/BrowseByRoom';
import MonthlyRecurringServices from '../components/MonthlyRecurringServices';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import BusinessCard from '../components/BusinessCard';
import RightSidebar from '../components/RightSidebar';
import ClaimProfileBanner from '../components/ClaimProfileBanner';
import HeroVisualShowcase from '../components/HeroVisualShowcase';
import { 
  SAMPLE_KENYAN_HOME_LISTINGS, 
  SAMPLE_KENYAN_HOME_PRODUCTS, 
  SAMPLE_KENYAN_HOME_SERVICES,
  SAMPLE_KENYAN_DEALS
} from '../data/mock_listings';
import { KENYAN_REGIONS } from '../data/kenyan_taxonomy';
import { HomeRoom } from '../types/schema';

export default function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState<HomeRoom | 'all'>('all');
  const [viewType, setViewType] = useState<'all' | 'furniture' | 'kitchen' | 'electronics' | 'decor' | 'services' | 'recurring'>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Authentic Kenyan home search keywords
  const popularKeywords = [
    { label: "Chesterfield Sofa", query: "sofa" },
    { label: "6x6 Storage Bed", query: "bed" },
    { label: "Gas Cooker & Oven", query: "cooker" },
    { label: "55 Inch Smart TV", query: "tv" },
    { label: "Non-Stick Sufurias", query: "sufuria" },
    { label: "Blackout Curtains", query: "curtains" },
    { label: "Sofa Steam Wash", query: "shampoo" },
    { label: "Water Tank Cleaning", query: "tank" },
    { label: "Emergency Plumber", query: "plumber" }
  ];

  // Filter Products
  const filteredProducts = SAMPLE_KENYAN_HOME_PRODUCTS.filter((prod) => {
    // 1. Room filter
    if (selectedRoom !== 'all' && prod.room !== selectedRoom) {
      return false;
    }

    // 2. Category switcher filter
    if (viewType === 'furniture' && prod.category !== 'furniture' && prod.category !== 'carpentry_cabinetry') {
      return false;
    }
    if (viewType === 'kitchen' && prod.category !== 'kitchenware_utensils' && prod.subcategory !== 'cookers_ovens' && prod.room !== 'kitchen_dining') {
      return false;
    }
    if (viewType === 'electronics' && prod.category !== 'appliances_electronics' && prod.category !== 'electrical_solar' && prod.subcategory !== 'tvs_audio') {
      return false;
    }
    if (viewType === 'decor' && prod.category !== 'bedding_decor' && prod.subcategory !== 'curtains_sheers' && prod.subcategory !== 'carpets_rugs') {
      return false;
    }

    // 3. Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const searchable = `${prod.title} ${prod.category} ${prod.subcategory} ${prod.description}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });

  // Filter Services
  const filteredServices = SAMPLE_KENYAN_HOME_SERVICES.filter((serv) => {
    // 1. Room filter
    if (selectedRoom !== 'all' && serv.room !== selectedRoom && serv.room !== 'whole_house') {
      return false;
    }

    // 2. Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const searchable = `${serv.title} ${serv.service_category} ${serv.description}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });

  // Filter Businesses
  const filteredBusinesses = SAMPLE_KENYAN_HOME_LISTINGS.filter((biz) => {
    if (selectedRegionId !== 'all') {
      const region = KENYAN_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        const counties = region.counties.map((c) => c.name.toLowerCase());
        if (!counties.includes(biz.location.county.toLowerCase())) return false;
      }
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const searchable = `${biz.business_name} ${biz.location.neighborhood} ${biz.location.county} ${biz.description}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* 1. HERO SECTION: VISUAL, ACTION-ORIENTED, IMMEDIATE SHOPPING MODE */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-bold mb-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Kenya&apos;s Complete Home Marketplace • Direct Verified Contacts</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Everything For Your Home — <span className="text-brand-700">All In One Place</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-2 leading-relaxed">
              Kila kitu cha nyumba yako: Buy living room furniture, beds, kitchen cookers, decor, and electronics — or hire vetted local fundis, plumbers, electricians, and monthly home care in your neighborhood.
            </p>
          </div>

          {/* Quick Deals Pill Link */}
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 transition self-start md:self-auto shrink-0 shadow-2xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-black block group-hover:text-rose-700 transition">
                Today&apos;s Slashed Deals
              </span>
              <span className="text-[11px] text-amber-800">
                Up to 26% OFF Sofas, TVs, Kitchen & Fundis →
              </span>
            </div>
          </Link>
        </div>

        {/* Real Kenyan People Trust Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/70">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80" 
              alt="Francis Kamau - WoodCraft Kamakis" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40 shrink-0" 
            />
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">Local Workshop Makers</span>
              <span className="text-[11px] text-amber-900">Francis Kamau • Kamakis Furniture</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=120&q=80" 
              alt="John Mwangi - Kilimani Plumber" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40 shrink-0" 
            />
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">Vetted Local Fundis</span>
              <span className="text-[11px] text-blue-900">John Mwangi • EPRA Plumber, Kilimani</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
              alt="Wanjiru - Happy Homeowner" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40 shrink-0" 
            />
            <div>
              <span className="text-xs font-bold text-stone-900 block leading-tight">Made for Kenyan Homes</span>
              <span className="text-[11px] text-emerald-900">Direct WhatsApp • Zero Broker Fees</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, services, or estates (e.g. 'Chesterfield sofa', 'Ramtons cooker', 'Plumber', 'Kilimani')..."
              className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-[#FAF8F5] border border-stone-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-700 text-xs sm:text-sm text-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-20 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                Clear
              </button>
            )}
            <button 
              onClick={() => {}}
              className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Popular Keyword Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600 pt-1">
          <span className="font-bold text-stone-400 mr-1 flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" /> Popular:
          </span>
          {popularKeywords.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(item.query)}
              className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-50 hover:text-brand-700 border border-stone-200 transition text-[11px] font-medium cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 2. REAL PHOTOS SHOWCASE / SLIDER (Actual Things & People) */}
        <div className="pt-2 border-t border-stone-100">
          <HeroVisualShowcase />
        </div>
      </section>

      {/* 3. BUYER SAFETY & PAYMENT SECURITY GUIDE */}
      <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-stone-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <div>
            <strong className="text-stone-900 text-xs sm:text-sm block">
              How Payments & Pickups Work Safely on Home Kenya
            </strong>
            <p className="text-stone-600 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
              Sellers and fundis are registered Kenyan businesses. Always chat on WhatsApp first to confirm the item and arrange pickup or delivery. When paying via Lipa na M-Pesa, confirm the registered name matches before entering your PIN. Only pay upon delivery or when terms are agreed.
            </p>
          </div>
        </div>

        <Link
          href="/deals"
          className="inline-flex items-center gap-1 font-bold text-brand-700 hover:underline shrink-0 text-xs self-start md:self-auto"
        >
          <span>View Verified Deals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4. DISCOVERY MODES SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setViewType('all'); setSelectedRoom('all'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Everything ({filteredProducts.length + filteredServices.length})</span>
          </button>

          <button
            onClick={() => setViewType('furniture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'furniture'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sofa className="w-3.5 h-3.5 text-amber-500" />
            <span>🛋️ Furniture</span>
          </button>

          <button
            onClick={() => setViewType('kitchen')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'kitchen'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            <span>🍳 Kitchen & Cookware</span>
          </button>

          <button
            onClick={() => setViewType('electronics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'electronics'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Tv className="w-3.5 h-3.5 text-blue-500" />
            <span>📱 TVs & Electronics</span>
          </button>

          <button
            onClick={() => setViewType('decor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'decor'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>🪟 Curtains & Decor</span>
          </button>

          <button
            onClick={() => setViewType('services')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'services'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>🔧 Fundis & Repairs ({filteredServices.length})</span>
          </button>

          <button
            onClick={() => setViewType('recurring')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewType === 'recurring'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
            <span>💧 Monthly Home Care</span>
          </button>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={selectedRegionId}
            onChange={(e) => setSelectedRegionId(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 focus:ring-2 focus:ring-brand-700"
          >
            <option value="all">Kenya-Wide (All Counties)</option>
            {KENYAN_REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. SHOP BY ROOM COMPONENT */}
      <BrowseByRoom
        selectedRoom={selectedRoom}
        onSelectRoom={(r) => setSelectedRoom(r)}
      />

      {/* 6. MAIN CONTENT & SIDEBAR SPLIT */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: LISTINGS & SECTIONS */}
        <div className="flex-1 min-w-0 w-full space-y-10">

          {/* A. FEATURED HOME PRODUCTS (Furniture, Kitchen, Electronics, Decor) */}
          {(viewType === 'all' || viewType === 'furniture' || viewType === 'kitchen' || viewType === 'electronics' || viewType === 'decor') && (
            <section id="products" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Products & Items
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                    Featured Home Products ({filteredProducts.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Solid hardwood furniture, gas cookers, kitchenware, smart TVs, blackout curtains, and carpets direct from verified sellers
                  </p>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-xs text-stone-500">
                  No products found for this filter. Try selecting another category or clear your search.
                </div>
              )}
            </section>
          )}

          {/* B. REPAIRS & FUNDIS SECTION */}
          {(viewType === 'all' || viewType === 'services') && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Fundis & Repairs
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                    Fundis & Home Services ({filteredServices.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Verified fundis who give free price checks on WhatsApp and local estate visits
                  </p>
                </div>

                <Link href="/services" className="text-xs font-bold text-stone-800 hover:text-brand-700 flex items-center gap-1">
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-xs text-stone-500">
                  No services found for this filter.
                </div>
              )}
            </section>
          )}

          {/* C. MONTHLY RECURRING HOME ESSENTIALS */}
          {(viewType === 'all' || viewType === 'recurring') && (
            <MonthlyRecurringServices />
          )}

          {/* D. TOP 5 PREMIER TRUSTED SHOPS & WORKSHOPS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-800 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  Workshops You Can Visit
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  5 Trusted Kenyan Workshops You Can Visit ({filteredBusinesses.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Verified workshops with clear landmarks, customer parking, and safe Lipa na M-Pesa Tills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredBusinesses.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          </section>

          {/* E. CLAIM & CONFIRM PROFILE BANNER */}
          <ClaimProfileBanner />
        </div>

        {/* RIGHT COLUMN: HIGH-YIELD SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}
