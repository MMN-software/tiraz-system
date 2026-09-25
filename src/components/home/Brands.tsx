const brands = [
  "MEDIQ",
  "LabTech",
  "PharmaPlus",
  "InduTech",
  "BioLine",
  "MediCare",
  "PrecisionX",
  "QualityPro",
];

export function Brands() {
  return (
    <section className="py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
            شرکای تجاری
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-700 leading-tight">
            برندهای معتبر همکار
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {brands.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-ink-200 h-20 flex items-center justify-center px-4 hover:border-brand-300 transition-colors"
            >
              <span className="text-base sm:text-lg font-extrabold text-ink-400 tracking-wide">
                {b}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-ink-400 mt-6">
          * این لوگوها نمونه هستند و در نسخه نهایی با شرکای واقعی جایگزین
          می‌شوند.
        </p>
      </div>
    </section>
  );
}
