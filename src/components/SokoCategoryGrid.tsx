'use client';

import React from 'react';
import Link from 'next/link';
import { MASTER_PRODUCT_CATEGORIES } from '../data/kenyan_taxonomy';
import { getMasterCategoryIcon } from './SokoMegaMenu';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SokoCategoryGrid() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Complete Product Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Browse by Master Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Select a vertical to view all distinct subcategories and direct verified shop listings.
          </p>
        </div>

        <Link
          href="/soko"
          className="text-xs font-bold text-stone-900 hover:underline inline-flex items-center gap-1"
        >
          <span>View All 48 Subcategories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 9-Box Grid with Monochromatic Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MASTER_PRODUCT_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 transition-all shadow-2xs hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              {/* Category Header with B&W Icon */}
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 shrink-0">
                  {getMasterCategoryIcon(cat.id, "w-5 h-5 text-stone-900")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-stone-900 transition leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    {cat.subcategories.length} Subcategories
                  </span>
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
                      href={`/soko/${cat.id}/${sub.id}`}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium transition"
                    >
                      {sub.name}
                    </Link>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <Link
                      href={`/soko/${cat.id}`}
                      className="text-[10px] px-2 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 font-bold transition"
                    >
                      +{cat.subcategories.length - 3} more
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                Verified Shops
              </span>
              <Link
                href={`/soko/${cat.id}`}
                className="text-xs font-bold text-stone-900 hover:underline inline-flex items-center gap-1 transition"
              >
                <span>Explore {cat.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
