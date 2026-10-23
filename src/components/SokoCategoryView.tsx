'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MASTER_PRODUCT_CATEGORIES, 
  MasterCategoryDef, 
  SubCategoryDef 
} from '../data/kenyan_taxonomy';
import { 
  getProductsForMasterCategory, 
  getBusinessById 
} from '../data/mock_listings';
import { HomeProduct } from '../types/schema';
import { getMasterCategoryIcon } from './SokoMegaMenu';
import { 
  Search, MapPin, ShieldCheck, Sparkles, PhoneCall, 
  MessageSquare, Grid, List, ArrowLeft, ArrowRight,
  ChevronRight, X, SlidersHorizontal, Check, Tag
} from 'lucide-react';

interface SokoCategoryViewProps {
  categoryParam: string;
  subcategoryParam?: string;
}

export default function SokoCategoryView({ categoryParam, subcategoryParam }: SokoCategoryViewProps) {
  // Find active master category
  const masterCategory: MasterCategoryDef = useMemo(() => {
    return MASTER_PRODUCT_CATEGORIES.find(c => c.id === categoryParam) || MASTER_PRODUCT_CATEGORIES[0];
  }, [categoryParam]);

  // Active subcategory if provided via URL segment
  const activeSubcategory = subcategoryParam || 'all';

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [onlyVerifiedTill, setOnlyVerifiedTill] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<'sponsored' | 'price_asc' | 'price_desc'>('sponsored');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch all base products for this master vertical
  const baseProducts = useMemo(() => {
    return getProductsForMasterCategory(masterCategory.id);
  }, [masterCategory.id]);

  // Active subcategory definition
  const activeSubDef: SubCategoryDef | undefined = useMemo(() => {
    if (activeSubcategory === 'all') return undefined;
    return masterCategory.subcategories.find(s => s.id === activeSubcategory);
  }, [masterCategory, activeSubcategory]);

  // Filter products based on sidebar selections
  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    // 1. Subcategory filter
    if (activeSubcategory !== 'all') {
      list = list.filter(p => p.subcategory === activeSubcategory);
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

    // 4. Verified Till only filter
    if (onlyVerifiedTill) {
      list = list.filter(p => {
        const biz = getBusinessById(p.business_id);
        return Boolean(biz?.commercial.mpesa_till_number);
      });
    }

    // 5. Max Price filter
    if (maxPrice.trim()) {
      const limit = Number(maxPrice);
      if (!isNaN(limit) && limit > 0) {
        list = list.filter(p => p.pricing.regular_price_kes <= limit);
      }
    }

    // 6. Sorting
    if (sortBy === 'sponsored') {
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
  }, [baseProducts, activeSubcategory, searchQuery, selectedCounty, onlyVerifiedTill, maxPrice, sortBy]);

  // Schema.org JSON-LD
  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: activeSubDef ? `${activeSubDef.name} - ${masterCategory.name}` : `${masterCategory.name} - Direct Soko Kenya`,
      description: activeSubDef ? activeSubDef.description : masterCategory.tagline,
      url: `https://homeduka.co.ke/soko/${masterCategory.id}${activeSubDef ? `/${activeSubDef.id}` : ''}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: filteredProducts.slice(0, 24).map((prod, index) => {
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
                  name: biz?.business_name || 'Verified Merchant',
                  telephone: biz?.contact.primary_phone || ''
                }
              }
            }
          };
        })
      }
    };
  }, [masterCategory, activeSubDef, filteredProducts]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#FAF9F6] pb-24">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="bg-white border-b border-stone-200/90 py-3 px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-500">
              <Link href="/" className="hover:text-stone-900 transition">Home</Link>
              <span>/</span>
              <Link href="/soko" className="hover:text-stone-900 transition">All Categories</Link>
              <span>/</span>
              <Link href={`/soko/${masterCategory.id}`} className={activeSubDef ? "hover:text-stone-900 transition" : "text-stone-900 font-bold"}>
                {masterCategory.name}
              </Link>
              {activeSubDef && (
                <>
                  <span>/</span>
                  <span className="text-stone-900 font-bold">{activeSubDef.name}</span>
                </>
              )}
            </div>

            <Link
              href="/soko"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Categories Hub</span>
            </Link>
          </div>
        </div>

        {/* Category Header Banner */}
        <div className="bg-white border-b border-stone-200/90 py-6 px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 shrink-0">
                {getMasterCategoryIcon(masterCategory.id, "w-6 h-6 text-stone-900")}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {activeSubDef ? activeSubDef.name : masterCategory.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5 max-w-3xl">
                  {activeSubDef ? activeSubDef.description : masterCategory.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-xl border border-stone-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct Verified Sellers • No Broker Markup</span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN SHOPPING LAYOUT: SIDEBAR ON LEFT, PRODUCTS ON RIGHT */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. LEFT SIDEBAR (FILTERS, SUBCATEGORIES, LOCATION) */}
            <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              
              {/* Search Inside Category */}
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Search in {masterCategory.shortName}
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`e.g. ${masterCategory.subcategories[0]?.name.split(' ')[0]}...`}
                    className="w-full pl-8 pr-7 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Subcategories List */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Categories
                  </label>
                  <span className="text-[10px] text-stone-400 font-semibold">
                    {masterCategory.subcategories.length} Subcategories
                  </span>
                </div>

                <div className="space-y-1">
                  <Link
                    href={`/soko/${masterCategory.id}`}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      activeSubcategory === 'all'
                        ? 'bg-stone-900 text-white font-bold shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <span>All {masterCategory.shortName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      activeSubcategory === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {baseProducts.length}
                    </span>
                  </Link>

                  {masterCategory.subcategories.map((sub) => {
                    const isSelected = activeSubcategory === sub.id;
                    const count = baseProducts.filter(p => p.subcategory === sub.id).length;
                    return (
                      <Link
                        key={sub.id}
                        href={`/soko/${masterCategory.id}/${sub.id}`}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                          isSelected
                            ? 'bg-stone-900 text-white font-bold shadow-2xs'
                            : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        <span className="truncate pr-2">{sub.name}</span>
                        {count > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-md shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                          }`}>
                            {count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* County / Location Selector */}
              <div className="pt-4 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Seller Location
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-semibold focus:outline-hidden cursor-pointer"
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
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Max Budget (KSh)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
                />
              </div>

              {/* Verified Payment Filter */}
              <div className="pt-4 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={onlyVerifiedTill}
                    onChange={(e) => setOnlyVerifiedTill(e.target.checked)}
                    className="w-4 h-4 rounded text-stone-900 focus:ring-0 cursor-pointer"
                  />
                  <span>Verified M-Pesa Tills Only</span>
                </label>
              </div>

              {/* Reset Filters */}
              {(searchQuery || selectedCounty !== 'all' || onlyVerifiedTill || maxPrice) && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCounty('all');
                      setOnlyVerifiedTill(false);
                      setMaxPrice('');
                    }}
                    className="w-full py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Monetization Card for Sellers */}
              <div className="pt-4 border-t border-stone-100">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sell in this category?</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    List your items free or boost to the #1 spot for KES 250/day. Direct WhatsApp chats.
                  </p>
                  <Link
                    href="/sell"
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:underline pt-1"
                  >
                    <span>Post Free Product Listing</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </aside>

            {/* 2. RIGHT CONTENT: PRODUCTS GRID & CONTROLS */}
            <main className="lg:col-span-9 space-y-5">
              
              {/* Top Controls Bar */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold text-stone-700">
                  Showing <strong className="text-stone-900">{filteredProducts.length}</strong> products
                </span>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-medium">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
                    >
                      <option value="sponsored">Sponsored First</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Grid / List Toggle */}
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        viewMode === 'grid' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        viewMode === 'list' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400 hover:text-stone-700'
                      }`}
                      title="List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
                  <span className="text-3xl block">🔍</span>
                  <h3 className="text-sm font-bold text-stone-900">No products match your criteria</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try clearing your search query or adjusting your filters in the left sidebar.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCounty('all');
                      setOnlyVerifiedTill(false);
                      setMaxPrice('');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((prod) => {
                    const biz = getBusinessById(prod.business_id);
                    const whatsappMsg = encodeURIComponent(
                      `Hi, I saw your product "${prod.title}" on HomeDuka / Soko priced at KSh ${prod.pricing.regular_price_kes.toLocaleString()}. Is it currently available?`
                    );
                    const phoneNum = biz?.contact.whatsapp_number || biz?.contact.primary_phone || '254712345678';

                    return (
                      <div 
                        key={prod.id}
                        className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        {/* Image */}
                        <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                          <img 
                            src={prod.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
                            alt={prod.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                            loading="lazy"
                          />

                          {/* Badges */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                            {prod.is_featured ? (
                              <span className="px-2 py-0.5 rounded-md bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                                Sponsored
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium">
                                Verified
                              </span>
                            )}

                            {biz?.commercial.mpesa_till_number && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold shadow-xs">
                                Till: {biz.commercial.mpesa_till_number}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-base font-extrabold text-stone-900 tracking-tight mb-1">
                              KSh {prod.pricing.regular_price_kes.toLocaleString()}
                            </div>

                            <h3 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-stone-700 transition">
                              {prod.title}
                            </h3>

                            <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                              <span className="font-semibold text-stone-700 truncate max-w-[130px]">
                                {biz?.business_name || 'Verified Merchant'}
                              </span>
                              <span className="flex items-center gap-1 shrink-0">
                                <MapPin className="w-3 h-3 text-stone-400" />
                                <span>{biz?.location.neighborhood || biz?.location.county || 'Nairobi'}</span>
                              </span>
                            </div>
                          </div>

                          {/* Direct Actions: WhatsApp & Call */}
                          <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                            <a
                              href={`https://wa.me/${phoneNum}?text=${whatsappMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition shadow-2xs"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={`tel:+${biz?.contact.primary_phone || phoneNum}`}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-stone-900 hover:bg-black text-white text-[11px] font-bold transition shadow-2xs"
                            >
                              <PhoneCall className="w-3 h-3" />
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
                  {filteredProducts.map((prod) => {
                    const biz = getBusinessById(prod.business_id);
                    const whatsappMsg = encodeURIComponent(
                      `Hi, I saw your product "${prod.title}" on HomeDuka / Soko priced at KSh ${prod.pricing.regular_price_kes.toLocaleString()}. Is it currently available?`
                    );
                    const phoneNum = biz?.contact.whatsapp_number || biz?.contact.primary_phone || '254712345678';

                    return (
                      <div 
                        key={prod.id}
                        className="bg-white rounded-2xl p-4 border border-stone-200 hover:shadow-xs transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img 
                            src={prod.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
                            alt={prod.title}
                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                            loading="lazy"
                          />

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {prod.is_featured && (
                                <span className="px-1.5 py-0.2 rounded bg-stone-900 text-white text-[9px] font-bold uppercase">
                                  Sponsored
                                </span>
                              )}
                              <span className="text-[11px] font-semibold text-stone-500">
                                {biz?.business_name || 'Verified Merchant'}
                              </span>
                            </div>

                            <h3 className="text-xs font-bold text-stone-900 group-hover:text-stone-700 transition leading-snug">
                              {prod.title}
                            </h3>

                            <div className="text-[11px] text-stone-500 flex items-center gap-2">
                              <span>{biz?.location.neighborhood}, {biz?.location.county}</span>
                              {biz?.commercial.mpesa_till_number && (
                                <span className="text-emerald-700 font-bold">
                                  • Till: {biz.commercial.mpesa_till_number}
                                </span>
                              )}
                            </div>

                            <div className="text-sm font-extrabold text-stone-900">
                              KSh {prod.pricing.regular_price_kes.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                          <a
                            href={`https://wa.me/${phoneNum}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:+${biz?.contact.primary_phone || phoneNum}`}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-2xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </main>

          </div>
        </div>

      </div>
    </>
  );
}
