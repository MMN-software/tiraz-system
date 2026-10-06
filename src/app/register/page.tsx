"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Building2,
  Hospital,
  Stethoscope,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useAuth } from "@/lib/auth-context";
import type { CustomerType } from "@/lib/types/auth";

// ---------- انتخاب نوع حساب ----------

interface TypeOption {
  value: CustomerType;
  label: string;
  desc: string;
  icon: LucideIcon;
}

const CUSTOMER_TYPES: TypeOption[] = [
  { value: "individual", label: "شخص حقیقی", desc: "خرید شخصی", icon: User },
  { value: "company", label: "شرکت", desc: "خرید سازمانی", icon: Building2 },
  { value: "hospital", label: "بیمارستان", desc: "تجهیزات درمانی", icon: Hospital },
  { value: "clinic", label: "کلینیک", desc: "مطب و درمانگاه", icon: Stethoscope },
  { value: "lab", label: "آزمایشگاه", desc: "تجهیزات آزمایشگاهی", icon: FlaskConical },
];

// ---------- وضعیت فرم ----------

interface FormState {
  customerType: CustomerType;
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  organizationName: string;
  nationalId: string;
  companyRegNumber: string;
  terms: boolean;
}

const initialForm: FormState = {
  customerType: "individual",
  name: "",
  phone: "",
  email: "",
  password: "",
  confirm: "",
  organizationName: "",
  nationalId: "",
  companyRegNumber: "",
  terms: false,
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const isOrg =
    form.customerType === "company" ||
    form.customerType === "hospital" ||
    form.customerType === "clinic" ||
    form.customerType === "lab";

  const needsNationalId =
    form.customerType === "individual" || form.customerType === "company";

  const needsRegNumber = form.customerType === "company";

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const e: FieldErrors = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "نام و نام خانوادگی حداقل ۳ حرف باشد.";
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (!form.email.trim()) e.email = "ایمیل الزامی است.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "ایمیل وارد شده معتبر نیست.";
    if (form.password.length < 6)
      e.password = "رمز عبور حداقل ۶ کاراکتر باشد.";
    if (form.password !== form.confirm)
      e.confirm = "تکرار رمز عبور با رمز اصلی یکسان نیست.";

    if (isOrg && !form.organizationName.trim())
      e.organizationName = "نام سازمان / مرکز الزامی است.";
    if (needsNationalId) {
      if (!form.nationalId.trim())
        e.nationalId = "کد ملی الزامی است.";
      else if (!/^\d{10}$/.test(form.nationalId.replace(/\s/g, "")))
        e.nationalId = "کد ملی باید ۱۰ رقم عددی باشد.";
    }
    if (needsRegNumber && !form.companyRegNumber.trim())
      e.companyRegNumber = "شماره ثبت شرکت الزامی است.";

    if (!form.terms) e.terms = "برای ثبت‌نام باید قوانین را بپذیرید.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("loading");
    const res = await register({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.replace(/\s/g, ""),
      password: form.password,
      customerType: form.customerType,
      organizationName: isOrg ? form.organizationName.trim() : undefined,
      nationalId: needsNationalId
        ? form.nationalId.replace(/\s/g, "")
        : undefined,
      companyRegNumber: needsRegNumber
        ? form.companyRegNumber.trim()
        : undefined,
    });

    if (!res.ok) {
      setServerError(res.error);
      setStatus("idle");
      return;
    }
    setStatus("success");
    setTimeout(() => router.push("/profile"), 1500);
  }

  // ---------- نمایش موفقیت ----------

  if (status === "success") {
    return (
      <AuthLayout
        title="ثبت‌نام با موفقیت انجام شد"
        subtitle="به خانواده تیرازیس طب ایرانیان خوش آمدید."
      >
        <div className="text-center py-4">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </span>
          <p className="text-sm text-ink-500 leading-loose mb-6">
            حساب شما ساخته شد و وارد شده‌اید. اکنون می‌توانید سفارش‌های خود را
            ثبت کنید.
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

  // ---------- فرم اصلی ----------

  return (
    <AuthLayout
      title="ساخت حساب کاربری"
      subtitle="نوع حساب خود را انتخاب و اطلاعات را تکمیل کنید."
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
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {/* انتخاب نوع حساب */}
        <fieldset>
          <legend className="block text-xs font-medium text-ink-700 mb-2">
            نوع حساب <span className="text-red-500">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CUSTOMER_TYPES.map((t) => {
              const Icon = t.icon;
              const active = form.customerType === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setField("customerType", t.value)}
                  aria-pressed={active}
                  className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-right transition-colors ${
                    active
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-ink-200 bg-white hover:border-brand-300 text-ink-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-brand-600" : "text-ink-400"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium">{t.label}</span>
                  <span className="text-[10px] text-ink-400">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

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
              onChange={(e) => setField("name", e.target.value)}
              placeholder={
                form.customerType === "individual"
                  ? "مثال: علی محمدی"
                  : "نام و نام خانوادگی نماینده"
              }
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
              onChange={(e) => setField("phone", e.target.value)}
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
            ایمیل <span className="text-red-500">*</span>
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
              onChange={(e) => setField("email", e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              dir="ltr"
              aria-invalid={!!errors.email}
              className={inputCls(errors.email, "pr-10")}
            />
          </div>
          {errors.email && <ErrorMsg text={errors.email} />}
        </div>

        {/* فیلدهای سازمانی (پویا) */}
        {isOrg && (
          <div>
            <label
              htmlFor="reg-org"
              className="block text-xs font-medium text-ink-700 mb-1.5"
            >
              {form.customerType === "company" && "نام شرکت"}
              {form.customerType === "hospital" && "نام بیمارستان"}
              {form.customerType === "clinic" && "نام کلینیک"}
              {form.customerType === "lab" && "نام آزمایشگاه"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="reg-org"
                type="text"
                value={form.organizationName}
                onChange={(e) => setField("organizationName", e.target.value)}
                placeholder="نام رسمی مرکز / سازمان"
                aria-invalid={!!errors.organizationName}
                className={inputCls(errors.organizationName, "pr-10")}
              />
            </div>
            {errors.organizationName && (
              <ErrorMsg text={errors.organizationName} />
            )}
          </div>
        )}

        {/* کد ملی */}
        {needsNationalId && (
          <div>
            <label
              htmlFor="reg-nid"
              className="block text-xs font-medium text-ink-700 mb-1.5"
            >
              کد ملی <span className="text-red-500">*</span>
            </label>
            <input
              id="reg-nid"
              type="text"
              inputMode="numeric"
              value={form.nationalId}
              onChange={(e) => setField("nationalId", e.target.value)}
              placeholder="۱۰ رقم بدون خط تیره"
              dir="ltr"
              maxLength={10}
              aria-invalid={!!errors.nationalId}
              className={inputCls(errors.nationalId)}
            />
            {errors.nationalId && <ErrorMsg text={errors.nationalId} />}
          </div>
        )}

        {/* شماره ثبت شرکت */}
        {needsRegNumber && (
          <div>
            <label
              htmlFor="reg-crn"
              className="block text-xs font-medium text-ink-700 mb-1.5"
            >
              شماره ثبت شرکت <span className="text-red-500">*</span>
            </label>
            <input
              id="reg-crn"
              type="text"
              inputMode="numeric"
              value={form.companyRegNumber}
              onChange={(e) => setField("companyRegNumber", e.target.value)}
              placeholder="شماره ثبت رسمی شرکت"
              dir="ltr"
              aria-invalid={!!errors.companyRegNumber}
              className={inputCls(errors.companyRegNumber)}
            />
            {errors.companyRegNumber && (
              <ErrorMsg text={errors.companyRegNumber} />
            )}
          </div>
        )}

        {/* رمز عبور */}
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
              onChange={(e) => setField("password", e.target.value)}
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
              onChange={(e) => setField("confirm", e.target.value)}
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
              onChange={(e) => setField("terms", e.target.checked)}
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

        {/* دکمه ثبت‌نام */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 h-12 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          <UserPlus className="w-4 h-4" aria-hidden="true" />
          {status === "loading" ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>
      </form>
    </AuthLayout>
  );
}

// ---------- اجزای کمکی ----------

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
