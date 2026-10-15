'use client';

import React from 'react';
import Link from 'next/link';
import MpesaTillVerifier from '../../components/MpesaTillVerifier';
import { ShieldCheck, ArrowLeft, Smartphone, CheckCircle } from 'lucide-react';

export default function VerifyTillPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16 px-6 sm:px-10 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Check Till, Paybill & Pochi</span>
        </div>

        {/* Hero Header - Plain Grade 4-6 English */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-md space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kenyan Buyer Safety Tool</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Check Any Shop Till, Paybill, or Pochi Before You Pay
          </h1>
          <p className="text-xs sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            Type the Till number, Paybill number, Pochi number, or business name below. We will show you the real registered business name and where their physical shop or yard is located.
          </p>
        </div>

        {/* Verifier Component */}
        <MpesaTillVerifier />

        {/* How Safaricom Verifies All 3 M-Pesa Accounts in Kenya */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] block">
              Clear & Simple Guide
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
              Are Paybills Also Verifiable Like Tills and Pochi?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              <strong>Yes, 100%!</strong> In Kenya, all three merchant payment channels are checked in real time by Safaricom before you enter your secret PIN:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-black text-[10px] uppercase">
                1. Buy Goods Till
              </span>
              <strong className="block text-stone-900 font-bold text-sm">
                5 to 7 Digits (Retail Shops)
              </strong>
              <p className="text-stone-600 leading-relaxed">
                Used by furniture yards, hardware shops, and local dukas. You pay zero extra fee. Safaricom shows the store name right on your phone.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-black text-[10px] uppercase">
                2. M-Pesa Paybill
              </span>
              <strong className="block text-stone-900 font-bold text-sm">
                Business No. + Account No.
              </strong>
              <p className="text-stone-600 leading-relaxed">
                Used by registered companies, large timber yards, solar suppliers, and water vendors. When you enter the Business Number, Safaricom immediately displays the official registered company name.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-black text-[10px] uppercase">
                3. Pochi La Biashara
              </span>
              <strong className="block text-stone-900 font-bold text-sm">
                10-Digit Mobile Sub-Wallet
              </strong>
              <p className="text-stone-600 leading-relaxed">
                Used by independent carpenters, plumbers, and delivery riders. Keeps business money safe from personal Fuliza loans. Safaricom shows the verified owner name upon initiating payment.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Simple Rules Before You Pay */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-5">
          <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2">
            3 Simple Safety Rules for Kenyan Homeowners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div className="space-y-1">
                <strong className="block text-stone-900 font-bold">Check the Name on Your Screen</strong>
                <p className="text-stone-600 text-xs leading-relaxed">
                  When you type the Till or Paybill number, Safaricom displays the registered business name. Confirm that it matches before you enter your secret PIN.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div className="space-y-1">
                <strong className="block text-stone-900 font-bold">For Ready Items: Pay When It Arrives</strong>
                <p className="text-stone-600 text-xs leading-relaxed">
                  If the item is already made in the shop, ask the seller to deliver to your gate first. Inspect the quality, then send the payment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div className="space-y-1">
                <strong className="block text-stone-900 font-bold">For Custom Work: Pay 30% Deposit</strong>
                <p className="text-stone-600 text-xs leading-relaxed">
                  If a carpenter is custom-building a 7-seater sofa or 6x6 bed, pay only 30% deposit for wood. Request progress photos on WhatsApp before paying the final balance.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
