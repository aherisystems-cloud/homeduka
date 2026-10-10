'use client';

import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export default function ComparisonDrawer() {
  const { items, removeFromCompare, clearCompare, openCompareModal } = useComparison();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-stone-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-stone-800 p-3 sm:p-4 flex items-center justify-between gap-3">
        {/* Left item previews */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-stone-800 text-xs font-bold text-stone-300">
            <Scale className="w-4 h-4 text-[#B45309]" />
            <span className="hidden sm:inline">Compare</span>
            <span className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded-full text-[11px] font-black">
              {items.length}/4
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative group shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-stone-800 border border-stone-700"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCompare(item.id);
                  }}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-rose-400"
                  title="Remove from compare"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={openCompareModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm transition shadow-xs active:scale-95"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
