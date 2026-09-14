import { Truck, Wallet } from 'lucide-react';

export default function AnnounceBar() {
  return (
    <div className="bg-brand-yellow text-brand-navy" data-analytics-section="announce">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-center gap-4 px-3 text-[11px] font-black sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Truck className="h-4 w-4" />
          التوصيل مجاني للمغرب
        </span>
        <span className="flex items-center gap-1.5">
          <Wallet className="h-4 w-4" />
          الدفع عند الاستلام
        </span>
      </div>
    </div>
  );
}
