// Centralized Meta Pixel event vocabulary. Components never call window.fbq
// directly — everything goes through the trackX() helpers below, which all
// funnel through send(), the single fbq() call site. Browser-observation
// code (scroll listeners, timers, IntersectionObserver) lives in
// lib/useEngagement.ts, not here.

// Same pixel ID as the base snippet hardcoded in index.html — that snippet
// has to be static HTML (no build step runs before the browser sees it), so
// this constant only mirrors it for setAdvancedMatching()'s re-init call.
// Rotate both together if you ever change the pixel.
export const FB_PIXEL_ID = (import.meta.env.VITE_FB_PIXEL_ID as string | undefined) ?? '1405464681543137';

const CURRENCY = 'MAD';
const CONTENT_ID = 'car-emergency-4in1';

type FbqArgs = [string, string, Record<string, unknown>?, { eventID?: string }?];

declare global {
  interface Window {
    fbq?: ((...args: FbqArgs) => void) & { queue?: unknown[] };
  }
}

// ── Dedup registry ─────────────────────────────────────────────────
// Backs the "once per page-view" events (ViewContent, InitiateCheckout, each
// scroll/time milestone, each section, exit intent). Also neutralises React
// StrictMode's double-invoked effects.

const seen = new Set<string>();

function once(key: string): boolean {
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
}

// ── Send path ──────────────────────────────────────────────────────
// The only place window.fbq is called. No-ops silently when the pixel isn't
// loaded (fbq undefined) so every helper below survives that safely.

type EventKind = 'track' | 'trackCustom';

function send(kind: EventKind, event: string, params: Record<string, unknown>, eventId?: string) {
  if (typeof window === 'undefined' || !window.fbq) return;

  const payload: Record<string, unknown> = { ...params, page: window.location.pathname };
  for (const key of Object.keys(payload)) {
    if (payload[key] === undefined) delete payload[key];
  }

  window.fbq(kind, event, payload, { eventID: eventId ?? crypto.randomUUID() });
}

// ── Advanced matching ──────────────────────────────────────────────
// Manual advanced matching: pass what the customer typed into the order form
// so Meta can match the conversion to a real account. Values go to fbq
// PLAIN — fbevents.js normalizes and SHA-256-hashes them client-side before
// anything leaves the browser.
//
// Late data is supplied by re-calling fbq('init', id, userData) — Meta's
// documented pattern when user data only becomes available after page load
// (here: at form submit).

type AdvancedMatching = {
  fn?: string; // first name, lowercase
  ln?: string; // last name, lowercase
  ph?: string; // phone, digits only, country code first (212XXXXXXXXX)
  ct?: string; // city, lowercase, letters only
  country?: string; // ISO 3166-1 alpha-2, lowercase
  external_id?: string; // our order code
};

let matchData: AdvancedMatching = {};

function normalizePhoneClient(raw: string): string | undefined {
  const digits = raw.replace(/[\s\-().]/g, '');
  const m = /^(?:\+?212|0)([5-7]\d{8})$/.exec(digits);
  return m ? `212${m[1]}` : undefined;
}

export function setAdvancedMatching(data: { fullName?: string; phone?: string; city?: string; orderId?: string }) {
  if (typeof window === 'undefined' || !window.fbq || !FB_PIXEL_ID) return;

  const next: AdvancedMatching = { ...matchData, country: 'ma' };

  if (data.fullName) {
    const parts = data.fullName.trim().toLowerCase().split(/\s+/);
    next.fn = parts[0];
    if (parts.length > 1) next.ln = parts.slice(1).join(' ');
  }
  if (data.phone) next.ph = normalizePhoneClient(data.phone) ?? next.ph;
  if (data.city) {
    const ct = data.city.toLowerCase().replace(/[^\p{L}]/gu, '');
    if (ct) next.ct = ct;
  }
  if (data.orderId) next.external_id = data.orderId;

  matchData = next;
  window.fbq('init', FB_PIXEL_ID, matchData as Record<string, unknown>);
}

// ── Attribution ────────────────────────────────────────────────────
// Ad-click attribution lives in the URL, which only the browser can read.
// submitOrder() rides this along with each order.

function param(name: string): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(name) ?? '';
}

export function attribution(): Record<string, string> {
  return {
    fbclid: param('fbclid'),
    utm_source: param('utm_source'),
    utm_medium: param('utm_medium'),
    utm_campaign: param('utm_campaign'),
    utm_content: param('utm_content'),
    utm_term: param('utm_term'),
  };
}

// ── Standard events — fbq('track', …) ────────────────────────────────

export function trackViewContent(value: number) {
  if (!once('ViewContent')) return;
  send('track', 'ViewContent', {
    content_name: CONTENT_ID,
    content_ids: [CONTENT_ID],
    content_type: 'product',
    value,
    currency: CURRENCY,
  });
}

export function trackAddToCart(params: { quantity: number; value: number }) {
  send('track', 'AddToCart', {
    quantity: params.quantity,
    num_items: params.quantity,
    content_ids: [CONTENT_ID],
    value: params.value,
    currency: CURRENCY,
  });
}

// Fires once per page-view, on the FIRST checkout intent — whichever CTA or
// form-focus triggers it first. Callers always call this; it silently no-ops
// after the first call.
export function trackInitiateCheckout(params: { value: number; numItems?: number }) {
  if (!once('InitiateCheckout')) return;
  send('track', 'InitiateCheckout', {
    value: params.value,
    num_items: params.numItems,
    currency: CURRENCY,
    content_ids: [CONTENT_ID],
  });
}

export function trackPurchase(params: { value: number; numItems: number; orderId: string; contentName: string }) {
  send(
    'track',
    'Purchase',
    {
      value: params.value,
      num_items: params.numItems,
      currency: CURRENCY,
      content_ids: [CONTENT_ID],
      content_name: params.contentName,
      order_id: params.orderId,
    },
    params.orderId,
  );
}

export function trackContact(method: 'whatsapp') {
  send('track', 'Contact', { method });
}

// ── Custom events — fbq('trackCustom', …) ──────────────────────────

export function trackCheckoutClick(params: {
  buttonLocation: 'hero' | 'real_photos' | 'sticky_bar' | 'offer_picker';
  buttonName: string;
  price: number;
}) {
  send('trackCustom', 'CheckoutClick', {
    button_location: params.buttonLocation,
    button_name: params.buttonName,
    product_id: CONTENT_ID,
    price: params.price,
    currency: CURRENCY,
  });
}

export function trackFaqOpen(faqTitle: string, faqIndex: number) {
  send('trackCustom', 'FAQOpened', { faq_title: faqTitle, faq_index: faqIndex });
}

export function trackSectionViewed(section: string) {
  if (!once(`SectionViewed:${section}`)) return;
  send('trackCustom', 'SectionViewed', { section });
}

export function trackScrollDepth(percentage: 25 | 50 | 75 | 100) {
  if (!once(`ScrollDepth:${percentage}`)) return;
  send('trackCustom', 'ScrollDepth', { scroll_percentage: percentage });
}

export function trackTimeOnPage(seconds: 30 | 60 | 120) {
  if (!once(`TimeOnPage:${seconds}`)) return;
  send('trackCustom', 'TimeOnPage', { seconds });
}

export function trackExitIntent(params: { scrollPercentage: number; secondsOnPage: number; reachedOrderForm: boolean }) {
  if (!once('ExitIntent')) return;
  send('trackCustom', 'ExitIntent', {
    scroll_percentage: params.scrollPercentage,
    seconds_on_page: params.secondsOnPage,
    reached_order_form: params.reachedOrderForm,
  });
}

export function trackFormStarted(field: string) {
  if (!once('FormStarted:order_form')) return;
  send('trackCustom', 'FormStarted', { form_name: 'order_form', field });
}

export function trackFormSubmitted(params: { quantity: number; value: number }) {
  send('trackCustom', 'FormSubmitted', { form_name: 'order_form', quantity: params.quantity, value: params.value });
}

export function trackFormError(errorReason: string) {
  send('trackCustom', 'FormError', { form_name: 'order_form', error_reason: errorReason });
}
