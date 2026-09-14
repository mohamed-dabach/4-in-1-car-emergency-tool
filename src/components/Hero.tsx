import { Clock3, RotateCcw, ShieldCheck } from 'lucide-react';
import { product } from '../data/product';
import { CtaButton } from './ui';
import HeroSlider from './HeroSlider';

export default function Hero() {
  return (
    <header
      data-analytics-section="hero"
      className="relative overflow-hidden px-4 py-4 sm:px-6 sm:py-10 lg:py-14"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-4 lg:grid-cols-2 lg:gap-14">
        <div className="text-center lg:text-right">
          <p className="text-sm font-black text-brand-cyan">CAR STORE · جهاز الطوارئ 4 فـ1</p>
          <h1 className="mt-2 text-[29px] leading-[1.22] font-black text-white sm:text-4xl lg:text-5xl">
            البطارية ضعفات؟ العجلة نقصات؟
            <span className="block text-brand-yellow">خليك واجد.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-slate-200 sm:text-lg lg:mx-0">
            جهاز الطوارئ 4 فـ1: يشعّل الطوموبيل، ينفخ العجلات، يشحن التيليفون ويضوي.
          </p>

          <div className="mx-auto mt-4 w-full max-w-md lg:hidden">
            <HeroSlider />
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
            <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-2 font-black text-brand-yellow">
              <span className="text-4xl tabular-nums sm:text-5xl">{product.price}</span>
              <span className="text-xl">{product.currency}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through decoration-red-500 decoration-2 opacity-80">{product.originalPrice} {product.currency}</span>
              )}
              <span className="text-sm text-white w-full text-center sm:w-auto sm:text-right">— التوصيل مجاني</span>
            </div>
            <CtaButton
              className="w-full max-w-md sm:w-full"
              location="hero"
              label="اطلب دابا — خلّص عند الاستلام"
            >
              اطلب دابا — خلّص عند الاستلام
            </CtaButton>
          </div>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold text-slate-300 lg:justify-start">
            <li className="flex items-center gap-1"><Clock3 className="h-4 w-4 text-brand-cyan" /> 24 حتى 72 ساعة</li>
            <li className="flex items-center gap-1"><RotateCcw className="h-4 w-4 text-brand-cyan" /> تبديل عيوب الصنع</li>
            <li className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand-cyan" /> خلّص عند الاستلام</li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <HeroSlider />
        </div>
      </div>
    </header>
  );
}
