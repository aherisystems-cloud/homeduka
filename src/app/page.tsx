'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Sparkles, ShieldCheck, CheckCircle2, 
  MessageSquare, ArrowRight, Layers, ShoppingBag, Wrench, RefreshCw,
  Flame, Tv, Bed, Sofa, Utensils, Shield, ChevronLeft, ChevronRight,
  Store, Award, PhoneCall
} from 'lucide-react';
import BrowseByRoom from '../components/BrowseByRoom';
import MonthlyRecurringServices from '../components/MonthlyRecurringServices';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import BusinessCard from '../components/BusinessCard';
import ClaimProfileBanner from '../components/ClaimProfileBanner';
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

  // Slider refs for horizontal scrolling
  const productsSliderRef = useRef<HTMLDivElement>(null);
  const servicesSliderRef = useRef<HTMLDivElement>(null);
  const shopsSliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', step = 340) => {
    if (ref.current) {
      const offset = direction === 'left' ? -step : step;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Authentic Kenyan home search keywords
  const popularKeywords = [
    { label: "Chesterfield Sofa", query: "sofa" },
    { label: "6x6 Storage Bed", query: "bed" },
    { label: "Gas Cooker & Oven", query: "cooker" },
    { label: "55 Inch Smart TV", query: "tv" },
    { label: "Non-Stick Sufurias", query: "sufuria" },
    { label: "Blackout Curtains", query: "curtains" },
    { label: "Drinking Water 20L", query: "water" },
    { label: "Gas Refill", query: "gas" },
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
      {/* 1. HERO SECTION: WORLD-CLASS, SPACIOUS, EDITORIAL AIRINESS (NO DISTRACTIONS, NO SIDEBAR) */}
      <section className="relative pt-6 pb-4 sm:pt-12 sm:pb-8 text-center max-w-5xl mx-auto space-y-8">
        
        {/* Top Minimalist Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-semibold tracking-wide">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>KENYA&apos;S DIRECT HOME MARKETPLACE</span>
        </div>

        {/* Master Headline - Geometric Authority, Everyday Relatable Language */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Everything for your home. <br />
          <span className="text-amber-700">From trusted local shops & fundis.</span>
        </h1>

        {/* Subtitle - Crisp English, Authentic, Zero Clutter */}
        <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover furniture, kitchenware, decor, and electronics from trusted local shops — or connect with verified service providers and fundis across Kenya.
        </p>

        {/* Floating Search Hub */}
        <div className="max-w-3xl mx-auto pt-2">
          <div className="relative flex items-center bg-white rounded-full border border-stone-200/90 shadow-md hover:shadow-lg transition-all p-2 pl-6">
            <Search className="w-5 h-5 text-stone-400 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, fundis, or estates (e.g. Ruiru, Chesterfield, Gas Cooker, Plumber)..."
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

        {/* 4-Pillar Trust Bar */}
        <div className="pt-10 border-t border-stone-200/70 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">4,800+</span>
            <span className="text-xs text-stone-500 font-medium block">Verified Shops & Fundis</span>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">Direct WhatsApp</span>
            <span className="text-xs text-stone-500 font-medium block">Talk Direct • No Brokers</span>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">0% Fee</span>
            <span className="text-xs text-stone-500 font-medium block">Direct Shop Prices</span>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 block tracking-tight">Verified Till</span>
            <span className="text-xs text-stone-500 font-medium block">Safe Lipa na M-Pesa</span>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY ROOM SLIDER (STARTS BEFORE SERVICE PROVIDERS / FUNDIS) */}
      <BrowseByRoom
        selectedRoom={selectedRoom}
        onSelectRoom={(r) => setSelectedRoom(r)}
      />

      {/* 3. FEATURED HOME PRODUCTS & DEALS SLIDER (WITH VIEW ALL OPTION) */}
      <section id="products" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Direct From Local Shops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Featured Home Products
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
              Solid hardwood furniture, gas cookers, kitchenware, smart TVs, blackout curtains, and carpets direct from verified local shops
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/deals"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition shadow-2xs"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>View All Deals & Products ({filteredProducts.length}) →</span>
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSlider(productsSliderRef, 'left')}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider(productsSliderRef, 'right')}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Next Products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Cards Container */}
        {filteredProducts.length > 0 ? (
          <div 
            ref={productsSliderRef}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-stone-200"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-72 sm:w-80 shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-sm text-stone-500">
            No products found for this filter. Try selecting another category or clearing your search.
          </div>
        )}
      </section>

      {/* 4. FEATURED HOME SERVICE PROVIDERS / FUNDIS SLIDER (WITH VIEW ALL OPTION) */}
      <section id="services" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200/80 text-xs font-bold mb-2">
              <Wrench className="w-3.5 h-3.5 text-blue-700" />
              <span>Service Providers / Fundis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Featured Home Services & Fundis
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
              Licensed plumbers, electricians, appliance repairers, gypsum ceiling fundis, and house cleaners who offer WhatsApp price checks and site visits
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition shadow-2xs"
            >
              <span>View All Home Services ({filteredServices.length}) →</span>
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSlider(servicesSliderRef, 'left')}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Previous Services"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider(servicesSliderRef, 'right')}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Next Services"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Cards Container for Services */}
        {filteredServices.length > 0 ? (
          <div 
            ref={servicesSliderRef}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-stone-200"
          >
            {filteredServices.map((service) => (
              <div key={service.id} className="w-80 sm:w-96 shrink-0 snap-start">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-sm text-stone-500">
            No home services found for this filter.
          </div>
        )}
      </section>

      {/* 5. MONTHLY HOME CARE & MONTHLY REFILLS SLIDER (STRATEGICALLY FEATURED) */}
      <MonthlyRecurringServices />

      {/* 6. TOP TRUSTED LOCAL SHOPS YOU CAN VISIT SLIDER */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold mb-2">
              <Store className="w-3.5 h-3.5 text-stone-700" />
              <span>Physical Shops With Real Locations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Top Trusted Local Shops You Can Visit
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
              Verified physical shops with clear landmarks, customer parking, showrooms, and safe Lipa na M-Pesa Tills
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-full">
              {filteredBusinesses.length} Verified Shops
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSlider(shopsSliderRef, 'left')}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Previous Shops"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider(shopsSliderRef, 'right')}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                aria-label="Next Shops"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={shopsSliderRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-stone-200"
        >
          {filteredBusinesses.map((biz) => (
            <div key={biz.id} className="w-80 sm:w-96 shrink-0 snap-start">
              <BusinessCard business={biz} />
            </div>
          ))}
        </div>
      </section>

      {/* 7. BUYER SAFETY & PAYMENT SECURITY GUIDE (Airy & Reassuring) */}
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

      {/* 8. SELLER & SERVICE PROVIDER / FUNDI PORTAL BANNER */}
      <ClaimProfileBanner />
    </div>
  );
}
