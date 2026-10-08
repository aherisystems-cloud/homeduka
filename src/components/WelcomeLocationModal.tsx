'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, Sparkles, X, Check, ArrowRight, ShieldCheck, 
  Sofa, Utensils, Tv, Bed, Wrench, RefreshCw, Flame, Eye
} from 'lucide-react';
import Logo from './Logo';

export interface UserPreferences {
  locationId: string;
  locationName: string;
  intent: string;
}

interface WelcomeLocationModalProps {
  onComplete?: (prefs: UserPreferences) => void;
}

export default function WelcomeLocationModal({ onComplete }: WelcomeLocationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('nairobi');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');

  // Check if first-time visitor or triggered via event
  useEffect(() => {
    const saved = localStorage.getItem('homeduka_preferences_set');
    if (!saved) {
      // First visit: small delay for smooth mount
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }

    // Listen for manual re-open requests (e.g. clicking header location pill)
    const handleReopen = () => setIsOpen(true);
    window.addEventListener('open-location-modal', handleReopen);
    return () => window.removeEventListener('open-location-modal', handleReopen);
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const locations = [
    {
      id: 'nairobi',
      name: 'Nairobi (All Estates)',
      subtitle: 'Westlands, Kilimani, Ruiru, Kasarani, South B, Karen...',
      badge: 'Fastest Delivery'
    },
    {
      id: 'kiambu',
      name: 'Kiambu & Eastern Bypass',
      subtitle: 'Kamakis, Ruiru, Thika Road, Ruaka, Kikuyu',
      badge: 'Direct Shops'
    },
    {
      id: 'mombasa',
      name: 'Mombasa & Coastal',
      subtitle: 'Nyali, Bamburi, Mombasa Island, Diani, Kilifi',
      badge: 'Local Fundis'
    },
    {
      id: 'rift_valley',
      name: 'Nakuru & Rift Valley',
      subtitle: 'Nakuru City, Naivasha, Eldoret corridor',
      badge: 'Courier / Sacco'
    },
    {
      id: 'western',
      name: 'Kisumu & Western',
      subtitle: 'Kisumu City, Kakamega, Bungoma',
      badge: 'Courier / Sacco'
    },
    {
      id: 'other',
      name: 'Other 47 Counties',
      subtitle: 'Countrywide door delivery via Matatu Saccos & Wells Fargo',
      badge: 'Countrywide'
    }
  ];

  const intents = [
    {
      id: 'furniture',
      label: 'Furniture',
      icon: '🛋️',
      desc: 'Beds, sofas, dining sets, coffee tables, wardrobes'
    },
    {
      id: 'kitchen',
      label: 'Kitchen & Cookware',
      icon: '🍳',
      desc: 'Gas cookers, fridges, sufurias, modular cabinets'
    },
    {
      id: 'electronics',
      label: 'TVs & Electronics',
      icon: '📱',
      desc: 'Smart 4K TVs, soundbars, solar water systems'
    },
    {
      id: 'decor',
      label: 'Curtains & Decor',
      icon: '🪟',
      desc: 'Blackout curtains, carpets, rugs, bedsheets'
    },
    {
      id: 'services',
      label: 'Service Providers / Fundis',
      icon: '🔧',
      desc: 'Plumbers, electricians, gypsum fundis, repairs'
    },
    {
      id: 'recurring',
      label: 'Monthly Refills & Care',
      icon: '💧',
      desc: 'Drinking water 20L, cooking gas refills, fumigation'
    },
    {
      id: 'deals',
      label: "Today's Slashed Deals",
      icon: '🔥',
      desc: 'Flash discounts and 24-hour price cuts'
    },
    {
      id: 'all',
      label: 'Explore Everything',
      icon: '✨',
      desc: 'Browse the entire HomeDuka marketplace catalog'
    }
  ];

  const handleDismiss = () => {
    localStorage.setItem('homeduka_preferences_set', 'true');
    setIsOpen(false);
  };

  const handleSave = () => {
    const locObj = locations.find((l) => l.id === selectedLocation) || locations[0];
    localStorage.setItem('homeduka_preferences_set', 'true');
    localStorage.setItem('homeduka_user_location', locObj.id);
    localStorage.setItem('homeduka_user_location_name', locObj.name);
    localStorage.setItem('homeduka_user_intent', selectedIntent);

    if (onComplete) {
      onComplete({
        locationId: locObj.id,
        locationName: locObj.name,
        intent: selectedIntent
      });
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  const currentLocObj = locations.find((l) => l.id === selectedLocation) || locations[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={handleDismiss}
      />

      {/* Screen-Fill Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10">
        <div className="w-full max-w-3xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl border border-stone-200/90 overflow-hidden my-4 sm:my-8 animate-scale-up">
          
          {/* Modal Top Header with Brand & Dismiss Button */}
          <div className="p-6 sm:p-8 pb-4 flex items-start justify-between gap-4 border-b border-stone-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Logo variant="header" showTagline={false} />
                <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Welcome to Kenya&apos;s Home Hub
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Where should we deliver, and what does your home need?
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
                Personalize your visit in 5 seconds to see direct shop prices, verified fundis, and delivery timelines near your doorstep.
              </p>
            </div>

            {/* Clear Dismiss (✕) Button */}
            <button
              onClick={handleDismiss}
              className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-sm font-bold transition shrink-0 cursor-pointer shadow-2xs hover:scale-105"
              aria-label="Skip and close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Two Clear Steps */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[68vh] overflow-y-auto scrollbar-thin scrollbar-thumb-stone-200">
            
            {/* STEP 1: LOCATION SELECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Step 1: Where are you located?</span>
                </span>
                <span className="text-[11px] text-stone-400 font-medium">Select your area</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {locations.map((loc) => {
                  const isSelected = selectedLocation === loc.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50/70 border-[#B45309] ring-2 ring-[#B45309] shadow-xs'
                          : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs sm:text-sm font-bold truncate ${
                            isSelected ? 'text-[#B45309]' : 'text-stone-900'
                          }`}>
                            {loc.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 leading-snug">
                          {loc.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                          {loc.badge}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#B45309] text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: INTENT SELECTION */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Step 2: What are you looking for today?</span>
                </span>
                <span className="text-[11px] text-stone-400 font-medium">Choose a category</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {intents.map((item) => {
                  const isSelected = selectedIntent === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedIntent(item.id)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50/70 border-[#B45309] ring-2 ring-[#B45309] shadow-xs'
                          : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800'
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-2xl">{item.icon}</span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#B45309] text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold leading-tight ${
                          isSelected ? 'text-[#B45309]' : 'text-stone-900'
                        }`}>
                          {item.label}
                        </h4>
                        <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions: Primary CTA + Dismiss Link */}
          <div className="p-6 sm:p-8 pt-4 bg-[#FAF8F5] border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-500 text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-[#B45309] shrink-0" />
              <span>
                Matching with verified shops & fundis serving <strong>{currentLocObj.name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDismiss}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-2xl text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition cursor-pointer"
              >
                Skip for now
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="w-1/2 sm:w-auto px-6 py-3.5 rounded-2xl bg-[#B45309] hover:bg-[#92400E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Show Matches Now</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
