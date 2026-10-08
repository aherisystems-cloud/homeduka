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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20 md:space-y-28">
      {/* 1. HERO SECTION: WORLD-CLASS, SPACIOUS, EDITORIAL AIRINESS */}
      <section className="relative pt-6 pb-4 sm:pt-14 sm:pb-8 text-center max-w-5xl mx-auto space-y-8">
        
        {/* Top Minimalist Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-semibold tracking-wide">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>KENYA&apos;S DIRECT HOME MARKETPLACE</span>
        </div>

        {/* Master Headline - Clean, Expansive, True Geometric Authority */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Everything for your home. <br />
          <span className="text-amber-700">From trusted local makers.</span>
        </h1>

        {/* Subtitle - Pure English, Authoritative, Zero Clutter */}
        <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover bespoke furniture, kitchenware, decor, and smart electronics — or hire certified neighborhood fundis, plumbers, and home cleaners across Kenya.
        </p>

        {/* Floating Search Hub */}
        <div className="max-w-3xl mx-auto pt-2">
          <div className="relative flex items-center bg-white rounded-full border border-stone-200/90 shadow-md hover:shadow-lg transition-all p-2 pl-6">
            <Search className="w-5 h-5 text-stone-400 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, fundis, or estates (e.g. Ruiru, Chesterfield, Cooker)..."
              className="w-full py-3 bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 text-xs font-semibold text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button 
              onClick={() => {}}
              className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition shrink-0 shadow-sm cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Popular Keyword Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-stone-500">
            <span className="font-semibold text-stone-400 text-xs">Popular:</span>
            {popularKeywords.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(item.query)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-50 hover:text-amber-800 border border-stone-200/80 transition text-xs font-medium cursor-pointer shadow-2xs"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Marketplace Guarantees: Airy 4-Pillar Bar */}
        <div className="pt-10 border-t border-stone-200/70 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">4,800+</span>
            <span className="text-xs text-stone-500 font-medium block">Vetted Makers & Fundis</span>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">Direct Chat</span>
            <span className="text-xs text-stone-500 font-medium block">Talk on WhatsApp • No Brokers</span>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">0% Fee</span>
            <span className="text-xs text-stone-500 font-medium block">Direct Workshop Prices</span>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">Verified Till</span>
            <span className="text-xs text-stone-500 font-medium block">Safe Lipa na M-Pesa</span>
          </div>
        </div>
      </section>

      {/* 2. REAL PRODUCTS & FUNDIS SHOWCASE (Spacious Standalone Section) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Real Workshops & Skilled People</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Featured Work & Local Fundis
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Handcrafted furniture, certified technicians, and genuine home products ready in your neighborhood
            </p>
          </div>

          <Link
            href="/deals"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition self-start sm:self-auto shrink-0 shadow-2xs group"
          >
            <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Today&apos;s Slashed Deals →</span>
          </Link>
        </div>

        <HeroVisualShowcase />
      </section>

      {/* 3. BUYER SAFETY & PAYMENT SECURITY GUIDE (Airy & Reassuring) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              How Payments & Pickups Work Safely on Home Kenya
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Sellers and fundis are registered Kenyan businesses. Always chat on WhatsApp first to confirm specifications and arrange pickup or delivery. When paying via Lipa na M-Pesa, confirm the registered business name matches on your phone screen before entering your PIN. Only pay upon delivery or when terms are agreed.
            </p>
          </div>
        </div>

        <Link
          href="/deals"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition shrink-0 self-start md:self-auto shadow-sm"
        >
          <span>View Verified Deals</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </Link>
      </div>

      {/* 4. DISCOVERY MODES SWITCHER */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => { setViewType('all'); setSelectedRoom('all'); }}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Everything ({filteredProducts.length + filteredServices.length})</span>
            </button>

            <button
              onClick={() => setViewType('furniture')}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'furniture'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Sofa className="w-4 h-4 text-amber-500" />
              <span>🛋️ Furniture</span>
            </button>

            <button
              onClick={() => setViewType('kitchen')}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'kitchen'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>🍳 Kitchen & Cookware</span>
            </button>

            <button
              onClick={() => setViewType('electronics')}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'electronics'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Tv className="w-4 h-4 text-blue-500" />
              <span>📱 TVs & Electronics</span>
            </button>

            <button
              onClick={() => setViewType('decor')}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'decor'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>🪟 Curtains & Decor</span>
            </button>

            <button
              onClick={() => setViewType('services')}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'services'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>🔧 Fundis & Repairs ({filteredServices.length})</span>
            </button>

            <button
              onClick={() => setViewType('recurring')}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                viewType === 'recurring'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>💧 Monthly Care</span>
            </button>
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-stone-400" />
            <select
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-stone-200 text-stone-700 focus:ring-2 focus:ring-brand-700 shadow-2xs"
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
      </div>

      {/* 6. MAIN CONTENT & SIDEBAR SPLIT */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* LEFT COLUMN: LISTINGS & SECTIONS */}
        <div className="flex-1 min-w-0 w-full space-y-16 sm:space-y-20">

          {/* A. FEATURED HOME PRODUCTS (Furniture, Kitchen, Electronics, Decor) */}
          {(viewType === 'all' || viewType === 'furniture' || viewType === 'kitchen' || viewType === 'electronics' || viewType === 'decor') && (
            <section id="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Products & Items
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
                    Featured Home Products ({filteredProducts.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Solid hardwood furniture, gas cookers, kitchenware, smart TVs, blackout curtains, and carpets direct from verified sellers
                  </p>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-sm text-stone-500">
                  No products found for this filter. Try selecting another category or clear your search.
                </div>
              )}
            </section>
          )}

          {/* B. REPAIRS & FUNDIS SECTION */}
          {(viewType === 'all' || viewType === 'services') && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Fundis & Repairs
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
                    Fundis & Home Services ({filteredServices.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Verified fundis who give free price checks on WhatsApp and local estate visits
                  </p>
                </div>

                <Link href="/services" className="text-xs sm:text-sm font-bold text-stone-800 hover:text-brand-700 flex items-center gap-1">
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-sm text-stone-500">
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
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                  Workshops You Can Visit
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
                  5 Trusted Kenyan Workshops You Can Visit ({filteredBusinesses.length})
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Verified workshops with clear landmarks, customer parking, and safe Lipa na M-Pesa Tills
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {filteredBusinesses.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          </section>

          {/* E. SELLER & FUNDI PORTAL BANNER */}
          <ClaimProfileBanner />
        </div>

        {/* RIGHT COLUMN: HIGH-YIELD SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}
