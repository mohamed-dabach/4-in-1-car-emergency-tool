import { useEffect } from 'react';
import { Clock3, PackageSearch, RotateCcw } from 'lucide-react';
import { product, variants, type Variant } from '../data/product';
import { CtaButton } from './ui';
import ImageLightbox from './ImageLightbox';
import VariantPicker from './VariantPicker';

/** نفس القيمة لي ف index.html (preload) باش التصويرة ما تتحملش جوج مرات */
const HERO_SIZES = '(min-width: 1024px) 560px, (min-width: 640px) 448px, 100vw';

type VariantProps = { variant: Variant; onVariantChange: (next: Variant) => void };

/** التصويرة كاملة بلا قص (فالتيليفون كتاخد العرض كامل د الشاشة)، والبوطونات تحتها. */
function HeroVisual({ variant, onVariantChange, name }: VariantProps & { name: string }) {
  const v = variants[variant];
  return (
    <>
      <ImageLightbox src={v.image} alt={v.alt} className="-mx-4 sm:mx-auto sm:max-w-md lg:max-w-none">
        <img
          src={v.image}
          srcSet={v.srcSet}
          sizes={HERO_SIZES}
          width={896}
          height={1200}
          alt={v.alt}
          fetchPriority="high"
          decoding="async"
          className="aspect-[896/1200] w-full object-contain sm:rounded-3xl sm:shadow-[0_18px_40px_-18px_rgba(31,26,23,0.45)] sm:ring-4 sm:ring-white"
        />
      </ImageLightbox>
      <p className="mt-3 mb-2 text-center text-sm font-black text-brand-ink lg:text-right">ختار النسخة لي بغيتي:</p>
      <VariantPicker name={name} value={variant} onChange={onVariantChange} legend="ختار النسخة: للولد ولا للبنت" className="mx-auto max-w-md lg:mx-0 lg:max-w-none" />
    </>
  );
}

export default function Hero({ variant, onVariantChange }: VariantProps) {
  // النسخة الأخرى كتتحمل فالخلفية باش ملي يكليكي عليها تبان دغيا
  useEffect(() => {
    const other = variants[variant === 'boy' ? 'girl' : 'boy'];
    const timer = window.setTimeout(() => {
      const img = new Image();
      img.sizes = HERO_SIZES;
      img.srcset = other.srcSet;
    }, 2500);
    return () => window.clearTimeout(timer);
  }, []); // غير مرة وحدة ملي كتحل الصفحة

  return (
    <header data-analytics-section="hero" className="splash relative overflow-hidden px-4 pt-4 pb-8 sm:px-6 sm:py-10 lg:py-14">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-4 lg:grid-cols-2 lg:gap-14">
        <div className="text-center lg:text-right">
          <p className="text-xs font-black tracking-wide text-brand-cyan sm:text-sm">CARYYSTORE · {product.name}</p>
          <h1 className="font-display mt-1 text-[30px] leading-[1.25] font-extrabold text-brand-ink sm:text-4xl lg:text-5xl">
            ودّع إدمان التيليفون…
            <span className="block text-brand-red">وطلّع موهبة وليدك فالدار!</span>
          </h1>

          <div className="mt-3 lg:hidden">
            <HeroVisual name="hero-variant-mobile" variant={variant} onVariantChange={onVariantChange} />
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
            <div className="flex flex-wrap items-baseline justify-center gap-x-2 font-black lg:justify-start">
              <span className="text-5xl tabular-nums text-brand-red">{product.price}</span>
              <span className="text-2xl text-brand-red">{product.currency}</span>
              <span className="text-xl text-brand-ink/45 line-through decoration-brand-red decoration-2">
                {product.originalPrice} {product.currency}
              </span>
              <span className="self-center rounded-full bg-brand-green px-2.5 py-0.5 text-xs text-white">التوصيل فابور</span>
            </div>
            <CtaButton className="w-full max-w-md sm:w-full" location="hero" label="اطلب دابا وخلّص حتى يوصلك">
              اطلب دابا وخلّص حتى يوصلك
            </CtaButton>
          </div>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold text-brand-ink/70 lg:justify-start">
            <li className="flex items-center gap-1"><Clock3 className="h-4 w-4 text-brand-cyan" /> كيوصلك بين 24 و 48 ساعة</li>
            <li className="flex items-center gap-1"><PackageSearch className="h-4 w-4 text-brand-cyan" /> قلّب الكولي عاد خلّص</li>
            <li className="flex items-center gap-1"><RotateCcw className="h-4 w-4 text-brand-cyan" /> التبديل مضمون</li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <HeroVisual name="hero-variant-desktop" variant={variant} onVariantChange={onVariantChange} />
        </div>
      </div>
    </header>
  );
}
