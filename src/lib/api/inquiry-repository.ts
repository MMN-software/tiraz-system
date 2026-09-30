// src/lib/api/inquiry-repository.ts
// لایه دسترسی به داده برای درخواست‌ها
// فعلاً از localStorage استفاده می‌کند. برای دیتابیس واقعی، فقط توابع بازنویسی می‌شوند.

import type {
  Inquiry,
  InquiryStatus,
  CreateInquiryInput,
} from "@/lib/types/inquiry";

const INQUIRIES_KEY = "tiraz_inquiries";

// ===== توابع کمکی =====

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readInquiries(): Inquiry[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeInquiries(items: Inquiry[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function generateId(): string {
  return "RQ-" + Date.now().toString(36).toUpperCase().slice(-6);
}

// ===== توابع اصلی =====

/**
 * دریافت همه درخواست‌های یک کاربر
 */
export async function getInquiriesByUser(userId: string): Promise<Inquiry[]> {
  const items = readInquiries();
  return items
    .filter((i) => i.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * دریافت همه درخواست‌ها (برای پنل ادمین)
 */
export async function getAllInquiries(): Promise<Inquiry[]> {
  const items = readInquiries();
  return items.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * دریافت یک درخواست با شناسه
 */
export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const items = readInquiries();
  return items.find((i) => i.id === id) ?? null;
}

/**
 * ایجاد درخواست جدید
 */
export async function createInquiry(
  userId: string,
  input: CreateInquiryInput
): Promise<Inquiry> {
  const items = readInquiries();
  const now = new Date().toISOString();
  const inquiry: Inquiry = {
    id: generateId(),
    userId,
    type: input.type,
    subject: input.subject.trim(),
    message: input.message.trim(),
    productId: input.productId,
    productName: input.productName,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  items.push(inquiry);
  writeInquiries(items);
  return inquiry;
}

/**
 * به‌روزرسانی وضعیت درخواست (برای ادمین)
 */
export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminReply?: string
): Promise<Inquiry | null> {
  const items = readInquiries();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    status,
    adminReply: adminReply ?? items[index].adminReply,
    updatedAt: new Date().toISOString(),
  };
  writeInquiries(items);
  return items[index];
}

/**
 * حذف درخواست
 */
export async function deleteInquiry(id: string): Promise<boolean> {
  const items = readInquiries();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeInquiries(filtered);
  return true;
}

/**
 * آمار درخواست‌های یک کاربر (برای داشبورد)
 */
export interface UserInquiryStats {
  total: number;
  pending: number;
  answered: number;
}

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

// ===== توابع ویژه پنل ادمین =====

/**
 * درخواست به‌همراه اطلاعات کاربر ثبت‌کننده
 * برای کاربران مهمان (userId === "guest")، فیلد user مقدار null دارد.
 */
export interface InquiryWithUser extends Inquiry {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    customerType?: string;
  } | null;
  isGuest: boolean;
}

/**
 * دریافت همه درخواست‌ها همراه با اطلاعات کاربر (برای پنل ادمین)
 */
export async function getInquiriesWithUserInfo(): Promise<InquiryWithUser[]> {
  const items = readInquiries();

  // ایمپورت داینامیک برای جلوگیری از circular dependency
  const { getAllUsers } = await import("@/lib/api/auth-repository");
  const users = await getAllUsers();
  const userMap = new Map(users.map((u) => [u.id, u]));

  return items
    .map((i) => {
      const isGuest = i.userId === "guest";
      const u = isGuest ? null : userMap.get(i.userId);
      return {
        ...i,
        isGuest,
        user: u
          ? {
              id: u.id,
              name: u.name,
              email: u.email,
              phone: u.phone,
              customerType: u.customerType,
            }
          : null,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * آمار کلی درخواست‌ها (برای پنل ادمین)
 */
export interface AdminInquiryStats {
  total: number;
  pending: number;
  inReview: number;
  answered: number;
  closed: number;
  guests: number;
}

export async function getAdminInquiryStats(): Promise<AdminInquiryStats> {
  const items = readInquiries();
  return {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    inReview: items.filter((i) => i.status === "in_review").length,
    answered: items.filter((i) => i.status === "answered").length,
    closed: items.filter((i) => i.status === "closed").length,
    guests: items.filter((i) => i.userId === "guest").length,
  };
}
