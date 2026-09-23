import { Truck, Wallet } from 'lucide-react';

export default function AnnounceBar() {
  return (
    <div className="bg-brand-ink text-white" data-analytics-section="announce">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-center gap-4 px-3 text-xs font-black sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Truck className="h-4 w-4 text-brand-yellow" />
          التوصيل فابور
        </span>
        <span className="flex items-center gap-1.5">
          <Wallet className="h-4 w-4 text-brand-yellow" />
          الخلاص عند الاستلام
        </span>
      </div>
    </div>
  );
}
