import { steps } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Steps() {
  return (
    <Section id="steps" className="pt-0">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-10 sm:px-10">
        <SectionHeading eyebrow="طريقة الاستعمال" title="4 خطوات وغادي تشعّل" />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((s, i) => (
            <li
              key={s}
              className="relative rounded-2xl border border-white/10 bg-brand-navy px-4 pt-8 pb-5 text-center"
            >
              <span className="absolute -top-5 right-1/2 flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border-4 border-brand-navy bg-brand-cyan text-lg font-black text-brand-navy">
                {i + 1}
              </span>
              <p className="text-sm font-bold text-slate-200 sm:text-base">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
