import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  Factory,
  Wrench,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const services = [
  {
    icon: Stethoscope,
    title: "تجهیزات پزشکی",
    desc: "تأمین، نصب و راه‌اندازی تجهیزات بیمارستانی و درمانگاهی با استانداردهای بین‌المللی.",
    color: "from-brand-600 to-brand-700",
    iconBg: "bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white",
    tags: ["بیمارستانی", "درمانگاهی", "ICU"],
    href: "/products?category=medical",
  },
  {
    icon: FlaskConical,
    title: "تجهیزات آزمایشگاهی",
    desc: "تأمین دستگاه‌ها و مواد مصرفی آزمایشگاهی برای مراکز تشخیصی و تحقیقاتی.",
    color: "from-brand-400 to-brand-600",
    iconBg: "bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white",
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
    color: "from-gold-500 to-gold-600",
    iconBg: "bg-gold-100 text-gold-700 group-hover:bg-gold-600 group-hover:text-white",
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
        className="absolute bottom-20 -left-40 w-80 h-80 bg-gold-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* هدر بخش */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 text-xs font-bold px-3 py-1.5 rounded-full border border-gold-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
            حوزه‌های فعالیت
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900 mb-4 leading-tight">
            راهکارهای تخصصی برای
            <span className="text-gold-600"> هر نیاز صنعتی</span>
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            از تأمین تجهیزات تا نصب، آموزش و پشتیبانی — همه‌چیز در یک مجموعه
            یکپارچه و حرفه‌ای.
          </p>
        </div>

        {/* کارت‌های خدمات */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealItem key={i} index={i} className="h-full">
                <Link
                  href={s.href}
                  className="motion-card-lift group relative bg-white rounded-2xl p-6 border border-ink-200 hover:border-transparent overflow-hidden flex flex-col h-full"
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
                    className={`relative inline-flex w-14 h-14 mb-5 rounded-2xl ${s.iconBg} items-center justify-center transition-all duration-300 shadow-sm motion-icon-rotate`}
                  >
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </span>

                  {/* عنوان */}
                  <h3 className="relative text-lg font-extrabold text-brand-900 mb-2 leading-snug group-hover:text-brand-700 transition-colors">
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
                        className="text-[10px] font-medium text-ink-500 bg-ink-50 px-2 py-0.5 rounded-md border border-ink-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* دکمه */}
                  <span className="relative inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 group-hover:text-gold-600 transition-colors mt-auto">
                    مشاهده محصولات
                    <ArrowLeft
                      className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* CTA پایین */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-l from-brand-50 to-gold-50 border border-brand-100 rounded-2xl px-5 py-3 text-sm text-brand-800">
            <CheckCircle2
              className="w-5 h-5 text-gold-600 shrink-0"
              aria-hidden="true"
            />
            <span className="font-medium">
              نمی‌دانید کدام راهکار مناسب کسب‌وکار شماست؟
            </span>
            <Link
              href="/contact"
              className="font-bold text-gold-600 hover:text-gold-700 whitespace-nowrap"
            >
              مشاوره رایگان →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
