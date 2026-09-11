import { motion } from 'motion/react';
import { Check, Flame, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { offers, product, trustBadges } from '../data/product';
import { CtaButton, Price } from './ui';

const badgeIcons = [Truck, Wallet, ShieldCheck];

export default function Hero() {
  return (
    <header
      data-analytics-section="hero"
      className="relative overflow-hidden px-4 pt-5 pb-10 sm:px-6 sm:pt-12 lg:pt-16 lg:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-cyan/20 blur-[110px]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-2 text-center lg:order-1 lg:text-right"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/15 px-4 py-1.5 text-sm font-black text-red-300">
            <Flame className="h-4 w-4" />
            عرض خاص — الكمية محدودة
          </span>

          <h1 className="text-[26px] leading-[1.3] font-black text-white sm:text-4xl lg:text-5xl">
            ما تبقاش عالق فالطريق
            <span className="mt-2 block text-brand-yellow">
              جهاز واحد يشعّل، ينفخ، يضوي ويشحن
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
            شعّال بطارية 1000A + كومپريسور 150 PSI + باور بانك + ضو LED. كلشي فجهاز
            صغير كيدخل فبوات الطوموبيل.
          </p>

          <div className="mt-5 flex flex-col items-center gap-4 lg:items-start">
            <Price size="lg" />
            <CtaButton
              className="w-full sm:w-auto"
              location="hero"
              label="اطلب دابا — خلّص ملي يوصلك"
            >
              اطلب دابا — خلّص ملي يوصلك
            </CtaButton>
            <p className="text-sm font-black text-brand-cyan">
              خود جوج بـ {offers[1].price} {product.currency} وتوفّر{' '}
              {product.price * 2 - offers[1].price} {product.currency}
            </p>
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 lg:justify-start">
            {trustBadges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? Check;
              return (
                <li key={badge} className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
                  <Icon className="h-4 w-4 text-brand-cyan" />
                  {badge}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-[220px] sm:max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-6 rounded-full bg-brand-cyan/25 blur-[70px]"
            />
            <img
              src="/images/hero-kit.webp"
              alt={`${product.name} مع جميع الملحقات`}
              width={1200}
              height={1200}
              fetchPriority="high"
              className="relative w-full rounded-3xl border border-white/10 bg-white/5 object-cover"
            />
            <span className="absolute -bottom-3 right-3 rounded-xl bg-brand-yellow px-3 py-1.5 text-sm font-black text-brand-navy shadow-lg sm:text-base">
              {product.tagline}
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
