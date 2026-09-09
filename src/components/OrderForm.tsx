import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { offers, product } from '../data/product';
import { WhatsappInlineLink, WhatsappFallbackLink } from './WhatsappButton';
import OfferPicker from './OfferPicker';
import { orderSource, submitOrder, type OrderPayload } from '../lib/submitOrder';

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-base font-medium transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-brand-cyan';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-black text-gray-800">{label}</span>
      {children}
    </label>
  );
}

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [failed, setFailed] = useState<OrderPayload | null>(null);
  const [offer, setOffer] = useState(offers[0]);

  const total = offer.price;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const order: OrderPayload = {
      product: product.name,
      offer: offer.title,
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      address: String(data.get('address') ?? '').trim(),
      quantity: offer.qty,
      total,
      source: orderSource(),
    };

    setIsSubmitting(true);
    setFailed(null);

    const result = await submitOrder(order);
    setIsSubmitting(false);

    if (!result.ok) {
      // ما نضيعوش الطلب: كنبينو ليه واتساب معمّر بالمعلومات ديالو
      console.error('order submission failed', result.error);
      setFailed(order);
      return;
    }

    setOrderCode(result.code ?? null);
    setIsSuccess(true);
  };

  return (
    <section id="order" className="scroll-mt-4 px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white text-brand-navy shadow-2xl">
        <div className="h-2 w-full bg-gradient-to-l from-brand-red via-brand-yellow to-brand-cyan" />

        <div className="px-5 py-8 sm:px-10 sm:py-10">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="mb-2 text-2xl font-black sm:text-3xl">تسجل الطلب ديالك!</h2>
              <p className="text-base text-gray-600 sm:text-lg">
                غادي نعيطو ليك قريب باش نأكدو الطلب والعنوان.
              </p>
              {orderCode && (
                <p className="mt-5 inline-block rounded-xl bg-gray-100 px-4 py-2 text-sm font-black text-gray-700">
                  كود الطلب ديالك: <span dir="ltr">{orderCode}</span>
                </p>
              )}
            </motion.div>
          ) : (
            <>
              <div className="mb-7 text-center">
                <h2 className="text-2xl font-black sm:text-3xl">عمّر المعلومات وحنا نعيطو ليك</h2>
                <p className="mt-2 text-base font-bold text-gray-500">
                  ما كتخلص والو دابا — كتخلص غير ملي يوصلك الكولي.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="السميّة الكاملة">
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="مثلا: محمد العلوي"
                    className={inputClass}
                  />
                </Field>

                <Field label="رقم التيليفون">
                  <input
                    name="phone"
                    type="tel"
                    required
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="06 XX XX XX XX"
                    className={`${inputClass} text-right`}
                  />
                </Field>

                <Field label="المدينة">
                  <input
                    name="city"
                    type="text"
                    required
                    autoComplete="address-level2"
                    placeholder="مثلا: الدار البيضاء"
                    className={inputClass}
                  />
                </Field>

                <Field label="العنوان بالتفصيل">
                  <textarea
                    name="address"
                    required
                    rows={3}
                    autoComplete="street-address"
                    placeholder="الحي، الزنقة، رقم الدار..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <OfferPicker selected={offer} onSelect={setOffer} />

                <div className="flex items-center justify-between rounded-2xl bg-brand-navy px-4 py-4 text-white">
                  <span className="text-sm font-bold sm:text-base">المجموع (التوصيل مجاني)</span>
                  <span className="text-2xl font-black whitespace-nowrap text-brand-yellow">
                    {total} {product.currency}
                  </span>
                </div>

                <button
                  type="submit"
                  data-cta=""
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-red py-5 text-xl font-black text-white shadow-[0_10px_30px_-8px_rgba(230,57,70,0.8)] transition-transform duration-150 active:scale-[0.98] disabled:opacity-70 sm:text-2xl"
                >
                  {isSubmitting ? (
                    <span className="h-7 w-7 animate-spin rounded-full border-4 border-white border-t-transparent" />
                  ) : (
                    <>أكّد الطلب 🛒</>
                  )}
                </button>

                <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2 text-sm font-bold text-gray-500">
                  <li className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4" /> توصيل مجاني
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Wallet className="h-4 w-4" /> خلّص عند الاستلام
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> ضمان
                  </li>
                </ul>
                {failed ? <WhatsappFallbackLink order={failed} /> : <WhatsappInlineLink />}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
