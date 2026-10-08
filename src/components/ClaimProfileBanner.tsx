'use client';

import React from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export default function ClaimProfileBanner() {
  return (
    <section className="bg-gradient-to-r from-stone-900 via-brand-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-900/40 shadow-sm relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
          <Store className="w-3.5 h-3.5" />
          <span>For Shop Owners, Service Providers & Fundis</span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
          Do you sell home products or offer home services in Kenya?
        </h2>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
          Reach thousands of homeowners across Nairobi, Kiambu, Mombasa, Nakuru, and all counties. Add your products, update prices, slash flash deals for 24 hours, and get direct customer inquiries on WhatsApp without broker cuts.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/portal/demo-token"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition active:scale-95 shadow-md"
          >
            <span>Sell / Add Product or Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="https://wa.me/254712345678?text=Habari%20HomeDuka,%20ninataka%20ku-list%20bidhaa%20au%20services%20zangu."
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp (+254 712 345 678)</span>
          </Link>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-amber-400 to-transparent pointer-events-none hidden md:block" />
    </section>
  );
}
