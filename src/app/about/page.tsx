import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Award,
  ShieldCheck,
  Users,
  Calendar,
  Package,
  TrendingUp,
  CheckCircle2,
  ArrowLeft,
  Stethoscope,
  FlaskConical,
  Factory,
  Wrench,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Stats } from "@/components/home/Stats";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "آشنایی با تیرازیس طب ایرانیان — تأمین‌کننده تخصصی تجهیزات پزشکی، آزمایشگاهی و صنعتی با بیش از ۱۵ سال تجربه در سراسر کشور.",
};

const timeline = [
  {
    year: "۱۳۸۹",
    title: "آغاز فعالیت",
    desc: "شروع فعالیت در حوزه تأمین تجهیزات پزشکی با تمرکز بر بازار داخلی.",
  },
  {
    year: "۱۳۹۳",
    title: "توسعه به صنعت",
    desc: "ورود به بازار تجهیزات صنعتی و راه‌اندازی واحد فنی تخصصی.",
  },
  {
    year: "۱۳۹۷",
    title: "خط تولید قطعات",
    desc: "افتتاح خط تولید قطعات صنعتی و پزشکی با استانداردهای بین‌المللی.",
  },
  {
    year: "۱۴۰۰",
    title: "شبکه سراسری",
    desc: "گسترش شبکه توزیع به تمام استان‌ها و راه‌اندازی فروش آنلاین.",
  },
  {
    year: "۱۴۰۴",
    title: "پلتفرم دیجیتال",
    desc: "راه‌اندازی پلتفرم جامع دیجیتال برای مشاهده، مقایسه و سفارش محصولات.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "اصالت و کیفیت",
    desc: "تمام محصولات با ضمانت اصالت و استانداردهای معتبر بین‌المللی عرضه می‌شوند.",
  },
  {
    icon: Heart,
    title: "تعهد به مشتری",
    desc: "رضایت مشتری، پایه هر تصمیم ما در تأمین، پشتیبانی و خدمات پس از فروش است.",
  },
  {
    icon: Award,
    title: "تخصص و تجربه",
    desc: "تیم فنی مجرب با بیش از یک دهه تجربه در حوزه تجهیزات تخصصی.",
  },
  {
    icon: TrendingUp,
    title: "نوآوری مستمر",
    desc: "به‌روزرسانی مداوم سبد محصولات و بهبود فرایندهای تأمین و پشتیبانی.",
  },
];

const specialities = [
  {
    icon: Stethoscope,
    title: "تجهیزات پزشکی",
    desc: "بیمارستانی، درمانگاهی و مراقبت‌های ویژه",
  },
  {
    icon: FlaskConical,
    title: "تجهیزات آزمایشگاهی",
    desc: "تشخیصی، تحقیقاتی و کنترل کیفیت",
  },
  {
    icon: Factory,
    title: "تجهیزات صنعتی",
    desc: "خطوط تولید، اتوماسیون و کنترل فرایند",
  },
  {
    icon: Wrench,
    title: "قطعات و پشتیبانی",
    desc: "تولید قطعات و خدمات نگهداری دوره‌ای",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "درباره ما" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-bl from-brand-50 via-white to-accent-50 border-b border-ink-200">
        <div className="container mx-auto px-4 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
              درباره تیرازیس طب ایرانیان
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-700 leading-[1.3] mb-5">
              همراه مطمئن شما در تأمین تجهیزات تخصصی
            </h1>
            <p className="text-base sm:text-lg text-ink-600 leading-loose">
              از سال ۱۳۸۹ با تعهد به کیفیت، اصالت و پشتیبانی واقعی، در خدمت
              مراکز درمانی، آزمایشگاهی و صنعتی در سراسر کشور هستیم.
            </p>
          </div>
        </div>
      </section>

      {/* داستان */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
                داستان ما
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-700 mb-5 leading-tight">
                از یک دفتر کوچک تا شریک استراتژیک
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-ink-600 leading-loose">
                <p>
                  تیرازیس طب ایرانیان فعالیت خود را در سال ۱۳۸۹ با هدف ارائه
                  تجهیزات پزشکی باکیفیت به مراکز درمانی آغاز کرد. در آن زمان،
                  بازار تجهیزات پزشکی ایران با چالش‌های زیادی مانند نبود تأمین
                  مطمئن و پشتیبانی فنی ضعیف روبرو بود.
                </p>
                <p>
                  با تمرکز بر سه اصل «کیفیت، اصالت و پشتیبانی»، توانستیم اعتماد
                  مراکز درمانی بزرگی را جلب کنیم و به‌تدریج سبد محصولات خود را
                  به تجهیزات آزمایشگاهی، صنعتی و قطعات تولیدی گسترش دهیم.
                </p>
                <p>
                  امروز با شبکه‌ای از شرکای تجاری معتبر داخلی و بین‌المللی،
                  تیمی از کارشناسان مجرب و انبارهای توزیع در سراسر کشور، آماده
                  خدمت‌رسانی به مشتریان هستیم.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-ink-200 p-8">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: Calendar, value: "۱۵+", label: "سال تجربه" },
                  { icon: Users, value: "۸۵۰+", label: "مشتری فعال" },
                  { icon: Package, value: "۱۲۰۰+", label: "محصول" },
                  { icon: Award, value: "۳۵+", label: "گواهی" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="inline-flex w-11 h-11 mb-2 rounded-xl bg-brand-50 text-brand-600 items-center justify-center">
                      <s.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="text-xl sm:text-2xl font-extrabold text-brand-700 num">
                      {s.value}
                    </div>
                    <div className="text-xs text-ink-500 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-20 bg-ink-100/60">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
              تاریخچه
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 leading-tight">
              مسیر رشد و توسعه
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <ol className="relative border-r-2 border-brand-200 pr-6 sm:pr-8 space-y-8">
              {timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -right-[34px] sm:-right-[42px] top-1 w-5 h-5 rounded-full bg-brand-600 border-4 border-white shadow"
                    aria-hidden="true"
                  />
                  <div className="bg-white rounded-2xl border border-ink-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center text-xs font-bold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full num">
                        {t.year}
                      </span>
                      <h3 className="font-bold text-brand-700">
                        {t.title}
                      </h3>
                    </div>
                    <p className="text-sm text-ink-500 leading-loose">
                      {t.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* مأموریت و چشم‌انداز */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-8">
              <span className="inline-flex w-12 h-12 mb-4 rounded-xl bg-brand-50 text-brand-600 items-center justify-center">
                <Target className="w-6 h-6" aria-hidden="true" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-700 mb-3">
                مأموریت ما
              </h2>
              <p className="text-sm sm:text-base text-ink-600 leading-loose">
                تأمین تجهیزات تخصصی باکیفیت و اصیل، همراه با پشتیبانی فنی واقعی،
                به‌گونه‌ای که مشتریان ما با اطمینان کامل به توسعه کسب‌وکار خود
                بپردازند.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-8">
              <span className="inline-flex w-12 h-12 mb-4 rounded-xl bg-accent-50 text-accent-500 items-center justify-center">
                <Eye className="w-6 h-6" aria-hidden="true" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-700 mb-3">
                چشم‌انداز ما
              </h2>
              <p className="text-sm sm:text-base text-ink-600 leading-loose">
                تبدیل شدن به معتبرترین پلتفرم تأمین تجهیزات تخصصی در ایران، با
                شبکه‌ای یکپارچه از تأمین، توزیع، تولید و پشتیبانی در سطح ملی.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="py-14 sm:py-20 bg-ink-100/60">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
              ارزش‌های سازمانی
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 leading-tight">
              اصولی که به آن پایبندیم
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-ink-200 p-6 text-center"
              >
                <span className="inline-flex w-12 h-12 mb-4 rounded-xl bg-brand-50 text-brand-600 items-center justify-center">
                  <v.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="font-bold text-brand-700 mb-2">{v.title}</h3>
                <p className="text-sm text-ink-500 leading-loose">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* آمار */}
      <Stats />

      {/* حوزه‌های تخصصی */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
              حوزه‌های تخصصی
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 leading-tight">
              در چه زمینه‌هایی تخصص داریم؟
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specialities.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-ink-200 p-6 text-center hover:border-brand-300 transition-colors"
              >
                <span className="inline-flex w-14 h-14 mb-4 rounded-2xl bg-accent-50 text-accent-500 items-center justify-center">
                  <s.icon className="w-7 h-7" aria-hidden="true" />
                </span>
                <h3 className="font-bold text-brand-700 mb-2">{s.title}</h3>
                <p className="text-sm text-ink-500 leading-loose">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* مزیت‌های رقابتی + CTA */}
      <section className="py-14 sm:py-20 bg-brand-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-bold text-accent-400 mb-3 tracking-wider">
                مزیت‌های رقابتی
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
                چرا مشتریان ما را انتخاب می‌کنند؟
              </h2>
              <ul className="space-y-3">
                {[
                  "تأمین مستقیم از تولیدکننده و واردکننده معتبر بدون واسطه",
                  "شبکه توزیع سراسری با ارسال سریع و امن",
                  "تیم فنی مجرب برای مشاوره، نصب و راه‌اندازی",
                  "گارانتی معتبر و خدمات پس از فروش واقعی",
                  "دسترسی به قطعات یدکی و قراردادهای نگهداری دوره‌ای",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 shrink-0 text-accent-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base text-white/90 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-3">
                با ما همکاری کنید
              </h3>
              <p className="text-sm text-white/80 leading-loose mb-6">
                برای دریافت مشاوره تخصصی، لیست قیمت یا همکاری تجاری، با
                کارشناسان ما در تماس باشید.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
              >
                تماس با ما
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
