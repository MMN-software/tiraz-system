import {
  ShieldCheck,
  Award,
  Truck,
  Headphones,
  BadgeCheck,
  Coins,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "اصالت تضمین‌شده",
    desc: "تمام محصولات با گارانتی اصالت و شناسنامه معتبر عرضه می‌شوند.",
  },
  {
    icon: Award,
    title: "کیفیت استاندارد",
    desc: "منطبق با استانداردهای ملی و بین‌المللی تجهیزات تخصصی.",
  },
  {
    icon: Coins,
    title: "قیمت رقابتی",
    desc: "تأمین مستقیم از تولیدکننده و واردکننده معتبر بدون واسطه.",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال به سراسر کشور با بسته‌بندی ایمن و پیگیری لحظه‌ای.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی تخصصی",
    desc: "تیم فنی مجرب برای مشاوره، نصب و راه‌اندازی تجهیزات.",
  },
  {
    icon: ShieldCheck,
    title: "خدمات پس از فروش",
    desc: "گارانتی، تأمین قطعات و قراردادهای نگهداری دوره‌ای.",
  },
];

export function WhyUs() {
  return (
    <section className="py-14 sm:py-20 bg-ink-100/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
            چرا تیرازیستر؟
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 mb-4 leading-tight">
            مزیت‌هایی که ما را متفاوت می‌کند
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            بیش از ۱۵ سال تجربه، تعهد به کیفیت و پشتیبانی واقعی.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-ink-200 hover:border-accent-300 transition-colors"
            >
              <span className="inline-flex w-11 h-11 mb-4 rounded-xl bg-accent-50 text-accent-500 items-center justify-center">
                <f.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-bold text-brand-700 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-ink-500 leading-loose">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
