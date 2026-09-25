import { Calendar, Users, Package, Award } from "lucide-react";

const stats = [
  { icon: Calendar, value: "۱۵+", label: "سال تجربه" },
  { icon: Users, value: "۸۵۰+", label: "مشتری فعال" },
  { icon: Package, value: "۱۲۰۰+", label: "محصول متنوع" },
  { icon: Award, value: "۳۵+", label: "گواهی و مجوز" },
];

export function Stats() {
  return (
    <section className="bg-brand-700 text-white">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <span className="inline-flex w-12 h-12 mb-3 rounded-xl bg-white/10 items-center justify-center text-accent-400">
                <s.icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold mb-1 num">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
