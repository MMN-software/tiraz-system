import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-xs font-bold text-accent-500 mb-2 tracking-wider">
              محصولات منتخب
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 leading-tight">
              محصولات پرفروش و محبوب
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
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
