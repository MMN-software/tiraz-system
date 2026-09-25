import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import type { Article } from "@/lib/types";
import { getArticleCategoryName } from "@/lib/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-white rounded-2xl border border-ink-200 hover:border-brand-300 hover:shadow-lg transition-all overflow-hidden flex flex-col">
      <Link
        href={`/blog/${article.slug}`}
        className="block relative aspect-[16/9] bg-gradient-to-br from-brand-50 to-accent-50 flex items-center justify-center overflow-hidden"
      >
        <span className="absolute top-3 right-3 bg-white text-brand-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-ink-200 z-10">
          {getArticleCategoryName(article.category)}
        </span>
        <svg
          viewBox="0 0 64 64"
          className="w-16 h-16 text-brand-300 group-hover:scale-110 transition-transform duration-300"
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
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/blog/${article.slug}`}>
          <h3 className="font-bold text-brand-700 mb-2 leading-snug group-hover:text-accent-500 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-ink-500 leading-loose mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-ink-400 pt-3 border-t border-ink-100 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {article.readTime} دقیقه
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-ink-500">
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            {article.author}
          </span>
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-accent-500 hover:text-accent-600"
          >
            ادامه مطلب
            <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
