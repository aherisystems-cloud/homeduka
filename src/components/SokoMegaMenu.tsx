'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MASTER_PRODUCT_CATEGORIES, 
  MasterCategoryDef, 
  SubCategoryDef 
} from '../data/kenyan_taxonomy';
import { 
  Search, ArrowRight, ChevronRight, X,
  Smartphone, Sofa, Hammer, Shirt, Car, Wheat, Heart, 
  ShoppingCart, BookOpen, Layers
} from 'lucide-react';

export function getMasterCategoryIcon(id: string, className = "w-4 h-4 text-stone-900") {
  switch (id) {
    case 'electronics_phones':
      return <Smartphone className={className} />;
    case 'home_kitchen_furniture':
      return <Sofa className={className} />;
    case 'hardware_building_electricals':
      return <Hammer className={className} />;
    case 'fashion_clothes_shoes':
      return <Shirt className={className} />;
    case 'vehicles_auto_spares':
      return <Car className={className} />;
    case 'farm_agriculture_agrovet':
      return <Wheat className={className} />;
    case 'health_beauty_personal_care':
      return <Heart className={className} />;
    case 'supermarket_food_gas':
      return <ShoppingCart className={className} />;
    case 'office_stationery_books':
      return <BookOpen className={className} />;
    default:
      return <Layers className={className} />;
  }
}

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

  // Search across all 48 subcategories
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
      className="absolute left-0 right-0 top-full mt-2 mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 z-50 animate-fade-in"
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
        
        {/* Simple, Non-Crowded Top Header */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-900 tracking-wide uppercase">
              Shop by Category
            </span>
            <span className="text-stone-300">|</span>
            <Link
              href="/soko"
              onClick={onClose}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline flex items-center gap-1"
            >
              <span>View All 9 Master Categories</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Quick Filter Box */}
          <div className="relative flex items-center min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Find category (e.g. cement, tyres, seeds)..."
              className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white text-xs border border-stone-200 focus:outline-hidden focus:border-stone-400 text-stone-900 placeholder:text-stone-400"
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
          <div className="p-6 max-h-[480px] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 text-xs text-stone-600 font-semibold">
              <span>{searchResults.length} matching categories for &quot;{filterQuery}&quot;</span>
              <button onClick={() => setFilterQuery('')} className="text-stone-900 hover:underline">
                Clear
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-10 text-center text-xs text-stone-500">
                No categories match &quot;{filterQuery}&quot;. Try terms like gas, cement, seeds, phones, tyres, beds.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map(({ master, sub }) => (
                  <Link
                    key={`${master.id}-${sub.id}`}
                    href={`/soko/${master.id}/${sub.id}`}
                    onClick={onClose}
                    className="p-3 rounded-xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition block"
                  >
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                      {master.name}
                    </div>
                    <div className="text-xs font-bold text-stone-900">
                      {sub.name}
                    </div>
                    <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {sub.description}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Clean 2-Pane Layout: Master Categories on Left, Subcategories on Right */
          <div className="grid grid-cols-12 min-h-[420px]">
            
            {/* Left Pane: Master Categories (Monochromatic, Clean) */}
            <div className="col-span-4 lg:col-span-3 bg-stone-50 border-r border-stone-200 p-2 space-y-0.5 overflow-y-auto max-h-[480px]">
              {MASTER_PRODUCT_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryId(cat.id)}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 text-xs font-semibold transition cursor-pointer ${
                      isActive 
                        ? 'bg-white text-stone-900 border border-stone-200 shadow-2xs font-bold' 
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="shrink-0">{getMasterCategoryIcon(cat.id, "w-4 h-4 text-stone-800")}</span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-stone-900' : 'text-stone-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Pane: Subcategories of the Active Master Vertical */}
            <div className="col-span-8 lg:col-span-9 p-6 overflow-y-auto max-h-[480px] flex flex-col justify-between">
              <div>
                {/* Active Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    {getMasterCategoryIcon(activeMasterCategory.id, "w-5 h-5 text-stone-900")}
                    <div>
                      <h3 className="text-sm font-extrabold text-stone-900">
                        {activeMasterCategory.name}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {activeMasterCategory.tagline}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/soko/${activeMasterCategory.id}`}
                    onClick={onClose}
                    className="text-xs font-bold text-stone-900 hover:underline flex items-center gap-1"
                  >
                    <span>Browse All in {activeMasterCategory.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Subcategories Grid: Clean, Monochromatic, Simple */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeMasterCategory.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/soko/${activeMasterCategory.id}/${sub.id}`}
                      onClick={onClose}
                      className="p-3 rounded-xl border border-stone-200/90 hover:border-stone-400 hover:bg-stone-50 transition group block"
                    >
                      <div className="text-xs font-bold text-stone-900 group-hover:text-stone-900">
                        {sub.name}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                        {sub.description}
                      </p>
                      <div className="mt-2 text-[10px] font-semibold text-stone-600 group-hover:text-stone-900 flex items-center gap-1">
                        <span>Explore products</span>
                        <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>All items from verified physical shops & suppliers across Kenya</span>
                <Link
                  href={`/soko/${activeMasterCategory.id}`}
                  onClick={onClose}
                  className="font-bold text-stone-900 hover:underline inline-flex items-center gap-1"
                >
                  <span>Open {activeMasterCategory.shortName} Hub</span>
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
