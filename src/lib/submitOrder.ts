export type OrderPayload = {
  name: string;
  phone: string;
  city: string;
  address: string;
  product: string;
  offer: string;
  quantity: number;
  total: number;
  source: string;
};

export type OrderResult =
  | { ok: true; code?: string; simulated?: boolean }
  | { ok: false; error: string };

/** URL ديال Google Apps Script — كيتحط ف Vercel كـ VITE_ORDERS_WEBHOOK */
const endpoint = import.meta.env.VITE_ORDERS_WEBHOOK as string | undefined;

export const ordersWebhookConfigured = Boolean(endpoint);

/** من فين جا الزائر — كيتسجل مع الطلب باش تعرف الإعلان لي خدم */
export function orderSource() {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  const utm = ['utm_source', 'utm_medium', 'utm_campaign']
    .map((k) => params.get(k))
    .filter(Boolean)
    .join(' / ');
  return utm || document.referrer || 'direct';
}

/**
 * كيصيفط الطلب لـ Google Sheet.
 *
 * Content-Type نص عادي بلا قصد: JSON كيطلق preflight ديال CORS و Apps Script
 * ما كيجاوبش على OPTIONS، فالطلب كيطيح. Apps Script كيقرا الـ body بحال بحال.
 */
export async function submitOrder(order: OrderPayload): Promise<OrderResult> {
  if (!endpoint) {
    // ما تنساش تحط VITE_ORDERS_WEBHOOK — بلاها الطلب كيتسجل غير فالكونسول
    console.warn('VITE_ORDERS_WEBHOOK is not set — order not sent', order);
    return { ok: true, simulated: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(order),
      redirect: 'follow',
    });

    if (!response.ok) return { ok: false, error: `http_${response.status}` };

    const data = (await response.json()) as { ok?: boolean; code?: string; error?: string };
    if (!data.ok) return { ok: false, error: data.error || 'rejected' };

    return { ok: true, code: data.code };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'network_error' };
  }
}
