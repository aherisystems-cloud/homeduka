'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Wrench, ShieldCheck, MapPin, Search, Filter, Camera, 
  Ruler, CheckCircle2, ChevronRight, Store, AlertTriangle, MessageSquare 
} from 'lucide-react';
import ServiceCard from '../../components/ServiceCard';
import RightSidebar from '../../components/RightSidebar';
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
    { id: 'plumbing', label: 'Plumbing & Water' },
    { id: 'electrical_solar', label: 'Solar & Electrical' },
    { id: 'painting_gypsum', label: 'Gypsum & Paint' },
    { id: 'carpentry_cabinetry', label: 'Kitchen & Wardrobes' },
    { id: 'cleaning_fumigation', label: 'Cleaning & Care' }
  ];

  const filteredServices = SAMPLE_KENYAN_HOME_SERVICES.filter((service) => {
    if (emergencyOnly && !service.service_terms.emergency_available) {
      return false;
    }

    if (selectedCategory !== 'all' && !service.service_category.includes(selectedCategory)) {
      return false;
    }

    const biz = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === service.business_id);
    if (!biz) return false;

    if (selectedRegionId !== 'all') {
      const region = KENYAN_REGIONS.find((r) => r.id === selectedRegionId);
      if (region) {
        const countyNames = region.counties.map((c) => c.name.toLowerCase());
        const matchesCounty = countyNames.includes(biz.location.county.toLowerCase());
        if (!matchesCounty) return false;
      }
    }

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[85vh]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-stone-900">Services & Fundis</span>
      </div>

      {/* Hero Header & Verified Affirmations Explainer */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-2xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Kenya Fundi Directory • Real Locations • Verified M-Pesa Tills</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-3">
            Trusted Home Services & Fundis <span className="text-brand-700">Across Kenya</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
            Find honest plumbers, electricians, gypsum fundis, and house cleaners across Nairobi, Mombasa, Nakuru, and all 47 counties. Every fundi has a real location and verified phone number.
          </p>

          {/* Explicit Guarantees Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-amber-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-stone-900 block">Free WhatsApp Photo Check</strong>
                <span className="text-stone-500 text-[11px]">Send a quick photo or video on WhatsApp to get the price before the fundi travels.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Ruler className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-stone-900 block">Free Site Visit & Measurement</strong>
                <span className="text-stone-500 text-[11px]">Free site visit and measurements for kitchens, wardrobes, and gypsum in their local area.</span>
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
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-4 shadow-2xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plumbing, gypsum, solar, cleaning, or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-700 bg-[#FAF8F5]"
              />
            </div>

            {/* Category Chips + Region Select + Emergency Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
              <div className="flex flex-wrap items-center gap-1.5">
                {tradeCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCategory === c.id
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
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
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 border-none text-stone-700 focus:ring-2 focus:ring-brand-700"
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
                      ? 'bg-rose-700 text-white shadow-xs' 
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>24/7 Emergency</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>Showing <strong>{filteredServices.length}</strong> vetted services across Kenya</span>
            <Link href="/" className="text-brand-700 font-bold hover:underline">
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
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
              <p className="text-stone-600 font-medium text-sm">No services matched your filter.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setEmergencyOnly(false); setSelectedRegionId('all'); setSearchQuery(''); }}
                className="mt-3 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Safety & Matchmaking Card to Balance Vertical Height with Sidebar */}
          <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-stone-200/90 text-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Looking for a specialized home service or contractor in your county?</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              If your required job isn&apos;t listed above (e.g. CCTV installation, borehole pump servicing, solar battery inverters, roofing repair, pest fumigation), message our verified directory desk on WhatsApp for free matchmaking with certified contractors in your estate.
            </p>
            <a
              href="https://wa.me/254712345678?text=Habari%20Home%20Kenya,%20natafuta%20fundi%20wa%20specialized%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3.5 py-1.5 rounded-xl transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
              <span>Ask for a Certified Contractor on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-YIELD SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-xs text-stone-500">Loading verified services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
