import Link from 'next/link';
import { Search, MapPin, Sparkles, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import DropOfTheDay from '../components/DropOfTheDay';
import BusinessCard from '../components/BusinessCard';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';

export default function HomePage() {
  const categories = [
    { name: 'Sofa & Living', slug: 'furniture', icon: '🛋️' },
    { name: 'Beds & Hardwood', slug: 'bedroom', icon: '🛏️' },
    { name: 'Plumbers & Solar', slug: 'plumbing', icon: '🔧' },
    { name: 'House Movers', slug: 'moving', icon: '📦' },
    { name: 'Gypsum & Paint', slug: 'painting', icon: '🎨' },
    { name: 'Kitchen & Decor', slug: 'kitchen', icon: '🍳' },
  ];

  const popularLocations = ['Ruiru (Kamakis)', 'Kilimani', 'Westlands', 'Ngong Road', 'Syokimau', 'Ruaka'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-10 sm:py-14 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Anti-Scam Verified Showrooms & Artisans</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4">
          Find Quality Home Products & Fundis in <span className="text-brand-600">Nairobi & Kiambu</span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Direct WhatsApp connection to verified workshops, solid hardwood furniture, emergency fundis, and house movers. Zero middleman fees.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Try 'Mahogany bed in Ruiru' or 'Plumber in Kilimani'..."
              className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
            <button className="absolute right-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition">
              Search
            </button>
          </div>
        </div>

        {/* Location Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-600">
          <span className="font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500" /> Popular:
          </span>
          {popularLocations.map((loc) => (
            <button
              key={loc}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-brand-500 hover:text-brand-600 transition shadow-2xs"
            >
              {loc}
            </button>
          ))}
        </div>
      </section>

      {/* Category Icons Grid */}
      <section className="my-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center sm:text-left">
          Browse by Home Solution
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/c/${cat.slug}`}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition text-center flex flex-col items-center justify-center group"
            >
              <span className="text-2xl mb-1.5 group-hover:scale-110 transition">{cat.icon}</span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Drop of the Day (Scarcity Monetization Showcase) */}
      <DropOfTheDay />

      {/* Featured Verified Showrooms */}
      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Verified Showrooms & Workshops</h2>
            <p className="text-xs text-slate-500">Physical workshops inspected with valid M-Pesa Tills and real customer reviews</p>
          </div>
          <Link href="/c/furniture" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SAMPLE_KENYAN_HOME_LISTINGS.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </section>

      {/* WhatsApp Consumer Channel Community Banner */}
      <section className="my-16 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Over 5,400+ Homeowners on WhatsApp</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Never Overpay for Furniture or Hire an Unreliable Fundi Again
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Join the free <strong>Home Kenya Deals & Living</strong> WhatsApp Channel. Get 1 curated furniture deal of the day, emergency fundi alerts, and honest home renovation prices straight to your phone.
          </p>
        </div>

        <div>
          <a
            href="https://whatsapp.com/channel/example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md transition"
          >
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span>Join Free on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Seller Outreach / Claim Callout */}
      <section className="bg-slate-100 rounded-2xl p-6 sm:p-8 text-center border border-slate-200">
        <h3 className="font-bold text-lg text-slate-900 mb-2">
          Are you a Furniture Maker, Artisan or Fundi in Nairobi / Kiambu?
        </h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto mb-5">
          Get listed on Home Kenya completely free of charge. No forms to fill—simply share your existing WhatsApp catalog or social media link with our team.
        </p>
        <Link
          href="https://wa.me/254712345678?text=Habari%20Home%20Kenya,%20ninataka%20kuweka%20biashara%20yangu%20listed"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Claim / Submit Your Business via WhatsApp</span>
        </Link>
      </section>
    </div>
  );
}
