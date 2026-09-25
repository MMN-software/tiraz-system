"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  productName: string;
  productCode: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function ProductInquiryForm({ productName, productCode }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "نام و نام خانوادگی را وارد کنید (حداقل ۳ حرف).";
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "ایمیل وارد شده معتبر نیست.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "توضیحات درخواست حداقل ۱۰ حرف باشد.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // TODO: در آینده به API واقعی متصل شود
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setForm({ name: "", phone: "", email: "", message: "" });
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-6 text-center">
        <span className="inline-flex w-14 h-14 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center mb-3">
          <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
        </span>
        <h3 className="font-bold text-brand-700 mb-2">درخواست شما ثبت شد</h3>
        <p className="text-sm text-ink-500 leading-loose mb-4">
          کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          ارسال درخواست جدید
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl border border-ink-200 p-5 sm:p-6"
      noValidate
    >
      <h3 className="font-bold text-brand-700 mb-1">
        درخواست اطلاعات و مشاوره
      </h3>
      <p className="text-xs text-ink-500 mb-4">
        برای محصول «{productName}» (کد: {productCode})
      </p>

      <div className="space-y-4">
        <Field
          label="نام و نام خانوادگی"
          id="inquiry-name"
          required
          error={errors.name}
        >
          <input
            id="inquiry-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls(errors.name)}
            placeholder="مثال: علی محمدی"
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
        </Field>

        <Field
          label="شماره موبایل"
          id="inquiry-phone"
          required
          error={errors.phone}
        >
          <input
            id="inquiry-phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls(errors.phone)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            aria-invalid={!!errors.phone}
            autoComplete="tel"
            dir="ltr"
          />
        </Field>

        <Field label="ایمیل (اختیاری)" id="inquiry-email" error={errors.email}>
          <input
            id="inquiry-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls(errors.email)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            autoComplete="email"
            dir="ltr"
          />
        </Field>

        <Field
          label="توضیحات درخواست"
          id="inquiry-message"
          required
          error={errors.message}
        >
          <textarea
            id="inquiry-message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputCls(errors.message)} resize-y min-h-[110px]`}
            placeholder="تعداد، مدل یا مشخصات مورد نظر را وارد کنید..."
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      {status === "error" && (
        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>ارسال با خطا مواجه شد. دوباره تلاش کنید.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 h-11 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        {status === "loading" ? "در حال ارسال..." : "ارسال درخواست"}
      </button>

      <p className="text-[10px] text-ink-400 mt-3 leading-relaxed">
        با ارسال این فرم، کارشناسان ما اطلاعات محصول را برای شما ارسال
        می‌کنند. اطلاعات شما نزد ما محفوظ است.
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
