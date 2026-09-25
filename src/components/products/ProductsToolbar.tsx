"use client";

import { Search, X, Loader2, SlidersHorizontal } from "lucide-react";

export type SortKey = "newest" | "popular" | "name-asc" | "name-desc";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  resultCount: number;
  isPending: boolean;
  hasActiveFilters: boolean;
  onOpenFilters: () => void;
}

export function ProductsToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  resultCount,
  isPending,
  hasActiveFilters,
  onOpenFilters,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* جست‌وجو */}
        <div className="relative flex-1">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جست‌وجوی نام، کد یا برند..."
            aria-label="جست‌وجو در محصولات"
            className="w-full h-11 pr-10 pl-10 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="پاک کردن جست‌وجو"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
          {isPending && (
            <Loader2
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500 animate-spin"
              aria-hidden="true"
            />
          )}
        </div>

        {/* مرتب‌سازی + دکمه فیلتر موبایل */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              aria-label="مرتب‌سازی محصولات"
              className="w-full sm:w-auto h-11 pl-8 pr-3 text-sm rounded-lg border border-ink-200 bg-white text-ink-700 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-colors appearance-none cursor-pointer"
            >
              <option value="newest">جدیدترین</option>
              <option value="popular">محبوب‌ترین</option>
              <option value="name-asc">نام (الف تا ی)</option>
              <option value="name-desc">نام (ی تا الف)</option>
            </select>
            <span
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none text-xs"
            >
              ▼
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenFilters}
            className="lg:hidden h-11 px-4 inline-flex items-center gap-2 text-sm font-medium rounded-lg border border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-600 transition-colors relative"
            aria-label="باز کردن فیلترها"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            فیلتر
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-accent-500 absolute top-2 left-2" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
        <span className="num">
          <strong className="text-brand-700 font-bold">
            {resultCount.toLocaleString("fa-IR")}
          </strong>{" "}
          محصول یافت شد
        </span>
        {isPending && (
          <span className="flex items-center gap-1.5 text-brand-600">
            <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
            در حال به‌روزرسانی...
          </span>
        )}
      </div>
    </div>
  );
}
