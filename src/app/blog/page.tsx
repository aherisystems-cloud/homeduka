import Link from 'next/link';
import { Clock, User, ArrowRight, BookOpen, Sparkles, MessageSquare } from 'lucide-react';
import { SAMPLE_ROUNDUP_ARTICLES } from '../../data/blog_articles';

export const metadata = {
  title: 'Home Guides & Roundup Reviews | Home Kenya',
  description: 'In-depth, physically vetted buyer guides and roundup articles comparing furniture workshops, emergency fundis, and house movers in Nairobi and Kiambu.',
};

export default function BlogIndexPage() {
  const categories = ['All Guides', 'Furniture', 'Fundis & Repairs', 'Moving & Storage'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Blog Hero */}
      <section className="text-center py-8 sm:py-12 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vetted Buyer Guides & Comparisons</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          Home Improvement & Furniture <span className="text-brand-600">Guides</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Honest pricing comparisons, physical workshop inspections, and verified fundi recommendations to help you make informed decisions in Nairobi and Kiambu.
        </p>
      </section>

      {/* Featured Article Card */}
      {SAMPLE_ROUNDUP_ARTICLES.length > 0 && (
        <div className="mb-12">
          {(() => {
            const featured = SAMPLE_ROUNDUP_ARTICLES[0];
            return (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full w-full bg-slate-900">
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    Featured Roundup
                  </span>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="font-bold text-brand-600">{featured.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {featured.readTimeMinutes} min read
                      </span>
                    </div>

                    <Link href={`/blog/${featured.slug}`}>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug hover:text-brand-600 transition mb-3">
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
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Articles Grid */}
      <section className="my-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">All Roundup Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SAMPLE_ROUNDUP_ARTICLES.slice(1).map((article) => (
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

      {/* WhatsApp Community Banner */}
      <section className="my-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Weekly WhatsApp Digest
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Want New Roundup Articles & Exclusive Weekend Drops?
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Join our free WhatsApp Channel to get fresh price guides and verified shop spotlights delivered directly to your phone.
          </p>
        </div>

        <a
          href="https://whatsapp.com/channel/example"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex-shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Join WhatsApp Channel</span>
        </a>
      </section>
    </div>
  );
}
