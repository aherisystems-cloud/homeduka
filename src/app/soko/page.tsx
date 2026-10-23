'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MASTER_PRODUCT_CATEGORIES, 
  MasterCategoryDef 
} from '../../data/kenyan_taxonomy';
import { getMasterCategoryIcon } from '../../components/SokoMegaMenu';
import { 
  Search, ArrowRight, ShieldCheck, Sparkles, X, ChevronRight, Layers
} from 'lucide-react';

export default function AllCategoriesHubPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter master categories & subcategories
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return MASTER_PRODUCT_CATEGORIES;
    const q = searchQuery.toLowerCase().trim();

    return MASTER_PRODUCT_CATEGORIES.map(master => {
      const matchMaster = master.name.toLowerCase().includes(q) || master.tagline.toLowerCase().includes(q);
      const matchedSubs = master.subcategories.filter(sub => 
        sub.name.toLowerCase().includes(q) || 
        sub.description.toLowerCase().includes(q) ||
        sub.popularSearches.some(s => s.toLowerCase().includes(q))
      );

      if (matchMaster || matchedSubs.length > 0) {
        return {
          ...master,
          subcategories: matchMaster ? master.subcategories : matchedSubs
        };
      }
      return null;
    }).filter(Boolean) as MasterCategoryDef[];
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200 py-3 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-stone-900 transition">Home</Link>
            <span>/</span>
            <span className="text-stone-900 font-bold">All Categories Hub</span>
          </div>

          <Link
            href="/deals"
            className="text-stone-700 hover:text-stone-950 font-semibold"
          >
            Today&apos;s Hot Deals →
          </Link>
        </div>
      </div>

      {/* Main Header with Search */}
      <div className="bg-white border-b border-stone-200 py-10 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5 text-stone-700" />
              <span>THE KENYAN DIRECT SOKO • COMPLETE CATEGORY DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Start Shopping • All Product Categories
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
              Zero ambiguity. Browse 9 master verticals and 48 specific product categories directly from verified Kenyan shops.
            </p>
          </div>

          {/* Prominent Instant Search Box */}
          <div className="max-w-2xl relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 48 categories (e.g. cement, gas refill, laptop, seeds, tyres)..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-400 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Directory List */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-10 space-y-10">
        
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
            <span className="text-3xl block">🔍</span>
            <h3 className="text-sm font-bold text-stone-900">No categories found matching &quot;{searchQuery}&quot;</h3>
            <p className="text-xs text-stone-500">
              Try searching for common terms like phone, bed, cement, fertiliser, gas, or suit.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
            >
              Show All Categories
            </button>
          </div>
        ) : (
          filteredCategories.map((master) => (
            <section 
              key={master.id} 
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-5"
            >
              {/* Master Category Title & Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200">
                    {getMasterCategoryIcon(master.id, "w-5 h-5 text-stone-900")}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                      {master.name}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {master.tagline}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/soko/${master.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-2xs"
                >
                  <span>Browse All in {master.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {master.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/soko/${master.id}/${sub.id}`}
                    className="p-3.5 rounded-xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition group flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xs font-bold text-stone-900 group-hover:text-stone-900">
                        {sub.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-600 group-hover:text-stone-900">
                      <span>View Products</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}

      </div>

    </div>
  );
}
