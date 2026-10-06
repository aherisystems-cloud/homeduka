import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <span className="font-bold text-xl text-white tracking-tight flex items-center gap-2 mb-3">
              Home <span className="text-brand-500">Kenya</span>
            </span>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed mb-4">
              The verified local discovery network for quality furniture, home decor, renovations, emergency plumbers, and movers across Nairobi, Kiambu, and metropolitan Kenya.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Anti-Scam Architecture & Landmark Verified Showrooms</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Key Locations</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/?q=Ruiru" className="hover:text-white transition">Ruiru & Kamakis Bypass</Link></li>
              <li><Link href="/?q=Kilimani" className="hover:text-white transition">Kilimani & Kileleshwa</Link></li>
              <li><Link href="/?q=Westlands" className="hover:text-white transition">Westlands & Parklands</Link></li>
              <li><Link href="/?q=Syokimau" className="hover:text-white transition">Syokimau & Mombasa Road</Link></li>
              <li><Link href="/?q=Karen" className="hover:text-white transition">Karen & Ngong Road</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">For Businesses</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/portal/demo-token" className="hover:text-white transition">Seller Magic Login</Link></li>
              <li><Link href="https://whatsapp.com/channel/biashara-sample" className="hover:text-white transition">Biashara Professionals B2B</Link></li>
              <li><span className="text-slate-500">Powered by Zoho Bigin</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Home Kenya. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with zero-friction automation in Nairobi, Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
}
