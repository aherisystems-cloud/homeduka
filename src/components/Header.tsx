import Link from 'next/link';
import { Home, MessageSquare, ShieldCheck, PlusCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
              Home <span className="text-brand-600">Kenya</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Verified
              </span>
            </span>
            <p className="text-[11px] text-slate-500 hidden sm:block">Living, Furnishing & Fundis</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="https://whatsapp.com/channel/example-channel"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Join Home Deals WhatsApp</span>
          </Link>

          <Link
            href="/portal/demo-token"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Seller Portal</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
