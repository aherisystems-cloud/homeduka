'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { HomeRoom } from '../types/schema';
import { HOME_ROOMS } from '../data/mock_listings';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, Sparkles, ExternalLink } from 'lucide-react';

interface BrowseByRoomProps {
  selectedRoom: HomeRoom | 'all';
  onSelectRoom: (room: HomeRoom | 'all') => void;
}

export default function BrowseByRoom({ selectedRoom, onSelectRoom }: BrowseByRoomProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="rooms" className="space-y-5">
      {/* Section Header with View All + Slider Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Curated Spaces</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Browse by Room
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Browse furniture, fittings, and fundis by living space or explore dedicated room spaces.
          </p>
        </div>

        {/* Action Controls: View All + Prev/Next Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {selectedRoom !== 'all' ? (
            <button
              onClick={() => onSelectRoom('all')}
              className="text-xs font-bold text-[#B45309] hover:text-[#92400E] bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full border border-stone-300 transition cursor-pointer"
            >
              Show All Rooms ✕
            </button>
          ) : (
            <Link
              href="/rooms"
              className="text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-1.5 rounded-full transition cursor-pointer inline-flex items-center gap-1"
            >
              <span>All Room Hubs</span>
              <ExternalLink className="w-3 h-3 text-stone-500" />
            </Link>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="Previous Rooms"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              aria-label="Next Rooms"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Room Category Cards Horizontal Slider */}
      <div 
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-stone-200"
      >
        {HOME_ROOMS.map((room) => {
          const isSelected = selectedRoom === room.id;
          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(isSelected ? 'all' : room.id)}
              className={`w-64 sm:w-72 shrink-0 rounded-3xl border p-4 text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer snap-start relative ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-[#B45309]'
                  : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800 shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Top Banner Image with Gradient */}
              <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-3 bg-stone-100">
                <img
                  src={room.bannerImage}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2.5 text-2xl drop-shadow-md">
                  {room.icon}
                </span>
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur ${
                  isSelected 
                    ? 'bg-[#B45309] text-white font-black' 
                    : 'bg-stone-900/80 text-white'
                }`}>
                  {isSelected ? 'Active' : 'Filter'}
                </span>
              </div>

              {/* Room Title & Tagline */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-sm sm:text-base leading-tight ${
                    isSelected ? 'text-white' : 'text-stone-900 group-hover:text-[#B45309]'
                  }`}>
                    {room.title}
                  </h3>
                  <Link
                    href={`/room/${room.id}`}
                    onClick={(e) => e.stopPropagation()}
                    title={`Open full ${room.title} guide page`}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition ${
                      isSelected 
                        ? 'bg-stone-800 text-stone-300 hover:text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                    }`}
                  >
                    Guide ↗
                  </Link>
                </div>
                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}>
                  {room.tagline}
                </p>
              </div>

              {/* Bottom Popular Searches Chips */}
              <div className="mt-3 pt-2.5 border-t border-stone-100/30 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-stone-300' : 'text-[#B45309]'}>
                  {isSelected ? 'Filtering on Homepage' : 'Filter this Room'}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
