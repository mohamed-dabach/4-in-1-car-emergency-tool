import { useEffect, useState } from 'react';
import { product } from '../data/product';
import { scrollToOrder } from './ui';
import { trackCheckoutClick, trackInitiateCheckout } from '../lib/metaEvents';

/**
 * شريط الطلب فالقاع (موبايل).
 * كيختافى ملي: كتكون شي CTA أخرى باينة فالشاشة، ولا ملي توصل لاستمارة الطلب.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const order = document.getElementById('order');
    const ctas = Array.from(document.querySelectorAll<HTMLElement>('[data-cta]'));

    const isOnScreen = (el: HTMLElement, margin = 0) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - margin && rect.bottom > margin;
    };

    const update = () => {
      const anyCtaVisible = ctas.some((el) => isOnScreen(el));
      const formVisible = order ? isOnScreen(order, 80) : false;
      setVisible(window.scrollY > 240 && !anyCtaVisible && !formVisible);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      data-testid="sticky-cta"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand-navy/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-brand-yellow">{product.price}</span>
            <span className="text-sm font-bold text-brand-yellow">{product.currency}</span>
            <span className="text-sm font-bold text-slate-500 line-through">
              {product.oldPrice}
            </span>
            <span className="rounded-md bg-brand-red px-1.5 py-0.5 text-[11px] font-black text-white">
              -{product.discount}%
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400">التوصيل مجاني · الدفع عند الاستلام</span>
        </div>
        <button
          type="button"
          onClick={() => {
            trackCheckoutClick({ buttonLocation: 'sticky_bar', buttonName: 'اطلب دابا', price: product.price });
            trackInitiateCheckout({ value: product.price, numItems: 1 });
            scrollToOrder();
          }}
          className="shrink-0 rounded-xl bg-brand-red px-6 py-3.5 text-base font-black text-white shadow-lg transition-transform active:scale-[0.97]"
        >
          اطلب دابا
        </button>
      </div>
    </div>
  );
}
