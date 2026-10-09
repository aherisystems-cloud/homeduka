import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, MessageSquare, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { BusinessProfile } from '../types/schema';
import TrustBadges from './TrustBadges';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';

export default function BusinessCard({ business }: { business: BusinessProfile }) {
  const whatsappUrl = generateWhatsAppLeadLink(business);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between">
      <div>
        {/* Cover Image */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          {business.media.cover_image_url ? (
            <img
              src={business.media.cover_image_url}
              alt={business.business_name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No photo available
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#B45309] text-[#B45309]" />
            <span>{business.reputation.rating}</span>
            <span className="text-slate-400 font-normal">({business.reputation.total_reviews})</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-500" />
            <span>{business.location.neighborhood}, {business.location.county}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link href={`/shop/${business.slug}`} className="hover:text-brand-600 transition">
              <h3 className="font-bold text-base text-slate-900 leading-tight">
                {business.business_name}
              </h3>
            </Link>
          </div>

          {business.tagline && (
            <p className="text-xs text-slate-600 font-medium line-clamp-1 mb-2">
              {business.tagline}
            </p>
          )}

          <TrustBadges
            tillNumber={business.commercial.mpesa_till_number}
            landmark={business.location.landmark}
            hasCod={business.commercial.accepts_cash_on_delivery}
            warrantyMonths={business.attributes.warranty_duration_months}
          />

          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
            {business.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-slate-100 mt-2">
        <Link
          href={`/shop/${business.slug}`}
          className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
        >
          View Shop
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-sm active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chat WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
