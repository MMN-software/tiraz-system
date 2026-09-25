"use client";

import { X, Check } from "lucide-react";
import type { ProductBadge } from "@/lib/types";

const badgeOptions: { value: Exclude<ProductBadge, null>; label: string; color: string }[] = [
  { value: "new", label: "جدید", color: "bg-accent-500" },
  { value: "bestseller", label: "پرفروش", color: "bg-brand-600" },
  { value: "discount", label: "تخفیف ویژه", color: "bg-amber-500" },
];

interface Props {
  allBrands: string[];
  selectedBrands: string[];
  selectedBadges: ProductBadge[];
  onToggleBrand: (b: string) => void;
  onToggleBadge: (b: Exclude<ProductBadge, null>) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function ProductsFilters({
  allBrands,
  selectedBrands,
  selectedBadges,
  onToggleBrand,
  onToggleBadge,
  onClear,
  hasActiveFilters,
}: Props) {
  return (
    <div className="space-y-3">
      {/* برند */}
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <div className="p-4 border-b border-ink-100">
          <h3 className="font-bold text-brand-700 text-sm">برند</h3>
        </div>
        <div className="p-2 max-h-64 overflow-y-auto">
          {allBrands.map((b) => {
            const checked = selectedBrands.includes(b);
            return (
              <button
                key={b}
                type="button"
                onClick={() => onToggleBrand(b)}
                aria-pressed={checked}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-brand-50 transition-colors text-right"
              >
                <span
                  className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-brand-600 border-brand-600"
                      : "bg-white border-ink-300"
                  }`}
                  aria-hidden="true"
                >
                  {checked && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </span>
                <span className="flex-1">{b}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* وضعیت */}
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <div className="p-4 border-b border-ink-100">
          <h3 className="font-bold text-brand-700 text-sm">وضعیت محصول</h3>
        </div>
        <div className="p-2">
          {badgeOptions.map((opt) => {
            const checked = selectedBadges.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onToggleBadge(opt.value)}
                aria-pressed={checked}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-brand-50 transition-colors text-right"
              >
                <span
                  className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-brand-600 border-brand-600"
                      : "bg-white border-ink-300"
                  }`}
                  aria-hidden="true"
                >
                  {checked && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </span>
                <span className={`w-2 h-2 rounded-full ${opt.color}`} aria-hidden="true" />
                <span className="flex-1">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* پاک کردن */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="w-full inline-flex items-center justify-center gap-2 h-10 text-sm font-medium text-ink-600 hover:text-red-600 bg-white hover:bg-red-50 border border-ink-200 hover:border-red-200 rounded-xl transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
          پاک کردن همه فیلترها
        </button>
      )}
    </div>
  );
}
