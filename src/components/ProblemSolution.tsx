import { CheckCircle2, XCircle } from 'lucide-react';
import { problem, solution, type StoryCard } from '../data/product';
import { Section, SectionHeading } from './ui';

function Card({ card, good }: { card: StoryCard; good: boolean }) {
  const Icon = good ? CheckCircle2 : XCircle;
  return (
    <article className={`overflow-hidden rounded-3xl border-2 ${good ? 'border-brand-green/40 bg-white' : 'border-brand-ink/10 bg-[#ecebe8]'}`}>
      <h3 className={`flex items-center gap-2 px-4 py-3 text-lg font-black ${good ? 'text-brand-green' : 'bg-brand-ink text-white'}`}>
        <Icon className={`h-6 w-6 shrink-0 ${good ? '' : 'text-brand-red'}`} /> {card.title}
      </h3>
      <img
        src={card.image}
        srcSet={`${card.image480} 480w, ${card.image} 800w`}
        sizes="(min-width: 768px) 440px, 92vw"
        width={800}
        height={good ? 410 : 356}
        loading="lazy"
        decoding="async"
        alt={card.alt}
        className="w-full object-cover"
      />
      <ul className="space-y-2 p-4">
        {card.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-[15px] leading-6 font-bold text-brand-ink">
            <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${good ? 'bg-brand-green' : 'bg-brand-red'}`} />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ProblemSolution() {
  return (
    <Section id="problem" className="bg-brand-cream">
      <SectionHeading title="علاش وليدك محتاج هاد البديل دابا؟" />
      <div className="relative mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        <Card card={problem} good={false} />
        <span aria-hidden className="font-display absolute top-1/2 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow text-lg font-extrabold text-brand-ink shadow-lg ring-4 ring-brand-cream">VS</span>
        <Card card={solution} good />
      </div>
    </Section>
  );
}
