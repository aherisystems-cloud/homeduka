'use client';

import React, { useState } from 'react';
import { PhoneCall, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ComplaintDeskForm() {
  const [shopName, setShopName] = useState('');
  const [phoneOrTill, setPhoneOrTill] = useState('');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      const msg = encodeURIComponent(
        `🚨 FRAUD/COMPLAINT REPORT\nShop: ${shopName}\nTill/Phone: ${phoneOrTill}\nReason: ${reason}\nDetails: ${details}\nBuyer Phone: ${reporterPhone}`
      );
      window.open(`https://wa.me/254712345678?text=${msg}`, '_blank');
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h3 className="text-base font-black text-stone-900">
          Complaint Received by Safety Desk
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Your report has been forwarded to the HomeDuka compliance team. 
          We are opening WhatsApp so you can provide any screenshots or evidence directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl text-xs sm:text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-stone-800 mb-1">Seller / Shop Name:</label>
          <input 
            type="text" 
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="e.g. WoodCraft Kamakis, Apex Electronics"
            required
            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <div>
          <label className="block font-bold text-stone-800 mb-1">Seller Phone or Till Number:</label>
          <input 
            type="text" 
            value={phoneOrTill}
            onChange={(e) => setPhoneOrTill(e.target.value)}
            placeholder="e.g. 0712... or Till 543210"
            required
            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
          />
        </div>
      </div>

      <div>
        <label className="block font-bold text-stone-800 mb-1">Reason for Complaint:</label>
        <select 
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
        >
          <option value="">Select a reason...</option>
          <option value="Demanded upfront commitment fee / deposit before seeing goods">Demanded upfront commitment fee / deposit before seeing goods</option>
          <option value="Fake physical address / not at the specified landmark">Fake physical address / not at the specified landmark</option>
          <option value="Quoted much higher price on WhatsApp than advertised on HomeDuka">Quoted much higher price on WhatsApp than advertised on HomeDuka</option>
          <option value="Delivered defective or wrong item and refused resolution">Delivered defective or wrong item and refused resolution</option>
          <option value="Impersonating another known business or brand">Impersonating another known business or brand</option>
          <option value="Other suspicious scam activity">Other suspicious scam activity</option>
        </select>
      </div>

      <div>
        <label className="block font-bold text-stone-800 mb-1">Details & Evidence:</label>
        <textarea 
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Explain what happened (WhatsApp chat summary, quote difference, etc.)"
          required
          className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-stone-800 mb-1">Your WhatsApp Number (for follow-up):</label>
          <input 
            type="tel" 
            value={reporterPhone}
            onChange={(e) => setReporterPhone(e.target.value)}
            placeholder="07..."
            required
            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold transition shadow-sm cursor-pointer"
          >
            Submit Complaint to Safety Desk
          </button>
        </div>
      </div>
    </form>
  );
}
