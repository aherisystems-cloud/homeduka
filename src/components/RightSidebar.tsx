import Link from 'next/link';
import { 
  Flame, Clock, Star, ShieldCheck, ArrowRight, 
  MessageSquare, Sparkles, TrendingUp, Award, ExternalLink 
} from 'lucide-react';
import { SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { SAMPLE_ROUNDUP_ARTICLES } from '../data/blog_articles';

export default function RightSidebar() {
  const topShops = SAMPLE_KENYAN_HOME_LISTINGS.slice(0, 3);
  const trendingArticles = SAMPLE_ROUNDUP_ARTICLES.slice(0, 3);

  return (
    <aside className="w-full lg:w-80 space-y-6 flex-shrink-0">
      {/* 1. SCARCITY FLASH DEAL / DROP OF THE DAY */}
      <div className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 rounded-3xl p-0.5 shadow-md text-white">
        <div className="bg-slate-900 rounded-[22px] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/30">
              <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              DROP SLOT 1 OF 2
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Ends in 7h
            </span>
          </div>

          <h4 className="font-bold text-sm text-white leading-snug mb-1">
            7-Seater Chesterfield (Velvet)
          </h4>
          <p className="text-[11px] text-slate-400 mb-3">
            Classic Hardwood • Kamakis Bypass
          </p>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-black text-emerald-400">KSh 44,500</span>
            <span className="text-xs text-slate-500 line-through">KSh 55,000</span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded">
              -19% OFF
            </span>
          </div>

          <Link
            href="/shop/classic-hardwood-furniture-kamakis"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Claim Drop on WhatsApp</span>
          </Link>
          <p className="text-[10px] text-center text-slate-500 mt-2">
            Only 2 sets available at this promotional rate
          </p>
        </div>
      </div>

      {/* 2. TOP VERIFIED SHOPS (BEST SELLERS) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-600" />
            <span>Top Verified Shops</span>
          </h3>
          <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Vetted
          </span>
        </div>

        <div className="space-y-4">
          {topShops.map((shop, idx) => (
            <Link
              key={shop.id}
              href={`/shop/${shop.slug}`}
              className="flex items-start gap-3 group pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 relative">
                <img
                  src={shop.media.cover_image_url}
                  alt={shop.business_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-brand-600 transition truncate">
                  {shop.business_name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {shop.location.landmark} ({shop.location.neighborhood})
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{shop.reputation.rating}</span>
                  </div>
                  {shop.commercial.mpesa_till_number && (
                    <span className="text-[10px] font-semibold text-emerald-700">
                      Till: {shop.commercial.mpesa_till_number}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. TRENDING BUYER GUIDES & ROUNDUPS (TOP X POSTS) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Trending Buyer Guides</span>
          </h3>
          <Link href="/blog" className="text-[11px] font-bold text-brand-600 hover:underline">
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
              <span className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-brand-600 group-hover:text-white text-slate-600 text-[11px] font-black flex items-center justify-center flex-shrink-0 transition mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-xs text-slate-800 group-hover:text-brand-600 transition leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {article.category} • {article.readTimeMinutes} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. WHATSAPP VIP COMMUNITY WIDGET */}
      <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-emerald-800 text-emerald-300">
            <MessageSquare className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-bold text-xs text-white">Home Deals Channel</h4>
            <span className="text-[10px] text-emerald-300">5,400+ Kenyan Members</span>
          </div>
        </div>

        <p className="text-[11px] text-emerald-100 leading-relaxed mb-3">
          Get 1 curated furniture flash drop and emergency fundi rates straight to your WhatsApp every morning.
        </p>

        <a
          href="https://whatsapp.com/channel/example"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition shadow-xs"
        >
          <span>Join Free on WhatsApp</span>
        </a>
      </div>

      {/* 5. SPONSORED LOCAL BRAND BANNER (Ad Slot) */}
      <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center text-slate-500">
        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 block mb-1">
          Sponsored Partner
        </span>
        <h5 className="font-bold text-xs text-slate-800 mb-0.5">
          Crown Paints & Duracoat Specialists
        </h5>
        <p className="text-[10px] text-slate-500 mb-2">
          Find certified painters in your estate with genuine paint warranty.
        </p>
        <Link
          href="/c/painting"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
        >
          <span>Find Certified Painters</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}
