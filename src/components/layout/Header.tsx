"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Phone,
  Mail,
  User,
  ChevronLeft,
} from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "درباره ما", href: "/about" },
  { label: "محصولات", href: "/products" },
  { label: "اخبار و مقالات", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-ink-200">
      {/* نوار بالایی */}
      <div className="hidden md:block bg-brand-700 text-white text-xs">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+982112345678"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
              aria-label="تماس تلفنی"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="num">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            <a
              href="mailto:info@tiraz-system.ir"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
              aria-label="ایمیل"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>info@tiraz-system.ir</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              ورود / ثبت‌نام
            </Link>
          </div>
        </div>
      </div>

      {/* نوار اصلی */}
      <div className="container mx-auto px-4">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4">
          <Logo size="md" />

          {/* منوی دسکتاپ */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="منوی اصلی"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-ink-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* اکشن‌ها */}
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              aria-label="جست‌وجو در محصولات"
              className="hidden sm:flex items-center gap-2 px-3 h-10 bg-ink-100 hover:bg-ink-200 text-ink-600 rounded-lg text-sm transition-colors"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span className="hidden md:inline">جست‌وجو...</span>
            </Link>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 h-10 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-medium rounded-lg transition-colors"
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
      </div>

      {/* منوی موبایل (drawer) */}
      {open && (
        <>
          {/* پس‌زمینه تیره */}
          <div
            className="lg:hidden fixed inset-0 top-16 bg-ink-900/40 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* پنل منو */}
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

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-ink-200">
                <a
                  href="tel:+982112345678"
                  className="flex items-center gap-2 text-sm text-ink-700 py-2"
                >
                  <Phone className="w-4 h-4 text-brand-600" aria-hidden="true" />
                  <span className="num">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </a>
                <a
                  href="mailto:info@tiraz-system.ir"
                  className="flex items-center gap-2 text-sm text-ink-700 py-2"
                >
                  <Mail className="w-4 h-4 text-brand-600" aria-hidden="true" />
                  <span>info@tiraz-system.ir</span>
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
                    className="text-center text-sm font-medium py-2.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
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
