'use client';

import React from 'react';
import Link from 'next/link';
import { MASTER_PRODUCT_CATEGORIES } from '../data/kenyan_taxonomy';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function SokoCategoryGrid() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-bold mb-2">
            <Sparkles className="w-3 h-3 text-[#B45309]" />
            <span>UNAMBIGUOUS KENYAN DIRECT SOKO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Browse by Distinct Master Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Zero ambiguity. Click straight into the exact Kenyan goods you want with direct verified seller contacts.
          </p>
        </div>

        <Link
          href="/soko/electronics_phones"
          className="text-xs font-bold text-[#B45309] hover:underline inline-flex items-center gap-1"
        >
          <span>Explore All 48 Subcategories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 9-Box Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {MASTER_PRODUCT_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-3xl bg-white hover:bg-stone-50/80 border border-stone-200/90 hover:border-stone-300 transition-all shadow-2xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 rounded-2xl bg-stone-100 group-hover:scale-110 transition shrink-0">
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#B45309] transition leading-tight">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] font-bold text-stone-400 block mt-0.5">
                      {cat.subcategories.length} Distinct Subcategories
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed mb-3.5">
                {cat.tagline}
              </p>

              {/* Subcategory Pills */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/soko/${cat.id}?sub=${sub.id}`}
                      className="text-[11px] px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-amber-100/70 text-stone-700 hover:text-amber-950 font-medium transition"
                    >
                      {sub.icon} {sub.name}
                    </Link>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <Link
                      href={`/soko/${cat.id}`}
                      className="text-[10px] px-2 py-1 rounded-xl bg-stone-50 hover:bg-stone-200/80 text-stone-500 font-bold transition"
                    >
                      +{cat.subcategories.length - 3} more
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Sellers
              </span>
              <Link
                href={`/soko/${cat.id}`}
                className="text-xs font-bold text-stone-900 group-hover:text-[#B45309] inline-flex items-center gap-1 transition"
              >
                <span>Browse {cat.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
