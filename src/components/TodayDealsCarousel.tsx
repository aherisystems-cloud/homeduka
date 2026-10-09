'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, Sparkles, ChevronLeft, ChevronRight, MessageSquare, 
  Clock, ArrowRight, ShieldCheck, Tag 
} from 'lucide-react';
import { SAMPLE_KENYAN_DEALS, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { HomeDeal } from '../types/schema';

export default function TodayDealsCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Today's deals only
  const todayDeals = SAMPLE_KENYAN_DEALS.filter((d) => d.duration_type === 'today');

  // Countdown timer to midnight EAT (Kenya Time)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (todayDeals.length === 0) return null;

  return (
    <section className="space-y-6 pt-2 pb-6">
      {/* 1. Header with Title, Timer, View All and Carousel Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>24H Flash Price Slashes</span>
            <span className="hidden sm:inline-block text-rose-300">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700">
              <Clock className="w-3 h-3 text-rose-600" />
              <span>Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2.5">
            <span>Today&apos;s Top Deals</span>
            <span className="text-xs sm:text-sm font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Verified Slashes
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Sellers and fundis slash prices for today only. Direct deals on hardwood sofas, smart TVs, cookware, and cleaning.
          </p>
        </div>

        {/* Right side: View All + Carousel Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-200 text-xs font-bold transition shadow-2xs group"
          >
            <span>View All Today&apos;s Deals ({todayDeals.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B45309] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="Previous Deals"
            >
              <ChevronLeft className="w-5 h-5 text-stone-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="Next Deals"
            >
              <ChevronRight className="w-5 h-5 text-stone-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Scrollable Carousel Cards */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {todayDeals.map((deal) => {
          const seller = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === deal.business_id);
          const savings = deal.original_price_kes - deal.deal_price_kes;

          const waText = encodeURIComponent(
            `Habari ${seller?.business_name || 'HomeDuka'}, nimeona deal ya "${deal.title}" ya KSh ${deal.deal_price_kes.toLocaleString()} (discount kutoka KSh ${deal.original_price_kes.toLocaleString()}) kwenye HomeDuka Deals. Bado iko available?`
          );
          const waUrl = seller
            ? `https://wa.me/${seller.contact.whatsapp_number}?text=${waText}`
            : '#';

          return (
            <div
              key={deal.id}
              className="snap-start min-w-[280px] sm:min-w-[320px] max-w-[330px] rounded-3xl bg-white border border-amber-200/90 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden relative"
            >
              <div>
                {/* Image & Discount Tags */}
                <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-600 text-white shadow-xs flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-300" />
                      <span>-{deal.discount_percentage}% OFF</span>
                    </span>

                    {deal.is_sponsored ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-stone-950 shadow-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-stone-950" />
                        <span>SPONSORED</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-stone-800 shadow-xs">
                        24H Deal
                      </span>
                    )}
                  </div>

                  {/* Urgent slots left indicator */}
                  {deal.slots_left && (
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/85 text-amber-300 backdrop-blur">
                      ⚡ Only {deal.slots_left} slots left
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mb-1">
                      {deal.badge_text}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#B45309] transition">
                      {deal.title}
                    </h3>
                  </div>

                  {/* Seller & Landmark */}
                  {seller && (
                    <div className="text-xs text-stone-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                      <span className="font-medium truncate">{seller.business_name}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500 truncate">{seller.location.neighborhood}</span>
                    </div>
                  )}

                  {/* Price Block */}
                  <div className="pt-1 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-stone-900">
                          KSh {deal.deal_price_kes.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          KSh {deal.original_price_kes.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700">
                        Save KSh {savings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={waUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </Link>

                <Link
                  href={`/deals#${deal.slug}`}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-[#B45309] text-xs font-bold transition"
                >
                  <span>View Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
