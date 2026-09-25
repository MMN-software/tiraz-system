import Link from "next/link";
import { Phone, Mail, ArrowLeft } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-700 to-brand-600 text-white p-8 sm:p-12 lg:p-16">
          {/* گرافیک */}
          <div
            className="absolute -top-12 -left-12 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 -right-12 w-72 h-72 bg-white/5 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
              نیاز به مشاوره تخصصی دارید؟
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-loose mb-8">
              کارشناسان تیرازیستر ایرانیان آماده پاسخ‌گویی به سوالات شما درباره
              انتخاب، خرید و پشتیبانی تجهیزات تخصصی هستند.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-ink-100 text-brand-700 font-medium rounded-xl transition-colors"
              >
                درخواست مشاوره رایگان
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+982112345678"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                تماس فوری
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-white/70">
              <a
                href="tel:+982112345678"
                className="inline-flex items-center gap-2 justify-center hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="num">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </a>
              <a
                href="mailto:info@tiraz-system.ir"
                className="inline-flex items-center gap-2 justify-center hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                info@tiraz-system.ir
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
