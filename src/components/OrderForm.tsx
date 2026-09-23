import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Award, CheckCircle2, LoaderCircle, PackageSearch, ShoppingCart, Truck, Wallet } from 'lucide-react';
import { offers, product, type Offer } from '../data/product';
import { whatsappEnabled, whatsappLink } from '../data/contact';
import { WhatsappFallbackLink, WhatsappIcon, WhatsappInlineLink } from './WhatsappButton';
import OfferPicker from './OfferPicker';
import { orderSource, submitOrder, type OrderPayload } from '../lib/submitOrder';
import { setAdvancedMatching, trackContact, trackFormError, trackFormStarted, trackFormSubmitAttempt, trackOfferSelected, trackPurchase } from '../lib/metaEvents';

const PHONE_PATTERN = /^(?:\+?212|0)[5-7]\d{8}$/;
const inputClass = 'min-h-12 w-full rounded-xl border border-brand-ink/20 bg-white px-4 py-3 text-base font-medium outline-none transition placeholder:text-brand-ink/35 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30';

function Field({ label, error, children }: { label: ReactNode; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-black text-brand-ink">{label}</span>{children}{error ? <span role="alert" className="mt-1.5 block text-sm font-bold text-red-700">{error}</span> : null}</label>;
}

function normalizePhone(value: string) { return value.replace(/[\s\-().]/g, ''); }

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [childName, setChildName] = useState('');
  const [failed, setFailed] = useState<OrderPayload | null>(null);
  const [offer, setOffer] = useState<Offer>(offers[0]);
  const [phoneError, setPhoneError] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);

  const selectOffer = (next: Offer) => { setOffer(next); trackOfferSelected({ quantity: next.qty, value: next.price }); };
  const validatePhone = (value: string) => {
    const valid = PHONE_PATTERN.test(normalizePhone(value));
    setPhoneError(valid ? '' : 'دخل رقم تليفون صحيح، مثلا 0612345678');
    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const data = new FormData(event.currentTarget);
    const phone = String(data.get('phone') ?? '').trim();
    if (!validatePhone(phone)) { phoneRef.current?.focus(); return; }

    // جوج سميات فعرض الإخوة، مفرقين بـ " / " فعمود واحد فالشيت.
    // السمية كتمشي حتى مع العرض باش ما تضيعش إلا كان السكريبت ديال الشيت باقي ما تبدلش.
    const children = [data.get('child1'), data.get('child2')].map((v) => String(v ?? '').trim()).filter(Boolean).join(' / ');
    const order: OrderPayload = { product: product.name, offer: `${offer.title} | الطفل: ${children}`, name: String(data.get('name') ?? '').trim(), phone, city: String(data.get('city') ?? '').trim(), address: String(data.get('address') ?? '').trim(), childName: children, quantity: offer.qty, total: offer.price, source: orderSource() };
    setIsSubmitting(true);
    setFailed(null);
    setAdvancedMatching({ fullName: order.name, phone: order.phone, city: order.city });
    trackFormSubmitAttempt({ quantity: order.quantity, value: order.total });
    const result = await submitOrder(order);
    setIsSubmitting(false);
    if (!result.ok) { trackFormError(result.error); setFailed(order); return; }
    setOrderCode(result.code);
    setChildName(children);
    setIsSuccess(true);
    trackPurchase({ value: order.total, numItems: order.quantity, orderId: result.code, contentName: offer.title }); // بلا سمية الطفل: ما كتمشيش لـ Meta
  };

  return (
    <section id="order" data-analytics-section="order" className="splash scroll-mt-4 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-brand-ink/10 bg-white text-brand-ink shadow-[0_24px_50px_-24px_rgba(31,26,23,0.35)]">
        <div className="flex h-2">
          <span className="flex-1 bg-brand-red" /><span className="flex-1 bg-brand-yellow" /><span className="flex-1 bg-brand-green" /><span className="flex-1 bg-brand-cyan" />
        </div>
        <div className="px-4 py-7 sm:px-10 sm:py-9">
          {isSuccess ? (
            <div className="py-6 text-center" aria-live="polite">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><CheckCircle2 className="h-9 w-9" /></div>
              <h2 className="font-display text-2xl font-extrabold">دازت لاكوموند ديالك بنجاح 🎉</h2>
              <p data-clarity-mask="true" className="mt-2 text-base leading-7 text-brand-ink/70">غادي نعيطو ليك فالتليفون باش نأكدو لاكوموند والعنوان، ونتأكدو حتى من السمية لي غانطبعو فالشهادة{childName ? <>: <b className="text-brand-ink">{childName}</b></> : null}.</p>
              <p className="mt-4 inline-block rounded-xl bg-brand-cream px-4 py-2 text-sm font-black">رقم لاكوموند: <span dir="ltr">{orderCode}</span></p>
              {whatsappEnabled ? <a href={whatsappLink(`سلام، بغيت نأكد لاكوموند ديالي: ${orderCode}`)} target="_blank" rel="noopener noreferrer" onClick={() => trackContact('whatsapp')} className="mx-auto mt-5 flex min-h-12 max-w-sm items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 font-black text-white"><WhatsappIcon className="h-5 w-5" /> ولا أكّد طلبك فالواتساب</a> : null}
            </div>
          ) : (
            <>
              <div className="mb-5 text-center">
                <p className="text-sm font-black text-brand-red">التوصيل فابور · خلّص حتى تشد الكولي</p>
                <h2 className="font-display mt-1 text-[26px] font-extrabold sm:text-3xl">🛒 عمّر الاستمارة باش تطلب</h2>
                <p className="mt-1 text-sm text-brand-ink/60">عمّر هاد المعلومات وغادي نعيطو ليك باش نأكدو لاكوموند</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <OfferPicker selected={offer} onSelect={selectOffer} />
                <div className="flex items-center justify-between rounded-xl bg-brand-ink px-4 py-3 text-white"><span className="text-sm font-bold">المجموع (التوصيل فابور)</span><span className="text-2xl font-black tabular-nums text-brand-yellow">{offer.price} {product.currency}</span></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="السمية والكنية"><input name="name" type="text" required autoComplete="name" placeholder="مثلا: فاطمة الزهراء" className={inputClass} onFocus={() => trackFormStarted('name')} /></Field>
                  <Field label="رقم التيليفون" error={phoneError}><input ref={phoneRef} name="phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="06 XX XX XX XX" aria-invalid={Boolean(phoneError)} className={`${inputClass} text-right ${phoneError ? 'border-red-600 ring-1 ring-red-600' : ''}`} onFocus={() => trackFormStarted('phone')} onBlur={(e) => validatePhone(e.currentTarget.value)} /></Field>
                  <Field label="المدينة"><input name="city" type="text" required autoComplete="address-level2" placeholder="مثلا: الدار البيضاء" className={inputClass} /></Field>
                  <Field label="العنوان"><input name="address" type="text" required autoComplete="street-address" placeholder="الحي، الزنقة، ورقم الدار" className={inputClass} /></Field>
                </div>
                <div className="rounded-2xl border-2 border-brand-yellow bg-brand-yellow/15 p-3.5">
                  <p className="mb-2 flex items-center gap-1.5 text-sm font-black text-brand-ink"><Award className="h-5 w-5 text-brand-red" /> 🎨 سمية وليدك (غادي نطبعوها فالشهادة فابور)</p>
                  <div className={`grid gap-3 ${offer.qty === 2 ? 'sm:grid-cols-2' : ''}`}>
                    <Field label={<span className="sr-only">سمية الطفل</span>}><input name="child1" type="text" required autoComplete="off" placeholder={offer.qty === 2 ? 'سمية الوليد الأول' : 'مثلا: ريان'} className={inputClass} /></Field>
                    {offer.qty === 2 ? <Field label={<span className="sr-only">سمية الوليد الثاني</span>}><input name="child2" type="text" required autoComplete="off" placeholder="سمية الوليد الثاني" className={inputClass} /></Field> : null}
                  </div>
                </div>
                <button type="submit" data-cta="" disabled={isSubmitting} className="flex min-h-14 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl bg-brand-red px-5 text-xl font-black text-white shadow-[0_12px_28px_-12px_rgba(240,71,59,0.9)] transition hover:brightness-105 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan">{isSubmitting ? <><LoaderCircle className="h-6 w-6 animate-spin" /> كنسجلو الطلب ديالك...</> : <><ShoppingCart className="h-6 w-6" /> كليكي هنا باش تأكد لاكوموند</>}</button>
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold text-brand-ink/65"><li className="flex items-center gap-1"><Truck className="h-4 w-4" /> توصيل فابور وبالزربة</li><li className="flex items-center gap-1"><PackageSearch className="h-4 w-4" /> قلّب سلعتك عاد خلّص</li><li className="flex items-center gap-1"><Wallet className="h-4 w-4" /> الخلاص عند الاستلام</li></ul>
                {failed ? <WhatsappFallbackLink order={failed} /> : <WhatsappInlineLink />}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
