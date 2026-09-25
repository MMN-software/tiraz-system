export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-ink-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-ink-100 rounded-full" />
        <div className="h-4 w-full bg-ink-100 rounded-md" />
        <div className="h-4 w-3/4 bg-ink-100 rounded-md" />
        <div className="h-3 w-24 bg-ink-100 rounded-md" />
        <div className="h-10 w-full bg-ink-100 rounded-lg mt-3" />
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-ink-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 bg-ink-100 rounded-md" />
        <div className="h-3 w-full bg-ink-100 rounded-md" />
        <div className="h-3 w-5/6 bg-ink-100 rounded-md" />
        <div className="h-3 w-1/2 bg-ink-100 rounded-md pt-2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
