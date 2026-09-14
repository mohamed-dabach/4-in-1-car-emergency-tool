import { product } from '../data/product';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 pt-7 pb-28 text-center lg:pb-9" data-analytics-section="footer">
      <p className="text-lg font-black text-brand-yellow">{product.name}</p>
      <p className="mt-1 text-sm text-slate-400">{product.tagline}</p>
      <p className="mt-4 text-xs leading-6 text-slate-400">
        التوصيل من 24 حتى 72 ساعة حسب المدينة · الدفع عند الاستلام · تبديل عيوب الصنع
      </p>
      <p className="mt-2 text-xs text-slate-500">
        © {new Date().getFullYear()} — جميع الحقوق محفوظة.
      </p>
    </footer>
  );
}
