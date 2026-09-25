import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/lib/data/categories";
import {
  Stethoscope,
  FlaskConical,
  Factory,
  Cog,
  Truck,
  Package,
} from "lucide-react";

const iconMap = {
  medical: Stethoscope,
  lab: FlaskConical,
  industrial: Factory,
  parts: Cog,
  imported: Truck,
  consumables: Package,
} as const;

export function Categories() {
  return (
    <section className="py-14 sm:py-20 bg-ink-100/60">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold text-accent-500 mb-3 tracking-wider">
            دسته‌بندی محصولات
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 mb-4 leading-tight">
            محصولات را بر اساس دسته پیدا کنید
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            هزاران محصول متنوع در ۶ دسته‌بندی تخصصی، آماده انتخاب و خرید.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => {
            const Icon = iconMap[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="group bg-white rounded-2xl p-5 border border-ink-200 hover:border-brand-300 hover:shadow-md transition-all text-center"
              >
                <span className="inline-flex w-14 h-14 mb-3 rounded-2xl bg-brand-50 text-brand-600 items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-bold text-brand-700 mb-1 leading-tight">
                  {c.name}
                </h3>
                <p className="text-xs text-ink-400 num mb-2">
                  {c.count.toLocaleString("fa-IR")} محصول
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  مشاهده
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
