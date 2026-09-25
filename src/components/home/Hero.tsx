import Link from "next/link";
import { ArrowLeft, ShieldCheck, Award, Truck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-brand-50 via-white to-accent-50">
      {/* گرافیک پس‌زمینه */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0f3d5c 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative mx-auto px-4 py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* متن */}
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 bg-white text-brand-700 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-brand-100 shadow-sm mb-5">
              <ShieldCheck
                className="w-4 h-4 text-accent-500"
                aria-hidden="true"
              />
              تأمین‌کننده معتبر تجهیزات تخصصی
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-700 leading-[1.3] mb-5">
              تجهیزات پزشکی، آزمایشگاهی
              <br />
              و صنعتی با
              <span className="text-accent-500"> کیفیت تضمین‌شده</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-600 leading-loose mb-8 max-w-xl mx-auto lg:mx-0">
              تیرازیستر ایرانیان با سال‌ها تجربه در تأمین، تولید و پشتیبانی
              تجهیزات تخصصی، همراه مطمئن مراکز درمانی، آزمایشگاهی و صنعتی در
              سراسر کشور است.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium rounded-xl transition-colors shadow-sm"
              >
                مشاهده محصولات
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-ink-50 text-brand-700 font-medium rounded-xl border border-ink-200 transition-colors"
              >
                درخواست مشاوره رایگان
              </Link>
            </div>

            {/* اعتمادسازها */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5 max-w-md mx-auto lg:mx-0">
              {[
                { icon: ShieldCheck, label: "ضمانت اصالت" },
                { icon: Award, label: "گواهی کیفیت" },
                { icon: Truck, label: "ارسال سریع" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <span className="w-10 h-10 rounded-full bg-white border border-ink-200 flex items-center justify-center text-brand-600">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs sm:text-sm text-ink-700 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* گرافیک سمت چپ */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-accent-500 rounded-3xl rotate-3 opacity-10" />
              <div className="absolute inset-0 bg-white rounded-3xl border border-ink-200 shadow-xl flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-100 rounded-full blur-3xl opacity-60" />
                <div className="relative text-center px-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      className="w-12 h-12"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 8h20M16 8v16M11 24h10"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="26"
                        cy="6"
                        r="2.5"
                        fill="currentColor"
                        opacity="0.7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-brand-700 mb-2">
                    تیرازیستر ایرانیان
                  </h2>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    انتخاب حرفه‌ای‌ها در تجهیزات تخصصی
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
