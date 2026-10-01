// src/lib/api/articles-repository.ts
// لایه دسترسی به مقالات

const TOKEN_KEY = "tiraz_auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export type ArticleCategory = "medical" | "lab" | "industrial" | "guide";

export interface ArticleItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  author: string;
  date: string;
  readTime: number;
  image: string | null;
  featured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  author: string;
  date: string;
  readTime: number;
  image?: string;
  featured?: boolean;
  isPublished?: boolean;
}

/**
 * دریافت همه مقالات (ادمین)
 */
export async function fetchAllArticles(): Promise<ArticleItem[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch("/api/admin/articles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.ok) return [];
    return data.articles as ArticleItem[];
  } catch {
    return [];
  }
}

/**
 * دریافت مقالات منتشرشده (عمومی)
 */
export async function fetchPublicArticles(): Promise<ArticleItem[]> {
  try {
    const res = await fetch("/api/articles");
    const data = await res.json();
    if (!data.ok) return [];
    return data.articles as ArticleItem[];
  } catch {
    return [];
  }
}

/**
 * ساخت مقاله جدید
 */
export async function createArticle(
  input: ArticleInput
): Promise<{ ok: boolean; article?: ArticleItem; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}

/**
 * ویرایش مقاله
 */
export async function updateArticle(
  id: number,
  updates: Partial<ArticleInput>
): Promise<{ ok: boolean; article?: ArticleItem; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}

/**
 * حذف مقاله
 */
export async function deleteArticle(
  id: number
): Promise<{ ok: boolean; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}
