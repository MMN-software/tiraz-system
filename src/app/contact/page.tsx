import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباط با تیرازیس طب ایرانیان — تلفن، ایمیل، آدرس و فرم تماس آنلاین. کارشناسان ما آماده پاسخگویی به شما هستند.",
};

const contactItems = [
  {
    icon: Phone,
    title: "تماس تلفنی",
    value: "۰۹۹۶۳۸۰۲۹۵۷",
    href: "tel:+982112345678",
    desc: "شنبه تا چهارشنبه ۸ تا ۱۷",
    ltr: false,
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: "mohamadmehdi.neemati@gmail.com",
    href: "mailto:mohamadmehdi.neemati@gmail.com",
    desc: "پاسخ حداکثر تا ۲۴ ساعت",
    ltr: true,
  },
  {
    icon: MapPin,
    title: "آدرس دفتر",
    value: "تهران، خیابان نمونه، پلاک ۱۲، طبقه ۳",
    href: null,
    desc: "مراجعه با هماهنگی قبلی",
    ltr: false,
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا چهارشنبه",
    href: null,
    desc: "۸:۰۰ الی ۱۷:۰۰",
    ltr: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "تماس با ما" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-bl from-brand-50 via-white to-accent-50 border-b border-ink-200">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
              ارتباط با ما
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-700 leading-tight mb-4">
              در خدمت شما هستیم
            </h1>
            <p className="text-base sm:text-lg text-ink-600 leading-loose">
              برای مشاوره خرید، پشتیبانی فنی یا هرگونه سؤال درباره محصولات،
              از راه‌های زیر با ما در تماس باشید.
            </p>
          </div>
        </div>
      </section>

      {/* کارت‌های تماس */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactItems.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <span className="inline-flex w-11 h-11 mb-3 rounded-xl bg-brand-50 text-brand-600 items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xs font-medium text-ink-500 mb-1">
                    {c.title}
                  </h3>
                  <p
                    className={`text-sm font-bold text-brand-700 mb-1 leading-snug ${
                      c.ltr ? "" : "num"
                    }`}
                    dir={c.ltr ? "ltr" : "rtl"}
                  >
                    {c.value}
                  </p>
                  <p className="text-xs text-ink-400">{c.desc}</p>
                </>
              );

              if (c.href) {
                return (
                  <a
                    key={i}
                    href={c.href}
                    className="group bg-white rounded-2xl border border-ink-200 p-5 hover:border-brand-300 hover:shadow-md transition-all"
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <div
                  key={i}
                  className="group bg-white rounded-2xl border border-ink-200 p-5"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* فرم + نقشه */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
            {/* فرم */}
            <div>
              <ContactForm />
            </div>

            {/* سایدبار */}
            <aside className="space-y-4">
              {/* تماس سریع */}
              <div className="bg-brand-700 text-white rounded-2xl p-6">
                <span className="inline-flex w-11 h-11 mb-4 rounded-xl bg-white/10 text-accent-400 items-center justify-center">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold mb-2">تماس سریع</h3>
                <p className="text-sm text-white/70 leading-loose mb-4">
                  اگر عجله دارید، مستقیم با ما تماس بگیرید.
                </p>
                <a
                  href="tel:+982112345678"
                  className="block text-center h-11 leading-[2.75rem] bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg num transition-colors mb-2"
                >
                  ۰۹۹۶۳۸۰۲۹۵۷
                </a>
                <a
                  href="mailto:mohamadmehdi.neemati@gmail.com"
                  className="block text-center h-11 leading-[2.75rem] bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors text-xs sm:text-sm"
                  dir="ltr"
                >
                  mohamadmehdi.neemati@gmail.com
                </a>
              </div>

              {/* نقشه placeholder */}
              <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-brand-50 to-accent-50 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full opacity-30"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 100 Q60 40 100 100 T180 100"
                      stroke="#0f3d5c"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M30 120 Q80 80 120 130 T180 130"
                      stroke="#0f3d5c"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white/90 backdrop-blur rounded-2xl px-6 py-4 shadow-lg border border-ink-200">
                      <MapPin
                        className="w-8 h-8 mx-auto text-brand-600 mb-2"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-bold text-brand-700 mb-1">
                        دفتر مرکزی
                      </p>
                      <p className="text-xs text-ink-500">
                        تهران، خیابان نمونه، پلاک ۱۲
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-ink-200 text-center">
                  <p className="text-xs text-ink-400">
                    نقشه در نسخه نهایی با موقعیت دقیق جایگزین می‌شود.
                  </p>
                </div>
              </div>

              {/* شبکه‌های اجتماعی */}
              <div className="bg-white rounded-2xl border border-ink-200 p-5">
                <h3 className="text-sm font-bold text-brand-700 mb-3">
                  ما را دنبال کنید
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="#"
                    aria-label="اینستاگرام تیرازیس طب"
                    className="inline-flex items-center justify-center h-10 bg-ink-50 hover:bg-brand-50 text-ink-600 hover:text-brand-600 rounded-lg text-xs font-medium transition-colors"
                  >
                    اینستاگرام
                  </a>
                  <a
                    href="#"
                    aria-label="لینکدین تیرازیس طب"
                    className="inline-flex items-center justify-center h-10 bg-ink-50 hover:bg-brand-50 text-ink-600 hover:text-brand-600 rounded-lg text-xs font-medium transition-colors"
                  >
                    لینکدین
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA پایانی */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="inline-flex w-12 h-12 shrink-0 rounded-xl bg-white text-brand-600 items-center justify-center border border-ink-200">
                <Send className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-brand-700 mb-1">
                  به دنبال محصول خاصی هستید؟
                </h2>
                <p className="text-xs sm:text-sm text-ink-500">
                  فهرست کامل محصولات ما را مشاهده کنید.
                </p>
              </div>
            </div>
            <a
              href="/products"
              className="inline-flex items-center justify-center h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
            >
              مشاهده محصولات
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
