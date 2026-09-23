export type OrderPayload = {
  name: string;
  phone: string;
  city: string;
  address: string;
  /** سمية الطفل (ولا جوج مفرقين بـ /) باش تتطبع على الشهادة */
  childName: string;
  product: string;
  offer: string;
  quantity: number;
  total: number;
  source: string;
};

export type OrderResult =
  | { ok: true; code: string }
  | { ok: false; error: string };

/** URL ديال Google Apps Script — كيتحط ف Vercel كـ VITE_ORDERS_WEBHOOK */
const endpoint = import.meta.env.VITE_ORDERS_WEBHOOK as string | undefined;

export const ordersWebhookConfigured = Boolean(endpoint);

/** من فين جا الزائر — كيتسجل مع الطلب باش تعرف الإعلان لي خدم */
export function orderSource() {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  const attribution = attributionKeys
    .map((key) => [key, params.get(key)] as const)
    .filter((entry): entry is readonly [string, string] => Boolean(entry[1]))
    .map(([key, value]) => `${key}=${value}`)
    .join(' | ');
  return attribution || document.referrer || 'direct';
}

/**
 * كيصيفط الطلب لـ Google Sheet.
 *
 * Content-Type نص عادي بلا قصد: JSON كيطلق preflight ديال CORS و Apps Script
 * ما كيجاوبش على OPTIONS، فالطلب كيطيح. Apps Script كيقرا الـ body بحال بحال.
 */
export async function submitOrder(order: OrderPayload): Promise<OrderResult> {
  if (!endpoint) {
    return { ok: false, error: 'not_configured' };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(order),
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) return { ok: false, error: `http_${response.status}` };

    const data = (await response.json()) as { ok?: boolean; code?: string; error?: string };
    if (!data.ok) return { ok: false, error: data.error || 'rejected' };
    if (!data.code || !/^[A-Z]{3}-\d{6}-\d{3,}$/.test(data.code)) {
      return { ok: false, error: 'missing_order_code' };
    }

    return { ok: true, code: data.code };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { ok: false, error: 'timeout' };
    }
    return { ok: false, error: error instanceof Error ? error.message : 'network_error' };
  } finally {
    window.clearTimeout(timeout);
  }
}
