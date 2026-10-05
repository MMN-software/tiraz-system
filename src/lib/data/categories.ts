import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "medical",
    name: "تجهیزات پزشکی",
    shortName: "پزشکی",
    description:
      "تجهیزات بیمارستانی، آزمایشگاهی و درمانگاهی برای مراکز درمانی و کلینیک‌ها.",
    count: 450,
  },
  {
    slug: "beauty",
    name: "محصولات آرایشی و بهداشتی",
    shortName: "آرایشی",
    description:
      "محصولات مراقبت پوست، زیبایی و بهداشتی با ضمانت اصالت و کیفیت.",
    count: 320,
  },
];

export function getCategoryBySlug(
  slug: string | undefined
): Category | undefined {
  if (!slug) return undefined;
  return categories.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((c) => c.slug === slug);
}
