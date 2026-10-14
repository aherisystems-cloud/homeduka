'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Bell, BellRing, Flame, RefreshCw, AlertTriangle, 
  Tag, CheckCircle2, Smartphone, ShieldCheck, Sparkles 
} from 'lucide-react';
import { AlertNotificationPreference } from '../types/schema';

interface AlertPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'homeduka_alert_preferences_v1';

export default function AlertPreferencesModal({ isOpen, onClose }: AlertPreferencesModalProps) {
  const [preferences, setPreferences] = useState<AlertNotificationPreference>({
    flash_deals_enabled: true,
    monthly_refills_enabled: true,
    emergency_alerts_enabled: false,
    price_drop_alerts_enabled: true,
    selected_county_id: 'nairobi',
    preferred_refill_day: 1,
    contact_channel: 'browser_push',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('default');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load alert preferences', e);
    }

    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  if (!isOpen) return null;

  const handleToggle = (key: keyof AlertNotificationPreference) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    } catch (e) {
      console.error('Failed to save alert preferences', e);
    }
  };

  const triggerTestAlert = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        setPermissionStatus(permission);
        if (permission !== 'granted') {
          setTestNotificationSent(true);
          return;
        }
      }

      try {
        new Notification('🔔 HomeDuka: Flash Deal Alert!', {
          body: 'Water Tank Deep Cleaning is 20% OFF today in Ruiru & Nairobi Metro. Tap to view!',
          icon: '/icons/icon.svg',
        });
      } catch (err) {
        console.warn('Native notification failed, using in-app preview', err);
      }
    }
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
              <BellRing className="w-5 h-5 text-[#B45309]" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base sm:text-lg leading-tight">
                Web App Deal & Upkeep Alerts
              </h3>
              <p className="text-xs text-stone-500">
                Choose exactly which alerts you receive — zero spam guarantee
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Notification simulated preview banner */}
          {testNotificationSent && (
            <div className="p-3.5 rounded-2xl bg-stone-900 text-white flex items-start gap-2.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold block text-white">🔔 Test Alert Dispatched:</span>
                <span className="text-stone-300">
                  &ldquo;You asked us to alert you: Water Tank Deep Cleaning is 20% off in your estate today!&rdquo;
                </span>
              </div>
            </div>
          )}

          {/* Alert Toggles */}
          <div className="space-y-3">
            {/* Toggle 1: 24H Flash Deals */}
            <div 
              onClick={() => handleToggle('flash_deals_enabled')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                preferences.flash_deals_enabled 
                  ? 'bg-rose-50/60 border-rose-200' 
                  : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Today&apos;s Flash Slashes</h4>
                  <p className="text-[11px] text-stone-500">
                    Price drops over 20% on living room sofas, beds & appliances
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.flash_deals_enabled}
                onChange={() => {}}
                className="w-4 h-4 accent-stone-900 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Monthly Refills & Care */}
            <div 
              onClick={() => handleToggle('monthly_refills_enabled')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                preferences.monthly_refills_enabled 
                  ? 'bg-amber-50/60 border-amber-200' 
                  : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-[#B45309] shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Monthly Refills & Upkeep</h4>
                  <p className="text-[11px] text-stone-500">
                    Friendly reminder on 1st of month for tank wash, pest spray & filters
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.monthly_refills_enabled}
                onChange={() => {}}
                className="w-4 h-4 accent-stone-900 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 3: Estate Price Drops */}
            <div 
              onClick={() => handleToggle('price_drop_alerts_enabled')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                preferences.price_drop_alerts_enabled 
                  ? 'bg-emerald-50/60 border-emerald-200' 
                  : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Estate Soko Offers</h4>
                  <p className="text-[11px] text-stone-500">
                    Alerts when shops in your sub-county offer free delivery
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.price_drop_alerts_enabled}
                onChange={() => {}}
                className="w-4 h-4 accent-stone-900 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 4: Emergency Fundi Dispatch */}
            <div 
              onClick={() => handleToggle('emergency_alerts_enabled')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                preferences.emergency_alerts_enabled 
                  ? 'bg-rose-50/60 border-rose-200' 
                  : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">24/7 Emergency Fundi Status</h4>
                  <p className="text-[11px] text-stone-500">
                    Standby plumber and electrician on-call updates for your estate
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.emergency_alerts_enabled}
                onChange={() => {}}
                className="w-4 h-4 accent-stone-900 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Test Alert Simulator Button */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div className="text-xs text-stone-600">
              <span className="font-bold text-stone-800 block">Test Your Alerts</span>
              <span className="text-[11px] text-stone-500">Preview what a deal notification looks like</span>
            </div>
            <button
              onClick={triggerTestAlert}
              className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              🔔 Send Test Alert
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-[#FDFBF7] flex items-center justify-between gap-3">
          {savedSuccess ? (
            <div className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Saved!</span>
            </div>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition shadow-sm active:scale-95 cursor-pointer"
              >
                Save Preferences
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
