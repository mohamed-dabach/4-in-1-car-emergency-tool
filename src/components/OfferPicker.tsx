import { Check } from 'lucide-react';
import { offers, product, type Offer } from '../data/product';

export default function OfferPicker({ selected, onSelect }: { selected: Offer; onSelect: (offer: Offer) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-black text-gray-800">اختار الكمية</legend>
      <div className="grid grid-cols-2 gap-2">
        {offers.map((offer) => {
          const isSelected = selected.qty === offer.qty;
          return (
            <label key={offer.qty} className={`flex min-h-20 cursor-pointer items-center gap-2 rounded-xl border-2 p-3 transition-colors ${isSelected ? 'border-brand-green bg-emerald-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
              <input type="radio" name="offer" value={offer.qty} checked={isSelected} onChange={() => onSelect(offer)} className="sr-only" />
              <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? 'border-brand-green bg-brand-green' : 'border-gray-300 bg-white'}`}>
                {isSelected ? <Check className="h-4 w-4 text-white" /> : null}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black text-gray-900">{offer.title}</span>
                <span className="mt-0.5 flex flex-wrap items-center gap-1.5 whitespace-nowrap text-gray-900">
                  <span className="text-base font-black">{offer.price} {product.currency}</span>
                  {offer.originalPrice && <span className="text-xs font-bold text-gray-400 line-through decoration-red-500 opacity-80">{offer.originalPrice}</span>}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
