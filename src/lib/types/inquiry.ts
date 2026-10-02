// src/lib/types/inquiry.ts
// تایپ‌های سیستم درخواست‌ها (استعلام قیمت، مشاوره، پشتیبانی)

/**
 * وضعیت درخواست
 */
export type InquiryStatus =
  | "pending" // در انتظار بررسی
  | "in_review" // در حال بررسی
  | "answered" // پاسخ داده شده
  | "closed"; // بسته شده

/**
 * نوع درخواست
 */
export type InquiryType =
  | "quote" // درخواست قیمت
  | "consultation" // مشاوره فنی
  | "support" // پشتیبانی
  | "other"; // سایر

/**
 * درخواست ثبت‌شده
 */
export interface Inquiry {
  id: string;
  /** "guest" برای کاربران مهمان، یا UUID کاربر لاگین‌شده */
  userId: string;
  type: InquiryType;
  subject: string;
  message: string;
  /** اگر درخواست مربوط به محصول خاصی باشد */
  productId?: number | null;
  productName?: string | null;

  /** اطلاعات مهمان (وقتی userId === "guest") */
  guestName?: string | null;
  guestPhone?: string | null;
  guestEmail?: string | null;

  status: InquiryStatus;
  /** پاسخ کارشناس */
  adminReply?: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * ورودی فرم ثبت درخواست جدید
 */
export interface CreateInquiryInput {
  type: InquiryType;
  subject: string;
  message: string;
  productId?: number;
  productName?: string;
  /** اطلاعات مهمان — اگر کاربر لاگین نکرده باشد اجباری است */
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
}

/**
 * درخواست + اطلاعات کاربر فرستنده (برای پنل ادمین)
 */
export interface InquiryWithUser extends Inquiry {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    customerType?: string | null;
  } | null;
  isGuest: boolean;
}

/**
 * آمار درخواست‌های یک کاربر (برای داشبورد)
 */
export interface UserInquiryStats {
  total: number;
  pending: number;
  answered: number;
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
