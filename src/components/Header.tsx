import Link from 'next/link';
import { Home, MessageSquare, ShieldCheck, PlusCircle, MapPin, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-700 group-hover:bg-brand-800 flex items-center justify-center text-white font-bold shadow-sm transition">
              <Home className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <span className="font-black text-lg text-stone-900 tracking-tight flex items-center gap-1.5">
                Home <span className="text-brand-700">Kenya</span>
              </span>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Everything for your home
              </p>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            <MapPin className="w-3.5 h-3.5 text-brand-700" />
            <span>Nairobi • Coast • Rift Valley • Mt. Kenya</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#rooms"
            className="text-xs font-semibold text-stone-700 hover:text-brand-700 px-2 py-1 transition hidden md:inline-block"
          >
            By Room
          </Link>

          <Link
            href="/#recurring"
            className="text-xs font-semibold text-stone-700 hover:text-brand-700 px-2 py-1 transition hidden lg:inline-block"
          >
            Monthly Care
          </Link>

          <Link
            href="/services"
            className="text-xs font-semibold text-stone-700 hover:text-brand-700 px-2 py-1 transition"
          >
            Services & Fundis
          </Link>

          <Link
            href="/blog"
            className="text-xs font-semibold text-stone-600 hover:text-brand-700 px-2 py-1 transition hidden sm:inline-block"
          >
            Buyer Guides
          </Link>

          <Link
            href="https://whatsapp.com/channel/example-channel"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span>WhatsApp Deals</span>
          </Link>

          <Link
            href="/portal/demo-token"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-stone-900 text-white hover:bg-brand-900 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>List / Claim Shop</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
