"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const stats = [
  { icon: Package, value: "۳", label: "درخواست فعال", color: "text-brand-600 bg-brand-50" },
  { icon: MessageSquare, value: "۸", label: "پیام ارسالی", color: "text-accent-500 bg-accent-50" },
  { icon: Heart, value: "۱۲", label: "علاقه‌مندی", color: "text-amber-500 bg-amber-50" },
];

const recentRequests = [
  { id: "RQ-1042", subject: "درخواست قیمت ونتیلاتور TZ-VN-200", date: "۱۴۰۴/۰۷/۱۵", status: "در بررسی" },
  { id: "RQ-1041", subject: "مشاوره خرید میکروسکوپ بیولوژیک", date: "۱۴۰۴/۰۷/۱۰", status: "پاسخ داده شده" },
  { id: "RQ-1038", subject: "پیگیری سرویس دوره‌ای اسپکتروفتومتر", date: "۱۴۰۴/۰۷/۰۵", status: "بسته شده" },
];

const menuItems = [
  { icon: User, label: "اطلاعات حساب", href: "/profile/account" },
  { icon: Package, label: "درخواست‌های من", href: "/profile/requests" },
  { icon: Heart, label: "علاقه‌مندی‌ها", href: "/profile/favorites" },
  { icon: MessageSquare, label: "پیام‌ها", href: "/profile/messages" },
  { icon: Settings, label: "تنظیمات حساب", href: "/profile/settings" },
];

export default function ProfilePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "پنل کاربری" }]} />

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* سایدبار */}
            <aside className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
              <div className="p-5 border-b border-ink-100 flex items-center gap-3">
                <span className="inline-flex w-12 h-12 rounded-2xl bg-brand-600 text-white items-center justify-center text-lg font-bold">
                  ع
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-brand-700 truncate">
                    علی محمدی
                  </p>
                  <p className="text-xs text-ink-500 truncate num" dir="ltr">
                    09123456789
                  </p>
                </div>
              </div>
              <nav aria-label="منوی پنل کاربری" className="p-2">
                {menuItems.map((item, i) => (
                  <Link
                    key={i}
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
                  سلام، علی 👋
                </h1>
                <p className="text-sm text-white/80 leading-relaxed">
                  به پنل کاربری خود خوش آمدید. از اینجا می‌توانید
                  درخواست‌های خود را پیگیری کنید.
                </p>
              </div>

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
                    href="#"
                    className="text-xs text-accent-500 hover:text-accent-600"
                  >
                    مشاهده همه
                  </Link>
                </div>
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
                              <Clock className="w-3 h-3" aria-hidden="true" />
                              {r.date}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`self-start sm:self-auto inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            r.status === "در بررسی"
                              ? "bg-amber-50 text-amber-600"
                              : r.status === "پاسخ داده شده"
                              ? "bg-accent-50 text-accent-600"
                              : "bg-ink-100 text-ink-500"
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* راهنما */}
              <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-5 text-xs text-ink-500 leading-relaxed">
                این یک پنل نمایشی است. در نسخه نهایی، اطلاعات واقعی از دیتابیس
                خوانده می‌شود و امکان ویرایش پروفایل، مشاهده سفارش‌ها و مدیریت
                علاقه‌مندی‌ها فراهم خواهد بود.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
