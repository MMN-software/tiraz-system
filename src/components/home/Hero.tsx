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

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-brand-50 via-white to-accent-50">
      <div
        className="absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0891b2 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute -top-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-200/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-10 w-40 h-40 border-2 border-coral-300/30 rounded-full hidden lg:block"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ستون متن */}
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 bg-white text-brand-700 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-full border border-brand-200 shadow-sm mb-5">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              <Sparkles className="motion-rotate-slow w-3.5 h-3.5 text-coral-500" aria-hidden="true" />
              تأمین‌کننده معتبر تجهیزات تخصصی
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-brand-800 leading-[1.25] mb-5">
              تجهیزات پزشکی، آزمایشگاهی
              <br />
              و صنعتی با
              <span className="relative inline-block mx-2">
                <span className="relative z-10 text-coral-500">
                  کیفیت تضمین‌شده
                </span>
                <span
                  className="absolute inset-x-0 bottom-1 h-3 bg-coral-200/60 -z-0 -rotate-1"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-600 leading-loose mb-8 max-w-xl mx-auto lg:mx-0">
              تیرازیستر ایرانیان با تیم فنی متخصص و شبکه تأمین گسترده،
              همراه مطمئن مراکز درمانی، آزمایشگاهی و صنعتی در سراسر کشور است.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 h-13 px-7 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 py-3.5"
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
                <Phone className="w-4 h-4 text-accent-500" aria-hidden="true" />
                مشاوره رایگان
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6 border-t border-ink-200">
              {[
                { icon: ShieldCheck, label: "ضمانت اصالت", sub: "شناسنامه معتبر", color: "text-accent-500 bg-accent-50" },
                { icon: Award, label: "کیفیت استاندارد", sub: "تأییدشده", color: "text-brand-600 bg-brand-50" },
                { icon: Truck, label: "ارسال سریع", sub: "سراسر کشور", color: "text-coral-500 bg-coral-50" },
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
                      <div className="text-[10px] text-ink-500">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ستون گرافیک */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-accent-500 rounded-3xl rotate-6 opacity-20"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-coral-400 to-coral-500 rounded-3xl -rotate-3 opacity-15"
                aria-hidden="true"
              />

              <div className="absolute inset-0 bg-white rounded-3xl border border-ink-200 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-l from-brand-700 to-brand-600 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-coral-400" />
                    <span className="w-3 h-3 rounded-full bg-accent-400" />
                    <span className="w-3 h-3 rounded-full bg-white/40" />
                  </div>
                  <span className="text-[10px] text-white/70 font-mono">
                    tiraz-system.ir
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-lg">
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
                    <h2 className="text-2xl font-extrabold text-brand-800 mb-1">
                      تیرازیستر ایرانیان
                    </h2>
                    <p className="text-xs text-ink-500">
                      انتخاب حرفه‌ای‌ها در تجهیزات تخصصی
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { v: "۶", l: "دسته محصول" },
                      { v: "۲۴", l: "محصول" },
                      { v: "۱۵+", l: "سال سابقه" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="bg-ink-50 rounded-xl p-2.5 text-center"
                      >
                        <div className="text-sm font-extrabold text-brand-700 num">
                          {s.v}
                        </div>
                        <div className="text-[9px] text-ink-500 mt-0.5">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-l from-brand-50 to-accent-50 border border-brand-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck className="w-4 h-4 text-accent-500" aria-hidden="true" />
                      <span className="text-[11px] font-bold text-brand-700">
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
                            className="w-3.5 h-3.5 text-accent-500 shrink-0"
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
                <span className="inline-flex w-9 h-9 rounded-xl bg-accent-50 text-accent-600 items-center justify-center">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-[10px] text-ink-500">گارانتی</div>
                  <div className="text-xs font-bold text-brand-700 num">
                    ۱۸ ماه
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -left-3 bg-coral-500 text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 z-10">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <div>
                  <div className="text-[10px] text-coral-100">پاسخ</div>
                  <div className="text-xs font-bold">زیر ۲ ساعت</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
