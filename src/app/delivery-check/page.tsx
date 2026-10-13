import React from 'react';
import Link from 'next/link';
import { 
  Truck, ArrowLeft, CheckCircle2, ShieldCheck, 
  AlertTriangle, PhoneCall, ArrowRight 
} from 'lucide-react';

export const metadata = {
  title: 'Gate Delivery Inspection Checklist | HomeDuka Kenya',
  description: 'Simple 2-minute gate check for furniture delivery in Nairobi before you send M-Pesa to the driver.'
};

export default function DeliveryCheckPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Marketplace</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-xl border border-stone-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>2-Minute Gate Check</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Delivery Checklist Before You Pay
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            The lorry or boda has arrived at your gate? Do not rush to pay. Follow these 4 simple steps to protect your hard-earned money.
          </p>
        </div>

        {/* 4 Interactive Checks */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-stone-900">
            Check These 4 Things Now:
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <strong className="text-stone-900 font-bold">Check the Wood & Polish</strong>
              </div>
              <p className="text-stone-600 pl-8">
                Walk around the item. Look for scratches from transport rope or cracked corners. Touch the surface to make sure the paint or varnish is dry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-xs">
                  2
                </span>
                <strong className="text-stone-900 font-bold">Open and Close All Drawers & Doors</strong>
              </div>
              <p className="text-stone-600 pl-8">
                Pull every drawer out. Open every wardrobe door. Do they slide smoothly or do they get stuck? If it gets stuck, ask the driver to adjust it now.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <strong className="text-stone-900 font-bold">Check Color & Size</strong>
              </div>
              <p className="text-stone-600 pl-8">
                Is it the exact mahogany or oak shade you asked for? If it is a 6x6 bed, make sure your mattress will fit.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-xs">
                  4
                </span>
                <strong className="text-stone-900 font-bold">Push It Gently (No Wobble)</strong>
              </div>
              <p className="text-stone-600 pl-8">
                Put it flat on your floor. Does it shake or rock? All 4 legs must be level and firmly fixed.
              </p>
            </div>

          </div>

          {/* Golden Rules */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 text-xs">
            <strong className="block font-bold text-sm">
              ✅ If everything is good:
            </strong>
            <p>
              Pay the seller&apos;s verified Lipa na M-Pesa Till or Pochi. Check the business name matches on your screen before typing your PIN.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 text-xs">
            <strong className="block font-bold text-sm">
              ⚠️ If something is broken or wrong:
            </strong>
            <p>
              Do not send money yet. Take a quick photo on WhatsApp and send it to the shop owner immediately while the driver is still at your compound.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href="/verify-till"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-sm"
            >
              <span>Check Seller Till / Pochi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-bold transition"
            >
              Return to Home
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
