'use client';

import React, { useState } from 'react';
import { 
  X, FileText, CheckCircle2, MessageSquare, 
  Printer, Copy, ShieldCheck, Sparkles, Building2 
} from 'lucide-react';

interface QuotationGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemTitle?: string;
  initialPrice?: number;
  initialSellerName?: string;
  initialTillNumber?: string;
}

export default function QuotationGeneratorModal({
  isOpen,
  onClose,
  initialItemTitle = '',
  initialPrice,
  initialSellerName = '',
  initialTillNumber = ''
}: QuotationGeneratorModalProps) {
  const [shopName, setShopName] = useState(initialSellerName || 'WoodCraft Living');
  const [itemName, setItemName] = useState(initialItemTitle || '6x6 Solid Mahogany Bed');
  const [itemSpecs, setItemSpecs] = useState('Solid Mahogany wood, clear gloss varnish, 2 under-bed storage drawers');
  const [price, setPrice] = useState<string>(initialPrice ? String(initialPrice) : '48000');
  const [terms, setTerms] = useState<string>('Pay When Delivered');
  const [tillNumber, setTillNumber] = useState<string>(initialTillNumber || 'Till 894211 (WOODCRAFT LIVING)');
  const [deliveryMethod, setDeliveryMethod] = useState<string>('🚚 Lorry / Pickup Truck (Doorstep for Beds & Sofas)');
  const [deliveryNote, setDeliveryNote] = useState<string>('Delivered to your gate in Nairobi by pickup truck');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const quoteNumber = `HD-QT-${Math.floor(100000 + Math.random() * 900000)}`;
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const formattedPriceKsh = Number(price || 0).toLocaleString();

  const handleCopyWhatsApp = () => {
    const text = `📋 *HOMEDUKA OFFICIAL QUOTE: #${quoteNumber}*
📅 *Date:* ${today}
🏢 *Shop:* ${shopName}
🪵 *Item:* ${itemName}
📝 *Details:* ${itemSpecs}
💰 *Total Price:* Ksh ${formattedPriceKsh}
🛡️ *Payment Terms:* ${terms}
💳 *Pay Via:* ${tillNumber}
🚚 *Delivery:* ${deliveryMethod} — ${deliveryNote}

_Verified on HomeDuka Kenya. Zero hidden charges._
Check or verify: https://homeduka.co.ke/verify-till`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    // Open WhatsApp
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-fade-in print:p-0 print:bg-white">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden print:border-none print:shadow-none print:max-h-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Not printed */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between print:hidden">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B45309] text-white text-[11px] font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>1-Click Official Quote</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Official Price Quote Sheet
            </h2>
            <p className="text-xs text-stone-300">
              Clear price and payment terms you can send on WhatsApp or save as PDF.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Form Inputs (Grade 4/5 Simple Labels) - Hidden on Print */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 print:hidden">
            <span className="text-xs font-bold text-stone-900 block">
              Quick Edit (Change details below if needed):
            </span>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Shop / Fundi Name:</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-medium text-stone-900"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Total Price (Ksh):</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Item Name:</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-medium text-stone-900"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Payment Rule:</label>
                <select
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-medium text-stone-900"
                >
                  <option value="Pay When Delivered">Pay When Delivered (In Stock)</option>
                  <option value="30% Deposit (Made for You)">30% Deposit (Made for You)</option>
                  <option value="Pay After Work is Done">Pay After Work is Done (Fundis)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-semibold mb-1">Delivery Means:</label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-medium text-stone-900"
                >
                  <option value="🚚 Lorry / Pickup Truck (Doorstep for Beds & Sofas)">🚚 Lorry / Pickup Truck (Doorstep for Beds & Sofas)</option>
                  <option value="📦 Pickup Mtaani Agent (Pick at an agent in your estate/hood)">📦 Pickup Mtaani Agent (Pick at an agent in your estate/hood)</option>
                  <option value="🛵 Boda Boda Rider (Direct fast delivery to your door)">🛵 Boda Boda Rider (Direct fast delivery to your door)</option>
                  <option value="🏃 Errands Person / Runner (Personal hand delivery from the shop)">🏃 Errands Person / Runner (Personal hand delivery from the shop)</option>
                  <option value="🚐 Matatu Route Drop (Pick at your estate stage - e.g. Thika Rd, Ngong Rd, Waiyaki Way)">🚐 Matatu Route Drop (Pick at your estate stage - e.g. Thika Rd, Ngong Rd, Waiyaki Way)</option>
                  <option value="🚌 Countrywide Parcel (Fargo Courier, Speedaf, 2NK, North Rift to your town)">🚌 Countrywide Parcel (Fargo Courier, Speedaf, 2NK, North Rift to your town)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clean Official Quotation Card (This is what prints and displays) */}
          <div className="p-6 rounded-3xl bg-white border-2 border-stone-800 shadow-sm space-y-5 text-stone-900">
            {/* Top Bar */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-black tracking-widest text-[#B45309] uppercase block">
                  HOMEDUKA VERIFIED QUOTE
                </span>
                <h3 className="text-xl font-black text-stone-900">
                  {shopName}
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  Verified Local Shop • Nairobi & Countrywide Delivery
                </span>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-stone-900 block">{quoteNumber}</span>
                <span className="text-stone-500">{today}</span>
              </div>
            </div>

            {/* Item Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-stone-100 p-2.5 font-bold grid grid-cols-12 text-stone-700">
                <span className="col-span-8">Description & Wood/Materials</span>
                <span className="col-span-4 text-right">Price</span>
              </div>
              <div className="p-3 grid grid-cols-12 border-t border-stone-200 bg-white">
                <div className="col-span-8 space-y-1">
                  <strong className="block text-stone-900 text-sm">{itemName}</strong>
                  <p className="text-stone-600">{itemSpecs}</p>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 font-semibold text-[10px]">
                    {deliveryMethod} • {deliveryNote}
                  </span>
                </div>
                <div className="col-span-4 text-right">
                  <span className="text-base font-black text-stone-900">
                    Ksh {formattedPriceKsh}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment & Security Section */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="space-y-1">
                <span className="text-stone-500 font-semibold block">Payment Terms:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 text-white font-bold">
                  🛡️ {terms}
                </span>
              </div>
              <div className="space-y-1 sm:text-right">
                <span className="text-stone-500 font-semibold block">Official Lipa na M-Pesa:</span>
                <strong className="text-stone-900 font-extrabold block text-sm">
                  {tillNumber}
                </strong>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  ✓ Verified Receive-Only Wallet
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="text-[11px] text-stone-500 border-t border-stone-100 pt-3 flex items-center justify-between">
              <span>HomeDuka Kenya — Direct Shop & Yard Prices with 0% Middleman Fees.</span>
              <span className="font-bold text-stone-700">www.homeduka.co.ke</span>
            </div>
          </div>
        </div>

        {/* Modal Actions - Black Buttons */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition"
          >
            Close
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-bold transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyWhatsApp}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-sm active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{copied ? 'Copied to WhatsApp!' : 'Send on WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
