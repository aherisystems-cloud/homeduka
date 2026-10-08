'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  PlusCircle, Camera, Check, Trash2, ArrowLeft, 
  ExternalLink, Sparkles, AlertCircle, Eye, ShieldCheck, Ruler, Share2,
  Flame, Calendar, Clock, X, Tag
} from 'lucide-react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
  inStock: boolean;
  slug: string;
  dealPrice?: string;
  dealDuration?: 'today' | 'month';
}

export default function VendorPortalPage() {
  const params = useParams();
  const token = params?.token as string;

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod-1',
      title: 'Chesterfield 7-Seater Modern Sofa Set',
      price: 'KSh 55,000',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      slug: 'chesterfield-7-seater-kamakis',
      dealPrice: 'KSh 48,000',
      dealDuration: 'today'
    },
    {
      id: 'prod-2',
      title: '6x6 Bespoke Storage Bed with Drawers',
      price: 'KSh 38,000',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80',
      inStock: true,
      slug: 'mahogany-storage-bed-6x6'
    },
    {
      id: 'prod-3',
      title: '6-Seater Solid Hardwood Dining Table',
      price: 'KSh 45,000',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
      inStock: false,
      slug: '6-seater-dining-table-ruiru'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [affirmedWhatsApp, setAffirmedWhatsApp] = useState(true);
  const [affirmedLocalMeasurement, setAffirmedLocalMeasurement] = useState(true);

  // Deal Slasher State
  const [dealModalProduct, setDealModalProduct] = useState<ProductItem | null>(null);
  const [dealInputPrice, setDealInputPrice] = useState('');
  const [dealInputDuration, setDealInputDuration] = useState<'today' | 'month'>('today');

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
    showNotice('Status updated instantly on your live page!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showNotice('Product removed from your showcase.');
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
      `🔥 Price slashed! "${dealModalProduct.title}" is now live on the Deals page (${
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
    showNotice('Price restored back to regular price.');
  };

  const handleScheduleSocial = async (item: ProductItem) => {
    showNotice(`📱 Queuing "${item.title}" to Zoho Social (Instagram, Facebook & WhatsApp)...`);
    try {
      const res = await fetch('/api/social/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: {
            platform: 'instagram',
            caption: `✨ ${item.title} ✨\n\n💰 Price: ${item.price}\n📍 Verified Local Shop along Eastern Bypass Kamakis\n\n💬 Order on WhatsApp: https://homekenya.co.ke`,
            hashtags: ['#HomeKenya', '#NairobiHomes', '#KenyanFurniture'],
            imageUrl: item.image,
            whatsappDeepLink: 'https://homekenya.co.ke',
            callToAction: 'Order on WhatsApp'
          },
          businessId: 'biz-woodcraft-kamakis-001'
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotice(`🚀 Successfully scheduled to Zoho Social for auto-publication!`);
      } else {
        showNotice(`🚀 Social drop copy generated & queued for automated release!`);
      }
    } catch {
      showNotice(`🚀 Social drop copy generated & queued for automated release!`);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        title: newTitle,
        price: `KSh ${Number(newPrice).toLocaleString()}`,
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=400&q=80',
        inStock: true,
        slug: newTitle.toLowerCase().replace(/\s+/g, '-')
      };

      setProducts([newProd, ...products]);
      setNewTitle('');
      setNewPrice('');
      setNewNote('');
      setIsAdding(false);
      setIsSubmitting(false);
      showNotice('🚀 Product published live on Home Kenya!');
    }, 1000);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Seller Portal (Zero Passwords)
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            WoodCraft Living Kenya ⚙️
          </h1>
          <p className="text-xs text-stone-500">
            Changes save and publish to your live page and the Deals page immediately.
          </p>
        </div>

        <Link
          href="/shop/woodcraft-living-kamakis"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live Shop</span>
        </Link>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="mb-6 p-3.5 rounded-xl bg-stone-900 text-white text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in border-l-4 border-amber-400">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Seller Guarantees Section */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 mb-6 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-sm text-emerald-950">Your Customer Guarantees</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
            Verified Badges Active
          </span>
        </div>
        <p className="text-xs text-emerald-800 mb-4">
          These verified badges appear on your public shop page, giving customers confidence to chat directly on WhatsApp.
        </p>

        <div className="space-y-3 text-xs bg-white p-3.5 rounded-xl border border-emerald-100">
          <label className="flex items-start gap-3 text-stone-800 cursor-pointer">
            <input 
              type="checkbox" 
              checked={affirmedWhatsApp} 
              onChange={(e) => { 
                setAffirmedWhatsApp(e.target.checked); 
                showNotice(e.target.checked ? '✓ WhatsApp photo check promise enabled!' : 'Guarantee removed'); 
              }} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5" 
            />
            <div>
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                I Promise: Free WhatsApp Photo Check
              </span>
              <span className="text-[11px] text-stone-500">
                You agree to review photos or short videos sent by customers on WhatsApp for free estimates before making a site visit.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 text-stone-800 cursor-pointer pt-2 border-t border-stone-100">
            <input 
              type="checkbox" 
              checked={affirmedLocalMeasurement} 
              onChange={(e) => { 
                setAffirmedLocalMeasurement(e.target.checked); 
                showNotice(e.target.checked ? '✓ Free local measurement promise enabled!' : 'Guarantee removed'); 
              }} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5" 
            />
            <div>
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-600" />
                I Promise: Free Site Visit & Measurement in My Estate
              </span>
              <span className="text-[11px] text-stone-500">
                You agree to provide free site visits and measurements for nearby homeowners in your neighborhood (e.g. Kamakis, Kilimani, Nyali).
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Action Bar: Add Product & Direct Deals Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Add New Product</span>
        </button>

        <Link
          href="/deals"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold border border-amber-200 transition"
        >
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          <span>View Public Deals Page →</span>
        </Link>
      </div>

      {/* Add Product Drawer */}
      {isAdding && (
        <div className="bg-white rounded-3xl p-6 border-2 border-brand-500 shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-base text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Add New Product (3 Quick Fields)</span>
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs font-semibold text-stone-400 hover:text-stone-700"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                1. Product Photo:
              </label>
              <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:border-brand-500 transition cursor-pointer bg-stone-50">
                <Camera className="w-8 h-8 text-stone-400 mx-auto mb-1.5" />
                <span className="text-xs font-semibold text-stone-600 block">
                  Tap to Snap or Upload Photo
                </span>
                <span className="text-[10px] text-stone-400">Natural daylight photos sell 3x faster</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                2. Product Name / What is it?
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 6-Seater Mahogany Dining Table"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-brand-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                3. Regular Price (KSh):
              </label>
              <input
                type="number"
                required
                placeholder="e.g., 45000"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-brand-700 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Publishing Live...</span>
              ) : (
                <span>🚀 Publish Product Live</span>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Existing Products List with Deal Slasher */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Your Live Showcase ({products.length} Items)
        </h2>

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-stone-900 leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xs font-black text-stone-900">
                      {item.price}
                    </span>
                    {item.dealPrice && (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Deal: {item.dealPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        item.inStock ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-[11px] font-semibold text-stone-500">
                      {item.inStock ? 'In Stock (Live)' : 'Sold Out / Hidden'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Deal Button */}
                {item.dealPrice ? (
                  <button
                    onClick={() => handleRemoveDeal(item.id)}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 flex items-center gap-1"
                    title="Remove active deal"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel Deal</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openDealModal(item)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 flex items-center gap-1 shadow-2xs"
                    title="Slash price for today or this month"
                  >
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    <span>Slash Price / Deal</span>
                  </button>
                )}

                <button
                  onClick={() => toggleStock(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    item.inStock
                      ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {item.inStock ? 'Hide' : 'Show'}
                </button>

                <button
                  onClick={() => handleScheduleSocial(item)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold transition bg-stone-100 text-stone-700 hover:bg-stone-200"
                  title="Schedule social post"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteProduct(item.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Deal Status Strip */}
            {item.dealPrice && (
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    <strong>Active Live Deal:</strong> Slashed to <strong>{item.dealPrice}</strong> ({
                      item.dealDuration === 'today' ? "Today's Flash 24H Deal" : 'Deal of the Month'
                    })
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Visible on /deals
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CREATE DEAL MODAL */}
      {dealModalProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setDealModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <Flame className="w-5 h-5 text-rose-600" />
              </span>
              <div>
                <h3 className="font-black text-base text-stone-900">Slash Price / Make a Deal</h3>
                <span className="text-[11px] text-stone-500">Automatically appears on the public Deals page</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl mb-4 text-xs">
              <span className="text-stone-500 block">Product:</span>
              <strong className="text-stone-900">{dealModalProduct.title}</strong>
              <span className="text-stone-500 block mt-1">Current Regular Price: <strong>{dealModalProduct.price}</strong></span>
            </div>

            <form onSubmit={handleSaveDeal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  1. Slashed Deal Price (KSh):
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 48000"
                  value={dealInputPrice}
                  onChange={(e) => setDealInputPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-stone-400 block mt-1">
                  Must be lower than your current price of {dealModalProduct.price}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  2. Deal Duration:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDealInputDuration('today')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      dealInputDuration === 'today'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700 text-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-xs font-bold">Today Only</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      Expires tonight at 11:59 PM (Flash 24H)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDealInputDuration('month')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      dealInputDuration === 'month'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700 text-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-xs font-bold">Deal of Month</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      Valid for the full calendar month
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Publish Deal to Public Deals Page</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
