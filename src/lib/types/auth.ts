// src/lib/types/auth.ts
// تایپ‌های سیستم احراز هویت — تیرازیستر ایرانیان

/**
 * نقش کاربر در سیستم
 * - customer: مشتری
 * - admin: مدیر سیستم
 */
export type UserRole = "customer" | "admin";

/**
 * نوع حساب مشتری
 * - individual: شخص حقیقی
 * - company: شرکت
 * - hospital: بیمارستان
 * - clinic: کلینیک
 * - lab: آزمایشگاه
 */
export type CustomerType =
  | "individual"
  | "company"
  | "hospital"
  | "clinic"
  | "lab";

/**
 * وضعیت حساب کاربر
 */
export type UserStatus = "active" | "pending" | "blocked";

/**
 * اطلاعات کاربر (بدون پسورد)
 */
export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  customerType?: CustomerType;
  organizationName?: string;
  nationalId?: string;
  companyRegNumber?: string;
    createdAt: string;
  lastSeenAt?: string;
}

/**
 * ورودی فرم ثبت‌نام
 */
export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  customerType: CustomerType;
  organizationName?: string;
  nationalId?: string;
  companyRegNumber?: string;
}

/**
 * ورودی فرم ورود
 * identifier می‌تونه ایمیل یا شماره موبایل باشه.
 */
export interface LoginInput {
  identifier: string;
  password: string;
}

/**
 * سشن ذخیره‌شده در localStorage
 */
export interface AuthSession {
  userId: string;
  token: string;
  loggedInAt: number;
  expiresAt: number;
}
