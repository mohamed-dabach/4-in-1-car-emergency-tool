import { X, ArrowLeft } from 'lucide-react';
import { painPoints } from '../data/product';
import { Section } from './ui';

export default function PainPoints() {
  return (
    <Section className="pt-0">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-10">
        <h2 className="mb-6 text-center text-xl font-black text-white sm:text-2xl">
          واش وقع ليك شي نهار واحد من هادو؟
        </h2>
        <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {painPoints.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl bg-brand-red/10 px-4 py-3 text-right text-sm font-bold text-slate-200 sm:text-base"
            >
              <X className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-base font-black text-brand-yellow sm:text-lg">
          <ArrowLeft className="h-5 w-5" />
          جهاز واحد كيحل ليك هاد المشاكل كاملين
        </p>
      </div>
    </Section>
  );
}
