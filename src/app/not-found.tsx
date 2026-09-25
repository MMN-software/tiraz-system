import Link from "next/link";
import { Home, Search, Phone, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-bl from-brand-50 via-white to-accent-50 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <span className="inline-flex w-20 h-20 rounded-3xl bg-white border border-ink-200 text-accent-500 items-center justify-center mb-6 shadow-sm">
            <AlertCircle className="w-10 h-10" aria-hidden="true" />
          </span>

          <div className="text-7xl sm:text-8xl font-extrabold text-brand-700 mb-4 num">
            ۴۰۴
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-brand-700 mb-3">
            صفحه‌ای که دنبالش بودید پیدا نشد
          </h1>

          <p className="text-sm sm:text-base text-ink-500 leading-loose mb-8">
            ممکن است آدرس اشتباه وارد شده باشد یا این صفحه حذف شده باشد.
            می‌توانید از طریق دکمه‌های زیر ادامه دهید.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              بازگشت به صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-ink-50 text-brand-700 font-medium rounded-xl border border-ink-200 transition-colors"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              جست‌وجوی محصولات
            </Link>
          </div>

          <div className="mt-10 pt-6 border-t border-ink-200">
            <p className="text-xs text-ink-500 mb-3">
              نیاز به کمک فوری دارید؟
            </p>
            <a
              href="tel:+982112345678"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors num"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
