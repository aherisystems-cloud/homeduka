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
              <span>Anti-Scam Architecture & Landmark Verified Shops</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Guides & Roundups</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog/best-sofa-makers-ruiru-kamakis" className="hover:text-white transition">Top Sofa Makers in Kamakis</Link></li>
              <li><Link href="/blog/emergency-plumbers-kilimani-kileleshwa" className="hover:text-white transition">Emergency Plumbers in Kilimani</Link></li>
              <li><Link href="/blog/cost-of-moving-house-nairobi-best-movers" className="hover:text-white transition">House Moving Rates in Nairobi</Link></li>
              <li><Link href="/blog" className="hover:text-white text-emerald-400 font-semibold transition">Browse All Buyer Guides →</Link></li>
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
