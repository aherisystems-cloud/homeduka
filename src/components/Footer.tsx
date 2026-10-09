import Link from 'next/link';
import { ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 text-sm mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 space-y-3">
            <Logo variant="footer" showTagline={false} />
            <p className="text-stone-400 text-xs leading-relaxed">
              Everything for your home in Kenya. Discover verified furniture shops, modular kitchens, solar water systems, routine monthly maintenance, and skilled service providers & fundis.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#B45309]" />
              <span>Physical Shops • Real Landmarks • Verified Tills</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Browse by Room</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/#rooms" className="hover:text-white transition">🛋️ Living Room (Sofas & TV Units)</Link></li>
              <li><Link href="/#rooms" className="hover:text-white transition">🛏️ Bedroom (Storage Beds & Wardrobes)</Link></li>
              <li><Link href="/#rooms" className="hover:text-white transition">🍳 Kitchen & Dining (Modular & Granite)</Link></li>
              <li><Link href="/#rooms" className="hover:text-white transition">🚿 Bathroom & Water (Solar Heaters & Pumps)</Link></li>
              <li><Link href="/#rooms" className="hover:text-white transition">🌿 Compound & Outdoor (Cabro & Gates)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Routine Home Upkeep</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/#recurring" className="hover:text-white transition">Drinking Water & Cooking Gas Refills</Link></li>
              <li><Link href="/#recurring" className="hover:text-white transition">Water Tank Cleaning & Scrubbing</Link></li>
              <li><Link href="/#recurring" className="hover:text-white transition">Sofa & Carpet Fabric Steam Extraction</Link></li>
              <li><Link href="/#recurring" className="hover:text-white transition">Eco-Friendly Fumigation & Pest Shield</Link></li>
              <li><Link href="/services" className="hover:text-white transition">24/7 Emergency Plumbing & Electricians</Link></li>
              <li><Link href="/blog" className="text-[#B45309] font-semibold hover:underline transition">Buyer Guides & Price Comparisons →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">For Shops & Fundis</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/portal/demo-token" className="hover:text-white font-medium transition">Sell / Add Product or Service</Link></li>
              <li><Link href="/portal/demo-token" className="hover:text-white transition">Seller Magic Portal (No Passwords)</Link></li>
              <li><Link href="https://whatsapp.com/channel/biashara-sample" className="hover:text-white transition">Biashara Professionals WhatsApp</Link></li>
              <li><span className="text-stone-500">Automated Social Drops via Zoho</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Home Kenya. Operating across all 47 counties of Kenya.</p>
          <p className="flex items-center gap-1 text-stone-400">
            Everything your home needs. Curated & verified.
          </p>
        </div>
      </div>
    </footer>
  );
}
