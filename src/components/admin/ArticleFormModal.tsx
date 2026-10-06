"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  X,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type {
  ArticleItem,
  ArticleInput,
  ArticleCategory,
} from "@/lib/api/articles-repository";

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: ArticleInput) => Promise<void>;
  initial?: ArticleItem | null;
}

const CATEGORY_OPTIONS: { value: ArticleCategory; label: string }[] = [
  { value: "medical", label: "تجهیزات پزشکی" },
  { value: "lab", label: "آزمایشگاهی" },
  { value: "industrial", label: "صنعتی" },
  { value: "guide", label: "راهنمای خرید" },
];

interface FormState {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
  isPublished: boolean;
}

const emptyForm: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "medical",
  author: "تیم فنی تیرازیس طب",
  date: "",
  readTime: 5,
  image: "",
  featured: false,
  isPublished: true,
};

export function ArticleFormModal({
  isOpen,
  onClose,
  onSave,
  initial,
}: ArticleFormModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    if (initial) {
      setForm({
        slug: initial.slug,
        title: initial.title,
        excerpt: initial.excerpt,
        content: initial.content,
        category: initial.category,
        author: initial.author,
        date: initial.date,
        readTime: initial.readTime,
        image: initial.image ?? "",
        featured: initial.featured,
        isPublished: initial.isPublished,
      });
    } else {
      const today = new Date().toLocaleDateString("fa-IR");
      setForm({ ...emptyForm, date: today });
    }
    setErrors({});
    setServerError("");
  }, [isOpen, initial]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.title.trim() || form.title.trim().length < 5)
      e.title = "عنوان حداقل ۵ حرف باشد.";
    if (!form.slug.trim()) e.slug = "slug الزامی است.";
    if (!form.excerpt.trim()) e.excerpt = "خلاصه الزامی است.";
    if (!form.content.trim()) e.content = "متن مقاله الزامی است.";
    if (!form.author.trim()) e.author = "نویسنده الزامی است.";
    if (!form.date.trim()) e.date = "تاریخ الزامی است.";
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
        slug: form.slug.trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        category: form.category,
        author: form.author.trim(),
        date: form.date.trim(),
        readTime: Number(form.readTime) || 5,
        image: form.image.trim() || undefined,
        featured: form.featured,
        isPublished: form.isPublished,
      });
      onClose();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "خطا در ذخیره");
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
            {initial ? "ویرایش مقاله" : "افزودن مقاله جدید"}
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
          {/* عنوان + slug */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                عنوان مقاله <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className={inputCls(errors.title)}
                placeholder="مثال: راهنمای انتخاب ونتیلاتور"
              />
              {errors.title && <Err text={errors.title} />}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                slug (نامک) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
                className={inputCls(errors.slug)}
                placeholder="how-to-choose-ventilator"
                dir="ltr"
              />
              {errors.slug && <Err text={errors.slug} />}
            </div>
          </div>

          {/* دسته + نویسنده + تاریخ */}
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
                    category: e.target.value as ArticleCategory,
                  })
                }
                className={inputCls()}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                نویسنده <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                className={inputCls(errors.author)}
              />
              {errors.author && <Err text={errors.author} />}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                تاریخ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className={inputCls(errors.date)}
                placeholder="۱۴۰۴/۰۷/۱۵"
              />
              {errors.date && <Err text={errors.date} />}
            </div>
          </div>

          {/* خلاصه */}
          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              خلاصه <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
              className={`${inputCls(errors.excerpt)} min-h-[60px] resize-y py-2.5`}
              placeholder="یک یا دو جمله توضیح"
            />
            {errors.excerpt && <Err text={errors.excerpt} />}
          </div>

          {/* محتوا */}
          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              متن کامل مقاله <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={12}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              className={`${inputCls(errors.content)} min-h-[200px] resize-y py-2.5`}
              placeholder="متن کامل مقاله را اینجا بنویسید..."
            />
            {errors.content && <Err text={errors.content} />}
          </div>

          {/* تصویر + زمان مطالعه */}
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
                placeholder="/articles/example.jpg"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">
                زمان مطالعه (دقیقه)
              </label>
              <input
                type="number"
                value={form.readTime}
                onChange={(e) =>
                  setForm({ ...form, readTime: Number(e.target.value) })
                }
                className={`${inputCls()} num`}
                dir="ltr"
              />
            </div>
          </div>

          {/* چک‌باکس‌ها */}
          <div className="flex flex-wrap gap-4">
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
                نمایش در بخش «مقالات ویژه»
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
                className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
              />
              <span className="text-xs text-ink-600">منتشر شده</span>
            </label>
          </div>

          {serverError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              <AlertCircle
                className="w-4 h-4 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{serverError}</span>
            </div>
          )}

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
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
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
