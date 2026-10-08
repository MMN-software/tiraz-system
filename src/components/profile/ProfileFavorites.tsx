"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Trash2,
  Package,
  Search,
  Star,
  ShoppingCart,
} from "lucide-react";
import { useWishlist } from "@/components/common/Wishlist";
import { products } from "@/lib/data/products";

export function ProfileFavorites() {
  const { items, remove, clear, ready } = useWishlist();

  const favorites = useMemo(() => {
    return items
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is (typeof products)[number] => Boolean(p));
  }, [items]);

  const missingCount = items.length - favorites.length;

  if (!ready) {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
        <p className="text-sm text-ink-500">در حال بارگذاری...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-ink-200 p-5">
          <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
            <Heart className="w-5 h-5" aria-hidden="true" />
            علاقه‌مندی‌ها
          </h1>
          <p className="text-sm text-ink-500">
            محصولاتی که ذخیره کرده‌اید
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-ink-200 p-8 sm:p-12 text-center">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-4">
            <Heart className="w-8 h-8" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-bold text-brand-700 mb-2">
            لیست علاقه‌مندی‌های شما خالی است
          </h2>
          <p className="text-sm text-ink-500 leading-relaxed mb-6 max-w-md mx-auto">
            با کلیک روی آیکون قلب در صفحه‌ی هر محصول، آن را به این لیست
            اضافه کنید تا بعداً راحت پیدایش کنید.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-ink-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
            <Heart className="w-5 h-5" aria-hidden="true" />
            علاقه‌مندی‌ها
          </h1>
          <p className="text-sm text-ink-500 num">
            {favorites.length.toLocaleString("fa-IR")} محصول ذخیره‌شده
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (
              confirm("آیا از پاک کردن همه‌ی علاقه‌مندی‌ها مطمئن هستید؟")
            ) {
              clear();
            }
          }}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          پاک کردن همه
        </button>
      </div>

      {missingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 flex items-start gap-2">
          <Package
            className="w-4 h-4 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span>
            {missingCount.toLocaleString("fa-IR")} محصول از لیست شما
            در دسترس نیست (احتمالاً حذف شده است).
          </span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-ink-200 p-4 hover:border-brand-300 transition-colors group"
          >
            <Link
              href={`/products/${product.slug}`}
              className="block mb-3"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex w-14 h-14 rounded-xl bg-brand-50 text-brand-600 items-center justify-center shrink-0">
                  <Package className="w-6 h-6" aria-hidden="true" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="font-bold text-sm text-ink-800 truncate flex-1">
                      {product.name}
                    </h3>
                    {product.badge && <Badge badge={product.badge} />}
                  </div>
                  <p className="text-[10px] text-ink-400 num mb-1">
                    {product.code} · {product.brand}
                  </p>
                  <p className="text-xs text-ink-500 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex gap-2 pt-3 border-t border-ink-100">
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                مشاهده و خرید
              </Link>
              <button
                type="button"
                onClick={() => remove(product.id)}
                aria-label={`حذف ${product.name} از علاقه‌مندی‌ها`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-4 text-xs text-ink-500 leading-relaxed">
        لیست علاقه‌مندی‌های شما در مرورگر ذخیره می‌شود و با پاک کردن
        Cookies از بین می‌رود.
      </div>
    </div>
  );
}

function Badge({ badge }: { badge: string | null }) {
  if (!badge) return null;

  const labels: Record<string, { text: string; color: string }> = {
    new: { text: "جدید", color: "bg-accent-50 text-accent-600" },
    bestseller: { text: "پرفروش", color: "bg-amber-50 text-amber-600" },
    discount: { text: "تخفیف", color: "bg-red-50 text-red-600" },
  };

  const info = labels[badge];
  if (!info) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${info.color}`}
    >
      {badge === "bestseller" && (
        <Star className="w-2.5 h-2.5" aria-hidden="true" />
      )}
      {info.text}
    </span>
  );
}