import { Truck, Wallet } from 'lucide-react';

export default function AnnounceBar() {
  return (
    <div className="bg-brand-yellow text-brand-navy">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-xs font-black sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Truck className="h-4 w-4" />
          التوصيل مجاني لجميع مدن المغرب
        </span>
        <span className="flex items-center gap-1.5">
          <Wallet className="h-4 w-4" />
          الدفع عند الاستلام
        </span>
      </div>
    </div>
  );
}
