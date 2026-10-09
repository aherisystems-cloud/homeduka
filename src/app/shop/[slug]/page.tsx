import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, Phone, MessageSquare, Star, ShieldCheck, CheckCircle2, 
  CreditCard, Clock, Award, Check, ChevronLeft, ArrowRight, Store,
  Camera, Ruler, Wrench, Sparkles 
} from 'lucide-react';
import { 
  SAMPLE_KENYAN_HOME_LISTINGS, 
  SAMPLE_KENYAN_HOME_SERVICES, 
  SAMPLE_KENYAN_HOME_PRODUCTS 
} from '../../../data/mock_listings';
import TrustBadges from '../../../components/TrustBadges';
import ServiceCard from '../../../components/ServiceCard';
import ProductCard from '../../../components/ProductCard';
import RightSidebar from '../../../components/RightSidebar';
import { generateWhatsAppLeadLink } from '../../../utils/whatsapp_link';
import { generateLocalBusinessJsonLd } from '../../../utils/seo_generator';

export default async function ShopDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const business = SAMPLE_KENYAN_HOME_LISTINGS.find((b) => b.slug === slug);

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
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-4 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Kenya Home Directory</span>
        </Link>

        {/* 2-Column Grid: Shop Details (Left) + High-Yield Sidebar (Right) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Shop Details */}
          <div className="flex-1 min-w-0 w-full">
            {/* Hero Card */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs mb-8">
              <div className="relative h-64 sm:h-80 w-full bg-stone-900">
                <img
                  src={business.media.cover_image_url}
                  alt={business.business_name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#B45309] text-white shadow-sm">
                      <Store className="w-3.5 h-3.5" />
                      <span>{business.verification.is_claimed ? 'Verified Local Shop' : 'Pre-Listed Shop'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur text-white">
                      <Star className="w-3.5 h-3.5 fill-[#B45309] text-[#B45309]" />
                      <span>{business.reputation.rating} ({business.reputation.total_reviews} reviews)</span>
                    </span>
                    {business.verification.guarantee_or_warranty_offered && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur text-white">
                        <Award className="w-3.5 h-3.5 text-white" />
                        <span>Warranty Provided</span>
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-1">
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
              {!business.verification.is_claimed && (
                <div className="p-4 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B45309] shrink-0" />
                    <div>
                      <strong className="text-stone-900 block">Are you the owner of this business?</strong>
                      <span className="text-stone-600 text-[11px]">Add your products, update prices, and create flash deals directly from your seller portal.</span>
                    </div>
                  </div>
                  <Link
                    href="/portal/demo-token"
                    className="px-3.5 py-1.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-xs shadow-xs transition"
                  >
                    Manage Products & Services
                  </Link>
                </div>
              )}

              {/* Trust Bar below Hero */}
              <div className="p-6 bg-[#FAF8F5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
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
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Business Details Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-stone-900 mb-2">About this Business</h2>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {business.description}
                    </p>
                  </div>

                  {/* Shop Customer Guarantees */}
                  <div className="bg-stone-100 rounded-2xl p-4 border border-stone-200">
                    <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#B45309]" />
                      <span>What This Shop Guarantees</span>
                    </h3>
                    <div className="space-y-2 text-xs text-stone-700">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#B45309] shrink-0" />
                        <span className="font-semibold">Free WhatsApp Photo Check: Send a photo or video to get a fast price</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-[#B45309] shrink-0" />
                        <span className="font-semibold">Free Site Visit & Measurement in {business.location.neighborhood}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attributes Checklist */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                      Verified Shop Capabilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {business.attributes.uses_solid_hardwood && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B45309]" />
                          <span>Kiln-Dried Solid Hardwood (Mahogany, Mvule)</span>
                        </div>
                      )}
                      {business.attributes.delivery_available && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B45309]" />
                          <span>Delivery Available Across Kenya</span>
                        </div>
                      )}
                      {business.attributes.custom_orders_accepted && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B45309]" />
                          <span>Bespoke & Custom Dimensions</span>
                        </div>
                      )}
                      {business.attributes.written_warranty_provided && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B45309]" />
                          <span>Written Workmanship Warranty Included</span>
                        </div>
                      )}
                      {business.attributes.has_customer_parking && (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#B45309]" />
                          <span>Free Customer Parking & Showroom Viewing</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar Details */}
                <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200 text-xs space-y-4">
                  <div>
                    <span className="font-semibold text-stone-400 block mb-1">Operating Hours</span>
                    <p className="font-medium text-stone-700">Mon - Fri: {business.operating_hours.monday_friday}</p>
                    <p className="font-medium text-stone-700">Saturday: {business.operating_hours.saturday}</p>
                    <p className="font-medium text-stone-700">Sunday: {business.operating_hours.sunday}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-400 block mb-1">Payment Verification</span>
                    <p className="font-medium text-emerald-900">
                      Lipa na M-Pesa Buy Goods: <strong>{business.commercial.mpesa_till_number}</strong>
                    </p>
                    <p className="text-stone-500 mt-0.5">Pay on Delivery / Collection Accepted</p>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-400 block mb-1">Response Time</span>
                    <p className="text-emerald-700 font-medium">⚡ Replies in ~{business.reputation.response_time_minutes} minutes on WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products from this Shop (Tangible pieces) */}
            {productsForBusiness.length > 0 && (
              <section className="my-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200">
                      Showroom Catalog
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 mt-1">Products from this Shop</h2>
                    <p className="text-xs text-stone-500">
                      Handcrafted pieces ready for delivery or custom made to order
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

            {/* Services from this Shop (Labor / Installations) */}
            {servicesForBusiness.length > 0 && (
              <section className="my-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      Services & Labor Rates
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 mt-1">Available Services & Workmanship</h2>
                    <p className="text-xs text-stone-500">
                      Book certified technicians, custom fitting, and repair work directly from this shop
                    </p>
                  </div>
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

      {/* Sticky Mobile Floating WhatsApp Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur border-t border-stone-200 z-50 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-bold text-stone-900 block truncate max-w-[180px]">
            {business.business_name}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">Replies in ~8m</span>
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
