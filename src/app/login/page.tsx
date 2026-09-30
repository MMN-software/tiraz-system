"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useAuth } from "@/lib/auth-context";

interface FieldErrors {
  id?: string;
  pass?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  function validate(): boolean {
    const e: FieldErrors = {};
    const id = identifier.trim();
    const isPhone = /^09\d{9}$/.test(id.replace(/\s/g, ""));
    const isEmail = /^\S+@\S+\.\S+$/.test(id);

    if (!id) e.id = "لطفاً ایمیل یا شماره موبایل خود را وارد کنید.";
    else if (!isPhone && !isEmail)
      e.id = "ایمیل یا شماره موبایل وارد شده معتبر نیست.";

    if (!password) e.pass = "لطفاً رمز عبور خود را وارد کنید.";
    else if (password.length < 6)
      e.pass = "رمز عبور حداقل ۶ کاراکتر است.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("loading");
    const res = await login({
      identifier: identifier.trim(),
      password,
    });

    if (!res.ok) {
      setServerError(res.error);
      setStatus("idle");
      return;
    }

    // همیشه به /profile می‌رویم؛
    // اگر کاربر ادمین باشد، ProfileLayout خودش به /admin منتقل می‌کند.
    router.push("/profile");
  }

  return (
    <AuthLayout
      title="ورود به حساب کاربری"
      subtitle="برای دسترسی به پنل کاربری وارد شوید."
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
        {/* شناسه (ایمیل یا موبایل) */}
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
              فراموشی رمز
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

        {/* خطای سرور */}
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700"
          >
            <AlertCircle
              className="w-4 h-4 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{serverError}</span>
          </div>
        )}

        {/* دکمه ورود */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 h-12 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          <LogIn className="w-4 h-4" aria-hidden="true" />
          {status === "loading" ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </AuthLayout>
  );
}
