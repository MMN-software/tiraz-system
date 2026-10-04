import { Layers, Package, Award, Users } from "lucide-react";
import { CountUp } from "./CountUp";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const stats = [
  {
    icon: Layers,
    value: 6,
    suffix: "",
    label: "دسته‌بندی تخصصی",
    sub: "تنوع محصولات",
    iconBg: "bg-brand-400/25 text-brand-100",
  },
  {
    icon: Package,
    value: 24,
    suffix: "",
    label: "محصول فعال",
    sub: "در حال عرضه",
    iconBg: "bg-gold-400/25 text-gold-200",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "سال سابقه",
    sub: "فعالیت مستمر",
    iconBg: "bg-rose-400/25 text-rose-100",
  },
  {
    icon: Users,
    value: 850,
    suffix: "+",
    label: "مشتری راضی",
    sub: "سراسر کشور",
    iconBg: "bg-brand-300/25 text-brand-50",
  },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-brand-800 via-brand-700 to-accent-700 text-white">
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute -top-20 -right-20 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-coral-400/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 py-12 sm:py-16">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealItem key={i} index={i}>
                <div className="group text-center relative h-full">
                  <span
                    className={`inline-flex w-14 h-14 sm:w-16 sm:h-16 mb-4 rounded-2xl ${s.iconBg} backdrop-blur-sm border border-white/10 items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className="w-7 h-7 sm:w-8 sm:h-8"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 leading-none">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </div>

                  <div className="text-sm sm:text-base font-bold text-white/95 mb-0.5">
                    {s.label}
                  </div>

                  <div className="text-[11px] sm:text-xs text-white/60">
                    {s.sub}
                  </div>

                  {i < stats.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-1/2 -left-4 w-px h-12 bg-white/15 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
