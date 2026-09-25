"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { PackageX, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { CategorySidebar } from "./CategorySidebar";
import { ProductsToolbar, type SortKey } from "./ProductsToolbar";
import { ProductsFilters } from "./ProductsFilters";
import { categories, getCategoryBySlug } from "@/lib/data/categories";
import type { Product, ProductBadge } from "@/lib/types";

interface Props {
  allProducts: Product[];
}

export function ProductsView({ allProducts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // خواندن از URL
  const urlCategory = searchParams.get("category");
  const urlQ = searchParams.get("q") ?? "";
  const urlBrands = (searchParams.get("brand") ?? "").split(",").filter(Boolean);
  const urlBadges = (searchParams.get("badge") ?? "")
    .split(",")
    .filter(Boolean) as ProductBadge[];
  const urlSort = (searchParams.get("sort") as SortKey) ?? "newest";

  // local state برای input جست‌وجو
  const [searchInput, setSearchInput] = useState(urlQ);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // سینک با URL
  useEffect(() => {
    setSearchInput(urlQ);
  }, [urlQ]);

  // debounce جست‌وجو
  useEffect(() => {
    if (searchInput === urlQ) return;
    const t = setTimeout(() => {
      updateParams({ q: searchInput || null });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  function updateParams(patch: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === "") params.delete(k);
      else params.set(k, v);
    });
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  function toggleArrayParam(key: string, value: string) {
    const current = (searchParams.get(key) ?? "").split(",").filter(Boolean);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParams({ [key]: next.length ? next.join(",") : null });
  }

  function clearAll() {
    const params = new URLSearchParams();
    if (urlCategory) params.set("category", urlCategory);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
    setSearchInput("");
  }

  const allBrands = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, [allProducts]);

  const activeCategory = getCategoryBySlug(urlCategory ?? undefined);

  const filtered = useMemo(() => {
    let list = allProducts.slice();

    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory.slug);
    }

    if (urlQ.trim()) {
      const q = urlQ.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }

    if (urlBrands.length) {
      list = list.filter((p) => urlBrands.includes(p.brand));
    }

    if (urlBadges.length) {
      list = list.filter(
        (p) => p.badge !== null && urlBadges.includes(p.badge)
      );
    }

    switch (urlSort) {
      case "newest":
        list.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        list.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.id - a.id
        );
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name, "fa"));
        break;
    }

    return list;
  }, [allProducts, activeCategory, urlQ, urlBrands, urlBadges, urlSort]);

  const hasActiveFilters =
    !!urlQ || urlBrands.length > 0 || urlBadges.length > 0;

  const filterProps = {
    allBrands,
    selectedBrands: urlBrands,
    selectedBadges: urlBadges,
    onToggleBrand: (b: string) => toggleArrayParam("brand", b),
    onToggleBadge: (b: Exclude<ProductBadge, null>) =>
      toggleArrayParam("badge", b),
    onClear: clearAll,
    hasActiveFilters,
  };

  return (
    <>
      {/* هدر صفحه */}
      <section className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-700 mb-2">
            {activeCategory ? activeCategory.name : "همه محصولات"}
          </h1>
          <p className="text-sm sm:text-base text-ink-500 leading-loose max-w-2xl">
            {activeCategory
              ? activeCategory.description
              : "فهرست کامل محصولات تیرازیستر ایرانیان در ۶ دسته‌بندی تخصصی."}
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
            {/* سایدبار دسکتاپ */}
            <div className="hidden lg:block space-y-3">
              <CategorySidebar
                activeSlug={activeCategory?.slug}
                totalCount={allProducts.length}
              />
              <ProductsFilters {...filterProps} />
            </div>

            <div>
              {/* چیپ‌های دسته - موبایل */}
              <div className="lg:hidden mb-3 -mx-4 px-4 overflow-x-auto">
                <div className="flex gap-2 min-w-min pb-1">
                  <Link
                    href={
                      searchParams.toString()
                        ? `${pathname}?${new URLSearchParams(
                            Object.fromEntries(
                              Array.from(searchParams.entries()).filter(
                                ([k]) => k !== "category"
                              )
                            )
                          ).toString()}`
                        : pathname
                    }
                    className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      !activeCategory
                        ? "bg-brand-600 border-brand-600 text-white"
                        : "bg-white border-ink-200 text-ink-600"
                    }`}
                  >
                    همه
                  </Link>
                  {categories.map((c) => {
                    const isActive = activeCategory?.slug === c.slug;
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("category", c.slug);
                    return (
                      <Link
                        key={c.slug}
                        href={`${pathname}?${params.toString()}`}
                        className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          isActive
                            ? "bg-brand-600 border-brand-600 text-white"
                            : "bg-white border-ink-200 text-ink-600"
                        }`}
                      >
                        {c.shortName}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Toolbar */}
              <ProductsToolbar
                search={searchInput}
                onSearchChange={setSearchInput}
                sort={urlSort}
                onSortChange={(s) =>
                  updateParams({ sort: s === "newest" ? null : s })
                }
                resultCount={filtered.length}
                isPending={isPending}
                hasActiveFilters={hasActiveFilters}
                onOpenFilters={() => setMobileFiltersOpen(true)}
              />

              {/* برچسب فیلترهای فعال */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {urlQ && (
                    <FilterChip
                      label={`جست‌وجو: ${urlQ}`}
                      onRemove={() => {
                        setSearchInput("");
                        updateParams({ q: null });
                      }}
                    />
                  )}
                  {urlBrands.map((b) => (
                    <FilterChip
                      key={`b-${b}`}
                      label={`برند: ${b}`}
                      onRemove={() => toggleArrayParam("brand", b)}
                    />
                  ))}
                  {urlBadges.map((b) => (
                    <FilterChip
                      key={`bg-${b}`}
                      label={`وضعیت: ${
                        b === "new"
                          ? "جدید"
                          : b === "bestseller"
                          ? "پرفروش"
                          : "تخفیف ویژه"
                      }`}
                      onRemove={() =>
                        toggleArrayParam("badge", b as string)
                      }
                    />
                  ))}
                </div>
              )}

              {/* گرید یا Empty State */}
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-ink-200 p-10 sm:p-16 text-center mt-4">
                  <span className="inline-flex w-16 h-16 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-4">
                    <PackageX className="w-8 h-8" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold text-ink-800 mb-2">
                    محصولی یافت نشد
                  </h2>
                  <p className="text-sm text-ink-500 mb-6 max-w-md mx-auto leading-loose">
                    فیلترها یا عبارت جست‌وجو را تغییر دهید. می‌توانید همه
                    فیلترها را پاک کنید و دوباره تلاش کنید.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center h-10 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-4">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Drawer فیلتر موبایل */}
      {mobileFiltersOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-ink-900/50 z-50"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="فیلتر محصولات"
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-ink-50 rounded-t-3xl max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200 bg-white rounded-t-3xl">
              <h2 className="font-bold text-brand-700 text-base">فیلترها</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="بستن فیلترها"
                className="w-9 h-9 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-500"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <CategorySidebar
                activeSlug={activeCategory?.slug}
                totalCount={allProducts.length}
              />
              <ProductsFilters {...filterProps} />
            </div>
            <div className="p-4 border-t border-ink-200 bg-white">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full h-11 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors"
              >
                نمایش {filtered.length.toLocaleString("fa-IR")} محصول
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium pl-1.5 pr-2.5 py-1 rounded-full border border-brand-100">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`حذف فیلتر ${label}`}
        className="w-4 h-4 rounded-full hover:bg-brand-100 flex items-center justify-center"
      >
        <X className="w-3 h-3" aria-hidden="true" />
      </button>
      <span>{label}</span>
    </span>
  );
}
