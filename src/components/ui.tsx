import type { ReactNode } from 'react';
import { product } from '../data/product';
import { trackCheckoutClick, trackInitiateCheckout } from '../lib/metaEvents';

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-analytics-section={id}
      className={`px-4 py-12 sm:px-6 sm:py-16 lg:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8 text-center sm:mb-12">
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1 text-sm font-bold text-brand-yellow">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl leading-snug font-black text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {sub}
        </p>
      )}
    </div>
  );
}

export function Price({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const big = size === 'lg';
  return (
    <div className="flex items-end gap-3">
      <div className="flex items-baseline gap-1">
        <span
          className={`font-black text-brand-yellow ${big ? 'text-5xl sm:text-6xl' : 'text-3xl'}`}
        >
          {product.price}
        </span>
        <span className={`font-bold text-brand-yellow ${big ? 'text-2xl' : 'text-lg'}`}>
          {product.currency}
        </span>
      </div>
      <span
        className={`pb-1 font-bold text-slate-500 line-through ${big ? 'text-2xl' : 'text-lg'}`}
      >
        {product.oldPrice}
      </span>
      <span className="mb-1 rounded-lg bg-brand-red px-2 py-1 text-sm font-black text-white">
        -{product.discount}%
      </span>
    </div>
  );
}

/**
 * كيهبط للاستمارة وكيوقف فين الخانات باينين، ماشي غير العنوان.
 * كنستهدفو <form> بنفسو ماشي القسم كامل، باش أول خانة تكون فوق فالشاشة.
 */
export function scrollToOrder() {
  const section = document.getElementById('order');
  if (!section) return;

  // شوية ديال البلاصة فوق باش يبان راس البطاقة البيضا ويعرف فين وصل
  const offset = 56;
  const target = () => section.querySelector('form') ?? section;

  const go = (behavior: ScrollBehavior) => {
    const top = target().getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  go('smooth');

  /* الصور لي كيتشدو lazy كيتحملو وحنا هابطين وكيزيدو فطول الصفحة، فالبلاصة
     لي حسبنا كتولي غالطة بمئات ديال البيكسل. كنعاودو نقيسو من بعد ونصححو. */
  let tries = 0;
  const settle = () => {
    tries += 1;
    const drift = target().getBoundingClientRect().top - offset;
    if (Math.abs(drift) > 24) go(tries > 2 ? 'auto' : 'smooth');
    if (tries < 5) window.setTimeout(settle, 320);
  };

  window.setTimeout(settle, 420);
}

export function CtaButton({
  children,
  className = '',
  onClick = scrollToOrder,
  location = 'hero',
  label = 'اطلب دابا',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  location?: 'hero' | 'real_photos' | 'offer_picker';
  label?: string;
}) {
  const handleClick = () => {
    trackCheckoutClick({ buttonLocation: location, buttonName: label, price: product.price });
    trackInitiateCheckout({ value: product.price, numItems: 1 });
    onClick();
  };

  return (
    <button
      type="button"
      data-cta=""
      onClick={handleClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-4 text-lg font-black text-white shadow-[0_10px_30px_-8px_rgba(230,57,70,0.8)] transition-transform duration-150 active:scale-[0.97] sm:w-auto sm:px-10 sm:text-xl ${className}`}
    >
      {children}
    </button>
  );
}
