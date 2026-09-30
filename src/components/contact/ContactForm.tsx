"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/common/Toast";
import { useAuth } from "@/lib/auth-context";
import { createInquiry } from "@/lib/api/inquiry-repository";
import type { InquiryType } from "@/lib/types/inquiry";

interface FormState {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const subjects = [
  "درخواست مشاوره خرید",
  "پشتیبانی فنی",
  "همکاری تجاری",
  "شکایت یا پیشنهاد",
  "سایر موارد",
];

// نقشه تبدیل موضوع پیام به نوع درخواست
const subjectToType: Record<string, InquiryType> = {
  "درخواست مشاوره خرید": "consultation",
  "پشتیبانی فنی": "support",
  "همکاری تجاری": "other",
  "شکایت یا پیشنهاد": "other",
  "سایر موارد": "other",
};

export function ContactForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [savedAsGuest, setSavedAsGuest] = useState(false);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "نام و نام خانوادگی را وارد کنید (حداقل ۳ حرف).";
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "ایمیل وارد شده معتبر نیست.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "متن پیام حداقل ۱۰ حرف باشد.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      toast("لطفاً خطاهای فرم را بررسی کنید.", "error");
      return;
    }

    setStatus("loading");
    try {
      const isGuest = !user;
      await createInquiry(isGuest ? "guest" : user.id, {
        type: subjectToType[form.subject] ?? "other",
        subject: form.subject,
        message: form.message,
      });

      setSavedAsGuest(isGuest);
      toast("پیام شما با موفقیت ارسال شد.", "success");
      setStatus("success");
      setForm({
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
        subject: subjects[0],
        message: "",
      });
    } catch {
      toast("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.", "error");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-8 sm:p-10 text-center">
        <span className="inline-flex w-16 h-16 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold text-brand-700 mb-2">
          پیام شما با موفقیت ارسال شد
        </h2>
        <p className="text-sm text-ink-500 leading-loose mb-6 max-w-md mx-auto">
          کارشناسان ما در اسرع وقت (معمولاً حداکثر ۲۴ ساعت کاری) با شما تماس
          خواهند گرفت.
        </p>

        {savedAsGuest ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 leading-relaxed mb-6 max-w-md mx-auto">
            <p className="flex items-start gap-2 text-right">
              <LogIn
                className="w-4 h-4 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>
                برای پیگیری درخواست‌های خود از پنل کاربری،
                <Link
                  href="/login"
                  className="underline font-medium mr-1"
                >
                  وارد حساب خود شوید
                </Link>
                یا
                <Link
                  href="/register"
                  className="underline font-medium mx-1"
                >
                  ثبت‌نام کنید
                </Link>
                .
              </span>
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <Link
              href="/profile/requests"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              مشاهده درخواست در پنل کاربری
            </Link>
          </div>
        )}

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          ارسال پیام جدید
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-white rounded-2xl border border-ink-200 p-5 sm:p-7"
    >
      <h2 className="text-lg sm:text-xl font-bold text-brand-700 mb-1">
        فرم تماس
      </h2>
      <p className="text-xs sm:text-sm text-ink-500 mb-6">
        فرم زیر را پر کنید، کارشناسان ما با شما تماس می‌گیرند.
      </p>

      {user && (
        <div className="mb-4 bg-brand-50 border border-brand-100 rounded-lg px-3 py-2 text-xs text-brand-700 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>
            شما با حساب <strong>{user.name}</strong> وارد شده‌اید و درخواست
            در پنل کاربری شما ذخیره می‌شود.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="نام و نام خانوادگی" id="c-name" required error={errors.name}>
          <input
            id="c-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls(errors.name)}
            placeholder="مثال: علی محمدی"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field label="شماره موبایل" id="c-phone" required error={errors.phone}>
          <input
            id="c-phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls(errors.phone)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            autoComplete="tel"
            dir="ltr"
            aria-invalid={!!errors.phone}
          />
        </Field>

        <Field label="ایمیل (اختیاری)" id="c-email" error={errors.email}>
          <input
            id="c-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls(errors.email)}
            placeholder="you@example.com"
            autoComplete="email"
            dir="ltr"
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field label="موضوع پیام" id="c-subject">
          <select
            id="c-subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputCls()}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="متن پیام" id="c-message" required error={errors.message}>
          <textarea
            id="c-message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputCls(errors.message)} resize-y min-h-[130px]`}
            placeholder="موضوع درخواست خود را کامل توضیح دهید..."
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 h-12 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        {status === "loading" ? "در حال ارسال..." : "ارسال پیام"}
      </button>

      <p className="text-[10px] text-ink-400 mt-3 leading-relaxed">
        اطلاعات شما نزد ما محفوظ است و فقط برای پاسخ به درخواست شما استفاده
        می‌شود.
      </p>
    </form>
  );
}

function inputCls(error?: string) {
  return `w-full h-11 px-3 text-sm rounded-lg border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
    error
      ? "border-red-300 focus:border-red-500"
      : "border-ink-200 focus:border-brand-500"
  }`;
}

function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-ink-700 mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {children}
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
  );
}
