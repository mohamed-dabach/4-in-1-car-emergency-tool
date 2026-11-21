import { variants, type Variant } from '../data/product';

const order: Variant[] = ['boy', 'girl'];

const selectedStyle: Record<Variant, string> = {
  boy: 'border-sky-500 bg-sky-500 text-white shadow-[0_8px_18px_-10px_rgba(14,165,233,0.9)]',
  girl: 'border-pink-500 bg-pink-500 text-white shadow-[0_8px_18px_-10px_rgba(236,72,153,0.9)]',
};

/** زوج د البوطونات ولد / بنت. `name` خاصو يكون مختلف لكل مجموعة فنفس الصفحة. */
export default function VariantPicker({
  name,
  value,
  onChange,
  legend,
  size = 'lg',
  className = '',
}: {
  name: string;
  value: Variant;
  onChange: (next: Variant) => void;
  legend: string;
  size?: 'lg' | 'sm';
  className?: string;
}) {
  const pad = size === 'lg' ? 'min-h-12 text-base' : 'min-h-11 text-sm';
  return (
    <fieldset className={className}>
      <legend className="sr-only">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {order.map((v) => {
          const isSelected = value === v;
          return (
            <label
              key={v}
              className={`flex cursor-pointer touch-manipulation items-center justify-center gap-1.5 rounded-2xl border-2 px-3 font-black transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-cyan ${pad} ${isSelected ? selectedStyle[v] : 'border-brand-ink/15 bg-white text-brand-ink hover:border-brand-ink/30'}`}
            >
              <input type="radio" name={name} value={v} checked={isSelected} onChange={() => onChange(v)} className="sr-only" />
              <span aria-hidden>{variants[v].emoji}</span> {variants[v].label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
