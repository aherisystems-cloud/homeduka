'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Home, MessageSquare, ShieldCheck, PlusCircle, MapPin, 
  Sparkles, ChevronDown, Wrench, ShoppingBag, RefreshCw, 
  Menu, X, CheckCircle2, HelpCircle, Layers, ArrowRight,
  Droplets, Zap, Bed, Sofa, Utensils, Bath, Trees, Briefcase
} from 'lucide-react';

export default function Header() {
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'services' | null>(null);
  const [showDealsModal, setShowDealsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<'products' | 'services' | null>(null);

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: 'products' | 'services') => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  return (
    <>
      {/* 1. TOP-TOP UTILITY BAR (Map Coverage, WhatsApp Deals, Channel) */}
      <div className="w-full bg-stone-900 text-stone-200 text-[11px] sm:text-xs py-2 px-4 border-b border-stone-800 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Kenya Nationwide Coverage & Map Indicator */}
          <div className="flex items-center gap-1.5 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">Serving All 47 Counties in Kenya:</span>
            <span className="hidden md:inline text-stone-300">
              Nairobi • Kiambu • Mombasa • Nakuru • Kisumu • Eldoret & Countrywide Delivery
            </span>
            <span className="inline md:hidden text-stone-300">
              Nairobi & Countrywide Delivery
            </span>
          </div>

          {/* Right: WhatsApp Deals Explainer + Channel Link */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* What are WhatsApp Deals? trigger button */}
            <button
              onClick={() => setShowDealsModal(true)}
              className="inline-flex items-center gap-1 text-stone-300 hover:text-amber-300 transition cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="underline decoration-dotted underline-offset-2">What are WhatsApp Deals?</span>
            </button>

            {/* Direct Channel Link */}
            <Link
              href="https://whatsapp.com/channel/example-channel"
              target="_blank"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-xs"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Join WhatsApp Channel</span>
              <span className="hidden sm:inline bg-emerald-800/80 px-1.5 py-0.2 rounded-full text-[10px] text-emerald-100 font-semibold">
                5.4k
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-stone-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Logo & Simple Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-brand-700 group-hover:bg-brand-800 flex items-center justify-center text-white font-bold shadow-sm transition">
                <Home className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <span className="font-black text-lg sm:text-xl text-stone-900 tracking-tight flex items-center gap-1">
                  Home <span className="text-brand-700">Kenya</span>
                </span>
                <p className="text-[11px] text-stone-500 font-medium">
                  Everything for your home
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
            
            {/* Nav Pillar 1: HOME PRODUCTS (With Mega Menu) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition ${
                  activeMegaMenu === 'products' 
                    ? 'bg-amber-50 text-brand-700' 
                    : 'text-stone-800 hover:text-brand-700 hover:bg-stone-50'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                <span>Home Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMegaMenu === 'products' ? 'rotate-180 text-brand-700' : 'text-stone-400'
                }`} />
              </button>

              {/* Mega Menu Dropdown: Home Products */}
              {activeMegaMenu === 'products' && (
                <div 
                  className="absolute left-0 top-full mt-1 w-[680px] bg-white rounded-3xl p-6 border border-stone-200 shadow-xl z-50 animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {/* Column 1: Rooms & Spaces */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Home className="w-3.5 h-3.5 text-amber-700" />
                        <span>Furniture by Room</span>
                      </div>
                      <div className="space-y-1">
                        <Link 
                          href="/#rooms" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-amber-50/70 text-xs text-stone-700 hover:text-brand-800 transition"
                        >
                          <span className="text-base">🛋️</span>
                          <div>
                            <span className="font-bold block">Living Room</span>
                            <span className="text-[10px] text-stone-400">Sofas, coffee tables, TV units</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#rooms" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-amber-50/70 text-xs text-stone-700 hover:text-brand-800 transition"
                        >
                          <span className="text-base">🛏️</span>
                          <div>
                            <span className="font-bold block">Bedroom</span>
                            <span className="text-[10px] text-stone-400">Storage beds, wardrobes, dressers</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#rooms" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-amber-50/70 text-xs text-stone-700 hover:text-brand-800 transition"
                        >
                          <span className="text-base">🍳</span>
                          <div>
                            <span className="font-bold block">Kitchen & Dining</span>
                            <span className="text-[10px] text-stone-400">Dining tables, fitted cabinets</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Water, Solar & Outdoor */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>Home Systems & Outdoors</span>
                      </div>
                      <div className="space-y-1">
                        <Link 
                          href="/#rooms" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-amber-50/70 text-xs text-stone-700 hover:text-brand-800 transition"
                        >
                          <span className="text-base">🚿</span>
                          <div>
                            <span className="font-bold block">Bathroom & Water</span>
                            <span className="text-[10px] text-stone-400">Mixer taps, vanity sinks, heaters</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#rooms" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-amber-50/70 text-xs text-stone-700 hover:text-brand-800 transition"
                        >
                          <span className="text-base">☀️</span>
                          <div>
                            <span className="font-bold block">Solar & Water Heating</span>
                            <span className="text-[10px] text-stone-400">Solar tanks, backup power</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#rooms" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-amber-50/70 text-xs text-stone-700 hover:text-brand-800 transition"
                        >
                          <span className="text-base">🌿</span>
                          <div>
                            <span className="font-bold block">Outdoor & Compound</span>
                            <span className="text-[10px] text-stone-400">Patio sets, flower planters</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: Featured Workshop Spotlight */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 inline-block mb-2">
                          Verified Workshop
                        </span>
                        <h4 className="font-black text-xs text-stone-900 leading-snug">
                          WoodCraft Living Kenya
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                          Handcrafted solid mahogany, mvule & oak living room furniture along Kamakis Eastern Bypass.
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
                        <Link
                          href="/shop/woodcraft-living-kamakis"
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
                        >
                          <span>View Workshop Products</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href="/#rooms"
                          onClick={() => setActiveMegaMenu(null)}
                          className="block text-[11px] font-semibold text-stone-600 hover:text-stone-900"
                        >
                          Browse All Products by Room →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Pillar 2: HOME SERVICES (With Mega Menu, including Monthly Home Care) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'services' ? null : 'services')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition ${
                  activeMegaMenu === 'services' 
                    ? 'bg-amber-50 text-brand-700' 
                    : 'text-stone-800 hover:text-brand-700 hover:bg-stone-50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>Home Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMegaMenu === 'services' ? 'rotate-180 text-brand-700' : 'text-stone-400'
                }`} />
              </button>

              {/* Mega Menu Dropdown: Home Services */}
              {activeMegaMenu === 'services' && (
                <div 
                  className="absolute left-[-100px] top-full mt-1 w-[720px] bg-white rounded-3xl p-6 border border-stone-200 shadow-xl z-50 animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {/* Column 1: Monthly Home Care (Recurring Maintenance) */}
                    <div className="space-y-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60">
                      <div className="flex items-center gap-1.5 text-amber-950 font-black text-xs uppercase tracking-wider pb-1 border-b border-amber-200">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                        <span>Monthly Home Care</span>
                      </div>
                      <p className="text-[11px] text-amber-900/80 leading-snug">
                        Regular maintenance to keep your home clean and working smoothly:
                      </p>
                      <div className="space-y-1.5">
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-xs text-stone-800 transition"
                        >
                          <span className="text-sm">💧</span>
                          <div>
                            <span className="font-bold block text-[11px]">Clean Water Tanks</span>
                            <span className="text-[10px] text-stone-500">Remove mud & disinfect</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-xs text-stone-800 transition"
                        >
                          <span className="text-sm">🐜</span>
                          <div>
                            <span className="font-bold block text-[11px]">Pest Control & Spray</span>
                            <span className="text-[10px] text-stone-500">Bedbugs, roaches (child safe)</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-xs text-stone-800 transition"
                        >
                          <span className="text-sm">🧽</span>
                          <div>
                            <span className="font-bold block text-[11px]">Sofa & Carpet Wash</span>
                            <span className="text-[10px] text-stone-500">Deep shampoo machine wash</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-xs text-stone-800 transition"
                        >
                          <span className="text-sm">☀️</span>
                          <div>
                            <span className="font-bold block text-[11px]">Solar Heater Service</span>
                            <span className="text-[10px] text-stone-500">Clean tubes & elements</span>
                          </div>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-amber-200">
                        <Link
                          href="/#recurring"
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1"
                        >
                          <span>View All Monthly Plans</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Vetted Fundis & Repairs */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Wrench className="w-3.5 h-3.5 text-blue-700" />
                        <span>Fundis & Repairs</span>
                      </div>
                      <div className="space-y-1">
                        <Link 
                          href="/services?category=plumbing" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50/60 text-xs text-stone-700 hover:text-blue-900 transition"
                        >
                          <span className="text-base">🔧</span>
                          <div>
                            <span className="font-bold block">Plumbers & Pipe Repair</span>
                            <span className="text-[10px] text-stone-400">Leaks, taps, pumps & drainage</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=electrical_solar" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50/60 text-xs text-stone-700 hover:text-blue-900 transition"
                        >
                          <span className="text-base">⚡</span>
                          <div>
                            <span className="font-bold block">Electricians & Solar</span>
                            <span className="text-[10px] text-stone-400">Lighting, wiring & token boxes</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=painting_gypsum" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50/60 text-xs text-stone-700 hover:text-blue-900 transition"
                        >
                          <span className="text-base">🎨</span>
                          <div>
                            <span className="font-bold block">Gypsum Ceilings & Paint</span>
                            <span className="text-[10px] text-stone-400">Modern ceilings, interior paint</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=carpentry_cabinetry" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50/60 text-xs text-stone-700 hover:text-blue-900 transition"
                        >
                          <span className="text-base">🪚</span>
                          <div>
                            <span className="font-bold block">Fitted Kitchens & Wardrobes</span>
                            <span className="text-[10px] text-stone-400">Custom cabinets, doors & locks</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: The Fundi Promise */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 inline-block mb-2">
                          Our Fundi Promise
                        </span>
                        <h4 className="font-black text-xs text-stone-900 leading-snug">
                          How We Keep You Safe:
                        </h4>
                        <div className="space-y-2 mt-2 text-[11px] text-stone-600">
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Free WhatsApp Photo Check:</strong> Send photos to get prices before they travel</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Free Local Measurements:</strong> For kitchens & gypsum in your estate</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Verified Tills:</strong> Pay safely using Lipa na M-Pesa Buy Goods</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-200">
                        <Link
                          href="/services"
                          onClick={() => setActiveMegaMenu(null)}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition"
                        >
                          <span>Explore All Fundis</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Link 3: SHOP BY ROOM */}
            <Link
              href="/#rooms"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 hover:text-brand-700 hover:bg-stone-50 transition"
            >
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              <span>Shop by Room</span>
            </Link>

            {/* Nav Link 4: BUYER GUIDES */}
            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 hover:text-brand-700 hover:bg-stone-50 transition"
            >
              <span>Buyer Guides</span>
            </Link>
          </nav>

          {/* Right Actions: List Shop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/portal/demo-token"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 shadow-sm transition active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>List / Claim Shop</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-4 animate-fade-in max-h-[80vh] overflow-y-auto">
            {/* Top Bar on Mobile */}
            <div className="p-3 bg-stone-100 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-bold">Serving All 47 Counties in Kenya</span>
              </div>
              <button
                onClick={() => {
                  setShowDealsModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-brand-700 font-bold underline block"
              >
                What are WhatsApp Deals?
              </button>
              <Link
                href="https://whatsapp.com/channel/example-channel"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Join Free WhatsApp Channel (5.4k members)</span>
              </Link>
            </div>

            {/* Accordion: Home Products */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'products' ? null : 'products')}
                className="w-full p-3.5 text-left font-bold text-sm text-stone-900 flex items-center justify-between bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <span>Home Products</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryOpen === 'products' ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategoryOpen === 'products' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-stone-100">
                  <Link 
                    href="/#rooms" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🛋️ Living Room (Sofas, TV Units)
                  </Link>
                  <Link 
                    href="/#rooms" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🛏️ Bedroom (Storage Beds, Wardrobes)
                  </Link>
                  <Link 
                    href="/#rooms" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🍳 Kitchen & Dining (Fitted Cabinets, Tables)
                  </Link>
                  <Link 
                    href="/#rooms" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🚿 Bathroom & Water Heaters
                  </Link>
                  <Link 
                    href="/#rooms" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🌿 Outdoor & Compound
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Home Services */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'services' ? null : 'services')}
                className="w-full p-3.5 text-left font-bold text-sm text-stone-900 flex items-center justify-between bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Home Services & Monthly Care</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryOpen === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategoryOpen === 'services' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-stone-100">
                  <div className="p-2 bg-amber-50 rounded-xl mb-2">
                    <span className="font-bold text-amber-900 block text-[11px] mb-1">
                      💧 Monthly Home Care:
                    </span>
                    <Link 
                      href="/#recurring" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-amber-950 font-medium"
                    >
                      • Clean Water Tanks (Remove mud & bacteria)
                    </Link>
                    <Link 
                      href="/#recurring" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-amber-950 font-medium"
                    >
                      • Pest Control & Fumigation (Bedbugs, roaches)
                    </Link>
                    <Link 
                      href="/#recurring" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-amber-950 font-medium"
                    >
                      • Deep Sofa & Carpet Machine Wash
                    </Link>
                    <Link 
                      href="/#recurring" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-amber-950 font-medium"
                    >
                      • Solar Water Heater Service
                    </Link>
                  </div>
                  <Link 
                    href="/services?category=plumbing" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🔧 Plumbers & Pipe Repairs
                  </Link>
                  <Link 
                    href="/services?category=electrical_solar" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    ⚡ Electricians & Solar Fitters
                  </Link>
                  <Link 
                    href="/services?category=painting_gypsum" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🎨 Gypsum Ceilings & House Painters
                  </Link>
                  <Link 
                    href="/services?category=carpentry_cabinetry" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🪚 Fitted Kitchens & Wardrobes
                  </Link>
                </div>
              )}
            </div>

            {/* Other Mobile Links */}
            <div className="space-y-1">
              <Link
                href="/#rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm text-stone-800 hover:bg-stone-50"
              >
                <Layers className="w-4 h-4 text-stone-500" />
                <span>Shop by Room</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm text-stone-800 hover:bg-stone-50"
              >
                <span>Buyer Guides</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 4. "WHAT ARE WHATSAPP DEALS?" EXPLAINER MODAL (Simple, Grade 4 Language) */}
      {showDealsModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowDealsModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                💬
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Simple Guide
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  What are WhatsApp Deals?
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Every week, verified furniture workshops and service fundis share special discounts with our WhatsApp community.
                </p>
              </div>

              {/* 3 Simple Points in Grade 4 English */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Direct Workshop Prices</h5>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      You buy directly from the workshop that makes the item. No brokers, no middlemen markups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Real Workshops You Can Visit</h5>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Every seller has a real physical shop with landmark directions, customer reviews, and a safe Lipa na M-Pesa Till.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Delivered Right to Your Door</h5>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Order safely on WhatsApp, confirm delivery to your home in Nairobi or any of the 47 counties in Kenya.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-3 flex flex-col sm:flex-row gap-2">
                <Link
                  href="https://whatsapp.com/channel/example-channel"
                  target="_blank"
                  onClick={() => setShowDealsModal(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Free WhatsApp Channel Now</span>
                </Link>

                <button
                  onClick={() => setShowDealsModal(false)}
                  className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition"
                >
                  Got it, close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
