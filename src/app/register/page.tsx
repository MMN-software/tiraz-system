"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

interface FormState {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "نام و نام خانوادگی حداقل ۳ حرف باشد.";
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "ایمیل وارد شده معتبر نیست.";
    if (form.password.length < 6)
      e.password = "رمز عبور حداقل ۶ کاراکتر باشد.";
    if (form.password !== form.confirm)
      e.confirm = "تکرار رمز عبور با رمز اصلی یکسان نیست.";
    if (!form.terms)
      e.terms = "برای ثبت‌نام باید قوانین را بپذیرید.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <AuthLayout
        title="ثبت‌نام با موفقیت انجام شد"
        subtitle="به خانواده تیرازیستر ایرانیان خوش آمدید."
      >
        <div className="text-center py-4">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </span>
          <p className="text-sm text-ink-500 leading-loose mb-6">
            در نسخه نهایی، یک ایمیل تأیید برای شما ارسال می‌شود.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
          >
            رفتن به صفحه ورود
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="ساخت حساب کاربری"
      subtitle="برای استفاده از امکانات کامل، ثبت‌نام کنید."
      footer={
        <>
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link
            href="/login"
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            وارد شوید
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {/* نام */}
        <div>
          <label
            htmlFor="reg-name"
            className="block text-xs font-medium text-ink-700 mb-1.5"
          >
            نام و نام خانوادگی <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="reg-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: علی محمدی"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className={inputCls(errors.name, "pr-10")}
            />
          </div>
          {errors.name && <ErrorMsg text={errors.name} />}
        </div>

        {/* موبایل */}
        <div>
          <label
            htmlFor="reg-phone"
            className="block text-xs font-medium text-ink-700 mb-1.5"
          >
            شماره موبایل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="reg-phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              autoComplete="tel"
              dir="ltr"
              aria-invalid={!!errors.phone}
              className={inputCls(errors.phone, "pr-10")}
            />
          </div>
          {errors.phone && <ErrorMsg text={errors.phone} />}
        </div>

        {/* ایمیل */}
        <div>
          <label
            htmlFor="reg-email"
            className="block text-xs font-medium text-ink-700 mb-1.5"
          >
            ایمیل (اختیاری)
          </label>
          <div className="relative">
            <Mail
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              autoComplete="email"
              dir="ltr"
              aria-invalid={!!errors.email}
              className={inputCls(errors.email, "pr-10")}
            />
          </div>
          {errors.email && <ErrorMsg text={errors.email} />}
        </div>

        {/* رمز */}
        <div>
          <label
            htmlFor="reg-pass"
            className="block text-xs font-medium text-ink-700 mb-1.5"
          >
            رمز عبور <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="reg-pass"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="حداقل ۶ کاراکتر"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className={inputCls(errors.password, "pr-10 pl-10")}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? "مخفی کردن رمز" : "نمایش رمز"}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors"
            >
              {showPass ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && <ErrorMsg text={errors.password} />}
        </div>

        {/* تکرار رمز */}
        <div>
          <label
            htmlFor="reg-confirm"
            className="block text-xs font-medium text-ink-700 mb-1.5"
          >
            تکرار رمز عبور <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="reg-confirm"
              type={showPass ? "text" : "password"}
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="تکرار رمز عبور"
              autoComplete="new-password"
              aria-invalid={!!errors.confirm}
              className={inputCls(errors.confirm, "pr-10")}
            />
          </div>
          {errors.confirm && <ErrorMsg text={errors.confirm} />}
        </div>

        {/* قوانین */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
            />
            <span className="text-xs text-ink-600 leading-relaxed">
              <Link
                href="#"
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                قوانین و مقررات
              </Link>{" "}
              و{" "}
              <Link
                href="#"
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                حریم خصوصی
              </Link>{" "}
              را می‌پذیرم.
            </span>
          </label>
          {errors.terms && <ErrorMsg text={errors.terms} />}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 h-12 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          <UserPlus className="w-4 h-4" aria-hidden="true" />
          {status === "loading" ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>

        <p className="text-[10px] text-ink-400 leading-relaxed text-center">
          این یک فرم نمونه است و به سرور متصل نیست.
        </p>
      </form>
    </AuthLayout>
  );
}

function inputCls(error?: string, extra = "") {
  return `w-full h-11 px-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${extra} ${
    error
      ? "border-red-300 focus:border-red-500"
      : "border-ink-200 focus:border-brand-500"
  }`;
}

function ErrorMsg({ text }: { text: string }) {
  return (
    <p
      role="alert"
      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
    >
      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
      {text}
    </p>
  );
}
