import Link from "next/link";
import { ArrowLeft, Flame, Sparkles, TrendingUp } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCarousel } from "@/components/products/ProductCarousel";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white to-ink-50">
      <div
        className="absolute top-20 -right-40 w-96 h-96 bg-gold-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* هدر */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 text-xs font-bold px-3 py-1.5 rounded-full border border-gold-200 mb-4">
              <Flame className="w-3.5 h-3.5" aria-hidden="true" />
              محصولات منتخب
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900 mb-3 leading-tight">
              محصولات
              <span className="text-gold-600"> پرفروش و محبوب</span>
            </h2>
            <p className="text-base text-ink-500 leading-loose">
              محبوب‌ترین محصولات ما بر اساس نظرات مشتریان و فروش هفته‌های اخیر.
            </p>
          </div>

          <Link
            href="/products"
            className="motion-shimmer group inline-flex items-center gap-2 h-12 px-6 bg-white hover:bg-gold-50 text-brand-800 font-bold rounded-xl border-2 border-gold-200 hover:border-gold-400 transition-all self-start lg:self-auto shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-gold-500" aria-hidden="true" />
            مشاهده همه محصولات
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* نشان‌های کوچک */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-xs">
          <div className="inline-flex items-center gap-1.5 bg-gold-100 text-gold-700 px-3 py-1.5 rounded-full font-bold border border-gold-200">
            <Flame className="w-3.5 h-3.5" aria-hidden="true" />
            <span>پرفروش‌ترین‌های این ماه</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full font-bold border border-brand-100">
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>با ضمانت اصالت</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1.5 rounded-full font-bold border border-rose-200">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ارسال سریع</span>
          </div>
        </div>

        {/* کاروسل */}
        <ProductCarousel products={featured} autoScrollMs={7000} />
      </div>
    </section>
  );
}
