import { product } from '../data/product';

export default function Footer() {
  return (
    <footer className="bg-brand-ink px-4 pt-7 pb-28 text-center text-white lg:pb-9" data-analytics-section="footer">
      <p className="font-display text-lg font-extrabold text-brand-yellow">{product.name}</p>
      <p className="mt-1 text-sm text-white/70">{product.tagline}</p>
      <p className="mt-4 text-xs leading-6 text-white/60">
        التوصيل من 24 حتى 72 ساعة حسب المدينة · الدفع عند الاستلام · تبديل إلا كانت شي مشكلة
      </p>
      <p className="mt-2 text-xs text-white/45">© {new Date().getFullYear()} Caryystore — جميع الحقوق محفوظة.</p>
    </footer>
  );
}
