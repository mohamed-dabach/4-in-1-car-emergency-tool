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
  return (
    <div data-testid="sticky-cta" aria-hidden={!visible} className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand-navy/96 px-3 pt-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-200 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tabular-nums text-brand-yellow">{product.price}</span>
            {product.originalPrice && <span className="text-sm font-bold text-slate-400 line-through decoration-red-500 opacity-90">{product.originalPrice}</span>}
            <span className="text-xl font-black text-brand-yellow">{product.currency}</span>
          </div>
          <span className="block text-[11px] font-bold text-slate-300">التوصيل مجاني</span>
        </div>
        <button type="button" onClick={() => { trackCheckoutClick({ buttonLocation: 'sticky_bar', buttonName: 'اطلب دابا', price: product.price }); trackInitiateCheckout({ value: product.price, numItems: 1 }); scrollToOrder(); }} className="min-h-12 min-w-36 rounded-xl bg-brand-green px-5 text-base font-black text-white transition active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow animate-cta-blink">اطلب دابا</button>
      </div>
    </div>
  );
}
