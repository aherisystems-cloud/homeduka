import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Store, MapPin, ShieldCheck, ThumbsUp, CreditCard, 
  MessageSquare, UserCheck, ArrowRight, ChevronRight, Sparkles 
} from 'lucide-react';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../../data/mock_listings';

export const metadata: Metadata = {
  title: "Verified Kenyan Shops & Sellers Directory | HomeDuka",
  description: "Browse verified local Kenyan shops, workshops, and hardware yards with verified physical locations, named contact persons, and Lipa na M-Pesa Tills."
};

export default function AllShopsDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white py-12 px-6 sm:px-8 lg:px-12 border-b border-stone-800">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Scam Verified Merchants Only</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Verified Kenyan Shops & Sellers Directory
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Every shop listed on HomeDuka has a verified physical address, an identified contact person, 
            and a registered Lipa na M-Pesa Buy Goods Till. No anonymous scammers or fake listings.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs">
            <Link
              href="/buyer-protection"
              className="text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center gap-1"
            >
              <span>Read our 4-pillar buyer protection & anti-scam policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-6">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Showing <strong>{SAMPLE_KENYAN_HOME_LISTINGS.length}</strong> verified shops across Kenya</span>
          <Link href="/sell" className="text-stone-900 font-bold hover:underline">
            + List your shop on HomeDuka
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_KENYAN_HOME_LISTINGS.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Shop Cover Image */}
                <div className="relative h-44 bg-stone-100 overflow-hidden">
                  <img
                    src={shop.media.cover_image_url}
                    alt={shop.business_name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
                      {shop.location.county} County
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{shop.recommendations?.percent || 98}% Recommended</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-extrabold text-base leading-tight drop-shadow-xs">
                      {shop.business_name}
                    </h3>
                  </div>
                </div>

                {/* Shop Metadata */}
                <div className="p-5 space-y-3">
                  {/* Contact Person */}
                  {shop.contact_person && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-800">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Contact: <strong>{shop.contact_person.name}</strong></span>
                      <span className="text-[10px] px-1 py-0.2 bg-emerald-50 text-emerald-900 font-bold rounded">
                        Verified
                      </span>
                    </div>
                  )}

                  {/* Landmark */}
                  <div className="flex items-start gap-1.5 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{shop.location.landmark}</span>
                  </div>

                  {/* Till */}
                  {shop.commercial.mpesa_till_number && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-900 font-semibold">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Buy Goods Till: <strong>{shop.commercial.mpesa_till_number}</strong></span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-stone-500 line-clamp-2 pt-1 border-t border-stone-100">
                    {shop.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 border-t border-stone-100 flex items-center gap-2 mt-2">
                <Link
                  href={`/shop/${shop.slug}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold text-center transition"
                >
                  Visit Live Shop →
                </Link>

                <a
                  href={`https://wa.me/${shop.contact.whatsapp_number}?text=${encodeURIComponent(`Hi, I saw your shop "${shop.business_name}" on HomeDuka. What items do you currently have in stock?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
