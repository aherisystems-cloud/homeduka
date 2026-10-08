import Link from 'next/link';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <span className="font-bold text-xl text-white tracking-tight flex items-center gap-2 mb-3">
              Home <span className="text-brand-500">Kenya</span>
            </span>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              The verified local discovery network for quality furniture, home decor, renovations, emergency plumbers, and movers across Nairobi, Coast, Rift Valley, Western, and all 47 counties of Kenya.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Anti-Scam Architecture & Landmark Verified Shops</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Regions Covered</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/?q=Nairobi" className="hover:text-white transition">Nairobi Metro (Kilimani, Westlands, Karen, Syokimau)</Link></li>
              <li><Link href="/?q=Kiambu" className="hover:text-white transition">Kiambu (Ruiru Kamakis, Membley, Ruaka, Thika)</Link></li>
              <li><Link href="/?q=Mombasa" className="hover:text-white transition">Coast (Nyali, Bamburi, Diani, Mtwapa, Malindi)</Link></li>
              <li><Link href="/?q=Nakuru" className="hover:text-white transition">Rift Valley (Nakuru, Naivasha, Eldoret)</Link></li>
              <li><Link href="/?q=Kisumu" className="hover:text-white transition">Western & Nyanza (Kisumu Milimani, Kakamega)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Buyer Guides & Roundups</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/blog/best-sofa-makers-ruiru-kamakis" className="hover:text-white transition">Top Sofa Makers in Kamakis</Link></li>
              <li><Link href="/blog/emergency-plumbers-kilimani-kileleshwa" className="hover:text-white transition">Emergency Plumbers in Kilimani</Link></li>
              <li><Link href="/blog/cost-of-moving-house-nairobi-best-movers" className="hover:text-white transition">House Moving Rates in Nairobi</Link></li>
              <li><Link href="/blog" className="hover:text-white text-emerald-400 font-semibold transition">Browse All 2026 Guides →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">For Businesses</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/portal/demo-token" className="hover:text-white transition">Seller Magic Login (No Password)</Link></li>
              <li><Link href="https://whatsapp.com/channel/biashara-sample" className="hover:text-white transition">Biashara Professionals B2B</Link></li>
              <li><span className="text-slate-500">Powered by Zoho Bigin</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Home Kenya. Operating across all 47 counties of Kenya.</p>
          <p className="flex items-center gap-1">
            Built for Kenyan homeowners and craftsmen.
          </p>
        </div>
      </div>
    </footer>
  );
}
