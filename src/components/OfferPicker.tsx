import { Check } from 'lucide-react';
import { offers, product, type Offer } from '../data/product';

export default function OfferPicker({ selected, onSelect }: { selected: Offer; onSelect: (offer: Offer) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-black text-brand-ink">اختار العرض</legend>
      <div className="grid gap-2">
        {offers.map((offer) => {
          const isSelected = selected.qty === offer.qty;
          return (
            <label key={offer.qty} className={`relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-2 px-3 py-2.5 transition-colors ${isSelected ? 'border-brand-red bg-red-50' : 'border-brand-ink/15 bg-white hover:border-brand-ink/30'}`}>
              <input type="radio" name="offer" value={offer.qty} checked={isSelected} onChange={() => onSelect(offer)} className="sr-only" />
              <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? 'border-brand-red bg-brand-red' : 'border-brand-ink/25 bg-white'}`}>
                {isSelected ? <Check className="h-4 w-4 text-white" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-black text-brand-ink">{offer.title}</span>
                <span className="block text-xs font-bold text-brand-ink/60">{offer.desc}</span>
              </span>
              <span className="shrink-0 text-left leading-tight">
                <span className="block text-lg font-black whitespace-nowrap text-brand-ink">{offer.price} {product.currency}</span>
                {offer.originalPrice && <span className="block text-xs font-bold text-brand-ink/40 line-through decoration-brand-red">{offer.originalPrice} {product.currency}</span>}
              </span>
              {offer.badge && (
                <span className="absolute -top-2.5 left-3 rounded-full bg-brand-green px-2 py-0.5 text-[11px] font-black text-white">{offer.badge}</span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
