'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Wrench, ShieldCheck, MapPin, Search, Filter, Camera, 
  Ruler, AlertTriangle, CheckCircle2, ChevronRight, Store 
} from 'lucide-react';
import ServiceCard from '../../components/ServiceCard';
import RightSidebar from '../../components/RightSidebar';
import EmergencyDispatchBar from '../../components/EmergencyDispatchBar';
import { SAMPLE_KENYAN_HOME_SERVICES, SAMPLE_KENYAN_HOME_LISTINGS } from '../../data/mock_listings';
import { KENYAN_REGIONS } from '../../data/kenyan_taxonomy';

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialEmergency = searchParams.get('filter') === 'emergency';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(initialEmergency);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tradeCategories = [
    { id: 'all', label: 'All Services & Trades' },
    { id: 'plumbing', label: 'Plumbing & Pumps' },
    { id: 'electrical_solar', label: 'Electrical & Solar' },
    { id: 'painting_gypsum', label: 'Gypsum & Painting' },
    { id: 'carpentry_cabinetry', label: 'Carpentry & Cabinetry' },
    { id: 'tiles_flooring', label: 'Cabro & Tiling' }
  ];

  const filteredServices = SAMPLE_KENYAN_HOME_SERVICES.filter((service) => {
    // 1. Emergency toggle
    if (emergencyOnly && !service.service_terms.emergency_available) {
      return false;
    }

    // 2. Category filter
    if (selectedCategory !== 'all' && !service.service_category.includes(selectedCategory)) {
      return false;
    }

    // Find provider business
    const biz = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === service.business_id);
    if (!biz) return false;

    // 3. Region filter
    if (selectedRegionId !== 'all') {
      const region = KENYAN_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        const countyNames = region.counties.map((c) => c.name.toLowerCase());
        const matchesCounty = countyNames.includes(biz.location.county.toLowerCase());
        if (!matchesCounty) return false;
      }
    }

    // 4. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const searchable = `
        ${service.title} 
        ${service.description} 
        ${biz.business_name} 
        ${biz.location.neighborhood} 
        ${biz.location.county}
      `.toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-900">Services & Fundis</span>
      </div>

      {/* Emergency Fast Dispatch Bar */}
      <div className="mb-6">
        <EmergencyDispatchBar />
      </div>

      {/* Hero Header & Verified Affirmations Explainer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kenya-Wide Fundi Standards • Real Landmarks • Verified Buy Goods Tills</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Verified Home Services & Vetted <span className="text-emerald-600">Fundis Across Kenya</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Hire licensed plumbers, EPRA solar technicians, gypsum ceiling designers, and cabro contractors across Nairobi, Mombasa, Nakuru, and beyond. Every listing includes verified landmarks and provider-affirmed commitments.
          </p>

          {/* Explicit Guarantees Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 block">Affirmed WhatsApp Photo Diagnosis</strong>
                <span className="text-slate-500 text-[11px]">Send a 10s video or photo on WhatsApp for instant pricing before tools move.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Ruler className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 block">Affirmed Free Local Measurement</strong>
                <span className="text-slate-500 text-[11px]">Free site measurements for custom gypsum, cabro, and cabinets in the provider's estate.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Directory (Left) + High-Yield Sidebar (Right) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: FILTERS & SERVICES */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4 shadow-2xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plumbing, gypsum, solar, cabro, or estate (e.g. Kilimani, Syokimau)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            {/* Category Chips + Region Select + Emergency Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                {tradeCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCategory === c.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 border-none text-slate-700 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Kenya-Wide (All Counties)</option>
                  {KENYAN_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => setEmergencyOnly(!emergencyOnly)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    emergencyOnly 
                      ? 'bg-rose-500 text-white shadow-xs' 
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>24/7 Emergency Only</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing <strong>{filteredServices.length}</strong> vetted services across Kenya</span>
            <Link href="/" className="text-emerald-700 font-bold hover:underline">
              Switch to Products & Furniture Directory →
            </Link>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-slate-600 font-medium text-sm">No services matched your filter.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setEmergencyOnly(false); setSelectedRegionId('all'); setSearchQuery(''); }}
                className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: HIGH-YIELD SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-xs text-slate-500">Loading verified services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
