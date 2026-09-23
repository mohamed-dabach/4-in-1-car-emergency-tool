import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../data/product';
import { trackFaqOpen } from '../lib/metaEvents';
import { Section, SectionHeading } from './ui';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq" className="bg-brand-cream">
      <SectionHeading eyebrow="قبل ما تطلبي" title="الأسئلة لي كيسولونا الأمهات بزاف" />
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-brand-ink/10 bg-white">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => { setOpen(isOpen ? null : i); if (!isOpen) trackFaqOpen(item.q, i); }}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-right focus-visible:outline-3 focus-visible:outline-inset focus-visible:outline-brand-cyan"
              >
                <span className="text-base font-black text-brand-ink sm:text-lg">{item.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-brand-red transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <p id={`faq-answer-${i}`} className="px-5 pb-4 text-sm leading-7 text-brand-ink/75 sm:text-base">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
