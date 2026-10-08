'use client';

import React from 'react';
import Link from 'next/link';
import { HomeProduct, BusinessProfile } from '../types/schema';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';
import { MessageSquare, ShieldCheck, MapPin, Tag } from 'lucide-react';

interface ProductCardProps {
  product: HomeProduct;
  business?: BusinessProfile;
}

export default function ProductCard({ product, business }: ProductCardProps) {
  const biz = business || SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === product.business_id);

  if (!biz) return null;

  const whatsappUrl = generateWhatsAppLeadLink(biz, {
    itemOrServiceName: product.title,
    intent: 'product_order'
  });

  const roomDisplay = 
    product.room === 'living_room' ? '🛋️ Living Room' :
    product.room === 'bedroom' ? '🛏️ Bedroom' :
    product.room === 'kitchen_dining' ? '🍳 Kitchen & Dining' :
    product.room === 'bathroom' ? '🚿 Bathroom & Water' :
    product.room === 'outdoor_compound' ? '🌿 Outdoor' :
    product.room === 'home_office' ? '💼 Home Office' : '';

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative h-48 sm:h-52 w-full bg-stone-100 overflow-hidden">
          <img
            src={product.images[0] || biz.media.cover_image_url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            {roomDisplay && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur text-stone-800 shadow-xs">
                {roomDisplay}
              </span>
            )}

            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
              product.specifications.in_stock
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {product.specifications.in_stock ? 'In Stock' : 'Made to Order'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
              {product.title}
            </h3>
            {product.specifications.material && (
              <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                {product.specifications.material}
              </p>
            )}
          </div>

          {/* Shop Context */}
          <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-stone-200/60 text-xs">
            <Link 
              href={`/shop/${biz.slug}`}
              className="font-bold text-stone-900 hover:text-brand-700 flex items-center gap-1 truncate"
            >
              <span>{biz.business_name}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="truncate">{biz.location.landmark}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & 1-Tap WhatsApp Action */}
      <div className="p-5 pt-0 border-t border-stone-100 mt-2">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Direct Shop Price
            </span>
            <span className="text-base sm:text-lg font-black text-stone-900">
              KSh {product.pricing.regular_price_kes.toLocaleString()}
            </span>
          </div>

          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <span>✓ Lipa na M-Pesa Verified</span>
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition active:scale-95 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
          <span>Order on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
