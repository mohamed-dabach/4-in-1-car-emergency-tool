import { useEffect, useRef, useState } from 'react';
import { whatsappProofs } from '../data/product';
import ImageLightbox from './ImageLightbox';
import { Section, SectionHeading } from './ui';

/* فالديف كنبينو بلايص فارغين باش نشوفو التصميم قبل ما توصل السكرينات الحقيقية */
const placeholders = import.meta.env.DEV && whatsappProofs.length === 0 ? [1, 2, 3] : [];

// وقت كافي باش يتقرا سكرين كامل قبل ما يدوز للي من بعد
const AUTOPLAY_MS = 6500;

export default function WhatsappProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // كنتبعو شمن سكرينة فالوسط باش النقط يبقاو مزامنين مع السحب باليد
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // isIntersecting كتكون true حتى للسكرينة لي باين غير طرف منها فالجنب، فكنعتامدو على النسبة
          if (entry.intersectionRatio >= 0.6) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { root: track, threshold: 0.6 },
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[(index + whatsappProofs.length) % whatsappProofs.length];
    if (!track || !slide) return;
    const t = track.getBoundingClientRect();
    const s = slide.getBoundingClientRect();
    track.scrollBy({ left: s.left - t.left - (t.width - s.width) / 2, behavior: 'smooth' });
  };

  // كيدور بوحدو غير ملي القسم باين والسكرينات مافايتينش العرض؛ أول ما الكليان يلمس كيوقف نهائيا
  useEffect(() => {
    const track = trackRef.current;
    if (!autoplay || !track || whatsappProofs.length < 2) return;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.5 });
    io.observe(track);
    const id = window.setInterval(() => {
      const overflowing = track.scrollWidth > track.clientWidth + 8;
      if (visible && overflowing && !document.hidden) goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [autoplay, active]);

  const stopAutoplay = () => setAutoplay(false);

  if (whatsappProofs.length === 0 && placeholders.length === 0) return null;

  return (
    <Section id="whatsapp_proof" className="bg-brand-cream">
      <SectionHeading
        eyebrow="💬 كيكتبو لينا"
        title="ميساجات حقيقية من عند الكليان"
        sub="هادو ميساجات صيفطو لينا الواليدين فالواتساب من بعد ما وصلهم الباك."
      />
      <div
        ref={trackRef}
        dir="ltr"
        onPointerDown={stopAutoplay}
        onWheel={stopAutoplay}
        onTouchStart={stopAutoplay}
        className="-mx-4 flex snap-x snap-mandatory items-center gap-3 overflow-x-auto px-[14%] pt-1 pb-3 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {whatsappProofs.map((proof, i) => (
          <figure
            key={proof.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-index={i}
            className={`w-[72%] max-w-64 shrink-0 snap-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-ink/10 transition duration-300 ${
              active === i ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-70 sm:scale-100 sm:opacity-100'
            }`}
          >
            <ImageLightbox src={proof.src} alt={`ميساج واتساب من عند كليان ${i + 1}`}>
              <img src={proof.src} alt={`ميساج واتساب من عند كليان ${i + 1}`} width={proof.width} height={proof.height} loading="lazy" decoding="async" className="h-auto w-full" />
            </ImageLightbox>
          </figure>
        ))}
        {placeholders.map((n) => (
          <div key={n} className="flex aspect-[640/1040] w-[68%] max-w-64 shrink-0 snap-center items-center justify-center rounded-2xl border-2 border-dashed border-[#25D366] bg-white p-4 text-center text-sm font-bold text-brand-ink/50">
            سكرينة واتساب {n}
            <br />
            (ديف فقط)
          </div>
        ))}
      </div>
      {whatsappProofs.length > 1 && (
        <div dir="ltr" className="flex justify-center gap-1 sm:hidden">
          {whatsappProofs.map((proof, i) => (
            <button
              key={proof.src}
              type="button"
              onClick={() => {
                stopAutoplay();
                goTo(i);
              }}
              aria-label={`الميساج ${i + 1}`}
              aria-current={active === i}
              className="flex h-8 min-w-8 touch-manipulation items-center justify-center"
            >
              <span className={`block h-2.5 rounded-full transition-all ${active === i ? 'w-7 bg-[#25D366]' : 'w-2.5 bg-brand-ink/20'}`} />
            </button>
          ))}
        </div>
      )}
      <p className="mt-1 text-center text-xs font-bold text-brand-ink/45">سحب باش تشوف كثر · كليكي على الصورة باش تكبر</p>
    </Section>
  );
}
