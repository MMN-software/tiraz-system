"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users as UsersIcon,
  Search,
  Filter,
  ShieldCheck,
  ShieldOff,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  User as UserIcon,
  Hospital,
  Stethoscope,
  FlaskConical,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import {
  fetchAllUsers,
  fetchUserStats,
  fetchUpdateUserStatus,
  fetchDeleteUser,
  type UserStats,
} from "@/lib/api/auth-repository";
import type { User, CustomerType, UserStatus } from "@/lib/types/auth";

// ---------- برچسب‌ها و آیکون‌ها ----------

const customerTypeLabels: Record<CustomerType, string> = {
  individual: "شخص حقیقی",
  company: "شرکت",
  hospital: "بیمارستان",
  clinic: "کلینیک",
  lab: "آزمایشگاه",
};

const customerTypeIcons: Record<CustomerType, typeof UserIcon> = {
  individual: UserIcon,
  company: Building2,
  hospital: Hospital,
  clinic: Stethoscope,
  lab: FlaskConical,
};

const statusLabels: Record<UserStatus, string> = {
  active: "فعال",
  pending: "در انتظار تأیید",
  blocked: "مسدود",
};

const statusClasses: Record<UserStatus, string> = {
  active: "bg-accent-50 text-accent-600 border-accent-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  blocked: "bg-red-50 text-red-600 border-red-200",
};

type FilterType = "all" | CustomerType;
type FilterStatus = "all" | UserStatus;
type FilterRole = "all" | "customer" | "admin";

// ---------- کامپوننت ----------

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterRole, setFilterRole] = useState<FilterRole>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadData() {
    setLoading(true);
    const [all, s] = await Promise.all([
      fetchAllUsers(),
      fetchUserStats(),
    ]);
    setUsers(all);
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

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (filterRole !== "all" && u.role !== filterRole) return false;
      if (filterStatus !== "all" && u.status !== filterStatus) return false;
      if (filterType !== "all" && u.customerType !== filterType) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
      );
    });
  }, [users, search, filterType, filterStatus, filterRole]);

  async function handleToggleBlock(user: User) {
    setActionLoading(user.id);
    try {
      const newStatus: UserStatus =
        user.status === "blocked" ? "active" : "blocked";
      const res = await fetchUpdateUserStatus(user.id, newStatus);
      if (!res.ok) throw new Error(res.error || "خطا");
      await loadData();
      setToast({
        type: "success",
        message:
          newStatus === "blocked"
            ? "کاربر با موفقیت مسدود شد."
            : "کاربر از حالت مسدود خارج شد.",
      });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا در انجام عملیات",
      });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(user: User) {
    if (
      !confirm(
        `آیا از حذف کاربر «${user.name}» مطمئن هستید؟ این عملیات بازگشت‌پذیر نیست.`
      )
    )
      return;

    setActionLoading(user.id);
    try {
      const res = await fetchDeleteUser(user.id);
      if (!res.ok) throw new Error(res.error || "خطا در حذف");
      await loadData();
      setToast({ type: "success", message: "کاربر با موفقیت حذف شد." });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا در حذف کاربر",
      });
    } finally {
      setActionLoading(null);
    }
  }

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-brand-700 flex items-center gap-2">
            <UsersIcon className="w-5 h-5" aria-hidden="true" />
            مدیریت کاربران
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            مشاهده، فیلتر، مسدودسازی و حذف کاربران سیستم
          </p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="کل کاربران"
            value={stats.total}
            color="text-brand-700 bg-brand-50"
            icon={UsersIcon}
          />
          <StatCard
            label="مشتریان"
            value={stats.customers}
            color="text-accent-600 bg-accent-50"
            icon={UserIcon}
          />
          <StatCard
            label="مدیران"
            value={stats.admins}
            color="text-amber-600 bg-amber-50"
            icon={ShieldCheck}
          />
          <StatCard
            label="در انتظار تأیید"
            value={stats.pending}
            color="text-red-600 bg-red-50"
            icon={Clock}
          />
        </div>
      )}

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
            placeholder="جست‌وجو بر اساس نام، ایمیل یا شماره موبایل..."
            className="w-full h-11 pr-10 pl-3 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="flex items-center gap-1 text-ink-500">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            فیلترها:
          </span>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as FilterRole)}
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه نقش‌ها</option>
            <option value="customer">مشتری</option>
            <option value="admin">مدیر</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه انواع حساب</option>
            <option value="individual">شخص حقیقی</option>
            <option value="company">شرکت</option>
            <option value="hospital">بیمارستان</option>
            <option value="clinic">کلینیک</option>
            <option value="lab">آزمایشگاه</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="h-9 px-2 rounded-lg border border-ink-200 bg-white text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="pending">در انتظار تأیید</option>
            <option value="blocked">مسدود</option>
          </select>

          {(search ||
            filterRole !== "all" ||
            filterType !== "all" ||
            filterStatus !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilterRole("all");
                setFilterType("all");
                setFilterStatus("all");
              }}
              className="text-xs text-brand-600 hover:text-brand-700 underline"
            >
              پاک کردن فیلترها
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 flex items-center justify-center gap-3">
          <Loader2
            className="w-5 h-5 text-brand-600 animate-spin"
            aria-hidden="true"
          />
          <span className="text-sm text-ink-500">در حال بارگذاری...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
          <UsersIcon
            className="w-10 h-10 text-ink-300 mx-auto mb-3"
            aria-hidden="true"
          />
          <p className="text-sm text-ink-500">
            {users.length === 0
              ? "هنوز کاربری ثبت‌نام نکرده است."
              : "کاربری با این فیلترها یافت نشد."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
          <div className="p-4 border-b border-ink-100 flex items-center justify-between">
            <span className="text-xs text-ink-500">
              نمایش {filteredUsers.length} کاربر از کل {users.length}
            </span>
          </div>
          <ul className="divide-y divide-ink-100">
            {filteredUsers.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                busy={actionLoading === u.id}
                onToggleBlock={() => handleToggleBlock(u)}
                onDelete={() => handleDelete(u)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------- کامپوننت‌های کمکی ----------

function StatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof UserIcon;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-4">
      <span
        className={`inline-flex w-9 h-9 mb-2 rounded-xl ${color} items-center justify-center`}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="text-xl font-extrabold text-ink-800 num">{value}</div>
      <div className="text-xs text-ink-500 mt-0.5">{label}</div>
    </div>
  );
}

function isUserOnline(lastSeenAt: string | undefined | null): boolean {
  const diff = Date.now() - new Date(lastSeenAt as string).getTime();
  return diff < 2 * 60 * 1000; // کمتر از ۲ دقیقه
}

function UserRow({
  user,
  busy,
  onToggleBlock,
  onDelete,
}: {
  user: User;
  busy: boolean;
  onToggleBlock: () => void;
  onDelete: () => void;
}) {
  const isAdmin = user.role === "admin";
  const TypeIcon = user.customerType
    ? customerTypeIcons[user.customerType]
    : UserIcon;

  return (
    <li className="p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span
            className={`inline-flex w-11 h-11 rounded-2xl items-center justify-center text-base font-bold shrink-0 ${
              isAdmin
                ? "bg-amber-100 text-amber-700"
                : "bg-brand-100 text-brand-700"
            }`}
          >
            {user.name.trim().charAt(0) || "؟"}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isUserOnline(user.lastSeenAt)
                      ? "bg-accent-500 animate-pulse"
                      : "bg-ink-300"
                  }`}
                  title={isUserOnline(user.lastSeenAt) ? "آنلاین" : "آفلاین"}
                  aria-label={isUserOnline(user.lastSeenAt) ? "آنلاین" : "آفلاین"}
                />
                <span className="font-bold text-sm text-ink-800 truncate">
                  {user.name}
                </span>
              </span>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  مدیر
                </span>
              )}
              {!isAdmin && user.customerType && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-ink-100 text-ink-600">
                  <TypeIcon className="w-3 h-3" aria-hidden="true" />
                  {customerTypeLabels[user.customerType]}
                </span>
              )}
              <span
                className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  statusClasses[user.status]
                }`}
              >
                {statusLabels[user.status]}
              </span>
            </div>

            {user.organizationName && (
              <p className="text-xs text-ink-500 mb-1 truncate">
                {user.organizationName}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
              <span className="inline-flex items-center gap-1" dir="ltr">
                <Mail className="w-3 h-3" aria-hidden="true" />
                {user.email}
              </span>
              <span className="inline-flex items-center gap-1" dir="ltr">
                <Phone className="w-3 h-3" aria-hidden="true" />
                {user.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:shrink-0">
          {!isAdmin && (
            <>
              <button
                type="button"
                onClick={onToggleBlock}
                disabled={busy}
                className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  user.status === "blocked"
                    ? "bg-accent-50 text-accent-600 hover:bg-accent-100 border border-accent-200"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                {user.status === "blocked" ? (
                  <>
                    <CheckCircle2
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    />
                    فعال‌سازی
                  </>
                ) : (
                  <>
                    <ShieldOff
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    />
                    مسدودسازی
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onDelete}
                disabled={busy}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                حذف
              </button>
            </>
          )}

          {isAdmin && (
            <span className="inline-flex items-center gap-1.5 h-9 px-3 text-xs text-ink-400">
              <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
              غیرقابل تغییر
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
