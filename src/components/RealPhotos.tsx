import { Section, SectionHeading, CtaButton } from './ui';

const shots = [
  { src: '/images/real-box-1.webp', alt: 'الجهاز والكولي ديالو فالمحل' },
  { src: '/images/real-device.webp', alt: 'الشاشة الرقمية ديال الجهاز' },
  { src: '/images/real-box-2.webp', alt: 'الجهاز مع الملحقات ديالو' },
];

export default function RealPhotos() {
  return (
    <Section className="border-t border-white/5">
      <SectionHeading
        eyebrow="تصاور حقيقية"
        title="هادي تصاور حقيقية ديال المنتج عندنا"
        sub="ماشي غير تصاور ديال الإنترنت — هاد الجهاز موجود ومتوفر دابا."
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {shots.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading="lazy"
            width={1200}
            height={1200}
            className={`aspect-square w-full rounded-2xl border border-white/10 object-cover ${
              i === 2 ? 'col-span-2 aspect-video lg:col-span-1 lg:aspect-square' : ''
            }`}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <CtaButton location="real_photos" label="بغيت نطلب واحد">
          بغيت نطلب واحد
        </CtaButton>
      </div>
    </Section>
  );
}
