import { Star } from 'lucide-react';
import { reviews, type ProductReview } from '../data/product';
import { Section, SectionHeading } from './ui';

const average = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length;

/** الحرف لي كيبان فالدويرة: كنتخطاو "أم" و"Mme" باش يبان حرف السمية */
function initial(name: string) {
  const words = name.split(' ').filter((w) => !['أم', 'أب', 'Mme', 'Oum'].includes(w));
  return (words[0] ?? name).charAt(0).toUpperCase();
}

const AVATAR_COLORS = ['bg-brand-yellow/50', 'bg-brand-cyan/20', 'bg-brand-green/20', 'bg-brand-red/15'];

function Stars({ value, size = 'h-4 w-4' }: { value: number; size?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} من 5`}>
      {Array.from({ length: 5 }, (_, s) => (
        <Star key={s} className={`${size} ${s < Math.round(value) ? 'fill-brand-green text-brand-green' : 'fill-brand-ink/10 text-brand-ink/15'}`} />
      ))}
    </span>
  );
}

function ReviewCard({ r, i }: { r: ProductReview; i: number }) {
  const latin = r.lang === 'french' || r.lang === 'arabizi';
  return (
    <figure className={`break-inside-avoid rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-ink/10 ${i % 2 ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <figcaption className="flex min-w-0 items-center gap-2 text-sm font-black text-brand-ink">
          <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{initial(r.name)}</span>
          <span className="min-w-0">
            <bdi>{r.name}</bdi>
            <span className="block text-xs font-bold text-brand-ink/50"><bdi>{r.city}</bdi> · {r.ago}</span>
          </span>
        </figcaption>
        <Stars value={r.stars} />
      </div>
      <blockquote dir={latin ? 'ltr' : 'rtl'} className={`text-[15px] leading-7 text-brand-ink/85 ${latin ? 'text-left' : ''}`}>{r.text}</blockquote>
    </figure>
  );
}

export default function Reviews() {
  return (
    <Section id="reviews">
      <SectionHeading title="شنو قالو الكليان ديالنا" />
      <div className="mx-auto -mt-2 mb-6 flex w-fit items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-brand-ink/10">
        <span className="text-3xl font-black tabular-nums text-brand-ink">{average.toFixed(1)}</span>
        <span>
          <Stars value={average} size="h-4.5 w-4.5" />
          <span className="block text-xs font-bold text-brand-ink/55">من {reviews.length} ديال الآراء</span>
        </span>
      </div>
      <div className="mx-auto max-w-4xl gap-3 space-y-3 sm:columns-2">
        {reviews.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
      </div>
    </Section>
  );
}
