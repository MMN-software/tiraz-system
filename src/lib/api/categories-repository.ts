// src/lib/api/categories-repository.ts
// لایه دسترسی به داده برای دسته‌بندی‌ها — از APIها می‌خواند

const TOKEN_KEY = "tiraz_auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export interface CategoryItem {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  count: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * دریافت همه دسته‌بندی‌ها (ادمین)
 */
export async function fetchAllCategories(): Promise<CategoryItem[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch("/api/admin/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.ok) return [];
    return data.categories as CategoryItem[];
  } catch {
    return [];
  }
}

/**
 * دریافت دسته‌بندی‌های فعال (عمومی)
 */
export async function fetchPublicCategories(): Promise<CategoryItem[]> {
  try {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (!data.ok) return [];
    return data.categories as CategoryItem[];
  } catch {
    return [];
  }
}

/**
 * ویرایش یک دسته‌بندی
 */
export async function updateCategory(
  slug: string,
  updates: Partial<{
    name: string;
    shortName: string;
    description: string;
    count: number;
    order: number;
    isActive: boolean;
  }>
): Promise<{ ok: boolean; category?: CategoryItem; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/categories/${slug}`, {
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
