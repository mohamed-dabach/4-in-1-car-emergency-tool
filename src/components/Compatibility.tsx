import { Car, Bike, Truck, CircleDot } from 'lucide-react';
import { Section, SectionHeading } from './ui';

const vehicles = [
  { icon: Car, label: 'طوموبيل / فان' },
  { icon: Truck, label: 'پيكاپ وكاميو صغير' },
  { icon: Bike, label: 'موطور وبيسكليط' },
  { icon: CircleDot, label: 'بالونات وعوامات' },
];

export default function Compatibility() {
  return (
    <Section className="pt-0">
      <SectionHeading
        eyebrow="التوافق"
        title="كيخدم مع شنو؟"
        sub="من الطوموبيل الصغيرة حتى الكاميو الصغير، ومن عجلة البيسكليط حتى بالون ولادك."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <img
            src="/images/vehicles.webp"
            alt="أنواع السيارات التي يشغلها الجهاز"
            loading="lazy"
            width={1200}
            height={1200}
            className="w-full object-cover"
          />
          <figcaption className="px-4 py-3 text-center text-sm font-black text-brand-yellow">
            كيشعّل كل بطارية 12V
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <img
            src="/images/inflate-modes.webp"
            alt="الأوضاع الذكية للنفخ"
            loading="lazy"
            width={1200}
            height={1200}
            className="w-full object-cover"
          />
          <figcaption className="px-4 py-3 text-center text-sm font-black text-brand-cyan">
            4 أوضاع نفخ جاهزة
          </figcaption>
        </figure>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {vehicles.map((v) => (
          <li
            key={v.label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center"
          >
            <v.icon className="h-6 w-6 text-brand-yellow" />
            <span className="text-xs font-bold text-slate-200 sm:text-sm">{v.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
