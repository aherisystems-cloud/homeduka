'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, MessageSquare, ShieldCheck, PlusCircle, MapPin, 
  Sparkles, ChevronDown, Wrench, ShoppingBag, RefreshCw, 
  Menu, X, CheckCircle2, HelpCircle, Layers, ArrowRight,
  Tv, Bed, Sofa, Utensils, Bath, Trees, Paintbrush, Hammer,
  Flame, Shirt, Box, Truck, Shield
} from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'services' | null>(null);
  const [showDealsModal, setShowDealsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<'products' | 'services' | null>(null);
  const [headerLocation, setHeaderLocation] = useState<string>('Nairobi');

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('homeduka_location_label');
    if (saved) {
      setHeaderLocation(saved);
    }

    const handleLocationChange = (e: any) => {
      if (e.detail?.locationLabel) {
        setHeaderLocation(e.detail.locationLabel);
      }
    };

    window.addEventListener('homeduka-location-changed', handleLocationChange);
    return () => window.removeEventListener('homeduka-location-changed', handleLocationChange);
  }, []);

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
          
          {/* Left: Kenya Location & City Context with Quick Modal Trigger */}
          <div className="flex items-center gap-2 text-stone-300">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-location-modal'));
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700/80 transition cursor-pointer text-[11px] sm:text-xs font-bold shadow-2xs"
              title="Click to set your county or estate"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Shopping from: {headerLocation} ▾</span>
              <span className="text-[10px] text-amber-200/80 font-normal underline decoration-dotted ml-1">Change Area</span>
            </button>
            <span className="hidden md:inline text-stone-400 text-[11px]">
              • Verified local shops & fundis across Kenya
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
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo with New Geometric Mark & Brand Hue */}
          <div className="flex items-center gap-3">
            <Logo variant="header" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
            
            {/* Nav Pillar 1: HOME PRODUCTS (Comprehensive Layman Mega Menu) */}
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

              {/* Mega Menu Dropdown: Comprehensive Home Products */}
              {activeMegaMenu === 'products' && (
                <div 
                  className="absolute left-[-40px] top-full mt-1 w-[820px] bg-white rounded-3xl p-6 border border-stone-200 shadow-xl z-50 animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-4 gap-5">
                    {/* Column 1: Furniture */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Sofa className="w-3.5 h-3.5 text-amber-700" />
                        <span>Furniture</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🛋️ Sofas & Living Room Sets
                          <span className="block text-[10px] text-stone-400 font-normal">7-seaters, L-shapes, recliners</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🛏️ Beds & Mattresses
                          <span className="block text-[10px] text-stone-400 font-normal">Storage beds, 6x6, high density</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🚪 Wardrobes & Closets
                          <span className="block text-[10px] text-stone-400 font-normal">Sliding doors, fitted, dressers</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🍽️ Dining Tables & Chairs
                          <span className="block text-[10px] text-stone-400 font-normal">4, 6, 8-seater sets</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          📺 TV Stands & Wall Units
                          <span className="block text-[10px] text-stone-400 font-normal">Floating stands, wooden consoles</span>
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Kitchen & Cookware */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Utensils className="w-3.5 h-3.5 text-amber-700" />
                        <span>Kitchen & Cookware</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🍳 Cookers & Ovens
                          <span className="block text-[10px] text-stone-400 font-normal">Standing gas cookers, electric ovens</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          ❄️ Fridges & Freezers
                          <span className="block text-[10px] text-stone-400 font-normal">Single & double-door refrigerators</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🥘 Sufurias & Cookware Sets
                          <span className="block text-[10px] text-stone-400 font-normal">Non-stick granite pots, frying pans</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🥤 Microwaves & Blenders
                          <span className="block text-[10px] text-stone-400 font-normal">Air fryers, kettles, water dispensers</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🗄️ Kitchen Fitters & Cabinets
                          <span className="block text-[10px] text-stone-400 font-normal">Granite countertops, pantry units</span>
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: TVs & Electronics */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Tv className="w-3.5 h-3.5 text-blue-700" />
                        <span>TVs & Electronics</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          📺 Smart Android TVs
                          <span className="block text-[10px] text-stone-400 font-normal">43", 55", 65" 4K UHD smart screens</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🔊 Soundbars & Woofers
                          <span className="block text-[10px] text-stone-400 font-normal">Home theatre systems, subwoofers</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          ☀️ Solar & Power Inverters
                          <span className="block text-[10px] text-stone-400 font-normal">Backup power batteries for blackouts</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          📹 Security CCTV & Cameras
                          <span className="block text-[10px] text-stone-400 font-normal">Wi-Fi smart cameras, doorbell monitors</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-stone-50 text-stone-800 font-semibold"
                        >
                          🔌 Voltage Surge Guards
                          <span className="block text-[10px] text-stone-400 font-normal">Fridge & TV protectors, extensions</span>
                        </Link>
                      </div>
                    </div>

                    {/* Column 4: Curtains, Bedding & Decor */}
                    <div className="space-y-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-200">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>Curtains & Decor</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-white text-stone-800 font-semibold"
                        >
                          🪟 Curtains & Sheers
                          <span className="block text-[10px] text-stone-400 font-normal">Blackout curtains, eyelets, rods</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-white text-stone-800 font-semibold"
                        >
                          🧶 Shaggy Carpets & Rugs
                          <span className="block text-[10px] text-stone-400 font-normal">Turkish rugs, fluffy floor mats</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-white text-stone-800 font-semibold"
                        >
                          🛌 Duvets & Bed Sheets
                          <span className="block text-[10px] text-stone-400 font-normal">Cotton bedding, comforter sets</span>
                        </Link>
                        <Link 
                          href="/#products" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="block p-1.5 rounded-lg hover:bg-white text-stone-800 font-semibold"
                        >
                          🖼️ Wall Art & Full Mirrors
                          <span className="block text-[10px] text-stone-400 font-normal">Framed canvases, LED mirrors</span>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-stone-200">
                        <Link
                          href="/#rooms"
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-[11px] font-bold text-brand-700 hover:underline flex items-center gap-1"
                        >
                          <span>Shop by Room (All Items)</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Pillar 2: HOME SERVICES (Fundis + Home Care) */}
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
                  className="absolute left-[-150px] top-full mt-1 w-[780px] bg-white rounded-3xl p-6 border border-stone-200 shadow-xl z-50 animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {/* Column 1: Fundis & Skilled Trades */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
                        <Wrench className="w-3.5 h-3.5 text-blue-700" />
                        <span>Fundis & Repairs</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <Link 
                          href="/services?category=plumbing" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-blue-50/60 text-stone-800 transition"
                        >
                          <span className="text-sm">🔧</span>
                          <div>
                            <span className="font-bold block">Plumbers</span>
                            <span className="text-[10px] text-stone-400">Pipes, leaks, taps, pumps & toilets</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=electrical_solar" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-blue-50/60 text-stone-800 transition"
                        >
                          <span className="text-sm">⚡</span>
                          <div>
                            <span className="font-bold block">Electricians</span>
                            <span className="text-[10px] text-stone-400">House wiring, token boxes, sockets</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=carpentry_cabinetry" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-blue-50/60 text-stone-800 transition"
                        >
                          <span className="text-sm">🪚</span>
                          <div>
                            <span className="font-bold block">Carpenters</span>
                            <span className="text-[10px] text-stone-400">Beds, door locks, wardrobes, repairs</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=painting_gypsum" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-blue-50/60 text-stone-800 transition"
                        >
                          <span className="text-sm">🎨</span>
                          <div>
                            <span className="font-bold block">Gypsum & Painters</span>
                            <span className="text-[10px] text-stone-400">Modern ceilings, wall paint, waterproofing</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=plumbing" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-blue-50/60 text-stone-800 transition"
                        >
                          <span className="text-sm">🧱</span>
                          <div>
                            <span className="font-bold block">Tile & Masonry Fundis</span>
                            <span className="text-[10px] text-stone-400">Floor tiles, kitchen backsplashes, cabro</span>
                          </div>
                        </Link>
                        <Link 
                          href="/services?category=electrical_solar" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-blue-50/60 text-stone-800 transition"
                        >
                          <span className="text-sm">📺</span>
                          <div>
                            <span className="font-bold block">Appliance Repair</span>
                            <span className="text-[10px] text-stone-400">Fridges, washing machines, microwaves</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Home Care & Cleaning */}
                    <div className="space-y-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60">
                      <div className="flex items-center gap-1.5 text-amber-950 font-black text-xs uppercase tracking-wider pb-1 border-b border-amber-200">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                        <span>Home Care & Cleaning</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-stone-800 transition"
                        >
                          <span className="text-sm">💧</span>
                          <div>
                            <span className="font-bold block text-[11px]">Clean Water Tanks</span>
                            <span className="text-[10px] text-stone-500">Remove mud, wash & disinfect</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-stone-800 transition"
                        >
                          <span className="text-sm">🐜</span>
                          <div>
                            <span className="font-bold block text-[11px]">Pest Control & Bedbugs</span>
                            <span className="text-[10px] text-stone-500">Safe spray for bedbugs & roaches</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-stone-800 transition"
                        >
                          <span className="text-sm">🧽</span>
                          <div>
                            <span className="font-bold block text-[11px]">Sofa & Carpet Wash</span>
                            <span className="text-[10px] text-stone-500">Deep machine wash at your home</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-stone-800 transition"
                        >
                          <span className="text-sm">🧹</span>
                          <div>
                            <span className="font-bold block text-[11px]">Full House Deep Clean</span>
                            <span className="text-[10px] text-stone-500">Move-in / move-out thorough clean</span>
                          </div>
                        </Link>
                        <Link 
                          href="/#recurring" 
                          onClick={() => setActiveMegaMenu(null)}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white text-stone-800 transition"
                        >
                          <span className="text-sm">📦</span>
                          <div>
                            <span className="font-bold block text-[11px]">House Movers & Transport</span>
                            <span className="text-[10px] text-stone-500">Packing boxes, enclosed trucks</span>
                          </div>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-amber-200">
                        <Link
                          href="/#recurring"
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1"
                        >
                          <span>View All Home Care Plans</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: The Fundi Safety Promise */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 inline-block mb-2">
                          Safety & Peace of Mind
                        </span>
                        <h4 className="font-black text-xs text-stone-900 leading-snug">
                          How to Hire Safely:
                        </h4>
                        <div className="space-y-2.5 mt-2.5 text-[11px] text-stone-600">
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Free WhatsApp Photo Check:</strong> Send photos to get price estimates before they visit</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Agree Price Upfront:</strong> Know the labor & materials cost before work starts</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Pay After Inspection:</strong> Only pay when the job is done or items are received</span>
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

            {/* Nav Link: DEALS */}
            <Link
              href="/deals"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-300 transition shadow-2xs"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Deals</span>
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-black">
                Hot
              </span>
            </Link>

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

          {/* Right Actions: Sell / Add Product CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/portal/demo-token"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 shadow-sm transition active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>Sell / Add Product or Service</span>
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
                <span className="font-bold">Find Sellers & Fundis in Your County</span>
              </div>
              <button
                onClick={() => {
                  setShowDealsModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-brand-700 font-bold underline block text-left"
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
                    href="/#products" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🛋️ Furniture (Sofas, Beds, Dining, Wardrobes)
                  </Link>
                  <Link 
                    href="/#products" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🍳 Kitchen & Cookware (Cookers, Fridges, Sufurias)
                  </Link>
                  <Link 
                    href="/#products" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    📱 TVs & Electronics (Smart TVs, Soundbars, Solar)
                  </Link>
                  <Link 
                    href="/#products" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🪟 Curtains, Bedding & Decor (Blackout Curtains, Carpets)
                  </Link>
                  <Link 
                    href="/#products" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🚿 Bathroom, Water Tanks & Showers
                  </Link>
                  <Link 
                    href="/#products" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🎨 Paints, Tiles & Gypsum Boards
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
                  <span>Home Services & Fundis</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryOpen === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategoryOpen === 'services' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-stone-100">
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
                    ⚡ Electricians & Sockets
                  </Link>
                  <Link 
                    href="/services?category=carpentry_cabinetry" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🪚 Carpenters & Door Locks
                  </Link>
                  <Link 
                    href="/services?category=painting_gypsum" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🎨 Gypsum Ceilings & House Painters
                  </Link>
                  <Link 
                    href="/#recurring" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-amber-50 font-semibold text-amber-950"
                  >
                    💧 Water Tank Cleaning & Washing
                  </Link>
                  <Link 
                    href="/#recurring" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-amber-50 font-semibold text-amber-950"
                  >
                    🐜 Pest Control & Bedbug Spray
                  </Link>
                  <Link 
                    href="/#recurring" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-amber-50 font-semibold text-amber-950"
                  >
                    🧽 Sofa & Carpet Machine Wash
                  </Link>
                </div>
              )}
            </div>

            {/* Other Mobile Links */}
            <div className="space-y-1">
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm bg-amber-50 text-amber-950 border border-amber-200"
              >
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Today&apos;s Slashed Deals</span>
                <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-black ml-auto">
                  Hot
                </span>
              </Link>
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

              {/* Seller / Fundi Access */}
              <div className="pt-2 border-t border-stone-200">
                <Link
                  href="/portal/demo-token"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-stone-900 text-white font-bold text-sm shadow-sm active:scale-98 transition"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>Sell / Add Product or Service</span>
                </Link>
              </div>
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
                  Every week, verified Kenyan sellers and service fundis share special discounts directly with our WhatsApp community.
                </p>
              </div>

              {/* 3 Simple Points in Grade 4 English */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Direct From the Seller</h5>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      You talk directly with the shop owner or fundi on WhatsApp. No brokers, no extra agent commissions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Pickup or Delivery Arranged Directly</h5>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      You can visit their physical shop to inspect the item, or agree on parcel / rider delivery to your house.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Safe Lipa na M-Pesa Payments</h5>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Always confirm the item first. When paying, confirm the registered business name matches before entering your PIN.
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
