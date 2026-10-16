'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { 
  PlusCircle, Camera, Check, Trash2, ArrowLeft, 
  ExternalLink, Sparkles, AlertCircle, Eye, ShieldCheck, Ruler, Share2,
  Flame, Calendar, Clock, X, Tag, Search, LayoutGrid, List,
  TrendingUp, Users, MessageSquare, PhoneCall, MapPin, Truck, ArrowRight,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

const RESTOCK_CATEGORIES = [
  'cooking_gas',
  'drinking_water',
  'cleaning_supplies',
  'water_tank_cleaning',
  'pest_control',
  'solar_servicing',
];

interface InquiryLead {
  buyerLocation: string;
  action: string;
  timeAgo: string;
}

interface ProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
  inStock: boolean;
  slug: string;
  category: string;
  isMonthlyRestock?: boolean;
  dealPrice?: string;
  dealDuration?: 'today' | 'month';
  views: number;
  clicks: number; // WhatsApp chats / calls
  inquiryLeads: InquiryLead[];
}

export default function SellerPage() {
  const params = useParams();
  const token = params?.token as string;

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod-1',
      title: 'Chesterfield 7-Seater Modern Hardwood Sofa Set',
      price: 'KSh 55,000',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      slug: 'chesterfield-7-seater-kamakis',
      category: 'furniture',
      isMonthlyRestock: false,
      dealPrice: 'KSh 48,000',
      dealDuration: 'today',
      views: 1420,
      clicks: 84,
      inquiryLeads: [
        { buyerLocation: 'Kilimani, Nairobi', action: 'Inquired on custom grey fabric & delivery', timeAgo: '14 mins ago' },
        { buyerLocation: 'Kamakis, Ruiru', action: 'Requested workshop visit location on WhatsApp', timeAgo: '2 hours ago' },
        { buyerLocation: 'Eldoret Town', action: 'Asked for Canter parcel drop freight cost', timeAgo: 'Yesterday' }
      ]
    },
    {
      id: 'prod-2',
      title: '6x6 Bespoke Storage Bed with Hydraulic Drawers',
      price: 'KSh 38,000',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      category: 'furniture',
      isMonthlyRestock: false,
      slug: 'mahogany-storage-bed-6x6',
      views: 980,
      clicks: 52,
      inquiryLeads: [
        { buyerLocation: 'Westlands, Nairobi', action: 'Asked if mahogany timber is kiln-dried', timeAgo: '45 mins ago' },
        { buyerLocation: 'South B, Nairobi', action: 'Requested gate delivery quote with assembly', timeAgo: '3 hours ago' }
      ]
    },
    {
      id: 'prod-3',
      title: '6-Seater Solid Hardwood Mahogany Dining Table',
      price: 'KSh 45,000',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
      inStock: false,
      category: 'furniture',
      isMonthlyRestock: false,
      slug: '6-seater-dining-table-ruiru',
      views: 640,
      clicks: 29,
      inquiryLeads: [
        { buyerLocation: 'Rongai, Kajiado', action: 'Asked when next batch will be ready', timeAgo: 'Yesterday' }
      ]
    },
    {
      id: 'prod-4',
      title: '20L Drinking Water Scheduled Doorstep Refill Exchange',
      price: 'KSh 350',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      category: 'drinking_water',
      isMonthlyRestock: true,
      slug: '20l-drinking-water-refill',
      views: 1200,
      clicks: 76,
      inquiryLeads: [
        { buyerLocation: 'Kamakis Estate, Ruiru', action: 'Ordered weekly water refill via WhatsApp', timeAgo: '30 mins ago' },
        { buyerLocation: 'Kahawa Sukari', action: 'Asked if dispenser bottle cap is KEBS sealed', timeAgo: '5 hours ago' }
      ]
    }
  ]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in_stock' | 'deals' | 'restock' | 'out_of_stock'>('all');
  const [sortBy, setSortBy] = useState<'inquiries' | 'views' | 'price_desc' | 'price_asc'>('inquiries');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Add Product Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('furniture');
  const [newIsRestock, setNewIsRestock] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Seller Guarantees State (Moved to compact sidebar)
  const [affirmedWhatsApp, setAffirmedWhatsApp] = useState(true);
  const [affirmedLocalMeasurement, setAffirmedLocalMeasurement] = useState(true);

  // Deal Slasher State
  const [dealModalProduct, setDealModalProduct] = useState<ProductItem | null>(null);
  const [dealInputPrice, setDealInputPrice] = useState('');
  const [dealInputDuration, setDealInputDuration] = useState<'today' | 'month'>('today');

  // Overall Performance KPIs
  const totalViews = useMemo(() => products.reduce((acc, p) => acc + p.views, 0), [products]);
  const totalClicks = useMemo(() => products.reduce((acc, p) => acc + p.clicks, 0), [products]);
  const topProduct = useMemo(() => {
    return [...products].sort((a, b) => b.clicks - a.clicks)[0];
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Text Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesPrice = item.price.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesPrice) return false;
      }

      // 2. Tab Filter
      if (selectedFilter === 'in_stock' && !item.inStock) return false;
      if (selectedFilter === 'out_of_stock' && item.inStock) return false;
      if (selectedFilter === 'deals' && !item.dealPrice) return false;
      if (selectedFilter === 'restock' && !item.isMonthlyRestock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'inquiries') return b.clicks - a.clicks;
      if (sortBy === 'views') return b.views - a.views;
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'price_asc') return priceA - priceB;
      return 0;
    });
  }, [products, searchQuery, selectedFilter, sortBy]);

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
    showNotice('Live status updated instantly on your customer-facing shop.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showNotice('Item removed from your showcase.');
  };

  const openDealModal = (item: ProductItem) => {
    setDealModalProduct(item);
    setDealInputPrice('');
    setDealInputDuration('today');
  };

  const handleSaveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealModalProduct || !dealInputPrice) return;

    const formattedDealPrice = `KSh ${Number(dealInputPrice).toLocaleString()}`;
    setProducts((prev) =>
      prev.map((item) =>
        item.id === dealModalProduct.id
          ? { ...item, dealPrice: formattedDealPrice, dealDuration: dealInputDuration }
          : item
      )
    );

    showNotice(
      `🔥 Price slashed! "${dealModalProduct.title}" is now highlighted on the Deals page (${
        dealInputDuration === 'today' ? "Today's Flash Deal" : 'Deal of the Month'
      })!`
    );
    setDealModalProduct(null);
  };

  const handleRemoveDeal = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, dealPrice: undefined, dealDuration: undefined } : item
      )
    );
    showNotice('Price restored back to regular shop price.');
  };

  const handleScheduleSocial = async (item: ProductItem) => {
    showNotice(`📱 Queuing "${item.title}" to WhatsApp & social channels...`);
    try {
      const res = await fetch('/api/social/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: {
            platform: 'instagram',
            caption: `✨ ${item.title} ✨\n\n💰 Price: ${item.price}\n📍 Verified Local Shop along Eastern Bypass Kamakis\n\n💬 Order on WhatsApp: https://homeduka.co.ke`,
            hashtags: ['#HomeKenya', '#NairobiHomes', '#KenyanFurniture'],
            imageUrl: item.image,
            whatsappDeepLink: 'https://homeduka.co.ke',
            callToAction: 'Order on WhatsApp'
          },
          businessId: 'biz-woodcraft-kamakis-001'
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotice(`🚀 Successfully scheduled to social channels!`);
      } else {
        showNotice(`🚀 Post copy ready for automated social release!`);
      }
    } catch {
      showNotice(`🚀 Post copy ready for automated social release!`);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    setIsSubmitting(true);
    const isEligible = RESTOCK_CATEGORIES.includes(newCategory);
    const qualifiedRestock = isEligible && newIsRestock;

    setTimeout(() => {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        title: newTitle,
        price: `KSh ${Number(newPrice).toLocaleString()}`,
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=400&q=80',
        inStock: true,
        category: newCategory,
        isMonthlyRestock: qualifiedRestock,
        slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
        views: 1,
        clicks: 0,
        inquiryLeads: []
      };

      setProducts([newProd, ...products]);
      setNewTitle('');
      setNewPrice('');
      setNewNote('');
      setNewIsRestock(false);
      setIsAdding(false);
      setIsSubmitting(false);
      showNotice(
        qualifiedRestock 
          ? '🎉 Restock item published to Monthly Restock Hub!' 
          : '🚀 Product published live on HomeDuka!'
      );
    }, 600);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 sm:py-12">
      {/* Expansive Container Utilizing Side Gutters */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-stone-900 transition flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Marketplace</span>
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-bold">My Seller Page</span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Store Live & Open</span>
          </span>
        </div>

        {/* 1. TOP ACTION BAR (The Very First Thing Sellers See) */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20 text-xs font-bold backdrop-blur">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Seller Account • Kamakis Bypass</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              WoodCraft Living Kenya
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Manage your live items, see how many Kenyan homeowners are viewing and clicking your WhatsApp, and slash prices for flash sales.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-5 py-3 rounded-2xl bg-[#B45309] hover:bg-[#92400E] text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAdding ? 'Close Form' : '+ Add New Product'}</span>
            </button>

            <Link
              href="/shop/woodcraft-living-kamakis"
              target="_blank"
              className="px-4 py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-950 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 active:scale-95"
            >
              <Eye className="w-4 h-4 text-stone-800" />
              <span>View Live Shop</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </Link>
          </div>
        </div>

        {/* Toast Notification Banner */}
        {notification && (
          <div className="p-4 rounded-2xl bg-stone-900 text-white text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-lg border-l-4 border-[#B45309] animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#B45309] shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* 2. MAIN 2-COLUMN DASHBOARD LAYOUT (UTILIZING BLANK GUTTERS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Showcase, Analytics, Search & Product Management (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* PERFORMANCE SCORECARD: Views, Clicks & Conversion */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#B45309]" />
                  <h2 className="font-extrabold text-sm sm:text-base text-stone-900">
                    Product Performance & Buyer Inquiries
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-stone-500">Live 30-Day Activity</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 block tracking-tight">
                    {totalViews.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-stone-500 font-semibold block">Total Item Views</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-xl sm:text-2xl font-black text-emerald-900 block tracking-tight">
                    {totalClicks}
                  </span>
                  <span className="text-[11px] text-emerald-800 font-bold block">WhatsApp Inquiries</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-xl sm:text-2xl font-black text-[#B45309] block tracking-tight">
                    {((totalClicks / (totalViews || 1)) * 100).toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-stone-500 font-semibold block">Lead Conversion</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 block tracking-tight">
                    {products.filter(p => p.dealPrice).length}
                  </span>
                  <span className="text-[11px] text-rose-600 font-bold block">Active Flash Deals</span>
                </div>
              </div>

              {topProduct && (
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-950">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏆</span>
                    <span><strong>Top Performing Item:</strong> {topProduct.title} ({topProduct.clicks} WhatsApp leads generated)</span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                    Highest Interest
                  </span>
                </div>
              )}
            </div>

            {/* COLLAPSIBLE ADD PRODUCT FORM */}
            {isAdding && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-[#B45309]" />
                    <h3 className="font-extrabold text-base text-stone-900">Add New Item to Your Showcase</h3>
                  </div>
                  <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-600 text-xs font-bold">
                    Cancel ✕
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Product or Service Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7-Seater Chesterfield Velvet Sofa, 6x6 Mahogany Bed"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full text-xs font-semibold p-3.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">
                        Price (in KSh):
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 45000"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        className="w-full text-xs font-semibold p-3.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">
                        Category:
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full text-xs font-semibold p-3.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                      >
                        <option value="furniture">Living Room & Bedroom Furniture</option>
                        <option value="dining_kitchen">Kitchenware & Dining Tables</option>
                        <option value="cooking_gas">Cooking Gas Refill (Monthly Restock)</option>
                        <option value="drinking_water">Drinking Water 20L (Monthly Restock)</option>
                        <option value="water_tank_cleaning">Water Tank Cleaning (Monthly Restock)</option>
                        <option value="pest_control">Pest Control & Fumigation (Monthly Restock)</option>
                        <option value="decor">Home Decor, Lighting & Carpets</option>
                      </select>
                    </div>
                  </div>

                  {/* Monthly Restock Eligibility Check */}
                  {RESTOCK_CATEGORIES.includes(newCategory) ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newIsRestock}
                          onChange={(e) => setNewIsRestock(e.target.checked)}
                          className="w-4 h-4 accent-emerald-700 rounded mt-0.5 cursor-pointer"
                        />
                        <span className="text-xs text-emerald-950 font-medium">
                          <strong className="block text-emerald-900 font-bold">List under "Monthly Restock"</strong>
                          Allow families in your estate to reorder this item on a regular schedule.
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500">
                      ℹ️ Long-term furniture and decor items cannot be marked as Monthly Restock.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Publishing Live...</span>
                    ) : (
                      <span>🚀 Publish Item Live to Customers</span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* 3. INTERACTIVE PRODUCT SEARCH, FILTERS & GRID/LIST SWITCHER */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search your items by title, category, or price..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs font-medium pl-9 pr-8 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sort & View Mode Switcher */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white text-stone-800"
                  >
                    <option value="inquiries">Sort by: Most Inquiries</option>
                    <option value="views">Sort by: Most Views</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="price_asc">Price: Low to High</option>
                  </select>

                  {/* Grid vs List View Buttons */}
                  <div className="flex items-center border border-stone-200 rounded-xl p-0.5 bg-stone-100">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition ${
                        viewMode === 'grid'
                          ? 'bg-white text-stone-900 shadow-2xs'
                          : 'text-stone-500 hover:text-stone-900'
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition ${
                        viewMode === 'list'
                          ? 'bg-white text-stone-900 shadow-2xs'
                          : 'text-stone-500 hover:text-stone-900'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    selectedFilter === 'all'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  All Items ({products.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('in_stock')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    selectedFilter === 'in_stock'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  In Stock ({products.filter(p => p.inStock).length})
                </button>
                <button
                  onClick={() => setSelectedFilter('deals')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    selectedFilter === 'deals'
                      ? 'bg-rose-700 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Active Deals ({products.filter(p => p.dealPrice).length})
                </button>
                <button
                  onClick={() => setSelectedFilter('restock')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    selectedFilter === 'restock'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Monthly Restock ({products.filter(p => p.isMonthlyRestock).length})
                </button>
                <button
                  onClick={() => setSelectedFilter('out_of_stock')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    selectedFilter === 'out_of_stock'
                      ? 'bg-stone-700 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Hidden ({products.filter(p => !p.inStock).length})
                </button>
              </div>
            </div>

            {/* 4. PRODUCT SHOWCASE: GRID OR LIST VIEW */}
            {filteredProducts.length > 0 ? (
              viewMode === 'grid' ? (
                /* GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Image & Badge Overlay */}
                        <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full backdrop-blur ${
                                item.inStock
                                  ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/30'
                                  : 'bg-stone-900/80 text-stone-300'
                              }`}
                            >
                              {item.inStock ? '🟢 Live' : '⚪ Hidden'}
                            </span>
                            {item.isMonthlyRestock && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-400/30 backdrop-blur">
                                📦 Restock
                              </span>
                            )}
                          </div>

                          {item.dealPrice && (
                            <div className="absolute bottom-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              <span>Deal: {item.dealPrice}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <h4 className="font-extrabold text-sm text-stone-900 leading-snug line-clamp-2">
                            {item.title}
                          </h4>

                          <div className="flex items-baseline justify-between">
                            <span className="text-base font-black text-stone-900">
                              {item.price}
                            </span>
                            <span className="text-[11px] text-stone-500 font-medium capitalize">
                              {item.category.replace('_', ' ')}
                            </span>
                          </div>

                          {/* Individual Performance Breakdown */}
                          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/70 grid grid-cols-2 gap-2 text-center text-xs">
                            <div>
                              <span className="text-[10px] text-stone-500 block">Views</span>
                              <strong className="text-stone-900 font-bold">{item.views}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-emerald-700 font-bold block">WhatsApp Leads</span>
                              <strong className="text-emerald-900 font-black">{item.clicks} chats</strong>
                            </div>
                          </div>

                          {/* Recent Leads Preview */}
                          {item.inquiryLeads.length > 0 && (
                            <div className="text-[11px] text-stone-600 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/60">
                              <span className="text-emerald-800 font-bold block text-[10px] uppercase">
                                Latest Inquiry:
                              </span>
                              <span>{item.inquiryLeads[0].buyerLocation} ({item.inquiryLeads[0].timeAgo})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                        {item.dealPrice ? (
                          <button
                            onClick={() => handleRemoveDeal(item.id)}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Cancel Deal</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => openDealModal(item)}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white text-stone-900 border border-stone-200 hover:bg-stone-100 flex items-center gap-1 shadow-2xs"
                          >
                            <Flame className="w-3 h-3 text-rose-600" />
                            <span>Slash Price</span>
                          </button>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleStock(item.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                              item.inStock
                                ? 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                            }`}
                          >
                            {item.inStock ? 'Hide' : 'Show'}
                          </button>

                          <button
                            onClick={() => handleScheduleSocial(item)}
                            className="p-1.5 rounded-xl bg-white text-stone-600 hover:text-stone-900 border border-stone-200 transition"
                            title="Share on WhatsApp/Social"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => deleteProduct(item.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-xl transition"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* LIST VIEW (Table for Quick Organization) */
                <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-stone-700">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3.5 pl-5">Product</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Price</th>
                          <th className="p-3.5 text-center">Views</th>
                          <th className="p-3.5 text-center">WhatsApp Leads</th>
                          <th className="p-3.5 text-center">Status</th>
                          <th className="p-3.5 pr-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredProducts.map((item) => (
                          <tr key={item.id} className="hover:bg-stone-50/70 transition">
                            <td className="p-3.5 pl-5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                                />
                                <div>
                                  <strong className="text-stone-900 font-bold block line-clamp-1">
                                    {item.title}
                                  </strong>
                                  {item.dealPrice && (
                                    <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                      Deal: {item.dealPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="capitalize">{item.category.replace('_', ' ')}</span>
                              {item.isMonthlyRestock && (
                                <span className="block text-[10px] text-blue-700 font-bold">📦 Restock</span>
                              )}
                            </td>
                            <td className="p-3.5 font-black text-stone-900">
                              {item.price}
                            </td>
                            <td className="p-3.5 text-center font-bold text-stone-700">
                              {item.views}
                            </td>
                            <td className="p-3.5 text-center font-black text-emerald-800 bg-emerald-50/40">
                              {item.clicks} chats
                            </td>
                            <td className="p-3.5 text-center">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  item.inStock
                                    ? 'bg-emerald-100 text-emerald-900'
                                    : 'bg-stone-100 text-stone-600'
                                }`}
                              >
                                {item.inStock ? 'Live' : 'Hidden'}
                              </span>
                            </td>
                            <td className="p-3.5 pr-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openDealModal(item)}
                                  className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                                  title="Slash Price"
                                >
                                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                                </button>
                                <button
                                  onClick={() => toggleStock(item.id)}
                                  className="px-2 py-1 rounded text-[11px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-800"
                                >
                                  {item.inStock ? 'Hide' : 'Show'}
                                </button>
                                <button
                                  onClick={() => deleteProduct(item.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-xs sm:text-sm text-stone-500 space-y-2">
                <p>No products match your search query: <strong>"{searchQuery}"</strong></p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                  className="text-xs font-bold text-[#B45309] underline cursor-pointer"
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: SIDEBAR WITH GUARANTEES & LIVE LEADS (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. RECENT CUSTOMER INQUIRIES (WHO CLICKED ON YOUR ITEMS) */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-xs sm:text-sm">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Recent Interested Buyers</span>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  Live Activity
                </span>
              </div>

              <div className="space-y-3">
                {products[0]?.inquiryLeads.map((lead, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#B45309]" />
                        <span>{lead.buyerLocation}</span>
                      </span>
                      <span className="text-[10px] text-stone-400 font-semibold">{lead.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      💬 {lead.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CUSTOMER GUARANTEES (IN SIDEBAR SO IT DOES NOT DISTRACT) */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-extrabold text-xs sm:text-sm text-stone-900">Your Shop Guarantees</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  Verified Badges
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Active promises shown on your public page to give buyers confidence to pay via M-Pesa.
              </p>

              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/70 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={affirmedWhatsApp} 
                    onChange={(e) => { 
                      setAffirmedWhatsApp(e.target.checked); 
                      showNotice(e.target.checked ? '✓ WhatsApp photo check promise enabled!' : 'Guarantee removed'); 
                    }} 
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer" 
                  />
                  <div>
                    <span className="font-bold text-stone-900 block flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      Free WhatsApp Photo Check
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      Review customer photos for free estimates before site visits.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/70 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={affirmedLocalMeasurement} 
                    onChange={(e) => { 
                      setAffirmedLocalMeasurement(e.target.checked); 
                      showNotice(e.target.checked ? '✓ Free local measurement promise enabled!' : 'Guarantee removed'); 
                    }} 
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer" 
                  />
                  <div>
                    <span className="font-bold text-stone-900 block flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-blue-600" />
                      Free Local Measurement
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      Provide free measurement visits for neighbors in Kamakis/Ruiru.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. VERIFIED PAYMENT & DELIVERY MODES */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center gap-2 text-stone-900 font-extrabold pb-2 border-b border-stone-100">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Shop Payment & Dispatch</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-stone-600">
                  <span>M-Pesa Buy Goods Till:</span>
                  <strong className="text-stone-900 font-mono">894211</strong>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Paybill Account:</span>
                  <strong className="text-stone-900 font-mono">400200 (WOODCRAFT)</strong>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Delivery Modes:</span>
                  <span className="font-semibold text-stone-800 text-[11px]">Boda, Errands, Lorry</span>
                </div>
              </div>
            </div>

            {/* 4. MERCHANT SUPPORT CALLOUT */}
            <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-200 space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded">
                Merchant Help Desk
              </span>
              <h4 className="font-extrabold text-sm text-emerald-950">
                Need Help Adding More Products?
              </h4>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Send a quick WhatsApp to HomeDuka seller support. We will photograph and upload your items for free.
              </p>
              <a
                href="https://wa.me/254799112233?text=Hello%20HomeDuka%20Support,%20I%20need%20help%20managing%20my%20seller%20page."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat with Merchant Support</span>
              </a>
            </div>

          </div>
        </div>

        {/* 5. DEAL SLASHER MODAL */}
        {dealModalProduct && (
          <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-600" />
                  <h3 className="font-extrabold text-base text-stone-900">Slash Price / Flash Deal</h3>
                </div>
                <button
                  onClick={() => setDealModalProduct(null)}
                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
                <img
                  src={dealModalProduct.image}
                  alt={dealModalProduct.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{dealModalProduct.title}</h4>
                  <span className="text-xs text-stone-500">Regular: <strong className="text-stone-900">{dealModalProduct.price}</strong></span>
                </div>
              </div>

              <form onSubmit={handleSaveDeal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Discounted Deal Price (KSh):
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 48000"
                    value={dealInputPrice}
                    onChange={(e) => setDealInputPrice(e.target.value)}
                    required
                    className="w-full text-xs font-semibold p-3.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Deal Duration:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className={`p-3 rounded-xl border cursor-pointer text-center font-bold transition ${
                      dealInputDuration === 'today'
                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}>
                      <input
                        type="radio"
                        name="dealDuration"
                        value="today"
                        checked={dealInputDuration === 'today'}
                        onChange={() => setDealInputDuration('today')}
                        className="sr-only"
                      />
                      <span>⚡ Today Only</span>
                    </label>

                    <label className={`p-3 rounded-xl border cursor-pointer text-center font-bold transition ${
                      dealInputDuration === 'month'
                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}>
                      <input
                        type="radio"
                        name="dealDuration"
                        value="month"
                        checked={dealInputDuration === 'month'}
                        onChange={() => setDealInputDuration('month')}
                        className="sr-only"
                      />
                      <span>🗓️ Deal of Month</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  <span>Publish Flash Deal Live</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
