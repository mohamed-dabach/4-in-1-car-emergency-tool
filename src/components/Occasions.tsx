import { occasions } from '../data/product';

export default function Occasions() {
  return (
    <section data-analytics-section="occasions" className="bg-brand-cream px-4 py-6">
      <p className="text-center text-sm font-black text-brand-ink/80">🎁 هدية مثالية ف:</p>
      <ul className="mx-auto mt-3 flex max-w-2xl flex-wrap justify-center gap-2">
        {occasions.map((occasion) => (
          <li key={occasion} className="rounded-full border-2 border-dashed border-brand-cyan/50 bg-white px-3.5 py-1.5 text-sm font-black text-brand-ink">
            {occasion}
          </li>
        ))}
      </ul>
    </section>
  );
}
