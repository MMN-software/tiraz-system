"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  X,
  Tag,
  Award,
  Layers,
  ShieldCheck,
  ArrowLeft,
  Phone,
  CheckCircle2,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { WishlistButton } from "@/components/common/WishlistButton";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: Props) {
  // قفل اسکرول + کلید Escape
  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const category = getCategoryBySlug(product.category);

  return (
    <>
      {/* پس‌زمینه تیره */}
      <div
        className="fixed inset-0 bg-ink-900/60 z-[80] animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* پنل مودال */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`نمای سریع ${product.name}`}
        className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-[90] p-0 sm:p-4 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white w-full sm:max-w-3xl sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto animate-[slideUp_0.25s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          {/* هدر مودال */}
          <div className="sticky top-0 bg-white border-b border-ink-100 px-4 sm:px-6 py-3 flex items-center justify-between z-10">
            <h2 className="text-sm sm:text-base font-bold text-brand-700">
              مشاهده سریع
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="w-9 h-9 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-700 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* محتوا */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* تصویر */}
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 border border-ink-200 flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 64 64"
                className="w-24 h-24 text-brand-300"
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
              <div className="absolute top-3 left-3">
                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  position="card"
                />
              </div>
            </div>

            {/* اطلاعات */}
            <div className="flex flex-col">
              {category && (
                <Link
                  href={`/products?category=${category.slug}`}
                  className="inline-block text-xs font-bold text-accent-500 mb-1 hover:text-accent-600 transition-colors"
                >
                  {category.name}
                </Link>
              )}

              <h3 className="text-lg sm:text-xl font-extrabold text-brand-700 leading-snug mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-ink-600 leading-loose mb-4">
                {product.shortDesc}
              </p>

              {/* اطلاعات کوتاه */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Chip
                  icon={Tag}
                  label="کد"
                  value={product.code}
                  ltr
                />
                <Chip icon={Award} label="برند" value={product.brand} />
                {category && (
                  <Chip
                    icon={Layers}
                    label="دسته"
                    value={category.shortName}
                  />
                )}
                <Chip
                  icon={ShieldCheck}
                  label="گارانتی"
                  value="۱۸ ماه"
                />
              </div>

              {/* ویژگی‌ها */}
              {product.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-ink-600 mb-2">
                    ویژگی‌های کلیدی:
                  </p>
                  <ul className="space-y-1.5">
                    {product.features.slice(0, 3).map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-ink-600"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-500"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* دکمه‌ها */}
              <div className="flex flex-col gap-2 mt-auto pt-2">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center justify-center gap-2 h-11 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  مشاهده جزئیات کامل
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:+982112345678"
                  className="inline-flex items-center justify-center gap-2 h-11 bg-accent-50 hover:bg-accent-100 text-accent-600 text-sm font-medium rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  تماس فوری برای مشاوره
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* انیمیشن */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function Chip({
  icon: Icon,
  label,
  value,
  ltr,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-lg px-2 py-1.5 min-w-0">
      <Icon className="w-3.5 h-3.5 shrink-0 text-brand-600" aria-hidden="true" />
      <div className="min-w-0">
        <div className="text-[9px] text-ink-400 leading-none">{label}</div>
        <div
          className={`text-xs font-bold text-brand-700 truncate ${
            ltr ? "num" : ""
          }`}
          dir={ltr ? "ltr" : "rtl"}
          style={ltr ? { textAlign: "right" } : undefined}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
