import { useEffect, useRef, useState } from 'react';
import { BatteryCharging, ChevronLeft, ChevronRight, Gauge, PackageCheck, SlidersHorizontal } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const slides = [
  {
    image: '/images/hero-studio-v2.webp',
    alt: 'جهاز الطوارئ 4 فـ1 مع الكابلات والخرطوم والملحقات',
    title: 'الكيت كامل',
    description: 'الجهاز مع كابلات البطارية، خرطوم النفخ وملحقات الشحن.',
    Icon: PackageCheck,
    fit: 'object-contain',
  },
  {
    image: '/images/use-battery-v2.webp',
    alt: 'صورة توضيحية للجهاز موصول ببطارية سيارة',
    title: 'مساعدة البطارية',
    description: 'كابلات ملوّنة مع وحدة حماية باش توصلهم بوضوح.',
    Icon: BatteryCharging,
    fit: 'object-cover',
  },
  {
    image: '/images/use-inflate-v2.webp',
    alt: 'صورة توضيحية للجهاز أثناء نفخ عجلة سيارة',
    title: 'منفاخ العجلات',
    description: 'خرطوم هواء وشاشة رقمية لمتابعة وضبط الضغط.',
    Icon: Gauge,
    fit: 'object-cover',
  },
  {
    image: '/images/hero-kit.webp',
    alt: 'واجهة الجهاز وملحقاته على خلفية بيضاء',
    title: 'التحكم والملحقات',
    description: 'شاشة واضحة، أزرار تحكم، كابل شحن ورؤوس نفخ متعددة.',
    Icon: SlidersHorizontal,
    fit: 'object-contain',
  },
] as const;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const goTo = (index: number) => setActive((index + slides.length) % slides.length);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl lg:rounded-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="صور وظائف جهاز الطوارئ"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; setPaused(true); }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        setPaused(false);
        if (start == null || end == null || Math.abs(end - start) < 45) return;
        goTo(active + (end < start ? 1 : -1));
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') goTo(active + 1);
        if (event.key === 'ArrowRight') goTo(active - 1);
      }}
    >
      <div className="relative h-[250px] min-[381px]:h-[320px] sm:h-[400px] lg:h-[550px]">
        {slides.map((slide, index) => (
          <figure
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-500 ${index === active ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-hidden={index !== active}
          >
            <ImageLightbox src={slide.image} alt={slide.alt} className="h-full w-full">
              <img
                src={slide.image}
                alt={slide.alt}
                width="900"
                height="900"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={`h-full w-full ${slide.fit}`}
              />
            </ImageLightbox>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/75 to-transparent px-3 pt-8 pb-7 text-right text-white sm:px-5 sm:pt-14 sm:pb-9">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-yellow text-brand-navy sm:h-10 sm:w-10">
                  <slide.Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black sm:text-lg">{slide.title}</p>
                  <p className="hidden text-xs leading-5 text-slate-200 min-[381px]:block sm:text-sm">{slide.description}</p>
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <button type="button" onClick={() => goTo(active - 1)} aria-label="الصورة السابقة" className="absolute top-1/2 right-2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-brand-navy/80 text-white shadow transition hover:bg-brand-navy focus-visible:outline-3 focus-visible:outline-brand-yellow">
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => goTo(active + 1)} aria-label="الصورة التالية" className="absolute top-1/2 left-2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-brand-navy/80 text-white shadow transition hover:bg-brand-navy focus-visible:outline-3 focus-visible:outline-brand-yellow">
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center gap-1.5" aria-label="اختيار صورة">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all ${index === active ? 'w-7 bg-brand-yellow' : 'w-2 bg-white/70 hover:bg-white'}`}
            aria-label={`عرض: ${slide.title}`}
            aria-current={index === active ? 'true' : undefined}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">{slides[active].title}، {active + 1} من {slides.length}</span>
    </div>
  );
}
