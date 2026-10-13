'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, Search, Tag, AlertTriangle, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, PhoneCall 
} from 'lucide-react';
import { NAIROBI_FAIR_PRICES, FairPriceItem } from '../data/nairobi_guides';

interface FairPriceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function FairPriceGuideModal({
  isOpen,
  onClose,
  initialCategory
}: FairPriceGuideModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['All', 'Furniture', 'Kitchen & Storage', 'Fundis & Repairs', 'Building Materials'];

  const filteredItems = NAIROBI_FAIR_PRICES.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) {
      return false;
    }
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.goodQuality.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Grade 4/5 English */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B45309] text-white text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nairobi Fair Price Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              What Should It Really Cost?
            </h2>
            <p className="text-xs text-stone-300">
              Real workshop prices in Nairobi. Never get cheated by fake low prices.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Quick Category Filters */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bed, sofa, plumber, paint, kitchen..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Cards List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs hover:shadow-sm transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="text-base font-extrabold text-stone-900">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {item.unit}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-stone-500 block font-medium">Fair Shop Price:</span>
                    <span className="text-base sm:text-lg font-black text-stone-900">
                      {item.fairPrice}
                    </span>
                  </div>
                </div>

                {/* Grade 4/5 Good Quality Rule */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">What Good Quality Looks Like: </strong>
                    <span>{item.goodQuality}</span>
                  </div>
                </div>

                {/* Grade 4/5 Red Flag Warning */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Cheap Trap Warning: </strong>
                    <span>{item.warningNote}</span>
                  </div>
                </div>

                {/* Action button: View Verified Listings */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">
                    Verified Kenyan Workshops Only
                  </span>
                  <Link
                    href={`/?q=${item.searchTag}#products`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-2xs"
                  >
                    <span>Find Shops Selling This</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-stone-500 text-sm">
              No price guide found for &quot;{searchTerm}&quot;. Try another search.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>Prices verified by Nairobi workshop visits.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
