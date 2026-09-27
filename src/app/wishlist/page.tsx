"use client";

import Link from "next/link";
import { Heart, Trash2, PackageX } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { useWishlist } from "@/components/common/Wishlist";
import { useToast } from "@/components/common/Toast";
import { products } from "@/lib/data/products";

export default function WishlistPage() {
  const { items, ready, clear, count } = useWishlist();
  const { toast } = useToast();

  const favoriteProducts = products.filter((p) => items.includes(p.id));

  function handleClear() {
    if (!confirm("همه علاقه‌مندی‌ها حذف شوند؟")) return;
    clear();
    toast("لیست علاقه‌مندی‌ها پاک شد", "info");
  }

  return (
    <>
      <Breadcrumb items={[{ label: "علاقه‌مندی‌ها" }]} />

      <section className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-700 mb-2 flex items-center gap-3">
                <Heart
                  className="w-7 h-7 text-red-500"
                  fill="currentColor"
                  aria-hidden="true"
                />
                علاقه‌مندی‌های من
              </h1>
              <p className="text-sm sm:text-base text-ink-500 leading-loose">
                محصولاتی که ذخیره کرده‌اید تا بعداً بررسی یا خریداری کنید.
              </p>
              {ready && (
                <p className="text-xs text-ink-400 mt-3 num">
                  {count.toLocaleString("fa-IR")} محصول ذخیره‌شده
                </p>
              )}
            </div>

            {ready && count > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="self-start sm:self-auto inline-flex items-center gap-2 h-10 px-4 bg-white hover:bg-red-50 text-red-600 border border-ink-200 hover:border-red-200 text-sm font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                پاک کردن همه
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          {!ready ? (
            <div className="text-center py-16 text-ink-500 text-sm">
              در حال بارگذاری...
            </div>
          ) : favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-ink-200 p-10 sm:p-16 text-center max-w-2xl mx-auto">
              <span className="inline-flex w-20 h-20 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-5">
                <PackageX className="w-10 h-10" aria-hidden="true" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-brand-700 mb-3">
                هنوز محصولی ذخیره نکرده‌اید
              </h2>
              <p className="text-sm text-ink-500 leading-loose mb-6 max-w-md mx-auto">
                روی آیکون قلب روی کارت هر محصول بزنید تا در این لیست ذخیره
                شود.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
