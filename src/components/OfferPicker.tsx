import { Check, Flame } from 'lucide-react';
import { offers, offerRegularPrice, offerSaving, product, type Offer } from '../data/product';

export default function OfferPicker({
  selected,
  onSelect,
}: {
  selected: Offer;
  onSelect: (offer: Offer) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 block font-black text-gray-800">اختار العرض ديالك</legend>

      {offers.map((offer) => {
        const isSelected = selected.qty === offer.qty;
        const saving = offerSaving(offer);

        return (
          <label
            key={offer.qty}
            className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${
              isSelected
                ? 'border-brand-red bg-red-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="offer"
              value={offer.qty}
              checked={isSelected}
              onChange={() => onSelect(offer)}
              className="sr-only"
            />

            {offer.badge && (
              <span className="absolute -top-3 right-4 rounded-full bg-brand-navy px-3 py-1 text-xs font-black text-brand-yellow">
                {offer.badge}
              </span>
            )}

            <span
              aria-hidden
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                isSelected ? 'border-brand-red bg-brand-red' : 'border-gray-300 bg-white'
              }`}
            >
              {isSelected && <Check className="h-4 w-4 text-white" />}
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-black text-gray-900">{offer.title}</span>
                {saving > 0 && (
                  <span className="rounded-md bg-brand-red px-1.5 py-0.5 text-xs font-black text-white">
                    وفّر {saving} {product.currency}
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-xs font-bold text-gray-500 sm:text-sm">
                {offer.desc}
              </span>
              <span className="mt-1 flex items-center gap-1 text-xs font-black text-brand-red">
                <Flame className="h-3.5 w-3.5 shrink-0" />
                {offer.urgency}
              </span>
            </span>

            <span className="shrink-0 text-left">
              <span className="block text-xl font-black whitespace-nowrap text-gray-900 sm:text-2xl">
                {offer.price} {product.currency}
              </span>
              {saving > 0 && (
                <span className="block text-sm font-bold whitespace-nowrap text-gray-400 line-through">
                  {offerRegularPrice(offer)} {product.currency}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
