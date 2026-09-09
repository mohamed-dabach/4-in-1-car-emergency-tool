import { useEffect, useState } from 'react';
import { product } from '../data/product';
import { scrollToOrder } from './ui';

/**
 * Mobile-only sticky order bar. Appears once the hero is scrolled past and
 * hides again while the order form itself is on screen.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const order = document.getElementById('order');

    const update = () => {
      const pastHero = window.scrollY > 500;
      let formVisible = false;
      if (order) {
        const rect = order.getBoundingClientRect();
        formVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
      }
      setVisible(pastHero && !formVisible);
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
          </div>
          <span className="text-xs font-bold text-slate-400">التوصيل مجاني</span>
        </div>
        <button
          type="button"
          onClick={scrollToOrder}
          className="flex-1 rounded-xl bg-brand-red py-3.5 text-base font-black text-white shadow-lg transition-transform active:scale-[0.97]"
        >
          اطلب دابا
        </button>
      </div>
    </div>
  );
}
