'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, MessageSquare, ShieldCheck, PlusCircle, MapPin, 
  Sparkles, ChevronDown, Wrench, ShoppingBag, RefreshCw, 
  Menu, X, CheckCircle2, HelpCircle, Layers, ArrowRight,
  Tv, Bed, Sofa, Utensils, Bath, Trees, Paintbrush, Hammer,
  Flame, Shirt, Box, Truck, Shield, Smartphone, Download, Share2, Bell
} from 'lucide-react';
import Logo from './Logo';
import AlertPreferencesModal from './AlertPreferencesModal';

export default function Header() {
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'services' | null>(null);
  const [showDownloadAppModal, setShowDownloadAppModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<'products' | 'services' | null>(null);
  const [headerLocation, setHeaderLocation] = useState<string>('Nairobi');

  // PWA install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Detect standalone mode
    const isAppStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsStandalone(isAppStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    // Capture beforeinstallprompt for native 1-tap install
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

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
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('homeduka-location-changed', handleLocationChange);
    };
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
      <div className="w-full bg-stone-900 text-stone-200 text-[11px] sm:text-xs py-2 px-6 sm:px-10 lg:px-12 xl:px-16 border-b border-stone-800 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Kenya Location & City Context with Quick Modal Trigger */}
          <div className="flex items-center gap-2 text-stone-300">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-location-modal'));
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700/80 transition cursor-pointer text-[11px] sm:text-xs font-semibold shadow-2xs"
              title="Click to set your county or estate"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
              <span>Shopping from: <strong className="text-white font-bold">{headerLocation}</strong> ▾</span>
              <span className="text-[10px] text-[#B45309] font-bold underline decoration-dotted ml-1">Change Area</span>
            </button>
            <span className="hidden md:inline text-stone-400 text-[11px]">
              • Verified local shops & fundis across Kenya
            </span>
          </div>

          {/* Right: Buyer tools first, then Sell / List Free as the final item on the far right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Check Till & Paybill Verifier link */}
            <Link
              href="/verify-till"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition cursor-pointer text-[11px] sm:text-xs font-semibold border border-stone-700/80 shadow-2xs group"
              title="Check if a Till, Paybill, or Pochi is real before sending money"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Check Till / Paybill</span>
            </Link>

            {/* Nairobi Fair Price Index */}
            <Link
              href="/fair-prices"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition cursor-pointer text-[11px] sm:text-xs font-semibold border border-stone-700/80 shadow-2xs group"
              title="See real shop and yard prices in Kenya"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B45309] group-hover:scale-110 transition-transform" />
              <span>Fair Prices</span>
            </Link>

            {/* Gate Delivery Check */}
            <Link
              href="/delivery-check"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition cursor-pointer text-[11px] sm:text-xs font-semibold border border-stone-700/80 shadow-2xs group"
              title="Check item before paying the delivery driver"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Gate Check</span>
            </Link>

            {/* Deal Alerts trigger button */}
            <button
              onClick={() => setShowAlertsModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition cursor-pointer text-[11px] sm:text-xs font-semibold border border-stone-700/80 shadow-2xs group"
              title="Set custom deal and upkeep notification alerts"
            >
              <Bell className="w-3.5 h-3.5 text-[#B45309] group-hover:scale-110 transition-transform" />
              <span>Deal Alerts</span>
            </button>

            {/* Download Web App trigger button */}
            <button
              onClick={() => setShowDownloadAppModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition cursor-pointer text-[11px] sm:text-xs font-semibold border border-stone-700/80 shadow-2xs group"
              title="Download or install HomeDuka web app on your phone"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#B45309] group-hover:scale-110 transition-transform" />
              <span>Download Web App</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#B45309] text-white text-[10px] font-black uppercase">
                Free
              </span>
            </button>

            {/* Direct WhatsApp Channel Link */}
            <Link
              href="https://whatsapp.com/channel/example-channel"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-semibold border border-stone-700/80 transition shadow-2xs active:scale-95"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp Channel</span>
              <span className="sm:hidden">Channel</span>
              <span className="hidden md:inline bg-white/20 px-1.5 py-0.2 rounded-full text-[10px] text-stone-200 font-semibold">
                5.4k
              </span>
            </Link>

            {/* Sell / List Free Button - VERY LAST ITEM ON FAR RIGHT (Targets Merchant/Seller) */}
            <Link
              href="/sell"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-black transition shadow-xs text-[11px] sm:text-xs cursor-pointer group active:scale-95 ml-1 border border-stone-300"
              title="List your shop, timber yard, or fundi service free"
            >
              <PlusCircle className="w-3.5 h-3.5 text-stone-900 group-hover:rotate-90 transition-transform" />
              <span>Sell / List Free</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 h-20 flex items-center justify-between gap-4">
          
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
                    ? 'bg-stone-100 text-[#B45309]' 
                    : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Home Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMegaMenu === 'products' ? 'rotate-180 text-[#B45309]' : 'text-stone-400'
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
                        <Sofa className="w-3.5 h-3.5 text-[#B45309]" />
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
                        <Utensils className="w-3.5 h-3.5 text-[#B45309]" />
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
                        <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
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
                          className="text-[11px] font-bold text-[#B45309] hover:underline flex items-center gap-1"
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
                    ? 'bg-stone-100 text-[#B45309]' 
                    : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-stone-700" />
                <span>Home Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMegaMenu === 'services' ? 'rotate-180 text-[#B45309]' : 'text-stone-400'
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
                    <div className="space-y-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80">
                      <div className="flex items-center gap-1.5 text-stone-900 font-black text-xs uppercase tracking-wider pb-1 border-b border-stone-200">
                        <RefreshCw className="w-3.5 h-3.5 text-[#B45309]" />
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

                      <div className="pt-2 border-t border-stone-200">
                        <Link
                          href="/#recurring"
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-[11px] font-bold text-[#B45309] hover:underline flex items-center gap-1"
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-200 transition shadow-2xs"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Deals</span>
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-black">
                Hot
              </span>
            </Link>

            {/* Nav Link 3: SHOP BY ROOM */}
            <Link
              href="/rooms"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 hover:text-[#B45309] hover:bg-stone-50 transition"
            >
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              <span>Rooms</span>
            </Link>

            {/* Nav Link: MONTHLY RESTOCK */}
            <Link
              href="/refills"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 hover:text-emerald-700 hover:bg-stone-50 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Monthly Restock</span>
            </Link>

            {/* Nav Link 4: BUYER GUIDES */}
            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 hover:text-[#B45309] hover:bg-stone-50 transition"
            >
              <span>Buyer Guides</span>
            </Link>
          </nav>

          {/* Right Actions: Mobile Hamburger Only (Sell button moved to top bar) */}
          <div className="flex items-center gap-2">
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
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span className="font-bold">Find Sellers & Fundis in Your County</span>
              </div>
              <button
                onClick={() => {
                  setShowDownloadAppModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-[#B45309] font-bold underline flex items-center gap-1.5 text-left py-0.5"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Download Web App (Free)</span>
              </button>
              <Link
                href="https://whatsapp.com/channel/example-channel"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
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
                  <ShoppingBag className="w-4 h-4 text-[#B45309]" />
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
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    💧 Water Tank Cleaning & Washing
                  </Link>
                  <Link 
                    href="/#recurring" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🐜 Pest Control & Bedbug Spray
                  </Link>
                  <Link 
                    href="/#recurring" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                  >
                    🧽 Sofa & Carpet Machine Wash
                  </Link>
                </div>
              )}
            </div>

            {/* Other Mobile Links for Buyers */}
            <div className="space-y-1">
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm bg-stone-100 text-stone-900 border border-stone-200"
              >
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Today&apos;s Slashed Deals</span>
                <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-black ml-auto">
                  Hot
                </span>
              </Link>
              <Link
                href="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm text-stone-800 hover:bg-stone-50"
              >
                <Layers className="w-4 h-4 text-stone-500" />
                <span>Shop by Room (All Hubs)</span>
              </Link>
              <Link
                href="/refills"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-950 border border-emerald-200"
              >
                <RefreshCw className="w-4 h-4 text-emerald-700" />
                <span>Monthly Restock</span>
              </Link>
              <Link
                href="/verify-till"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-900 border border-emerald-200"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Check Till or Pochi (Safe Pay)</span>
              </Link>
              <Link
                href="/fair-prices"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm bg-stone-50 text-stone-900 border border-stone-200"
              >
                <Sparkles className="w-4 h-4 text-[#B45309]" />
                <span>Fair Price Guide (Nairobi Rates)</span>
              </Link>
              <Link
                href="/delivery-check"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl font-bold text-sm bg-stone-50 text-stone-900 border border-stone-200"
              >
                <Truck className="w-4 h-4 text-stone-700" />
                <span>Gate Delivery Check (Before Paying)</span>
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
                  href="/sell"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-stone-900 text-white font-bold text-sm shadow-sm active:scale-98 transition"
                >
                  <PlusCircle className="w-4 h-4 text-white" />
                  <span>List Your Business Free (2 Mins)</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 4. DOWNLOAD / INSTALL HOMEDUKA WEB APP MODAL */}
      {showDownloadAppModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setShowDownloadAppModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-[#B45309] flex items-center justify-center shadow-xs">
                <Smartphone className="w-6 h-6 text-[#B45309]" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  Instant Mobile Web App
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  Download HomeDuka Web App
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Add HomeDuka directly to your phone home screen. Zero App Store downloads, ultra-fast 1-tap access, and real-time flash deal alerts.
                </p>
              </div>

              {/* Native 1-Tap Install Button if Browser supports it */}
              {deferredPrompt && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
                  <span className="text-xs font-bold text-stone-900 block">
                    ⚡ 1-Tap Fast Install Ready!
                  </span>
                  <button
                    onClick={async () => {
                      deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      if (outcome === 'accepted') {
                        setShowDownloadAppModal(false);
                      }
                      setDeferredPrompt(null);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install HomeDuka App Now (Free)</span>
                  </button>
                </div>
              )}

              {/* Step-by-Step Instructions based on OS */}
              <div className="space-y-2.5 pt-1">
                {isIos ? (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <span className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                      <span>🍎 iPhone & iPad (Safari):</span>
                    </span>
                    <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside pl-1">
                      <li>Tap the <strong>Share button (⎋)</strong> at the bottom of Safari.</li>
                      <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot; (➕)</strong>.</li>
                      <li>Tap <strong>&quot;Add&quot;</strong> in the top right corner — Done!</li>
                    </ol>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <span className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                      <span>🤖 Android (Chrome / Brave / Edge):</span>
                    </span>
                    <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside pl-1">
                      <li>Tap the <strong>Menu icon (⋮)</strong> at the top right of your browser.</li>
                      <li>Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                      <li>Confirm <strong>&quot;Install&quot;</strong> — HomeDuka icon is added to your phone!</li>
                    </ol>
                  </div>
                )}

                {/* Benefits Pill Grid */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
                    <span className="text-[11px] font-bold text-stone-900 block">⚡ &lt; 2 MB</span>
                    <span className="text-[10px] text-stone-500 block">Zero Storage Waste</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
                    <span className="text-[11px] font-bold text-stone-900 block">🔔 Flash Deals</span>
                    <span className="text-[10px] text-stone-500 block">Today&apos;s Slashes</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
                    <span className="text-[11px] font-bold text-stone-900 block">💬 WhatsApp</span>
                    <span className="text-[10px] text-stone-500 block">Direct to Shops</span>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100">
                <button
                  onClick={() => setShowDownloadAppModal(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition cursor-pointer text-center"
                >
                  Got it, Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 5. USER DEAL & UPKEEP ALERTS PREFERENCES MODAL */}
      <AlertPreferencesModal
        isOpen={showAlertsModal}
        onClose={() => setShowAlertsModal(false)}
      />
    </>
  );
}
