'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MASTER_PRODUCT_CATEGORIES, 
  MasterCategoryDef, 
  SubCategoryDef 
} from '../data/kenyan_taxonomy';
import { 
  Search, ArrowRight, Sparkles, ChevronRight, CheckCircle2, 
  TrendingUp, ShieldCheck, Tag, X
} from 'lucide-react';

interface SokoMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId?: string;
}

export default function SokoMegaMenu({ isOpen, onClose, initialCategoryId }: SokoMegaMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    initialCategoryId || MASTER_PRODUCT_CATEGORIES[0].id
  );
  const [filterQuery, setFilterQuery] = useState<string>('');

  // Active Master Category
  const activeMasterCategory = useMemo(() => {
    return MASTER_PRODUCT_CATEGORIES.find(c => c.id === activeCategoryId) || MASTER_PRODUCT_CATEGORIES[0];
  }, [activeCategoryId]);

  // If user types in search query, search across all 48 subcategories
  const searchResults = useMemo(() => {
    if (!filterQuery.trim()) return null;
    const q = filterQuery.toLowerCase().trim();
    const results: { master: MasterCategoryDef; sub: SubCategoryDef }[] = [];

    for (const master of MASTER_PRODUCT_CATEGORIES) {
      for (const sub of master.subcategories) {
        const matchTitle = sub.name.toLowerCase().includes(q);
        const matchDesc = sub.description.toLowerCase().includes(q);
        const matchSearches = sub.popularSearches.some(s => s.toLowerCase().includes(q));
        if (matchTitle || matchDesc || matchSearches) {
          results.push({ master, sub });
        }
      }
    }
    return results;
  }, [filterQuery]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-full mt-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50 animate-fade-in"
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Top Header: Fast Search & Clear Guarantee */}
        <div className="bg-stone-50/90 px-6 py-3.5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-stone-900">
              The Kenyan Soko • 9 Master Verticals & 48 Distinct Categories
            </span>
            <span className="hidden sm:inline-block text-[11px] text-stone-500">
              (Direct Seller Prices • 0% Commission • Verified Till / Paybill)
            </span>
          </div>

          {/* Quick Subcategory Filter */}
          <div className="relative flex items-center min-w-[280px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter categories (e.g. cement, gas, seeds)..."
              className="w-full pl-8 pr-7 py-1.5 rounded-full bg-white text-xs border border-stone-200 focus:outline-hidden focus:border-stone-400 text-stone-800 placeholder:text-stone-400"
            />
            {filterQuery && (
              <button 
                onClick={() => setFilterQuery('')}
                className="absolute right-2.5 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Mode */}
        {searchResults !== null ? (
          <div className="p-6 max-h-[520px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-600">
                Found {searchResults.length} matching categories for &quot;<strong className="text-stone-900">{filterQuery}</strong>&quot;
              </span>
              <button
                onClick={() => setFilterQuery('')}
                className="text-xs font-bold text-[#B45309] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                <p className="font-semibold text-stone-700">No categories found matching &quot;{filterQuery}&quot;</p>
                <p className="mt-1">Try keywords like &quot;gas&quot;, &quot;cement&quot;, &quot;seeds&quot;, &quot;tyres&quot;, &quot;phones&quot;, &quot;sofa&quot;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map(({ master, sub }) => (
                  <Link
                    key={`${master.id}-${sub.id}`}
                    href={`/soko/${master.id}?sub=${sub.id}`}
                    onClick={onClose}
                    className="p-3.5 rounded-2xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xl">{sub.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                          {master.shortName}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#B45309] transition">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-[#B45309]">
                      <span>Browse Products</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal 2-Column Mega Menu */
          <div className="grid grid-cols-12 min-h-[480px]">
            
            {/* Left Sidebar: 9 Master Verticals */}
            <div className="col-span-4 lg:col-span-3 bg-stone-50/70 border-r border-stone-200/80 p-3 space-y-1 overflow-y-auto max-h-[540px]">
              <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-stone-400">
                Master Product Verticals
              </div>
              {MASTER_PRODUCT_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryId(cat.id)}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between gap-2 transition cursor-pointer text-xs font-bold ${
                      isActive 
                        ? 'bg-white text-stone-900 shadow-xs border border-stone-200' 
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base shrink-0">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-[#B45309] translate-x-0.5' : 'text-stone-400'
                    }`} />
                  </button>
                );
              })}

              {/* Bottom Monetization Callout */}
              <div className="pt-3 mt-2 border-t border-stone-200 px-2">
                <Link
                  href="/sell"
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 transition text-left group"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Sell on Kenyan Soko</span>
                  </div>
                  <p className="text-[10px] text-amber-800/90 mt-1 leading-snug">
                    Post free ads. Option to Sponsor & Boost to #1 spot. 0% cuts.
                  </p>
                </Link>
              </div>
            </div>

            {/* Right Pane: Active Master Category's Granular Subcategories */}
            <div className="col-span-8 lg:col-span-9 p-6 overflow-y-auto max-h-[540px] flex flex-col justify-between">
              <div>
                {/* Master Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activeMasterCategory.icon}</span>
                      <h3 className="text-base font-extrabold text-stone-900 tracking-tight">
                        {activeMasterCategory.name}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 font-medium">
                      {activeMasterCategory.tagline}
                    </p>
                  </div>

                  <Link
                    href={`/soko/${activeMasterCategory.id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs"
                  >
                    <span>Browse All in {activeMasterCategory.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {activeMasterCategory.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-2xl bg-stone-50/60 hover:bg-white border border-stone-200/70 hover:border-stone-300 transition-all shadow-2xs hover:shadow-xs group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg p-1 rounded-lg bg-white border border-stone-200/80 group-hover:scale-110 transition shrink-0">
                            {sub.icon}
                          </span>
                          <Link
                            href={`/soko/${activeMasterCategory.id}?sub=${sub.id}`}
                            onClick={onClose}
                            className="text-xs font-bold text-stone-900 group-hover:text-[#B45309] transition leading-snug"
                          >
                            {sub.name}
                          </Link>
                        </div>
                        
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed mt-1">
                          {sub.description}
                        </p>
                      </div>

                      {/* Popular Search Badges */}
                      <div className="mt-3 pt-2 border-t border-stone-200/60">
                        <div className="text-[10px] text-stone-400 font-semibold mb-1">Popular searches:</div>
                        <div className="flex flex-wrap gap-1">
                          {sub.popularSearches.slice(0, 2).map((query, qIdx) => (
                            <Link
                              key={qIdx}
                              href={`/soko/${activeMasterCategory.id}?search=${encodeURIComponent(query)}`}
                              onClick={onClose}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200/80 transition"
                            >
                              {query}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Bar for Category Hub */}
              <div className="mt-6 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>All vendors in {activeMasterCategory.shortName} have physical locations & verified M-Pesa Tills</span>
                </div>
                <Link
                  href={`/soko/${activeMasterCategory.id}`}
                  onClick={onClose}
                  className="font-bold text-[#B45309] hover:underline inline-flex items-center gap-1"
                >
                  <span>View all {activeMasterCategory.subcategories.length} subcategories</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
