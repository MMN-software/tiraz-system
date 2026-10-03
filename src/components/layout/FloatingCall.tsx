"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingCall() {
  const pathname = usePathname();
  // در صفحه جزئیات محصول، نوار پایین مخفی می‌شه چون StickyProductActions جایگزینش می‌شه
  const isProductDetail =
    pathname.startsWith("/products/") && pathname !== "/products";

  return (
    <>
      {/* فقط موبایل: نوار پایین با دو دکمه */}
      {!isProductDetail && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-ink-200 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+982112345678"
              className="flex items-center justify-center gap-2 h-11 rounded-lg bg-brand-600 text-white text-sm font-bold active:bg-brand-700 transition-colors"
              aria-label="تماس تلفنی"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              تماس فوری
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 h-11 rounded-lg bg-coral-500 text-white text-sm font-bold active:bg-coral-600 transition-colors"
              aria-label="درخواست مشاوره"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              مشاوره
            </a>
          </div>
        </div>
      )}

      {/* فقط دسکتاپ: دکمه گرد شناور */}
      <a
        href="tel:+982112345678"
        aria-label="تماس تلفنی"
        className="hidden sm:flex fixed bottom-6 left-6 z-30 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 items-center justify-center transition-all duration-300"
      >
        <Phone className="w-6 h-6" aria-hidden="true" />
      </a>
    </>
  );
}
