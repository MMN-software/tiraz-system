import Link from "next/link";
import { Stethoscope, Pill, ArrowLeft, Layers } from "lucide-react";
import type { CategorySlug } from "@/lib/types";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const categories: {
  slug: CategorySlug;
  name: string;
  description: string;
  count: number;
  icon: typeof Stethoscope;
  href: string;
}[] = [
  {
    slug: "medical",
    name: "تجهیزات پزشکی و بیمارستانی",
    description:
      "تجهیزات تخصصی بیمارستانی، آزمایشگاهی، درمانگاهی و مراقبت‌های ویژه برای مراکز درمانی، بیمارستان‌ها و کلینیک‌ها.",
    count: 450,
    icon: Stethoscope,
    href: "/products?category=medical",
  },
  {
    slug: "beauty",
    name: "دارو، آرایشی، بهداشتی و مواد اولیه دارویی",
    description:
      "داروها، محصولات آرایشی-بهداشتی و مواد اولیه دارویی از برندهای معتبر با ضمانت اصالت و کیفیت.",
    count: 320,
    icon: Pill,
    href: "/products?category=beauty",
  },
];

const styleMap: Record<
  CategorySlug,
  {
    wrapper: string;
    iconBg: string;
    iconColor: string;
    accentBar: string;
    countBg: string;
    countText: string;
    ctaText: string;
    ctaHover: string;
  }
> = {
  medical: {
    wrapper:
      "bg-gradient-to-br from-brand-50 via-white to-brand-100/60 border-brand-200 hover:border-brand-400",
    iconBg: "bg-brand-100/60 group-hover:bg-brand-600",
    iconColor: "text-brand-700 group-hover:text-white",
    accentBar: "from-brand-600 to-brand-700",
    countBg: "bg-brand-100/60",
    countText: "text-brand-800",
    ctaText: "text-brand-700",
    ctaHover: "group-hover:text-brand-800",
  },
  beauty: {
    wrapper:
      "bg-gradient-to-br from-rose-100 via-white to-gold-50/60 border-rose-200 hover:border-rose-400",
    iconBg: "bg-rose-100 group-hover:bg-rose-500",
    iconColor: "text-rose-600 group-hover:text-white",
    accentBar: "from-rose-500 to-rose-600",
    countBg: "bg-rose-100",
    countText: "text-rose-700",
    ctaText: "text-rose-600",
    ctaHover: "group-hover:text-rose-700",
  },
};

export function Categories() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-ink-50 via-white to-ink-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A6470 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 mb-4">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            دسته‌بندی محصولات
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-800 mb-4 leading-tight">
            محصولات ما در
            <span className="text-gold-600"> دو دسته تخصصی</span>
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            تجهیزات پزشکی و بیمارستانی، و دارو و محصولات آرایشی-بهداشتی، با
            ضمانت اصالت و کیفیت.
          </p>
        </div>

        <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((c, i) => {
            const Icon = c.icon;
            const s = styleMap[c.slug];
            return (
              <RevealItem key={c.slug} index={i} className="h-full">
                <Link
                  href={c.href}
                  className={`motion-card-lift group relative block rounded-3xl p-8 border-2 transition-all overflow-hidden h-full ${s.wrapper}`}
                >
                  {/* نوار رنگی بالا */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l ${s.accentBar} opacity-60 group-hover:opacity-100 transition-opacity`}
                    aria-hidden="true"
                  />

                  {/* آیکون */}
                  <span
                    className={`relative inline-flex w-16 h-16 mb-6 rounded-2xl ${s.iconBg} ${s.iconColor} items-center justify-center transition-all duration-300 shadow-sm motion-icon-rotate`}
                  >
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </span>

                  {/* عنوان */}
                  <h3 className="relative text-xl sm:text-2xl font-extrabold text-brand-900 mb-3 leading-snug">
                    {c.name}
                  </h3>

                  {/* توضیح */}
                  <p className="relative text-sm sm:text-base text-ink-600 leading-loose mb-6">
                    {c.description}
                  </p>

                  {/* تعداد + CTA */}
                  <div className="relative flex items-center justify-between flex-wrap gap-3">
                    <span
                      className={`inline-flex items-center justify-center text-xs font-bold ${s.countBg} ${s.countText} px-3 py-1.5 rounded-full num`}
                    >
                      {c.count.toLocaleString("fa-IR")} محصول
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${s.ctaText} ${s.ctaHover}`}
                    >
                      مشاهده محصولات
                      <ArrowLeft
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="motion-shimmer inline-flex items-center gap-2 h-12 px-6 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}