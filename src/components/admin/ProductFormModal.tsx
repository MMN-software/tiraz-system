"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  X,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  Loader2,
} from "lucide-react";
import type {
  Product,
  CategorySlug,
  ProductBadge,
  ProductSpec,
} from "@/lib/types";
import type { ProductInput } from "@/lib/api/products-repository";

interface CategoryOption {
  slug: CategorySlug;
  name: string;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: ProductInput) => Promise<void>;
  initial?: Product | null;
  categories: CategoryOption[];
}

const badgeOptions: { value: ProductBadge; label: string }[] = [
  { value: null, label: "بدون برچسب" },
  { value: "new", label: "جدید" },
  { value: "bestseller", label: "پرفروش" },
  { value: "discount", label: "تخفیف‌دار" },
];

interface FormState {
  name: string;
  slug: string;
  category: CategorySlug;
  code: string;
  brand: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  applications: string[];
  image: string;
  badge: ProductBadge;
  featured: boolean;
}

const emptyForm = (defaultCategory: CategorySlug): FormState => ({
  name: "",
  slug: "",
  category: defaultCategory,
  code: "",
  brand: "",
  shortDesc: "",
  description: "",
  features: [""],
  specs: [{ label: "", value: "" }],
  applications: [""],
  image: "",
  badge: null,
  featured: false,
});

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initial,
  categories,
}: ProductFormModalProps) {
  const [form, setForm] = useState<FormState>(
    emptyForm(categories[0]?.slug ?? "medical")
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  // پر کردن فرم هنگام باز شدن با محصول موجود
  useEffect(() => {
    if (!isOpen) return;
    if (initial) {
      setForm({
        name: initial.name,
        slug: initial.slug,
        category: initial.category,
        code: initial.code,
        brand: initial.brand,
        shortDesc: initial.shortDesc,
        description: initial.description,
        features:
          initial.features.length > 0 ? [...initial.features] : [""],
        specs:
          initial.specs.length > 0
            ? initial.specs.map((s) => ({ ...s }))
            : [{ label: "", value: "" }],
        applications:
          initial.applications.length > 0
            ? [...initial.applications]
            : [""],
        image: initial.image ?? "",
        badge: initial.badge,
        featured: initial.featured,
      });
    } else {
      setForm(emptyForm(categories[0]?.slug ?? "medical"));
    }
    setErrors({});
    setServerError("");
  }, [isOpen, initial, categories]);

  // جلوگیری از اسکرول بک‌گراند
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // ---- مدیریت آرایه‌ها ----

  const updateFeature = (i: number, val: string) =>
    setForm((f) => {
      const arr = [...f.features];
      arr[i] = val;
      return { ...f, features: arr };
    });

  const addFeature = () =>
    setForm((f) => ({ ...f, features: [...f.features, ""] }));

  const removeFeature = (i: number) =>
    setForm((f) => ({
      ...f,
      features: f.features.filter((_, idx) => idx !== i),
    }));

  const updateSpec = (
    i: number,
    key: "label" | "value",
    val: string
  ) =>
    setForm((f) => {
      const arr = [...f.specs];
      arr[i] = { ...arr[i], [key]: val };
      return { ...f, specs: arr };
    });

  const addSpec = () =>
    setForm((f) => ({
      ...f,
      specs: [...f.specs, { label: "", value: "" }],
    }));

  const removeSpec = (i: number) =>
    setForm((f) => ({
      ...f,
      specs: f.specs.filter((_, idx) => idx !== i),
    }));

  const updateApp = (i: number, val: string) =>
    setForm((f) => {
      const arr = [...f.applications];
      arr[i] = val;
      return { ...f, applications: arr };
    });

  const addApp = () =>
    setForm((f) => ({ ...f, applications: [...f.applications, ""] }));

  const removeApp = (i: number) =>
    setForm((f) => ({
      ...f,
      applications: f.applications.filter((_, idx) => idx !== i),
    }));

  // ---- اعتبارسنجی ----

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "نام محصول حداقل ۳ حرف باشد.";
    if (!form.code.trim()) e.code = "کد محصول الزامی است.";
    if (!form.brand.trim()) e.brand = "برند الزامی است.";
    if (!form.shortDesc.trim())
      e.shortDesc = "توضیح کوتاه الزامی است.";
    if (!form.description.trim())
      e.description = "توضیح کامل الزامی است.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSaving(true);
    try {
      await onSave({
        name: form.name,
        slug: form.slug,
        category: form.category,
        code: form.code,
        brand: form.brand,
        shortDesc: form.shortDesc,
        description: form.description,
        features: form.features,
        specs: form.specs,
        applications: form.applications,
        image: form.image || undefined,
        badge: form.badge,
        featured: form.featured,
      });
      onClose();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "خطا در ذخیره محصول"
      );
    } finally {
      setSaving(false);
    }
  }

  const inputCls = (err?: string) =>
    `w-full h-11 px-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-colors ${
      err
        ? "border-red-300 focus:border-red-500"
        : "border-ink-200 focus:border-brand-500"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="sticky top-0 bg-white border-b border-ink-200 p-4 sm:p-5 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="font-bold text-brand-700">
            {initial ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          {/* نام + slug */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                نام محصول <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className={inputCls(errors.name)}
                placeholder="مثال: دستگاه ونتیلاتور پیشرفته"
              />
              {errors.name && <Err text={errors.name} />}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                نامک (slug)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
                className={inputCls()}
                placeholder="خالی بذارید تا خودکار ساخته شود"
                dir="ltr"
              />
            </div>
          </div>

          {/* دسته + کد + برند */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                دسته‌بندی <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as CategorySlug,
                  })
                }
                className={inputCls()}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                کد محصول <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value })
                }
                className={inputCls(errors.code)}
                placeholder="TZ-XX-100"
                dir="ltr"
              />
              {errors.code && <Err text={errors.code} />}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                برند <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) =>
                  setForm({ ...form, brand: e.target.value })
                }
                className={inputCls(errors.brand)}
                placeholder="مثال: MEDIQ"
              />
              {errors.brand && <Err text={errors.brand} />}
            </div>
          </div>

          {/* توضیح کوتاه */}
          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              توضیح کوتاه <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.shortDesc}
              onChange={(e) =>
                setForm({ ...form, shortDesc: e.target.value })
              }
              className={inputCls(errors.shortDesc)}
              placeholder="یک جمله‌ی توصیفی کوتاه"
            />
            {errors.shortDesc && <Err text={errors.shortDesc} />}
          </div>

          {/* توضیح کامل */}
          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              توضیح کامل <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputCls(errors.description)} min-h-[80px] resize-y py-2.5`}
              placeholder="توضیحات کامل محصول"
            />
            {errors.description && <Err text={errors.description} />}
          </div>

          {/* ویژگی‌ها */}
          <ArrayEditor
            title="ویژگی‌ها"
            items={form.features}
            placeholder="مثال: نمایشگر لمسی ۱۵ اینچ"
            onChange={updateFeature}
            onAdd={addFeature}
            onRemove={removeFeature}
          />

          {/* مشخصات فنی */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-ink-700">
                مشخصات فنی
              </label>
              <button
                type="button"
                onClick={addSpec}
                className="text-xs text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                افزودن
              </button>
            </div>
            <div className="space-y-2">
              {form.specs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={s.label}
                    onChange={(e) =>
                      updateSpec(i, "label", e.target.value)
                    }
                    className={`${inputCls()} flex-1`}
                    placeholder="عنوان (مثال: وزن)"
                  />
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) =>
                      updateSpec(i, "value", e.target.value)
                    }
                    className={`${inputCls()} flex-1`}
                    placeholder="مقدار (مثال: ۲۸ کیلوگرم)"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    aria-label="حذف"
                    className="w-11 h-11 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* کاربردها */}
          <ArrayEditor
            title="کاربردها"
            items={form.applications}
            placeholder="مثال: ICU"
            onChange={updateApp}
            onAdd={addApp}
            onRemove={removeApp}
          />

          {/* تصویر + برچسب */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                مسیر تصویر
              </label>
              <input
                type="text"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className={inputCls()}
                placeholder="/products/example.jpg"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                برچسب
              </label>
              <select
                value={form.badge ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    badge:
                      (e.target.value || null) as ProductBadge,
                  })
                }
                className={inputCls()}
              >
                {badgeOptions.map((b) => (
                  <option key={b.label} value={b.value ?? ""}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* featured */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
              className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
            />
            <span className="text-xs text-ink-600">
              نمایش در بخش «محصولات ویژه»
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

          {/* دکمه‌ها */}
          <div className="flex gap-2 justify-end pt-2 border-t border-ink-100">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-xl border border-ink-200 text-sm text-ink-600 hover:bg-ink-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
            >
              {saving ? (
                <Loader2
                  className="w-4 h-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Save className="w-4 h-4" aria-hidden="true" />
              )}
              {saving ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- کامپوننت کمکی برای ویرایش آرایه ----

function ArrayEditor({
  title,
  items,
  placeholder,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  placeholder: string;
  onChange: (i: number, val: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-medium text-ink-700">{title}</label>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          افزودن
        </button>
      </div>
      <div className="space-y-2">
        {items.map((val, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={val}
              onChange={(e) => onChange(i, e.target.value)}
              className="w-full h-11 px-3 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 flex-1"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label="حذف"
              className="w-11 h-11 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
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
