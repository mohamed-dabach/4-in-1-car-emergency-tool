/**
 * DEMO DATA — بدّلها بالطلبات الحقيقية
 *
 * These names, cities and times are placeholders that feed the recent-order
 * ticker. Replace `recentOrders` with real confirmed orders (or set
 * `enabled` to false) before running paid traffic: presenting invented
 * orders as real ones is a misleading commercial practice.
 */

export const tickerConfig = {
  enabled: true,
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

export const recentOrders: RecentOrder[] = [
  { name: 'فاطمة الزهراء', city: 'الدار البيضاء', pack: 'جهاز 1 (649 درهم)', time: 'منذ 18 دقيقة' },
  { name: 'يوسف', city: 'الرباط', pack: 'جوج أجهزة (1099 درهم)', time: 'منذ 27 دقيقة' },
  { name: 'مريم', city: 'مراكش', pack: 'جهاز 1 (649 درهم)', time: 'منذ 34 دقيقة' },
  { name: 'عبد الرحيم', city: 'طنجة', pack: 'جهاز 1 (649 درهم)', time: 'منذ 41 دقيقة' },
  { name: 'سارة', city: 'أكادير', pack: 'جوج أجهزة (1099 درهم)', time: 'منذ 52 دقيقة' },
  { name: 'حمزة', city: 'فاس', pack: 'جهاز 1 (649 درهم)', time: 'منذ ساعة' },
  { name: 'خديجة', city: 'مكناس', pack: 'جهاز 1 (649 درهم)', time: 'منذ ساعة و10 دقايق' },
  { name: 'إلياس', city: 'وجدة', pack: 'جوج أجهزة (1099 درهم)', time: 'منذ ساعة و28 دقيقة' },
  { name: 'نزهة', city: 'تطوان', pack: 'جهاز 1 (649 درهم)', time: 'منذ ساعتين' },
  { name: 'رضوان', city: 'القنيطرة', pack: 'جهاز 1 (649 درهم)', time: 'منذ ساعتين ونص' },
];
