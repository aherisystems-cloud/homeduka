'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, Search, CheckCircle2, AlertTriangle, 
  Smartphone, HelpCircle, Lock, ArrowRight, X, Sparkles, MapPin, Store 
} from 'lucide-react';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';

interface MpesaTillVerifierProps {
  initialSearch?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function MpesaTillVerifier({ 
  initialSearch = '', 
  isModal = false,
  onClose 
}: MpesaTillVerifierProps) {
  const [query, setQuery] = useState(initialSearch);
  const [hasSearched, setHasSearched] = useState(Boolean(initialSearch));

  // Search logic across till numbers, pochi numbers, and business names
  const cleanQuery = query.trim().toLowerCase().replace(/\s+/g, '');
  
  const matchedListing = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => {
    if (!cleanQuery) return false;
    const till = (b.commercial.mpesa_till_number || '').toLowerCase();
    const pochi = (b.commercial.mpesa_pochi_number || '').replace(/\s+/g, '').toLowerCase();
    const paybill = (b.commercial.mpesa_paybill_number || '').toLowerCase();
    const name = b.business_name.toLowerCase().replace(/\s+/g, '');
    const phone = b.contact.whatsapp_number.toLowerCase();

    return (
      till.includes(cleanQuery) ||
      pochi.includes(cleanQuery) ||
      paybill.includes(cleanQuery) ||
      name.includes(cleanQuery) ||
      phone.includes(cleanQuery)
    );
  });

  const handleQuickTest = (value: string) => {
    setQuery(value);
    setHasSearched(true);
  };

  return (
    <div className={`bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden ${isModal ? 'max-w-2xl w-full' : ''}`}>
      {/* Top Header */}
      <div className="p-5 sm:p-6 bg-[#FDFBF7] border-b border-stone-200 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-stone-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold mb-1">
              <span>Safe Pay Check</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
              M-Pesa Till & Pochi Checker
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Check if a Till or Pochi is real before sending any money.
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Search Input */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1.5">
            Type the Till Number, Pochi Number, or Shop Name:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 894211 or 0799 112 233 or WoodCraft"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHasSearched(true);
              }}
              className="w-full text-sm font-semibold p-3.5 pl-11 rounded-2xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Quick Demo Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs">
            <span className="text-[11px] font-bold text-stone-500">Try these real shops:</span>
            <button
              onClick={() => handleQuickTest('894211')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Till 894211 (Kamakis Furniture)
            </button>
            <button
              onClick={() => handleQuickTest('0799 112 233')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Pochi 0799 112 233 (Solar & Water)
            </button>
            <button
              onClick={() => handleQuickTest('761902')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Till 761902 (Kitchens)
            </button>
          </div>
        </div>

        {/* Results Area */}
        {hasSearched && query.trim() !== '' && (
          <div className="animate-in fade-in duration-200">
            {matchedListing ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        ✓ Verified Real Shop
                      </span>
                      <h3 className="text-base font-black text-stone-900 mt-1">
                        {matchedListing.business_name}
                      </h3>
                      <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>{matchedListing.location.landmark}, {matchedListing.location.neighborhood}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200">
                    Safe to Pay
                  </span>
                </div>

                {/* Account Details Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-emerald-100">
                  <div>
                    <span className="text-[11px] text-stone-500 block">Payment Method:</span>
                    <strong className="text-stone-900 text-sm">
                      {matchedListing.commercial.mpesa_till_number 
                        ? `Buy Goods Till: ${matchedListing.commercial.mpesa_till_number}`
                        : `Pochi La Biashara: ${matchedListing.commercial.mpesa_pochi_number}`
                      }
                    </strong>
                    <span className="text-[11px] text-emerald-700 block font-medium">
                      ✓ Zero extra fee for you when paying Buy Goods
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 block">Seller Payment Terms:</span>
                    <strong className="text-stone-900 text-sm">
                      {matchedListing.commercial.seller_terms_badge || "Pay When Delivered"}
                    </strong>
                    <span className="text-[11px] text-stone-500 block">
                      Agreed upfront before paying
                    </span>
                  </div>
                </div>

                {/* Simulated Phone Screen - Simple Grade 4 English */}
                <div className="p-3.5 rounded-xl bg-stone-900 text-white space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-300">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">What your phone screen will show:</span>
                  </div>
                  <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 font-mono text-xs text-emerald-400 space-y-1">
                    <p className="text-stone-300">Pay to:</p>
                    <p className="text-sm font-bold text-white tracking-wide">
                      {matchedListing.business_name.toUpperCase()}
                    </p>
                    <p className="text-stone-400 text-[11px]">
                      {matchedListing.commercial.mpesa_till_number 
                        ? `Till Number: ${matchedListing.commercial.mpesa_till_number}`
                        : `Pochi La Biashara: ${matchedListing.commercial.mpesa_pochi_number}`
                      }
                    </p>
                    <p className="text-[11px] text-amber-300 pt-1">
                      👉 Check that this name matches before you enter your PIN.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Not Yet in Our Verified Database</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  We have not checked this number yet. Here is how to stay safe:
                </p>
                <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1 font-medium">
                  <li>Ask the seller for their exact shop or yard landmark first.</li>
                  <li>Never send a deposit until you see the business name on your M-Pesa screen.</li>
                  <li>For ready goods, ask to pay when the item arrives at your house.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Plain Grade 4-6 English Safety Reassurance */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-xs sm:text-sm">
            <Lock className="w-4 h-4 text-[#B45309]" />
            <span>Is it safe to see Till and Pochi numbers in the open?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="block text-stone-900 mb-1">1. They Only Take Money In</strong>
              <p className="text-stone-600 leading-relaxed">
                A Till or Pochi number can only receive money. Nobody can ever take money out without the owner&apos;s secret SIM card and secret PIN.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="block text-stone-900 mb-1">2. Painted on Every Real Shop</strong>
              <p className="text-stone-600 leading-relaxed">
                Supermarkets, petrol stations, and local shops paint their Tills on walls and signs so buyers can pay easily. It is public by design.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="block text-stone-900 mb-1">3. Scammers Fear Public Tills</strong>
              <p className="text-stone-600 leading-relaxed">
                Scammers only use personal numbers so they can hide. A real shop displays their Till openly because they have nothing to hide.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
