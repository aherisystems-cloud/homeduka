import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, Heart, CheckCircle2, MapPin, 
  CreditCard, UserCheck, PhoneCall, ArrowRight,
  Sparkles, Globe, FileText, Check, Layers
} from 'lucide-react';
import ComplaintDeskForm from '../../components/ComplaintDeskForm';

export const metadata: Metadata = {
  title: "Buyer Protection & Peace of Mind | HomeDuka Kenya",
  description: "Learn how HomeDuka protects Kenyan shoppers: strict merchant vetting, verified physical shops and websites, registered Lipa na M-Pesa Tills, and deep category transparency."
};

export default function BuyerProtectionPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      
      {/* 1. EMOTIONAL HERO SECTION */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 px-6 sm:px-8 lg:px-12 xl:px-16 border-b border-stone-800 relative overflow-hidden">
        {/* Subtle warm glow background accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B45309]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>The HomeDuka Buyer Protection Promise</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Shopping in Kenya Should Bring Joy, Not Anxiety.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            You work hard for every single shilling. When you buy furniture for your family, a laptop for your work, 
            or supplies for your build, you deserve complete peace of mind. We do the heavy verification work upfront 
            so you never have to wonder if a seller is legitimate.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <Link
              href="/soko"
              className="px-6 py-3.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white transition shadow-md flex items-center gap-2"
            >
              <span>Explore Verified Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/verify-till"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Verify a Seller&apos;s Till / Paybill</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">
        
        {/* 2. THE BIG WORK: WHAT WE DO FOR YOU */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Our Core Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              We Do the Big Work Upfront So You Don&apos;t Have To
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We don&apos;t allow just anyone to open a shop on HomeDuka. Every merchant must meet strict, verifiable criteria before listing a single product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filter 1 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B45309] flex items-center justify-center border border-amber-200">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                1. Physical Shop or Verified Website
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Only serious, registered businesses are admitted. Every merchant must operate an actual physical location 
                (shop, showroom, workshop, or yard) you can visit, or an established, verifiable online store, or both. 
                Zero anonymous bedroom operators.
              </p>
            </div>

            {/* Filter 2 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                2. Legitimate, Verifiable Payment Tills
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sellers must possess a registered Safaricom Lipa na M-Pesa Buy Goods Till, Paybill, or verified commercial 
                bank account registered to their business certificate. We verify that the registered name on the Till 
                matches the merchant you are buying from.
              </p>
            </div>

            {/* Filter 3 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                3. Named Human Contact Person
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every business profile clearly names the accountable person running the operation (e.g. Workshop Manager, 
                Store Director). We keep national identification and phone records on file so you always know who is behind the counter.
              </p>
            </div>
          </div>
        </section>

        {/* 3. CATEGORY-BY-CATEGORY DATA TRANSPARENCY */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-2xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              Data-Driven Shopping
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              No Blind Guesses: Deep Category Disclosures
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              We never make generic, unsubstantiated claims on behalf of sellers. Instead, we mandate granular, structured 
              data per category so you know the exact truth of what you are purchasing before you spend your money.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* Category: Perfumes & Beauty */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="text-xs font-black text-stone-900 block flex items-center gap-1.5">
                <span>🌸 Perfumes & Beauty Care</span>
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sellers are required to specify authenticity tier (Original Designer, French/Arab Clone, or Decant), 
                concentration (EDP, EDT, Parfum), bottle volume (ml), and batch validity so you get exact clarity.
              </p>
            </div>

            {/* Category: Electronics & Phones */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="text-xs font-black text-stone-900 block flex items-center gap-1.5">
                <span>📱 Phones & Laptops</span>
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mandatory disclosure of device condition (Brand New Sealed, Ex-UK Certified Refurbished, Open Box), 
                exact storage/RAM, and explicit warranty terms (e.g. 1 Year Official Manufacturer vs Shop Warranty).
              </p>
            </div>

            {/* Category: Furniture & Timber */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="text-xs font-black text-stone-900 block flex items-center gap-1.5">
                <span>🛋️ Furniture & Carpentry</span>
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear declaration of timber species (Mahogany, Mvule, Bluegum), whether hardwood is kiln-dried or air-seasoned, 
                foam density grade, and fabric stain resistance.
              </p>
            </div>

            {/* Category: Building Hardware & Materials */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <span className="text-xs font-black text-stone-900 block flex items-center gap-1.5">
                <span>🏗️ Hardware & Construction</span>
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear specification of KEBS certification standards, iron sheet gauge (Gauge 28 vs 30), cement structural 
                strength ratings (32.5R vs 42.5N), and factory origin.
              </p>
            </div>
          </div>
        </section>

        {/* 4. THE EMOTIONAL OUTCOME */}
        <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span>The Human Outcome</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            You Are in Complete Control from Start to Finish.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs sm:text-sm text-emerald-100">
            <div className="space-y-1.5">
              <strong className="text-white block font-bold text-base">Direct Relationships</strong>
              <p className="leading-relaxed">
                Chat directly with verified business managers on WhatsApp. Ask for live workshop photos, videos, 
                and dimension checks before committing.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-white block font-bold text-base">Inspection First</strong>
              <p className="leading-relaxed">
                Inspect your items in person at the seller&apos;s physical shop, or upon delivery at your home gate, 
                before parting with your money.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-white block font-bold text-base">Guaranteed Recourse</strong>
              <p className="leading-relaxed">
                If any merchant attempts to misrepresent goods or asks for unverified personal deposits, our compliance 
                desk intervenes within 2 hours.
              </p>
            </div>
          </div>
        </section>

        {/* 5. DISPUTE & COMPLAINT RESOLUTION DESK */}
        <section id="report" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Accountability & Customer Safety Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Need Help with a Seller? Lodge an Inquiry or Dispute
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              We stand behind every buyer on our platform. If you encounter any issue with a listed merchant, 
              submit your details below. Our safety team reviews every report within 2 hours.
            </p>
          </div>

          <ComplaintDeskForm />

          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-stone-400" />
              <span>Direct Compliance Line: <strong>+254 712 345 678</strong></span>
            </span>
            <span className="text-[11px] text-stone-400">
              Active Monday to Saturday • 08:00 - 18:00 EAT
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
