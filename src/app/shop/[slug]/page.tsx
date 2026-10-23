import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  MapPin, Phone, MessageSquare, Star, ShieldCheck, CheckCircle2, 
  CreditCard, Clock, Award, Check, ChevronLeft, ArrowRight, Store,
  Camera, Ruler, Wrench, Sparkles, UserCheck, ThumbsUp, AlertTriangle,
  ExternalLink, Navigation
} from 'lucide-react';
import { 
  SAMPLE_KENYAN_HOME_LISTINGS, 
  SAMPLE_KENYAN_HOME_SERVICES, 
  SAMPLE_KENYAN_HOME_PRODUCTS,
  getBusinessBySlug 
} from '../../../data/mock_listings';
import ProductCard from '../../../components/ProductCard';
import ServiceCard from '../../../components/ServiceCard';
import RightSidebar from '../../../components/RightSidebar';
import SellerRecommendationWidget from '../../../components/SellerRecommendationWidget';
import { generateWhatsAppLeadLink } from '../../../utils/whatsapp_link';
import { generateLocalBusinessJsonLd } from '../../../utils/seo_generator';

export async function generateStaticParams() {
  return SAMPLE_KENYAN_HOME_LISTINGS.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    return {
      title: 'Shop Not Found | HomeDuka Kenya',
      description: 'The requested Kenyan merchant or shop profile was not found on HomeDuka.'
    };
  }

  return {
    title: `${business.business_name} | Verified Shop in ${business.location.neighborhood}, ${business.location.county}`,
    description: business.description || `Browse products and services directly from ${business.business_name} with verified Lipa na M-Pesa Till.`,
    alternates: {
      canonical: `https://homeduka.co.ke/shop/${business.slug}`
    }
  };
}

export default async function ShopDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const whatsappUrl = generateWhatsAppLeadLink(business);
  const jsonLd = generateLocalBusinessJsonLd(business);
  const servicesForBusiness = SAMPLE_KENYAN_HOME_SERVICES.filter((s) => s.business_id === business.id);
  const productsForBusiness = SAMPLE_KENYAN_HOME_PRODUCTS.filter((p) => p.business_id === business.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 min-h-[85vh]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3 mb-4 text-xs font-semibold text-stone-500">
          <Link
            href="/soko"
            className="inline-flex items-center gap-1.5 hover:text-stone-900 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </Link>

          <Link
            href="/buyer-protection"
            className="inline-flex items-center gap-1 text-emerald-800 hover:underline"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Buyer Protection Active</span>
          </Link>
        </div>

        {/* 2-Column Grid: Shop Details (Left) + High-Yield Sidebar (Right) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Shop Details */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            
            {/* HERO STOREFRONT CARD */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="relative h-64 sm:h-80 w-full bg-stone-900">
                <img
                  src={business.media.cover_image_url}
                  alt={business.business_name}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#B45309] text-white shadow-sm">
                      <Store className="w-3.5 h-3.5" />
                      <span>{business.verification.is_claimed ? 'Verified Physical Shop' : 'Pre-Listed Shop'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur text-white">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{business.recommendations?.percent || 98}% Recommended</span>
                    </span>
                    {business.commercial.mpesa_till_number && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur text-white">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Till: {business.commercial.mpesa_till_number}</span>
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-1">
                    {business.business_name}
                  </h1>
                  {business.tagline && (
                    <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                      {business.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Owner Portal Access */}
              <div className="p-3.5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B45309] shrink-0" />
                  <div>
                    <strong className="text-stone-900 block">Are you the owner of this business?</strong>
                    <span className="text-stone-600 text-[11px]">Manage products, update prices, and check buyer WhatsApp inquiries.</span>
                  </div>
                </div>
                <Link
                  href="/portal/demo-token"
                  className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs shadow-xs transition"
                >
                  Manage Seller Page
                </Link>
              </div>

              {/* TRUST IDENTITY BAR (Anti-Scam Verified Identity) */}
              <div className="p-6 bg-[#FAF8F5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1.5">
                  {/* Verified Contact Person */}
                  {business.contact_person && (
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                      <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Contact Person: <strong className="text-emerald-950 font-black">{business.contact_person.name}</strong> ({business.contact_person.role})</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold">
                        ID on File
                      </span>
                    </div>
                  )}

                  {/* Location & Landmark */}
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span><strong>Landmark:</strong> {business.location.landmark}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 pl-6">
                    {business.location.neighborhood}, {business.location.sub_county} ({business.location.county} County)
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Business Overview & Verified Credentials */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-stone-900 mb-2">About this Shop</h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {business.description}
                    </p>
                  </div>

                  {/* Customer Guarantees */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Verified Shop Commitments</span>
                    </h3>
                    <div className="space-y-1.5 text-xs text-stone-700">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#B45309] shrink-0" />
                        <span><strong>Free WhatsApp Photos/Video:</strong> Request a live photo or video of any item before purchasing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Inspection First:</strong> Welcomes showroom viewing or inspection upon gate delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Capabilities */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                      Shop Verification Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {business.commercial.has_physical_shop && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Physical Showroom / Yard Verified</span>
                        </div>
                      )}
                      {business.commercial.accepts_cash_on_delivery && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Pay After Inspection / Delivery Accepted</span>
                        </div>
                      )}
                      {business.verification.guarantee_or_warranty_offered && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Workmanship / Replacement Guarantee</span>
                        </div>
                      )}
                      {business.attributes.has_customer_parking && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Customer Parking on Premise</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar Details */}
                <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200 text-xs space-y-4">
                  {/* Safaricom Till Verification */}
                  <div>
                    <span className="font-semibold text-stone-400 block mb-1">Payment Verification</span>
                    <p className="font-bold text-emerald-900 text-sm">
                      Lipa na M-Pesa Till: {business.commercial.mpesa_till_number || 'Available on request'}
                    </p>
                    {business.commercial.mpesa_till_number && (
                      <Link
                        href={`/verify-till?q=${business.commercial.mpesa_till_number}`}
                        className="inline-flex items-center gap-1 text-[11px] text-[#B45309] font-bold underline mt-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verify this Till before paying</span>
                      </Link>
                    )}
                  </div>

                  <div>
                    <span className="font-semibold text-stone-400 block mb-1">Operating Hours</span>
                    <p className="font-medium text-stone-700">Mon - Fri: {business.operating_hours.monday_friday}</p>
                    <p className="font-medium text-stone-700">Saturday: {business.operating_hours.saturday}</p>
                    <p className="font-medium text-stone-700">Sunday: {business.operating_hours.sunday}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-400 block mb-1">Response Speed</span>
                    <p className="text-emerald-700 font-semibold">
                      ⚡ Replies in ~{business.reputation.response_time_minutes || 6} minutes on WhatsApp
                    </p>
                  </div>

                  {business.contact.google_maps_url && (
                    <div className="pt-2 border-t border-stone-200/80">
                      <a
                        href={business.contact.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 text-white font-bold text-xs"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Open in Google Maps</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* INTERACTIVE RECOMMENDATION & REPORT COMPONENT */}
            <SellerRecommendationWidget business={business} />

            {/* PRODUCTS FROM THIS SHOP */}
            {productsForBusiness.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200">
                      Live Catalog
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 mt-1">
                      Products from {business.business_name}
                    </h2>
                    <p className="text-xs text-stone-500">
                      Direct shop prices with 1-tap WhatsApp availability check
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {productsForBusiness.map((product) => (
                    <ProductCard key={product.id} product={product} business={business} />
                  ))}
                </div>
              </section>
            )}

            {/* SERVICES FROM THIS SHOP */}
            {servicesForBusiness.length > 0 && (
              <section className="space-y-4 pt-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    Workmanship & Installation
                  </span>
                  <h2 className="text-xl font-bold text-stone-900 mt-1">
                    Available Services
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {servicesForBusiness.map((service) => (
                    <ServiceCard key={service.id} service={service} business={business} />
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>

      {/* STICKY MOBILE FLOATING WHATSAPP BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xs border-t border-stone-200 z-50 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-bold text-stone-900 block truncate max-w-[180px]">
            {business.business_name}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">
            {business.contact_person ? `Speak to ${business.contact_person.name}` : 'Replies in ~6m'}
          </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-stone-900 text-white font-bold text-xs shadow-md"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Chat WhatsApp</span>
        </a>
      </div>
    </>
  );
}
