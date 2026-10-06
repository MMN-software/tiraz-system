"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  Mail,
  User,
  ChevronLeft,
  Heart,
} from "lucide-react";
import { Logo } from "./Logo";
import { useWishlist } from "@/components/common/Wishlist";
import { SearchBox } from "@/components/common/SearchBox";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "درباره ما", href: "/about" },
  { label: "محصولات", href: "/products" },
  { label: "اخبار و مقالات", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, ready } = useWishlist();
  const showCount = ready && count > 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-ink-200">
      <div className="hidden md:block bg-brand-700 text-white text-xs">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+982112345678"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors duration-300"
              aria-label="تماس تلفنی"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="num">۰۹۹۶۳۸۰۲۹۵۷</span>
            </a>
            <a
              href="mailto:mohamadmehdi.neemati@gmail.com"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors duration-300"
              aria-label="ایمیل"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>mohamadmehdi.neemati@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors duration-300"
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              ورود / ثبت‌نام
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="h-16 md:h-20 flex items-center gap-3 lg:gap-6">
          <Logo size="md" />

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="منوی اصلی"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="motion-underline px-3 py-2 text-sm font-medium text-ink-700 hover:text-brand-600 rounded-lg transition-colors motion-reduce:transition-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Box — روی دسکتاپ و تبلت */}
          <div className="hidden md:block flex-1 max-w-sm ml-auto">
            <SearchBox />
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* لیست علاقه‌مندی */}
            <Link
              href="/wishlist"
              aria-label={`علاقه‌مندی‌ها${showCount ? ` (${count} مورد)` : ""}`}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              {showCount && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center num">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className="motion-shimmer hidden xl:inline-flex items-center gap-2 h-10 px-4 bg-gold-500 hover:bg-gold-400 text-ink-900 text-sm font-bold rounded-lg transition-colors"
            >
              درخواست مشاوره
            </Link>

            <button
              type="button"
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 transition-colors"
            >
              {open ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Search Box روی موبایل — زیر هدر */}
        <div className="md:hidden pb-3">
          <SearchBox />
        </div>
      </div>

      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-16 bg-ink-900/40 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed top-16 right-0 left-0 bg-white border-b border-ink-200 shadow-lg z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav
              className="container mx-auto px-4 py-3 flex flex-col"
              aria-label="منوی موبایل"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 px-2 text-ink-800 hover:text-brand-600 border-b border-ink-100 last:border-b-0"
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronLeft
                    className="w-4 h-4 text-ink-400"
                    aria-hidden="true"
                  />
                </Link>
              ))}

              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 px-2 text-ink-800 hover:text-red-500 border-b border-ink-100"
              >
                <span className="font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  علاقه‌مندی‌ها
                  {showCount && (
                    <span className="inline-flex min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold items-center justify-center num">
                      {count.toLocaleString("fa-IR")}
                    </span>
                  )}
                </span>
                <ChevronLeft
                  className="w-4 h-4 text-ink-400"
                  aria-hidden="true"
                />
              </Link>

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-ink-200">
                <a
                  href="tel:+982112345678"
                  className="flex items-center gap-2 text-sm text-ink-700 py-2"
                >
                  <Phone className="w-4 h-4 text-brand-600" aria-hidden="true" />
                  <span className="num">۰۹۹۶۳۸۰۲۹۵۷</span>
                </a>
                <a
                  href="mailto:mohamadmehdi.neemati@gmail.com"
                  className="flex items-center gap-2 text-sm text-ink-700 py-2"
                >
                  <Mail className="w-4 h-4 text-brand-600" aria-hidden="true" />
                  <span>mohamadmehdi.neemati@gmail.com</span>
                </a>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center text-sm font-medium py-2.5 rounded-lg bg-ink-100 text-ink-700 hover:bg-ink-200 transition-colors"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="text-center text-sm font-bold py-2.5 rounded-lg bg-gold-500 text-ink-900 hover:bg-gold-400 transition-colors"
                  >
                    مشاوره
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
