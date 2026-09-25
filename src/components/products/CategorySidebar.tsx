import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { categories } from "@/lib/data/categories";

export function CategorySidebar({
  activeSlug,
  totalCount,
}: {
  activeSlug?: string;
  totalCount: number;
}) {
  return (
    <aside aria-label="دسته‌بندی محصولات" className="lg:sticky lg:top-24">
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <div className="p-4 border-b border-ink-200">
          <h2 className="font-bold text-brand-700 text-base flex items-center gap-2">
            <LayoutGrid
              className="w-4 h-4 text-accent-500"
              aria-hidden="true"
            />
            دسته‌بندی‌ها
          </h2>
        </div>

        <ul className="p-2">
          <li>
            <Link
              href="/products"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                !activeSlug
                  ? "bg-brand-600 text-white font-medium"
                  : "text-ink-700 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              <span>همه محصولات</span>
              <span className="text-xs num opacity-70">
                {totalCount.toLocaleString("fa-IR")}
              </span>
            </Link>
          </li>
          {categories.map((c) => {
            const isActive = activeSlug === c.slug;
            return (
              <li key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-brand-600 text-white font-medium"
                      : "text-ink-700 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-xs num opacity-70">
                    {c.count.toLocaleString("fa-IR")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
