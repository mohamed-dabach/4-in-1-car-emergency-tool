import { useEffect, useState } from 'react';
import { whatsappEnabled, whatsappLink } from '../data/contact';
import { trackContact } from '../lib/metaEvents';

/** أيقونة واتساب — SVG باش ما نزيدوش مكتبة أخرى */
export function WhatsappIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.15-.17.2-.34.22-.63.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.42s1.05 2.8 1.2 3c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.09 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.39-.07-.12-.27-.2-.56-.34zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.9-4.44 9.91-9.91a9.85 9.85 0 00-2.9-7.01A9.82 9.82 0 0012.04 2zm5.79 15.7a8.2 8.2 0 01-5.79 2.4h-.01a8.22 8.22 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.25-4.36 8.24 8.24 0 0114.06-5.82 8.16 8.16 0 012.42 5.82 8.23 8.23 0 01-2.45 5.82z" />
    </svg>
  );
}

/** زر واتساب عايم فالقاع على اليسار */
export default function WhatsappButton() {
  const [formInView, setFormInView] = useState(false);
  const [stickyBarUp, setStickyBarUp] = useState(false);

  // ما نغطيوش استمارة الطلب — تما كاين لينك واتساب داخلي
  useEffect(() => {
    const order = document.getElementById('order');
    if (!order) return;

    const sticky = document.querySelector('[data-testid="sticky-cta"]');

    /* الشريط ديال القاع كيطلع ويهبط بـ translate، والحركة كتاخد 300ms — فإلا
       قِسنا البلاصة ديالو فوقت ديال scroll كنقراوه وهو باقي فالطريق. عوض هادشي
       كنتبعو الكلاس لي كيبدل: كيتقلب بحال بحال مع الشريط فنفس اللحظة.
       الطول 0 = مخبّع فالديسكتوب (lg:hidden)، وتما الزر كيبقى فالقاع. */
    const readSticky = () => {
      const up =
        !!sticky &&
        sticky.getBoundingClientRect().height > 0 &&
        !sticky.className.includes('translate-y-full');
      setStickyBarUp(up);
    };

    const update = () => {
      const rect = order.getBoundingClientRect();
      setFormInView(rect.top < window.innerHeight && rect.bottom > 0);
      readSticky();
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const observer = sticky ? new MutationObserver(readSticky) : null;
    observer?.observe(sticky!, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, []);

  if (!whatsappEnabled || formInView) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="سولنا على واتساب"
      onClick={() => trackContact('whatsapp')}
      className={`fixed left-3 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-6px_rgba(37,211,102,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 lg:bottom-6 lg:left-6 lg:h-16 lg:w-16 ${
        stickyBarUp ? 'bottom-24' : 'bottom-5'
      }`}
    >
      <WhatsappIcon className="h-7 w-7 lg:h-8 lg:w-8" />
    </a>
  );
}

/** سطر "سولنا على واتساب" لي كيبان تحت استمارة الطلب */
export function WhatsappInlineLink() {
  if (!whatsappEnabled) return null;

  return (
    <a
      href={whatsappLink('سلام 👋 عندي سؤال على جهاز الطوارئ 4 فـ1 قبل ما نطلب')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact('whatsapp')}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#25D366] bg-[#25D366]/10 py-3.5 text-base font-black text-[#128C4A] transition-colors hover:bg-[#25D366]/20"
    >
      <WhatsappIcon className="h-5 w-5" />
      عندك شي سؤال؟ سولنا على واتساب
    </a>
  );
}

/**
 * ملي كيفشل الإرسال للشيت — كنعطيوه واتساب معمّر بالطلب ديالو
 * باش ما يضيعش الطلب حتى إلا طاح الويبهوك.
 */
export function WhatsappFallbackLink({
  order,
}: {
  order: {
    name: string;
    phone: string;
    city: string;
    address: string;
    offer: string;
    total: number;
  };
}) {
  const message = [
    'سلام 👋 بغيت نطلب جهاز الطوارئ 4 فـ1',
    `الاسم: ${order.name}`,
    `الهاتف: ${order.phone}`,
    `المدينة: ${order.city}`,
    `العنوان: ${order.address}`,
    `العرض: ${order.offer} — ${order.total} د.م`,
  ].join('\n');

  return (
    <div className="mt-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
      <p className="text-sm font-black text-amber-900">
        ما قدرناش نسجلو الطلب دابا. صيفطو لينا فواتساب وغادي نتكلفو بيه.
      </p>
      {whatsappEnabled ? (
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact('whatsapp')}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-base font-black text-white"
        >
          <WhatsappIcon className="h-5 w-5" />
          صيفط الطلب فواتساب
        </a>
      ) : (
        <p className="mt-2 text-sm font-bold text-amber-800">عاود جرب من بعد شوية.</p>
      )}
    </div>
  );
}
