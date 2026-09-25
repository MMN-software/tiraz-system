import { ArticleCardSkeleton } from "@/components/common/Skeleton";

export default function BlogLoading() {
  return (
    <>
      <div className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="h-8 w-48 bg-ink-100 rounded-lg animate-pulse mb-3" />
          <div className="h-4 w-96 max-w-full bg-ink-100 rounded-md animate-pulse" />
        </div>
      </div>

      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
