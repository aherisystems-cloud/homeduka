'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, Wrench, ShieldCheck, MessageSquare, ArrowRight, 
  MapPin, CheckCircle2, Sparkles, Camera, Phone, Plus, HelpCircle 
} from 'lucide-react';

const PRIMARY_KENYAN_COUNTIES = [
  'Nairobi', 'Kiambu', 'Machakos', 'Kajiado', 'Nakuru',
  'Mombasa', 'Kisumu', 'Uasin Gishu (Eldoret)', 'Kilifi', 'Nyeri',
  'Meru', "Murang'a", 'Kakamega', 'Kericho'
];

export default function SellerOnboardingPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    whatsappNumber: '',
    category: 'furniture',
    county: 'Nairobi',
    subCounty: 'Westlands',
    estateOrLandmark: '',
    mpesaTill: '',
    firstItemTitle: '',
    firstItemPrice: '',
    freeAssessmentOffered: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.whatsappNumber || !formData.estateOrLandmark) {
      alert('Please fill out business name, WhatsApp number, and estate.');
      return;
    }
    setSubmitted(true);
  };

  const cleanPhone = formData.whatsappNumber.replace(/\D/g, '');
  const waAdminMessage = encodeURIComponent(
    `Habari HomeDuka Team,\n` +
    `Nahitaji ku-list biashara yangu kwenye HomeDuka Kenya:\n\n` +
    `Biashara: *${formData.businessName}*\n` +
    `Aina: *${formData.category.toUpperCase()}*\n` +
    `Eneo: *${formData.estateOrLandmark}, ${formData.subCounty}, ${formData.county}*\n` +
    `WhatsApp No: *${formData.whatsappNumber}*\n` +
    `Lipa na M-Pesa Till: *${formData.mpesaTill || 'Pay on Delivery'}*\n` +
    (formData.firstItemTitle ? `Bidhaa ya Kwanza: *${formData.firstItemTitle}* (KSh ${formData.firstItemPrice})\n` : '') +
    `Free Assessment: *${formData.freeAssessmentOffered ? 'Ndio (Yes)' : 'Hapana'}*\n\n` +
    `Tafadhali nithibitishie (verify profile) niweze kuanza kupokea wateja. Asante!`
  );

  const adminWhatsAppUrl = `https://wa.me/254712345678?text=${waAdminMessage}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Sell on HomeDuka</span>
        </div>

        {/* Hero Section - Act > Read */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>2-Minute Vendor Self-Serve</span>
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              List Your Workshop or Fundi Service Free
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Get direct WhatsApp orders from homeowners in your estate. Zero commissions, direct Lipa na M-Pesa payments, and verified workshop badges.
            </p>
          </div>

          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#B45309]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 3 Quick Value Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-lg sm:text-xl font-black text-stone-900 block">0%</span>
            <span className="text-[11px] text-stone-500 font-medium">Zero Commission Fees</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-lg sm:text-xl font-black text-stone-900 block">100%</span>
            <span className="text-[11px] text-stone-500 font-medium">Direct WhatsApp Leads</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-lg sm:text-xl font-black text-stone-900 block">✓ Till</span>
            <span className="text-[11px] text-stone-500 font-medium">Verified Payment Badge</span>
          </div>
        </div>

        {/* Onboarding Form */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                Listing Details Received!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Tap below to verify your workshop via WhatsApp and get your business profile published immediately.
              </p>

              <div className="pt-2">
                <a
                  href={adminWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-sm transition shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Activate Profile on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Business Info */}
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2">
                  1. Workshop or Fundi Profile
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Business or Trade Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruiru Solid Wood Creations"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      WhatsApp Number (for orders) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 font-semibold"
                  >
                    <option value="furniture">Furniture Workshop (Sofas, Beds, Dining)</option>
                    <option value="carpentry_cabinetry">Cabinetry & Fitted Wardrobes</option>
                    <option value="plumbing">Plumbing & Emergency Leaks</option>
                    <option value="electrical_solar">Electrician & Solar Water Heaters</option>
                    <option value="painting_gypsum">Gypsum Ceilings & House Painting</option>
                    <option value="appliances">Appliance Repair (Fridges, Washing Machines)</option>
                    <option value="cleaning">Water Tank Cleaning & Pest Control</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Location & Local Trust */}
              <div className="space-y-4 pt-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2">
                  2. Location & Estate Coverage
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">County *</label>
                    <select
                      value={formData.county}
                      onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                    >
                      {PRIMARY_KENYAN_COUNTIES.map((countyName) => (
                        <option key={countyName} value={countyName}>{countyName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Sub-County / Area *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruiru, Westlands, Kilimani, Roysambu"
                      value={formData.subCounty}
                      onChange={(e) => setFormData({ ...formData, subCounty: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Specific Workshop Landmark / Stage *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kamakis Stage, opp Shell Petrol Station, Eastern Bypass"
                    value={formData.estateOrLandmark}
                    onChange={(e) => setFormData({ ...formData, estateOrLandmark: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                {/* Free Assessment Affirmation */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="freeAssess"
                    checked={formData.freeAssessmentOffered}
                    onChange={(e) => setFormData({ ...formData, freeAssessmentOffered: e.target.checked })}
                    className="w-4 h-4 accent-stone-900 rounded mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="freeAssess" className="text-xs text-stone-700 cursor-pointer">
                    <strong className="block text-stone-900">Affirm Free Local Photo / Video Assessment</strong>
                    I confirm that I answer customer WhatsApp inquiries with free initial estimates without charging an inspection fee upfront.
                  </label>
                </div>
              </div>

              {/* Section 3: Lipa na M-Pesa & First Listing */}
              <div className="space-y-4 pt-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2">
                  3. Lipa na M-Pesa & Featured Item
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Lipa na M-Pesa Till (Optional but boosts trust)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Till 894211"
                      value={formData.mpesaTill}
                      onChange={(e) => setFormData({ ...formData, mpesaTill: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Sample Product or Service Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7-Seater Modern Chesterfield Sofa"
                      value={formData.firstItemTitle}
                      onChange={(e) => setFormData({ ...formData, firstItemTitle: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Direct Price (KSh)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 68000"
                    value={formData.firstItemPrice}
                    onChange={(e) => setFormData({ ...formData, firstItemPrice: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-sm transition shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>List My Business Now (Free)</span>
                </button>
                <p className="text-center text-[11px] text-stone-500 mt-2">
                  🔒 Zero commitments. Instant verification via official WhatsApp.
                </p>
              </div>

            </form>
          )}
        </div>

        {/* Bottom Trust Reminder */}
        <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-center text-xs text-stone-600">
          Already listed? Need to update your catalog?{' '}
          <Link href="/portal/demo-token" className="font-bold text-stone-900 hover:underline">
            Manage your listings in Merchant Portal →
          </Link>
        </div>

      </div>
    </div>
  );
}
