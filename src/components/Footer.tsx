import Link from 'next/link';
import { ShieldCheck, MapPin, Sparkles, Truck, RefreshCw } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 text-sm mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Kenyan Coverage */}
          <div className="md:col-span-1 space-y-3">
            <Logo variant="footer" showTagline={false} />
            <p className="text-stone-400 text-xs leading-relaxed">
              Everything for your home in Kenya. Discover verified furniture shops, timber yards, modular kitchens, solar water systems, routine monthly refills, and vetted fundis.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#B45309]" />
              <span>Physical Shops • Real Landmarks • Verified Tills</span>
            </div>
            <div className="text-[11px] text-stone-500 pt-1">
              Serving: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Naivasha, Nyeri, Meru & Countrywide.
            </div>
          </div>

          {/* Col 2: Browse by Room (SEO & AIEO Hubs) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Browse by Room</h4>
              <Link href="/rooms" className="text-[11px] font-bold text-[#B45309] hover:underline">
                View All →
              </Link>
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/room/living_room" className="hover:text-white transition">🛋️ Living Room (Sofas & TV Units)</Link></li>
              <li><Link href="/room/bedroom" className="hover:text-white transition">🛏️ Bedroom (Storage Beds & Wardrobes)</Link></li>
              <li><Link href="/room/kitchen_dining" className="hover:text-white transition">🍳 Kitchen & Dining (Tables & Cookware)</Link></li>
              <li><Link href="/room/bathroom" className="hover:text-white transition">🚿 Bathroom & Water (Solar & Pumps)</Link></li>
              <li><Link href="/room/outdoor_compound" className="hover:text-white transition">🌿 Compound & Outdoor (Cabro & Gates)</Link></li>
              <li><Link href="/room/home_office" className="hover:text-white transition">💼 Home Office (Desks & Chairs)</Link></li>
            </ul>
          </div>

          {/* Col 3: Monthly Restock & Safety Tools */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Monthly Restock & Care</h4>
              <Link href="/refills" className="text-[11px] font-bold text-emerald-400 hover:underline">
                Restock Hub →
              </Link>
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/refills" className="hover:text-white transition">💧 Drinking Water & Gas Refills</Link></li>
              <li><Link href="/refills" className="hover:text-white transition">🧼 Water Tank Cleaning & Scrubbing</Link></li>
              <li><Link href="/refills" className="hover:text-white transition">🧽 Sofa & Mattress Deep Extraction</Link></li>
              <li><Link href="/verify-till" className="text-emerald-400 font-semibold hover:underline transition">🛡️ Verify M-Pesa Till or Pochi</Link></li>
              <li><Link href="/delivery-check" className="text-stone-300 font-semibold hover:text-white transition">🚚 Gate Delivery Inspection Guide</Link></li>
              <li><Link href="/fair-prices" className="text-[#B45309] font-semibold hover:underline transition">📊 Kenyan Fair Price Guide</Link></li>
            </ul>
          </div>

          {/* Col 4: For Shops, Fundis & Delivery */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">For Businesses & Delivery</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/sell" className="hover:text-white font-medium transition">List Your Shop or Services Free</Link></li>
              <li><Link href="/portal/demo" className="hover:text-white transition">Seller Magic Portal (No Passwords)</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Vetted Fundi Directory</Link></li>
              <li><Link href="/deals" className="hover:text-white transition">Daily Slashed Clearance Deals</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Kenyan Buyer Quality Guides</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} HomeDuka Kenya. Operating across all 47 counties of Kenya.</p>
          <p className="flex items-center gap-1 text-stone-400">
            Delivery via Boda • Pickup Mtaani • Errands • Matatu • Lorry • Countrywide Parcel.
          </p>
        </div>
      </div>
    </footer>
  );
}
