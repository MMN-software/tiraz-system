/**
 * لایه دسترسی به داده (Repository Pattern)
 * ----------------------------------------
 * این فایل تمام خواندن داده را از UI جدا می‌کند.
 * در آینده برای اتصال به دیتابیس واقعی، فقط کافی است
 * توابع این فایل بازنویسی شوند — بقیه کد تغییر نمی‌کند.
 *
 * مثال اتصال به Prisma:
 *   import { prisma } from "@/lib/prisma";
 *   export async function getProducts() {
 *     return prisma.product.findMany();
 *   }
 */

import { products as sampleProducts } from "@/lib/data/products";
import { articles as sampleArticles } from "@/lib/data/articles";
import {
  categories as sampleCategories,
  isCategorySlug,
} from "@/lib/data/categories";
import type {
  Product,
  Article,
  Category,
  CategorySlug,
  ArticleCategory,
} from "@/lib/types";

// ===== محصولات =====
export async function getProducts(options?: {
  category?: CategorySlug;
  q?: string;
  brand?: string;
  limit?: number;
}): Promise<Product[]> {
  let list = sampleProducts.slice();

  if (options?.category) {
    list = list.filter((p) => p.category === options.category);
  }

  if (options?.q) {
    const q = options.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  if (options?.brand) {
    list = list.filter((p) => p.brand === options.brand);
  }

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sampleProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return sampleProducts.filter((p) => p.featured).slice(0, limit);
}

export async function getProductCount(): Promise<number> {
  return sampleProducts.length;
}

// ===== دسته‌بندی‌ها =====
export async function getCategories(): Promise<Category[]> {
  return sampleCategories;
}

export async function getCategoryBySlug(
  slug: string | undefined
): Promise<Category | null> {
  if (!slug || !isCategorySlug(slug)) return null;
  return sampleCategories.find((c) => c.slug === slug) ?? null;
}

export { isCategorySlug };
export type { CategorySlug, ArticleCategory };

// ===== مقالات =====
export async function getArticles(options?: {
  category?: ArticleCategory;
  limit?: number;
}): Promise<Article[]> {
  let list = sampleArticles.slice();

  if (options?.category) {
    list = list.filter((a) => a.category === options.category);
  }

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return sampleArticles.find((a) => a.slug === slug) ?? null;
}

export async function getArticleCount(): Promise<number> {
  return sampleArticles.length;
}

// ===== آمار برای داشبورد =====
export interface DashboardStats {
  productCount: number;
  articleCount: number;
  categoryCount: number;
  brandCount: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const brands = new Set(sampleProducts.map((p) => p.brand));
  return {
    productCount: sampleProducts.length,
    articleCount: sampleArticles.length,
    categoryCount: sampleCategories.length,
    brandCount: brands.size,
  };
}

// ===== برندها =====
export async function getBrands(): Promise<string[]> {
  const set = new Set(sampleProducts.map((p) => p.brand));
  return Array.from(set).sort();
}
