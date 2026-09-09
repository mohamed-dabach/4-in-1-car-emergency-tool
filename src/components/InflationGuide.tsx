import { Gauge } from 'lucide-react';
import { inflationGuide } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function InflationGuide() {
  return (
    <Section className="pt-0">
      <SectionHeading
        eyebrow="دليل الضغط"
        title="شحال ديال الضغط لكل حاجة؟"
        sub="دخّل الرقم فالجهاز وهو ينفخ ويحبس بوحدو ملي يوصل ليه."
      />

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4">
        {inflationGuide.map((row) => (
          <div
            key={row.item}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-5 text-center"
          >
            <Gauge className="h-6 w-6 text-brand-cyan" />
            <span className="text-xs font-bold text-slate-300 sm:text-sm">{row.item}</span>
            <span
              dir="ltr"
              className="rounded-lg bg-brand-cyan/15 px-2.5 py-1 text-sm font-black whitespace-nowrap text-brand-cyan"
            >
              {row.psi}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-xs font-bold text-slate-500 sm:text-sm">
        هادو أرقام عامة — ديما تبع الضغط لي كاتب على باب الطوموبيل ديالك.
      </p>
    </Section>
  );
}
