import { ShieldCheck, MapPin, CreditCard, Award } from 'lucide-react';

interface TrustBadgesProps {
  tillNumber?: string;
  landmark: string;
  hasCod: boolean;
  warrantyMonths?: number;
}

export default function TrustBadges({
  tillNumber,
  landmark,
  hasCod,
  warrantyMonths
}: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 my-3">
      {tillNumber && (
        <span className="badge-trust badge-mpesa">
          <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
          <span>Lipa na M-Pesa Till: <strong>{tillNumber}</strong></span>
        </span>
      )}

      <span className="badge-trust badge-landmark">
        <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
        <span className="truncate max-w-[240px]">{landmark}</span>
      </span>

      {hasCod && (
        <span className="badge-trust badge-cod">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          <span>Pay on Delivery</span>
        </span>
      )}

      {warrantyMonths && warrantyMonths > 0 && (
        <span className="badge-trust bg-purple-100 text-purple-800 border border-purple-300">
          <Award className="w-3.5 h-3.5 text-purple-700" />
          <span>{warrantyMonths}-Month Warranty</span>
        </span>
      )}
    </div>
  );
}
