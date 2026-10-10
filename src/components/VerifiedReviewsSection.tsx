'use client';

import React, { useState } from 'react';
import { 
  Star, ShieldCheck, ThumbsUp, CheckCircle2, 
  MapPin, Camera, MessageSquare, Plus, ArrowRight 
} from 'lucide-react';
import { SAMPLE_VERIFIED_REVIEWS, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { VerifiedReview } from '../types/schema';
import WriteReviewModal from './WriteReviewModal';

interface VerifiedReviewsSectionProps {
  businessId?: string; // Optional: filter to single business
  title?: string;
  subtitle?: string;
}

export default function VerifiedReviewsSection({
  businessId,
  title = "Verified Buyer Reviews",
  subtitle = "100% verified via Lipa na M-Pesa Till receipts & physical site visits. No fake reviews."
}: VerifiedReviewsSectionProps) {
  const [reviews, setReviews] = useState<VerifiedReview[]>(() => {
    return businessId 
      ? SAMPLE_VERIFIED_REVIEWS.filter(r => r.business_id === businessId)
      : SAMPLE_VERIFIED_REVIEWS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'products' | 'services'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'products') return r.item_type === 'product';
    if (activeFilter === 'services') return r.item_type === 'service';
    return true;
  });

  const handleHelpfulClick = (id: string, initialCount: number) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  const handleReviewAdded = (newRev: VerifiedReview) => {
    setReviews([newRev, ...reviews]);
  };

  return (
    <section className="space-y-6 pt-4 pb-8">
      {/* 1. Header with Trust Badges & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Anti-Fake Verified Reviews</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Action Button: Leave Review */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write Verified Review</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Pills */}
      {!businessId && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveFilter('products')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'products'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            Furniture & Products
          </button>
          <button
            onClick={() => setActiveFilter('services')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              activeFilter === 'services'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            Fundis & Home Services
          </button>
        </div>
      )}

      {/* 3. Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.map((rev) => {
          const biz = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === rev.business_id);
          const currentHelpful = helpfulMap[rev.id] ?? rev.helpful_count;

          return (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Verification Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-black text-stone-900 ml-1">
                      {rev.rating}.0
                    </span>
                  </div>

                  {/* Verification Pill */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[130px]">{rev.mpesa_receipt_snippet || 'Verified Buyer'}</span>
                  </span>
                </div>

                {/* Item Purchased Badge */}
                <div className="bg-stone-50 rounded-xl p-2 border border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Item Purchased
                  </span>
                  <span className="text-xs font-bold text-stone-900 line-clamp-1">
                    {rev.item_purchased_title}
                  </span>
                  {biz && (
                    <span className="text-[11px] text-[#B45309] font-medium block truncate">
                      From {biz.business_name} ({biz.location.neighborhood})
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;{rev.review_text}&rdquo;
                </p>

                {/* Buyer Photos if any */}
                {rev.buyer_photo_urls && rev.buyer_photo_urls.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {rev.buyer_photo_urls.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        className="w-16 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt="Customer living room photo"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    ))}
                    <span className="text-[10px] font-semibold text-stone-400 flex items-center gap-1">
                      <Camera className="w-3 h-3 text-stone-400" />
                      <span>Customer photo</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Metadata & Helpful Action */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <div>
                  <span className="font-bold text-stone-800">{rev.buyer_name}</span>
                  <span className="mx-1">•</span>
                  <span>{rev.buyer_neighborhood}</span>
                </div>

                <button
                  onClick={() => handleHelpfulClick(rev.id, rev.helpful_count)}
                  className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 transition active:scale-95 px-2 py-1 rounded-lg hover:bg-stone-50"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3 text-stone-400" />
                  <span>Helpful ({currentHelpful})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onReviewSubmitted={handleReviewAdded}
        defaultBusinessId={businessId}
      />
    </section>
  );
}
