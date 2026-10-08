'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'header' | 'footer' | 'large' | 'icon-only';
  className?: string;
  showTagline?: boolean;
}

export default function Logo({ 
  variant = 'header', 
  className = '',
  showTagline = true 
}: LogoProps) {
  const isFooter = variant === 'footer';
  const isLarge = variant === 'large';
  const isIconOnly = variant === 'icon-only';

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2.5 group select-none transition-transform active:scale-98 ${className}`}
      aria-label="HomeDuka Kenya - Everything for your home"
    >
      {/* Geometric Architectural Logomark */}
      <div className={`relative shrink-0 flex items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md ${
        isLarge 
          ? 'w-12 h-12 bg-gradient-to-br from-[#B45309] to-[#92400E] text-white shadow-amber-900/20' 
          : isFooter
            ? 'w-10 h-10 bg-[#B45309] text-white'
            : 'w-10 h-10 bg-gradient-to-br from-[#B45309] to-[#92400E] text-white shadow-amber-900/10'
      }`}>
        {/* Custom SVG: Architectural Home + Duka Arched Doorway */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className={isLarge ? 'w-6 h-6' : 'w-5 h-5'} 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Architectural roof and home frame */}
          <path d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          {/* Arched Duka doorway forming both a home portal and shopping bag handle */}
          <path 
            d="M9 21V12a3 3 0 0 1 6 0v9" 
            stroke="currentColor" 
            fill="rgba(255, 255, 255, 0.22)" 
          />
        </svg>

        {/* Subtle geometric dot accent */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white ring-1 ring-amber-700/20" />
      </div>

      {/* Typography Wordmark */}
      {!isIconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline">
            <span className={`font-black tracking-tight leading-none ${
              isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            } ${isFooter ? 'text-white' : 'text-stone-900'}`}>
              Home
            </span>
            <span className={`font-black tracking-tight leading-none text-[#B45309] ${
              isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}>
              Duka
            </span>
            <span className={`ml-1 text-[10px] font-black uppercase px-1.5 py-0.2 rounded-md ${
              isFooter 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' 
                : 'bg-amber-100/80 text-[#B45309] border border-amber-200'
            }`}>
              KE
            </span>
          </div>

          {showTagline && (
            <span className={`text-[11px] font-semibold tracking-normal mt-0.5 ${
              isFooter ? 'text-stone-400' : 'text-stone-500'
            }`}>
              Everything for your home
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
