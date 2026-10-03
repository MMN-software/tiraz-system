"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Tag, Eye, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { WishlistButton } from "@/components/common/WishlistButton";
import { CompareButton } from "@/components/common/CompareButton";
import { QuickView } from "./QuickView";
import { ProductImage } from "./ProductImage";

const badgeStyles: Record<
  string,
  { label: string; cls: string; icon: React.ComponentType<{ className?: string }> }
> = {
  new: { label: "جدید", cls: "bg-accent-500", icon: Sparkles },
  bestseller: { label: "پرفروش", cls: "bg-coral-500", icon: Sparkles },
  discount: { label: "تخفیف ویژه", cls: "bg-brand-600", icon: Sparkles },
};

export function ProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const badge = product.badge ? badgeStyles[product.badge] : null;
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <article className="motion-card-lift group relative bg-white rounded-2xl border border-ink-200 hover:border-brand-300 overflow-hidden flex flex-col">
        {/* تصویر */}
        <div className="relative aspect-square overflow-hidden bg-ink-100">
          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0"
            aria-label={product.name}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
            />
          </Link>

          {/* Badge */}
          {badge && (
            <span
              className={`absolute top-3 right-3 ${badge.cls} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-md flex items-center gap-1`}
            >
              <badge.icon className="w-3 h-3" aria-hidden="true" />
              {badge.label}
            </span>
          )}

          {/* دکمه مشاهده سریع */}
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            aria-label={`مشاهده سریع ${product.name}`}
            className="absolute bottom-3 inset-x-3 h-9 bg-white/95 backdrop-blur text-brand-700 hover:bg-brand-600 hover:text-white text-xs font-bold rounded-lg border border-ink-200 hover:border-brand-600 transition-colors flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all z-10 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            مشاهده سریع
          </button>
        </div>

        {/* دکمه‌های شناور (علاقه‌مندی و مقایسه) */}
        <WishlistButton productId={product.id} productName={product.name} />
        <CompareButton productId={product.id} productName={product.name} />

        {/* اطلاعات */}
        <div className="p-4 flex flex-col flex-1">
          {category && (
            <span className="inline-flex items-center gap-1.5 text-xs text-accent-600 font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              {category.name}
            </span>
          )}

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-brand-800 text-sm mb-2 leading-snug flex-1 line-clamp-2 hover:text-accent-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-ink-500 leading-relaxed mb-3 line-clamp-2">
            {product.shortDesc}
          </p>

          <div className="flex items-center justify-between gap-2 mb-3 mt-auto">
            <div className="flex items-center gap-1.5 text-xs text-ink-400 num">
              <Tag className="w-3 h-3" aria-hidden="true" />
              کد: {product.code}
            </div>
            {product.brand && (
              <span className="text-[10px] text-ink-500 bg-ink-50 px-2 py-0.5 rounded-full border border-ink-100 num">
                {product.brand}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 h-10 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white text-sm font-bold rounded-lg transition-colors"
          >
            مشاهده جزئیات
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </article>

      {quickViewOpen && (
        <QuickView
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}
