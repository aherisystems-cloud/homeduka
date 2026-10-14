'use client';

import React from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export default function ClaimProfileBanner() {
  return (
    <section className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-bold mb-3 border border-white/20">
          <Store className="w-3.5 h-3.5" />
          <span>For Shop Owners, Service Providers & Fundis</span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
          Sell products or offer fundi services?
        </h2>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
          List your shop, yard or trade free. Get direct WhatsApp client inquiries with zero broker fees.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/portal/demo-token"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-xs transition active:scale-95 shadow-md"
          >
            <span>List Your Business Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="https://wa.me/254712345678?text=Habari%20HomeDuka,%20ninataka%20ku-list%20bidhaa%20au%20services%20zangu."
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us to List</span>
          </Link>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-[#B45309]/20 to-transparent pointer-events-none hidden md:block" />
    </section>
  );
}
