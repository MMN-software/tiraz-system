import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Award,
  Handshake,
  Sparkles,
} from "lucide-react";

const commitments = [
  {
    icon: ShieldCheck,
    title: "تضمین اصالت",
    desc: "شناسنامه معتبر برای هر محصول",
  },
  {
    icon: CheckCircle2,
    title: "کنترل کیفیت",
    desc: "بازرسی قبل از ارسال",
  },
  {
    icon: FileText,
    title: "مستندات فنی",
    desc: "کاتالوگ و راهنمای استفاده",
  },
  {
    icon: Handshake,
    title: "خدمات پس از فروش",
    desc: "پشتیبانی و قطعات یدکی",
  },
];

const trustItems = [
  "بازرسی دقیق قبل از ارسال",
  "شناسنامه معتبر برای هر محصول",
  "پشتیبانی فنی واقعی",
];

export function Certificates() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-brand-800 via-brand-700 to-accent-700 text-white">
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        className="absolute -top-32 -right-32 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-coral-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-accent-200 text-xs font-bold px-3 py-1.5 rounded-full border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            تعهد ما
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
            تعهد ما به
            <span className="text-accent-300"> کیفیت و اصالت</span>
          </h2>
          <p className="text-base text-white/75 leading-loose">
            در تیرازیستر ایرانیان، کیفیت و اعتماد مشتری، پایه هر تصمیم ماست.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/30 to-transparent"
                  aria-hidden="true"
                />

                <span className="inline-flex w-14 h-14 mb-4 rounded-2xl bg-white/10 border border-white/15 items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-accent-300" aria-hidden="true" />
                </span>

                <h3 className="text-sm sm:text-base font-extrabold text-white mb-2">
                  {c.title}
                </h3>

                <p className="text-[11px] text-white/70 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>

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
