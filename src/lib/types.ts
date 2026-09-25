export type CategorySlug =
  | "medical"
  | "lab"
  | "industrial"
  | "parts"
  | "imported"
  | "consumables";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  count: number;
}

export type ProductBadge = "new" | "bestseller" | "discount" | null;

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: CategorySlug;
  code: string;
  brand: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  applications: string[];
  badge: ProductBadge;
  featured: boolean;
}

// ===== مقالات =====
export type ArticleCategory = "medical" | "lab" | "industrial" | "guide";

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // متن با پاراگراف‌ها جدا شده با \n\n
  category: ArticleCategory;
  author: string;
  date: string;
  readTime: number; // دقیقه
  featured: boolean;
}
