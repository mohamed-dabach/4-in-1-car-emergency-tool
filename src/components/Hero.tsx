import { Clock3, PackageSearch, RotateCcw } from 'lucide-react';
import { product } from '../data/product';
import { CtaButton } from './ui';
import ImageLightbox from './ImageLightbox';

function HeroImage() {
  return (
    <ImageLightbox src="/images/hero-pack.webp" alt="محتوى طقم الفنان الصغير">
      <img
        src="/images/hero-pack.webp"
        srcSet="/images/hero-pack-480.webp 480w, /images/hero-pack.webp 768w"
        sizes="(min-width: 1024px) 560px, 100vw"
        width={768}
        height={830}
        alt="طقم الفنان الصغير: حقيبة 208 قطعة، شهادة باسم الطفل فكادر خشبي وكتيب التلوين"
        fetchPriority="high"
        decoding="async"
        className="aspect-[768/830] w-full rounded-3xl object-cover shadow-[0_18px_40px_-18px_rgba(31,26,23,0.45)] ring-4 ring-white"
      />
    </ImageLightbox>
  );
}

export default function Hero() {
  return (
    <header data-analytics-section="hero" className="splash relative overflow-hidden px-4 pt-4 pb-8 sm:px-6 sm:py-10 lg:py-14">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-4 lg:grid-cols-2 lg:gap-14">
        <div className="text-center lg:text-right">
          <p className="text-xs font-black tracking-wide text-brand-cyan sm:text-sm">CARYYSTORE · {product.name}</p>
          <h1 className="font-display mt-1 text-[30px] leading-[1.25] font-extrabold text-brand-ink sm:text-4xl lg:text-5xl">
            ودّع إدمان التيليفون…
            <span className="block text-brand-red">وفجّر موهبة وليدك فالدار!</span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-7 font-semibold text-brand-ink/75 sm:text-lg lg:mx-0">
            208 قطعة ديال الألوان + <b className="text-brand-ink">شهادة باسم وليدك</b> + كادر خشبي + كتيب التلوين
          </p>

          <div className="mx-auto mt-3 w-full max-w-md lg:hidden">
            <HeroImage />
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
            <div className="flex flex-wrap items-baseline justify-center gap-x-2 font-black lg:justify-start">
              <span className="text-5xl tabular-nums text-brand-red">{product.price}</span>
              <span className="text-2xl text-brand-red">{product.currency}</span>
              <span className="text-xl text-brand-ink/45 line-through decoration-brand-red decoration-2">
                {product.originalPrice} {product.currency}
              </span>
              <span className="self-center rounded-full bg-brand-green px-2.5 py-0.5 text-xs text-white">التوصيل مجاني</span>
            </div>
            <CtaButton className="w-full max-w-md sm:w-full" location="hero" label="اطلب الآن وادفع عند الاستلام">
              اطلب الآن وادفع عند الاستلام
            </CtaButton>
          </div>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold text-brand-ink/70 lg:justify-start">
            <li className="flex items-center gap-1"><Clock3 className="h-4 w-4 text-brand-cyan" /> 24 حتى 72 ساعة</li>
            <li className="flex items-center gap-1"><PackageSearch className="h-4 w-4 text-brand-cyan" /> عاين قبل ما تخلص</li>
            <li className="flex items-center gap-1"><RotateCcw className="h-4 w-4 text-brand-cyan" /> تبديل مضمون</li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <HeroImage />
        </div>
      </div>
    </header>
  );
}
