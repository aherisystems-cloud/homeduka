'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { MONTHLY_RECURRING_HOME_SERVICES, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { RefreshCw, MessageSquare, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';

export default function MonthlyRecurringServices() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="recurring" className="space-y-6">
      {/* Section Header with View All & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs font-bold mb-2">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700 animate-spin-slow" />
            <span>Monthly Home Restock</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Monthly Restock & Routine Home Upkeep
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Never run out of cooking gas, drinking water, cleaning supplies, and clean tanks. Locked monthly rates.
          </p>
        </div>

        {/* Action Controls: View All + Prev/Next Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <Link
            href="/refills"
            className="text-xs font-bold text-emerald-900 hover:text-black bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-full transition cursor-pointer inline-flex items-center gap-1 border border-emerald-300/80"
          >
            <span>Monthly Restock Hub ({MONTHLY_RECURRING_HOME_SERVICES.length} Plans)</span>
            <ArrowRight className="w-3 h-3 text-emerald-700" />
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="Previous Refills"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="Next Refills"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Slider of Monthly Refill & Care Cards */}
      <div 
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-stone-200"
      >
        {MONTHLY_RECURRING_HOME_SERVICES.map((item) => {
          const provider = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === item.providerId);
          const waUrl = provider 
            ? generateWhatsAppLeadLink(provider, { itemOrServiceName: item.title, intent: 'service_inquiry' })
            : '#';

          return (
            <div
              key={item.id}
              className="w-72 sm:w-80 shrink-0 bg-white rounded-3xl p-5 border border-stone-200/90 hover:border-emerald-500/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group snap-start"
            >
              <div>
                {/* Icon & Frequency Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-3xl shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/70">
                    {item.frequency}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-sm sm:text-base text-stone-900 mb-2 leading-snug group-hover:text-emerald-900 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Price & Instant WhatsApp Booking */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-semibold text-stone-400 block uppercase tracking-wider">
                      Pricing
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                      {item.priceEstimate}
                    </span>
                  </div>
                  {provider && (
                    <span className="text-[10px] text-stone-500 font-medium truncate max-w-[120px]">
                      By {provider.business_name}
                    </span>
                  )}
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition active:scale-95 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Order Refill on WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
