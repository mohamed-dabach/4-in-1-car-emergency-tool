import { product } from '../data/product';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 pt-8 pb-28 text-center lg:pb-10">
      <p className="text-lg font-black text-brand-yellow">{product.name}</p>
      <p className="mt-1 text-sm text-slate-400">{product.tagline}</p>
      <p className="mt-4 text-xs text-slate-500">
        © {new Date().getFullYear()} — جميع الحقوق محفوظة. التوصيل لجميع مدن المغرب.
      </p>
    </footer>
  );
}
