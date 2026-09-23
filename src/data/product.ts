import type { LucideIcon } from 'lucide-react';
import { Award, BookOpen, Frame, Palette } from 'lucide-react';

export const product = {
  name: 'طقم الفنان الصغير',
  tagline: '208 بياسة د الألوان + شهادة بسمية وليدك + كادر د الخشب + كتيب د التلوين',
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
    title: 'باك واحد كامل',
    desc: 'ماليطا + شهادة + كادر + كتيب',
  },
  {
    qty: 2,
    price: 549,
    originalPrice: 699,
    title: 'عرض الخوت: جوج د ليباك',
    desc: 'جوج شهادات، كل وحدة بسميتها',
    badge: 'وفّر 150 درهم',
  },
];

export type StoryCard = { title: string; image: string; image480: string; alt: string; points: string[] };

export const problem: StoryCard = {
  title: 'المشكل: البلية ديال التيليفون والشاشات',
  image: '/images/problem-kid.webp',
  image480: '/images/problem-kid-480.webp',
  alt: 'طفل عيان وهو شاد التيليفون',
  points: ['التركيز ديالو كيمشي وكيصعاب عليه يستوعب', 'الأعصاب والغوات غير كتحيدي ليه التيليفون', 'الملل وما كيدير والو فالدار'],
};

export const solution: StoryCard = {
  title: 'الحل: طقم الفنان الصغير',
  image: '/images/solution-kid.webp',
  image480: '/images/solution-kid-480.webp',
  alt: 'طفل فرحان كيلوّن بالطقم',
  points: ['كيخدم خيالو وكيبدع بيديه', 'كيجلس مهدن ومركز بالسوايع', 'كيفرح بشهادتو معلقة فالصالون'],
};

export type PackItem = { icon: LucideIcon; title: string; desc: string; image: string; alt: string; badge?: string };

export const packItems: PackItem[] = [
  {
    icon: Palette,
    title: 'ماليطا كبيرة: 208 بياسة',
    desc: 'ألوان د الخشب، فاترونات، صباغة، شمع وسيبورا د الرسم، كلشي مستف فماليطا وحدة.',
    image: '/images/pack-case.webp',
    alt: 'حقيبة الألوان 208 قطعة مع حامل الرسم',
  },
  {
    icon: Award,
    title: 'شهادة تقديرية بسمية وليدك',
    desc: 'كنطبعو سميتو فشهادة "الفنان الصغير" بجودة واعرة. غير كتبها لينا فالاستمارة.',
    image: '/images/pack-certificate.webp',
    alt: 'شهادة الفنان الصغير مطبوعة باسم الطفل',
    badge: 'كادو خاص وفابور',
  },
  {
    icon: Frame,
    title: 'كادر د الخشب للصالون',
    desc: 'خشب صحيح وزوين، تعلّق فيه الشهادة وتبقى ذكرى زوينة فالدار.',
    image: '/images/pack-frame.webp',
    alt: 'كادر خشبي فيه الشهادة',
  },
  {
    icon: BookOpen,
    title: 'كتيب ديال الرسومات واجد للتلوين',
    desc: 'رسومات ساهلة وباينة: حيوانات، طوموبيلات، شمس... غادي تعجب الصغار.',
    image: '/images/pack-booklet.webp',
    alt: 'كتيب التلوين',
  },
];

export const occasions = ['عيد الميلاد', 'كادو ديال العيد', 'كادو د النجاح فالمدرسة', 'كادو للخوت'];

export type ProductReview = {
  name: string;
  city: string;
  text: string;
  stars: number;
  /** شحال هادي، بالدارجة */
  ago: string;
  lang: 'darija' | 'arabizi' | 'arabic' | 'french';
};
/** آراء بالدارجة، بالعربية، بالفرنسية وبالحروف اللاتينية بحال ما كيكتبو الزبناء */
export const reviews: ProductReview[] = [
  { name: "أم آدم", city: "كازا", stars: 5, ago: "قبل يومين", lang: "darija", text: "خديتو لولدي آدم عندو 5 سنين، الصراحة رحمة سيدي ربي. نسى التيليفون و مبرزطنيش، جالس كيلون و أنا كنطيب على خاطري. و فرح بزاف ملي شاف سميتو فالشهادة وعلقناها فالصالون." },
  { name: "Khadija B.", city: "Tanger", stars: 5, ago: "قبل سيمانة", lang: "arabizi", text: "tbarkellah zwin bzaf khdito l bnti rania, jatna f 24h, w lqualité mzyana bzaf. kannsa7 bih ga3 lwalidin li bghaw y7iydo tel l drari." },
  { name: "رشيد", city: "الرباط", stars: 4, ago: "قبل 4 أيام", lang: "darija", text: "الباك زوين و فيه بزاف د الألوان، بنتي حماقت عليه و الكادر ديال الخشب صحيح. غي هو تعطل عليا الليفرور يومين عاد وصلني، مي ماشي مشكل السلعة تستاهل." },
  { name: "Mme Imane", city: "Marrakech", stars: 5, ago: "قبل 10 أيام", lang: "french", text: "Franchement super ! J'ai pris l'offre pour les deux (mes jumeaux), et ça a sauvé mes week-ends. Fini les cris pour avoir la tablette, la maison est beaucoup plus calme. Les certificats sont de bonne qualité." },
  { name: "أم ريان", city: "فاس", stars: 5, ago: "قبل 5 أيام", lang: "darija", text: "هاد الباك عتقني صراحة! ريان كان مقابل غير الشاشات و دابا ولا جالس مهدن كيرسم و يلون. الكتيب ديال الرسومات عجبو بزاف و الشهادة عجباتو كثر. شكرا ليكم." },
  { name: "ياسين", city: "مكناس", stars: 5, ago: "قبل 3 أيام", lang: "arabic", text: "المنتج ممتاز جدا ومطابق للصور. اشتريته لابنتي وهي سعيدة جدا بالشهادة التي تحمل اسمها. شكرا على المصداقية وسرعة التوصيل." },
  { name: "ليلى", city: "أكادير", stars: 4, ago: "قبل سيمانة", lang: "darija", text: "الماليطا واعرة و فيها كاع داكشي لي كيحتاجو الدراري، ولدي فرح بيها. الكارطونة كانت شوية مقيوسة من الجنب منين جابها الليفرور، ولكن داكشي لداخل بقا مزيان. كنتمنى تزيدو فعدد الصفحات ديال كتيب التلوين." },
  { name: "Karim", city: "Salé", stars: 5, ago: "قبل يوماين", lang: "french", text: "Très bon produit, livraison rapide et gratuite. Ma fille adore peindre avec." },
];

export const faq = [
  {
    q: 'كيفاش نخلص؟',
    a: 'كتخلص حتى يوصلك الباك ليديك وتقلبو. ما كاين لا تسبيق لا والو.',
  },
  {
    q: 'شحال كيتعطل التوصيل؟',
    a: 'بين 24 و 48 ساعة على حساب المدينة، والتوصيل فابور لجميع المدن فالمغرب.',
  },
  {
    q: 'لأشمن عمر كيليق هاد الباك؟',
    a: 'كيليق للوليدات من 3 سنين حتى ل 12 عام. الصغار كيبداو بالشمع والألوان د الخشب، والكبار كيزعمو على الفاترونات والصباغة.',
  },
  {
    q: 'كيفاش كديرو للسمية فالشهادة؟',
    a: 'كتكتب سمية وليدك فالاستمارة، ومن بعد كنعيطو ليك باش نأكدو معاك الطلب ونتأكدو من السمية كيف مكتوبة قبل ما نطبعوها.',
  },
  {
    q: 'واش نقدر نطلب جوج لي باك بسميات مبدلين؟',
    a: 'أه، عرض الخوت فيه جوج لي باك وجوج شهادات، كل وحدة بسميتها. كتكتب السميات بجوج فالاستمارة.',
  },
  {
    q: 'وإلا وصلاتني شي حاجة ناقصة ولا مهرسة؟',
    a: 'كتحل الكولي قدام الليفرور. وإلا لقيتي شي حاجة ناقصة ولا مهرسة، كنبدلوه ليك فابور.',
  },
];

export const trustBadges = ['التوصيل فابور لكل المدن', 'الخلاص عند الاستلام', 'تبديل إلا كانت شي مشكلة'];

/**
 * سكرينات حقيقية ديال الواتساب من عند الكليان (بلا نمرة ولا تصويرة ديال الوليد).
 * حط الصور ف public/proof/ (webp، عرض 640) وزيد المسار هنا، مثلا '/proof/wa-1.webp'.
 * القسم كيبان غير إلا كانت شي سكرينة فهاد الليستة.
 */
export const whatsappProofs: string[] = [];
