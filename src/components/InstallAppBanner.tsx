'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share2 } from 'lucide-react';

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Check if already running in standalone mode (already installed)
    const isAppStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(isAppStandalone);
    if (isAppStandalone) return;

    // Check if user dismissed recently
    const dismissedTime = localStorage.getItem('hk_install_dismissed');
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Handler for Android / Chrome / Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If iOS and not standalone, show after 3 seconds
    if (isIosDevice && !isAppStandalone) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('hk_install_dismissed', Date.now().toString());
  };

  if (!showBanner || isStandalone) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white px-4 py-3 shadow-lg border-b border-emerald-500/30 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-emerald-400">Install Home Kenya App</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
                Zero Data Bundle Download
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 truncate">
              {isIos 
                ? "Tap Share (⎋) then 'Add to Home Screen' for 1-tap access on iPhone"
                : "Add to home screen for 1-tap emergency fundi dispatch & fast browsing"
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isIos && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs shadow-sm transition active:scale-95 border border-stone-700/80"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {isIos && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 text-[11px] font-semibold">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share → Add</span>
            </span>
          )}

          <button
            onClick={handleDismiss}
            aria-label="Dismiss app install banner"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
