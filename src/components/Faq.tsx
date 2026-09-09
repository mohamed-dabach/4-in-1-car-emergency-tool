import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="pt-0">
      <SectionHeading eyebrow="أسئلة" title="أسئلة كيطرحوها بزاف ديال الناس" />
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
              >
                <span className="text-base font-black text-white sm:text-lg">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-brand-yellow transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-slate-300 sm:text-base">
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
