import { protections, clampSignals } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Safety() {
  return (
    <Section id="safety" className="border-t border-white/5">
      <SectionHeading
        eyebrow="أمان"
        title="پنس ذكي — مستحيل تغلط"
        sub="الپنس فيه شيپ إلكتروني كيحميك أنت والبطارية. حتى إلا عكستي الأسلاك، كيحبس بوحدو."
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <img
          src="/images/smart-clamp.webp"
          alt="الپنس الذكي بحماية إلكترونية"
          loading="lazy"
          width={1200}
          height={1600}
          className="w-full rounded-3xl border border-white/10 object-cover"
        />

        <div>
          <ul className="space-y-3">
            {clampSignals.map((s) => (
              <li
                key={s.title}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <span className={`h-3.5 w-3.5 shrink-0 rounded-full ${s.color}`} />
                <div className="text-right">
                  <p className="text-base font-black text-white">{s.title}</p>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 mb-4 text-lg font-black text-brand-yellow">6 أنواع ديال الحماية</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {protections.map((p) => (
              <div
                key={p.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center"
              >
                <p.icon className="h-6 w-6 text-brand-cyan" />
                <span className="text-xs leading-tight font-bold text-slate-200">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
