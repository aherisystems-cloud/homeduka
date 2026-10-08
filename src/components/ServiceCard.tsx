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
  // Resolve business profile if not passed directly
  const biz = business || SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === service.business_id);

  if (!biz) return null;

  const whatsappUrl = generateWhatsAppLeadLink(biz, {
    itemOrServiceName: service.title,
    intent: 'service_inquiry'
  });

  const formattedPrice = service.pricing.starting_price_kes 
    ? `KSh ${service.pricing.starting_price_kes.toLocaleString()}` 
    : 'Inquire on WhatsApp';

  const priceUnitText = 
    service.pricing.unit === 'per_sqm' ? '/ sqm (Materials + Labor)' :
    service.pricing.unit === 'per_point' ? '/ electrical point' :
    service.pricing.unit === 'per_room' ? '/ room' :
    service.pricing.unit === 'fixed_job' ? 'starting labor rate' : '';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Cover Image & Category Badges */}
        <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
          <img
            src={service.portfolio_photos[0] || biz.media.cover_image_url}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Top Indicators */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur text-slate-800 shadow-sm capitalize">
              <Wrench className="w-3 h-3 text-emerald-600" />
              <span>{service.service_category.replace('_', ' ')}</span>
            </span>

            {service.service_terms.emergency_available && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-500 text-white shadow-sm animate-pulse">
                <span>🚨 20-Min Fast Dispatch</span>
              </span>
            )}
          </div>

          {/* Bottom Overlay: Provider Name & Location */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <Link 
              href={`/shop/${biz.slug}`} 
              className="text-xs font-semibold text-emerald-300 hover:underline flex items-center gap-1"
            >
              <span>{biz.business_name}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-slate-200 mt-0.5">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span className="truncate">{biz.location.neighborhood}, {biz.location.sub_county}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Explicit Vendor Affirmations (Guarantees Affirmed by Provider) */}
          <div className="space-y-1.5 bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Affirmed Vendor Guarantees
            </span>

            {service.affirmed_commitments.free_whatsapp_assessment && (
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Camera className="w-2.5 h-2.5 text-emerald-700" />
                </div>
                <span className="text-[11px] font-semibold text-slate-800">
                  Affirmed: Free WhatsApp Photo/Video Assessment
                </span>
              </div>
            )}

            {service.affirmed_commitments.free_local_measurement && (
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Ruler className="w-2.5 h-2.5 text-blue-700" />
                </div>
                <span className="text-[11px] font-semibold text-slate-800 truncate">
                  Affirmed: Free Site Measurement in {biz.location.neighborhood}
                </span>
              </div>
            )}

            {service.service_terms.warranty_guarantee_days && (
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-amber-700" />
                </div>
                <span className="text-[11px] text-slate-600">
                  {service.service_terms.warranty_guarantee_days} Days Workmanship Warranty
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Pricing & 1-Tap Action */}
      <div className="p-5 pt-0 border-t border-slate-100 mt-2">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Pricing Model
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900">{formattedPrice}</span>
              <span className="text-[11px] text-slate-500">{priceUnitText}</span>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            Buy Goods Till Verified
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquire & Send Photo on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
