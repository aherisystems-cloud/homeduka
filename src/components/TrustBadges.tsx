import { ShieldCheck, MapPin, CreditCard, Award, Smartphone } from 'lucide-react';

interface TrustBadgesProps {
  tillNumber?: string;
  pochiNumber?: string;
  landmark: string;
  hasCod: boolean;
  warrantyMonths?: number;
}

export default function TrustBadges({
  tillNumber,
  pochiNumber,
  landmark,
  hasCod,
  warrantyMonths
}: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 my-2.5">
      {tillNumber && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold">
          <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
          <span>Till: <strong>{tillNumber}</strong></span>
        </span>
      )}

      {pochiNumber && !tillNumber && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold">
          <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Pochi: <strong>{pochiNumber}</strong></span>
        </span>
      )}

      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 text-[11px] font-medium">
        <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
        <span className="truncate max-w-[220px]">{landmark}</span>
      </span>

      {hasCod && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          <span>Pay When It Arrives</span>
        </span>
      )}

      {warrantyMonths && warrantyMonths > 0 && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-900 border border-stone-200 text-[11px] font-bold">
          <Award className="w-3.5 h-3.5 text-[#B45309]" />
          <span>{warrantyMonths} Months Guarantee</span>
        </span>
      )}
    </div>
  );
}
