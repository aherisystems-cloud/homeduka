import Link from 'next/link';
import { Flame, Clock, MessageSquare, ArrowRight } from 'lucide-react';

export default function DropOfTheDay() {
  return (
    <div className="bg-gradient-to-r from-[#B45309] to-[#92400E] rounded-2xl p-0.5 shadow-md my-8 text-white">
      <div className="bg-slate-900 rounded-[14px] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              DROP OF THE DAY (1 OF 2 SLOTS)
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Ends in 8h
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Handcrafted 7-Seater Chesterfield (Waterproof Velvet)
          </h3>

          <p className="text-xs text-slate-300">
            By <strong>Classic Hardwood Kamakis</strong>. Kiln-dried mahogany frame with 2-year warranty and free delivery within Nairobi & Kiambu.
          </p>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-2xl font-black text-emerald-400">KSh 44,500</span>
            <span className="text-sm text-slate-500 line-through">KSh 55,000</span>
            <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
              Save KSh 10,500
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <Link
            href="/biz/classic-hardwood-furniture-kamakis"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-sm shadow-md transition border border-stone-700/80 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Claim Drop on WhatsApp</span>
          </Link>
          <span className="text-[11px] text-center text-slate-400">
            Only 2 sets available at this price
          </span>
        </div>
      </div>
    </div>
  );
}
