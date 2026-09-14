import { Check, MessageCircleQuestion } from 'lucide-react';
import { boxItems } from '../data/product';
import { whatsappEnabled, whatsappLink } from '../data/contact';
import { trackContact } from '../lib/metaEvents';
import { Section, SectionHeading } from './ui';

const essentials = boxItems.slice(0, 4);

export default function ProductProof() {
  return (
    <Section id="product-proof">
      <SectionHeading
        eyebrow="المنتج الحقيقي"
        title="هذا هو الجهاز والملحقات لي غادي يوصّلوك"
        sub="تصاور حقيقية من الستوك ديالنا باش تشوف الجهاز قبل ما تطلب."
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <div className="grid grid-cols-2 gap-3">
          <img src="/images/real-device.webp" alt="صورة حقيقية لواجهة جهاز الطوارئ" width="1200" height="1600" loading="lazy" className="aspect-[3/4] w-full rounded-2xl border border-white/10 object-cover" />
          <img src="/images/real-box-1.webp" alt="صورة حقيقية للجهاز والعلبة والملحقات" width="1200" height="1200" loading="lazy" className="aspect-[3/4] w-full rounded-2xl border border-white/10 object-cover" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-6">
          <h3 className="text-xl font-black text-white">داخل الكولي</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {essentials.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {whatsappEnabled ? (
            <a
              href={whatsappLink('سلام، بغيت نتأكد واش جهاز الطوارئ 4 فـ1 مناسب للطوموبيل ديالي')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact('whatsapp')}
              className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#25D366] px-4 text-sm font-black text-[#6ee7a2] transition-colors hover:bg-[#25D366]/10"
            >
              <MessageCircleQuestion className="h-5 w-5" />
              سولنا واش مناسب للطوموبيل ديالك
            </a>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
