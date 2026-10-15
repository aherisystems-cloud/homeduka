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
    <main className="min-h-screen bg-[#FAF9F6] py-10 sm:py-16 px-6 sm:px-10 lg:px-12 xl:px-16">
      <div className="max-w-3xl mx-auto space-y-8">
        
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
            Delivered by a <strong>boda rider, errands person, Pickup Mtaani agent, matatu driver, or lorry</strong>? Do not rush to pay. Follow these simple steps to protect your money.
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

          {/* Quick Rules by Delivery Means */}
          <div className="pt-2 space-y-3">
            <h3 className="text-sm font-extrabold text-stone-900">
              How to Inspect by Delivery Means:
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">🛵 Boda Boda Riders:</span>
                <p className="text-stone-600">
                  Ask the rider to wait 1 minute. Open the box, check that taps, lights, or tools are complete before sending fare/payment.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">📦 Pickup Mtaani Agents:</span>
                <p className="text-stone-600">
                  Open the parcel right inside the agent shop at the counter. Inspect your item before giving your pickup code.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">🏃 Errands People (Hand Delivery):</span>
                <p className="text-stone-600">
                  Confirm the runner brought the exact item, color, and shop receipt before paying their runner fee.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">🚐 Matatu Drivers / Conductors (Stage Drop):</span>
                <p className="text-stone-600">
                  Meet the matatu at your stage (e.g. Thika Rd, Waiyaki Way, Ngong Rd). Check that the parcel is safe before the matatu leaves.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 sm:col-span-2">
                <span className="font-bold text-stone-900 block">🚚 Lorries & Pickup Trucks (Heavy Furniture):</span>
                <p className="text-stone-600">
                  Walk all around heavy sofas, beds, or wardrobes while the lorry is at your gate. Check for rope scratches and broken corners.
                </p>
              </div>
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
