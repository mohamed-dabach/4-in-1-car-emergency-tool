import { Check, X } from 'lucide-react';
import { comparison } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Comparison() {
  return (
    <Section className="pt-0">
      <SectionHeading
        eyebrow="المقارنة"
        title="جهاز واحد ولا 3 أجهزة؟"
        sub="شوف الفرق بين هاد الجهاز وبين ما تشري شعّال وكومپريسور وضو كل واحد بوحدو."
      />

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <div className="grid grid-cols-[minmax(62px,0.75fr)_1.25fr_1fr] bg-white/[0.06] text-center">
          <span className="px-3 py-3 text-xs font-bold text-slate-400 sm:text-sm">&nbsp;</span>
          <span className="border-x border-white/10 bg-brand-yellow/10 px-2 py-3 text-xs font-black text-brand-yellow sm:text-sm">
            هاد الجهاز
          </span>
          <span className="px-2 py-3 text-xs font-black text-slate-400 sm:text-sm">
            3 أجهزة مفرقين
          </span>
        </div>

        {comparison.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[minmax(62px,0.75fr)_1.25fr_1fr] items-stretch ${
              i % 2 ? 'bg-white/[0.02]' : 'bg-white/[0.045]'
            }`}
          >
            <span className="px-3 py-3.5 text-xs font-black text-white sm:text-sm">
              {row.label}
            </span>
            <span className="flex items-start gap-1.5 border-x border-white/10 bg-brand-yellow/[0.07] px-2.5 py-3.5 text-xs font-bold text-slate-100 sm:text-sm">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-yellow" />
              {row.one}
            </span>
            <span className="flex items-start gap-1.5 px-2.5 py-3.5 text-xs font-bold text-slate-400 sm:text-sm">
              <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />
              {row.many}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
