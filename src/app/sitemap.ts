import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { articles } from "@/lib/data/articles";
import { categories } from "@/lib/data/categories";

const BASE_URL = "https://tirazsystem.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // صفحات ثابت
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // دسته‌بندی‌ها
  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/products?category=${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // محصولات
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // مقالات
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...articlePages,
  ];
}
