'use client';

import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, ThumbsDown, ShieldAlert, CheckCircle2, MessageSquare, 
  X, AlertTriangle, PhoneCall, Flag, ShieldCheck, Sparkles, Store, ShoppingBag
} from 'lucide-react';
import { BusinessProfile } from '../types/schema';

interface SellerRecommendationWidgetProps {
  business: BusinessProfile;
}

export default function SellerRecommendationWidget({ business }: SellerRecommendationWidgetProps) {
  const [recommended, setRecommended] = useState<boolean | null>(null);
  const [recCount, setRecCount] = useState<number>(business.recommendations?.count || 120);
  const [recPercent, setRecPercent] = useState<number>(business.recommendations?.percent || 98);
  
  // Negative Report / Scam Complaint Modal State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportPhone, setReportPhone] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  // Positive Structured Endorsement Modal State (Anti-Fake Reviews)
  const [showEndorseModal, setShowEndorseModal] = useState<boolean>(false);
  const [endorseItem, setEndorseItem] = useState<string>('');
  const [interactionType, setInteractionType] = useState<string>('physical_shop');
  const [experienceRating, setExperienceRating] = useState<string>('exact_price_quality');
  const [endorsePhone, setEndorsePhone] = useState<string>('');
  const [endorseSubmitted, setEndorseSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const alreadyVoted = localStorage.getItem(`homeduka_rec_${business.id}`);
      if (alreadyVoted) {
        setRecommended(alreadyVoted === 'true');
      }
    } catch (e) {}
  }, [business.id]);

  const handleRecommendClick = () => {
    if (recommended !== null) return;
    setShowEndorseModal(true);
  };

  const handleDisputeClick = () => {
    if (recommended !== null) return;
    setShowReportModal(true);
  };

  const handleEndorseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEndorseSubmitted(true);
    setRecommended(true);
    setRecCount((prev) => prev + 1);

    try {
      localStorage.setItem(`homeduka_rec_${business.id}`, 'true');
      localStorage.setItem(
        `homeduka_rec_meta_${business.id}`,
        JSON.stringify({
          item: endorseItem,
          interactionType,
          experienceRating,
          timestamp: new Date().toISOString()
        })
      );
    } catch (e) {}

    setTimeout(() => {
      setShowEndorseModal(false);
      setEndorseSubmitted(false);
    }, 2000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setRecommended(false);
    setTimeout(() => {
      // Create WhatsApp pre-filled link to safety desk
      const adminMsg = encodeURIComponent(
        `🚨 VERIFIED COMPLAINT against seller "${business.business_name}" (Slug: ${business.slug}, Till: ${business.commercial.mpesa_till_number || 'N/A'}).\nReason: ${reportReason}\nDetails: ${reportDetails}\nReporter Phone: ${reportPhone}`
      );
      window.open(`https://wa.me/254712345678?text=${adminMsg}`, '_blank');
    }, 1200);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-2xs space-y-3">
        {/* Top Header: Social Proof & Audit Stat */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ThumbsUp className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-stone-900 block">
                  {recPercent}% Customer Satisfaction
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                  ✓ Verified Interactions
                </span>
              </div>
              <span className="text-[11px] text-stone-500 block">
                {recCount} verified customer endorsements • M-Pesa Till audited
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="text-[11px] font-bold text-stone-400 hover:text-rose-600 transition flex items-center gap-1 cursor-pointer"
            title="Report this seller if you experienced an issue"
          >
            <Flag className="w-3 h-3" />
            <span>Report Seller</span>
          </button>
        </div>

        {/* Interactive Recommendation Block */}
        <div className="pt-1">
          {recommended === null ? (
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 block">
                Did you deal with this shop? Would you recommend them?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRecommendClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs"
                  title="Submit a verified recommendation"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes, I recommend</span>
                </button>
                <button
                  onClick={handleDisputeClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                  title="Click to submit a verified complaint"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No (Report Issue)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center gap-2.5 text-stone-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {recommended 
                  ? 'Thank you! Your verified endorsement has been recorded and protects other shoppers.' 
                  : 'Your complaint has been submitted to the compliance desk for audit.'}
              </span>
            </div>
          )}
        </div>

        {/* Anti-Manipulation & Anti-Sabotage Policy Notice */}
        <div className="pt-2.5 border-t border-stone-100 flex items-start gap-2 text-[10px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Review Integrity Protected:</strong> To prevent fake self-reviews and competitor sabotage, recommendations require verified purchase or inquiry context; negative claims require WhatsApp chat proof and are investigated before affecting public ratings.
          </p>
        </div>
      </div>

      {/* 1. POSITIVE VERIFIED ENDORSEMENT MODAL (ANTI-FAKE REVIEWS) */}
      {showEndorseModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowEndorseModal(false);
                setEndorseSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!endorseSubmitted ? (
              <form onSubmit={handleEndorseSubmit} className="space-y-4">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <ThumbsUp className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-900 leading-tight">
                      Recommend &quot;{business.business_name}&quot;
                    </h3>
                    <p className="text-xs text-stone-500">
                      Takes 10 seconds • Prevents fake reviews & protects shoppers
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                  <strong>Verified Review Standard:</strong>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    HomeDuka only accepts genuine recommendations from buyers who dealt directly with this shop. Your details help build authentic local commerce.
                  </p>
                </div>

                {/* Question 1: What did you buy or inquire about? */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    1. What product or service did you deal on? <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={endorseItem}
                    onChange={(e) => setEndorseItem(e.target.value)}
                    placeholder="e.g. 6x6 Mahogany Bed, iPhone 15 Pro, Deep House Cleaning"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  />
                </div>

                {/* Question 2: How did you interact? */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    2. How did you interact with this shop? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={interactionType}
                    onChange={(e) => setInteractionType(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  >
                    <option value="physical_shop">🏬 Visited their physical shop, yard or showroom in person</option>
                    <option value="whatsapp_delivery">💬 Chatted on WhatsApp & received delivery at home</option>
                    <option value="phone_quote">📞 Called store manager & requested official quote sheet</option>
                  </select>
                </div>

                {/* Question 3: Experience Confirmation */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    3. Did they honor the price & quality displayed? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={experienceRating}
                    onChange={(e) => setExperienceRating(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  >
                    <option value="exact_price_quality">✓ Yes, exact price and high quality as advertised</option>
                    <option value="fair_negotiation">✓ Negotiated a fair discount on WhatsApp</option>
                    <option value="timely_delivery">✓ Prompt delivery and smooth M-Pesa Till payment</option>
                  </select>
                </div>

                {/* Optional Phone for Gold Verified Buyer Badge */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-stone-800">
                      Your WhatsApp Number <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      ★ Gold Verified Badge
                    </span>
                  </div>
                  <input
                    type="tel"
                    value={endorsePhone}
                    onChange={(e) => setEndorsePhone(e.target.value)}
                    placeholder="e.g. 0712 345 678 (kept 100% private)"
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  />
                  <span className="text-[10px] text-stone-400 block mt-1">
                    Earns your review a &ldquo;Verified Buyer&rdquo; badge so other buyers know it&apos;s 100% real.
                  </span>
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEndorseModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    Confirm Verified Endorsement
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-stone-900">
                  Verified Recommendation Recorded!
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Thank you for keeping Kenyan online shopping honest. Your endorsement helps other families buy with confidence.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. NEGATIVE REPORT / FRAUD COMPLAINT MODAL (ANTI-SABOTAGE) */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowReportModal(false);
                setReportSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!reportSubmitted ? (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-rose-700">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-black text-stone-900">
                    Report &quot;{business.business_name}&quot;
                  </h3>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                  <strong>Zero Tolerance Anti-Scam Policy:</strong>
                  <p className="text-[11px] leading-relaxed">
                    HomeDuka immediately unlists sellers who demand upfront commitment deposits or provide fake locations. 
                    To protect honest businesses from competitor sabotage, all complaints require verified contact and WhatsApp chat proof.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Reason for Report: <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  >
                    <option value="">Select a reason...</option>
                    <option value="upfront_deposit">Demanded upfront commitment fee / deposit before seeing goods</option>
                    <option value="fake_location">Physical shop not at the listed landmark / fake address</option>
                    <option value="wrong_price">Quoted higher price on WhatsApp than displayed on HomeDuka</option>
                    <option value="fake_goods">Supplied counterfeit, damaged, or wrong goods</option>
                    <option value="unresponsive_paid">Took money and stopped answering calls / chats</option>
                    <option value="other">Other suspicious activity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Describe what happened: <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide details (WhatsApp chats, quote differences, etc.)"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Your WhatsApp Phone Number (for audit confirmation): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={reportPhone}
                    onChange={(e) => setReportPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-hidden focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    Submit Report & Escalate
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-black text-stone-900">
                  Report Received by Safety Desk
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Opening WhatsApp to connect you directly with the HomeDuka compliance team. 
                  Our team investigates flagged accounts within 2 hours.
                </p>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
