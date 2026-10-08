'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Clock, CheckCircle2, MessageSquare, 
  MapPin, Check, Camera, Ruler, AlertCircle 
} from 'lucide-react';
import { HomeService, BusinessProfile } from '../types/schema';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';

interface ServiceCardProps {
  service: HomeService;
  business?: BusinessProfile;
}

export default function ServiceCard({ service, business }: ServiceCardProps) {
  const biz = business || SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === service.business_id);

  if (!biz) return null;

  const whatsappUrl = generateWhatsAppLeadLink(biz, {
    itemOrServiceName: service.title,
    intent: 'service_inquiry'
  });

  const formattedPrice = service.pricing.starting_price_kes 
    ? `KSh ${service.pricing.starting_price_kes.toLocaleString()}` 
    : 'Ask on WhatsApp';

  const priceUnitText = 
    service.pricing.unit === 'per_sqm' ? '/ sqm (materials + labor)' :
    service.pricing.unit === 'per_point' ? '/ electrical point' :
    service.pricing.unit === 'per_room' ? '/ room' :
    service.pricing.unit === 'fixed_job' ? 'starting labor rate' : '';

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group">
      <div>
        {/* Cover Image & Category Badges */}
        <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
          <img
            src={service.portfolio_photos[0] || biz.media.cover_image_url}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          {/* Top Indicators */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur text-stone-800 shadow-xs capitalize">
              <Wrench className="w-3 h-3 text-amber-700" />
              <span>{service.service_category.replace('_', ' ')}</span>
            </span>

            {service.service_terms.emergency_available && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-xs">
                <span>Fast Emergency Response</span>
              </span>
            )}
          </div>

          {/* Bottom Overlay: Provider Name & Location */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <Link 
              href={`/shop/${biz.slug}`} 
              className="text-xs font-semibold text-amber-200 hover:underline flex items-center gap-1"
            >
              <span>{biz.business_name}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-stone-200 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span className="truncate">{biz.location.neighborhood}, {biz.location.sub_county}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
              {service.title}
            </h3>
            <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Explicit Fundi Guarantees */}
          <div className="space-y-1.5 bg-[#FAF8F5] rounded-2xl p-3 border border-stone-200/80 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              What this fundi guarantees:
            </span>

            {service.affirmed_commitments.free_whatsapp_assessment && (
              <div className="flex items-center gap-2 text-stone-700">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Camera className="w-2.5 h-2.5 text-amber-800" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800">
                  Free WhatsApp Photo Check (Send photo, get price)
                </span>
              </div>
            )}

            {service.affirmed_commitments.free_local_measurement && (
              <div className="flex items-center gap-2 text-stone-700">
                <div className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <Ruler className="w-2.5 h-2.5 text-stone-800" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 truncate">
                  Free Site Visit & Measurement in {biz.location.neighborhood}
                </span>
              </div>
            )}

            {service.service_terms.warranty_guarantee_days && (
              <div className="flex items-center gap-2 text-stone-700">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-amber-800" />
                </div>
                <span className="text-[11px] text-stone-600">
                  {service.service_terms.warranty_guarantee_days} Days Workmanship Guarantee
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Pricing & 1-Tap Action */}
      <div className="p-5 pt-0 border-t border-stone-100 mt-2">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Price (Labor & Materials)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-stone-900">{formattedPrice}</span>
              <span className="text-[11px] text-stone-500">{priceUnitText}</span>
            </div>
          </div>

          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ✓ Lipa na M-Pesa Verified
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-amber-300" />
          <span>Chat & Send Photo on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
