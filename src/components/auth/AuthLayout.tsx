import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Truck } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-ink-50">
      {/* فرم */}
      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-brand-600 transition-colors mb-6"
          >
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            بازگشت به صفحه اصلی
          </Link>

          <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-extrabold text-brand-700 mb-1">
              {title}
            </h1>
            <p className="text-sm text-ink-500 mb-6 leading-relaxed">
              {subtitle}
            </p>

            {children}
          </div>

          {footer && (
            <div className="mt-4 text-center text-xs text-ink-500">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* بخش تبلیغاتی (فقط دسکتاپ) */}
      <div className="hidden lg:flex bg-gradient-to-bl from-brand-700 to-brand-600 text-white p-12 relative overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative self-center max-w-md">
          <span className="inline-block text-xs font-bold text-accent-400 mb-3 tracking-wider">
            تیرازیس طب ایرانیان
          </span>
          <h2 className="text-3xl font-extrabold leading-tight mb-4">
            حساب کاربری خود را داشته باشید
          </h2>
          <p className="text-white/80 leading-loose mb-8">
            با ساخت حساب کاربری، می‌توانید درخواست‌های خود را پیگیری کنید،
            لیست علاقه‌مندی بسازید و به تاریخچه سفارش‌ها دسترسی داشته باشید.
          </p>

          <div className="space-y-4">
            {[
              { icon: ShieldCheck, text: "اطلاعات شما نزد ما امن است" },
              { icon: Award, text: "دسترسی سریع به تاریخچه سفارش‌ها" },
              { icon: Truck, text: "پیگیری لحظه‌ای وضعیت درخواست‌ها" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="inline-flex w-9 h-9 shrink-0 rounded-xl bg-white/10 text-accent-400 items-center justify-center">
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
