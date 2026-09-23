import { Star } from 'lucide-react';
import { reviews } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Reviews() {
  return (
    <Section id="reviews">
      <SectionHeading eyebrow="⭐⭐⭐⭐⭐" title="آراء زبنائنا" />
      <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className={`relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-ink/10 ${i % 2 ? 'sm:mt-6 rounded-tl-sm' : 'rounded-tr-sm'}`}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <figcaption className="flex items-center gap-2 text-sm font-black text-brand-ink">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow/50 text-base">{r.name.split(' ')[1]?.[0] ?? r.name[0]}</span>
                <span>{r.name}<span className="block text-xs font-bold text-brand-ink/50">{r.city}</span></span>
              </figcaption>
              <div className="flex gap-0.5" aria-label={`${r.stars} من 5`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className={`h-4 w-4 ${s < r.stars ? 'fill-brand-green text-brand-green' : 'text-brand-ink/20'}`} />
                ))}
              </div>
            </div>
            <blockquote className="text-[15px] leading-7 text-brand-ink/85">{r.text}</blockquote>
          </figure>
        ))}
      </div>
    </Section>
  );
}
