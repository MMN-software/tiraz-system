"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Tag, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { WishlistButton } from "@/components/common/WishlistButton";
import { CompareButton } from "@/components/common/CompareButton";
import { QuickView } from "./QuickView";

const badgeStyles: Record<string, { label: string; cls: string }> = {
  new: { label: "جدید", cls: "bg-accent-500" },
  bestseller: { label: "پرفروش", cls: "bg-brand-600" },
  discount: { label: "تخفیف ویژه", cls: "bg-amber-500" },
};

export function ProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const badge = product.badge ? badgeStyles[product.badge] : null;
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <article className="group relative bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-lg transition-all overflow-hidden flex flex-col">
        <div className="relative aspect-square bg-gradient-to-br from-brand-50 to-accent-50 flex items-center justify-center overflow-hidden">
          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={product.name}
          >
            {badge && (
              <span
                className={`absolute top-3 right-3 ${badge.cls} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10`}
              >
                {badge.label}
              </span>
            )}
            <svg
              viewBox="0 0 64 64"
              className="w-20 h-20 text-brand-300 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="16"
                width="48"
                height="32"
                rx="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 32h8l4-6 4 12 4-6h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            aria-label={`مشاهده سریع ${product.name}`}
            className="absolute bottom-3 inset-x-3 h-9 bg-white/95 backdrop-blur text-brand-700 hover:bg-brand-600 hover:text-white text-xs font-medium rounded-lg border border-ink-200 hover:border-brand-600 transition-colors flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            مشاهده سریع
          </button>
        </div>

        <WishlistButton productId={product.id} productName={product.name} />
        <CompareButton productId={product.id} productName={product.name} />

        <div className="p-4 flex flex-col flex-1">
          {category && (
            <span className="text-xs text-accent-500 font-medium mb-1">
              {category.name}
            </span>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-brand-700 text-sm mb-2 leading-snug flex-1 line-clamp-2 hover:text-accent-500 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-ink-500 leading-relaxed mb-3 line-clamp-2">
            {product.shortDesc}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-ink-400 mb-3 num mt-auto">
            <Tag className="w-3 h-3" aria-hidden="true" />
            کد: {product.code}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 h-10 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white text-sm font-medium rounded-lg transition-colors"
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
