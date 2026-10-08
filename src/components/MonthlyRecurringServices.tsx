'use client';

import React from 'react';
import { MONTHLY_RECURRING_HOME_SERVICES, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { RefreshCw, MessageSquare, ShieldCheck } from 'lucide-react';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';

export default function MonthlyRecurringServices() {
  return (
    <section id="recurring" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
      <div className="max-w-2xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
          <span>Regular Home Care</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-tight">
          Monthly Home Care & Cleaning
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
          Regular cleaning and servicing to keep your home fresh, clean, and working smoothly — before small problems turn into big repair bills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MONTHLY_RECURRING_HOME_SERVICES.map((item) => {
          const provider = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === item.providerId);
          const waUrl = provider 
            ? generateWhatsAppLeadLink(provider, { itemOrServiceName: item.title, intent: 'service_inquiry' })
            : '#';

          return (
            <div
              key={item.id}
              className="bg-[#FDFBF7] rounded-2xl p-5 border border-stone-200/80 hover:border-amber-400 hover:shadow-xs transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                    {item.frequency}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-stone-900 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs font-black text-stone-900">{item.priceEstimate}</span>
                  {provider && (
                    <span className="text-[10px] text-stone-500 font-semibold truncate max-w-[130px]">
                      By {provider.business_name}
                    </span>
                  )}
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition active:scale-95 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                  <span>Book on WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
