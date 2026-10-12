'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Clock, CheckCircle2, MessageSquare, 
  MapPin, Check, Camera, Ruler, AlertCircle, Scale 
} from 'lucide-react';
import { HomeService, BusinessProfile, ComparisonItem } from '../types/schema';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';
import { useComparison } from '../context/ComparisonContext';

interface ServiceCardProps {
  service: HomeService;
  business?: BusinessProfile;
}

export default function ServiceCard({ service, business }: ServiceCardProps) {
  const biz = business || SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === service.business_id);
  const { addToCompare, isInCompare } = useComparison();

  if (!biz) return null;

  const inCompare = isInCompare(service.id);

  const formattedPrice = service.pricing.starting_price_kes 
    ? `KSh ${service.pricing.starting_price_kes.toLocaleString()}` 
    : 'Ask on WhatsApp';

  const priceUnitText = 
    service.pricing.unit === 'per_sqm' ? '/ sqm' :
    service.pricing.unit === 'per_point' ? '/ point' :
    service.pricing.unit === 'per_room' ? '/ room' :
    service.pricing.unit === 'fixed_job' ? 'labor' : '';

  const whatsappUrl = generateWhatsAppLeadLink(biz, {
    itemOrServiceName: service.title,
    formattedPrice: `${formattedPrice} ${priceUnitText}`.trim(),
    intent: 'service_inquiry'
  });

  const comparisonItem: ComparisonItem = {
    id: service.id,
    type: 'service',
    title: service.title,
    slug: service.slug,
    business_id: biz.id,
    business_name: biz.business_name,
    business_slug: biz.slug,
    location_label: `${biz.location.neighborhood}, ${biz.location.sub_county}`,
    price_kes: service.pricing.starting_price_kes || 0,
    formatted_price: `${formattedPrice} ${priceUnitText}`.trim(),
    image: service.portfolio_photos[0] || biz.media.cover_image_url,
    category: service.service_category,
    specs: {
      material_or_trade: service.service_category.replace(/_/g, ' '),
      warranty_months: service.service_terms.warranty_guarantee_days ? Math.round(service.service_terms.warranty_guarantee_days / 30) : undefined,
      free_whatsapp_quote: service.affirmed_commitments.free_whatsapp_assessment,
      free_site_visit: service.affirmed_commitments.free_local_measurement,
      free_nairobi_delivery: false,
      mpesa_till_verified: Boolean(biz.commercial?.mpesa_till_number)
    },
    whatsapp_url: whatsappUrl
  };

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
              <Wrench className="w-3 h-3 text-[#B45309]" />
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
              className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
            >
              <span>{biz.business_name}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#B45309]" />
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-stone-200 mt-0.5">
              <MapPin className="w-3 h-3 text-stone-300" />
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

          {/* Fundi Guarantees - Simple Grade 4-6 English */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {service.affirmed_commitments.free_whatsapp_assessment && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-semibold border border-stone-200/60">
                <Camera className="w-3 h-3 text-[#B45309]" />
                <span>Free Photo Check on WhatsApp</span>
              </span>
            )}

            {service.affirmed_commitments.free_local_measurement && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-semibold border border-stone-200/60">
                <Ruler className="w-3 h-3 text-stone-700" />
                <span>Free Site Visit</span>
              </span>
            )}

            {service.service_terms.warranty_guarantee_days && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-semibold border border-stone-200/60">
                <Check className="w-3 h-3 text-[#B45309]" />
                <span>{service.service_terms.warranty_guarantee_days} Days Guarantee (Free Fix)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Pricing & 1-Tap Action */}
      <div className="p-5 pt-0 border-t border-stone-100 mt-2">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Direct Labor Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-stone-900">{formattedPrice}</span>
              <span className="text-[11px] text-stone-500">{priceUnitText}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {biz.commercial.mpesa_till_number 
                ? `✓ Till ${biz.commercial.mpesa_till_number}` 
                : (biz.commercial.mpesa_pochi_number ? `✓ Pochi Verified` : '✓ Lipa na M-Pesa')
              }
            </span>
            <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              {biz.commercial.seller_terms_badge || "Pay After Work is Done"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-3 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs shadow-sm transition active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Book on WhatsApp</span>
          </a>

          <button
            onClick={() => addToCompare(comparisonItem)}
            className={`col-span-1 inline-flex items-center justify-center gap-1 rounded-xl border text-xs font-bold transition ${
              inCompare
                ? 'bg-stone-900 border-stone-900 text-white'
                : 'border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
            title={inCompare ? "Remove from compare" : "Compare side-by-side"}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="sr-only">Compare</span>
          </button>
        </div>
      </div>
    </div>
  );
}
