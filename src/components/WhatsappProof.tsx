import { whatsappProofs } from '../data/product';
import ImageLightbox from './ImageLightbox';
import { Section, SectionHeading } from './ui';

/* فالديف كنبينو بلايص فارغين باش نشوفو التصميم قبل ما توصل السكرينات الحقيقية */
const placeholders = import.meta.env.DEV && whatsappProofs.length === 0 ? [1, 2, 3] : [];

export default function WhatsappProof() {
  if (whatsappProofs.length === 0 && placeholders.length === 0) return null;

  return (
    <Section id="whatsapp_proof" className="bg-brand-cream">
      <SectionHeading
        eyebrow="💬 كيكتبو لينا"
        title="ميساجات حقيقية من عند الكليان"
        sub="هادو ميساجات صيفطو لينا الواليدين فالواتساب من بعد ما وصلهم الباك."
      />
      <div dir="ltr" className="-mx-4 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
        {whatsappProofs.map((src, i) => (
          <figure key={src} className="w-[68%] max-w-64 shrink-0 snap-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-ink/10">
            <ImageLightbox src={src} alt={`ميساج واتساب من عند كليان ${i + 1}`}>
              <img src={src} alt={`ميساج واتساب من عند كليان ${i + 1}`} width={640} height={1040} loading="lazy" decoding="async" className="h-auto w-full" />
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
      <p className="mt-1 text-center text-xs font-bold text-brand-ink/45">سحب باش تشوف كثر · كليكي على الصورة باش تكبر</p>
    </Section>
  );
}
