'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Sparkles, ShieldCheck, CheckCircle2, 
  MessageSquare, ArrowRight, Filter, ChevronDown, Layers,
  Wrench, ShoppingBag, Camera, Ruler
} from 'lucide-react';
import DropOfTheDay from '../components/DropOfTheDay';
import BusinessCard from '../components/BusinessCard';
import ServiceCard from '../components/ServiceCard';
import RightSidebar from '../components/RightSidebar';
import EmergencyDispatchBar from '../components/EmergencyDispatchBar';
import { SAMPLE_KENYAN_HOME_LISTINGS, SAMPLE_KENYAN_HOME_SERVICES } from '../data/mock_listings';
import { KENYAN_REGIONS, HOME_CATEGORIES_TAXONOMY, KENYAN_SEARCH_INTENT_MAP } from '../data/kenyan_taxonomy';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'all' | 'products' | 'services'>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample real search suggestions Kenyans use
  const popularKenyanKeywords = [
    { label: "6 by 6 Mahogany Bed", query: "bed" },
    { label: "Chesterfield Kamakis", query: "sofa" },
    { label: "Emergency Plumber Kilimani", query: "Kilimani" },
    { label: "Nyali Hardwood Mombasa", query: "Mombasa" },
    { label: "Gypsum Ceiling Price", query: "gypsum" },
    { label: "Lori ya Kuhama", query: "moving" },
    { label: "Nakuru Solar Water", query: "Nakuru" },
    { label: "Cabro Paving Syokimau", query: "Syokimau" }
  ];

  // Filter shop listings based on active filters
  const filteredListings = SAMPLE_KENYAN_HOME_LISTINGS.filter((biz) => {
    // 1. Region Filter
    if (selectedRegionId !== 'all') {
      const region = KENYAN_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        const countyNames = region.counties.map((c) => c.name.toLowerCase());
        const matchesCounty = countyNames.includes(biz.location.county.toLowerCase());
        if (!matchesCounty) return false;
      }
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      const matchesCat = biz.categories.some((cat) => cat.includes(selectedCategory));
      if (!matchesCat) return false;
    }

    // 3. Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const searchable = `
        ${biz.business_name} 
        ${biz.location.county} 
        ${biz.location.sub_county} 
        ${biz.location.neighborhood} 
        ${biz.location.landmark} 
        ${biz.categories.join(' ')} 
        ${biz.description}
      `.toLowerCase();

      return searchable.includes(q);
    }

    return true;
  });

  // Filter services based on active filters
  const filteredServices = SAMPLE_KENYAN_HOME_SERVICES.filter((service) => {
    // Find provider business
    const biz = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === service.business_id);
    if (!biz) return false;

    // 1. Region Filter
    if (selectedRegionId !== 'all') {
      const region = KENYAN_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        const countyNames = region.counties.map((c) => c.name.toLowerCase());
        const matchesCounty = countyNames.includes(biz.location.county.toLowerCase());
        if (!matchesCounty) return false;
      }
    }

    // 2. Category Filter
    if (selectedCategory !== 'all' && !service.service_category.includes(selectedCategory)) {
      return false;
    }

    // 3. Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const searchable = `
        ${service.title} 
        ${service.description} 
        ${biz.business_name} 
        ${biz.location.neighborhood} 
        ${biz.location.county}
      `.toLowerCase();

      return searchable.includes(q);
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      {/* Top Banner: Nationwide Coverage Indicator */}
      <div className="bg-slate-900 text-white rounded-2xl px-4 py-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-400">KENYA-WIDE NETWORK:</span>
          <span className="text-slate-300">
            Nairobi Metro (Kilimani, Ruiru, Westlands, Syokimau) • Coast (Mombasa, Nyali, Diani) • Rift Valley (Nakuru, Eldoret) • Western & Mt. Kenya
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden md:block">
          Anti-Scam Architecture • Verified M-Pesa Tills • Real Landmarks
        </span>
      </div>

      {/* Emergency Fast-Dispatch Bar */}
      <div className="mb-6">
        <EmergencyDispatchBar />
      </div>

      {/* Main Grid: Content (Left) + High-Yield Sidebar (Right) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="flex-1 min-w-0 w-full space-y-8">
          {/* Hero Search Section */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Scams • Direct WhatsApp • Real Landmark Addresses</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                Discover Verified Home Products, Fundis & Movers Across <span className="text-brand-600">Kenya</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Connect directly with vetted carpenters in Kamakis, emergency plumbers in Kilimani, teak masters in Nyali, and solar installers in Nakuru.
              </p>
            </div>

            {/* Top-Level Discovery View Mode Switcher */}
            <div className="flex items-center gap-2 mb-5 p-1 bg-slate-100 rounded-2xl w-fit">
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Solutions ({filteredListings.length + filteredServices.length})</span>
              </button>

              <button
                onClick={() => setViewMode('products')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'products'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Products & Furniture ({filteredListings.length})</span>
              </button>

              <button
                onClick={() => setViewMode('services')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'services'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>Services & Fundis ({filteredServices.length})</span>
              </button>
            </div>

            {/* Smart Search Bar */}
            <div className="relative mb-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area (e.g., 'Kilimani', 'Kamakis') or fundi/product (e.g., '6x6 bed', 'plumber')..."
                  className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-slate-50 border border-slate-300 shadow-2xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-20 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Clear
                  </button>
                )}
                <button 
                  onClick={() => {}}
                  className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition"
                >
                  Search
                </button>
              </div>
            </div>

            {/* What Kenyans Search For (Quick-Click Tags) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-400 mr-1 flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Kenyans Search:
              </span>
              {popularKenyanKeywords.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(item.query)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-brand-600 hover:border-brand-300 border border-slate-200 transition text-[11px] font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          {/* National Region Filter Pills */}
          <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600" />
                Select Region in Kenya:
              </span>
              <span className="text-[11px] text-slate-400">
                {filteredListings.length} Verified Shops Found
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedRegionId('all'); setSearchQuery(''); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedRegionId === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Kenya 🇰🇪
              </button>

              {KENYAN_REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => { setSelectedRegionId(region.id); setSearchQuery(''); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedRegionId === region.id
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Micro-Neighborhoods when a region is active */}
            {selectedRegionId !== 'all' && (
              <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="font-semibold text-slate-400">Estates & Towns:</span>
                {KENYAN_REGIONS.find((r) => r.id === selectedRegionId)?.counties.flatMap((c) => c.microNeighborhoods).slice(0, 10).map((neigh, nIdx) => (
                  <button
                    key={nIdx}
                    onClick={() => setSearchQuery(neigh)}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition"
                  >
                    {neigh}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Quick Category Icons */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Browse Solutions by Category
              </h2>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Show All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {HOME_CATEGORIES_TAXONOMY.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'all' : cat.id.split('_')[0])}
                  className={`p-3 rounded-2xl border transition text-left flex items-center gap-2.5 ${
                    selectedCategory.includes(cat.id.split('_')[0])
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-brand-500 hover:shadow-2xs'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {cat.name.split('&')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {cat.subcategories.length} subcategories
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Drop of the Day Banner */}
          <DropOfTheDay />

          {/* SECTION: Vetted Services & Fundis (shown in 'all' or 'services' mode) */}
          {(viewMode === 'all' || viewMode === 'services') && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                      Vetted Trade Pros
                    </span>
                    <span className="text-xs text-slate-500">• Affirmed Guarantees</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    Verified Home Services & Fundis ({filteredServices.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Licensed plumbers, EPRA solar pros, gypsum masters & cabro installers with affirmed WhatsApp diagnosis
                  </p>
                </div>

                <Link href="/services" className="text-xs font-bold text-blue-700 hover:underline hidden sm:flex items-center gap-1">
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 text-xs text-slate-500">
                  No services matching this filter.
                </div>
              )}
            </section>
          )}

          {/* SECTION: Verified Shops & Workshops (shown in 'all' or 'products' mode) */}
          {(viewMode === 'all' || viewMode === 'products') && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                      Physical Workshops
                    </span>
                    <span className="text-xs text-slate-500">• Buy Goods Tills</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    Verified Shops & Workshops ({filteredListings.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Inspected workshops with verified M-Pesa Tills, physical landmarks & cash on delivery
                  </p>
                </div>
              </div>

              {filteredListings.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
                  <p className="text-sm font-bold text-slate-700">No shops found matching your search</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching another estate or clear your filters.</p>
                  <button
                    onClick={() => { setSelectedRegionId('all'); setSelectedCategory('all'); setSearchQuery(''); }}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredListings.map((biz) => (
                    <BusinessCard key={biz.id} business={biz} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Detailed All-Categories Directory */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                Complete Directory
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                All Home Categories & Specialized Services
              </h2>
              <p className="text-xs text-slate-500">
                Detailed breakdowns covering every home improvement need across Kenya
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOME_CATEGORIES_TAXONOMY.map((cat) => (
                <div key={cat.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{cat.name}</h3>
                      <p className="text-[11px] text-slate-500 leading-tight">{cat.tagline}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mt-3 pt-3 border-t border-slate-200 text-xs">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.id} className="flex items-center justify-between text-slate-700">
                        <button
                          onClick={() => setSearchQuery(sub.name.split(',')[0])}
                          className="hover:text-brand-600 text-left font-medium"
                        >
                          • {sub.name}
                        </button>
                        <span className="text-[10px] text-slate-400">
                          {sub.popularSearches.length} tags
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Vetted Buyer Guides & Roundup Articles */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  Buyer Protection
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Buyer Guides & Price Roundups</h2>
                <p className="text-xs text-slate-500">
                  In-depth market investigations comparing workshop rates, materials, and verified fundis
                </p>
              </div>
              <Link href="/blog" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                <span>All Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/blog/best-sofa-makers-ruiru-kamakis"
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:border-brand-500 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Furniture Roundup
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-600 transition mt-2 mb-1 leading-snug">
                    Top 7 Best Sofa Makers in Ruiru & Kamakis (2026 Prices)
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    Physical frame inspections along Eastern Bypass: solid mahogany vs blue gum, foam grades, and M-Pesa Tills.
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-600 flex items-center gap-1 mt-3">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                href="/blog/emergency-plumbers-kilimani-kileleshwa"
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:border-brand-500 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                    24/7 Fundis
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-600 transition mt-2 mb-1 leading-snug">
                    Emergency Plumbers in Kilimani & Kileleshwa: 24/7 Contacts
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    Licensed fundis with under-20-minute response times for burst pipes, water pumps, and solar sensors.
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-600 flex items-center gap-1 mt-3">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                href="/blog/cost-of-moving-house-nairobi-best-movers"
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:border-brand-500 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                    Moving Rates
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-600 transition mt-2 mb-1 leading-snug">
                    Cost of Moving House in Nairobi: Top 5 Movers Compared
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    Realistic 2026 moving rates for 1, 2, and 3-bedroom houses with TV unmounting and clean truck fleets.
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-600 flex items-center gap-1 mt-3">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: HIGH-YIELD SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}
