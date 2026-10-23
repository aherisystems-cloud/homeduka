'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, Heart, Trash2, MessageSquare, ShoppingBag, 
  ArrowRight, CreditCard, ShieldCheck, ExternalLink 
} from 'lucide-react';
import { useShoppingList } from '../context/ShoppingListContext';

export default function ShoppingListDrawer() {
  const { savedItems, isDrawerOpen, setIsDrawerOpen, removeItem, clearShoppingList } = useShoppingList();

  if (!isDrawerOpen) return null;

  const totalEstimatedCost = savedItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* 1. Drawer Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                <Heart className="w-4 h-4 fill-rose-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-stone-900 leading-tight">
                  My Shopping List
                </h2>
                <span className="text-xs text-stone-500">
                  {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved for later
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
              aria-label="Close shopping list"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Drawer Content Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto border border-rose-100">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-900">Your shopping list is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Tap the heart icon (❤️) on any product across HomeDuka to build your wishlist and check prices anytime.
                  </p>
                </div>
                <Link
                  href="/soko"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Products</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {savedItems.map((item) => {
                  const whatsappMsg = encodeURIComponent(
                    `Hi, I saved "${item.title}" from your shop on HomeDuka priced at KSh ${item.price.toLocaleString()}. Is it currently available for delivery or showroom viewing?`
                  );

                  return (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-xs transition space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                          <div className="text-sm font-black text-stone-900 mt-1">
                            KSh {item.price.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-stone-500 truncate mt-0.5">
                            Shop: <strong className="text-stone-700">{item.businessName}</strong>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Remove from list"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Direct WhatsApp Action for this item */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        {item.businessTill && (
                          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Till: {item.businessTill}
                          </span>
                        )}
                        <a
                          href={`https://wa.me/${item.businessPhone}?text=${whatsappMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Drawer Footer Summary */}
          {savedItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  Estimated Total Budget:
                </span>
                <span className="text-base font-black text-stone-900">
                  KSh {totalEstimatedCost.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pay on delivery/collection via verified Safaricom Till.</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={clearShoppingList}
                  className="px-3 py-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-stone-200/50 text-xs font-semibold transition cursor-pointer"
                >
                  Clear List
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold text-center transition"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
