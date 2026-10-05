import type { Product } from "@/lib/types";

export const products: Product[] = [
  // ==================== پزشکی ====================
  {
    id: 1,
    slug: "ventilator-tz-vn-200",
    name: "دستگاه ونتیلاتور پیشرفته",
    category: "medical",
    code: "TZ-VN-200",
    brand: "MEDIQ",
    shortDesc:
      "ونتیلاتور ICU با حالت‌های تهویه پیشرفته و نمایشگر لمسی ۱۵ اینچ.",
    description:
      "دستگاه ونتیلاتور TZ-VN-200 برای استفاده در بخش‌های مراقبت‌های ویژه طراحی شده و از همه حالت‌های تهویه تهاجمی و غیرتهاجمی پشتیبانی می‌کند.",
    features: [
      "نمایشگر لمسی ۱۵ اینچ",
      "پشتیبانی از ۱۲ حالت تهویه",
      "باتری پشتیبان ۴ ساعته",
      "سیستم هشدار هوشمند",
    ],
    specs: [
      { label: "ولتاژ", value: "۲۲۰ ولت / ۵۰ هرتز" },
      { label: "وزن", value: "۲۸ کیلوگرم" },
      { label: "نمایشگر", value: "LCD لمسی ۱۵ اینچ" },
    ],
    applications: ["ICU", "CCU", "اتاق عمل"],
    image: "/products/medical.jpg",
    badge: "new",
    featured: true,
  },
  {
    id: 2,
    slug: "microscope-tz-mc-110",
    name: "میکروسکوپ بیولوژیک دوچشمی",
    category: "medical",
    code: "TZ-MC-110",
    brand: "LabTech",
    shortDesc:
      "میکروسکوپ بیولوژیک با بزرگنمایی ۴۰ تا ۱۰۰۰ برابر و عدسی‌های پلان.",
    description:
      "میکروسکوپ بیولوژیک TZ-MC-110 با طراحی ارگونومیک و اپتیک باکیفیت، انتخاب مناسب آزمایشگاه‌های تشخیصی و آموزشی است.",
    features: [
      "بزرگنمایی ۴۰X تا ۱۰۰۰X",
      "عدسی‌های پلان با پوشش ضد انعکاس",
      "نور LED قابل تنظیم",
      "صفحه مکانیکی دو محوره",
    ],
    specs: [
      { label: "بزرگنمایی", value: "۴۰X - ۱۰۰۰X" },
      { label: "نوع نور", value: "LED" },
      { label: "سر", value: "دوچشمی ۳۰ درجه" },
    ],
    applications: ["آزمایشگاه تشخیصی", "آموزش", "پاتولوژی"],
    image: "/products/lab.jpg",
    badge: "bestseller",
    featured: true,
  },
  {
    id: 3,
    slug: "monitor-tz-mn-350",
    name: "دستگاه مانیتور علائم حیاتی",
    category: "medical",
    code: "TZ-MN-350",
    brand: "MediCare",
    shortDesc:
      "مانیتور چندپارامتری با نمایش ECG، SpO2، NIBP، دما و تنفس.",
    description:
      "مانیتور علائم حیاتی TZ-MN-350 با نمایشگر ۱۵ اینچ و قابلیت نمایش همزمان ۸ پارامتر حیاتی، انتخاب ایده‌آل برای ICU و CCU.",
    features: [
      "نمایشگر ۱۵ اینچ لمسی",
      "نمایش ۸ پارامتر همزمان",
      "آرشیو ۷۲ ساعته",
      "آلارم چندسطحی",
    ],
    specs: [
      { label: "نمایشگر", value: "۱۵ اینچ لمسی" },
      { label: "پارامترها", value: "ECG, SpO2, NIBP, Temp, Resp" },
      { label: "باتری", value: "۲ ساعت" },
    ],
    applications: ["ICU", "CCU", "اورژانس"],
    image: "/products/medical.jpg",
    badge: null,
    featured: true,
  },

  // ==================== آرایشی و بهداشتی ====================
  {
    id: 4,
    slug: "serum-vitamin-c",
    name: "سرم ویتامین C روشن‌کننده",
    category: "beauty",
    code: "TZ-SC-100",
    brand: "DermaGlow",
    shortDesc:
      "سرم ۲۰٪ ویتامین C خالص برای روشن‌سازی و ضد لک.",
    description:
      "سرم ویتامین C با فرمولاسیون پیشرفته، به کاهش لک‌های تیره، یکنواخت‌سازی رنگ پوست و افزایش درخشندگی کمک می‌کند.",
    features: [
      "۲۰٪ ویتامین C خالص",
      "حاوی هیالورونیک اسید",
      "بدون الکل و پارابن",
      "مناسب همه انواع پوست",
    ],
    specs: [
      { label: "حجم", value: "۳۰ میلی‌لیتر" },
      { label: "نوع پوست", value: "همه انواع" },
      { label: "نگهداری", value: "دور از نور مستقیم" },
    ],
    applications: ["روشن‌سازی", "ضد لک", "ضد چین و چروک"],
    image: "/products/consumables.jpg",
    badge: "new",
    featured: true,
  },
  {
    id: 5,
    slug: "cream-hyaluronic",
    name: "کرم آبرسان هیالورونیک اسید",
    category: "beauty",
    code: "TZ-HC-200",
    brand: "AquaPure",
    shortDesc:
      "کرم آبرسان قوی با ۳ نوع هیالورونیک اسید و ماندگاری ۲۴ ساعته.",
    description:
      "کرم آبرسان هیالورونیک اسید با فرمول مولکولی سه‌گانه، رطوبت را در لایه‌های مختلف پوست حفظ کرده و از خشکی و کشیدگی جلوگیری می‌کند.",
    features: [
      "۳ نوع هیالورونیک اسید",
      "آبرسانی ۲۴ ساعته",
      "حاوی سرامید و نیاسینامید",
      "بدون عطر و رنگ مصنوعی",
    ],
    specs: [
      { label: "حجم", value: "۵۰ میلی‌لیتر" },
      { label: "نوع پوست", value: "خشک و معمولی" },
      { label: "ماندگاری", value: "۲۴ ساعت" },
    ],
    applications: ["آبرسانی", "ضد خشکی", "ضد پیری"],
    image: "/products/consumables.jpg",
    badge: "bestseller",
    featured: true,
  },
  {
    id: 6,
    slug: "sunscreen-spf50",
    name: "کرم ضد آفتاب SPF50",
    category: "beauty",
    code: "TZ-SS-050",
    brand: "SunShield",
    shortDesc:
      "ضد آفتاب SPF50+ با محافظت در برابر UVA و UVB.",
    description:
      "کرم ضد آفتاب SPF50+ با فرمول سبک و جذب سریع، از پوست در برابر اشعه‌های UVA و UVB محافظت می‌کند و مناسب استفاده روزانه است.",
    features: [
      "SPF50+ و PA++++",
      "محافظت UVA و UVB",
      "فرمول سبک و بدون چربی",
      "مناسب زیر آرایش",
    ],
    specs: [
      { label: "حجم", value: "۵۰ میلی‌لیتر" },
      { label: "SPF", value: "۵۰+" },
      { label: "نوع پوست", value: "همه انواع" },
    ],
    applications: ["ضد آفتاب", "ضد پیری", "محافظت روزانه"],
    image: "/products/consumables.jpg",
    badge: "discount",
    featured: true,
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
