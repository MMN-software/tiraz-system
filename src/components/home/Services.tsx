import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  Factory,
  Wrench,
  ArrowLeft,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "تجهیزات پزشکی",
    desc: "تأمین، نصب و راه‌اندازی تجهیزات بیمارستانی و درمانگاهی با استانداردهای بین‌المللی.",
  },
  {
    icon: FlaskConical,
    title: "تجهیزات آزمایشگاهی",
    desc: "تأمین دستگاه‌ها و مواد مصرفی آزمایشگاهی برای مراکز تشخیصی و تحقیقاتی.",
  },
  {
    icon: Factory,
    title: "تجهیزات صنعتی",
    desc: "راهکارهای تجهیزاتی و کنترل کیفیت برای صنایع مختلف تولیدی و خدماتی.",
  },
  {
    icon: Wrench,
    title: "قطعات و خدمات پس از فروش",
    desc: "تأمین قطعات یدکی، تعمیرات تخصصی و قراردادهای نگهداری دوره‌ای.",
  },
];

export function Services() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
            حوزه‌های فعالیت
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 mb-4 leading-tight">
            راهکارهای تخصصی برای هر نیاز
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            از تأمین تجهیزات تا نصب، آموزش و پشتیبانی — همه‌چیز در یک مجموعه
            یکپارچه.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl p-6 border border-ink-200 hover:border-brand-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex w-12 h-12 mb-4 rounded-xl bg-brand-50 text-brand-600 items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <s.icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-brand-700 mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-ink-500 leading-loose mb-4">
                {s.desc}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent-500 hover:text-accent-600"
              >
                مشاهده بیشتر
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
