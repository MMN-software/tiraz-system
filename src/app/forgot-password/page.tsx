"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validate(): boolean {
    const id = identifier.trim();
    const isPhone = /^09\d{9}$/.test(id.replace(/\s/g, ""));
    const isEmail = /^\S+@\S+\.\S+$/.test(id);
    if (!id) {
      setError("ایمیل یا شماره موبایل را وارد کنید.");
      return false;
    }
    if (!isPhone && !isEmail) {
      setError("ایمیل یا شماره موبایل معتبر وارد کنید.");
      return false;
    }
    setError(null);
    return true;
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
        title="لینک بازیابی ارسال شد"
        subtitle="اگر این ایمیل یا شماره در سیستم ما ثبت شده باشد، لینک بازیابی ارسال شده است."
      >
        <div className="text-center py-4">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </span>
          <p className="text-sm text-ink-500 leading-loose mb-6">
            لطفاً صندوق ایمیل یا پیامک‌های خود را بررسی کنید. اگر تا چند دقیقه
            پیامی دریافت نکردید، دوباره تلاش کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
            >
              ارسال مجدد
            </button>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-white hover:bg-ink-50 text-brand-700 font-medium rounded-xl border border-ink-200 transition-colors"
            >
              بازگشت به ورود
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="بازیابی رمز عبور"
      subtitle="ایمیل یا شماره موبایل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود."
      footer={
        <>
          رمز خود را به یاد آوردید؟{" "}
          <Link
            href="/login"
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            ورود به حساب
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="fp-id"
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
              id="fp-id"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com یا ۰۹۱۲۳۴۵۶۷۸۹"
              autoComplete="username"
              dir="ltr"
              aria-invalid={!!error}
              className={`w-full h-11 pr-10 pl-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${
                error
                  ? "border-red-300 focus:border-red-500"
                  : "border-ink-200 focus:border-brand-500"
              }`}
            />
          </div>
          {error && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 h-12 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          {status === "loading" ? "در حال ارسال..." : "ارسال لینک بازیابی"}
        </button>

        <p className="text-[10px] text-ink-400 leading-relaxed text-center">
          این یک فرم نمونه است و به سرور متصل نیست.
        </p>
      </form>
    </AuthLayout>
  );
}
