/**
 * ⚠️ بدّل الرقم بالرقم ديال واتساب ديالك قبل ما تلانصي الإعلانات
 *
 * REPLACE THIS with your real WhatsApp business number before running ads.
 * Format: country code + number, digits only, no "+" and no spaces.
 * Morocco example: 0612345678 -> 212612345678
 *
 * While the number is left as the placeholder below, the WhatsApp buttons
 * stay hidden so visitors never hit a dead chat.
 */
export const whatsappNumber: string = '212640762830';

/** الرقم لي فوق باقي هو الافتراضي؟ إلا إيوا ما نبيّنوش الزر */
export const whatsappPlaceholder: string = '212600000000';

export const whatsappEnabled = whatsappNumber !== whatsappPlaceholder;

/** الرسالة لي كتعمر بوحدها ملي كيحل واتساب */
export const whatsappMessage = 'سلام 👋 بغيت نسول على جهاز الطوارئ 4 فـ1';

export function whatsappLink(message: string = whatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
