import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, ArrowLeft, ShieldCheck, CheckCircle2, 
  AlertTriangle, ArrowRight, Tag, HelpCircle 
} from 'lucide-react';
import { NAIROBI_FAIR_PRICES } from '../../data/nairobi_guides';

export const metadata = {
  title: 'Nairobi Fair Price Guide | HomeDuka',
  description: 'Real shop and yard prices for furniture, timber, and fundis in Kenya. Plain English, countrywide delivery, zero scams.'
};

export default function FairPricesPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] py-10 sm:py-16 px-6 sm:px-10 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
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

        {/* Hero Section */}
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 text-white space-y-4 shadow-xl border border-stone-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B45309] text-white text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kenya Home Price Index</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            What Should It Really Cost in Kenya?
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            Real prices from genuine local shops and timber yards along Ngong Road, Gikomba, and Mombasa Road. Most established sellers deliver countrywide to Mombasa, Kisumu, Nakuru, Eldoret, Nyeri, and all towns.
          </p>

          <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
              <span className="block font-bold text-white">0% Hidden Fees</span>
              <span className="text-stone-400">Direct shop & yard rates</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700">
              <span className="block font-bold text-white">Verified Hardwood</span>
              <span className="text-stone-400">Mahogany & Mvule specs</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700 col-span-2 sm:col-span-1">
              <span className="block font-bold text-white">Fundi Daily Wages</span>
              <span className="text-stone-400">Fair labor price per day</span>
            </div>
          </div>
        </div>

        {/* 3 Simple Rules in Grade 4/5 English */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
            3 Simple Rules Before You Pay Any Fundi or Shop
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-black flex items-center justify-center text-xs">
                1
              </span>
              <strong className="block font-bold text-stone-900">If It Is Too Cheap, Be Careful</strong>
              <p className="text-stone-600">
                A hardwood 6x6 bed cannot cost Ksh 15,000. Timber and glue alone cost more than that. If it is super cheap, they used packing wood.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-black flex items-center justify-center text-xs">
                2
              </span>
              <strong className="block font-bold text-stone-900">Never Pay Full Cash First</strong>
              <p className="text-stone-600">
                For ready furniture, pay when it arrives at your door. For custom work, pay a small deposit for wood (30%), then pay the rest after checking it.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-black flex items-center justify-center text-xs">
                3
              </span>
              <strong className="block font-bold text-stone-900">Always Check the Till Name</strong>
              <p className="text-stone-600">
                Always send money to an official Lipa na M-Pesa Till or Pochi La Biashara. Never send to a private phone number you cannot trace.
              </p>
            </div>
          </div>
        </div>

        {/* Full Fair Price List */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Complete Nairobi Fair Price List
          </h2>

          <div className="grid gap-4">
            {NAIROBI_FAIR_PRICES.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4 hover:border-stone-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="text-lg font-extrabold text-stone-900">
                        {item.name}
                      </h3>
                      <span className="text-xs text-stone-500 font-medium">
                        {item.unit} • {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-0 border-stone-200">
                    <span className="text-xs text-stone-500 block font-medium">Fair Shop Price:</span>
                    <span className="text-lg sm:text-xl font-black text-stone-900">
                      {item.fairPrice}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Good Quality Signs: </strong>
                      <span>{item.goodQuality}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Cheap Trap Warning: </strong>
                      <span>{item.warningNote}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-stone-500">
                    Made by verified local shops and yards. Delivers countrywide via parcel or lorry.
                  </span>
                  <Link
                    href={`/?q=${item.searchTag}#products`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-2xs"
                  >
                    <span>Browse Verified Listings</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-8 rounded-3xl bg-stone-100 border border-stone-300 text-center space-y-4">
          <h3 className="text-lg font-bold text-stone-900">
            Have a question about a quote a fundi gave you?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            You can verify any till number on our M-Pesa Verifier or generate a 1-click official quotation sheet for free.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/verify-till"
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs"
            >
              Verify M-Pesa Till / Pochi
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold transition"
            >
              Back to Marketplace
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
