import Link from 'next/link';
import { Clock, User, ArrowRight, BookOpen, Sparkles, MessageSquare } from 'lucide-react';
import { SAMPLE_ROUNDUP_ARTICLES } from '../../data/blog_articles';
import RightSidebar from '../../components/RightSidebar';

export const metadata = {
  title: 'Home Guides & Roundup Reviews | HomeDuka Kenya',
  description: 'In-depth, physically vetted buyer guides and roundup articles comparing furniture shops, emergency fundis, and house movers in Nairobi, Coast, Rift Valley, and across Kenya.',
};

export default function BlogIndexPage() {
  const featured = SAMPLE_ROUNDUP_ARTICLES[0];
  const otherArticles = SAMPLE_ROUNDUP_ARTICLES.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 min-h-[85vh]">
      {/* Blog Hero */}
      <section className="text-center py-6 sm:py-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vetted Buyer Guides & Market Comparisons</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
          Home Improvement, Furniture & Fundi <span className="text-brand-600">Guides</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Honest price investigations, physical shop inspections, and verified fundi recommendations to protect homeowners across Kenya.
        </p>
      </section>

      {/* Main Grid: Articles (Left) + RightSidebar (Right) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Articles */}
        <div className="flex-1 min-w-0 w-full space-y-8">
          {/* Featured Article Card */}
          {featured && (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-60 md:h-full w-full bg-slate-900">
                <img
                  src={featured.heroImage}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#B45309] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  Featured Investigation
                </span>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                    <span className="font-bold text-brand-600">{featured.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featured.readTimeMinutes} min read
                    </span>
                  </div>

                  <Link href={`/blog/${featured.slug}`}>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug hover:text-brand-600 transition mb-3">
                      {featured.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{featured.author.name}</span>
                  </div>

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All Roundup Articles Grid */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4">All Buyer Guides & Roundups</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {otherArticles.map((article) => (
                <div
                  key={article.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-100">
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTimeMinutes} min read</span>
                        <span>•</span>
                        <span>{article.publishDate}</span>
                      </div>

                      <Link href={`/blog/${article.slug}`}>
                        <h4 className="font-bold text-sm text-slate-900 hover:text-brand-600 transition leading-snug mb-2">
                          {article.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-brand-600 hover:text-brand-700 pt-3"
                    >
                      <span>View Ranked Shops & Rates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
