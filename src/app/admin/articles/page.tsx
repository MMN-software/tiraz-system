"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Star,
  Clock,
  User as UserIcon,
} from "lucide-react";
import {
  fetchAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  type ArticleItem,
  type ArticleInput,
  type ArticleCategory,
} from "@/lib/api/articles-repository";
import { ArticleFormModal } from "@/components/admin/ArticleFormModal";

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  medical: "تجهیزات پزشکی",
  lab: "آزمایشگاهی",
  industrial: "صنعتی",
  guide: "راهنمای خرید",
};

const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  medical: "bg-brand-50 text-brand-600",
  lab: "bg-accent-50 text-accent-600",
  industrial: "bg-amber-50 text-amber-600",
  guide: "bg-ink-100 text-ink-600",
};

type FilterCategory = "all" | ArticleCategory;
type FilterStatus = "all" | "published" | "draft";

export default function AdminArticlesPage() {
  const [items, setItems] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
    useState<FilterCategory>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ArticleItem | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadData() {
    setLoading(true);
    const list = await fetchAllArticles();
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
    return items.filter((a) => {
      if (filterCategory !== "all" && a.category !== filterCategory)
        return false;
      if (filterStatus === "published" && !a.isPublished) return false;
      if (filterStatus === "draft" && a.isPublished) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
      );
    });
  }, [items, search, filterCategory, filterStatus]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(a: ArticleItem) {
    setEditing(a);
    setModalOpen(true);
  }

  async function handleSave(input: ArticleInput) {
    if (editing) {
      const res = await updateArticle(editing.id, input);
      if (!res.ok) throw new Error(res.error || "خطا");
      setToast({
        type: "success",
        message: "مقاله با موفقیت ویرایش شد.",
      });
    } else {
      const res = await createArticle(input);
      if (!res.ok) throw new Error(res.error || "خطا");
      setToast({
        type: "success",
        message: "مقاله جدید اضافه شد.",
      });
    }
    await loadData();
  }

  async function handleTogglePublish(a: ArticleItem) {
    setBusyId(a.id);
    try {
      const res = await updateArticle(a.id, {
        isPublished: !a.isPublished,
      });
      if (!res.ok) throw new Error(res.error || "خطا");
      await loadData();
      setToast({
        type: "success",
        message: a.isPublished ? "مقاله از انتشار خارج شد." : "مقاله منتشر شد.",
      });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(a: ArticleItem) {
    if (!confirm(`آیا از حذف مقاله «${a.title}» مطمئن هستید؟`)) return;

    setBusyId(a.id);
    try {
      const res = await deleteArticle(a.id);
      if (!res.ok) throw new Error(res.error || "خطا");
      await loadData();
      setToast({ type: "success", message: "مقاله حذف شد." });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا",
      });
    } finally {
      setBusyId(null);
    }
  }

  const publishedCount = items.filter((a) => a.isPublished).length;
  const draftCount = items.length - publishedCount;

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
            <FileText className="w-5 h-5" aria-hidden="true" />
            مدیریت مقالات
          </h1>
          <p className="text-sm text-ink-500">
            {publishedCount} منتشرشده · {draftCount} پیش‌نویس
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          مقاله جدید
        </button>
      </div>

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
            placeholder="جست‌وجو در عنوان، slug یا خلاصه..."
            className="w-full h-11 pr-10 pl-3 text-sm rounded-lg border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="flex items-center gap-1 text-ink-500">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            فیلتر:
          </span>
          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value as FilterCategory)
            }
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه دسته‌ها</option>
            {(Object.keys(CATEGORY_LABELS) as ArticleCategory[]).map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as FilterStatus)
            }
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="published">منتشرشده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>
      </div>

      {/* لیست */}
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
          <FileText
            className="w-10 h-10 text-ink-300 mx-auto mb-3"
            aria-hidden="true"
          />
          <p className="text-sm text-ink-500">
            {items.length === 0
              ? "مقاله‌ای وجود ندارد."
              : "مقاله‌ای با این فیلترها یافت نشد."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <ArticleRow
              key={a.id}
              article={a}
              busy={busyId === a.id}
              onEdit={() => openEdit(a)}
              onDelete={() => handleDelete(a)}
              onTogglePublish={() => handleTogglePublish(a)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ArticleFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}

function ArticleRow({
  article,
  busy,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  article: ArticleItem;
  busy: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-ink-200 p-4 sm:p-5 transition-opacity ${
        article.isPublished ? "" : "opacity-70"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                CATEGORY_COLORS[article.category]
              }`}
            >
              {CATEGORY_LABELS[article.category]}
            </span>
            {article.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                <Star className="w-3 h-3" aria-hidden="true" />
                ویژه
              </span>
            )}
            {!article.isPublished && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ink-100 text-ink-500">
                پیش‌نویس
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-ink-800 mb-1.5">
            {article.title}
          </h3>

          <p className="text-xs text-ink-500 leading-relaxed line-clamp-2 mb-2">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-400">
            <code className="bg-ink-100 px-1.5 py-0.5 rounded text-[10px]">
              {article.slug}
            </code>
            <span className="inline-flex items-center gap-1">
              <UserIcon className="w-3 h-3" aria-hidden="true" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {article.readTime} دقیقه
            </span>
            <span>{article.date}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={onTogglePublish}
            disabled={busy}
            title={article.isPublished ? "خروج از انتشار" : "انتشار"}
            className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium transition-colors border disabled:opacity-50 ${
              article.isPublished
                ? "bg-ink-50 text-ink-600 hover:bg-ink-100 border-ink-200"
                : "bg-accent-50 text-accent-600 hover:bg-accent-100 border-accent-200"
            }`}
          >
            {article.isPublished ? (
              <>
                <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                پنهان
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                انتشار
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onEdit}
            disabled={busy}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200 transition-colors disabled:opacity-50"
          >
            <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
            ویرایش
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
