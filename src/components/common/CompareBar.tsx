"use client";

import Link from "next/link";
import { X, GitCompareArrows, Trash2 } from "lucide-react";
import { useCompare } from "./Compare";
import { products } from "@/lib/data/products";

export function CompareBar() {
  const { items, count, remove, clear, ready, max } = useCompare();

  if (!ready || count === 0) return null;

  const selected = products.filter((p) => items.includes(p.id));
  const canCompare = count >= 2;

  return (
    <div className="fixed bottom-16 sm:bottom-4 inset-x-4 z-[70] animate-[slideUp_0.25s_ease-out]">
      <div className="bg-brand-700 text-white rounded-2xl shadow-2xl border border-brand-600 overflow-hidden">
        <div className="p-3 sm:p-4 flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {/* آیکون و شمارنده */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex w-9 h-9 rounded-xl bg-white/10 text-accent-400 items-center justify-center">
              <GitCompareArrows className="w-5 h-5" aria-hidden="true" />
            </span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold">مقایسه محصولات</p>
              <p className="text-[10px] text-white/60 num">
                {count.toLocaleString("fa-IR")} از {max.toLocaleString("fa-IR")}
              </p>
            </div>
          </div>

          {/* لیست محصولات انتخاب‌شده */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto min-w-0">
            {selected.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1 shrink-0 max-w-[180px]"
              >
                <span className="text-[11px] font-medium truncate">
                  {p.name}
                </span>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  aria-label={`حذف ${p.name}`}
                  className="w-4 h-4 rounded-full hover:bg-white/20 flex items-center justify-center shrink-0"
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* دکمه‌ها */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={clear}
              aria-label="پاک کردن همه"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              title="پاک کردن همه"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
            {canCompare ? (
              <Link
                href="/compare"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-9 px-4 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                مقایسه ({count.toLocaleString("fa-IR")})
              </Link>
            ) : (
              <span className="flex-1 sm:flex-initial inline-flex items-center justify-center h-9 px-4 bg-white/10 text-white/50 text-xs rounded-lg whitespace-nowrap">
                حداقل ۲ محصول انتخاب کنید
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
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
    </div>
  );
}
