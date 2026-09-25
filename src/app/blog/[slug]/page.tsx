import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  User,
  Clock,
  Share2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  articles,
  getArticleBySlug,
  getArticleCategoryName,
  getRelatedArticles,
} from "@/lib/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "مقاله یافت نشد" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const paragraphs = article.content.split("\n\n").filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.author },
    datePublished: article.date,
    articleSection: getArticleCategoryName(article.category),
    publisher: {
      "@type": "Organization",
      name: "تیرازیستر ایرانیان",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "اخبار و مقالات", href: "/blog" },
          { label: article.title },
        ]}
      />

      <article className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            {/* دسته */}
            <Link
              href={`/blog?category=${article.category}`}
              className="inline-block text-xs font-bold text-accent-500 mb-3 hover:text-accent-600 transition-colors"
            >
              {getArticleCategoryName(article.category)}
            </Link>

            {/* عنوان */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 leading-tight mb-5">
              {article.title}
            </h1>

            {/* متادیتا */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ink-500 mb-6 pb-6 border-b border-ink-100">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" aria-hidden="true" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {article.readTime} دقیقه مطالعه
              </span>
            </div>

            {/* خلاصه */}
            <p className="text-base sm:text-lg text-ink-700 leading-loose mb-8 font-medium">
              {article.excerpt}
            </p>

            {/* تصویر placeholder */}
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 border border-ink-200 flex items-center justify-center mb-8">
              <svg
                viewBox="0 0 64 64"
                className="w-24 h-24 text-brand-300"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 12h24l8 8v32H16z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 26h16M24 34h16M24 42h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* محتوا */}
            <div className="prose prose-lg max-w-none">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg text-ink-700 leading-loose mb-5"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* اشتراک‌گذاری */}
            <div className="mt-10 pt-6 border-t border-ink-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-ink-500 flex items-center gap-2">
                <Share2 className="w-4 h-4" aria-hidden="true" />
                اشتراک‌گذاری این مقاله
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    article.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg bg-accent-50 text-accent-600 hover:bg-accent-100 transition-colors"
                >
                  واتساپ
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    `https://tiraz-system.ir/blog/${article.slug}`
                  )}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors"
                >
                  تلگرام
                </a>
              </div>
            </div>

            {/* بازگشت */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                بازگشت به همه مقالات
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* مقالات مرتبط */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-ink-100/60">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <span className="inline-block text-xs font-bold text-accent-500 mb-2 tracking-wider">
                  مطالب مرتبط
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-700 leading-tight">
                  مقالات پیشنهادی
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors self-start sm:self-auto"
              >
                مشاهده همه مقالات
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
