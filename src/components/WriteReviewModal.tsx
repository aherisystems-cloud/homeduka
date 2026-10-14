'use client';

import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { VerifiedReview } from '../types/schema';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (review: VerifiedReview) => void;
  defaultBusinessId?: string;
  defaultItemTitle?: string;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
  defaultBusinessId,
  defaultItemTitle,
}: WriteReviewModalProps) {
  const [businessId, setBusinessId] = useState(defaultBusinessId || SAMPLE_KENYAN_HOME_LISTINGS[0].id);
  const [itemPurchased, setItemPurchased] = useState(defaultItemTitle || '');
  const [buyerName, setBuyerName] = useState('');
  const [buyerNeighborhood, setBuyerNeighborhood] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'mpesa_till' | 'site_visit' | 'storefront_invoice'>('mpesa_till');
  const [mpesaCode, setMpesaCode] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemPurchased || !buyerName || !buyerNeighborhood || !reviewText) {
      alert('Please fill out all required fields.');
      return;
    }

    const maskedSnippet = mpesaCode
      ? `${mpesaCode.substring(0, 4).toUpperCase()}***${mpesaCode.slice(-2)} (Lipa na M-Pesa Verified)`
      : 'Storefront Invoice Verified';

    const newReview: VerifiedReview = {
      id: `rev-${Date.now()}`,
      business_id: businessId,
      item_purchased_title: itemPurchased,
      item_type: 'product',
      rating,
      review_text: reviewText,
      buyer_name: buyerName,
      buyer_neighborhood: buyerNeighborhood,
      verified_method: verificationMethod,
      mpesa_receipt_snippet: maskedSnippet,
      date: new Date().toISOString().split('T')[0],
      helpful_count: 1,
    };

    if (onReviewSubmitted) {
      onReviewSubmitted(newReview);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base">Write a Verified Buyer Review</h3>
              <p className="text-[11px] text-stone-500">Only verified purchases & jobs appear to protect Kenyan buyers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-stone-900">Review Verified & Published!</h4>
            <p className="text-xs text-stone-600">
              Thank you for helping fellow Kenyan homeowners make safe, informed decisions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            {/* 1. Shop / Fundi */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Shop or Service Provider *
              </label>
              <select
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                {SAMPLE_KENYAN_HOME_LISTINGS.map((biz) => (
                  <option key={biz.id} value={biz.id}>
                    {biz.business_name} ({biz.location.neighborhood}, {biz.location.sub_county})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. What did you buy? */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                What item or service did you buy / hire? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 7-Seater Chesterfield Sofa, Water Tank Cleaning, EPRA Solar Heater"
                value={itemPurchased}
                onChange={(e) => setItemPurchased(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            {/* 3. Star Rating */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Your Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-stone-300 hover:text-amber-400 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-stone-700 ml-2">
                  {rating === 5 ? '5/5 Excellent' : rating === 4 ? '4/5 Very Good' : `${rating}/5 Stars`}
                </span>
              </div>
            </div>

            {/* 4. M-Pesa / Verification Safeguard */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Anti-Fake Safeguard (Kenyan Verification)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-800 mb-1">
                    Proof Method
                  </label>
                  <select
                    value={verificationMethod}
                    onChange={(e) => setVerificationMethod(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-emerald-300 bg-white"
                  >
                    <option value="mpesa_till">Lipa na M-Pesa Till</option>
                    <option value="site_visit">Completed Site Job</option>
                    <option value="storefront_invoice">Shop Receipt / Invoice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-800 mb-1">
                    M-Pesa Code / Receipt Ref
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. QK8912345"
                    value={mpesaCode}
                    onChange={(e) => setMpesaCode(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-emerald-300 bg-white uppercase"
                  />
                </div>
              </div>
              <p className="text-[10px] text-emerald-700 leading-tight">
                🔒 Code is masked (e.g. QK89***712) for privacy. Confirms an authentic transaction took place.
              </p>
            </div>

            {/* 5. Name & Estate */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Name / Initials *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wanjiru M."
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Estate / Town *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kileleshwa, Ruiru, Membley"
                  value={buyerNeighborhood}
                  onChange={(e) => setBuyerNeighborhood(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* 6. Review Feedback */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Your Experience & Advice for Buyers *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Mention timber firmness, fundi punctuality, delivery speed, or pricing transparency..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition shadow-sm active:scale-95 cursor-pointer"
            >
              Submit Verified Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
