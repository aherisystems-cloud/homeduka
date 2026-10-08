'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  PlusCircle, Camera, Check, Trash2, ArrowLeft, 
  ExternalLink, Sparkles, AlertCircle, Eye, ShieldCheck, Ruler 
} from 'lucide-react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
  inStock: boolean;
  slug: string;
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
      slug: 'chesterfield-7-seater-kamakis'
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
    showNotice('Product removed from your showroom.');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    setIsSubmitting(true);

    // Simulate AI Enrichment and Publishing
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
      showNotice('🚀 Product AI-enriched and published live on Home Kenya!');
    }, 1200);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Seller Portal (Zero Passwords)
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Classic Hardwood Kamakis ⚙️
          </h1>
          <p className="text-xs text-slate-500">
            Changes save and publish to your live showroom immediately.
          </p>
        </div>

        <Link
          href="/biz/classic-hardwood-furniture-kamakis"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live</span>
        </Link>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Provider-Affirmed Customer Guarantees */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 mb-6 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-sm text-emerald-950">Your Affirmed Customer Guarantees</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
            Verified Badges Active
          </span>
        </div>
        <p className="text-xs text-emerald-800 mb-4">
          These verified badges appear on your public shop page and search cards, giving Kenyan customers confidence to chat with you directly on WhatsApp.
        </p>

        <div className="space-y-3 text-xs bg-white p-3.5 rounded-xl border border-emerald-100">
          <label className="flex items-start gap-3 text-slate-800 cursor-pointer">
            <input 
              type="checkbox" 
              checked={affirmedWhatsApp} 
              onChange={(e) => { 
                setAffirmedWhatsApp(e.target.checked); 
                showNotice(e.target.checked ? '✓ WhatsApp assessment guarantee affirmed!' : 'Guarantee removed'); 
              }} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5" 
            />
            <div>
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                Affirm: Free WhatsApp Photo/Video Assessment
              </span>
              <span className="text-[11px] text-slate-500">
                You agree to review photos or 10-second videos sent by clients on WhatsApp for free estimates before making a site visit.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 text-slate-800 cursor-pointer pt-2 border-t border-slate-100">
            <input 
              type="checkbox" 
              checked={affirmedLocalMeasurement} 
              onChange={(e) => { 
                setAffirmedLocalMeasurement(e.target.checked); 
                showNotice(e.target.checked ? '✓ Free local measurement affirmed!' : 'Guarantee removed'); 
              }} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5" 
            />
            <div>
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-blue-600" />
                Affirm: Free Site Measurements in Your Local Area / Estate
              </span>
              <span className="text-[11px] text-slate-500">
                You agree to provide free site visits and measurements for nearby homeowners in your neighborhood (e.g. Kamakis, Kilimani, Nyali).
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Add Product Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full mb-6 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
        >
          <PlusCircle className="w-5 h-5" />
          <span>+ Add a New Product</span>
        </button>
      )}

      {/* Add Product Drawer */}
      {isAdding && (
        <div className="bg-white rounded-3xl p-6 border-2 border-brand-500 shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Add New Product (3 Quick Fields)</span>
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-4">
            {/* 1. Photo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                1. Product Photo:
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-brand-500 transition cursor-pointer bg-slate-50">
                <Camera className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                <span className="text-xs font-semibold text-slate-600 block">
                  Tap to Snap or Upload Workshop Photo
                </span>
                <span className="text-[10px] text-slate-400">Natural daylight photos sell 3x faster</span>
              </div>
            </div>

            {/* 2. Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                2. Product Name / What is it?
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 6-Seater Mahogany Dining Table"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            {/* 3. Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. Price (KSh):
              </label>
              <input
                type="number"
                required
                placeholder="e.g., 45000"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            {/* Optional Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Optional Note / Delivery terms:
              </label>
              <input
                type="text"
                placeholder="e.g., Free delivery in Nairobi, 2-year warranty"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>AI Enriching & Publishing...</span>
                </>
              ) : (
                <>
                  <span>🚀 Publish Product Live</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Existing Products List */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Your Live Showcase ({products.length} Items)
        </h2>

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs font-black text-emerald-700 mt-0.5">
                  {item.price}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      item.inStock ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.inStock ? 'In Stock (Live)' : 'Sold Out / Hidden'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleStock(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  item.inStock
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                {item.inStock ? 'Mark Out' : 'Mark In Stock'}
              </button>

              <button
                onClick={() => deleteProduct(item.id)}
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition"
                title="Delete product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
