import { benefits } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Benefits() {
  return (
    <Section id="functions" className="border-t border-white/10 bg-slate-950/30">
      <SectionHeading
        eyebrow="4 خدمات فجهاز واحد"
        title="الحلول الأساسية ديال الطريق فيدك"
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {benefits.map((b) => (
          <article
            key={b.num}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center sm:p-5"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan">
              <b.icon className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black text-white sm:text-lg">{b.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{b.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-4">
        <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src="/images/use-battery-v2.webp" alt="تصوير توضيحي لاستعمال الجهاز مع بطارية السيارة" width="960" height="720" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="px-2 py-2 text-[10px] leading-4 font-bold text-slate-300 sm:px-4 sm:py-3 sm:text-xs">تصوير توضيحي · اتبع دليل الاستعمال</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src="/images/use-inflate-v2.webp" alt="تصوير توضيحي لاستعمال الجهاز في نفخ عجلة السيارة" width="960" height="720" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="px-2 py-2 text-[10px] leading-4 font-bold text-slate-300 sm:px-4 sm:py-3 sm:text-xs">تصوير توضيحي · اتبع ضغط السيارة</figcaption>
        </figure>
      </div>
    </Section>
  );
}
