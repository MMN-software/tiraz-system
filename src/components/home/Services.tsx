import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  Factory,
  Wrench,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "تجهیزات پزشکی",
    desc: "تأمین، نصب و راه‌اندازی تجهیزات بیمارستانی و درمانگاهی با استانداردهای بین‌المللی.",
    color: "from-brand-500 to-brand-600",
    iconBg: "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
    tags: ["بیمارستانی", "درمانگاهی", "ICU"],
    href: "/products?category=medical",
  },
  {
    icon: FlaskConical,
    title: "تجهیزات آزمایشگاهی",
    desc: "تأمین دستگاه‌ها و مواد مصرفی آزمایشگاهی برای مراکز تشخیصی و تحقیقاتی.",
    color: "from-accent-500 to-accent-600",
    iconBg: "bg-accent-50 text-accent-600 group-hover:bg-accent-500 group-hover:text-white",
    tags: ["تشخیصی", "تحقیقاتی", "کنترل کیفیت"],
    href: "/products?category=lab",
  },
  {
    icon: Factory,
    title: "تجهیزات صنعتی",
    desc: "راهکارهای تجهیزاتی و کنترل کیفیت برای صنایع مختلف تولیدی و خدماتی.",
    color: "from-ink-600 to-ink-700",
    iconBg: "bg-ink-100 text-ink-700 group-hover:bg-ink-700 group-hover:text-white",
    tags: ["خط تولید", "اتوماسیون", "کنترل کیفیت"],
    href: "/products?category=industrial",
  },
  {
    icon: Wrench,
    title: "قطعات و خدمات پس از فروش",
    desc: "تأمین قطعات یدکی، تعمیرات تخصصی و قراردادهای نگهداری دوره‌ای.",
    color: "from-coral-500 to-coral-600",
    iconBg: "bg-coral-50 text-coral-500 group-hover:bg-coral-500 group-hover:text-white",
    tags: ["قطعات یدکی", "تعمیرات", "نگهداری"],
    href: "/products?category=parts",
  },
];

export function Services() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* گرافیک پس‌زمینه */}
      <div
        className="absolute top-20 -right-40 w-80 h-80 bg-brand-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 -left-40 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* هدر بخش */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-coral-50 text-coral-600 text-xs font-bold px-3 py-1.5 rounded-full border border-coral-100 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500"></span>
            حوزه‌های فعالیت
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-800 mb-4 leading-tight">
            راهکارهای تخصصی برای
            <span className="text-coral-500"> هر نیاز صنعتی</span>
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            از تأمین تجهیزات تا نصب، آموزش و پشتیبانی — همه‌چیز در یک مجموعه
            یکپارچه و حرفه‌ای.
          </p>
        </div>

        {/* کارت‌های خدمات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={i}
                href={s.href}
                className="group relative bg-white rounded-2xl p-6 border border-ink-200 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* گرادیانت رنگی که روی hover ظاهر می‌شه */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                  aria-hidden="true"
                />

                {/* شماره‌گذاری */}
                <span className="absolute top-5 left-5 text-4xl font-extrabold text-ink-100 group-hover:text-brand-100 transition-colors num">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* آیکون */}
                <span
                  className={`relative inline-flex w-14 h-14 mb-5 rounded-2xl ${s.iconBg} items-center justify-center transition-all duration-300 shadow-sm`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </span>

                {/* عنوان */}
                <h3 className="relative text-lg font-extrabold text-brand-800 mb-2 leading-snug group-hover:text-brand-600 transition-colors">
                  {s.title}
                </h3>

                {/* توضیح */}
                <p className="relative text-sm text-ink-500 leading-relaxed mb-4 flex-1">
                  {s.desc}
                </p>

                {/* تگ‌ها */}
                <div className="relative flex flex-wrap gap-1.5 mb-4">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-ink-500 bg-ink-50 px-2 py-0.5 rounded-md border border-ink-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* دکمه */}
                <span className="relative inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 group-hover:text-coral-500 transition-colors mt-auto">
                  مشاهده محصولات
                  <ArrowLeft
                    className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA پایین */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-l from-brand-50 to-accent-50 border border-brand-100 rounded-2xl px-5 py-3 text-sm text-brand-700">
            <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" aria-hidden="true" />
            <span className="font-medium">
              نمی‌دانید کدام راهکار مناسب کسب‌وکار شماست؟
            </span>
            <Link
              href="/contact"
              className="font-bold text-coral-500 hover:text-coral-600 whitespace-nowrap"
            >
              مشاوره رایگان →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
