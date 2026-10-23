'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  MASTER_PRODUCT_CATEGORIES, 
  MasterCategoryDef, 
  SubCategoryDef 
} from '../../../data/kenyan_taxonomy';
import { 
  getProductsForMasterCategory, 
  getBusinessById 
} from '../../../data/mock_listings';
import { HomeProduct, BusinessProfile } from '../../../types/schema';
import { 
  Search, MapPin, ShieldCheck, Sparkles, PhoneCall, 
  MessageSquare, Grid, List, ArrowLeft, ArrowRight,
  ChevronDown, Flame, CheckCircle2, SlidersHorizontal, X, ExternalLink
} from 'lucide-react';

export default function SokoCategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const categoryParam = (params?.category as string) || 'electronics_phones';
  const initialSub = searchParams.get('sub') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialCounty = searchParams.get('county') || 'all';

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSub);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCounty, setSelectedCounty] = useState<string>(initialCounty);
  const [sortBy, setSortBy] = useState<'sponsored' | 'price_asc' | 'price_desc'>('sponsored');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Find active master category
  const masterCategory: MasterCategoryDef = useMemo(() => {
    return MASTER_PRODUCT_CATEGORIES.find(c => c.id === categoryParam) || MASTER_PRODUCT_CATEGORIES[0];
  }, [categoryParam]);

  // When category changes or query params change, update state
  useEffect(() => {
    const sub = searchParams.get('sub');
    if (sub) setSelectedSubcategory(sub);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Fetch all products for this master category
  const baseProducts = useMemo(() => {
    return getProductsForMasterCategory(masterCategory.id);
  }, [masterCategory.id]);

  // Filter and sort products
  const displayedProducts = useMemo(() => {
    let list = [...baseProducts];

    // 1. Subcategory filter
    if (selectedSubcategory !== 'all') {
      list = list.filter(p => p.subcategory === selectedSubcategory);
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const subMatch = p.subcategory.toLowerCase().includes(q);
        return titleMatch || descMatch || subMatch;
      });
    }

    // 3. County filter
    if (selectedCounty !== 'all') {
      list = list.filter(p => {
        const biz = getBusinessById(p.business_id);
        if (!biz) return true;
        return biz.location.county.toLowerCase() === selectedCounty.toLowerCase();
      });
    }

    // 4. Sorting
    if (sortBy === 'sponsored') {
      // Featured / Sponsored first, then by date
      list.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return 0;
      });
    } else if (sortBy === 'price_asc') {
      list.sort((a, b) => (a.pricing.regular_price_kes - b.pricing.regular_price_kes));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (b.pricing.regular_price_kes - a.pricing.regular_price_kes));
    }

    return list;
  }, [baseProducts, selectedSubcategory, searchQuery, selectedCounty, sortBy]);

  // Active subcategory details if selected
  const activeSubDef: SubCategoryDef | undefined = useMemo(() => {
    if (selectedSubcategory === 'all') return undefined;
    return masterCategory.subcategories.find(s => s.id === selectedSubcategory);
  }, [masterCategory, selectedSubcategory]);

  // Structured Data Schema (JSON-LD) for Google AI Overviews and SEO
  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${masterCategory.name} - Direct Soko Kenya`,
      description: masterCategory.tagline,
      url: `https://homeduka.co.ke/soko/${masterCategory.id}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: displayedProducts.slice(0, 20).map((prod, index) => {
          const biz = getBusinessById(prod.business_id);
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: prod.title,
              description: prod.description,
              image: prod.images?.[0] || '',
              offers: {
                '@type': 'Offer',
                price: prod.pricing.regular_price_kes,
                priceCurrency: 'KES',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'LocalBusiness',
                  name: biz?.business_name || 'Verified Kenyan Merchant',
                  telephone: biz?.contact.primary_phone || ''
                }
              }
            }
          };
        })
      }
    };
  }, [masterCategory, displayedProducts]);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#FAF9F6] pb-24">
        
        {/* Top Breadcrumb & Return Bar */}
        <div className="bg-white border-b border-stone-200/90 py-3 px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-500">
              <Link href="/" className="hover:text-stone-900 transition">Home</Link>
              <span>/</span>
              <span className="text-stone-400">Soko</span>
              <span>/</span>
              <strong className="text-stone-900 font-bold">{masterCategory.name}</strong>
              {activeSubDef && (
                <>
                  <span>/</span>
                  <span className="text-[#B45309] font-bold">{activeSubDef.name}</span>
                </>
              )}
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Categories</span>
            </Link>
          </div>
        </div>

        {/* Category Hero Banner */}
        <div className="bg-white border-b border-stone-200/90 py-8 px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl p-2.5 rounded-2xl bg-stone-100 border border-stone-200 shrink-0">
                  {masterCategory.icon}
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                    {activeSubDef ? `${activeSubDef.name}` : masterCategory.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5 max-w-2xl font-medium">
                    {activeSubDef ? activeSubDef.description : masterCategory.tagline}
                  </p>
                </div>
              </div>

              {/* Verified Guarantee Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Direct Seller Contacts • Lipa na M-Pesa Tills</span>
              </div>
            </div>

            {/* Subcategory Pills Bar (Horizontal Scrollable) */}
            <div className="pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
                  selectedSubcategory === 'all'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All {masterCategory.shortName} ({baseProducts.length})
              </button>

              {masterCategory.subcategories.map((sub) => {
                const isSelected = selectedSubcategory === sub.id;
                const count = baseProducts.filter(p => p.subcategory === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#B45309] text-white shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/90'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.name}</span>
                    {count > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-black/20 text-white' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-6">
          <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${masterCategory.shortName}...`}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* County Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Kenya (Countrywide)</option>
                <option value="nairobi">Nairobi County</option>
                <option value="kiambu">Kiambu County</option>
                <option value="nakuru">Nakuru County</option>
                <option value="mombasa">Mombasa County</option>
                <option value="uasin_gishu">Uasin Gishu (Eldoret)</option>
                <option value="machakos">Machakos County</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-stone-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                <option value="sponsored">⭐ Sponsored & Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'list' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Monetization Spotlight Card: Boost Your Listing */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl p-2 rounded-xl bg-white shadow-2xs shrink-0">⭐</span>
              <div>
                <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                  Sell in {masterCategory.shortName}? Boost to #1 Spot
                </h4>
                <p className="text-[11px] text-amber-900/80 mt-0.5">
                  100% pure sponsored listings. Get 10x more WhatsApp buyer inquiries. No sales commission, direct buyer chats.
                </p>
              </div>
            </div>

            <Link
              href="/sell"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-900 hover:bg-black text-white text-xs font-bold transition shadow-xs shrink-0"
            >
              <span>Promote My Products Here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Products Grid / List */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-600">
                Showing {displayedProducts.length} verified items in {masterCategory.shortName}
              </span>
              {selectedSubcategory !== 'all' && (
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className="text-xs font-bold text-[#B45309] hover:underline cursor-pointer"
                >
                  Show all subcategories
                </button>
              )}
            </div>

            {displayedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 space-y-3">
                <span className="text-4xl block">🔍</span>
                <h3 className="text-base font-bold text-stone-900">No products found</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  We couldn&apos;t find matching items for your filter. Try clearing your search query or switching counties.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubcategory('all');
                      setSelectedCounty('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {displayedProducts.map((prod) => {
                  const biz = getBusinessById(prod.business_id);
                  const whatsappMsg = encodeURIComponent(
                    `Hi, I found your product "${prod.title}" on HomeDuka / Soko priced at KSh ${prod.pricing.regular_price_kes.toLocaleString()}. Is it currently available?`
                  );
                  const phoneNum = biz?.contact.whatsapp_number || biz?.contact.primary_phone || '254712345678';

                  return (
                    <div 
                      key={prod.id}
                      className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      {/* Product Image & Badges */}
                      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                        <img 
                          src={prod.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                          {prod.is_featured ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Sponsored</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                              Verified Duka
                            </span>
                          )}

                          {biz?.commercial.mpesa_till_number && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm">
                              Till: {biz.commercial.mpesa_till_number}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Price Tag */}
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-lg font-extrabold text-stone-900 tracking-tight">
                              KSh {prod.pricing.regular_price_kes.toLocaleString()}
                            </span>
                            {prod.pricing.discount_price_kes && (
                              <span className="text-xs text-stone-400 line-through">
                                KSh {prod.pricing.discount_price_kes.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-[#B45309] transition">
                            {prod.title}
                          </h3>

                          {/* Seller & Location */}
                          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                            <span className="font-semibold text-stone-700 truncate max-w-[140px]">
                              {biz?.business_name || 'Verified Shop'}
                            </span>
                            <span className="flex items-center gap-1 shrink-0">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              <span>{biz?.location.neighborhood || biz?.location.county || 'Nairobi'}</span>
                            </span>
                          </div>
                        </div>

                        {/* Direct Action Buttons: WhatsApp & Call */}
                        <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                          <a
                            href={`https://wa.me/${phoneNum}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:+${biz?.contact.primary_phone || phoneNum}`}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-[11px] font-bold transition shadow-xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {displayedProducts.map((prod) => {
                  const biz = getBusinessById(prod.business_id);
                  const whatsappMsg = encodeURIComponent(
                    `Hi, I found your product "${prod.title}" on HomeDuka / Soko priced at KSh ${prod.pricing.regular_price_kes.toLocaleString()}. Is it currently available?`
                  );
                  const phoneNum = biz?.contact.whatsapp_number || biz?.contact.primary_phone || '254712345678';

                  return (
                    <div 
                      key={prod.id}
                      className="bg-white rounded-3xl p-4 border border-stone-200/90 hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img 
                          src={prod.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
                          alt={prod.title}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0"
                          loading="lazy"
                        />

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {prod.is_featured && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
                                Sponsored
                              </span>
                            )}
                            <span className="text-[11px] font-bold text-stone-500">
                              {biz?.business_name || 'Verified Kenyan Merchant'}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#B45309] transition leading-snug">
                            {prod.title}
                          </h3>

                          <div className="text-xs text-stone-500 flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" />
                              <span>{biz?.location.neighborhood}, {biz?.location.county}</span>
                            </span>
                            {biz?.commercial.mpesa_till_number && (
                              <span className="text-emerald-700 font-bold">
                                • Till: {biz.commercial.mpesa_till_number}
                              </span>
                            )}
                          </div>

                          <div className="text-base font-extrabold text-stone-900 pt-1">
                            KSh {prod.pricing.regular_price_kes.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <a
                          href={`https://wa.me/${phoneNum}?text=${whatsappMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Chat</span>
                        </a>

                        <a
                          href={`tel:+${biz?.contact.primary_phone || phoneNum}`}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Shop</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
}
