import Link from "next/link";
import { Phone, Mail, ArrowLeft, MessageCircle, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-900 via-brand-800 to-brand-700 p-8 sm:p-12 lg:p-16 shadow-xl">
            {/* گرافیک‌های پس‌زمینه */}
            <div
              className="absolute -top-20 -left-20 w-64 h-64 bg-gold-400/15 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute top-10 right-10 w-32 h-32 border-2 border-gold-400/15 rounded-full"
              aria-hidden="true"
            />

            {/* محتوا */}
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight text-white drop-shadow-sm">
                نیاز به{" "}
                <span className="text-gold-300">مشاوره تخصصی</span> دارید؟
              </h2>

              <p className="text-base sm:text-lg mb-8 leading-loose text-white/90 max-w-2xl mx-auto">
                کارشناسان تیرازیس طب ایرانیان آماده پاسخ‌گویی به سوالات شما
                درباره انتخاب، خرید و پشتیبانی تجهیزات تخصصی هستند.
              </p>

              {/* دکمه‌های CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <Link
                  href="/contact"
                  className="motion-shimmer inline-flex items-center justify-center gap-2 h-13 px-7 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 py-3.5"
                >
                  <MessageCircle
                    className="w-5 h-5 text-ink-900"
                    aria-hidden="true"
                  />
                  درخواست مشاوره رایگان
                </Link>
                <a
                  href="tel:+982112345678"
                  className="inline-flex items-center justify-center gap-2 h-13 px-7 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border border-gold-400/40 hover:border-gold-400/70 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 py-3.5"
                >
                  <Phone className="w-5 h-5 text-gold-300" aria-hidden="true" />
                  تماس فوری
                </a>
              </div>

              {/* اطلاعات تماس */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm text-white/90">
                <a
                  href="tel:+982112345678"
                  className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors font-medium"
                >
                  <span className="inline-flex w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/30 items-center justify-center">
                    <Phone className="w-4 h-4 text-gold-300" aria-hidden="true" />
                  </span>
                  <span className="num">۰۹۹۶۳۸۰۲۹۵۷</span>
                </a>
                <a
                  href="mailto:mohamadmehdi.neemati@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors font-medium max-w-full"
                >
                  <span className="inline-flex w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/30 items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gold-300" aria-hidden="true" />
                  </span>
                  <span className="truncate">
                    mohamadmehdi.neemati@gmail.com
                  </span>
                </a>
              </div>

              {/* نشان اعتماد */}
              <div className="mt-6 inline-flex items-center gap-2 bg-gold-400/10 backdrop-blur-sm border border-gold-400/30 rounded-full px-4 py-2 text-xs text-gold-200 font-medium">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                پاسخ‌گویی در کمتر از ۲ ساعت کاری
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
