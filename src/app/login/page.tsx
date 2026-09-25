"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ id?: string; pass?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validate() {
    const e: { id?: string; pass?: string } = {};
    const id = identifier.trim();
    const isPhone = /^09\d{9}$/.test(id.replace(/\s/g, ""));
    const isEmail = /^\S+@\S+\.\S+$/.test(id);
    if (!id) e.id = "ایمیل یا شماره موبایل را وارد کنید.";
    else if (!isPhone && !isEmail) e.id = "ایمیل یا شماره موبایل معتبر وارد کنید.";
    if (!password) e.pass = "رمز عبور را وارد کنید.";
    else if (password.length < 6) e.pass = "رمز عبور حداقل ۶ کاراکتر باشد.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <AuthLayout
        title="خوش آمدید"
        subtitle="ورود شما با موفقیت انجام شد."
      >
        <div className="text-center py-4">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </span>
          <p className="text-sm text-ink-500 leading-loose mb-6">
            در نسخه نهایی، به داشبورد کاربری منتقل می‌شوید.
          </p>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
          >
            رفتن به پنل کاربری
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="ورود به حساب کاربری"
      subtitle="برای پیگیری درخواست‌ها وارد شوید."
      footer={
        <>
          حساب کاربری ندارید؟{" "}
          <Link
            href="/register"
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            ثبت‌نام کنید
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {/* ایمیل یا موبایل */}
        <div>
          <label
            htmlFor="login-id"
            className="block text-xs font-medium text-ink-700 mb-1.5"
          >
            ایمیل یا شماره موبایل
          </label>
          <div className="relative">
            <Mail
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="login-id"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com یا ۰۹۱۲۳۴۵۶۷۸۹"
              autoComplete="username"
              dir="ltr"
              aria-invalid={!!errors.id}
              className={`w-full h-11 pr-10 pl-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${
                errors.id
                  ? "border-red-300 focus:border-red-500"
                  : "border-ink-200 focus:border-brand-500"
              }`}
            />
          </div>
          {errors.id && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {errors.id}
            </p>
          )}
        </div>

        {/* رمز عبور */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-pass"
              className="text-xs font-medium text-ink-700"
            >
              رمز عبور
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-accent-500 hover:text-accent-600"
            >
              فراموش کرده‌اید؟
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="login-pass"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              autoComplete="current-password"
              aria-invalid={!!errors.pass}
              className={`w-full h-11 pr-10 pl-10 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${
                errors.pass
                  ? "border-red-300 focus:border-red-500"
                  : "border-ink-200 focus:border-brand-500"
              }`}
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
          {errors.pass && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {errors.pass}
            </p>
          )}
        </div>

        {/* Remember */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
          />
          <span className="text-xs text-ink-600">
            مرا به خاطر بسپار
          </span>
        </label>

        {/* دکمه */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 h-12 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          <LogIn className="w-4 h-4" aria-hidden="true" />
          {status === "loading" ? "در حال ورود..." : "ورود به حساب"}
        </button>

        <p className="text-[10px] text-ink-400 leading-relaxed text-center">
          این یک فرم نمونه است و به سرور متصل نیست.
        </p>
      </form>
    </AuthLayout>
  );
}
