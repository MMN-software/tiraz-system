import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductsView } from "@/components/products/ProductsView";
import { getCategoryBySlug } from "@/lib/data/categories";
import { products } from "@/lib/data/products";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = getCategoryBySlug(params.category);

  return {
    title: category ? category.name : "همه محصولات",
    description: category
      ? `${category.description} مشاهده و خرید ${category.name} از تیرازیستر ایرانیان.`
      : "مشاهده و خرید تمام محصولات تیرازیستر ایرانیان شامل تجهیزات پزشکی، آزمایشگاهی، صنعتی، قطعات و لوازم مصرفی.",
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = getCategoryBySlug(params.category);

  const breadcrumbItems = [
    { label: "محصولات", href: activeCategory ? "/products" : undefined },
    ...(activeCategory ? [{ label: activeCategory.name }] : []),
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Suspense fallback={<ProductsFallback />}>
        <ProductsView allProducts={products} />
      </Suspense>
    </>
  );
}

function ProductsFallback() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center text-ink-500 text-sm">
        در حال بارگذاری محصولات...
      </div>
    </section>
  );
}
