"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  Building2,
  CreditCard,
  FileBadge,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Pencil,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { updateCurrentUser } from "@/lib/api/auth-repository";

const customerTypeLabels: Record<string, string> = {
  individual: "شخص حقیقی",
  company: "شرکت",
  hospital: "بیمارستان",
  clinic: "کلینیک",
  lab: "آزمایشگاه",
};

interface FormState {
  name: string;
  phone: string;
  organizationName: string;
  nationalId: string;
  companyRegNumber: string;
}

export function AccountInfo() {
  const { user, refresh } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    organizationName: "",
    nationalId: "",
    companyRegNumber: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  // مقدار اولیه فرم
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
        organizationName: user.organizationName ?? "",
        nationalId: user.nationalId ?? "",
        companyRegNumber: user.companyRegNumber ?? "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!user) {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
        <AlertCircle
          className="w-8 h-8 text-ink-300 mx-auto mb-3"
          aria-hidden="true"
        />
        <p className="text-sm text-ink-500">اطلاعات کاربر در دسترس نیست.</p>
      </div>
    );
  }

  const isOrg =
    user.customerType === "company" ||
    user.customerType === "hospital" ||
    user.customerType === "clinic" ||
    user.customerType === "lab";

  const needsNationalId =
    user.customerType === "individual" || user.customerType === "company";

  const needsRegNumber = user.customerType === "company";

  const typeLabel = user.customerType
    ? customerTypeLabels[user.customerType] ?? ""
    : "";

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "نام حداقل ۳ حرف باشد.";
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "شماره موبایل معتبر نیست.";
    if (needsNationalId && form.nationalId.trim()) {
      if (!/^\d{10}$/.test(form.nationalId.replace(/\s/g, "")))
        e.nationalId = "کد ملی باید ۱۰ رقم باشد.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await updateCurrentUser({
        name: form.name.trim(),
        phone: form.phone.replace(/\s/g, ""),
        organizationName: isOrg
          ? form.organizationName.trim()
          : undefined,
        nationalId: needsNationalId
          ? form.nationalId.replace(/\s/g, "")
          : undefined,
        companyRegNumber: needsRegNumber
          ? form.companyRegNumber.trim()
          : undefined,
      });

      if (!res.ok) throw new Error(res.error || "خطا در ذخیره");

      await refresh();
      setEditing(false);
      setToast({
        type: "success",
        message: "اطلاعات با موفقیت به‌روزرسانی شد.",
      });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا در ذخیره",
      });
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
        organizationName: user.organizationName ?? "",
        nationalId: user.nationalId ?? "",
        companyRegNumber: user.companyRegNumber ?? "",
      });
    }
    setErrors({});
    setEditing(false);
  }

  const inputCls = (error?: string) =>
    `w-full h-11 px-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${
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
      <div className="bg-white rounded-2xl border border-ink-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
            <UserIcon className="w-5 h-5" aria-hidden="true" />
            اطلاعات حساب
          </h1>
          <p className="text-sm text-ink-500">
            مشاهده و ویرایش اطلاعات شخصی شما
          </p>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            ویرایش اطلاعات
          </button>
        )}
      </div>

      {/* فرم */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-ink-200 overflow-hidden"
      >
        <div className="p-5 space-y-5">
          {/* نام */}
          <Field label="نام و نام خانوادگی" required>
            {editing ? (
              <>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className={inputCls(errors.name)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <Err text={errors.name} />}
              </>
            ) : (
              <ReadOnlyValue value={user.name} icon={UserIcon} />
            )}
          </Field>

          {/* ایمیل — غیرقابل تغییر */}
          <Field label="ایمیل" hint="ایمیل قابل تغییر نیست">
            <ReadOnlyValue value={user.email} icon={Mail} ltr locked />
          </Field>

          {/* موبایل */}
          <Field label="شماره موبایل" required>
            {editing ? (
              <>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className={inputCls(errors.phone)}
                  dir="ltr"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <Err text={errors.phone} />}
              </>
            ) : (
              <ReadOnlyValue value={user.phone} icon={Phone} ltr />
            )}
          </Field>

          {/* نوع حساب — غیرقابل تغییر */}
          <Field
            label="نوع حساب"
            hint="نوع حساب در زمان ثبت‌نام تعیین می‌شود"
          >
            <ReadOnlyValue
              value={typeLabel || "—"}
              icon={UserIcon}
              locked
            />
          </Field>

          {/* نام سازمان */}
          {isOrg && (
            <Field label="نام سازمان / مرکز">
              {editing ? (
                <input
                  type="text"
                  value={form.organizationName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      organizationName: e.target.value,
                    })
                  }
                  className={inputCls()}
                />
              ) : (
                <ReadOnlyValue
                  value={user.organizationName || "—"}
                  icon={Building2}
                />
              )}
            </Field>
          )}

          {/* کد ملی */}
          {needsNationalId && (
            <Field label="کد ملی">
              {editing ? (
                <>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.nationalId}
                    onChange={(e) =>
                      setForm({ ...form, nationalId: e.target.value })
                    }
                    className={inputCls(errors.nationalId)}
                    dir="ltr"
                    aria-invalid={!!errors.nationalId}
                  />
                  {errors.nationalId && <Err text={errors.nationalId} />}
                </>
              ) : (
                <ReadOnlyValue
                  value={user.nationalId || "—"}
                  icon={CreditCard}
                  ltr
                />
              )}
            </Field>
          )}

          {/* شماره ثبت شرکت */}
          {needsRegNumber && (
            <Field label="شماره ثبت شرکت">
              {editing ? (
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.companyRegNumber}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      companyRegNumber: e.target.value,
                    })
                  }
                  className={inputCls()}
                  dir="ltr"
                />
              ) : (
                <ReadOnlyValue
                  value={user.companyRegNumber || "—"}
                  icon={FileBadge}
                  ltr
                />
              )}
            </Field>
          )}
        </div>

        {/* دکمه‌های ویرایش */}
        {editing && (
          <div className="border-t border-ink-100 p-4 bg-ink-50/50 flex flex-col sm:flex-row gap-2 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-ink-200 text-sm text-ink-600 hover:bg-ink-100 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              انصراف
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
            >
              {saving ? (
                <Loader2
                  className="w-4 h-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Save className="w-4 h-4" aria-hidden="true" />
              )}
              {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

// ===== کامپوننت‌های کمکی =====

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-medium text-ink-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
        {hint && (
          <span className="text-[10px] text-ink-400">({hint})</span>
        )}
      </div>
      {children}
    </div>
  );
}

function ReadOnlyValue({
  value,
  icon: Icon,
  ltr = false,
  locked = false,
}: {
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  ltr?: boolean;
  locked?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 h-11 px-3 rounded-lg bg-ink-50 border border-ink-100 text-sm text-ink-700">
      <Icon className="w-4 h-4 text-ink-400 shrink-0" aria-hidden="true" />
      <span
        className="flex-1 truncate"
        dir={ltr ? "ltr" : "rtl"}
      >
        {value}
      </span>
      {locked && (
        <Lock
          className="w-3.5 h-3.5 text-ink-300 shrink-0"
          aria-hidden="true"
        />
      )}
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