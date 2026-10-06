import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, Phone, MessageSquare, Star, ShieldCheck, CheckCircle2, 
  CreditCard, Clock, Award, Check, ChevronLeft, ArrowRight, Store 
} from 'lucide-react';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../../../data/mock_listings';
import TrustBadges from '../../../components/TrustBadges';
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

  const sampleProducts = [
    {
      title: "Chesterfield 7-Seater Modern Sofa Set",
      price: "KSh 55,000",
      material: "Kiln-dried Mahogany & Velvet Fabric",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      inStock: true
    },
    {
      title: "6x6 Bespoke Storage Bed with Drawers",
      price: "KSh 38,000",
      material: "Solid Mvule Hardwood & Tufted Headboard",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      inStock: true
    },
    {
      title: "6-Seater Solid Hardwood Dining Table",
      price: "KSh 45,000",
      material: "Mahogany Top with 6 Padded Chairs",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
      inStock: false
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home Kenya</span>
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-8">
          <div className="relative h-64 sm:h-80 w-full bg-slate-900">
            <img
              src={business.media.cover_image_url}
              alt={business.business_name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                  <Store className="w-3.5 h-3.5" />
                  <span>Verified Shop</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{business.reputation.rating} ({business.reputation.total_reviews} reviews)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-1">
                {business.business_name}
              </h1>

              {business.tagline && (
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {business.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Quick Info & Action Bar */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <TrustBadges
                tillNumber={business.commercial.mpesa_till_number}
                landmark={business.location.landmark}
                hasCod={business.commercial.accepts_cash_on_delivery}
                warrantyMonths={business.attributes.warranty_duration_months}
              />
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>{business.location.landmark}, {business.location.neighborhood}, {business.location.county}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Business Details Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2">About the Shop & Workshop</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {business.description}
                </p>
              </div>

              {/* Attributes Checklist */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Verified Capabilities & Service Standards
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {business.attributes.uses_solid_hardwood && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Solid Hardwood (Mahogany & Mvule)</span>
                    </div>
                  )}
                  {business.attributes.delivery_available && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Free Delivery within Nairobi & Kiambu</span>
                    </div>
                  )}
                  {business.attributes.custom_orders_accepted && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Bespoke & Custom Sizes Accepted</span>
                    </div>
                  )}
                  {business.attributes.written_warranty_provided && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Written Frame Warranty Included</span>
                    </div>
                  )}
                  {business.attributes.has_customer_parking && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Free Customer Parking on Site</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-4">
              <div>
                <span className="font-semibold text-slate-400 block mb-1">Operating Hours</span>
                <p className="font-medium text-slate-700">Mon - Fri: {business.operating_hours.monday_friday}</p>
                <p className="font-medium text-slate-700">Saturday: {business.operating_hours.saturday}</p>
                <p className="font-medium text-slate-700">Sunday: {business.operating_hours.sunday}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-400 block mb-1">Payment Options</span>
                <p className="font-medium text-emerald-800">
                  Lipa na M-Pesa Buy Goods Till: <strong>{business.commercial.mpesa_till_number}</strong>
                </p>
                <p className="text-slate-600 mt-0.5">Cash / M-Pesa on Delivery Accepted</p>
              </div>

              <div>
                <span className="font-semibold text-slate-400 block mb-1">Response Time</span>
                <p className="text-emerald-700 font-medium">⚡ Replies in ~{business.reputation.response_time_minutes} minutes on WhatsApp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Showcase */}
        <section className="my-10">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Products from this Shop</h2>
          <p className="text-xs text-slate-500 mb-6">Select an item to view details or inquire directly with workshop pricing</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sampleProducts.map((p, idx) => {
              const itemWhatsApp = generateWhatsAppLeadLink(business, { itemOrServiceName: p.title });
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 w-full bg-slate-100">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-slate-900 mb-1 leading-snug">{p.title}</h4>
                      <p className="text-xs text-slate-500 mb-2">{p.material}</p>
                      <p className="text-base font-black text-emerald-700">{p.price}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <a
                      href={itemWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Floating WhatsApp Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur border-t border-slate-200 z-50 sm:hidden flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-900 block truncate max-w-[180px]">
            {business.business_name}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold">Replies in ~8m</span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat WhatsApp</span>
        </a>
      </div>
    </>
  );
}
