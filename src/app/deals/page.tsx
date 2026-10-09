'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Flame, Calendar, Sparkles, MessageSquare, ShieldCheck, 
  MapPin, Clock, ArrowRight, Tag, Percent, PlusCircle, CheckCircle2 
} from 'lucide-react';
import { SAMPLE_KENYAN_DEALS, SAMPLE_KENYAN_HOME_LISTINGS } from '../../data/mock_listings';
import { HomeDeal, DealDuration } from '../../types/schema';

function DealsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab: DealDuration = tabParam === 'month' ? 'month' : 'today';

  const [activeTab, setActiveTab] = useState<DealDuration>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Deals' },
    { id: 'furniture', label: '🛋️ Furniture' },
    { id: 'kitchen', label: '🍳 Kitchen & Cookware' },
    { id: 'electronics', label: '📱 TVs & Electronics' },
    { id: 'decor', label: '🪟 Curtains & Decor' },
    { id: 'services', label: '🔧 Fundis & Cleaning' }
  ];

  // Filter deals based on active tab (today vs month) and category
  const filteredDeals = SAMPLE_KENYAN_DEALS.filter((deal) => {
    if (deal.duration_type !== activeTab) return false;
    if (selectedCategory !== 'all' && deal.category !== selectedCategory) return false;
    return true;
  });

  const todayCount = SAMPLE_KENYAN_DEALS.filter((d) => d.duration_type === 'today').length;
  const monthCount = SAMPLE_KENYAN_DEALS.filter((d) => d.duration_type === 'month').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[85vh]">
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-10 text-white border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-bold mb-3 border border-white/10">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Verified Price Slashes • Direct From Kenyan Sellers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-2">
            HomeDuka <span className="text-[#B45309]">Deals</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
            Verified furniture shops, kitchenware stores, electronics dealers, and fundis slash their own prices for 24 hours or the whole month. Chat directly on WhatsApp to claim your discount before it expires.
          </p>

          {/* Tab Switcher: Today's Deals vs Deals of the Month */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 gap-1.5">
            <button
              onClick={() => setActiveTab('today')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'today'
                  ? 'bg-[#B45309] text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-300" />
              <span>Today&apos;s Deals ({todayCount})</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-black">
                24H Flash
              </span>
            </button>

            <button
              onClick={() => setActiveTab('month')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'month'
                  ? 'bg-[#B45309] text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Deals of the Month ({monthCount})</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-black">
                Monthly
              </span>
            </button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 bg-radial from-[#B45309]/30 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. TIME REMAINING BANNER FOR TODAY'S DEALS */}
      {activeTab === 'today' && (
        <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-800">
            <Clock className="w-4 h-4 text-[#B45309] shrink-0" />
            <span className="font-semibold">
              Today&apos;s flash deals expire tonight at <strong>11:59 PM</strong>. Prices reset back to normal tomorrow.
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#B45309] bg-stone-200 px-2.5 py-1 rounded-full">
            ⚡ First Come, First Served
          </span>
        </div>
      )}

      {/* 4. DEALS GRID */}
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const seller = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === deal.business_id);
            const waText = encodeURIComponent(
              `Habari ${seller?.business_name || 'HomeDuka'}, nimeona deal ya "${deal.title}" ya KSh ${deal.deal_price_kes.toLocaleString()} (discount kutoka KSh ${deal.original_price_kes.toLocaleString()}) kwenye HomeDuka Deals. Bado iko available?`
            );
            const waUrl = seller 
              ? `https://wa.me/${seller.contact.whatsapp_number}?text=${waText}`
              : '#';

            return (
              <div
                key={deal.id}
                id={deal.slug}
                className={`bg-white rounded-3xl border overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group scroll-mt-24 ${
                  deal.is_sponsored ? 'border-[#B45309] ring-2 ring-[#B45309]/20' : 'border-stone-200'
                }`}
              >
                <div>
                  {/* Deal Image + Badge Overlay */}
                  <div className="relative h-52 w-full bg-stone-900 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    {/* Top Deal Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-600 text-white shadow-xs flex items-center gap-1">
                          <Flame className="w-3 h-3 text-white" />
                          <span>-{deal.discount_percentage}% OFF</span>
                        </span>
                        {deal.is_sponsored && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#B45309] text-white shadow-xs flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-white" />
                            <span>SPONSORED</span>
                          </span>
                        )}
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur text-stone-900 shadow-xs">
                        {deal.duration_type === 'today' ? '⏱️ Today Only' : '📅 Month Deal'}
                      </span>
                    </div>

                    {/* Bottom Slots Remaining */}
                    {deal.slots_left && (
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-stone-200 backdrop-blur">
                        Only {deal.slots_left} slots left at this price
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] bg-stone-100 px-2 py-0.5 rounded border border-stone-200 inline-block mb-1">
                        {deal.badge_text}
                      </span>
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
                        {deal.title}
                      </h3>
                    </div>

                    {/* Seller Landmark Info */}
                    {seller && (
                      <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-stone-200/70 text-xs">
                        <Link 
                          href={`/shop/${seller.slug}`}
                          className="font-bold text-stone-900 hover:text-[#B45309] flex items-center gap-1 truncate"
                        >
                          <span>{seller.business_name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                        </Link>
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">{seller.location.neighborhood}, {seller.location.county}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slashed Pricing & Claim Button */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-2">
                  <div className="flex items-baseline justify-between mb-3 pt-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Slashed Price
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-emerald-800">
                          KSh {deal.deal_price_kes.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          KSh {deal.original_price_kes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save KSh {(deal.original_price_kes - deal.deal_price_kes).toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Claim Deal on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-500 text-xs">
          No deals found in this category right now. Check back soon or select another category!
        </div>
      )}

      {/* 5. SELLER CTA: SLASH YOUR PRICES HERE */}
      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] bg-stone-200 px-2 py-0.5 rounded">
            For Sellers & Fundis
          </span>
          <h3 className="text-lg font-black text-stone-900 mt-1">
            Want to post a deal or slash your prices?
          </h3>
          <p className="text-xs text-stone-600 mt-0.5 max-w-xl">
            You don&apos;t have to ask anyone. Go to your Seller Portal, click &quot;Create Price Drop Deal&quot;, set your deal price for 24 hours or for the month, and it will immediately appear on this deals page and get shared on our WhatsApp channel.
          </p>
        </div>

        <Link
          href="/portal/demo-token"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition shrink-0 shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>Open Seller Portal</span>
        </Link>
      </div>
    </div>
  );
}

export default function DealsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-xs text-stone-500">Loading verified deals...</div>}>
      <DealsContent />
    </Suspense>
  );
}
