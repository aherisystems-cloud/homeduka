import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  MONTHLY_RECURRING_HOME_SERVICES, 
  SAMPLE_KENYAN_HOME_LISTINGS 
} from '../../data/mock_listings';
import { generateWhatsAppLeadLink } from '../../utils/whatsapp_link';
import { 
  RefreshCw, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Truck, 
  AlertCircle, 
  PackageCheck,
  Droplets,
  Flame,
  Wrench,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Monthly Home Restock & Routine Care Kenya | Water, Cooking Gas & Maintenance",
  description: "Never run out of cooking gas, drinking water, or cleaning essentials. Scheduled monthly restock, water tank cleaning, pest control, and solar servicing across Nairobi & Kenyan towns. Locked monthly rates & verified M-Pesa Tills.",
  alternates: {
    canonical: 'https://homeduka.co.ke/refills',
  },
  openGraph: {
    title: "Monthly Home Restock & Routine Care Kenya | HomeDuka",
    description: "Scheduled drinking water, cooking gas restock, water tank cleaning, and pest control at locked monthly rates across Kenya.",
    url: 'https://homeduka.co.ke/refills',
    siteName: 'HomeDuka Kenya',
    locale: 'en_KE',
    type: 'website',
  },
};

const REFILL_FAQS = [
  {
    question: "How much does cooking gas refill (13kg and 6kg) cost in Nairobi?",
    answer: "As of 2026, refilling a standard 13kg cylinder (Total, K-Gas, Rubis, Afrigas) ranges between Ksh 2,800 and Ksh 3,200 including doorstep delivery. A 6kg refill costs between Ksh 1,200 and Ksh 1,450. On HomeDuka, you connect with verified EPRA-licensed retail stations to avoid counterfeit valves or underweight gas."
  },
  {
    question: "How often should an overhead domestic water tank be scrubbed and disinfected in Kenya?",
    answer: "Overhead and underground plastic or concrete tanks should be cleaned every 3 months. Silt, dust, and algae accumulate from municipal or borehole water lines. Professional cleaning involves draining the tank, power-scrubbing the walls with food-grade chlorine disinfectant, and flushing the pipes. Rates range from Ksh 2,500 to Ksh 4,500 per tank."
  },
  {
    question: "How do scheduled drinking water refills work?",
    answer: "You select your preferred brand of 20-litre purified bottled water. Your verified neighborhood distributor delivers the refill right to your apartment door, carries it up the stairs, and replaces the empty bottle. Refill exchanges range from Ksh 250 to Ksh 450."
  },
  {
    question: "Why is preventive home maintenance cheaper than waiting for emergencies?",
    answer: "Regularly servicing water booster pumps, flushing solar water heaters (every 6 months to remove scale), and performing routine pest control prevents costly sudden breakdowns. A burnt solar heating element costs Ksh 15,000+ to replace, whereas a scheduled descale costs only Ksh 3,500."
  }
];

export default function RefillsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Monthly Home Refills & Routine Home Maintenance in Kenya',
    description: 'Scheduled drinking water, cooking gas refills, water tank cleaning, and pest control at locked monthly rates across Kenya.',
    url: 'https://homeduka.co.ke/refills',
    isPartOf: {
      '@type': 'WebSite',
      name: 'HomeDuka Kenya',
      url: 'https://homeduka.co.ke',
    },
    hasPart: MONTHLY_RECURRING_HOME_SERVICES.map((s) => ({
      '@type': 'Service',
      name: s.title,
      description: s.description,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'KES',
        price: s.priceEstimate,
      },
    })),
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://homeduka.co.ke',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Monthly Refills & HomeCare',
        item: 'https://homeduka.co.ke/refills',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: REFILL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-stone-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-bold">Monthly Restock & Home Upkeep</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-stone-200/80 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700 animate-spin-slow" />
            <span>Never Run Out of Home Essentials</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Monthly Restock & Routine Home Upkeep
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Lock in reliable drinking water, cooking gas, bulk cleaning supplies, tank scrubbing, and pest control. Delivered directly to your doorstep in your estate with verified M-Pesa Tills.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold text-stone-600">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-50 rounded-full border border-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              EPRA & KEBS Verified Vendors
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-50 rounded-full border border-stone-200">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              Doorstep Delivery in 30–60 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-50 rounded-full border border-stone-200">
              <Clock className="w-3.5 h-3.5 text-[#B45309]" />
              Locked Monthly Rates
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Strategic Positioning: The 3 Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#B45309] flex items-center justify-center text-xl font-bold">
              ⚡
            </div>
            <h3 className="font-extrabold text-stone-900 text-base">
              The Zero-Out-of-Stock Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              No running out of gas at 9:00 PM or finding empty drinking water bottles. 1-tap WhatsApp refills with your neighborhood vendor who knows your gate and floor.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
              🛡️
            </div>
            <h3 className="font-extrabold text-stone-900 text-base">
              Verified Official Tills Only
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Never send money to an unfamiliar personal number. All refills are paid via verified Buy Goods Tills or upon delivery at your doorstep.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold">
              🛠️
            </div>
            <h3 className="font-extrabold text-stone-900 text-base">
              Preventive Upkeep That Saves Money
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Scheduled tank sanitizing, solar heater flushing, and bimonthly sofa extraction prevent massive repair bills down the line.
            </p>
          </div>
        </div>

        {/* Section: Refills & Routine Services Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Routine Refills & Maintenance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Essential Home Services & Monthly Plans
              </h2>
            </div>
            <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
              {MONTHLY_RECURRING_HOME_SERVICES.length} Active Plans
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MONTHLY_RECURRING_HOME_SERVICES.map((item) => {
              const provider = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.id === item.providerId);
              const waUrl = provider 
                ? generateWhatsAppLeadLink(provider, { itemOrServiceName: item.title, intent: 'service_inquiry' })
                : '#';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-emerald-500/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-3xl shadow-2xs">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/70">
                        {item.frequency}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-stone-900 mb-1 group-hover:text-emerald-900 transition">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 mt-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-stone-400 block uppercase tracking-wider">
                          Fair Rate
                        </span>
                        <span className="text-sm font-black text-stone-900">
                          {item.priceEstimate}
                        </span>
                      </div>
                      {provider && (
                        <span className="text-[11px] text-stone-500 font-semibold truncate max-w-[140px]">
                          By {provider.business_name}
                        </span>
                      )}
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-2xs"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The New Home Move-In & Restock Kit */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 border border-stone-800 space-y-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B45309] text-white text-xs font-black">
              📦 Complete Starter Kit
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Moving to a New House in Kenya?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Moving into an apartment in Kilimani, Westlands, Roysambu, South B, or Ruiru? Get our all-in-one move-in restock bundle:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-stone-200">
              <div className="flex items-center gap-2 bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>13kg Gas Cylinder + Regulator</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2x 20L Purified Water Bottles</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deep Move-In Fumigation</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Curtain Rod & TV Mounting Fundi</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-extrabold text-xs sm:text-sm transition"
              >
                <span>Request Move-In Bundle on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO & AIEO */}
        <section className="space-y-6 pt-6 border-t border-stone-200">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Questions About Home Refills & Upkeep in Kenya
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REFILL_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                  <h3 className="font-bold text-stone-900 text-sm leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
