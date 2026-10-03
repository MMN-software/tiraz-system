import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  Factory,
  Cog,
  Truck,
  Package,
  ArrowLeft,
  Layers,
} from "lucide-react";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import type { CategorySlug } from "@/lib/types";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const iconMap: Record<CategorySlug, React.ComponentType<{ className?: string }>> = {
  medical: Stethoscope,
  lab: FlaskConical,
  industrial: Factory,
  parts: Cog,
  imported: Truck,
  consumables: Package,
};

const styleMap: Record<
  CategorySlug,
  {
    iconBg: string;
    hoverBorder: string;
    accentBar: string;
    countBg: string;
  }
> = {
  medical: {
    iconBg: "bg-brand-50 text-brand-600 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white",
    hoverBorder: "hover:border-brand-300",
    accentBar: "from-brand-500 to-brand-600",
    countBg: "bg-brand-50 text-brand-700 group-hover:bg-brand-100",
  },
  lab: {
    iconBg: "bg-accent-50 text-accent-600 group-hover:bg-gradient-to-br group-hover:from-accent-500 group-hover:to-accent-600 group-hover:text-white",
    hoverBorder: "hover:border-accent-300",
    accentBar: "from-accent-500 to-accent-600",
    countBg: "bg-accent-50 text-accent-700 group-hover:bg-accent-100",
  },
  industrial: {
    iconBg: "bg-ink-100 text-ink-700 group-hover:bg-gradient-to-br group-hover:from-ink-600 group-hover:to-ink-800 group-hover:text-white",
    hoverBorder: "hover:border-ink-300",
    accentBar: "from-ink-600 to-ink-800",
    countBg: "bg-ink-100 text-ink-700 group-hover:bg-ink-200",
  },
  parts: {
    iconBg: "bg-coral-50 text-coral-500 group-hover:bg-gradient-to-br group-hover:from-coral-500 group-hover:to-coral-600 group-hover:text-white",
    hoverBorder: "hover:border-coral-300",
    accentBar: "from-coral-500 to-coral-600",
    countBg: "bg-coral-50 text-coral-600 group-hover:bg-coral-100",
  },
  imported: {
    iconBg: "bg-brand-50 text-brand-700 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white",
    hoverBorder: "hover:border-brand-400",
    accentBar: "from-brand-600 to-brand-800",
    countBg: "bg-brand-50 text-brand-700 group-hover:bg-brand-100",
  },
  consumables: {
    iconBg: "bg-accent-50 text-accent-500 group-hover:bg-gradient-to-br group-hover:from-accent-400 group-hover:to-accent-600 group-hover:text-white",
    hoverBorder: "hover:border-accent-200",
    accentBar: "from-accent-400 to-accent-600",
    countBg: "bg-accent-50 text-accent-600 group-hover:bg-accent-100",
  },
};

export function Categories() {
  const categoryCounts: Record<CategorySlug, number> = {
    medical: products.filter((p) => p.category === "medical").length,
    lab: products.filter((p) => p.category === "lab").length,
    industrial: products.filter((p) => p.category === "industrial").length,
    parts: products.filter((p) => p.category === "parts").length,
    imported: products.filter((p) => p.category === "imported").length,
    consumables: products.filter((p) => p.category === "consumables").length,
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-ink-50 via-white to-ink-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0891b2 1px, transparent 0)",
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
            محصولات را بر اساس
            <span className="text-brand-500"> دسته‌بندی </span>
            پیدا کنید
          </h2>
          <p className="text-base text-ink-500 leading-loose">
            محصولات متنوع در <strong className="text-brand-700">۶ دسته‌بندی</strong> تخصصی،
            آماده انتخاب و خرید.
          </p>
        </div>

        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((c) => {
            const Icon = iconMap[c.slug];
            const styles = styleMap[c.slug];
            const count = categoryCounts[c.slug];
            return (
              <RevealItem key={c.slug} index={categories.indexOf(c)} className="h-full">
              <Link
                href={`/products?category=${c.slug}`}
                className={`motion-card-lift group relative bg-white rounded-2xl p-5 border border-ink-200 ${styles.hoverBorder} text-center overflow-hidden flex flex-col h-full`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${styles.accentBar} opacity-0 group-hover:opacity-100 transition-opacity`}
                  aria-hidden="true"
                />

                <span
                  className={`relative inline-flex w-14 h-14 mb-3.5 rounded-2xl motion-icon-rotate ${styles.iconBg} items-center justify-center transition-all duration-300 mx-auto shadow-sm`}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </span>

                <h3 className="relative text-sm font-extrabold text-brand-800 mb-1.5 leading-tight group-hover:text-brand-600 transition-colors">
                  {c.name}
                </h3>

                <span
                  className={`relative inline-flex items-center justify-center text-[11px] font-bold ${styles.countBg} px-2.5 py-1 rounded-full mb-3 num mx-auto transition-colors`}
                >
                  {count.toLocaleString("fa-IR")} محصول
                </span>

                <span className="relative inline-flex items-center justify-center gap-1 text-[11px] font-bold text-brand-600 group-hover:text-coral-500 transition-colors mt-auto">
                  مشاهده
                  <ArrowLeft
                    className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 h-12 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
