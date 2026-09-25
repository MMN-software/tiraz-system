import Link from "next/link";
import {
  Package,
  FileText,
  Layers,
  Award,
  ArrowLeft,
  TrendingUp,
  Clock,
} from "lucide-react";
import { getDashboardStats } from "@/lib/api/repository";

export const metadata = {
  title: "داشبورد مدیریت",
};

const recentActivity = [
  {
    type: "product",
    text: "محصول «دستگاه ونتیلاتور پیشرفته» بازدید شد",
    time: "۵ دقیقه پیش",
  },
  {
    type: "message",
    text: "درخواست جدید از طرف «علی محمدی»",
    time: "۲۰ دقیقه پیش",
  },
  {
    type: "article",
    text: "مقاله «راهنمای انتخاب ونتیلاتور» منتشر شد",
    time: "۱ ساعت پیش",
  },
  {
    type: "message",
    text: "پیام جدید از «شرکت پارس طب»",
    time: "۳ ساعت پیش",
  },
];

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      icon: Package,
      label: "محصولات",
      value: stats.productCount,
      color: "bg-brand-50 text-brand-600",
      href: "/admin/products",
    },
    {
      icon: FileText,
      label: "مقالات",
      value: stats.articleCount,
      color: "bg-accent-50 text-accent-500",
      href: "/admin/articles",
    },
    {
      icon: Layers,
      label: "دسته‌بندی‌ها",
      value: stats.categoryCount,
      color: "bg-amber-50 text-amber-500",
      href: "/admin/categories",
    },
    {
      icon: Award,
      label: "برندها",
      value: stats.brandCount,
      color: "bg-purple-50 text-purple-500",
      href: "/admin/products",
    },
  ];

  return (
    <div className="space-y-5">
      {/* خوش‌آمد */}
      <div className="bg-gradient-to-l from-brand-700 to-brand-600 text-white rounded-2xl p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
          خوش آمدید 👋
        </h1>
        <p className="text-sm text-white/80 leading-relaxed">
          نمای کلی از وضعیت محتوای سایت. برای مدیریت هر بخش از منوی کنار
          استفاده کنید.
        </p>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="bg-white rounded-2xl border border-ink-200 p-4 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex w-10 h-10 rounded-xl ${c.color} items-center justify-center`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <ArrowLeft
                  className="w-4 h-4 text-ink-300 group-hover:text-brand-600 group-hover:-translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </div>
              <div className="text-2xl font-extrabold text-brand-700 num">
                {c.value.toLocaleString("fa-IR")}
              </div>
              <div className="text-xs text-ink-500 mt-1">{c.label}</div>
            </Link>
          );
        })}
      </div>

      {/* فعالیت‌های اخیر + میانبر */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        {/* فعالیت‌ها */}
        <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
          <div className="p-5 border-b border-ink-100 flex items-center justify-between">
            <h2 className="font-bold text-brand-700 flex items-center gap-2">
              <TrendingUp
                className="w-4 h-4 text-accent-500"
                aria-hidden="true"
              />
              فعالیت‌های اخیر
            </h2>
          </div>
          <ul className="divide-y divide-ink-100">
            {recentActivity.map((a, i) => (
              <li key={i} className="p-4 flex items-start gap-3">
                <span
                  className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    a.type === "product"
                      ? "bg-brand-500"
                      : a.type === "article"
                      ? "bg-accent-500"
                      : "bg-amber-500"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink-700 leading-relaxed mb-1">
                    {a.text}
                  </p>
                  <span className="text-xs text-ink-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {a.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* میان‌برها */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-ink-200 p-5">
            <h3 className="font-bold text-brand-700 mb-3 text-sm">
              میان‌برها
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/products"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm transition-colors"
              >
                <Package className="w-4 h-4" aria-hidden="true" />
                مدیریت محصولات
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-accent-50 hover:bg-accent-100 text-accent-600 text-sm transition-colors"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                مدیریت مقالات
              </Link>
              <Link
                href="/admin/messages"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm transition-colors"
              >
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                پیام‌های دریافتی
              </Link>
            </div>
          </div>

          <div className="bg-brand-700 text-white rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-2">راهنما</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              این پنل در حال حاضر با داده‌های نمونه کار می‌کند. برای اتصال
              به دیتابیس واقعی، فقط فایل
              <code className="mx-1 px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                src/lib/api/repository.ts
              </code>
              باید به‌روزرسانی شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
