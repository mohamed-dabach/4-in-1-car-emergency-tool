import { useEffect, useState } from 'react';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';
import { recentOrders, tickerConfig } from '../data/socialProof';

/** إشعارات الطلبات الأخيرة — كتبان فالقاع على اليمين وكيتبدلو وحدة بوحدة */
export default function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (dismissed || !tickerConfig.enabled || recentOrders.length === 0) return;

    const { firstDelay, rotateEvery, swapPause } = tickerConfig;
    let swapTimeout: ReturnType<typeof setTimeout>;

    const initialTimeout = setTimeout(() => setVisible(true), firstDelay);

    const interval = setInterval(() => {
      setVisible(false);
      swapTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentOrders.length);
        setVisible(true);
      }, swapPause);
    }, rotateEvery);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(swapTimeout);
      clearInterval(interval);
    };
  }, [dismissed]);

  // ما نغطيوش استمارة الطلب بالإشعار
  useEffect(() => {
    const order = document.getElementById('order');
    if (!order) return;

    const update = () => {
      const rect = order.getBoundingClientRect();
      setFormInView(rect.top < window.innerHeight && rect.bottom > 0);
      setPastHero(window.scrollY > 500);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (dismissed || !visible || formInView || !pastHero) return null;

  const order = recentOrders[currentIndex];

  return (
    <aside
      aria-label="إشعار طلب جديد"
      aria-live="polite"
      className="fixed right-3 bottom-24 z-40 flex w-[min(20rem,calc(100vw-1.5rem))] animate-[fadeInUp_0.3s_ease-out] items-center gap-3 rounded-2xl border border-brand-yellow/40 bg-slate-900/95 p-3 shadow-2xl shadow-brand-yellow/10 backdrop-blur-md lg:right-6 lg:bottom-6"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/20 text-brand-yellow">
        <ShoppingBag className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1 text-right">
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
          <CheckCircle className="h-3 w-3 shrink-0" />
          <span className="truncate">طلب جديد مؤكد من {order.city}</span>
        </div>
        <div className="mt-0.5 text-xs leading-tight font-bold text-white">
          {order.name} طلب: {order.pack}
        </div>
        <div className="mt-0.5 text-[10px] text-slate-400">{order.time} · التوصيل بالمجان</div>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        title="إغلاق"
        aria-label="إغلاق الإشعار"
        className="self-start p-1 text-slate-500 transition-colors hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  );
}
