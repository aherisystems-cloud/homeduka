'use client';

import React from 'react';
import Link from 'next/link';
import { HomeProduct, BusinessProfile, ComparisonItem } from '../types/schema';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';
import { MessageSquare, ShieldCheck, MapPin, Tag, Scale, Check, FileText } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import QuotationGeneratorModal from './QuotationGeneratorModal';

interface ProductCardProps {
  product: HomeProduct;
  business?: BusinessProfile;
}

export default function ProductCard({ product, business }: ProductCardProps) {
  const biz = business || SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === product.business_id);
  const { addToCompare, isInCompare } = useComparison();
  const [showQuoteModal, setShowQuoteModal] = React.useState(false);

  if (!biz) return null;

  const inCompare = isInCompare(product.id);

  const whatsappUrl = generateWhatsAppLeadLink(biz, {
    itemOrServiceName: product.title,
    priceKes: product.pricing.discount_price_kes || product.pricing.regular_price_kes,
    deliveryTerms: product.delivery.nairobi_delivery_fee_kes === 0 ? 'Free Nairobi Delivery' : `KSh ${product.delivery.nairobi_delivery_fee_kes}`,
    intent: 'product_order'
  });

  const comparisonItem: ComparisonItem = {
    id: product.id,
    type: 'product',
    title: product.title,
    slug: product.slug,
    business_id: biz.id,
    business_name: biz.business_name,
    business_slug: biz.slug,
    location_label: `${biz.location.neighborhood}, ${biz.location.sub_county}`,
    price_kes: product.pricing.discount_price_kes || product.pricing.regular_price_kes,
    formatted_price: `KSh ${(product.pricing.discount_price_kes || product.pricing.regular_price_kes).toLocaleString()}`,
    image: product.images[0] || biz.media.cover_image_url,
    category: product.category,
    specs: {
      material_or_trade: product.specifications.material,
      warranty_months: product.specifications.warranty_months,
      free_nairobi_delivery: product.delivery.nairobi_delivery_fee_kes === 0,
      mpesa_till_verified: Boolean(biz.commercial?.mpesa_till_number),
      lead_time_days: product.specifications.lead_time_days
    },
    whatsapp_url: whatsappUrl
  };

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
                : 'bg-stone-100 text-stone-800'
            }`}>
              {product.specifications.in_stock ? 'Ready in Shop' : 'Made for You'}
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
              <p className="text-xs text-stone-600 font-medium mt-1 line-clamp-1">
                {product.specifications.material}
              </p>
            )}
          </div>

          {/* Shop Context */}
          <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-stone-200/60 text-xs">
            <Link 
              href={`/shop/${biz.slug}`}
              className="font-bold text-stone-900 hover:text-[#B45309] flex items-center gap-1 truncate"
            >
              <span>{biz.business_name}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
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

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span>{biz.commercial.mpesa_till_number ? `✓ Till ${biz.commercial.mpesa_till_number}` : '✓ Pochi Verified'}</span>
            </span>
            <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              {biz.commercial.seller_terms_badge || (product.specifications.in_stock ? "Pay When Delivered" : "Small Deposit First")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-3 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition active:scale-95 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Order on WhatsApp</span>
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

        <button
          onClick={() => setShowQuoteModal(true)}
          className="w-full text-[11px] font-bold text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1.5 pt-1 transition cursor-pointer"
        >
          <FileText className="w-3 h-3 text-[#B45309]" />
          <span>Get 1-Click Official Quote Sheet</span>
        </button>

        <QuotationGeneratorModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          initialItemTitle={product.title}
          initialPrice={product.pricing.discount_price_kes || product.pricing.regular_price_kes}
          initialSellerName={biz.business_name}
          initialTillNumber={biz.commercial.mpesa_till_number ? `Till ${biz.commercial.mpesa_till_number} (${biz.business_name})` : (biz.commercial.mpesa_pochi_number ? `Pochi ${biz.commercial.mpesa_pochi_number} (${biz.business_name})` : undefined)}
        />
      </div>
    </div>
  );
}
