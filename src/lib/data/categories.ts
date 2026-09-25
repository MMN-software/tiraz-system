import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "medical",
    name: "تجهیزات پزشکی",
    shortName: "پزشکی",
    description:
      "تجهیزات بیمارستانی، درمانگاهی و مراقبت‌های ویژه برای مراکز درمانی.",
    count: 240,
  },
  {
    slug: "lab",
    name: "تجهیزات آزمایشگاهی",
    shortName: "آزمایشگاهی",
    description:
      "دستگاه‌ها و ابزارهای تخصصی برای آزمایشگاه‌های تشخیصی و تحقیقاتی.",
    count: 180,
  },
  {
    slug: "industrial",
    name: "تجهیزات صنعتی",
    shortName: "صنعتی",
    description:
      "راهکارهای تجهیزاتی و کنترل کیفیت برای صنایع مختلف تولیدی.",
    count: 150,
  },
  {
    slug: "parts",
    name: "قطعات تولیدی",
    shortName: "قطعات",
    description:
      "قطعات یدکی و مصرفی تولیدی با استانداردهای دقیق مهندسی.",
    count: 320,
  },
  {
    slug: "imported",
    name: "محصولات وارداتی",
    shortName: "وارداتی",
    description:
      "محصولات برندهای معتبر بین‌المللی با ضمانت اصالت و گارانتی.",
    count: 95,
  },
  {
    slug: "consumables",
    name: "لوازم مصرفی",
    shortName: "مصرفی",
    description:
      "لوازم مصرفی روزانه آزمایشگاهی، پزشکی و بیمارستانی.",
    count: 210,
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
