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

/** Firestore هو الأساس: الطلب كيتسجل تما، و Apps Script ديال الشيت كيجبدو كل دقيقة */
const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
const firebaseKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;

/** URL ديال Google Apps Script — احتياط إلا Firestore ما جاوبش */
const endpoint = import.meta.env.VITE_ORDERS_WEBHOOK as string | undefined;

export const ordersWebhookConfigured = Boolean((firebaseProject && firebaseKey) || endpoint);

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

/** KID- للطقم ديال الدراري، CET- للجهاز ديال الطوموبيل — نفس القاعدة لي فـ Apps Script */
function codePrefix(product: string) {
  return product.includes('الفنان') ? 'KID' : 'CET';
}

/**
 * كود الطلب: KID-260927-4821 — تاريخ كازا + 4 أرقام عشوائيين.
 * Firestore كيرفض أي كود مكرر (ALREADY_EXISTS)، فكنعاودو بكود آخر.
 */
function makeOrderCode(product: string) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Casablanca', year: '2-digit', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  const random = crypto.getRandomValues(new Uint32Array(1))[0] % 10000;
  return `${codePrefix(product)}-${get('year')}${get('month')}${get('day')}-${String(random).padStart(4, '0')}`;
}

const clip = (value: string, max: number) => value.trim().slice(0, max);

async function postWithTimeout(url: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeout);
  }
}

function errorMessage(error: unknown) {
  if (error instanceof DOMException && error.name === 'AbortError') return 'timeout';
  return error instanceof Error ? error.message : 'network_error';
}

/**
 * كيكتب الطلب فـ Firestore عبر REST (بلا SDK باش الصفحة تبقى خفيفة).
 * commit مع exists:false = خلق فقط، والـ createdAt كيتحط من السيرفر.
 * الـ rules ف firestore.rules كيتأكدو من الشكل ديال كل خانة.
 */
async function submitToFirestore(order: OrderPayload): Promise<OrderResult> {
  const fields = {
    name: { stringValue: clip(order.name, 120) },
    phone: { stringValue: order.phone.replace(/[\s\-().]/g, '') },
    city: { stringValue: clip(order.city, 80) },
    address: { stringValue: clip(order.address, 300) },
    childName: { stringValue: clip(order.childName, 120) },
    product: { stringValue: clip(order.product, 120) },
    offer: { stringValue: clip(order.offer, 300) },
    quantity: { integerValue: String(Math.round(order.quantity)) },
    total: Number.isInteger(order.total) ? { integerValue: String(order.total) } : { doubleValue: order.total },
    source: { stringValue: clip(order.source, 500) },
    synced: { booleanValue: false },
  };
  const url = `https://firestore.googleapis.com/v1/projects/${firebaseProject}/databases/(default)/documents:commit?key=${firebaseKey}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    const code = makeOrderCode(order.product);
    const response = await postWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        writes: [
          {
            update: { name: `projects/${firebaseProject}/databases/(default)/documents/orders/${code}`, fields: { code: { stringValue: code }, ...fields } },
            currentDocument: { exists: false },
            updateTransforms: [{ fieldPath: 'createdAt', setToServerValue: 'REQUEST_TIME' }],
          },
        ],
      }),
    });
    if (response.ok) return { ok: true, code };
    if (response.status !== 409) return { ok: false, error: `firestore_${response.status}` };
  }
  return { ok: false, error: 'firestore_code_collision' };
}

/**
 * الطريقة القديمة: كيصيفط الطلب نيشان لـ Google Sheet.
 *
 * Content-Type نص عادي بلا قصد: JSON كيطلق preflight ديال CORS و Apps Script
 * ما كيجاوبش على OPTIONS، فالطلب كيطيح. Apps Script كيقرا الـ body بحال بحال.
 */
async function submitToSheet(order: OrderPayload): Promise<OrderResult> {
  const response = await postWithTimeout(endpoint!, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(order),
    redirect: 'follow',
  });

  if (!response.ok) return { ok: false, error: `http_${response.status}` };

  const data = (await response.json()) as { ok?: boolean; code?: string; error?: string };
  if (!data.ok) return { ok: false, error: data.error || 'rejected' };
  if (!data.code || !/^[A-Z]{3}-\d{6}-\d{3,}$/.test(data.code)) {
    return { ok: false, error: 'missing_order_code' };
  }

  return { ok: true, code: data.code };
}

/** Firestore الأول؛ إلا طاح كنجربو الشيت نيشان باش ما يضيع حتى طلب */
export async function submitOrder(order: OrderPayload): Promise<OrderResult> {
  let firestoreError = '';
  if (firebaseProject && firebaseKey) {
    try {
      const result = await submitToFirestore(order);
      if (result.ok) return result;
      firestoreError = result.error;
    } catch (error) {
      firestoreError = errorMessage(error);
    }
  }

  if (!endpoint) return { ok: false, error: firestoreError || 'not_configured' };

  try {
    return await submitToSheet(order);
  } catch (error) {
    return { ok: false, error: firestoreError ? `${firestoreError}+${errorMessage(error)}` : errorMessage(error) };
  }
}
