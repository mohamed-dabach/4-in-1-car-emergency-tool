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
      className={`px-4 py-9 sm:px-6 sm:py-12 lg:py-16 ${className}`}
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
    <div className="mb-6 text-center sm:mb-8">
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-brand-yellow/40 px-4 py-1 text-sm font-black text-brand-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[26px] leading-snug font-extrabold text-brand-ink sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
          {sub}
        </p>
      )}
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
  label = 'اطلب الآن',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  location?: 'hero' | 'pack_contents' | 'offer_picker';
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
      data-cta-location={location}
      onClick={handleClick}
      className={`inline-flex min-h-14 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-3.5 text-lg font-black text-white shadow-[0_12px_28px_-12px_rgba(240,71,59,0.85)] transition duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan sm:w-auto sm:px-10 sm:text-xl animate-cta-blink ${className}`}
    >
      {children}
    </button>
  );
}
