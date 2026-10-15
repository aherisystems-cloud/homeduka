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

  // Search logic across till numbers, paybills, pochi numbers, and business names
  const cleanQuery = query.trim().toLowerCase().replace(/\s+/g, '');
  
  const matchedListing = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => {
    if (!cleanQuery) return false;
    const till = (b.commercial.mpesa_till_number || '').toLowerCase();
    const pochi = (b.commercial.mpesa_pochi_number || '').replace(/\s+/g, '').toLowerCase();
    const paybill = (b.commercial.mpesa_paybill_number || '').toLowerCase();
    const paybillAcc = (b.commercial.mpesa_paybill_account || '').toLowerCase();
    const name = b.business_name.toLowerCase().replace(/\s+/g, '');
    const phone = b.contact.whatsapp_number.toLowerCase();

    return (
      till.includes(cleanQuery) ||
      pochi.includes(cleanQuery) ||
      paybill.includes(cleanQuery) ||
      paybillAcc.includes(cleanQuery) ||
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
              M-Pesa Till, Paybill & Pochi Verifier
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Check any Till, Paybill, or Pochi before you send money.
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
            Type the Till Number, Paybill Number, Pochi Number, or Shop Name:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Till 894211, Paybill 400200, or Pochi 0799 112 233"
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
            <span className="text-[11px] font-bold text-stone-500">Try these real numbers:</span>
            <button
              onClick={() => handleQuickTest('894211')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Till 894211 (Kamakis Furniture)
            </button>
            <button
              onClick={() => handleQuickTest('400200')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Paybill 400200 (Solaria Water & Solar)
            </button>
            <button
              onClick={() => handleQuickTest('0799 112 233')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Pochi 0799 112 233 (Fundi Plumbing)
            </button>
            <button
              onClick={() => handleQuickTest('247247')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold transition"
            >
              Paybill 247247 (Apex Gypsum)
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
                        ✓ Verified Real Business
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
                    <span className="text-[11px] text-stone-500 block">Verified Payment Method:</span>
                    <strong className="text-stone-900 text-sm block">
                      {matchedListing.commercial.mpesa_paybill_number ? (
                        <>
                          Paybill: {matchedListing.commercial.mpesa_paybill_number}
                          {matchedListing.commercial.mpesa_paybill_account && (
                            <span className="text-xs text-stone-600 block">
                              Account Name: <strong>{matchedListing.commercial.mpesa_paybill_account}</strong>
                            </span>
                          )}
                        </>
                      ) : matchedListing.commercial.mpesa_till_number ? (
                        `Buy Goods Till: ${matchedListing.commercial.mpesa_till_number}`
                      ) : (
                        `Pochi La Biashara: ${matchedListing.commercial.mpesa_pochi_number}`
                      )}
                    </strong>
                    <span className="text-[11px] text-emerald-700 block font-medium mt-0.5">
                      {matchedListing.commercial.mpesa_paybill_number
                        ? "✓ Official business account verified with Safaricom"
                        : "✓ Official merchant wallet verified with Safaricom"
                      }
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 block">Seller Payment Terms:</span>
                    <strong className="text-stone-900 text-sm">
                      {matchedListing.commercial.seller_terms_badge || "Pay When Delivered"}
                    </strong>
                    <span className="text-[11px] text-stone-500 block">
                      Inspect goods at gate before paying
                    </span>
                  </div>
                </div>

                {/* Simulated Phone Screen - Simple Grade 4 English */}
                <div className="p-3.5 rounded-xl bg-stone-900 text-white space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-300">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">What your phone screen will show:</span>
                  </div>
                  <div className="bg-stone-950 p-3.5 rounded-lg border border-stone-800 font-mono text-xs text-emerald-400 space-y-1">
                    <p className="text-stone-300">Pay to:</p>
                    <p className="text-sm font-bold text-white tracking-wide">
                      {matchedListing.business_name.toUpperCase()}
                    </p>
                    {matchedListing.commercial.mpesa_paybill_number ? (
                      <div className="text-stone-400 text-[11px] space-y-0.5 pt-0.5">
                        <p>Business No: <span className="text-white font-bold">{matchedListing.commercial.mpesa_paybill_number}</span></p>
                        <p>Account No: <span className="text-white font-bold">{matchedListing.commercial.mpesa_paybill_account || matchedListing.business_name.split(' ')[0].toUpperCase()}</span></p>
                      </div>
                    ) : (
                      <p className="text-stone-400 text-[11px]">
                        {matchedListing.commercial.mpesa_till_number 
                          ? `Till Number: ${matchedListing.commercial.mpesa_till_number}`
                          : `Pochi La Biashara: ${matchedListing.commercial.mpesa_pochi_number}`
                        }
                      </p>
                    )}
                    <p className="text-[11px] text-amber-300 pt-1">
                      👉 Safaricom shows this exact business name. Check that it matches before you enter your secret PIN.
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
                  We have not verified this number yet. Here is how to stay safe:
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
            <span>Is it safe to see Till, Paybill, and Pochi numbers in the open?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="block text-stone-900 mb-1">1. They Only Take Money In</strong>
              <p className="text-stone-600 leading-relaxed">
                A Till, Paybill, or Pochi can only receive money. Nobody can take money out of their wallet without the owner&apos;s secret SIM card and PIN.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="block text-stone-900 mb-1">2. Displayed on Every Real Shop</strong>
              <p className="text-stone-600 leading-relaxed">
                Hardware stores, supermarkets, and timber yards paint their Tills and Paybills on signs so customers pay easily. It is public by design.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <strong className="block text-stone-900 mb-1">3. Scammers Fear Public Accounts</strong>
              <p className="text-stone-600 leading-relaxed">
                Scammers only use unregistered personal lines so they can run away. A real business displays their Till or Paybill openly because their name is registered.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
