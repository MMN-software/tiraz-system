// src/lib/api/inquiry-repository.ts
// لایه دسترسی به درخواست‌ها — از API Routes + Neon DB استفاده می‌کند

import type {
  Inquiry,
  InquiryStatus,
  CreateInquiryInput,
  InquiryWithUser,
  UserInquiryStats,
  AdminInquiryStats,
} from "@/lib/types/inquiry";

const TOKEN_KEY = "tiraz_auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * ثبت درخواست جدید (مهمان یا کاربر لاگین‌شده)
 */
export async function createInquiry(
  userId: string,
  input: CreateInquiryInput
): Promise<Inquiry> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // اگه کاربر لاگین بود، توکن بفرست
  if (userId !== "guest" && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "خطا در ثبت درخواست");
  return data.inquiry as Inquiry;
}

/**
 * دریافت درخواست‌های کاربر لاگین‌شده
 */
export async function getInquiriesByUser(
  _userId: string
): Promise<Inquiry[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch("/api/inquiries/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.ok) return [];
    return data.inquiries as Inquiry[];
  } catch {
    return [];
  }
}

/**
 * آمار درخواست‌های یک کاربر
 */
export async function getUserInquiryStats(
  userId: string
): Promise<UserInquiryStats> {
  const items = await getInquiriesByUser(userId);
  return {
    total: items.length,
    pending: items.filter(
      (i) => i.status === "pending" || i.status === "in_review"
    ).length,
    answered: items.filter(
      (i) => i.status === "answered" || i.status === "closed"
    ).length,
  };
}

/**
 * دریافت همه درخواست‌ها همراه با اطلاعات کاربر (ادمین)
 */
export async function getInquiriesWithUserInfo(): Promise<
  InquiryWithUser[]
> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch("/api/admin/inquiries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.ok) return [];
    return data.inquiries as InquiryWithUser[];
  } catch {
    return [];
  }
}

/**
 * آمار کلی درخواست‌ها (ادمین)
 */
export async function getAdminInquiryStats(): Promise<AdminInquiryStats> {
  const items = await getInquiriesWithUserInfo();
  return {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    inReview: items.filter((i) => i.status === "in_review").length,
    answered: items.filter((i) => i.status === "answered").length,
    closed: items.filter((i) => i.status === "closed").length,
    guests: items.filter((i) => i.isGuest).length,
  };
}

/**
 * به‌روزرسانی وضعیت و پاسخ درخواست (ادمین)
 */
export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminReply?: string
): Promise<{ ok: boolean; inquiry?: Inquiry; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, adminReply }),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}

/**
 * حذف درخواست (ادمین)
 */
export async function deleteInquiry(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}

// ===== توابع قدیمی (نگه‌داشته شده برای سازگاری) =====

/**
 * @deprecated از getInquiriesWithUserInfo استفاده کن
 */
export async function getAllInquiries(): Promise<Inquiry[]> {
  const items = await getInquiriesWithUserInfo();
  return items;
}

/**
 * @deprecated
 */
export async function getInquiryById(
  id: string
): Promise<Inquiry | null> {
  const items = await getInquiriesWithUserInfo();
  return items.find((i) => i.id === id) ?? null;
}
