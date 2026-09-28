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

export interface FAQItem {
  q: string;
  a: string;
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
  faq?: FAQItem[];
  image?: string;
  badge: ProductBadge;
  featured: boolean;
}

export type ArticleCategory = "medical" | "lab" | "industrial" | "guide";

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  author: string;
  date: string;
  readTime: number;
  featured: boolean;
}
