"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Info,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const TOKEN_KEY = "tiraz_auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function AccountSettings() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!currentPassword) e.currentPassword = "رمز فعلی الزامی است.";
    if (!newPassword) e.newPassword = "رمز جدید الزامی است.";
    else if (newPassword.length < 6)
      e.newPassword = "رمز جدید حداقل ۶ کاراکتر باشد.";
    else if (newPassword === currentPassword)
      e.newPassword = "رمز جدید نباید با رمز فعلی یکسان باشد.";
    if (newPassword !== confirmPassword)
      e.confirmPassword = "تکرار رمز جدید یکسان نیست.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setToast(null);

    try {
      const token = getToken();
      if (!token) throw new Error("نیاز به ورود مجدد");

      const res = await fetch("/api/auth/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.error || "خطا در تغییر رمز");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setToast({
        type: "success",
        message: "رمز عبور با موفقیت تغییر کرد.",
      });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا",
      });
    } finally {
      setSaving(false);
    }
  }

  const inputCls = (error?: string) =>
    `w-full h-11 pr-10 pl-10 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${
      error
        ? "border-red-300 focus:border-red-500"
        : "border-ink-200 focus:border-brand-500"
    }`;

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div
          role="alert"
          className={`flex items-center gap-2 p-3 rounded-lg border text-xs ${
            toast.type === "success"
              ? "bg-accent-50 border-accent-200 text-accent-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* هدر */}
      <div className="bg-white rounded-2xl border border-ink-200 p-5">
        <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          تنظیمات حساب
        </h1>
        <p className="text-sm text-ink-500">
          مدیریت امنیت حساب کاربری شما
        </p>
      </div>

      {/* اطلاعات ورود */}
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <div className="p-4 border-b border-ink-100 flex items-center gap-2">
          <span className="inline-flex w-8 h-8 rounded-lg bg-brand-50 text-brand-600 items-center justify-center">
            <Info className="w-4 h-4" aria-hidden="true" />
          </span>
          <h2 className="font-bold text-brand-700 text-sm">
            اطلاعات ورود
          </h2>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-500">ایمیل:</span>
            <span className="text-ink-800" dir="ltr">
              {user?.email || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-500">شماره موبایل:</span>
            <span className="text-ink-800 num" dir="ltr">
              {user?.phone || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* فرم تغییر رمز */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-ink-200 overflow-hidden"
      >
        <div className="p-4 border-b border-ink-100 flex items-center gap-2">
          <span className="inline-flex w-8 h-8 rounded-lg bg-amber-50 text-amber-600 items-center justify-center">
            <KeyRound className="w-4 h-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-bold text-brand-700 text-sm">
              تغییر رمز عبور
            </h2>
            <p className="text-[10px] text-ink-500 mt-0.5">
              برای امنیت بیشتر، رمز خود را به‌طور دوره‌ای تغییر دهید.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* رمز فعلی */}
          <div>
            <label
              htmlFor="current-pass"
              className="block text-xs font-medium text-ink-700 mb-1.5"
            >
              رمز فعلی <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="current-pass"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="رمز عبور فعلی خود را وارد کنید"
                autoComplete="current-password"
                aria-invalid={!!errors.currentPassword}
                className={inputCls(errors.currentPassword)}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                aria-label={showCurrent ? "مخفی کردن" : "نمایش"}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <Err text={errors.currentPassword} />
            )}
          </div>

          {/* رمز جدید */}
          <div>
            <label
              htmlFor="new-pass"
              className="block text-xs font-medium text-ink-700 mb-1.5"
            >
              رمز جدید <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="new-pass"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="حداقل ۶ کاراکتر"
                autoComplete="new-password"
                aria-invalid={!!errors.newPassword}
                className={inputCls(errors.newPassword)}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                aria-label={showNew ? "مخفی کردن" : "نمایش"}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.newPassword && <Err text={errors.newPassword} />}
          </div>

          {/* تکرار رمز جدید */}
          <div>
            <label
              htmlFor="confirm-pass"
              className="block text-xs font-medium text-ink-700 mb-1.5"
            >
              تکرار رمز جدید <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="confirm-pass"
                type={showNew ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تکرار رمز جدید"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                className={inputCls(errors.confirmPassword)}
              />
            </div>
            {errors.confirmPassword && (
              <Err text={errors.confirmPassword} />
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 leading-relaxed flex items-start gap-2">
            <Info
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>
              بعد از تغییر رمز، از سایر دستگاه‌ها خارج می‌شوید و باید با
              رمز جدید وارد شوید.
            </span>
          </div>
        </div>

        <div className="border-t border-ink-100 p-4 bg-ink-50/50 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="w-4 h-4" aria-hidden="true" />
            )}
            {saving ? "در حال ذخیره..." : "تغییر رمز عبور"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Err({ text }: { text: string }) {
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