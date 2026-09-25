import Link from "next/link";
import { Plus, Edit3, Eye, Package, Search, Filter } from "lucide-react";
import { getProducts, getCategories } from "@/lib/api/repository";
import type { CategorySlug } from "@/lib/types";

export const metadata = {
  title: "مدیریت محصولات",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category as CategorySlug | undefined;
  const products = await getProducts({ category });
  const categories = await getCategories();

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div className="space-y-5">
      {/* هدر */}
      <div className="bg-white rounded-2xl border border-ink-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-700 mb-1">
            مدیریت محصولات
          </h1>
          <p className="text-sm text-ink-500 num">
            {products.length.toLocaleString("fa-IR")} محصول
          </p>
        </div>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 opacity-60 cursor-not-allowed text-white text-sm font-medium rounded-xl"
          title="در نسخه بعدی فعال می‌شود"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          محصول جدید
        </button>
      </div>

      {/* فیلتر و جست‌وجو */}
      <div className="bg-white rounded-2xl border border-ink-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="جست‌وجوی محصول..."
              disabled
              className="w-full h-11 pr-10 pl-3 text-sm rounded-lg border border-ink-200 bg-ink-50 cursor-not-allowed"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Filter className="w-4 h-4" aria-hidden="true" />
            <span>فیلترها در نسخه بعدی</span>
          </div>
        </div>
      </div>

      {/* جدول */}
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 border-b border-ink-200">
              <tr>
                <th className="text-right font-medium text-ink-600 px-4 py-3">
                  محصول
                </th>
                <th className="text-right font-medium text-ink-600 px-4 py-3 hidden md:table-cell">
                  کد
                </th>
                <th className="text-right font-medium text-ink-600 px-4 py-3 hidden md:table-cell">
                  دسته
                </th>
                <th className="text-right font-medium text-ink-600 px-4 py-3 hidden lg:table-cell">
                  برند
                </th>
                <th className="text-center font-medium text-ink-600 px-4 py-3">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-ink-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex w-10 h-10 shrink-0 rounded-lg bg-brand-50 text-brand-600 items-center justify-center">
                        <Package className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-ink-800 truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-ink-400 md:hidden num">
                          {p.code}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-ink-600 num">
                    {p.code}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-block text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-full">
                      {categoryName(p.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-ink-600">
                    {p.brand}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/products/${p.slug}`}
                        aria-label={`مشاهده ${p.name}`}
                        className="w-8 h-8 rounded-lg text-ink-500 hover:text-brand-600 hover:bg-brand-50 flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        disabled
                        aria-label={`ویرایش ${p.name}`}
                        className="w-8 h-8 rounded-lg text-ink-300 cursor-not-allowed flex items-center justify-center"
                        title="در نسخه بعدی فعال می‌شود"
                      >
                        <Edit3 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="p-10 text-center text-ink-500 text-sm">
            محصولی یافت نشد.
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700 leading-relaxed">
        دکمه‌های ویرایش و افزودن محصول در نسخه بعدی فعال می‌شوند. برای اتصال
        به دیتابیس واقعی، فایل
        <code className="mx-1 px-1.5 py-0.5 bg-white rounded text-[10px]">
          src/lib/api/repository.ts
        </code>
        به‌روزرسانی شود.
      </div>
    </div>
  );
}
