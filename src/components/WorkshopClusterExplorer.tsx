'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Store, Navigation, ArrowRight, Sparkles, 
  CheckCircle2, Compass, Layers, Truck, Globe 
} from 'lucide-react';
import { NAIROBI_SHOPPING_CLUSTERS, ShoppingStreetCluster } from '../data/nairobi_guides';

interface WorkshopClusterExplorerProps {
  onSelectCluster?: (clusterName: string) => void;
}

export default function WorkshopClusterExplorer({
  onSelectCluster
}: WorkshopClusterExplorerProps) {
  const [selectedCluster, setSelectedCluster] = useState<ShoppingStreetCluster>(NAIROBI_SHOPPING_CLUSTERS[0]);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
      
      {/* Header - Grade 4/5 English */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Famous Furniture Streets & Corridors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Where to Buy in Kenya
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Direct shops, timber yards, and showrooms. Most established sellers deliver countrywide to <strong>Mombasa, Kisumu, Nakuru, Eldoret & all major towns</strong>.
          </p>
        </div>

        <Link
          href="/fair-prices"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition shadow-2xs self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
          <span>See Nairobi Fair Prices →</span>
        </Link>
      </div>

      {/* Cluster Navigation Pills */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        {NAIROBI_SHOPPING_CLUSTERS.map((cluster) => {
          const isSelected = selectedCluster.id === cluster.id;
          return (
            <button
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>{cluster.icon}</span>
              <span>{cluster.name.split('&')[0].trim()}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                {cluster.shopCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Cluster Showcase Card */}
      <div className="p-5 sm:p-7 rounded-3xl bg-stone-50 border border-stone-200/90 grid md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Details */}
        <div className="md:col-span-8 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{selectedCluster.road}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{selectedCluster.shopCount} Verified Local Shops</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              {selectedCluster.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {selectedCluster.whyGoHere}
            </p>
          </div>

          {/* Quick Facts */}
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-stone-200 space-y-1">
              <span className="text-stone-400 font-medium block">Best Thing to Buy Here:</span>
              <strong className="text-stone-900 font-bold block">{selectedCluster.specialty}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-950">
              <span className="text-emerald-700 font-medium block">Price Advantage:</span>
              <strong className="font-black block">{selectedCluster.typicalSavings}</strong>
            </div>
          </div>

          {/* Countrywide Delivery Callout */}
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <strong className="font-bold">Countrywide Delivery: </strong>
              <span>{selectedCluster.countrywideDeliveryNote}</span>
            </div>
          </div>

          {/* Top Items Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-stone-500 font-bold">Popular pieces:</span>
            {selectedCluster.topItems.map((item, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-bold text-stone-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Action Box */}
        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 space-y-3.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 mx-auto flex items-center justify-center text-2xl">
            {selectedCluster.icon}
          </div>
          <div>
            <strong className="text-xs text-stone-500 block font-medium">Main Landmark:</strong>
            <p className="text-xs font-bold text-stone-900 mt-0.5">
              {selectedCluster.landmark}
            </p>
          </div>

          <Link
            href={`/?q=${encodeURIComponent(selectedCluster.specialty.split(' ')[0])}#products`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-2xs active:scale-95"
          >
            <span>View Shops on {selectedCluster.name.split('&')[0].trim()}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>

      </div>

    </section>
  );
}
