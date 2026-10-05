import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCarousel } from "@/components/products/ProductCarousel";

type Props = {
  kicker: string;
  title: string;
  titleAccent: string;
  description: string;
  products: readonly Product[];
  category: "medical" | "beauty";
  href: string;
};

const styles = {
  medical: {
    section: "bg-ink-50",
    kicker: "bg-brand-50 text-brand-700 border-brand-100",
    titleAccent: "text-brand-600",
    blur: "bg-brand-100/30",
    linkBorder: "border-brand-200 hover:border-brand-400 hover:bg-brand-50",
    linkText: "text-brand-700",
  },
  beauty: {
    section: "bg-white",
    kicker: "bg-rose-100 text-rose-700 border-rose-200",
    titleAccent: "text-rose-500",
    blur: "bg-rose-100/30",
    linkBorder: "border-rose-200 hover:border-rose-400 hover:bg-rose-50",
    linkText: "text-rose-600",
  },
};

export function ProductSection({
  kicker,
  title,
  titleAccent,
  description,
  products,
  category,
  href,
}: Props) {
  const s = styles[category];
  if (products.length === 0) return null;

  return (
    <section className={`py-16 sm:py-24 relative overflow-hidden ${s.section}`}>
      <div
        className={`absolute top-20 -right-40 w-96 h-96 rounded-full blur-3xl ${s.blur}`}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span
              className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border mb-4 ${s.kicker}`}
            >
              {kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900 mb-3 leading-tight">
              {title}
              <span className={s.titleAccent}> {titleAccent}</span>
            </h2>
            <p className="text-base text-ink-500 leading-loose">{description}</p>
          </div>

          <Link
            href={href}
            className={`motion-shimmer group inline-flex items-center gap-2 h-12 px-6 bg-white font-bold rounded-xl border-2 transition-all self-start lg:self-auto shadow-sm ${s.linkBorder} ${s.linkText}`}
          >
            مشاهده همه
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ProductCarousel products={products} autoScrollMs={7000} />
      </div>
    </section>
  );
}
