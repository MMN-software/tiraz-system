import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  articles,
  articleCategories,
} from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "اخبار و مقالات",
  description:
    "آخرین اخبار، مقالات تخصصی و راهنماهای خرید تجهیزات پزشکی، آزمایشگاهی و صنعتی در وبلاگ تیرازیستر ایرانیان.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = params.category;
  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  const activeCategoryName = articleCategories.find(
    (c) => c.slug === activeCategory
  )?.name;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "اخبار و مقالات", href: activeCategory ? "/blog" : undefined },
          ...(activeCategoryName ? [{ label: activeCategoryName }] : []),
        ]}
      />

      <section className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-700 mb-2">
            {activeCategoryName ?? "اخبار و مقالات"}
          </h1>
          <p className="text-sm sm:text-base text-ink-500 leading-loose max-w-2xl">
            مقالات تخصصی و راهنماهای کاربردی درباره تجهیزات پزشکی، آزمایشگاهی
            و صنعتی.
          </p>
          <p className="text-xs text-ink-400 mt-3 num">
            {filtered.length.toLocaleString("fa-IR")} مقاله یافت شد
          </p>
        </div>
      </section>

      {/* فیلتر دسته */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                !activeCategory
                  ? "bg-brand-600 border-brand-600 text-white"
                  : "bg-white border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              همه
            </Link>
            {articleCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog?category=${c.slug}`}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === c.slug
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-white border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
              <h2 className="text-lg font-bold text-ink-800 mb-2">
                مقاله‌ای یافت نشد
              </h2>
              <p className="text-sm text-ink-500 mb-6">
                در این دسته‌بندی فعلاً مقاله‌ای منتشر نشده است.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center h-10 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                مشاهده همه مقالات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
