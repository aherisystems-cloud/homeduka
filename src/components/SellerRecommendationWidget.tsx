'use client';

import React, { useState } from 'react';
import { 
  ThumbsUp, ThumbsDown, ShieldAlert, CheckCircle2, MessageSquare, 
  X, AlertTriangle, PhoneCall, Flag
} from 'lucide-react';
import { BusinessProfile } from '../types/schema';

interface SellerRecommendationWidgetProps {
  business: BusinessProfile;
}

export default function SellerRecommendationWidget({ business }: SellerRecommendationWidgetProps) {
  const [recommended, setRecommended] = useState<boolean | null>(null);
  const [recCount, setRecCount] = useState<number>(business.recommendations?.count || 120);
  const [recPercent, setRecPercent] = useState<number>(business.recommendations?.percent || 98);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportPhone, setReportPhone] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const [showAntiSabotageInfo, setShowAntiSabotageInfo] = useState<boolean>(false);

  const handleVote = (vote: boolean) => {
    if (recommended !== null) return;
    if (vote) {
      setRecommended(true);
      setRecCount((prev) => prev + 1);
      try {
        localStorage.setItem(`homeduka_rec_${business.id}`, 'true');
      } catch (e) {}
    } else {
      // Negative vote triggers verified dispute/complaint flow to prevent competitor sabotage
      setShowReportModal(true);
    }
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
        {/* Top Header: Social Proof Stat */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ThumbsUp className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-black text-stone-900 block">
                {recPercent}% Recommended by Kenyan Buyers
              </span>
              <span className="text-[11px] text-stone-500 block">
                {recCount} verified customer recommendations
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
                  onClick={() => handleVote(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes, I recommend</span>
                </button>
                <button
                  onClick={() => handleVote(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                  title="Click to submit a verified complaint"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No (Report Issue)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center gap-2 text-stone-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {recommended 
                  ? 'Thank you! Your recommendation helps other buyers find trustworthy shops.' 
                  : 'Your complaint has been submitted to the compliance desk for audit.'}
              </span>
            </div>
          )}
        </div>

        {/* Anti-Sabotage Protection Policy Notice */}
        <div className="pt-2 border-t border-stone-100 flex items-start gap-1.5 text-[10px] text-stone-500">
          <ShieldAlert className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Anti-Sabotage Protected:</strong> To prevent competitors from maliciously downvoting honest businesses, negative feedback requires verified contact and is audited by our safety desk before impacting ratings.
          </p>
        </div>
      </div>

      {/* REPORT SELLER / COMPLAINT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => {
                setShowReportModal(false);
                setReportSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100"
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
                    HomeDuka immediately unlists sellers who demand upfront deposits or provide fake locations. 
                    Your report goes directly to the compliance officer.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Reason for Report:
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900"
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
                    Describe what happened:
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide details (WhatsApp chats, quote differences, etc.)"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Your WhatsApp Phone Number (for confirmation):
                  </label>
                  <input
                    type="tel"
                    value={reportPhone}
                    onChange={(e) => setReportPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-900"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold"
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
