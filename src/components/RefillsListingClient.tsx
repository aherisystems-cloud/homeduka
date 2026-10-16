'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, MessageSquare, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppLeadLink } from '../utils/whatsapp_link';

interface RefillItem {
  id: string;
  title: string;
  description: string;
  frequency: string;
  priceEstimate: string;
  providerId: string;
  icon: string;
}

interface Provider {
  id: string;
  business_name: string;
  contact: {
    whatsapp_number: string;
  };
  location: {
    neighborhood: string;
    county: string;
  };
}

interface Props {
  items: RefillItem[];
  providers: Provider[];
}

export default function RefillsListingClient({ items, providers }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filterTags = [
    { id: 'all', label: 'All Essentials' },
    { id: 'water', label: '💧 Drinking Water' },
    { id: 'gas', label: '🔥 Cooking Gas' },
    { id: 'tank', label: '🚰 Tank Cleaning' },
    { id: 'pest', label: '🐜 Pest Control' },
    { id: 'solar', label: '☀️ Solar Care' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Tag Filter
      if (selectedTag === 'water' && !item.title.toLowerCase().includes('water')) return false;
      if (selectedTag === 'gas' && !item.title.toLowerCase().includes('gas')) return false;
      if (selectedTag === 'tank' && !item.title.toLowerCase().includes('tank')) return false;
      if (selectedTag === 'pest' && !item.title.toLowerCase().includes('pest') && !item.title.toLowerCase().includes('fumigation')) return false;
      if (selectedTag === 'solar' && !item.title.toLowerCase().includes('solar')) return false;

      // 2. Text Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const searchable = `${item.title} ${item.description} ${item.frequency} ${item.priceEstimate}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedTag]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search water refills, 13kg gas, tank cleaning, sofa wash..."
              className="w-full text-xs font-semibold pl-9 pr-8 py-2.5 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#B45309]/30 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3.5 py-2 rounded-2xl shrink-0 self-start sm:self-auto">
            {filteredItems.length} of {items.length} Plans Found
          </span>
        </div>

        {/* Quick Filter Tag Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {filterTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Refill Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const provider = providers.find((b) => b.id === item.providerId);
            const waUrl = provider 
              ? generateWhatsAppLeadLink(provider as any, { itemOrServiceName: item.title, intent: 'service_inquiry' })
              : '#';

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-emerald-500/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-3xl shadow-2xs">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/70">
                      {item.frequency}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-stone-900 mb-1 group-hover:text-emerald-900 transition">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-stone-400 block uppercase tracking-wider">
                        Fair Rate
                      </span>
                      <span className="text-sm font-black text-stone-900">
                        {item.priceEstimate}
                      </span>
                    </div>
                    {provider && (
                      <span className="text-[11px] text-stone-500 font-semibold truncate max-w-[140px]">
                        By {provider.business_name}
                      </span>
                    )}
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-2xs cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-stone-500 text-xs sm:text-sm space-y-2">
          <p>No restock plans found matching <strong>"{searchQuery}"</strong></p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
            className="text-xs font-bold text-[#B45309] underline cursor-pointer"
          >
            Clear search & show all restock plans
          </button>
        </div>
      )}
    </div>
  );
}
