'use client';

import React, { useState } from 'react';
import { 
  X, CheckSquare, Square, CheckCircle2, AlertTriangle, 
  Truck, ShieldCheck, MessageSquare, PhoneCall, ArrowRight 
} from 'lucide-react';

interface DeliveryInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName?: string;
  sellerTill?: string;
  itemName?: string;
}

export default function DeliveryInspectionModal({
  isOpen,
  onClose,
  sellerName = 'WoodCraft Living',
  sellerTill = 'Till 894211',
  itemName = '6x6 Solid Wood Bed'
}: DeliveryInspectionModalProps) {
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    wood: false,
    moving: false,
    colorSize: false,
    complete: false
  });

  if (!isOpen) return null;

  const toggleCheck = (key: string) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allPassed = checks.wood && checks.moving && checks.colorSize && checks.complete;

  const handleReportProblem = () => {
    const text = `⚠️ *DELIVERY ISSUE REPORT: ${itemName}*
Shop: ${sellerName}
Driver is currently at my gate. I inspected the item and noticed an issue (crack / scratch / wrong color). 
Please advise immediately before I release payment.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Grade 4/5 English */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[11px] font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Gate Delivery Check</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Check Before You Pay the Driver
            </h2>
            <p className="text-xs text-stone-300">
              Take 2 minutes to check these 4 things while the lorry is at your gate.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item & Seller Card */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-500 font-medium block">Item being delivered:</span>
            <strong className="text-stone-900 text-sm font-extrabold">{itemName}</strong>
          </div>
          <div className="text-right">
            <span className="text-stone-500 font-medium block">Seller:</span>
            <strong className="text-stone-900 font-bold">{sellerName}</strong>
          </div>
        </div>

        {/* 4 Checkbox Steps */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          
          {/* Check 1 */}
          <button
            type="button"
            onClick={() => toggleCheck('wood')}
            className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
              checks.wood 
                ? 'bg-emerald-50/80 border-emerald-300 text-stone-900' 
                : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {checks.wood ? (
                <CheckSquare className="w-5 h-5 text-emerald-700" />
              ) : (
                <Square className="w-5 h-5 text-stone-400" />
              )}
            </div>
            <div className="space-y-0.5">
              <strong className="text-sm font-bold block text-stone-900">
                1. Look at the Wood & Polish
              </strong>
              <p className="text-xs text-stone-600">
                No deep scratches, cracks, or broken corners. The wood feels solid and clean.
              </p>
            </div>
          </button>

          {/* Check 2 */}
          <button
            type="button"
            onClick={() => toggleCheck('moving')}
            className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
              checks.moving 
                ? 'bg-emerald-50/80 border-emerald-300 text-stone-900' 
                : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {checks.moving ? (
                <CheckSquare className="w-5 h-5 text-emerald-700" />
              ) : (
                <Square className="w-5 h-5 text-stone-400" />
              )}
            </div>
            <div className="space-y-0.5">
              <strong className="text-sm font-bold block text-stone-900">
                2. Test Moving Parts
              </strong>
              <p className="text-xs text-stone-600">
                Drawers slide smoothly. Doors open and close easily without getting stuck.
              </p>
            </div>
          </button>

          {/* Check 3 */}
          <button
            type="button"
            onClick={() => toggleCheck('colorSize')}
            className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
              checks.colorSize 
                ? 'bg-emerald-50/80 border-emerald-300 text-stone-900' 
                : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {checks.colorSize ? (
                <CheckSquare className="w-5 h-5 text-emerald-700" />
              ) : (
                <Square className="w-5 h-5 text-stone-400" />
              )}
            </div>
            <div className="space-y-0.5">
              <strong className="text-sm font-bold block text-stone-900">
                3. Check Size & Color
              </strong>
              <p className="text-xs text-stone-600">
                It is the exact wood shade and measurement you agreed on with the shop.
              </p>
            </div>
          </button>

          {/* Check 4 */}
          <button
            type="button"
            onClick={() => toggleCheck('complete')}
            className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
              checks.complete 
                ? 'bg-emerald-50/80 border-emerald-300 text-stone-900' 
                : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {checks.complete ? (
                <CheckSquare className="w-5 h-5 text-emerald-700" />
              ) : (
                <Square className="w-5 h-5 text-stone-400" />
              )}
            </div>
            <div className="space-y-0.5">
              <strong className="text-sm font-bold block text-stone-900">
                4. Stable on Floor (No Wobble)
              </strong>
              <p className="text-xs text-stone-600">
                All 4 legs sit flat on the floor. Item does not rock or squeak. All bolts are tight.
              </p>
            </div>
          </button>

          {/* Dynamic Result State */}
          {allPassed ? (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <strong className="text-sm font-black">
                  Everything Looks Great! You Can Pay Now.
                </strong>
              </div>
              <p className="text-xs text-emerald-900">
                Pay using Lipa na M-Pesa to official <strong>{sellerTill}</strong>. Confirm the business name matches before entering your PIN.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <span>Tap each box above as you inspect the item.</span>
              <span className="font-bold text-stone-800">
                {Object.values(checks).filter(Boolean).length} of 4 Checked
              </span>
            </div>
          )}

          {/* Problem Warning Button */}
          <div className="pt-2">
            <button
              onClick={handleReportProblem}
              className="w-full p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Found a Scratch or Broken Part? Tell Seller on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              allPassed 
                ? 'bg-stone-900 hover:bg-black text-white' 
                : 'bg-stone-400 text-white cursor-not-allowed'
            }`}
            disabled={!allPassed}
          >
            <span>{allPassed ? 'Finished & Paid ✓' : 'Complete 4 Checks First'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
