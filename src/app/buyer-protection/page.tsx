import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, XCircle, MapPin, 
  CreditCard, UserCheck, PhoneCall, MessageSquare, ArrowRight,
  Sparkles, HelpCircle, FileText
} from 'lucide-react';
import { Metadata } from 'next';
import ComplaintDeskForm from '../../components/ComplaintDeskForm';

export const metadata: Metadata = {
  title: "Buyer Protection & Anti-Scam Policy | HomeDuka Kenya",
  description: "Learn how HomeDuka protects Kenyan buyers from online marketplace scams through physical shop verification, registered Lipa na M-Pesa Tills, and zero-tolerance seller takedowns."
};

export default function BuyerProtectionPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white py-16 px-6 sm:px-8 lg:px-12 xl:px-16 border-b border-stone-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Scam Guarantee & Verified Sellers Only</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            How HomeDuka Protects You from Marketplace Scams
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Unlike open classifieds where anyone with a burner phone number can post fake photos and demand M-Pesa deposits, 
            HomeDuka requires physical shop verification, named contact persons, and registered Lipa na M-Pesa Tills.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <Link
              href="/verify-till"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Verify a Seller&apos;s Till / Paybill</span>
            </Link>
            <Link
              href="/soko"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-2"
            >
              <span>Start Shopping Verified Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">
        
        {/* Section 1: The 4 Pillars of HomeDuka Trust */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Zero Tolerance for Fraud
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              The 4 Pillars That Distinguish HomeDuka
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We eliminate anonymous sellers before they ever reach your screen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#B45309] flex items-center justify-center border border-amber-200">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                1. Physical Shop or Yard Verification
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Every merchant must provide a real, visitable physical address or landmark in Kenya (e.g., Kamakis bypass, 
                Luthuli Avenue, Syokimau hardware yard). If a seller cannot welcome you or your courier to inspect goods in person, 
                they are not permitted on HomeDuka.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                2. Named Contact Person & Phone
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                No faceless or anonymous profiles. Every listing clearly displays the verified shop manager or contact person 
                (e.g., &quot;John M. Mwangi, Workshop Manager&quot;). We keep seller identity details on record so accountability is 100% clear.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                3. Registered Lipa na M-Pesa Tills Only
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Scammers prefer personal &quot;Send Money&quot; numbers that can be discarded. Legitimate Kenyan merchants use 
                Safaricom Buy Goods Tills or Paybills tied to registered business registration certificates. You can use our 
                built-in verifier to confirm the business name.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center border border-rose-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                4. Immediate Takedown Policy
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our rule is strict: if a buyer lodges a complaint that a seller demanded an upfront deposit without delivering, 
                or supplied counterfeit items, the shop is immediately suspended pending investigation within 2 hours. If guilty, 
                they are permanently banned.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Side-by-Side Comparison vs Other Marketplaces */}
        <section className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
          <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-50">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Why HomeDuka is Safer Than Generic Classifieds
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              See the direct difference between unverified classified platforms and HomeDuka&apos;s verified model.
            </p>
          </div>

          <div className="divide-y divide-stone-100 text-xs sm:text-sm">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Other Open Classifieds (e.g. Jiji, Facebook)</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  Anyone can create an account in 30 seconds with a random name, upload stock photos from Google, 
                  and claim to have furniture, electronics, or cement in stock.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>HomeDuka Verified Soko</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  Merchants must have verified physical shops, workshops, or hardware yards with real landmarks, 
                  identifiable managers, and genuine photos of their own stock.
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Deposit Demands & Switched-Off Phones</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  Fraudsters insist you send &quot;commitment fee&quot; or &quot;fuel deposit&quot; via personal M-Pesa. 
                  Once you send KSh 1,500 or KSh 3,000, your number is blocked.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Pay on Delivery / Collection Rule</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  We instruct all buyers to inspect the physical item first at the shop or upon delivery at their gate, 
                  and pay directly to the verified Buy Goods Till number.
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>No Recourse or Action on Reports</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  Reporting fake accounts often goes into an unmonitored queue. Scammers continue operating under multiple phone numbers.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Instant Escalation & Blacklisting</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  Complaints are escalated directly to human compliance officers on WhatsApp. Confirmed bad actors are 
                  permanently blacklisted across phone numbers and Till IDs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Safe Shopping Golden Rules for Buyers */}
        <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-black text-lg sm:text-xl">
            <Sparkles className="w-5 h-5 text-[#B45309]" />
            <span>3 Golden Rules When Shopping on Kenya Online Sokos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-1.5">
              <span className="font-extrabold text-stone-900 block">1. Never Pay Upfront Deposits</span>
              <p className="text-stone-600 leading-relaxed">
                Do not send &quot;commitment money&quot; to personal numbers before seeing the item. Pay upon gate delivery or at the shop.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-1.5">
              <span className="font-extrabold text-stone-900 block">2. Verify the Till Name</span>
              <p className="text-stone-600 leading-relaxed">
                When paying via Lipa na M-Pesa Buy Goods, check that the registered Safaricom name matches the business on HomeDuka.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-1.5">
              <span className="font-extrabold text-stone-900 block">3. Report Suspicious Behaviour</span>
              <p className="text-stone-600 leading-relaxed">
                If a seller behaves suspiciously or provides a wrong address, click &quot;Report Seller&quot; immediately so we can de-list them.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: File a Complaint or Report a Seller */}
        <section id="report" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Dispute & Anti-Fraud Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Lodge a Complaint or Report a Suspicious Seller
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Did a seller ask for an upfront deposit, fail to supply agreed goods, or provide a false address? 
              Report them below. Our safety team investigates within 2 hours.
            </p>
          </div>

          <ComplaintDeskForm />

          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-stone-400" />
              <span>Direct WhatsApp Hotline: <strong>+254 712 345 678</strong></span>
            </span>
            <span className="text-[11px] text-stone-400">
              Guaranteed investigation within 2 hours • Flagged accounts immediately unlisted
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
