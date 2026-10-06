import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Truck,
  Headphones,
  BadgeCheck,
  Coins,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const features = [
  {
    icon: BadgeCheck,
    title: "اصالت تضمین‌شده",
    desc: "تمام محصولات با گارانتی اصالت و شناسنامه معتبر عرضه می‌شوند.",
    color: "bg-gold-100 text-gold-700",
    hoverColor: "group-hover:bg-gold-600 group-hover:text-white",
    accentBar: "from-gold-500 to-gold-600",
  },
  {
    icon: Award,
    title: "کیفیت استاندارد",
    desc: "منطبق با استانداردهای ملی و بین‌المللی تجهیزات تخصصی.",
    color: "bg-brand-50 text-brand-700",
    hoverColor: "group-hover:bg-brand-700 group-hover:text-white",
    accentBar: "from-brand-600 to-brand-700",
  },
  {
    icon: Coins,
    title: "قیمت رقابتی",
    desc: "تأمین مستقیم از تولیدکننده و واردکننده معتبر بدون واسطه.",
    color: "bg-rose-100 text-rose-600",
    hoverColor: "group-hover:bg-rose-500 group-hover:text-white",
    accentBar: "from-rose-400 to-rose-600",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال به سراسر کشور با بسته‌بندی ایمن و پیگیری لحظه‌ای.",
    color: "bg-brand-100 text-brand-800",
    hoverColor: "group-hover:bg-brand-800 group-hover:text-white",
    accentBar: "from-brand-700 to-brand-900",
  },
  {
    icon: Headphones,
    title: "پشتیبانی تخصصی",
    desc: "تیم فنی مجرب برای مشاوره، نصب و راه‌اندازی تجهیزات.",
    color: "bg-brand-50 text-brand-500",
    hoverColor: "group-hover:bg-brand-500 group-hover:text-white",
    accentBar: "from-brand-400 to-brand-600",
  },
  {
    icon: ShieldCheck,
    title: "خدمات پس از فروش",
    desc: "گارانتی، تأمین قطعات و قراردادهای نگهداری دوره‌ای.",
    color: "bg-rose-100 text-rose-700",
    hoverColor: "group-hover:bg-rose-600 group-hover:text-white",
    accentBar: "from-rose-500 to-rose-700",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-ink-50 via-white to-ink-50 relative overflow-hidden">
      <div
        className="absolute top-20 -left-40 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 -right-40 w-96 h-96 bg-gold-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 text-xs font-bold px-3 py-1.5 rounded-full border border-accent-100 mb-4">
            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
            چرا تیرازیس طب؟
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-800 mb-4 leading-tight">
            مزیت‌هایی که ما را
            <span className="text-accent-500"> متفاوت می‌کند</span>
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            بیش از ۱۵ سال تجربه، تعهد به کیفیت و پشتیبانی واقعی — این چیزی
            است که ما را انتخاب اول مشتریان کرده.
          </p>
        </div>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <RevealItem key={i} index={i} className="h-full">
                <div className="motion-card-lift group relative bg-white rounded-2xl p-6 border border-ink-200 hover:border-transparent overflow-hidden h-full">
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${f.accentBar} opacity-0 group-hover:opacity-100 transition-opacity`}
                    aria-hidden="true"
                  />
                  <span
                    className={`inline-flex w-14 h-14 mb-4 rounded-2xl motion-icon-rotate ${f.color} ${f.hoverColor} items-center justify-center transition-all duration-300 shadow-sm`}
                  >
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold text-brand-800 mb-2 group-hover:text-brand-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* CTA پایین */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-brand-700 via-brand-600 to-accent-600 p-6 sm:p-8 shadow-xl">
            <div
              className="absolute -top-10 -left-10 w-40 h-40 bg-coral-400/20 rounded-full blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-right">
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-1">
                  آماده همکاری با تیرازیس طب هستید؟
                </h3>
                <p className="text-xs sm:text-sm text-white/85">
                  برای دریافت مشاوره رایگان همین حالا تماس بگیرید
                </p>
              </div>
              <Link
                href="/contact"
                className="motion-shimmer inline-flex items-center gap-2 h-12 px-6 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                شروع همکاری
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
