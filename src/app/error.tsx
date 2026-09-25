"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // در آینده به سرویس لاگ متصل می‌شود
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <span className="inline-flex w-20 h-20 rounded-3xl bg-red-50 border border-red-100 text-red-500 items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10" aria-hidden="true" />
          </span>

          <h1 className="text-xl sm:text-2xl font-bold text-brand-700 mb-3">
            خطایی رخ داد
          </h1>

          <p className="text-sm sm:text-base text-ink-500 leading-loose mb-8">
            متأسفانه در بارگذاری این صفحه خطایی پیش آمد. لطفاً یک‌بار دیگر
            تلاش کنید یا به صفحه اصلی بازگردید.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              تلاش مجدد
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-ink-50 text-brand-700 font-medium rounded-xl border border-ink-200 transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              صفحه اصلی
            </Link>
          </div>

          {error.digest && (
            <p className="text-[10px] text-ink-400 mt-8 num">
              کد خطا: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
