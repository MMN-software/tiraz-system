"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MessageSquare,
  Settings,
  Construction,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface SectionInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const sectionInfo: Record<string, SectionInfo> = {
  account: {
    icon: User,
    title: "اطلاعات حساب",
    desc: "در این بخش می‌توانید نام، ایمیل، شماره موبایل و سایر اطلاعات حساب خود را مشاهده و ویرایش کنید.",
  },
  requests: {
    icon: Package,
    title: "درخواست‌های من",
    desc: "لیست کامل درخواست‌های ثبت‌شده، وضعیت بررسی و تاریخچه مکاتبات با کارشناسان ما.",
  },
  favorites: {
    icon: Heart,
    title: "علاقه‌مندی‌ها",
    desc: "محصولاتی که ذخیره کرده‌اید تا بعداً بررسی یا خریداری کنید.",
  },
  messages: {
    icon: MessageSquare,
    title: "پیام‌ها",
    desc: "پیام‌های ارسالی و دریافتی از کارشناسان تیرازیستر ایرانیان.",
  },
  settings: {
    icon: Settings,
    title: "تنظیمات حساب",
    desc: "تنظیمات امنیتی، اعلان‌ها و ترجیحات ارتباطی حساب کاربری شما.",
  },
};

const menuItems = [
  { href: "/profile", label: "بازگشت به پنل" },
  { href: "/profile/account", label: "اطلاعات حساب" },
  { href: "/profile/requests", label: "درخواست‌های من" },
  { href: "/profile/favorites", label: "علاقه‌مندی‌ها" },
  { href: "/profile/messages", label: "پیام‌ها" },
  { href: "/profile/settings", label: "تنظیمات حساب" },
];

export default function ProfileSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const info = sectionInfo[section];

  if (!info) {
    return (
      <>
        <Breadcrumb
          items={[
            { label: "پنل کاربری", href: "/profile" },
            { label: "بخش نامعتبر" },
          ]}
        />
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-xl font-bold text-brand-700 mb-3">
              این بخش وجود ندارد
            </h1>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              بازگشت به پنل کاربری
            </Link>
          </div>
        </section>
      </>
    );
  }

  const Icon = info.icon;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "پنل کاربری", href: "/profile" },
          { label: info.title },
        ]}
      />

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
                {menuItems.map((item, i) => {
                  const isActive = item.href === `/profile/${section}`;
                  const isBack = item.href === "/profile";
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-brand-600 text-white font-medium"
                          : isBack
                          ? "text-ink-500 hover:bg-ink-100"
                          : "text-ink-700 hover:bg-brand-50 hover:text-brand-700"
                      }`}
                    >
                      {isBack && (
                        <ArrowLeft
                          className="w-4 h-4"
                          aria-hidden="true"
                        />
                      )}
                      <span className="flex-1">{item.label}</span>
                      {!isBack && (
                        <ChevronLeft
                          className={`w-3.5 h-3.5 ${
                            isActive ? "text-white/70" : "text-ink-300"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* محتوا */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-10 text-center">
                <span className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 items-center justify-center mb-5">
                  <Icon className="w-8 h-8" />
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-brand-700 mb-3">
                  {info.title}
                </h1>
                <p className="text-sm text-ink-500 leading-loose max-w-xl mx-auto mb-6">
                  {info.desc}
                </p>

                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-2 rounded-full">
                  <Construction className="w-3.5 h-3.5" aria-hidden="true" />
                  این بخش در نسخه بعدی تکمیل می‌شود
                </div>
              </div>

              <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-5 text-xs text-ink-500 leading-relaxed">
                در نسخه نهایی، این بخش به دیتابیس متصل می‌شود و امکان
                مشاهده، ویرایش و مدیریت اطلاعات فراهم خواهد بود.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
