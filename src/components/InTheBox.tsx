import { PackageCheck } from 'lucide-react';
import { boxItems } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function InTheBox() {
  return (
    <Section id="box" className="pt-0">
      <SectionHeading eyebrow="الكولي" title="شنو غادي توصلك فالصندوق" />
      <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-3">
          <img
            src="/images/in-the-box.webp"
            alt="محتويات صندوق جهاز الطوارئ"
            loading="lazy"
            width={1200}
            height={750}
            className="w-full rounded-3xl border border-white/10 object-cover"
          />
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/images/kit-uses.webp"
              alt="استعمالات الجهاز: عجلات، خيمة، بالون، عوامة"
              loading="lazy"
              width={1200}
              height={1200}
              className="w-full rounded-2xl border border-white/10 object-cover"
            />
            <img
              src="/images/four-modes.webp"
              alt="أوضاع النفخ الأربعة والشاشة الرقمية"
              loading="lazy"
              width={1200}
              height={1200}
              className="w-full rounded-2xl border border-white/10 object-cover"
            />
          </div>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {boxItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-200 sm:text-base"
            >
              <PackageCheck className="h-5 w-5 shrink-0 text-brand-yellow" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
