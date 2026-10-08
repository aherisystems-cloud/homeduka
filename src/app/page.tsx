'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Sparkles, ShieldCheck, CheckCircle2, 
  MessageSquare, ArrowRight, Layers, ShoppingBag, Wrench, RefreshCw
} from 'lucide-react';
import BrowseByRoom from '../components/BrowseByRoom';
import MonthlyRecurringServices from '../components/MonthlyRecurringServices';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import BusinessCard from '../components/BusinessCard';
import RightSidebar from '../components/RightSidebar';
import ClaimProfileBanner from '../components/ClaimProfileBanner';
import { 
  SAMPLE_KENYAN_HOME_LISTINGS, 
  SAMPLE_KENYAN_HOME_PRODUCTS, 
  SAMPLE_KENYAN_HOME_SERVICES 
} from '../data/mock_listings';
import { KENYAN_REGIONS } from '../data/kenyan_taxonomy';
import { HomeRoom } from '../types/schema';

export default function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState<HomeRoom | 'all'>('all');
  const [viewType, setViewType] = useState<'all' | 'products' | 'services' | 'recurring'>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Authentic Kenyan home search keywords
  const popularKeywords = [
    { label: "7-Seater Sofas", query: "sofa" },
    { label: "6x6 Storage Bed", query: "bed" },
    { label: "Solar Water Heaters", query: "solar" },
    { label: "Modular Kitchens", query: "kitchen" },
    { label: "Gypsum Ceilings", query: "gypsum" },
    { label: "Sofa Steam Cleaning", query: "cleaning" },
    { label: "Water Tank Cleaning", query: "tank" },
    { label: "Emergency Plumber", query: "plumber" }
  ];

  // Filter Products
  const filteredProducts = SAMPLE_KENYAN_HOME_PRODUCTS.filter((prod) => {
    // 1. Room filter
    if (selectedRoom !== 'all' && prod.room !== selectedRoom) {
      return false;
    }

    // 2. Search filter
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. HERO SECTION: WARM, RELATABLE, ELEVATED */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-2xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Curated Kenyan Home Authority • Real Workshops • Verified Tills</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.15] mb-3">
            Everything Your Home Needs. <span className="text-brand-700">All in One Place.</span>
          </h1>

          <p className="text-xs sm:text-base text-stone-600 leading-relaxed mb-6">
            From bespoke living room sofas and fitted kitchens to routine water tank cleaning and licensed emergency fundis — find verified products and trusted artisans across Kenya.
          </p>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, services, or estates (e.g., 'Chesterfield sofa', 'Solar water heater', 'Kamakis')..."
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

          {/* Quick Keyword Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
            <span className="font-bold text-stone-400 mr-1 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-brand-700" /> Popular:
            </span>
            {popularKeywords.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(item.query)}
                className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-50 hover:text-brand-700 border border-stone-200 transition text-[11px] font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DISCOVERY MODES SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setViewType('all'); setSelectedRoom('all'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewType === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Solutions ({filteredProducts.length + filteredServices.length})</span>
          </button>

          <button
            onClick={() => setViewType('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewType === 'products'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
            <span>Furniture & Products ({filteredProducts.length})</span>
          </button>

          <button
            onClick={() => setViewType('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewType === 'services'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-blue-500" />
            <span>Repairs & Fundis ({filteredServices.length})</span>
          </button>

          <button
            onClick={() => setViewType('recurring')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewType === 'recurring'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
            <span>Monthly Recurring Care</span>
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

      {/* 3. BROWSE BY ROOM COMPONENT */}
      <BrowseByRoom
        selectedRoom={selectedRoom}
        onSelectRoom={(r) => setSelectedRoom(r)}
      />

      {/* 4. MAIN CONTENT & SIDEBAR SPLIT */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: LISTINGS & SECTIONS */}
        <div className="flex-1 min-w-0 w-full space-y-10">

          {/* A. FEATURED HOME PRODUCTS (Furniture, Appliances, Fittings) */}
          {(viewType === 'all' || viewType === 'products') && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Tangible Pieces
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                    Featured Home Products & Furniture ({filteredProducts.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Heirloom hardwood pieces, modular kitchens, and solar systems directly from workshops
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
                  No products found for this filter. Try selecting another room or clear your search.
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
                    Skilled Labor & Trades
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                    Vetted Fundis & Installation Services ({filteredServices.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Verified artisans with affirmed WhatsApp photo assessment & local estate measurements
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
                  Verified Physical Locations
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  The 5 Premier Trusted Workshops ({filteredBusinesses.length})
                </h2>
                <p className="text-xs text-stone-500">
                  Inspected workshops with verified landmarks, customer parking & M-Pesa Buy Goods Tills
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
