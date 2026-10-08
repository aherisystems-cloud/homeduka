'use client';

import React from 'react';
import { HomeRoom } from '../types/schema';
import { HOME_ROOMS, RoomCategoryDef } from '../data/mock_listings';
import { ArrowRight } from 'lucide-react';

interface BrowseByRoomProps {
  selectedRoom: HomeRoom | 'all';
  onSelectRoom: (room: HomeRoom | 'all') => void;
}

export default function BrowseByRoom({ selectedRoom, onSelectRoom }: BrowseByRoomProps) {
  return (
    <section id="rooms" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
            Home Organization
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            Browse by Room & Space
          </h2>
          <p className="text-xs text-stone-500">
            Explore curated furniture, fittings, appliances, and specialized artisans for each part of your home
          </p>
        </div>

        {selectedRoom !== 'all' && (
          <button
            onClick={() => onSelectRoom('all')}
            className="text-xs font-bold text-brand-700 hover:underline text-left sm:text-right"
          >
            Show All Rooms →
          </button>
        )}
      </div>

      {/* Room Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {HOME_ROOMS.map((room) => {
          const isSelected = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(isSelected ? 'all' : room.id)}
              className={`rounded-2xl border p-3 text-left transition-all duration-200 flex flex-col justify-between group overflow-hidden ${
                isSelected
                  ? 'bg-amber-900 text-white border-amber-900 shadow-sm ring-2 ring-amber-700'
                  : 'bg-white hover:bg-amber-50/40 border-stone-200 hover:border-amber-300 text-stone-800 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{room.icon}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                  }`}>
                    Explore
                  </span>
                </div>
                <h3 className={`font-bold text-xs sm:text-sm leading-tight ${
                  isSelected ? 'text-white' : 'text-stone-900 group-hover:text-amber-900'
                }`}>
                  {room.title}
                </h3>
                <p className={`text-[11px] mt-1 line-clamp-2 leading-snug ${
                  isSelected ? 'text-amber-200' : 'text-stone-500'
                }`}>
                  {room.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/50 flex items-center justify-between text-[10px] font-semibold">
                <span className={isSelected ? 'text-amber-300' : 'text-amber-800'}>
                  View Items
                </span>
                <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
