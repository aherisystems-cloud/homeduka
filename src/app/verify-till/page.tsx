'use client';

import React from 'react';
import Link from 'next/link';
import MpesaTillVerifier from '../../components/MpesaTillVerifier';
import { ShieldCheck, ArrowLeft, Smartphone, CheckCircle } from 'lucide-react';

export default function VerifyTillPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Check Till & Pochi</span>
        </div>

        {/* Hero Header - Plain Grade 4-6 English */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kenyan Buyer Safety Tool</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Check Any Shop Till or Pochi Before You Pay
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
            Type the Till number, Pochi number, or shop name below. We will show you the real business name and where their physical workshop is located.
          </p>
        </div>

        {/* Verifier Component */}
        <MpesaTillVerifier />

        {/* 3 Simple Rules Before You Pay */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2">
            3 Simple Safety Rules for Homeowners
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div>
                <strong className="block text-stone-900">Check the Name on Your Screen</strong>
                <p className="text-stone-600 text-xs leading-relaxed">
                  When you type the Till number, Safaricom shows the shop name on your screen. Check that the name matches before entering your secret PIN.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div>
                <strong className="block text-stone-900">For Ready Items: Pay When It Arrives</strong>
                <p className="text-stone-600 text-xs leading-relaxed">
                  If the item is already made and in the shop, ask the seller to deliver to your house first, inspect it, then pay.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div>
                <strong className="block text-stone-900">For Custom Items: Pay 30% Deposit First</strong>
                <p className="text-stone-600 text-xs leading-relaxed">
                  If a carpenter is making a special sofa for your living room, pay only 30% deposit for wood. Ask for a photo of the wooden frame before paying the rest.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
