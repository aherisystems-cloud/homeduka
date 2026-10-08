'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Search, ChevronDown, Check, X, Flame, 
  Sparkles, Tag, ArrowRight, ShieldCheck, Percent, ExternalLink
} from 'lucide-react';
import Logo from './Logo';
import { 
  KENYAN_COUNTIES, 
  CountyItem, 
  SubCountyItem, 
  AreaItem, 
  FlatLocationItem, 
  getAllFlatLocations, 
  searchLocations 
} from '../data/kenyan_locations';
import { SAMPLE_KENYAN_DEALS } from '../data/mock_listings';
import { HomeDeal } from '../types/schema';

export interface UserPreferences {
  countyId: string;
  countyName: string;
  subCountyId?: string;
  subCountyName?: string;
  areaId?: string;
  areaName?: string;
  locationId?: string;
  locationName: string;
  intent?: string;
  claimedDealId?: string;
}

interface WelcomeLocationModalProps {
  onComplete?: (prefs: UserPreferences) => void;
}

export default function WelcomeLocationModal({ onComplete }: WelcomeLocationModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Geographic Selection State
  const [selectedCountyId, setSelectedCountyId] = useState<string>('nairobi');
  const [selectedSubCountyId, setSelectedSubCountyId] = useState<string>('westlands');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('kilimani');

  // Search input for quick auto-complete
  const [globalQuery, setGlobalQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FlatLocationItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Dropdown open states
  const [countyOpen, setCountyOpen] = useState<boolean>(false);
  const [subCountyOpen, setSubCountyOpen] = useState<boolean>(false);
  const [areaOpen, setAreaOpen] = useState<boolean>(false);

  // Dropdown filter queries
  const [countyFilter, setCountyFilter] = useState<string>('');
  const [subCountyFilter, setSubCountyFilter] = useState<string>('');
  const [areaFilter, setAreaFilter] = useState<string>('');

  // Refs for outside click handling
  const countyRef = useRef<HTMLDivElement>(null);
  const subCountyRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Top sponsored deals for today
  const sponsoredDeals = useMemo(() => {
    return SAMPLE_KENYAN_DEALS
      .filter((d) => d.duration_type === 'today')
      .slice(0, 3);
  }, []);

  // Check if first-time visitor or triggered via event
  useEffect(() => {
    const saved = localStorage.getItem('homeduka_preferences_set');
    const savedCounty = localStorage.getItem('homeduka_county_id');
    const savedSubCounty = localStorage.getItem('homeduka_subcounty_id');
    const savedArea = localStorage.getItem('homeduka_area_id');

    if (savedCounty) setSelectedCountyId(savedCounty);
    if (savedSubCounty) setSelectedSubCountyId(savedSubCounty);
    if (savedArea) setSelectedAreaId(savedArea);

    if (!saved) {
      // First visit: small delay for smooth mount
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Listen for manual re-open requests (e.g. clicking header location pill)
    const handleReopen = () => setIsOpen(true);
    window.addEventListener('open-location-modal', handleReopen);
    return () => window.removeEventListener('open-location-modal', handleReopen);
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle outside clicks to close dropdown menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countyRef.current && !countyRef.current.contains(event.target as Node)) {
        setCountyOpen(false);
      }
      if (subCountyRef.current && !subCountyRef.current.contains(event.target as Node)) {
        setSubCountyOpen(false);
      }
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setAreaOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle global search input
  const handleGlobalSearchChange = (val: string) => {
    setGlobalQuery(val);
    if (val.trim().length >= 2) {
      const results = searchLocations(val, 6);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Select an item from global instant search
  const handleSelectSearchResult = (item: FlatLocationItem) => {
    setSelectedCountyId(item.countyId);
    setSelectedSubCountyId(item.subCountyId);
    setSelectedAreaId(item.areaId);
    setGlobalQuery('');
    setIsSearching(false);
  };

  // Current selected objects
  const currentCounty = useMemo(() => {
    return KENYAN_COUNTIES.find((c) => c.id === selectedCountyId) || KENYAN_COUNTIES[0];
  }, [selectedCountyId]);

  const availableSubCounties = useMemo(() => {
    return currentCounty.subCounties || [];
  }, [currentCounty]);

  const currentSubCounty = useMemo(() => {
    return availableSubCounties.find((s) => s.id === selectedSubCountyId) || availableSubCounties[0] || null;
  }, [availableSubCounties, selectedSubCountyId]);

  const availableAreas = useMemo(() => {
    return currentSubCounty ? currentSubCounty.areas : [];
  }, [currentSubCounty]);

  const currentArea = useMemo(() => {
    if (!currentSubCounty) return null;
    return availableAreas.find((a) => a.id === selectedAreaId) || availableAreas[0] || null;
  }, [availableAreas, selectedAreaId]);

  // Handle County Change
  const handleCountyChange = (countyId: string) => {
    setSelectedCountyId(countyId);
    setCountyOpen(false);
    setCountyFilter('');
    const county = KENYAN_COUNTIES.find((c) => c.id === countyId);
    if (county && county.subCounties.length > 0) {
      const firstSub = county.subCounties[0];
      setSelectedSubCountyId(firstSub.id);
      if (firstSub.areas.length > 0) {
        setSelectedAreaId(firstSub.areas[0].id);
      }
    }
  };

  // Handle SubCounty Change
  const handleSubCountyChange = (subCountyId: string) => {
    setSelectedSubCountyId(subCountyId);
    setSubCountyOpen(false);
    setSubCountyFilter('');
    const sub = availableSubCounties.find((s) => s.id === subCountyId);
    if (sub && sub.areas.length > 0) {
      setSelectedAreaId(sub.areas[0].id);
    }
  };

  // Handle Area Change
  const handleAreaChange = (areaId: string) => {
    setSelectedAreaId(areaId);
    setAreaOpen(false);
    setAreaFilter('');
  };

  // Construct readable location label
  const resolvedLocationLabel = useMemo(() => {
    if (currentArea && currentSubCounty) {
      return `${currentArea.name}, ${currentSubCounty.name.split(' (')[0]}`;
    }
    if (currentSubCounty) {
      return `${currentSubCounty.name}, ${currentCounty.name}`;
    }
    return `${currentCounty.name} County`;
  }, [currentArea, currentSubCounty, currentCounty]);

  const saveAndBroadcastPreferences = (claimedDealId?: string) => {
    const prefs: UserPreferences = {
      countyId: selectedCountyId,
      countyName: currentCounty.name,
      subCountyId: currentSubCounty?.id,
      subCountyName: currentSubCounty?.name,
      areaId: currentArea?.id,
      areaName: currentArea?.name,
      locationId: selectedCountyId,
      locationName: resolvedLocationLabel,
      claimedDealId
    };

    localStorage.setItem('homeduka_preferences_set', 'true');
    localStorage.setItem('homeduka_location_label', resolvedLocationLabel);
    localStorage.setItem('homeduka_county_id', selectedCountyId);
    if (currentSubCounty) localStorage.setItem('homeduka_subcounty_id', currentSubCounty.id);
    if (currentArea) localStorage.setItem('homeduka_area_id', currentArea.id);

    // Dispatch global event for Header and Hero to reactively update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('homeduka-location-changed', {
          detail: {
            locationLabel: resolvedLocationLabel,
            countyId: selectedCountyId,
            subCountyId: currentSubCounty?.id,
            areaId: currentArea?.id
          }
        })
      );
    }

    if (onComplete) {
      onComplete(prefs);
    }

    setIsOpen(false);
  };

  const handleApplyLocation = () => {
    saveAndBroadcastPreferences();
  };

  const handleClaimSponsoredDeal = (deal: HomeDeal) => {
    saveAndBroadcastPreferences(deal.id);
    router.push(`/deals#${deal.slug}`);
  };

  const handleDismiss = () => {
    saveAndBroadcastPreferences();
  };

  if (!isOpen) return null;

  // Filtered lists for searchable dropdowns
  const filteredCounties = KENYAN_COUNTIES.filter((c) =>
    c.name.toLowerCase().includes(countyFilter.toLowerCase().trim())
  );

  const filteredSubCounties = availableSubCounties.filter((s) =>
    s.name.toLowerCase().includes(subCountyFilter.toLowerCase().trim())
  );

  const filteredAreas = availableAreas.filter((a) =>
    a.name.toLowerCase().includes(areaFilter.toLowerCase().trim())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* 1. Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* 2. Simplified Modal Card (2-Column Desktop Grid) */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition cursor-pointer shadow-2xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* ============================================================
              LEFT COLUMN: SIMPLIFIED SEARCHABLE DROPDOWNS (COUNTY, SUBCOUNTY, AREA)
             ============================================================ */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Header Info */}
              <div className="flex items-center gap-3">
                <Logo variant="header" />
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-[#B45309]">
                  Kenya-Wide
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  Where are you shopping from?
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Choose your county and estate to see direct shop prices, verified fundis, and nearby options without clutter.
                </p>
              </div>

              {/* 1. GLOBAL INSTANT SEARCH AUTO-SUGGEST */}
              <div className="relative" ref={searchRef}>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Quick Search by Estate / Town</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={globalQuery}
                    onChange={(e) => handleGlobalSearchChange(e.target.value)}
                    placeholder="Type e.g. Kamakis, Kilimani, Ruaka, Nyali, Nakuru..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-transparent bg-stone-50/70"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  {globalQuery && (
                    <button 
                      onClick={() => { setGlobalQuery(''); setIsSearching(false); }}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Instant Auto-suggest Results Dropdown */}
                {isSearching && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-40 max-h-56 overflow-y-auto">
                    <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Matches found across Kenya:
                    </div>
                    {searchResults.map((res, idx) => (
                      <button
                        key={`${res.countyId}-${res.subCountyId}-${res.areaId}-${idx}`}
                        onClick={() => handleSelectSearchResult(res)}
                        className="w-full text-left px-3.5 py-2 hover:bg-amber-50 text-xs text-stone-800 hover:text-[#B45309] flex items-center justify-between transition cursor-pointer"
                      >
                        <span className="font-medium">
                          <strong>{res.areaName}</strong>, {res.subCountyName}
                        </span>
                        <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded font-semibold">
                          {res.countyName}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* DIVIDER OR SEARCHABLE DROPDOWNS */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-stone-200 w-full" />
                <span className="bg-white px-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest absolute">
                  Or select via dropdowns
                </span>
              </div>

              {/* 2. CASCADING SEARCHABLE DROPDOWNS */}
              <div className="space-y-3 pt-1">
                
                {/* 2A. COUNTY DROPDOWN */}
                <div className="relative" ref={countyRef}>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    1. County
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCountyOpen(!countyOpen);
                      setSubCountyOpen(false);
                      setAreaOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 text-xs sm:text-sm text-stone-800 font-medium transition cursor-pointer text-left shadow-2xs"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                      <strong>{currentCounty.name}</strong>
                    </span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </button>

                  {/* County Dropdown Popover */}
                  {countyOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 max-h-60 overflow-hidden flex flex-col">
                      <input
                        type="text"
                        value={countyFilter}
                        onChange={(e) => setCountyFilter(e.target.value)}
                        placeholder="Search county..."
                        className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs mb-1.5 focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                        autoFocus
                      />
                      <div className="overflow-y-auto max-h-48 space-y-0.5">
                        {filteredCounties.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleCountyChange(c.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                              c.id === selectedCountyId
                                ? 'bg-amber-100 text-[#B45309] font-bold'
                                : 'hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            <span>{c.name}</span>
                            {c.id === selectedCountyId && <Check className="w-3.5 h-3.5 text-[#B45309]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2B. SUB-COUNTY DROPDOWN */}
                <div className="relative" ref={subCountyRef}>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    2. Sub-County / Town
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setSubCountyOpen(!subCountyOpen);
                      setCountyOpen(false);
                      setAreaOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 text-xs sm:text-sm text-stone-800 font-medium transition cursor-pointer text-left shadow-2xs"
                  >
                    <span>
                      {currentSubCounty ? currentSubCounty.name : 'Select Sub-county'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </button>

                  {/* Sub-County Dropdown Popover */}
                  {subCountyOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 max-h-60 overflow-hidden flex flex-col">
                      <input
                        type="text"
                        value={subCountyFilter}
                        onChange={(e) => setSubCountyFilter(e.target.value)}
                        placeholder="Search sub-county / town..."
                        className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs mb-1.5 focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                        autoFocus
                      />
                      <div className="overflow-y-auto max-h-48 space-y-0.5">
                        {filteredSubCounties.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => handleSubCountyChange(s.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                              s.id === selectedSubCountyId
                                ? 'bg-amber-100 text-[#B45309] font-bold'
                                : 'hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            <span>{s.name}</span>
                            {s.id === selectedSubCountyId && <Check className="w-3.5 h-3.5 text-[#B45309]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2C. AREA / ESTATE / MICRO-REGION DROPDOWN */}
                <div className="relative" ref={areaRef}>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    3. Area / Estate / Ward
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAreaOpen(!areaOpen);
                      setCountyOpen(false);
                      setSubCountyOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 text-xs sm:text-sm text-stone-800 font-medium transition cursor-pointer text-left shadow-2xs"
                  >
                    <span className="font-bold text-[#B45309]">
                      {currentArea ? currentArea.name : 'Select Area / Estate'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </button>

                  {/* Area Dropdown Popover */}
                  {areaOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 max-h-60 overflow-hidden flex flex-col">
                      <input
                        type="text"
                        value={areaFilter}
                        onChange={(e) => setAreaFilter(e.target.value)}
                        placeholder="Search area / estate..."
                        className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs mb-1.5 focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                        autoFocus
                      />
                      <div className="overflow-y-auto max-h-48 space-y-0.5">
                        {filteredAreas.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => handleAreaChange(a.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                              a.id === selectedAreaId
                                ? 'bg-amber-100 text-[#B45309] font-bold'
                                : 'hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            <span>{a.name}</span>
                            {a.id === selectedAreaId && <Check className="w-3.5 h-3.5 text-[#B45309]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Resolved Location Badge */}
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span className="text-xs text-stone-700">
                    Shopping from: <strong className="text-stone-900">{resolvedLocationLabel}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-2xs">
                  Active
                </span>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
              <button
                type="button"
                onClick={handleApplyLocation}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Save Location & Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-stone-400 hover:text-stone-600 font-medium underline decoration-dotted cursor-pointer py-1"
              >
                Skip for now (Browse All Kenya)
              </button>
            </div>

          </div>

          {/* ============================================================
              RIGHT COLUMN: TOP DEALS TODAY (HOMEDUKA SPONSORED)
             ============================================================ */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-50/70 via-stone-50 to-amber-100/40 p-6 sm:p-7 border-t lg:border-t-0 lg:border-l border-amber-100 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Sponsored Deals Section Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#B45309] text-[10px] font-black uppercase tracking-wider border border-amber-500/30 mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#B45309]" />
                  <span>HomeDuka Sponsored</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>Today&apos;s Top Deals</span>
                  </h3>
                  <span className="text-[10px] font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    24H Slashes
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Limited sponsored price cuts directly from verified shops. Claim before midnight:
                </p>
              </div>

              {/* Deal Cards List */}
              <div className="space-y-2.5">
                {sponsoredDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition group relative overflow-hidden flex gap-3 items-center"
                  >
                    {/* Thumbnail Image with Discount Badge */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-1 left-1 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                        -{deal.discount_percentage}%
                      </span>
                    </div>

                    {/* Deal Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-amber-700 uppercase tracking-wider">
                        <span>⭐ Sponsored</span>
                        {deal.slots_left && (
                          <span className="text-stone-400">• {deal.slots_left} left</span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-[#B45309] transition">
                        {deal.title}
                      </h4>

                      <div className="flex items-baseline gap-2">
                        <span className="text-xs sm:text-sm font-black text-stone-900">
                          KSh {deal.deal_price_kes.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-400 line-through">
                          KSh {deal.original_price_kes.toLocaleString()}
                        </span>
                      </div>

                      {/* Claim Button */}
                      <button
                        onClick={() => handleClaimSponsoredDeal(deal)}
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#B45309] hover:text-[#92400E] cursor-pointer pt-0.5 group-hover:underline"
                      >
                        <span>Claim Deal</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Link to Full Deals Hub */}
            <div className="pt-4 border-t border-amber-200/60 mt-4 text-center">
              <Link
                href="/deals"
                onClick={() => handleDismiss()}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-[#B45309] font-bold text-xs transition border border-amber-500/30"
              >
                <Flame className="w-3.5 h-3.5 text-rose-600" />
                <span>View All Today&apos;s Deals ({SAMPLE_KENYAN_DEALS.length}) →</span>
              </Link>
              <p className="text-[10px] text-stone-400 mt-1">
                Prices slashed directly by sellers. Verified M-Pesa Tills.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
