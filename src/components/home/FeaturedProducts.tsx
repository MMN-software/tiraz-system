import Link from "next/link";
import { ArrowLeft, Flame, Sparkles, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* گرافیک پس‌زمینه */}
      <div
        className="absolute top-20 -right-40 w-96 h-96 bg-coral-100/30 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* هدر بخش */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-coral-50 text-coral-600 text-xs font-bold px-3 py-1.5 rounded-full border border-coral-100 mb-4">
              <Flame className="w-3.5 h-3.5" aria-hidden="true" />
              محصولات منتخب
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-800 mb-3 leading-tight">
              محصولات
              <span className="text-coral-500"> پرفروش و محبوب</span>
            </h2>
            <p className="text-base text-ink-500 leading-loose">
              محبوب‌ترین محصولات ما بر اساس نظرات مشتریان و فروش هفته‌های اخیر.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 h-12 px-6 bg-white hover:bg-brand-50 text-brand-700 font-bold rounded-xl border-2 border-brand-200 hover:border-brand-400 transition-all self-start lg:self-auto shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-coral-500" aria-hidden="true" />
            مشاهده همه محصولات
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* نشان‌های کوچک بالای گرید */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-xs">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full font-bold border border-brand-100">
            <Flame className="w-3.5 h-3.5 text-coral-500" aria-hidden="true" />
            <span>پرفروش‌ترین‌های این ماه</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-accent-50 text-accent-700 px-3 py-1.5 rounded-full font-bold border border-accent-100">
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>با ضمانت اصالت</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-coral-50 text-coral-600 px-3 py-1.5 rounded-full font-bold border border-coral-100">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ارسال سریع</span>
          </div>
        </div>

        {/* گرید محصولات */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <RevealItem key={product.id} index={i} className="h-full">
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* CTA پایین */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-l from-brand-50 via-white to-accent-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <h3 className="text-base sm:text-lg font-extrabold text-brand-800 mb-1">
              دنبال محصول خاصی هستید؟
            </h3>
            <p className="text-xs sm:text-sm text-ink-500">
              بیش از ۱۶۰۰ محصول در ۶ دسته‌بندی مختلف
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
          >
            جست‌وجو در محصولات
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
