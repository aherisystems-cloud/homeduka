'use client';

import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { 
  X, Scale, MessageSquare, ShieldCheck, MapPin, 
  Truck, Check, Minus, Sparkles, ExternalLink 
} from 'lucide-react';
import Link from 'next/link';

export default function ComparisonModal() {
  const { items, isModalOpen, closeCompareModal, removeFromCompare, clearCompare } = useComparison();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#B45309]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                Side-by-Side Comparison ({items.length}/4)
              </h2>
              <p className="text-xs text-stone-500">
                Direct specs, prices, warranties & verified Lipa na M-Pesa status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2 py-1 rounded-lg hover:bg-stone-200 transition"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeCompareModal}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content / Comparison Matrix */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Scale className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-stone-600 font-medium">No items in comparison yet.</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Tap the <span className="font-bold text-stone-700">⚖️ Compare</span> button on any product or service card to compare up to 4 options side-by-side.
              </p>
            </div>
          ) : (
            <div className="min-w-[620px] divide-y divide-stone-100 text-sm">
              {/* Row 1: Item Images, Title & WhatsApp Action */}
              <div className="grid grid-cols-5 gap-4 pb-6 items-end">
                <div className="col-span-1 text-xs font-bold text-stone-400 uppercase tracking-wider self-center">
                  Overview
                </div>
                {items.map((item) => (
                  <div key={item.id} className="col-span-1 space-y-2 relative">
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs shadow-md hover:bg-rose-600 transition"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="h-32 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <Link
                      href={item.whatsapp_url}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Order on WhatsApp</span>
                    </Link>
                  </div>
                ))}
                {/* Pad empty columns if fewer than 4 items */}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-col-${idx}`} className="col-span-1 border-2 border-dashed border-stone-100 rounded-2xl flex items-center justify-center text-stone-300 text-xs font-medium p-4 text-center">
                    + Add Item
                  </div>
                ))}
              </div>

              {/* Row 2: Direct Price */}
              <div className="grid grid-cols-5 gap-4 py-4 items-center">
                <div className="col-span-1 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Direct Price
                </div>
                {items.map((item) => (
                  <div key={`price-${item.id}`} className="col-span-1">
                    <span className="text-base sm:text-lg font-black text-stone-900">
                      {item.formatted_price}
                    </span>
                    <span className="block text-[11px] text-stone-500 font-medium">
                      Direct from shop or yard
                    </span>
                  </div>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-price-${idx}`} className="col-span-1 text-stone-300 text-xs">—</div>
                ))}
              </div>

              {/* Row 3: Vendor & Estate */}
              <div className="grid grid-cols-5 gap-4 py-4 items-center">
                <div className="col-span-1 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Vendor & Estate
                </div>
                {items.map((item) => (
                  <div key={`biz-${item.id}`} className="col-span-1 space-y-0.5">
                    <p className="font-bold text-stone-900 text-xs sm:text-sm">{item.business_name}</p>
                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B45309]" />
                      <span>{item.location_label}</span>
                    </p>
                  </div>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-biz-${idx}`} className="col-span-1 text-stone-300 text-xs">—</div>
                ))}
              </div>

              {/* Row 4: Material or Trade Specs */}
              <div className="grid grid-cols-5 gap-4 py-4 items-center">
                <div className="col-span-1 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Material / Specs
                </div>
                {items.map((item) => (
                  <div key={`spec-${item.id}`} className="col-span-1 text-xs text-stone-700 font-medium">
                    {item.specs.material_or_trade || 'Standard Commercial Grade'}
                  </div>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-spec-${idx}`} className="col-span-1 text-stone-300 text-xs">—</div>
                ))}
              </div>

              {/* Row 5: Delivery Scope */}
              <div className="grid grid-cols-5 gap-4 py-4 items-center">
                <div className="col-span-1 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Nairobi Delivery
                </div>
                {items.map((item) => (
                  <div key={`del-${item.id}`} className="col-span-1 text-xs font-semibold">
                    {item.specs.free_nairobi_delivery ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Check className="w-3 h-3" /> Free Nairobi Delivery
                      </span>
                    ) : (
                      <span className="text-stone-600">Standard Transit / Pickup</span>
                    )}
                  </div>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-del-${idx}`} className="col-span-1 text-stone-300 text-xs">—</div>
                ))}
              </div>

              {/* Row 6: Guarantee */}
              <div className="grid grid-cols-5 gap-4 py-4 items-center">
                <div className="col-span-1 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Guarantee
                </div>
                {items.map((item) => (
                  <div key={`warr-${item.id}`} className="col-span-1 text-xs font-semibold text-stone-800">
                    {item.specs.warranty_months ? (
                      <span className="inline-flex items-center gap-1 text-stone-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>{item.specs.warranty_months} Months (Free Fix)</span>
                      </span>
                    ) : (
                      <span className="text-stone-400">Standard Service</span>
                    )}
                  </div>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-warr-${idx}`} className="col-span-1 text-stone-300 text-xs">—</div>
                ))}
              </div>

              {/* Row 7: Till or Pochi Status */}
              <div className="grid grid-cols-5 gap-4 py-4 items-center">
                <div className="col-span-1 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Till / Pochi
                </div>
                {items.map((item) => (
                  <div key={`till-${item.id}`} className="col-span-1 text-xs">
                    {item.specs.mpesa_till_verified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md font-bold">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Real Verified Till</span>
                      </span>
                    ) : (
                      <span className="text-stone-500">Pay When Delivered</span>
                    )}
                  </div>
                ))}
                {Array.from({ length: 4 - items.length }).map((_, idx) => (
                  <div key={`empty-till-${idx}`} className="col-span-1 text-stone-300 text-xs">—</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            💡 Compare prices, delivery & shop locations before chatting on WhatsApp.
          </p>
          <button
            onClick={closeCompareModal}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
