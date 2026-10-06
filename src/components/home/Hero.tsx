import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  Truck,
  Phone,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-brand-50 via-white to-gold-50">
      {/* پس‌زمینه */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A6470 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute -top-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-200/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-10 w-40 h-40 border-2 border-gold-300/30 rounded-full hidden lg:block"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ستون متن */}
          <div className="text-center lg:text-right">
            {/* بج بالا */}
            <div className="inline-flex items-center gap-2 bg-white text-brand-700 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-full border border-brand-200 shadow-sm mb-5">
              <span className="motion-pulse-soft inline-flex w-2 h-2 rounded-full bg-brand-500" />
              <Sparkles
                className="motion-rotate-slow w-3.5 h-3.5 text-gold-500"
                aria-hidden="true"
              />
              تأمین‌کننده معتبر تجهیزات تخصصی
            </div>

            {/* نوار ضربان قلب (ECG) */}
            <div
              className="relative w-full max-w-md mx-auto lg:mx-0 mb-6 h-12 overflow-hidden"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 30 L 60 30 L 70 30 L 78 18 L 86 42 L 94 30 L 110 30 L 118 22 L 126 38 L 134 30 L 160 30 L 170 30 L 178 18 L 186 42 L 194 30 L 210 30 L 218 22 L 226 38 L 234 30 L 260 30 L 270 30 L 278 18 L 286 42 L 294 30 L 310 30 L 318 22 L 326 38 L 334 30 L 400 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="text-brand-300"
                />
                <path
                  d="M 0 30 L 60 30 L 70 30 L 78 18 L 86 42 L 94 30 L 110 30 L 118 22 L 126 38 L 134 30 L 160 30 L 170 30 L 178 18 L 186 42 L 194 30 L 210 30 L 218 22 L 226 38 L 234 30 L 260 30 L 270 30 L 278 18 L 286 42 L 294 30 L 310 30 L 318 22 L 326 38 L 334 30 L 400 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1000}
                  className="ecg-trace text-gold-500"
                />
              </svg>
              <span className="ecg-pulse absolute top-1/2 start-0 -translate-y-1/2 w-2 h-2 rounded-full bg-gold-500" />
            </div>

            {/* تیتر */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-brand-900 leading-[1.25] mb-5">
              تجهیزات پزشکی، آزمایشگاهی
              <br />
              و بیمارستانی با
              <span className="relative inline-block mx-2">
                <span className="relative z-10 text-gold-600">
                  کیفیت تضمین‌شده
                </span>
                <span
                  className="absolute inset-x-0 bottom-1 h-3 bg-gold-200/60 -z-0 -rotate-1"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* پاراگراف */}
            <p className="text-base sm:text-lg text-ink-600 leading-loose mb-8 max-w-xl mx-auto lg:mx-0">
              تیرازیس طب ایرانیان با تیم فنی متخصص و شبکه تأمین گسترده،
              همراه مطمئن مراکز درمانی، آزمایشگاهی، بیمارستانی و داروخانه‌ای
              در سراسر کشور است.
            </p>

            {/* دکمه‌ها */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link
                href="/products"
                className="motion-shimmer group inline-flex items-center justify-center gap-2 h-13 px-7 bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 py-3.5"
              >
                مشاهده محصولات
                <ArrowLeft
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-13 px-7 bg-white hover:bg-ink-50 text-brand-700 font-bold rounded-xl border-2 border-brand-200 hover:border-brand-400 transition-all py-3.5"
              >
                <Phone className="w-4 h-4 text-gold-500" aria-hidden="true" />
                مشاوره رایگان
              </Link>
            </div>

            {/* نشان‌های اعتماد */}
            <Reveal delay={0.15}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6 border-t border-ink-200">
                {[
                  {
                    icon: ShieldCheck,
                    label: "ضمانت اصالت",
                    sub: "شناسنامه معتبر",
                    color: "text-brand-600 bg-brand-50",
                  },
                  {
                    icon: Award,
                    label: "کیفیت استاندارد",
                    sub: "تأییدشده",
                    color: "text-gold-600 bg-gold-50",
                  },
                  {
                    icon: Truck,
                    label: "ارسال سریع",
                    sub: "سراسر کشور",
                    color: "text-rose-500 bg-rose-50",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex w-10 h-10 rounded-xl ${item.color} items-center justify-center shrink-0`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="text-right">
                        <div className="text-xs sm:text-sm font-bold text-ink-800">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-ink-500">
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ستون گرافیک */}
          <Reveal delay={0.3} className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-gold-500 rounded-3xl rotate-6 opacity-20"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-gold-500 rounded-3xl -rotate-3 opacity-15"
                aria-hidden="true"
              />

              <div className="absolute inset-0 bg-white rounded-3xl border border-ink-200 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-l from-brand-800 to-brand-700 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-gold-400" />
                    <span className="w-3 h-3 rounded-full bg-white/40" />
                  </div>
                  <span className="text-[10px] text-white/70 font-mono">
                    tiraz-system.ir
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-600 to-gold-500 flex items-center justify-center text-white shadow-lg">
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-11 h-11"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 8h20M16 8v16M11 24h10"
                          stroke="currentColor"
                          strokeWidth="2.4"
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
                    <h2 className="text-2xl font-extrabold text-brand-900 mb-1">
                      تیرازیس طب ایرانیان
                    </h2>
                    <p className="text-xs text-ink-500">
                      انتخاب حرفه‌ای‌ها در تجهیزات پزشکی
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { v: "۲", l: "دسته تخصصی" },
                      { v: "۷۷۰+", l: "محصول" },
                      { v: "۱۵+", l: "سال سابقه" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="bg-ink-50 rounded-xl p-2.5 text-center"
                      >
                        <div className="text-sm font-extrabold text-brand-800 num">
                          {s.v}
                        </div>
                        <div className="text-[9px] text-ink-500 mt-0.5">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-l from-brand-50 to-gold-50 border border-brand-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck
                        className="w-4 h-4 text-gold-600"
                        aria-hidden="true"
                      />
                      <span className="text-[11px] font-bold text-brand-800">
                        تعهد ما به شما
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "ضمانت اصالت کالا",
                        "پشتیبانی فنی رایگان",
                        "ارسال به سراسر کشور",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[11px] text-ink-600"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-gold-600 shrink-0"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl shadow-xl border border-ink-200 px-4 py-3 flex items-center gap-2 z-10">
                <span className="inline-flex w-9 h-9 rounded-xl bg-brand-50 text-brand-700 items-center justify-center">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-[10px] text-ink-500">گارانتی</div>
                  <div className="text-xs font-bold text-brand-800 num">
                    ۱۸ ماه
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -left-3 bg-gold-500 text-ink-900 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 z-10">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <div>
                  <div className="text-[10px] text-ink-800/70">پاسخ</div>
                  <div className="text-xs font-bold">زیر ۲ ساعت</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}