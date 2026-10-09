import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Clock, User, ShieldCheck, MapPin, CreditCard, MessageSquare, 
  CheckCircle2, ArrowLeft, ArrowRight, HelpCircle, Lightbulb, Star 
} from 'lucide-react';
import { SAMPLE_ROUNDUP_ARTICLES } from '../../../data/blog_articles';
import RightSidebar from '../../../components/RightSidebar';

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = SAMPLE_ROUNDUP_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "image": article.heroImage,
    "datePublished": article.publishDate,
    "author": {
      "@type": "Person",
      "name": article.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Home Kenya",
      "url": "https://homekenya.co.ke"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 pb-24 min-h-[85vh]">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </Link>

        {/* 2-Column Grid: Article (Left) + RightSidebar (Right) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Article Content */}
          <article className="flex-1 min-w-0 w-full">
            {/* Article Header */}
            <header className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                  {article.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min read
                </span>
                <span>•</span>
                <span>Updated {article.publishDate}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center gap-3 pt-2 text-xs text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{article.author.name}</p>
                  <p className="text-[11px] text-slate-500">{article.author.role}</p>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-900 mb-8 shadow-sm">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Comparison Snapshot Box */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 mb-8 text-xs text-emerald-950">
              <div className="flex items-center gap-2 mb-2 font-bold text-emerald-900 text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>At-a-Glance Comparison Snapshot</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-emerald-200/60">
                <div>
                  <span className="text-emerald-700 font-semibold block">Category Analyzed:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{article.comparisonSummary.category}</p>
                </div>
                <div>
                  <span className="text-emerald-700 font-semibold block">Typical Fair Price Range:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{article.comparisonSummary.averagePriceRange}</p>
                </div>
                <div>
                  <span className="text-emerald-700 font-semibold block">Top Verified Pick:</span>
                  <p className="font-bold text-emerald-800 mt-0.5">{article.comparisonSummary.topPick}</p>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed mb-10">
              <p>{article.introduction}</p>
            </div>

            {/* Featured Shops Roundup Section */}
            <section className="space-y-6 my-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                The Top Ranked Local Shops & Businesses
              </h2>

              {article.featuredShops.map((shop) => {
                const whatsappText = encodeURIComponent(
                  `Habari ${shop.businessName},\nNimeona profile yenu kwenye Home Kenya guide ya *${article.title}*.\nNapenda kuulizia kuhusu: *${shop.keySpecialty}*.\nJe, bei na delivery ikoje? Asante!`
                );
                const whatsappUrl = `https://wa.me/${shop.whatsappNumber}?text=${whatsappText}`;

                return (
                  <div
                    key={shop.rank}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition p-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-base flex items-center justify-center flex-shrink-0">
                          #{shop.rank}
                        </span>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 leading-tight">
                            {shop.businessName}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {shop.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-400 block font-semibold">Starting From</span>
                        <span className="text-xl font-black text-emerald-700">
                          KSh {shop.priceStartingKes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                      <span className="badge-trust badge-landmark">
                        <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>{shop.landmark} ({shop.neighborhood})</span>
                      </span>

                      {shop.mpesaTill && (
                        <span className="badge-trust badge-mpesa">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                          <span>M-Pesa Till: <strong>{shop.mpesaTill}</strong></span>
                        </span>
                      )}
                    </div>

                    {/* Photo & Pros */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                      <div className="h-44 rounded-2xl overflow-hidden bg-slate-100">
                        <img
                          src={shop.image}
                          alt={shop.businessName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Why This Shop Ranked #{shop.rank}:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {shop.pros.map((pro, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
                      <Link
                        href={`/shop/${shop.businessSlug}`}
                        className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
                      >
                        View Full Shop Page & Products
                      </Link>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Buyer Checklist */}
            <section className="bg-stone-100 rounded-3xl p-6 border border-stone-200 my-10">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#B45309]" />
                <span>Buyer Checklist for Kenyan Homeowners</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {article.buyingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B45309] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs */}
            {article.faq.length > 0 && (
              <section className="my-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-2.5">
                  {article.faq.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{item.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
