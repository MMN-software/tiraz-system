import Link from "next/link";
import { ArrowRight, ArrowLeft, Tag } from "lucide-react";
import type { Product } from "@/lib/types";
import { products } from "@/lib/data/products";

interface Props {
  product: Product;
}

export function ProductNavigation({ product }: Props) {
  // محصولات همون دسته
  const siblings = products.filter((p) => p.category === product.category);
  const currentIndex = siblings.findIndex((p) => p.id === product.id);
  if (currentIndex === -1) return null;

  const prev = siblings[currentIndex - 1] ?? null;
  const next = siblings[currentIndex + 1] ?? null;

  // اگه محصول تنها در دسته بود، نمایش نده
  if (!prev && !next) return null;

  return (
    <section className="py-8 sm:py-10 bg-white border-t border-ink-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* محصول قبلی */}
          {prev ? (
            <Link
              href={`/products/${prev.slug}`}
              className="group flex items-center gap-3 bg-ink-50 hover:bg-brand-50 border border-ink-200 hover:border-brand-300 rounded-2xl p-4 transition-all"
              aria-label={`محصول قبلی: ${prev.name}`}
            >
              <span className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-white border border-ink-200 group-hover:border-brand-300 group-hover:bg-brand-600 group-hover:text-white text-brand-600 items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] text-ink-400 mb-0.5">
                  محصول قبلی
                </div>
                <div className="text-sm font-bold text-brand-700 truncate group-hover:text-accent-500 transition-colors">
                  {prev.name}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-ink-400 mt-0.5 num">
                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                  {prev.code}
                </div>
              </div>
            </Link>
          ) : (
            <div
              className="hidden sm:block bg-ink-50/50 border border-dashed border-ink-200 rounded-2xl p-4 text-center text-xs text-ink-400 self-stretch"
              aria-hidden="true"
            >
              اولین محصول این دسته
            </div>
          )}

          {/* محصول بعدی */}
          {next ? (
            <Link
              href={`/products/${next.slug}`}
              className="group flex items-center gap-3 bg-ink-50 hover:bg-brand-50 border border-ink-200 hover:border-brand-300 rounded-2xl p-4 transition-all sm:flex-row-reverse sm:text-left"
              aria-label={`محصول بعدی: ${next.name}`}
            >
              <span className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-white border border-ink-200 group-hover:border-brand-300 group-hover:bg-brand-600 group-hover:text-white text-brand-600 items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 sm:text-left">
                <div className="text-[10px] text-ink-400 mb-0.5 text-right sm:text-left">
                  محصول بعدی
                </div>
                <div className="text-sm font-bold text-brand-700 truncate group-hover:text-accent-500 transition-colors sm:text-left">
                  {next.name}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-ink-400 mt-0.5 num justify-end sm:justify-start">
                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                  {next.code}
                </div>
              </div>
            </Link>
          ) : (
            <div
              className="hidden sm:block bg-ink-50/50 border border-dashed border-ink-200 rounded-2xl p-4 text-center text-xs text-ink-400 self-stretch"
              aria-hidden="true"
            >
              آخرین محصول این دسته
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
