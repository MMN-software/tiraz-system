import { ProductGridSkeleton } from "@/components/common/Skeleton";

export default function ProductsLoading() {
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
          <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
            <div className="hidden lg:block space-y-3">
              <div className="bg-white rounded-2xl border border-ink-200 h-64 animate-pulse" />
              <div className="bg-white rounded-2xl border border-ink-200 h-48 animate-pulse" />
            </div>
            <div>
              <div className="bg-white rounded-2xl border border-ink-200 h-24 animate-pulse mb-4" />
              <ProductGridSkeleton count={6} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
