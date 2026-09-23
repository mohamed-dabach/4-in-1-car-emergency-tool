import { CheckCircle2, XCircle } from 'lucide-react';
import { problem, solution, type StoryCard } from '../data/product';
import { Section, SectionHeading } from './ui';

function Card({ card, good }: { card: StoryCard; good: boolean }) {
  const Icon = good ? CheckCircle2 : XCircle;
  return (
    <article className={`w-full overflow-hidden rounded-3xl border-2 ${good ? 'border-brand-green/40 bg-white' : 'border-brand-ink/10 bg-[#ecebe8]'}`}>
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
      <SectionHeading title="علاش وليدك محتاج هاد الباك دابا؟" />
      {/* فالتيليفون الـ VS كيجي بين جوج البطاقات (ماشي فوقهم)، فالديسكتوب فالوسط بيناتهم */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-3 md:grid md:grid-cols-2 md:gap-8">
        <Card card={problem} good={false} />
        <span aria-hidden className="font-display z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-lg font-extrabold text-brand-ink shadow-lg ring-4 ring-brand-cream md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">VS</span>
        <Card card={solution} good />
      </div>
    </Section>
  );
}
