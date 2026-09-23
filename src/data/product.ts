import type { LucideIcon } from 'lucide-react';
import { Award, BookOpen, Frame, Palette } from 'lucide-react';

export const product = {
  name: 'طقم الفنان الصغير',
  tagline: '208 قطعة ديال الألوان + شهادة باسم وليدك + كادر خشبي + كتيب التلوين',
  price: 299,
  originalPrice: 399,
  currency: 'د.م',
};

export type Offer = {
  qty: number;
  price: number;
  originalPrice?: number;
  title: string;
  desc: string;
  badge?: string;
};

/** طقم واحد ولا عرض الإخوة */
export const offers: Offer[] = [
  {
    qty: 1,
    price: 299,
    originalPrice: 399,
    title: 'طقم واحد كامل',
    desc: 'حقيبة + شهادة + كادر + كتيب',
  },
  {
    qty: 2,
    price: 549,
    originalPrice: 699,
    title: 'عرض الإخوة: جوج طقوم',
    desc: 'جوج شهادات، كل وحدة بسمية',
    badge: 'وفّر 150 د.م',
  },
];

export type StoryCard = { title: string; image: string; image480: string; alt: string; points: string[] };

export const problem: StoryCard = {
  title: 'المشكل: التيليفون والشاشات',
  image: '/images/problem-kid.webp',
  image480: '/images/problem-kid-480.webp',
  alt: 'طفل عيان وهو شاد التيليفون',
  points: ['التركيز كيتشتت وكيصعاب عليه الفهم', 'العصبية والغوات كلما تحيّد ليه التيليفون', 'خمول وملل فالدار'],
};

export const solution: StoryCard = {
  title: 'الحل: طقم الفنان الصغير',
  image: '/images/solution-kid.webp',
  image480: '/images/solution-kid-480.webp',
  alt: 'طفل فرحان كيلوّن بالطقم',
  points: ['كيخدم الخيال والإبداع ديالو بيديه', 'كيجلس هادي ومركّز بالسوايع', 'كيفتخر بالشهادة ديالو معلقة فالصالون'],
};

export type PackItem = { icon: LucideIcon; title: string; desc: string; image: string; alt: string; badge?: string };

export const packItems: PackItem[] = [
  {
    icon: Palette,
    title: 'حقيبة عملاقة: 208 قطعة',
    desc: 'أقلام خشبية، أقلام مائية، صباغة، شمع وحامل الرسم، كلشي مرتب فحقيبة وحدة.',
    image: '/images/pack-case.webp',
    alt: 'حقيبة الألوان 208 قطعة مع حامل الرسم',
  },
  {
    icon: Award,
    title: 'شهادة تقدير باسم وليدك',
    desc: 'كنطبعو سميتو على شهادة "الفنان الصغير" بجودة عالية. كتبها لينا فالاستمارة.',
    image: '/images/pack-certificate.webp',
    alt: 'شهادة الفنان الصغير مطبوعة باسم الطفل',
    badge: 'هدية مخصصة مجانية',
  },
  {
    icon: Frame,
    title: 'كادر خشبي للصالون',
    desc: 'خشب متين وعصري، كتعلق فيه الشهادة وكتبقى ذكرى فالدار.',
    image: '/images/pack-frame.webp',
    alt: 'كادر خشبي فيه الشهادة',
  },
  {
    icon: BookOpen,
    title: 'كتيب رسومات جاهز للتلوين',
    desc: 'رسومات واضحة وساهلة: حيوانات، طوموبيلات، شمس... مناسبة للصغار.',
    image: '/images/pack-booklet.webp',
    alt: 'كتيب التلوين',
  },
];

export const occasions = ['عيد الميلاد', 'هدية العيد', 'مكافأة ديال المدرسة', 'هدية للإخوة'];

export type ProductReview = { name: string; city: string; text: string; stars: number };
export const reviews: ProductReview[] = [
  { name: 'أم أنس', city: 'الدار البيضاء', text: 'شكراً بزاف، الشهادة فرّحات ولدي أنس 👍', stars: 5 },
  { name: 'أم أيمن', city: 'الرباط', text: 'الشهادة والتقديم كيشرفو، العائلة كاملة عجبها.', stars: 5 },
  { name: 'أب مهدي', city: 'فاس', text: 'الكادر علقناه فالدار، منظر زوين بزاف.', stars: 5 },
  { name: 'أم سلمى', city: 'مراكش', text: 'الدراري نساو الشاشات، ولاو كيلونو كل عشية.', stars: 5 },
];

export const faq = [
  {
    q: 'كيفاش نخلّص؟',
    a: 'كتخلص غير ملي يوصلك الطقم ليدك وتشوفو (الدفع عند الاستلام). ما كاين حتى تسبيق.',
  },
  {
    q: 'شحال كياخد التوصيل؟',
    a: 'من 24 حتى 72 ساعة حسب المدينة، والتوصيل مجاني لجميع مدن المغرب.',
  },
  {
    q: 'لأي عمر مناسب؟',
    a: 'مناسب من 3 سنين حتى 12 عام. الصغار كيبداو بالشمع والأقلام، والكبار كيخدمو بالمائي والصباغة.',
  },
  {
    q: 'كيفاش كتتكتب السمية على الشهادة؟',
    a: 'كتكتب سمية الطفل فالاستمارة، ومن بعد كنتاصلو بيك باش نأكدو الطلب ونتأكدو من الكتابة قبل الطباعة.',
  },
  {
    q: 'واش نقدر نطلب جوج بسميات مختلفة؟',
    a: 'إيه، عرض الإخوة فيه جوج طقوم وجوج شهادات، كل شهادة بسمية ديالها. كتكتب السميتين فالاستمارة.',
  },
  {
    q: 'وإلا وصلني شي حاجة ناقصة ولا مخسرة؟',
    a: 'كتحل الكولي قدام الليفرور. إلا كانت شي حاجة ناقصة ولا مخسرة، كنبدلوها ليك بلا مصاريف.',
  },
];

export const trustBadges = ['التوصيل مجاني لكل المدن', 'الدفع عند الاستلام', 'تبديل إلا كانت شي مشكلة'];
