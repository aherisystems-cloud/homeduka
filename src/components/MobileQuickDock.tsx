'use client';

import React from 'react';
import { Search, MapPin, Flame, Scale, AlertTriangle } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';

export default function MobileQuickDock() {
  const { items, openCompareModal } = useComparison();

  const handleSearchClick = () => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLocationClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-location-modal'));
    }
  };

  const handleDealsClick = () => {
    const dealsElem = document.getElementById('today-deals') || document.querySelector('section');
    if (dealsElem) {
      dealsElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleEmergencyClick = () => {
    const emergencyElem = document.getElementById('emergency-dispatch');
    if (emergencyElem) {
      emergencyElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.location.href = '/services?category=plumbing';
    }
  };

  return (
    <nav 
      aria-label="Mobile quick action dock" 
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 shadow-2xl flex items-center justify-around"
    >
      {/* 1. Search */}
      <button
        onClick={handleSearchClick}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-600 hover:text-stone-950 active:scale-95 transition"
      >
        <Search className="w-5 h-5 text-stone-700" />
        <span className="text-[10px] font-bold mt-0.5">Search</span>
      </button>

      {/* 2. Estate / Location */}
      <button
        onClick={handleLocationClick}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-600 hover:text-stone-950 active:scale-95 transition"
      >
        <MapPin className="w-5 h-5 text-[#B45309]" />
        <span className="text-[10px] font-bold mt-0.5">Estate</span>
      </button>

      {/* 3. Flash Deals */}
      <button
        onClick={handleDealsClick}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-600 hover:text-rose-600 active:scale-95 transition"
      >
        <div className="relative">
          <Flame className="w-5 h-5 text-rose-600 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-600" />
        </div>
        <span className="text-[10px] font-bold text-rose-600 mt-0.5">Deals</span>
      </button>

      {/* 4. Compare (with dynamic count) */}
      <button
        onClick={openCompareModal}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-600 hover:text-stone-950 active:scale-95 transition relative"
      >
        <div className="relative">
          <Scale className="w-5 h-5 text-stone-700" />
          {items.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-stone-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold mt-0.5">Compare</span>
      </button>

      {/* 5. 24/7 Emergency */}
      <button
        onClick={handleEmergencyClick}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-rose-700 hover:text-rose-900 active:scale-95 transition"
      >
        <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
        </div>
        <span className="text-[10px] font-black text-rose-700 mt-0.5">Fundi 24/7</span>
      </button>
    </nav>
  );
}
