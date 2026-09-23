import { useEffect, useState } from 'react';
import { product } from '../data/product';
import { trackCheckoutClick, trackInitiateCheckout } from '../lib/metaEvents';
import { scrollToOrder } from './ui';

export default function StickyCta() {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector('[data-cta-location="hero"]');
    const orderSection = document.getElementById('order');
    const observers: IntersectionObserver[] = [];

    if (heroCta) {
      const observer = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0.15 });
      observer.observe(heroCta);
      observers.push(observer);
    }
    if (orderSection) {
      const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0 });
      observer.observe(orderSection);
      observers.push(observer);
    }
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = !heroCtaVisible && !formVisible;
  const label = `اطلب الآن (${product.price} DH)`;
  return (
    <div data-testid="sticky-cta" aria-hidden={!visible} className={`fixed inset-x-0 bottom-0 z-50 border-t border-brand-ink/10 bg-white/95 px-3 pt-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(31,26,23,0.3)] backdrop-blur transition-transform duration-200 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0 leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tabular-nums text-brand-red">{product.price}</span>
            <span className="text-lg font-black text-brand-red">{product.currency}</span>
            <span className="text-sm font-bold text-brand-ink/40 line-through decoration-brand-red">{product.originalPrice}</span>
          </div>
          <span className="block text-[11px] leading-4 font-bold text-brand-ink/60">التوصيل فابور · الخلاص عند الاستلام</span>
        </div>
        <button type="button" tabIndex={visible ? 0 : -1} onClick={() => { trackCheckoutClick({ buttonLocation: 'sticky_bar', buttonName: label, price: product.price }); trackInitiateCheckout({ value: product.price, numItems: 1 }); scrollToOrder(); }} className="min-h-12 shrink-0 whitespace-nowrap rounded-xl bg-brand-red px-4 text-base font-black text-white transition active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan animate-cta-blink">اطلب الآن <bdi dir="ltr">({product.price} DH)</bdi></button>
      </div>
    </div>
  );
}
