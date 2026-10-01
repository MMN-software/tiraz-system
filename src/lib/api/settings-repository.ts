// src/lib/api/settings-repository.ts
// لایه دسترسی به تنظیمات

const TOKEN_KEY = "tiraz_auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export interface SettingItem {
  key: string;
  value: string;
  label: string | null;
  group: string;
  updatedAt: string;
}

/**
 * دریافت همه تنظیمات با جزئیات (ادمین)
 */
export async function fetchAllSettings(): Promise<SettingItem[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch("/api/admin/settings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.ok) return [];
    return data.settings as SettingItem[];
  } catch {
    return [];
  }
}

/**
 * دریافت تنظیمات به‌صورت key-value (عمومی)
 */
export async function fetchPublicSettings(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/settings");
    const data = await res.json();
    if (!data.ok) return {};
    return data.settings as Record<string, string>;
  } catch {
    return {};
  }
}

/**
 * به‌روزرسانی چند تنظیم یک‌جا
 */
export async function updateSettings(
  updates: Array<{ key: string; value: string }>
): Promise<{ ok: boolean; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updates }),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}
