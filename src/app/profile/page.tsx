"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  Clock,
  ChevronLeft,
  Building2,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useAuth } from "@/lib/auth-context";

const stats = [
  {
    icon: Package,
    value: "۰",
    label: "درخواست فعال",
    color: "text-brand-600 bg-brand-50",
  },
  {
    icon: MessageSquare,
    value: "۰",
    label: "پیام ارسالی",
    color: "text-accent-500 bg-accent-50",
  },
  {
    icon: Heart,
    value: "۰",
    label: "علاقه‌مندی",
    color: "text-amber-500 bg-amber-50",
  },
];

const recentRequests: {
  id: string;
  subject: string;
  date: string;
  status: string;
}[] = [];

const menuItems = [
  { icon: User, label: "اطلاعات حساب", href: "/profile/account" },
  { icon: Package, label: "درخواست‌های من", href: "/profile/requests" },
  { icon: Heart, label: "علاقه‌مندی‌ها", href: "/profile/favorites" },
  { icon: MessageSquare, label: "پیام‌ها", href: "/profile/messages" },
  { icon: Settings, label: "تنظیمات حساب", href: "/profile/settings" },
];

const customerTypeLabels: Record<string, string> = {
  individual: "شخص حقیقی",
  company: "شرکت",
  hospital: "بیمارستان",
  clinic: "کلینیک",
  lab: "آزمایشگاه",
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  // حرف اول نام کاربر برای آواتار
  const initial = user?.name?.trim()?.charAt(0) ?? "ک";
  const displayName = user?.name ?? "کاربر";
  const displayPhone = user?.phone ?? "";
  const typeLabel = user?.customerType
    ? customerTypeLabels[user.customerType] ?? ""
    : "";

  return (
    <>
      <Breadcrumb items={[{ label: "پنل کاربری" }]} />

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* سایدبار */}
            <aside className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
              <div className="p-5 border-b border-ink-100 flex items-center gap-3">
                <span className="inline-flex w-12 h-12 rounded-2xl bg-brand-600 text-white items-center justify-center text-lg font-bold shrink-0">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-brand-700 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-ink-500 truncate num" dir="ltr">
                    {displayPhone}
                  </p>
                  {typeLabel && (
                    <p className="text-[10px] text-accent-500 mt-0.5 truncate">
                      {typeLabel}
                    </p>
                  )}
                </div>
              </div>
              <nav aria-label="منوی پنل کاربری" className="p-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-ink-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    <item.icon
                      className="w-4 h-4 text-ink-400"
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.label}</span>
                    <ChevronLeft
                      className="w-3.5 h-3.5 text-ink-300"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-ink-100 pt-3"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>خروج از حساب</span>
                </button>
              </nav>
            </aside>

            {/* محتوا */}
            <div className="space-y-5">
              {/* خوش‌آمد */}
              <div className="bg-gradient-to-l from-brand-700 to-brand-600 text-white rounded-2xl p-6">
                <h1 className="text-lg sm:text-xl font-bold mb-1">
                  سلام، {displayName}
                </h1>
                <p className="text-sm text-white/80 leading-relaxed">
                  به پنل کاربری خود خوش آمدید. از اینجا می‌توانید
                  درخواست‌های خود را پیگیری کنید.
                </p>
              </div>

              {/* اطلاعات حساب */}
              {user && (
                <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
                  <div className="p-5 border-b border-ink-100">
                    <h2 className="font-bold text-brand-700">
                      اطلاعات حساب
                    </h2>
                  </div>
                  <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-ink-400 mb-1">نام</div>
                      <div className="text-ink-800">{user.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-400 mb-1">
                        نوع حساب
                      </div>
                      <div className="text-ink-800">
                        {typeLabel || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-400 mb-1">
                        شماره موبایل
                      </div>
                      <div className="text-ink-800 num" dir="ltr">
                        {user.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-400 mb-1">ایمیل</div>
                      <div className="text-ink-800" dir="ltr">
                        {user.email}
                      </div>
                    </div>
                    {user.organizationName && (
                      <div className="sm:col-span-2">
                        <div className="text-xs text-ink-400 mb-1 flex items-center gap-1">
                          <Building2
                            className="w-3 h-3"
                            aria-hidden="true"
                          />
                          نام سازمان / مرکز
                        </div>
                        <div className="text-ink-800">
                          {user.organizationName}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* آمار */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-ink-200 p-4 text-center"
                  >
                    <span
                      className={`inline-flex w-10 h-10 mb-2 rounded-xl ${s.color} items-center justify-center`}
                    >
                      <s.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="text-xl font-extrabold text-brand-700 num">
                      {s.value}
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* درخواست‌های اخیر */}
              <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
                <div className="p-5 border-b border-ink-100 flex items-center justify-between">
                  <h2 className="font-bold text-brand-700">
                    درخواست‌های اخیر
                  </h2>
                  <Link
                    href="/profile/requests"
                    className="text-xs text-accent-500 hover:text-accent-600"
                  >
                    مشاهده همه
                  </Link>
                </div>
                {recentRequests.length === 0 ? (
                  <div className="p-8 text-center">
                    <span className="inline-flex w-14 h-14 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-3">
                      <Package className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <p className="text-sm text-ink-500">
                      هنوز درخواستی ثبت نکرده‌اید.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block mt-3 text-xs font-medium text-brand-600 hover:text-brand-700"
                    >
                      ثبت اولین درخواست
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-ink-100">
                    {recentRequests.map((r) => (
                      <li key={r.id} className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-ink-800 mb-1 truncate">
                              {r.subject}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-ink-400">
                              <span className="num">کد: {r.id}</span>
                              <span className="flex items-center gap-1">
                                <Clock
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                                {r.date}
                              </span>
                            </div>
                          </div>
                          <span className="self-start sm:self-auto inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-ink-100 text-ink-500">
                            {r.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
