"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Eye,
  Package,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Star,
  Sparkles,
  X,
  Trash,
  AlertTriangle,
} from "lucide-react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  purgeProduct,
  emptyTrash,
  getTrashItems,
  getProductStats,
  type ProductWithSource,
  type ProductInput,
  type ProductStats,
  type TrashItem,
} from "@/lib/api/products-repository";
import type { Category, CategorySlug } from "@/lib/types";
import { categories as staticCategories } from "@/lib/data/categories";
import { ProductFormModal } from "@/components/admin/ProductFormModal";

type FilterCategory = "all" | CategorySlug;
type FilterSource = "all" | "custom" | "static" | "featured";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithSource[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [trash, setTrash] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
    useState<FilterCategory>("all");
  const [filterSource, setFilterSource] = useState<FilterSource>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductWithSource | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [trashOpen, setTrashOpen] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const categories: Category[] = staticCategories;

  async function loadData() {
    setLoading(true);
    const [list, s, t] = await Promise.all([
      getAllProducts(),
      getProductStats(),
      getTrashItems(),
    ]);
    setProducts(list);
    setStats(s);
    setTrash(t);
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
    return products.filter((p) => {
      if (filterCategory !== "all" && p.category !== filterCategory)
        return false;
      if (filterSource === "custom" && !p.isCustom) return false;
      if (filterSource === "static" && p.isCustom) return false;
      if (filterSource === "featured" && !p.featured) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    });
  }, [products, search, filterCategory, filterSource]);

  // ---- عملیات ----

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p: ProductWithSource) {
    setEditing(p);
    setModalOpen(true);
  }

  async function handleSave(input: ProductInput) {
    if (editing) {
      await updateProduct(editing.id, input);
      setToast({
        type: "success",
        message: "محصول با موفقیت ویرایش شد.",
      });
    } else {
      await createProduct(input);
      setToast({
        type: "success",
        message: "محصول جدید اضافه شد.",
      });
    }
    await loadData();
  }

  async function handleDelete(p: ProductWithSource) {
    if (
      !confirm(
        `آیا از انتقال «${p.name}» به سطل زباله مطمئن هستید؟ (قابل بازگردانی)`
      )
    )
      return;

    setBusyId(p.id);
    try {
      await deleteProduct(p.id);
      await loadData();
      setToast({
        type: "success",
        message: "محصول به سطل زباله منتقل شد.",
      });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا در حذف",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function handleRestore(item: TrashItem) {
    setBusyId(item.id);
    try {
      await restoreProduct(item.id);
      await loadData();
      setToast({
        type: "success",
        message: "محصول بازگردانی شد.",
      });
    } catch {
      setToast({ type: "error", message: "خطا در بازگردانی" });
    } finally {
      setBusyId(null);
    }
  }

  async function handlePurge(item: TrashItem) {
    if (
      !confirm(
        `آیا از حذف کامل «${item.name}» مطمئن هستید؟ این عملیات بازگشت‌پذیر نیست.`
      )
    )
      return;

    setBusyId(item.id);
    try {
      await purgeProduct(item.id);
      await loadData();
      setToast({
        type: "success",
        message: "محصول کامل حذف شد.",
      });
    } catch {
      setToast({ type: "error", message: "خطا در حذف کامل" });
    } finally {
      setBusyId(null);
    }
  }

  async function handleEmptyTrash() {
    if (
      !confirm(
        `آیا از خالی کردن کامل سطل زباله (${trash.length} مورد) مطمئن هستید؟ این عملیات بازگشت‌پذیر نیست.`
      )
    )
      return;

    try {
      await emptyTrash();
      await loadData();
      setToast({
        type: "success",
        message: "سطل زباله خالی شد.",
      });
    } catch {
      setToast({ type: "error", message: "خطا در خالی کردن" });
    }
  }

  // ---- رندر ----

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

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

      {/* هدر */}
      <div className="bg-white rounded-2xl border border-ink-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
            <Package className="w-5 h-5" aria-hidden="true" />
            مدیریت محصولات
          </h1>
          <p className="text-sm text-ink-500 num">
            {filtered.length.toLocaleString("fa-IR")} نمایش از{" "}
            {products.length.toLocaleString("fa-IR")} محصول
          </p>
        </div>
        <div className="flex gap-2">
          {trash.length > 0 && (
            <button
              type="button"
              onClick={() => setTrashOpen(true)}
              className="inline-flex items-center gap-2 h-11 px-4 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              سطل زباله ({trash.length.toLocaleString("fa-IR")})
            </button>
          )}
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            محصول جدید
          </button>
        </div>
      </div>

      {/* آمار */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatBox
            label="کل"
            value={stats.total}
            color="text-brand-700 bg-brand-50"
            icon={Package}
          />
          <StatBox
            label="سفارشی"
            value={stats.custom}
            color="text-accent-600 bg-accent-50"
            icon={Sparkles}
          />
          <StatBox
            label="ویرایش‌شده"
            value={stats.overridden}
            color="text-amber-600 bg-amber-50"
            icon={Edit3}
          />
          <StatBox
            label="ویژه"
            value={stats.featured}
            color="text-brand-600 bg-brand-50"
            icon={Star}
          />
          <StatBox
            label="در سطل زباله"
            value={stats.deleted}
            color="text-red-500 bg-red-50"
            icon={Trash2}
          />
        </div>
      )}

      {/* فیلترها */}
      <div className="bg-white rounded-2xl border border-ink-200 p-4 space-y-3">
        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجو در نام، کد یا برند محصول..."
            className="w-full h-11 pr-10 pl-3 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="flex items-center gap-1 text-ink-500">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            فیلترها:
          </span>
          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value as FilterCategory)
            }
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه دسته‌ها</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={filterSource}
            onChange={(e) =>
              setFilterSource(e.target.value as FilterSource)
            }
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه</option>
            <option value="custom">سفارشی</option>
            <option value="static">اصلی</option>
            <option value="featured">ویژه</option>
          </select>
          {(search ||
            filterCategory !== "all" ||
            filterSource !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilterCategory("all");
                setFilterSource("all");
              }}
              className="text-xs text-brand-600 hover:text-brand-700 underline"
            >
              پاک کردن فیلترها
            </button>
          )}
        </div>
      </div>

      {/* جدول */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 flex items-center justify-center gap-3">
          <Loader2
            className="w-5 h-5 text-brand-600 animate-spin"
            aria-hidden="true"
          />
          <span className="text-sm text-ink-500">در حال بارگذاری...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
          <Package
            className="w-10 h-10 text-ink-300 mx-auto mb-3"
            aria-hidden="true"
          />
          <p className="text-sm text-ink-500">
            {products.length === 0
              ? "محصولی وجود ندارد."
              : "محصولی با این فیلترها یافت نشد."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 border-b border-ink-200">
                <tr>
                  <th className="text-right font-medium text-ink-600 px-4 py-3">
                    محصول
                  </th>
                  <th className="text-right font-medium text-ink-600 px-4 py-3 hidden md:table-cell">
                    کد
                  </th>
                  <th className="text-right font-medium text-ink-600 px-4 py-3 hidden md:table-cell">
                    دسته
                  </th>
                  <th className="text-right font-medium text-ink-600 px-4 py-3 hidden lg:table-cell">
                    برند
                  </th>
                  <th className="text-center font-medium text-ink-600 px-4 py-3">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-ink-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex w-10 h-10 shrink-0 rounded-lg bg-brand-50 text-brand-600 items-center justify-center">
                          <Package
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-medium text-ink-800 truncate">
                              {p.name}
                            </p>
                            {p.isCustom && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-accent-50 text-accent-600">
                                سفارشی
                              </span>
                            )}
                            {p.isOverridden && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">
                                ویرایش‌شده
                              </span>
                            )}
                            {p.featured && (
                              <Star
                                className="w-3 h-3 text-amber-500"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <p className="text-xs text-ink-400 md:hidden num">
                            {p.code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-ink-600 num">
                      {p.code}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="inline-block text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-full">
                        {categoryName(p.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-ink-600">
                      {p.brand}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/products/${p.slug}`}
                          aria-label={`مشاهده ${p.name}`}
                          className="w-8 h-8 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 flex items-center justify-center transition-colors"
                        >
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          aria-label={`ویرایش ${p.name}`}
                          className="w-8 h-8 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 flex items-center justify-center transition-colors"
                        >
                          <Edit3 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p)}
                          disabled={busyId === p.id}
                          aria-label={`انتقال ${p.name} به سطل زباله`}
                          title="انتقال به سطل زباله"
                          className="w-8 h-8 rounded-lg text-ink-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 flex items-center justify-center transition-colors"
                        >
                          {busyId === p.id ? (
                            <Loader2
                              className="w-4 h-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Trash2
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* راهنما */}
      <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-4 text-xs text-ink-500 leading-relaxed">
        <p className="mb-1 font-medium text-ink-600">
          نکته درباره‌ی محصولات:
        </p>
        <ul className="space-y-1 list-disc pr-5">
          <li>
            حذف محصول، آن را به <strong>سطل زباله</strong> منتقل می‌کند
            (قابل بازگردانی).
          </li>
          <li>
            برای حذف دائمی، از داخل سطل زباله دکمه‌ی «حذف کامل» را بزنید.
          </li>
          <li>
            <strong>محصولات اصلی</strong> (در فایل پروژه) قابل ویرایش
            هستند.
          </li>
          <li>
            <strong>محصولات سفارشی</strong> که خودتان اضافه می‌کنید،
            کاملاً در اختیار شما هستند.
          </li>
        </ul>
      </div>

      {/* Modal ویرایش/افزودن */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
        categories={categories.map((c) => ({
          slug: c.slug,
          name: c.name,
        }))}
      />

      {/* Modal سطل زباله */}
      {trashOpen && (
        <TrashModal
          items={trash}
          busyId={busyId}
          onClose={() => setTrashOpen(false)}
          onRestore={handleRestore}
          onPurge={handlePurge}
          onEmptyAll={handleEmptyTrash}
        />
      )}
    </div>
  );
}

// ---- کامپوننت‌های کمکی ----

function StatBox({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Package;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-3 text-center">
      <span
        className={`inline-flex w-8 h-8 mb-1.5 rounded-lg ${color} items-center justify-center`}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="text-lg font-extrabold text-ink-800 num">{value}</div>
      <div className="text-[10px] text-ink-500 mt-0.5">{label}</div>
    </div>
  );
}

function TrashModal({
  items,
  busyId,
  onClose,
  onRestore,
  onPurge,
  onEmptyAll,
}: {
  items: TrashItem[];
  busyId: number | null;
  onClose: () => void;
  onRestore: (item: TrashItem) => void;
  onPurge: (item: TrashItem) => void;
  onEmptyAll: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="border-b border-ink-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex w-8 h-8 rounded-lg bg-red-50 text-red-600 items-center justify-center">
              <Trash className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-ink-800 text-sm">
                سطل زباله
              </h2>
              <p className="text-[10px] text-ink-500 num">
                {items.length.toLocaleString("fa-IR")} مورد
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* لیست */}
        <div className="p-4 sm:p-5">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <Trash
                className="w-10 h-10 text-ink-300 mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="text-sm text-ink-500">
                سطل زباله خالی است.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-ink-200 bg-white"
                >
                  <span className="inline-flex w-9 h-9 rounded-lg bg-ink-100 text-ink-500 items-center justify-center shrink-0">
                    <Package className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-medium text-sm text-ink-800 truncate">
                        {item.name}
                      </p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          item.isCustom
                            ? "bg-accent-50 text-accent-600"
                            : "bg-brand-50 text-brand-600"
                        }`}
                      >
                        {item.isCustom ? "سفارشی" : "اصلی"}
                      </span>
                    </div>
                    <p className="text-[10px] text-ink-400 num mt-0.5">
                      {item.code} · {item.brand}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onRestore(item)}
                      disabled={busyId === item.id}
                      title="بازگردانی"
                      aria-label={`بازگردانی ${item.name}`}
                      className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-accent-50 text-accent-600 hover:bg-accent-100 disabled:opacity-50 text-xs font-medium transition-colors"
                    >
                      <RotateCcw
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                      بازگردانی
                    </button>
                    <button
                      type="button"
                      onClick={() => onPurge(item)}
                      disabled={busyId === item.id}
                      title="حذف کامل"
                      aria-label={`حذف کامل ${item.name}`}
                      className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 text-xs font-medium transition-colors"
                    >
                      <Trash2
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                      حذف کامل
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* فوتر */}
        {items.length > 0 && (
          <div className="border-t border-ink-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-2 sm:justify-between items-stretch sm:items-center">
            <div className="flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
              <AlertTriangle
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>
                «حذف کامل» بازگشت‌پذیر نیست. «بازگردانی» محصول را به
                لیست برمی‌گرداند.
              </span>
            </div>
            <button
              type="button"
              onClick={onEmptyAll}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              خالی کردن سطل زباله
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
