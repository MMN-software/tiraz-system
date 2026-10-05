import Link from "next/link";
import { Stethoscope, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const services = [
  {
    icon: Stethoscope,
    title: "تجهیزات پزشکی",
    desc: "تأمین، نصب و راه‌اندازی تجهیزات بیمارستانی، آزمایشگاهی و درمانگاهی با استانداردهای بین‌المللی.",
    color: "from-brand-600 to-brand-700",
    iconBg:
      "bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white",
    tags: ["بیمارستانی", "آزمایشگاهی", "ICU"],
    href: "/products?category=medical",
  },
  {
    icon: Sparkles,
    title: "محصولات آرایشی و بهداشتی",
    desc: "محصولات مراقبت پوست، زیبایی و بهداشتی از برندهای معتبر با ضمانت اصالت و کیفیت.",
    color: "from-rose-500 to-rose-600",
    iconBg:
      "bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
    tags: ["مراقبت پوست", "زیبایی", "ضد آفتاب"],
    href: "/products?category=beauty",
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
        className="absolute bottom-20 -left-40 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl"
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
            راهکارهای تخصصی در دو حوزه
            <span className="text-gold-600"> پزشکی و زیبایی</span>
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            از تأمین تجهیزات تا نصب، آموزش و پشتیبانی — همه‌چیز در یک مجموعه
            یکپارچه و حرفه‌ای.
          </p>
        </div>

        {/* کارت‌های خدمات */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealItem key={i} index={i} className="h-full">
                <Link
                  href={s.href}
                  className="motion-card-lift group relative bg-white rounded-2xl p-7 border border-ink-200 hover:border-transparent overflow-hidden flex flex-col h-full"
                >
                  {/* گرادیانت رنگی روی hover */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l ${s.color} opacity-60 group-hover:opacity-100 transition-opacity`}
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
                  <h3 className="relative text-xl font-extrabold text-brand-900 mb-3 leading-snug">
                    {s.title}
                  </h3>

                  {/* توضیح */}
                  <p className="relative text-sm text-ink-500 leading-relaxed mb-5 flex-1">
                    {s.desc}
                  </p>

                  {/* تگ‌ها */}
                  <div className="relative flex flex-wrap gap-1.5 mb-5">
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
                  <span className="relative inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 group-hover:text-gold-600 transition-colors mt-auto">
                    مشاهده محصولات
                    <ArrowLeft
                      className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
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
              نمی‌دانید کدام محصول مناسب نیاز شماست؟
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
