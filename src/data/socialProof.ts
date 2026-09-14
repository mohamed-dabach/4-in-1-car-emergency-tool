/**
 * DEMO DATA — بدّلها بالطلبات الحقيقية
 *
 * These names, cities and times are placeholders that feed the recent-order
 * ticker. Replace `recentOrders` with real confirmed orders (or set
 * `enabled` to false) before running paid traffic: presenting invented
 * orders as real ones is a misleading commercial practice.
 */

export const tickerConfig = {
  enabled: false,
  /** ميلي ثانية قبل ما يبان أول إشعار */
  firstDelay: 2500,
  /** كل شحال كيتبدل الإشعار */
  rotateEvery: 9000,
  /** مدة الاختفاء بين جوج إشعارات */
  swapPause: 800,
};

export type RecentOrder = {
  name: string;
  city: string;
  pack: string;
  time: string;
};

export const recentOrders: RecentOrder[] = [];
