import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, LoaderCircle, ShieldCheck, ShoppingCart, Truck, Wallet } from 'lucide-react';
import { offers, product, type Offer } from '../data/product';
import { whatsappEnabled, whatsappLink } from '../data/contact';
import { WhatsappFallbackLink, WhatsappIcon, WhatsappInlineLink } from './WhatsappButton';
import OfferPicker from './OfferPicker';
import { orderSource, submitOrder, type OrderPayload } from '../lib/submitOrder';
import { setAdvancedMatching, trackContact, trackFormError, trackFormStarted, trackFormSubmitAttempt, trackOfferSelected, trackPurchase } from '../lib/metaEvents';

const PHONE_PATTERN = /^(?:\+?212|0)[5-7]\d{8}$/;
const inputClass = 'min-h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-base font-medium outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30';

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-black text-gray-800">{label}</span>{children}{error ? <span role="alert" className="mt-1.5 block text-sm font-bold text-red-700">{error}</span> : null}</label>;
}

function normalizePhone(value: string) { return value.replace(/[\s\-().]/g, ''); }

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [failed, setFailed] = useState<OrderPayload | null>(null);
  const [offer, setOffer] = useState<Offer>(offers[0]);
  const [phoneError, setPhoneError] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);

  const selectOffer = (next: Offer) => { setOffer(next); trackOfferSelected({ quantity: next.qty, value: next.price }); };
  const validatePhone = (value: string) => {
    const valid = PHONE_PATTERN.test(normalizePhone(value));
    setPhoneError(valid ? '' : 'دخل رقم مغربي صحيح، مثلا 0612345678');
    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const data = new FormData(event.currentTarget);
    const phone = String(data.get('phone') ?? '').trim();
    if (!validatePhone(phone)) { phoneRef.current?.focus(); return; }

    const order: OrderPayload = { product: product.name, offer: offer.title, name: String(data.get('name') ?? '').trim(), phone, city: String(data.get('city') ?? '').trim(), address: String(data.get('address') ?? '').trim(), quantity: offer.qty, total: offer.price, source: orderSource() };
    setIsSubmitting(true);
    setFailed(null);
    setAdvancedMatching({ fullName: order.name, phone: order.phone, city: order.city });
    trackFormSubmitAttempt({ quantity: order.quantity, value: order.total });
    const result = await submitOrder(order);
    setIsSubmitting(false);
    if (!result.ok) { trackFormError(result.error); setFailed(order); return; }
    setOrderCode(result.code);
    setIsSuccess(true);
    trackPurchase({ value: order.total, numItems: order.quantity, orderId: result.code, contentName: order.offer });
  };

  return (
    <section id="order" data-analytics-section="order" className="scroll-mt-4 bg-slate-950/45 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white text-brand-navy shadow-2xl">
        <div className="h-1.5 bg-brand-yellow" />
        <div className="px-5 py-7 sm:px-10 sm:py-9">
          {isSuccess ? (
            <div className="py-6 text-center" aria-live="polite">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><CheckCircle2 className="h-9 w-9" /></div>
              <h2 className="text-2xl font-black">تسجّل الطلب ديالك</h2>
              <p className="mt-2 text-base leading-7 text-gray-600">غادي نتاصلو بيك فالتليفون باش نأكدو الطلب والعنوان قبل الإرسال.</p>
              <p className="mt-4 inline-block rounded-xl bg-gray-100 px-4 py-2 text-sm font-black text-gray-700">رقم الطلب: <span dir="ltr">{orderCode}</span></p>
              {whatsappEnabled ? <a href={whatsappLink(`سلام، بغيت نأكد الطلب ديالي: ${orderCode}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp')} className="mx-auto mt-5 flex min-h-12 max-w-sm items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 font-black text-white"><WhatsappIcon className="h-5 w-5" /> أكّد اختيارياً فواتساب</a> : null}
            </div>
          ) : (
            <>
              <div className="mb-6 text-center"><p className="text-sm font-black text-brand-red">التوصيل مجاني · خلّص عند الاستلام</p><h2 className="mt-1 text-2xl font-black sm:text-3xl">كمّل طلبك فدقيقة</h2></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <OfferPicker selected={offer} onSelect={selectOffer} />
                <div className="flex items-center justify-between rounded-xl bg-brand-navy px-4 py-3 text-white"><span className="text-sm font-bold">المجموع مع التوصيل</span><span className="text-2xl font-black tabular-nums text-brand-yellow">{offer.price} {product.currency}</span></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="السميّة الكاملة"><input name="name" type="text" required autoComplete="name" placeholder="مثلا: محمد العلوي" className={inputClass} onFocus={() => trackFormStarted('name')} /></Field>
                  <Field label="رقم التيليفون" error={phoneError}><input ref={phoneRef} name="phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="06 XX XX XX XX" aria-invalid={Boolean(phoneError)} className={`${inputClass} text-right ${phoneError ? 'border-red-600 ring-1 ring-red-600' : ''}`} onFocus={() => trackFormStarted('phone')} onBlur={(e) => validatePhone(e.currentTarget.value)} /></Field>
                  <Field label="المدينة"><input name="city" type="text" required autoComplete="address-level2" placeholder="مثلا: الدار البيضاء" className={inputClass} /></Field>
                  <Field label="العنوان بالتفصيل"><input name="address" type="text" required autoComplete="street-address" placeholder="الحي، الزنقة، رقم الدار" className={inputClass} /></Field>
                </div>
                <button type="submit" data-cta="" disabled={isSubmitting} className="flex min-h-14 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 text-xl font-black text-white shadow-[0_12px_28px_-14px_rgba(16,185,129,0.9)] transition hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan">{isSubmitting ? <><LoaderCircle className="h-6 w-6 animate-spin" /> كنسجلو الطلب...</> : <><ShoppingCart className="h-6 w-6" /> أكّد الطلب</>}</button>
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold text-gray-600"><li className="flex items-center gap-1"><Truck className="h-4 w-4" /> توصيل مجاني</li><li className="flex items-center gap-1"><Wallet className="h-4 w-4" /> الدفع عند الاستلام</li><li className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> تبديل عيوب الصنع</li></ul>
                {failed ? <WhatsappFallbackLink order={failed} /> : <WhatsappInlineLink />}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
