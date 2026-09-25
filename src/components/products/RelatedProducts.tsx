import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { getRelatedProducts } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-ink-100/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-xs font-bold text-accent-500 mb-2 tracking-wider">
              محصولات مرتبط
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-700 leading-tight">
              محصولات مشابه
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors self-start sm:self-auto"
          >
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
