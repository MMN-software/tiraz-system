"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Layers,
  Search,
  Filter,
  Edit3,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Package,
  Eye,
  EyeOff,
  Hash,
  Save,
  X,
} from "lucide-react";
import {
  fetchAllCategories,
  updateCategory,
  type CategoryItem,
} from "@/lib/api/categories-repository";

type FilterStatus = "all" | "active" | "inactive";

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [editing, setEditing] = useState<CategoryItem | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadData() {
    setLoading(true);
    const list = await fetchAllCategories();
    setItems(list);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((c) => {
      if (filterStatus === "active" && !c.isActive) return false;
      if (filterStatus === "inactive" && c.isActive) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
  }, [items, search, filterStatus]);

  async function handleToggleActive(item: CategoryItem) {
    const res = await updateCategory(item.slug, {
      isActive: !item.isActive,
    });
    if (res.ok) {
      await loadData();
      setToast({
        type: "success",
        message: item.isActive
          ? "دسته‌بندی غیرفعال شد."
          : "دسته‌بندی فعال شد.",
      });
    } else {
      setToast({ type: "error", message: res.error || "خطا" });
    }
  }

  async function handleSave(
    slug: string,
    updates: Partial<{
      name: string;
      shortName: string;
      description: string;
      count: number;
      order: number;
      isActive: boolean;
    }>
  ) {
    const res = await updateCategory(slug, updates);
    if (res.ok) {
      await loadData();
      setEditing(null);
      setToast({
        type: "success",
        message: "دسته‌بندی با موفقیت ویرایش شد.",
      });
    } else {
      setToast({ type: "error", message: res.error || "خطا" });
    }
  }

  const activeCount = items.filter((c) => c.isActive).length;
  const inactiveCount = items.length - activeCount;

  return (
    <div className="space-y-5">
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

      <div className="bg-white rounded-2xl border border-ink-200 p-5">
        <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
          <Layers className="w-5 h-5" aria-hidden="true" />
          مدیریت دسته‌بندی‌ها
        </h1>
        <p className="text-sm text-ink-500">
          ویرایش نام، توضیحات، ترتیب نمایش و وضعیت دسته‌بندی‌ها
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatBox label="کل" value={items.length} color="text-brand-700 bg-brand-50" icon={Layers} />
        <StatBox label="فعال" value={activeCount} color="text-accent-600 bg-accent-50" icon={CheckCircle2} />
        <StatBox label="غیرفعال" value={inactiveCount} color="text-ink-500 bg-ink-100" icon={XCircle} />
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجو..."
            className="w-full h-11 pr-10 pl-3 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="flex items-center gap-1 text-ink-500">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            فیلتر:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 text-brand-600 animate-spin" aria-hidden="true" />
          <span className="text-sm text-ink-500">در حال بارگذاری...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
          <Layers className="w-10 h-10 text-ink-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-sm text-ink-500">
            {items.length === 0
              ? "دسته‌بندی‌ای وجود ندارد."
              : "دسته‌بندی‌ای با این فیلترها یافت نشد."}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <CategoryCard
              key={item.slug}
              item={item}
              onEdit={() => setEditing(item)}
              onToggleActive={() => handleToggleActive(item)}
            />
          ))}
        </div>
      )}

      {editing && (
        <EditModal
          item={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Layers;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-3 text-center">
      <span className={`inline-flex w-8 h-8 mb-1.5 rounded-lg ${color} items-center justify-center`}>
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="text-lg font-extrabold text-ink-800 num">{value}</div>
      <div className="text-[10px] text-ink-500 mt-0.5">{label}</div>
    </div>
  );
}

function CategoryCard({
  item,
  onEdit,
  onToggleActive,
}: {
  item: CategoryItem;
  onEdit: () => void;
  onToggleActive: () => void;
}) {
  return (
    <div className={`bg-white rounded-2xl border p-4 space-y-3 transition-colors ${item.isActive ? "border-ink-200" : "border-ink-200 bg-ink-50/50 opacity-70"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className={`inline-flex w-11 h-11 rounded-xl items-center justify-center shrink-0 ${item.isActive ? "bg-brand-50 text-brand-600" : "bg-ink-100 text-ink-400"}`}>
            <Layers className="w-5 h-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-bold text-sm text-ink-800 truncate">{item.name}</h3>
              {!item.isActive && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ink-100 text-ink-500">
                  غیرفعال
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
              <code className="text-[10px] bg-ink-100 px-1.5 py-0.5 rounded">{item.slug}</code>
              <span className="text-[10px]">{item.shortName}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-ink-500 leading-relaxed line-clamp-2">{item.description}</p>

      <div className="flex items-center gap-4 text-[11px] text-ink-500 border-t border-ink-100 pt-3">
        <span className="inline-flex items-center gap-1">
          <Package className="w-3 h-3" aria-hidden="true" />
          <span className="num">{item.count}</span> محصول
        </span>
        <span className="inline-flex items-center gap-1">
          <Hash className="w-3 h-3" aria-hidden="true" />
          ترتیب: <span className="num">{item.order}</span>
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 text-xs font-medium transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
          ویرایش
        </button>
        <button
          type="button"
          onClick={onToggleActive}
          className={`inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium transition-colors border ${item.isActive ? "bg-ink-50 text-ink-600 hover:bg-ink-100 border-ink-200" : "bg-accent-50 text-accent-600 hover:bg-accent-100 border-accent-200"}`}
        >
          {item.isActive ? (
            <>
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
              غیرفعال
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              فعال
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function EditModal({
  item,
  onClose,
  onSave,
}: {
  item: CategoryItem;
  onClose: () => void;
  onSave: (
    slug: string,
    updates: Partial<{
      name: string;
      shortName: string;
      description: string;
      count: number;
      order: number;
      isActive: boolean;
    }>
  ) => Promise<void>;
}) {
  const [name, setName] = useState(item.name);
  const [shortName, setShortName] = useState(item.shortName);
  const [description, setDescription] = useState(item.description);
  const [count, setCount] = useState(item.count);
  const [order, setOrder] = useState(item.order);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!name.trim() || name.trim().length < 2) {
      setError("نام دسته‌بندی حداقل ۲ حرف باشد.");
      return;
    }
    if (!shortName.trim()) {
      setError("نام کوتاه الزامی است.");
      return;
    }
    if (!description.trim()) {
      setError("توضیحات الزامی است.");
      return;
    }
    setSaving(true);
    try {
      await onSave(item.slug, {
        name: name.trim(),
        shortName: shortName.trim(),
        description: description.trim(),
        count: Number(count) || 0,
        order: Number(order) || 0,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در ذخیره");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg my-4 sm:my-8" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-ink-200 p-4 sm:p-5 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="font-bold text-brand-700">ویرایش دسته‌بندی</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="bg-ink-50 rounded-lg p-3 text-xs">
            <div className="text-ink-500 mb-1">شناسه (slug):</div>
            <code className="text-[11px] text-brand-700 font-bold">{item.slug}</code>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              نام کامل <span className="text-red-500">*</span>
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-3 text-sm rounded-lg border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              نام کوتاه <span className="text-red-500">*</span>
            </label>
            <input type="text" value={shortName} onChange={(e) => setShortName(e.target.value)} className="w-full h-11 px-3 text-sm rounded-lg border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500" />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-700 mb-1.5">
              توضیحات <span className="text-red-500">*</span>
            </label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full text-sm rounded-lg border border-ink-200 p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-y min-h-[80px]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">تعداد محصول (نمایشی)</label>
              <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full h-11 px-3 text-sm rounded-lg border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 num" dir="ltr" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">ترتیب نمایش</label>
              <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full h-11 px-3 text-sm rounded-lg border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 num" dir="ltr" />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2 border-t border-ink-100">
            <button type="button" onClick={onClose} className="h-11 px-5 rounded-xl border border-ink-200 text-sm text-ink-600 hover:bg-ink-50 transition-colors">
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Save className="w-4 h-4" aria-hidden="true" />}
              {saving ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
