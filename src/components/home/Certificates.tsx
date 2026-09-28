import {
  Award,
  FileCheck,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const certificates = [
  {
    icon: BadgeCheck,
    title: "ISO 9001",
    sub: "2015",
    desc: "سیستم مدیریت کیفیت",
    color: "from-brand-500/20 to-brand-600/10 text-brand-200",
  },
  {
    icon: FileCheck,
    title: "ISO 13485",
    sub: "2016",
    desc: "تجهیزات پزشکی",
    color: "from-accent-500/20 to-accent-600/10 text-accent-200",
  },
  {
    icon: ShieldCheck,
    title: "CE Marking",
    sub: "اتحادیه اروپا",
    desc: "استاندارد ایمنی",
    color: "from-coral-500/20 to-coral-600/10 text-coral-200",
  },
  {
    icon: Award,
    title: "پروانه وزارت",
    sub: "بهداشت",
    desc: "توزیع تجهیزات پزشکی",
    color: "from-brand-400/20 to-brand-500/10 text-brand-100",
  },
];

const trustItems = [
  "منطبق با استانداردهای بین‌المللی",
  "دارای گواهی اصالت کالا",
  "تحت نظارت سازمان غذا و دارو",
];

export function Certificates() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-brand-800 via-brand-700 to-accent-700 text-white">
      {/* الگوی نقطه‌ای */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* گرافیک blur */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-coral-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 py-16 sm:py-24">
        {/* هدر */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-accent-200 text-xs font-bold px-3 py-1.5 rounded-full border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            گواهی‌ها و مجوزها
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
            کیفیت، تضمین‌شده با
            <span className="text-accent-300"> مدارک معتبر</span>
          </h2>
          <p className="text-base text-white/75 leading-loose">
            تمام فعالیت‌های ما زیر نظر استانداردهای بین‌المللی و ارگان‌های
            نظارتی انجام می‌شود.
          </p>
        </div>

        {/* گرید گواهی‌ها */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* خط نور بالا */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/30 to-transparent"
                  aria-hidden="true"
                />

                {/* آیکون */}
                <span
                  className={`inline-flex w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${c.color} border border-white/10 items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </span>

                {/* عنوان */}
                <h3 className="text-sm sm:text-base font-extrabold text-white mb-0.5">
                  {c.title}
                </h3>

                {/* زیرعنوان */}
                <div className="text-[10px] text-accent-300 font-bold mb-2">
                  {c.sub}
                </div>

                {/* توضیح */}
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* نشان‌های اعتماد */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs sm:text-sm text-white/85"
            >
              <span className="inline-flex w-6 h-6 rounded-full bg-accent-500/20 border border-accent-400/30 items-center justify-center shrink-0">
                <CheckCircle2
                  className="w-3.5 h-3.5 text-accent-300"
                  aria-hidden="true"
                />
              </span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
