import { Handshake, Building2 } from "lucide-react";

const brands = [
  { name: "MEDIQ", country: "آلمان" },
  { name: "LabTech", country: "ژاپن" },
  { name: "PharmaPlus", country: "سوئیس" },
  { name: "InduTech", country: "ایتالیا" },
  { name: "BioLine", country: "فرانسه" },
  { name: "MediCare", country: "آمریکا" },
  { name: "PrecisionX", country: "آلمان" },
  { name: "QualityPro", country: "کره" },
];

function BrandCard({
  name,
  country,
}: {
  name: string;
  country: string;
}) {
  return (
    <div
      dir="rtl"
      className="motion-card-lift group relative bg-white rounded-2xl border border-ink-200 hover:border-brand-300 p-5 flex flex-col items-center justify-center text-center overflow-hidden shrink-0 w-40 sm:w-48 h-28 sm:h-32"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-50/0 via-brand-50/0 to-accent-50/0 group-hover:from-brand-50 group-hover:to-accent-50 transition-all duration-300"
        aria-hidden="true"
      />
      <Building2
        className="relative w-4 h-4 text-ink-300 group-hover:text-brand-500 transition-colors mb-2"
        aria-hidden="true"
      />
      <div className="relative text-base sm:text-lg font-extrabold text-ink-400 group-hover:text-brand-700 transition-colors tracking-wide">
        {name}
      </div>
      <div className="relative text-[10px] text-ink-400 group-hover:text-accent-600 transition-colors mt-1 font-medium">
        {country}
      </div>
    </div>
  );
}

export function Brands() {
  // دو نسخه برای حلقه‌ی بی‌انهای
  const loop = [...brands, ...brands];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container relative mx-auto px-4">
        {/* هدر */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 mb-4">
            <Handshake className="w-3.5 h-3.5" aria-hidden="true" />
            شرکای تجاری
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-800 mb-3 leading-tight">
            برندهای
            <span className="text-brand-500"> معتبر </span>
            همکار
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            همکاری با برندهای شناخته‌شده بین‌المللی برای تأمین باکیفیت‌ترین
            تجهیزات.
          </p>
        </div>
      </div>

      {/* کاروسل بی‌نهایت */}
      <div className="motion-marquee-pause relative" dir="ltr">
        <div className="motion-marquee flex gap-3 sm:gap-4 w-max px-4">
          {loop.map((b, i) => (
            <BrandCard key={`${b.name}-${i}`} name={b.name} country={b.country} />
          ))}
        </div>
      </div>

      {/* یادداشت */}
      <p className="container mx-auto px-4 text-center text-xs text-ink-400 mt-8">
        * این لوگوها نمونه هستند و در نسخه نهایی با شرکای واقعی جایگزین
        می‌شوند.
      </p>
    </section>
  );
}
