import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "medical",
    name: "تجهیزات پزشکی و بیمارستانی",
    shortName: "پزشکی و بیمارستانی",
    description:
      "تجهیزات تخصصی بیمارستانی، آزمایشگاهی، درمانگاهی و مراقبت‌های ویژه برای مراکز درمانی و کلینیک‌ها.",
    count: 450,
  },
  {
    slug: "beauty",
    name: "دارو، آرایشی، بهداشتی و مواد اولیه دارویی",
    shortName: "دارو و آرایشی",
    description:
      "داروها، محصولات آرایشی-بهداشتی و مواد اولیه دارویی از برندهای معتبر با ضمانت اصالت و کیفیت.",
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