import { Star } from 'lucide-react';
import { reviews } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Reviews() {
  return (
    <Section id="reviews" className="border-t border-white/5">
      <SectionHeading eyebrow="آراء الزبناء" title="شنو كيقولو لي شراوه" />
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="w-[85%] shrink-0 snap-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-right sm:w-[60%] lg:w-auto"
          >
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < r.stars ? 'fill-brand-yellow text-brand-yellow' : 'text-slate-600'}`}
                />
              ))}
            </div>
            <blockquote className="text-sm leading-relaxed text-slate-200 sm:text-base">
              {r.text}
            </blockquote>
            <figcaption className="mt-4 text-sm font-black text-brand-cyan">
              {r.name} — {r.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
