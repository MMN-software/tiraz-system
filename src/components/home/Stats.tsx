import { Calendar, Users, Package, Award, TrendingUp, Sparkles } from "lucide-react";
import { CountUp } from "./CountUp";

const stats = [
  {
    icon: Calendar,
    value: 15,
    suffix: "+",
    label: "سال تجربه",
    sub: "از ۱۳۸۹",
    iconBg: "bg-brand-500/20 text-brand-200",
  },
  {
    icon: Users,
    value: 850,
    suffix: "+",
    label: "مشتری فعال",
    sub: "سراسر کشور",
    iconBg: "bg-accent-500/20 text-accent-200",
  },
  {
    icon: Package,
    value: 1200,
    suffix: "+",
    label: "محصول متنوع",
    sub: "در ۶ دسته‌بندی",
    iconBg: "bg-coral-500/20 text-coral-200",
  },
  {
    icon: Award,
    value: 35,
    suffix: "+",
    label: "گواهی و مجوز",
    sub: "بین‌المللی",
    iconBg: "bg-brand-400/20 text-brand-100",
  },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-brand-800 via-brand-700 to-accent-700 text-white">
      {/* الگوی نقطه‌ای */}
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* گرافیک blur */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-coral-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* نوار بالای آمار */}
      <div className="relative flex justify-center pt-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-coral-300" aria-hidden="true" />
          <span>اعدادی که به آن‌ها افتخار می‌کنیم</span>
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group text-center relative"
              >
                {/* آیکون */}
                <span
                  className={`inline-flex w-14 h-14 sm:w-16 sm:h-16 mb-4 rounded-2xl ${s.iconBg} backdrop-blur-sm border border-white/10 items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
                </span>

                {/* عدد */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 leading-none">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>

                {/* برچسب */}
                <div className="text-sm sm:text-base font-bold text-white/95 mb-0.5">
                  {s.label}
                </div>

                {/* توضیح کوچک */}
                <div className="text-[11px] sm:text-xs text-white/60">
                  {s.sub}
                </div>

                {/* خط جداکننده (برای همه به‌جز آخر) */}
                {i < stats.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -left-4 w-px h-12 bg-white/15 -translate-y-1/2"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* نوار پایین */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-white/70">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-300" aria-hidden="true" />
            <span>رشد سالانه ۴۰٪ در فروش</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-coral-300" aria-hidden="true" />
            <span>رضایت ۹۸٪ مشتریان</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-200" aria-hidden="true" />
            <span>پشتیبانی ۲۴/۷</span>
          </div>
        </div>
      </div>
    </section>
  );
}
