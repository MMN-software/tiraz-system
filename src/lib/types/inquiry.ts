// src/lib/types/inquiry.ts
// تایپ‌های سیستم درخواست‌ها (استعلام قیمت، مشاوره، پشتیبانی)

/**
 * وضعیت درخواست
 */
export type InquiryStatus =
  | "pending"     // در انتظار بررسی
  | "in_review"   // در حال بررسی
  | "answered"    // پاسخ داده شده
  | "closed";     // بسته شده

/**
 * نوع درخواست
 */
export type InquiryType =
  | "quote"         // درخواست قیمت
  | "consultation"  // مشاوره فنی
  | "support"       // پشتیبانی
  | "other";        // سایر

/**
 * درخواست ثبت‌شده توسط کاربر
 */
export interface Inquiry {
  id: string;
  userId: string;
  type: InquiryType;
  subject: string;
  message: string;
  /** اگر درخواست مربوط به محصول خاصی باشد */
  productId?: number;
  productName?: string;
  status: InquiryStatus;
  /** پاسخ کارشناس (اگر پاسخ داده شده باشد) */
  adminReply?: string;
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
}
