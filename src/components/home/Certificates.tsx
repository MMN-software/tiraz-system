import { Award, FileCheck, ShieldCheck, BadgeCheck } from "lucide-react";

const certificates = [
  {
    icon: BadgeCheck,
    title: "ISO 9001",
    desc: "سیستم مدیریت کیفیت",
  },
  {
    icon: FileCheck,
    title: "ISO 13485",
    desc: "تجهیزات پزشکی",
  },
  {
    icon: ShieldCheck,
    title: "CE Marking",
    desc: "استاندارد اروپا",
  },
  {
    icon: Award,
    title: "پروانه وزارت بهداشت",
    desc: "توزیع تجهیزات پزشکی",
  },
];

export function Certificates() {
  return (
    <section className="py-14 sm:py-20 bg-brand-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold text-accent-400 mb-3 tracking-wider">
            گواهی‌ها و مجوزها
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
            کیفیت، تضمین‌شده با مدارک معتبر
          </h2>
          <p className="text-base text-white/70 leading-loose">
            تمام فعالیت‌های ما زیر نظر استانداردها و ارگان‌های نظارتی انجام
            می‌شود.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((c, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
            >
              <span className="inline-flex w-12 h-12 mb-3 rounded-xl bg-accent-500/20 text-accent-400 items-center justify-center">
                <c.icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-bold mb-1">{c.title}</h3>
              <p className="text-xs text-white/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
