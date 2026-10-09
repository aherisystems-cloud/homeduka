'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, Calendar, ChevronLeft, ChevronRight, MessageSquare, 
  Clock, ArrowRight, Sparkles, RefreshCw 
} from 'lucide-react';
import { SAMPLE_KENYAN_DEALS, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { HomeDeal } from '../types/schema';

export default function TodayDealsCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dealType, setDealType] = useState<'daily' | 'monthly'>('daily');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Filter deals based on reader selection
  const dailyDeals = SAMPLE_KENYAN_DEALS.filter((d) => d.duration_type === 'today');
  const monthlyDeals = SAMPLE_KENYAN_DEALS.filter((d) => d.duration_type === 'month');
  const activeDeals = dealType === 'daily' ? dailyDeals : monthlyDeals;

  // Countdown timer to midnight EAT (Kenya Time) for daily flash deals
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

  const handleToggleDealType = (type: 'daily' | 'monthly') => {
    setDealType(type);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (activeDeals.length === 0) return null;

  return (
    <section className="space-y-6 pt-2 pb-6">
      {/* 1. Header with Reader Toggle (Daily vs Monthly), Timer, View All and Carousel Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {/* Reader Choice Switcher (Daily vs Monthly) */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => handleToggleDealType('daily')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                dealType === 'daily'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${dealType === 'daily' ? 'text-rose-400' : 'text-stone-500'}`} />
              <span>Today&apos;s Flash Deals ({dailyDeals.length})</span>
            </button>

            <button
              onClick={() => handleToggleDealType('monthly')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                dealType === 'monthly'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${dealType === 'monthly' ? 'text-[#B45309]' : 'text-stone-500'}`} />
              <span>Monthly Deals & Refills ({monthlyDeals.length})</span>
            </button>
          </div>

          {/* Dynamic Context Badge */}
          {dealType === 'daily' ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>24H Flash Price Slashes</span>
              <span className="hidden sm:inline-block text-rose-300">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700">
                <Clock className="w-3 h-3 text-rose-600" />
                <span>Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Deals of the Month</span>
              <span className="hidden sm:inline-block text-stone-300">•</span>
              <span className="text-[11px] font-semibold text-stone-600">
                Curated monthly price drops & recurring home essentials
              </span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2.5">
            <span>{dealType === 'daily' ? "Today's Top Deals" : "Deals of the Month & Refills"}</span>
            <span className="text-xs sm:text-sm font-bold text-[#B45309] bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
              {dealType === 'daily' ? 'Verified 24H Slashes' : 'Monthly Savings'}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {dealType === 'daily'
              ? 'Sellers and fundis slash prices for today only. Direct deals on hardwood sofas, smart TVs, cookware, and emergency repairs.'
              : 'Extended monthly discounts on solid wood beds, solar water heaters, cookers, and scheduled home upkeep like tank cleaning and curtains.'}
          </p>
        </div>

        {/* Right side: View All + Carousel Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href={dealType === 'daily' ? '/deals?tab=today' : '/deals?tab=month'}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#B45309] border border-stone-200 text-xs font-bold transition shadow-2xs group"
          >
            <span>
              {dealType === 'daily'
                ? `View All Today's Deals (${dailyDeals.length})`
                : `View All Monthly Deals (${monthlyDeals.length})`}
            </span>
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
        {activeDeals.map((deal) => {
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
              className="snap-start min-w-[280px] sm:min-w-[320px] max-w-[330px] rounded-3xl bg-white border border-stone-200 hover:border-[#B45309] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden relative"
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
                      <Flame className="w-3 h-3 text-white" />
                      <span>-{deal.discount_percentage}% OFF</span>
                    </span>

                    {deal.is_sponsored ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#B45309] text-white shadow-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                        <span>SPONSORED</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-stone-800 shadow-xs">
                        {deal.duration_type === 'today' ? '24H Deal' : 'Monthly Deal'}
                      </span>
                    )}
                  </div>

                  {/* Urgent slots left indicator */}
                  {deal.slots_left && (
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-900/85 text-stone-200 backdrop-blur">
                      ⚡ Only {deal.slots_left} slots left
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] bg-stone-100 px-2 py-0.5 rounded border border-stone-200 inline-block mb-1">
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

              {/* Bottom Actions with Sleek Black WhatsApp Button */}
              <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={waUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </Link>

                <Link
                  href={`/deals#${deal.slug}`}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 hover:text-[#B45309] text-xs font-bold transition"
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
