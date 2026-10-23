'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, MessageSquare, ShieldCheck, PlusCircle, MapPin, 
  Sparkles, ChevronDown, Wrench, ShoppingBag, RefreshCw, 
  Menu, X, CheckCircle2, HelpCircle, Layers, ArrowRight,
  Tv, Bed, Sofa, Utensils, Bath, Trees, Paintbrush, Hammer,
  Flame, Shirt, Box, Truck, Shield, Smartphone, Download, Share2, Bell, Search,
  Grid, Laptop, Cpu, Car, Wheat, HeartPulse, ShoppingCart, BookOpen
} from 'lucide-react';
import Logo from './Logo';
import AlertPreferencesModal from './AlertPreferencesModal';
import SokoMegaMenu from './SokoMegaMenu';
import { MASTER_PRODUCT_CATEGORIES } from '../data/kenyan_taxonomy';

export default function Header() {
  const [sokoMegaMenuOpen, setSokoMegaMenuOpen] = useState(false);
  const [selectedMegaCategoryId, setSelectedMegaCategoryId] = useState<string>('electronics_phones');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDownloadAppModal, setShowDownloadAppModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMasterCatOpen, setMobileMasterCatOpen] = useState<string | null>(null);
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

  const openMegaCategory = (categoryId: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setSelectedMegaCategoryId(categoryId);
    setSokoMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setSokoMegaMenuOpen(false);
      setShowMoreMenu(false);
    }, 250);
  };

  return (
    <>
      {/* 1. TOP HELPER UTILITY BAR (Subtle, Understated Helper - Muted Tone) */}
      <div className="w-full bg-[#F5F4F0] text-stone-600 text-[11px] py-1.5 px-6 sm:px-10 lg:px-12 xl:px-16 border-b border-stone-200/90 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Kenya Location & City Context with Quick Modal Trigger */}
          <div className="flex items-center gap-2 text-stone-600">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-location-modal'));
                }
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200/90 transition cursor-pointer text-[11px] font-medium shadow-2xs"
              title="Click to set your county or estate"
            >
              <MapPin className="w-3 h-3 text-[#B45309] shrink-0" />
              <span>Shopping from: <strong className="text-stone-900 font-bold">{headerLocation}</strong> ▾</span>
              <span className="text-[10px] text-[#B45309] font-bold underline decoration-dotted ml-0.5">Change</span>
            </button>
            <span className="hidden md:inline text-stone-500 text-[11px]">
              • Kenya&apos;s direct product discovery soko
            </span>
          </div>

          {/* Right: Discreet Buyer Helper Tools + Sell Link */}
          <div className="flex items-center gap-1 sm:gap-2 text-[11px]">
            {/* Check Till & Paybill Verifier link */}
            <Link
              href="/verify-till"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition cursor-pointer"
              title="Check if a Till, Paybill, or Pochi is real before sending money"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Check Till / Paybill</span>
            </Link>

            {/* Nairobi Fair Price Index */}
            <Link
              href="/fair-prices"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition cursor-pointer"
              title="See real shop and yard prices in Kenya"
            >
              <Sparkles className="w-3 h-3 text-[#B45309]" />
              <span>Fair Prices</span>
            </Link>

            {/* Gate Delivery Check */}
            <Link
              href="/delivery-check"
              className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition cursor-pointer"
              title="Check item before paying the delivery driver"
            >
              <Truck className="w-3 h-3 text-stone-500" />
              <span>Gate Check</span>
            </Link>

            {/* Deal Alerts trigger button */}
            <button
              onClick={() => setShowAlertsModal(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition cursor-pointer"
              title="Set custom deal and upkeep notification alerts"
            >
              <Bell className="w-3 h-3 text-[#B45309]" />
              <span>Deal Alerts</span>
            </button>

            {/* Download Web App trigger button */}
            <button
              onClick={() => setShowDownloadAppModal(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition cursor-pointer"
              title="Download or install HomeDuka web app on your phone"
            >
              <Smartphone className="w-3 h-3 text-[#B45309]" />
              <span>Web App</span>
            </button>

            {/* Direct WhatsApp Channel Link */}
            <Link
              href="https://whatsapp.com/channel/example-channel"
              target="_blank"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 transition"
            >
              <MessageSquare className="w-3 h-3 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp Channel</span>
            </Link>

            {/* Sell / List Free Button - Discreet Text Helper Link on Far Right */}
            <span className="text-stone-300">|</span>
            <Link
              href="/sell"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md hover:bg-stone-200/80 text-stone-800 hover:text-[#B45309] font-bold transition text-[11px]"
              title="List your shop or products free"
            >
              <PlusCircle className="w-3 h-3 text-stone-700" />
              <span>Sell / List Free</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY NAVIGATION BAR (High Contrast, Bold, Dominant) */}
      <header 
        className="sticky top-0 z-40 w-full bg-white border-b border-stone-200/90 shadow-sm"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Logo variant="header" />
          </div>

          {/* Desktop Navigation Links - Distinct, High-Precision Mega Menu */}
          <nav className="hidden xl:flex items-center gap-1">
            
            {/* Master Trigger: ALL CATEGORIES MEGA MENU */}
            <div className="relative">
              <button
                onClick={() => setSokoMegaMenuOpen(!sokoMegaMenuOpen)}
                onMouseEnter={() => {
                  if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
                  setSokoMegaMenuOpen(true);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  sokoMegaMenuOpen 
                    ? 'bg-stone-900 text-white shadow-sm' 
                    : 'bg-stone-100 hover:bg-stone-200/90 text-stone-900'
                }`}
              >
                <Grid className="w-4 h-4 text-[#B45309]" />
                <span>All Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  sokoMegaMenuOpen ? 'rotate-180 text-white' : 'text-stone-500'
                }`} />
              </button>
            </div>

            {/* Direct Master Category Nav Shortcuts (Instant Hover Discovery) */}
            <button
              onClick={() => openMegaCategory('electronics_phones')}
              onMouseEnter={() => openMegaCategory('electronics_phones')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                sokoMegaMenuOpen && selectedMegaCategoryId === 'electronics_phones'
                  ? 'bg-stone-100 text-[#B45309]'
                  : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
              }`}
            >
              <span>📱</span>
              <span>Electronics</span>
            </button>

            <button
              onClick={() => openMegaCategory('home_kitchen_furniture')}
              onMouseEnter={() => openMegaCategory('home_kitchen_furniture')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                sokoMegaMenuOpen && selectedMegaCategoryId === 'home_kitchen_furniture'
                  ? 'bg-stone-100 text-[#B45309]'
                  : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
              }`}
            >
              <span>🛋️</span>
              <span>Home & Living</span>
            </button>

            <button
              onClick={() => openMegaCategory('hardware_building_electricals')}
              onMouseEnter={() => openMegaCategory('hardware_building_electricals')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                sokoMegaMenuOpen && selectedMegaCategoryId === 'hardware_building_electricals'
                  ? 'bg-stone-100 text-[#B45309]'
                  : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
              }`}
            >
              <span>🧱</span>
              <span>Hardware & Steel</span>
            </button>

            <button
              onClick={() => openMegaCategory('fashion_clothes_shoes')}
              onMouseEnter={() => openMegaCategory('fashion_clothes_shoes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                sokoMegaMenuOpen && selectedMegaCategoryId === 'fashion_clothes_shoes'
                  ? 'bg-stone-100 text-[#B45309]'
                  : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
              }`}
            >
              <span>👟</span>
              <span>Fashion</span>
            </button>

            <button
              onClick={() => openMegaCategory('farm_agriculture_agrovet')}
              onMouseEnter={() => openMegaCategory('farm_agriculture_agrovet')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                sokoMegaMenuOpen && selectedMegaCategoryId === 'farm_agriculture_agrovet'
                  ? 'bg-stone-100 text-[#B45309]'
                  : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
              }`}
            >
              <span>🌾</span>
              <span>Farm & Agro</span>
            </button>

            <button
              onClick={() => openMegaCategory('vehicles_auto_spares')}
              onMouseEnter={() => openMegaCategory('vehicles_auto_spares')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                sokoMegaMenuOpen && selectedMegaCategoryId === 'vehicles_auto_spares'
                  ? 'bg-stone-100 text-[#B45309]'
                  : 'text-stone-800 hover:text-[#B45309] hover:bg-stone-50'
              }`}
            >
              <span>🚗</span>
              <span>Auto Spares</span>
            </button>

            {/* More Master Verticals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                onMouseEnter={() => setShowMoreMenu(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {showMoreMenu && (
                <div 
                  className="absolute right-0 top-full mt-1 w-64 bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xl z-50 animate-fade-in"
                  onMouseEnter={() => setShowMoreMenu(true)}
                  onMouseLeave={() => setShowMoreMenu(false)}
                >
                  <button
                    onClick={() => {
                      openMegaCategory('supermarket_food_gas');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 flex items-center gap-2.5 text-xs font-bold text-stone-800"
                  >
                    <span className="text-base">🛒</span>
                    <div>
                      <span>Supermarket & Cooking Gas</span>
                      <span className="block text-[10px] text-stone-400 font-normal">Cereals, LPG gas refills, oils</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      openMegaCategory('health_beauty_personal_care');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 flex items-center gap-2.5 text-xs font-bold text-stone-800"
                  >
                    <span className="text-base">💄</span>
                    <div>
                      <span>Beauty & Health</span>
                      <span className="block text-[10px] text-stone-400 font-normal">Skincare, human hair, perfumes</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      openMegaCategory('office_stationery_books');
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 flex items-center gap-2.5 text-xs font-bold text-stone-800"
                  >
                    <span className="text-base">📚</span>
                    <div>
                      <span>Office & School Books</span>
                      <span className="block text-[10px] text-stone-400 font-normal">Printing paper, books, safes</span>
                    </div>
                  </button>

                  <div className="pt-2 mt-1 border-t border-stone-100">
                    <Link
                      href="/services"
                      onClick={() => setShowMoreMenu(false)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 flex items-center gap-2.5 text-xs font-bold text-stone-800"
                    >
                      <span className="text-base">🔧</span>
                      <div>
                        <span>Fundis & Home Services</span>
                        <span className="block text-[10px] text-stone-400 font-normal">Plumbers, electricians, painters</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Hot Deals Badge */}
            <Link
              href="/deals"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-rose-50 text-rose-700 hover:bg-rose-100/80 border border-rose-200/80 transition ml-1"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Deals</span>
            </Link>
          </nav>

          {/* Right Area: Post Free Ad CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button: Post Ad / Sell Free */}
            <Link
              href="/sell"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-extrabold shadow-sm hover:shadow-md transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-[#F59E0B]" />
              <span>Post Free Ad</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ELEGANT SOKO MEGA MENU COMPONENT */}
        <SokoMegaMenu
          isOpen={sokoMegaMenuOpen}
          onClose={() => setSokoMegaMenuOpen(false)}
          initialCategoryId={selectedMegaCategoryId}
        />

        {/* 3. MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-4 animate-fade-in max-h-[85vh] overflow-y-auto">

            {/* Top Bar on Mobile */}
            <div className="p-3 bg-stone-100 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span className="font-bold">Shopping from: {headerLocation}</span>
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
                href="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-900 text-white font-bold text-xs shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-[#F59E0B]" />
                <span>Post Free Ad / Sell (0% Fees)</span>
              </Link>
            </div>

            {/* Mobile Categories Accordion */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-1">
                Browse Soko Categories
              </div>

              {MASTER_PRODUCT_CATEGORIES.map((master) => {
                const isOpen = mobileMasterCatOpen === master.id;
                return (
                  <div key={master.id} className="border border-stone-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setMobileMasterCatOpen(isOpen ? null : master.id)}
                      className="w-full p-3.5 text-left font-bold text-xs text-stone-900 flex items-center justify-between bg-stone-50/70"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{master.icon}</span>
                        <span>{master.name}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180 text-stone-900' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white space-y-2 text-xs border-t border-stone-100">
                        <Link
                          href={`/soko/${master.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block p-2 rounded-xl bg-stone-100 font-bold text-stone-900 text-center"
                        >
                          Browse All in {master.shortName} →
                        </Link>
                        {master.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/soko/${master.id}?sub=${sub.id}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-2 rounded-lg hover:bg-stone-50 font-semibold text-stone-800"
                          >
                            <span className="mr-1.5">{sub.icon}</span>
                            <span>{sub.name}</span>
                            <span className="block text-[10px] text-stone-400 font-normal mt-0.5">
                              {sub.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Tools */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <Link
                href="/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl font-bold text-xs bg-rose-50 text-rose-700 border border-rose-200"
              >
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Today&apos;s Hot Deals</span>
              </Link>
              <Link
                href="/verify-till"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl font-bold text-xs bg-stone-50 text-stone-900 border border-stone-200"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Check Till or Pochi (Safe Pay)</span>
              </Link>
              <Link
                href="/fair-prices"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl font-bold text-xs bg-stone-50 text-stone-900 border border-stone-200"
              >
                <Sparkles className="w-4 h-4 text-[#B45309]" />
                <span>Fair Price Guide</span>
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl font-bold text-xs bg-stone-50 text-stone-900 border border-stone-200"
              >
                <Wrench className="w-4 h-4 text-stone-600" />
                <span>Find Verified Fundis</span>
              </Link>
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
