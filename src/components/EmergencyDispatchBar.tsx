'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Zap, Droplets, Flame, ArrowRight, PhoneCall } from 'lucide-react';

interface EmergencyDispatchBarProps {
  onSelectEmergencyCategory?: (category: string) => void;
}

export default function EmergencyDispatchBar({ onSelectEmergencyCategory }: EmergencyDispatchBarProps) {
  const emergencyTrades = [
    {
      id: "plumbing",
      label: "Burst Pipe / Leaks",
      icon: Droplets,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
      query: "plumbing"
    },
    {
      id: "electrical_solar",
      label: "Stima Tripping / Short Circuit",
      icon: Zap,
      color: "bg-white/10 text-stone-200 border-white/20 hover:bg-white/20",
      query: "electrical_solar"
    },
    {
      id: "solar_water",
      label: "Solar Water Heater / Borehole",
      icon: Flame,
      color: "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20",
      query: "solar"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white rounded-3xl p-4 sm:p-5 border border-rose-500/30 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Urgent Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                24/7 Fast Dispatch
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Urgent home repair needed?
            </h2>
          </div>
        </div>

        {/* Quick Emergency Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {emergencyTrades.map((t) => {
            const IconComponent = t.icon;
            return (
              <Link
                key={t.id}
                href={`/services?filter=emergency&category=${t.query}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${t.color}`}
              >
                <IconComponent className="w-3.5 h-3.5 shrink-0" />
                <span>{t.label}</span>
              </Link>
            );
          })}

          <Link
            href="/services?filter=emergency"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm"
          >
            <span>All Emergency Pros</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
