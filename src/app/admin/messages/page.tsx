"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Mail,
  Phone,
  User as UserIcon,
  Send,
  ChevronDown,
  ChevronUp,
  Package,
  Wrench,
  HelpCircle,
  UserX,
  UserCheck,
} from "lucide-react";
import {
  getInquiriesWithUserInfo,
  getAdminInquiryStats,
  updateInquiryStatus,
} from "@/lib/api/inquiry-repository";
import type {
  InquiryWithUser,
  AdminInquiryStats,
} from "@/lib/types/inquiry";
import type { InquiryStatus, InquiryType } from "@/lib/types/inquiry";

// ---------- برچسب‌ها ----------

const statusLabels: Record<InquiryStatus, string> = {
  pending: "در انتظار بررسی",
  in_review: "در حال بررسی",
  answered: "پاسخ داده شده",
  closed: "بسته شده",
};

const statusClasses: Record<InquiryStatus, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  in_review: "bg-brand-50 text-brand-600 border-brand-200",
  answered: "bg-accent-50 text-accent-600 border-accent-200",
  closed: "bg-ink-100 text-ink-500 border-ink-200",
};

const typeLabels: Record<InquiryType, string> = {
  quote: "درخواست قیمت",
  consultation: "مشاوره فنی",
  support: "پشتیبانی",
  other: "سایر",
};

const typeIcons: Record<InquiryType, typeof Package> = {
  quote: Package,
  consultation: MessageSquare,
  support: Wrench,
  other: HelpCircle,
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

type FilterStatus = "all" | InquiryStatus;
type FilterSource = "all" | "registered" | "guest";

// ---------- کامپوننت ----------

export default function AdminMessagesPage() {
  const [items, setItems] = useState<InquiryWithUser[]>([]);
  const [stats, setStats] = useState<AdminInquiryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterSource, setFilterSource] = useState<FilterSource>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadData() {
    setLoading(true);
    const [list, s] = await Promise.all([
      getInquiriesWithUserInfo(),
      getAdminInquiryStats(),
    ]);
    setItems(list);
    setStats(s);
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
    return items.filter((i) => {
      if (filterStatus !== "all" && i.status !== filterStatus) return false;
      if (filterSource === "guest" && !i.isGuest) return false;
      if (filterSource === "registered" && i.isGuest) return false;
      if (!q) return true;
      const haystack = [
        i.subject,
        i.message,
        i.id,
        i.user?.name ?? "",
        i.user?.email ?? "",
        i.user?.phone ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, search, filterStatus, filterSource]);

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

      {/* سرصفحه */}
      <div>
        <h1 className="text-xl font-extrabold text-brand-700 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
          درخواست‌ها و پیام‌ها
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          مدیریت درخواست‌های ثبت‌شده از طریق فرم تماس و پنل کاربری
        </p>
      </div>

      {/* آمار */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatBox
            label="کل"
            value={stats.total}
            color="text-brand-700 bg-brand-50"
            icon={MessageSquare}
          />
          <StatBox
            label="در انتظار"
            value={stats.pending}
            color="text-amber-600 bg-amber-50"
            icon={Clock}
          />
          <StatBox
            label="در بررسی"
            value={stats.inReview}
            color="text-brand-600 bg-brand-50"
            icon={Search}
          />
          <StatBox
            label="پاسخ داده"
            value={stats.answered}
            color="text-accent-600 bg-accent-50"
            icon={CheckCircle2}
          />
          <StatBox
            label="بسته شده"
            value={stats.closed}
            color="text-ink-500 bg-ink-100"
            icon={XCircle}
          />
          <StatBox
            label="مهمان"
            value={stats.guests}
            color="text-red-500 bg-red-50"
            icon={UserX}
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
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجو در متن پیام، نام، ایمیل یا کد درخواست..."
            className="w-full h-11 pr-10 pl-3 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="flex items-center gap-1 text-ink-500">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            فیلترها:
          </span>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="pending">در انتظار بررسی</option>
            <option value="in_review">در حال بررسی</option>
            <option value="answered">پاسخ داده شده</option>
            <option value="closed">بسته شده</option>
          </select>

          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value as FilterSource)}
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه منابع</option>
            <option value="registered">کاربران ثبت‌نام‌شده</option>
            <option value="guest">مهمان‌ها</option>
          </select>

          {(search || filterStatus !== "all" || filterSource !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilterStatus("all");
                setFilterSource("all");
              }}
              className="text-xs text-brand-600 hover:text-brand-700 underline"
            >
              پاک کردن فیلترها
            </button>
          )}
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
          <MessageSquare
            className="w-10 h-10 text-ink-300 mx-auto mb-3"
            aria-hidden="true"
          />
          <p className="text-sm text-ink-500">
            {items.length === 0
              ? "هنوز درخواستی ثبت نشده است."
              : "درخواستی با این فیلترها یافت نشد."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
          <div className="p-4 border-b border-ink-100 text-xs text-ink-500">
            نمایش {filtered.length} درخواست از کل {items.length}
          </div>
          <ul className="divide-y divide-ink-100">
            {filtered.map((item) => (
              <InquiryRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId(openId === item.id ? null : item.id)
                }
                onUpdated={async () => {
                  await loadData();
                  setToast({
                    type: "success",
                    message: "درخواست با موفقیت به‌روزرسانی شد.",
                  });
                }}
                onError={(msg) =>
                  setToast({ type: "error", message: msg })
                }
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------- کامپوننت‌های کمکی ----------

function StatBox({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof MessageSquare;
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

function InquiryRow({
  item,
  isOpen,
  onToggle,
  onUpdated,
  onError,
}: {
  item: InquiryWithUser;
  isOpen: boolean;
  onToggle: () => void;
  onUpdated: () => Promise<void>;
  onError: (msg: string) => void;
}) {
  const TypeIcon = typeIcons[item.type];
  const [reply, setReply] = useState(item.adminReply ?? "");
  const [newStatus, setNewStatus] = useState<InquiryStatus>(
    item.status === "pending" ? "in_review" : item.status
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await updateInquiryStatus(
        item.id,
        newStatus,
        reply.trim() || undefined
      );
      if (!res.ok) throw new Error(res.error || "خطا در ذخیره");
      await onUpdated();
    } catch (e) {
      onError(e instanceof Error ? e.message : "خطا در ذخیره پاسخ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <li>
      {/* ردیف اصلی */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-right p-4 sm:p-5 hover:bg-ink-100/40 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex w-10 h-10 rounded-xl bg-brand-50 text-brand-600 items-center justify-center shrink-0">
            <TypeIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium text-sm text-ink-800 truncate">
                {item.subject}
              </span>
              <span
                className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  statusClasses[item.status]
                }`}
              >
                {statusLabels[item.status]}
              </span>
              {item.isGuest && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                  <UserX className="w-3 h-3" aria-hidden="true" />
                  مهمان
                </span>
              )}
              {!item.isGuest && item.user && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-50 text-accent-600">
                  <UserCheck className="w-3 h-3" aria-hidden="true" />
                  {item.user.name}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
              <span className="num">کد: {item.id}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {formatDate(item.createdAt)}
              </span>
              <span>{typeLabels[item.type]}</span>
            </div>
            <p className="text-xs text-ink-500 mt-2 line-clamp-2">
              {item.message}
            </p>
          </div>
          <span className="shrink-0 text-ink-400">
            {isOpen ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </span>
        </div>
      </button>

      {/* بخش باز‌شده */}
      {isOpen && (
        <div className="border-t border-ink-100 bg-ink-100/30 p-4 sm:p-5 space-y-4">
          {/* اطلاعات فرستنده */}
          <div className="bg-white rounded-xl border border-ink-200 p-3 text-xs space-y-1.5">
            <div className="text-[10px] font-bold text-ink-500 mb-1">
              اطلاعات فرستنده
            </div>
            {item.isGuest ? (
              <div className="text-ink-600">
                این پیام از طرف کاربر مهمان ارسال شده (بدون حساب کاربری).
              </div>
            ) : item.user ? (
              <>
                <div className="flex items-center gap-1.5 text-ink-700">
                  <UserIcon
                    className="w-3 h-3 text-ink-400"
                    aria-hidden="true"
                  />
                  <span className="font-medium">{item.user.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-500" dir="ltr">
                  <Mail
                    className="w-3 h-3 text-ink-400"
                    aria-hidden="true"
                  />
                  {item.user.email}
                </div>
                <div className="flex items-center gap-1.5 text-ink-500" dir="ltr">
                  <Phone
                    className="w-3 h-3 text-ink-400"
                    aria-hidden="true"
                  />
                  {item.user.phone}
                </div>
              </>
            ) : (
              <div className="text-ink-500">
                اطلاعات کاربر یافت نشد (ممکن است حذف شده باشد).
              </div>
            )}
          </div>

          {/* متن کامل پیام */}
          <div className="bg-white rounded-xl border border-ink-200 p-3">
            <div className="text-[10px] font-bold text-ink-500 mb-1.5">
              متن کامل پیام
            </div>
            <p className="text-xs text-ink-700 leading-relaxed whitespace-pre-wrap">
              {item.message}
            </p>
          </div>

          {/* پاسخ فعلی */}
          {item.adminReply && (
            <div className="bg-accent-50 border border-accent-100 rounded-xl p-3">
              <div className="text-[10px] font-bold text-accent-700 mb-1.5 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" aria-hidden="true" />
                پاسخ قبلی کارشناس
              </div>
              <p className="text-xs text-accent-800 leading-relaxed whitespace-pre-wrap">
                {item.adminReply}
              </p>
            </div>
          )}

          {/* فرم پاسخ */}
          <div className="bg-white rounded-xl border border-ink-200 p-3 space-y-3">
            <div className="text-[10px] font-bold text-ink-500">
              {item.adminReply ? "ویرایش / پاسخ جدید" : "ثبت پاسخ"}
            </div>
            <textarea
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="پاسخ خود را بنویسید..."
              className="w-full text-xs rounded-lg border border-ink-200 p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-y min-h-[90px]"
            />

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs text-ink-600">تغییر وضعیت:</label>
              <select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(e.target.value as InquiryStatus)
                }
                className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
              >
                <option value="in_review">در حال بررسی</option>
                <option value="answered">پاسخ داده شده</option>
                <option value="closed">بسته شده</option>
              </select>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:bg-ink-300 text-white text-xs font-medium transition-colors ml-auto"
              >
                {saving ? (
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                {saving ? "در حال ذخیره..." : "ذخیره"}
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
