import Link from 'next/link';
import { 
  Sparkles, Clock, Star, ShieldCheck, ArrowRight, 
  MessageSquare, TrendingUp, Award, CheckCircle2 
} from 'lucide-react';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { SAMPLE_ROUNDUP_ARTICLES } from '../data/blog_articles';

export default function RightSidebar() {
  const topShops = SAMPLE_KENYAN_HOME_LISTINGS.slice(0, 3);
  const trendingArticles = SAMPLE_ROUNDUP_ARTICLES.slice(0, 3);

  return (
    <aside className="w-full lg:w-80 space-y-6 shrink-0 lg:sticky lg:top-24 self-start">
      {/* 1. CURATED PIECE OF THE DAY (High Trust, Elegant) */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-stone-100 text-stone-800 border border-stone-200">
            <Sparkles className="w-3 h-3 text-[#B45309]" />
            CURATED FEATURE OF THE DAY
          </span>
          <span className="text-[11px] text-stone-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Today Only
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden h-36 bg-stone-100 mb-3 relative">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
            alt="Chesterfield Sofa"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur">
            Kiln-Dried Mahogany
          </span>
        </div>

        <h4 className="font-bold text-sm text-stone-900 leading-snug mb-0.5">
          Chesterfield 7-Seater Modern Sofa Set
        </h4>
        <p className="text-[11px] text-stone-500 mb-3">
          WoodCraft Living • Kamakis Eastern Bypass
        </p>

        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-stone-900">KSh 58,000</span>
            <span className="text-xs text-stone-400 line-through">KSh 68,000</span>
          </div>
          <span className="text-[10px] font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-full">
            Free Nairobi Delivery
          </span>
        </div>

        <Link
          href="/shop/woodcraft-living-kamakis"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chat & Order on WhatsApp</span>
        </Link>
      </div>

      {/* 2. TOP VERIFIED LOCAL SHOPS */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#B45309]" />
            <span>Top Verified Local Shops</span>
          </h3>
          <span className="text-[10px] font-bold uppercase text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
            Vetted
          </span>
        </div>

        <div className="space-y-4">
          {topShops.map((shop) => (
            <Link
              key={shop.id}
              href={`/shop/${shop.slug}`}
              className="flex items-start gap-3 group pb-3 border-b border-stone-100 last:border-b-0 last:pb-0"
            >
              <div className="w-11 h-11 rounded-xl bg-stone-100 overflow-hidden shrink-0 relative">
                <img
                  src={shop.media.cover_image_url}
                  alt={shop.business_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#B45309] transition truncate">
                  {shop.business_name}
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  {shop.location.landmark}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-[#B45309] text-[#B45309]" />
                    <span>{shop.reputation.rating}</span>
                  </div>
                  {shop.commercial.mpesa_till_number && (
                    <span className="text-[10px] font-semibold text-emerald-800">
                      Till: {shop.commercial.mpesa_till_number}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. TRENDING BUYER INVESTIGATIONS */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#B45309]" />
            <span>Buyer Guides & Comparisons</span>
          </h3>
          <Link href="/blog" className="text-[11px] font-bold text-[#B45309] hover:underline">
            All Guides
          </Link>
        </div>

        <div className="space-y-3">
          {trendingArticles.map((article, idx) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="flex items-start gap-2.5 group"
            >
              <span className="w-5 h-5 rounded-md bg-stone-100 group-hover:bg-[#B45309] group-hover:text-white text-stone-600 text-[11px] font-black flex items-center justify-center shrink-0 transition mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-xs text-stone-800 group-hover:text-[#B45309] transition leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <span className="text-[10px] text-stone-400 mt-0.5 block">
                  {article.category} • {article.readTimeMinutes} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. WHATSAPP HOME DEALS COMMUNITY */}
      <div className="bg-stone-900 text-white rounded-3xl p-5 shadow-2xs border border-stone-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-white/10 text-emerald-400">
            <MessageSquare className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-bold text-xs text-white">Home Deals Channel</h4>
            <span className="text-[10px] text-stone-300">5,400+ Kenyan Homeowners</span>
          </div>
        </div>

        <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
          Get vetted local shop deals and emergency fundi contacts straight to your WhatsApp every morning. Zero spam.
        </p>

        <a
          href="https://whatsapp.com/channel/example"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-stone-950 font-bold text-xs hover:bg-stone-100 transition shadow-xs"
        >
          <span>Join Free WhatsApp Channel</span>
        </a>
      </div>
    </aside>
  );
}
