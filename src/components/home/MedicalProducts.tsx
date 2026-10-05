import { products } from "@/lib/data/products";
import { ProductSection } from "./ProductSection";

export function MedicalProducts() {
  const medical = products.filter((p) => p.category === "medical");

  return (
    <ProductSection
      kicker="تجهیزات پزشکی"
      title="محصولات"
      titleAccent="پزشکی و آزمایشگاهی"
      description="تجهیزات تخصصی بیمارستانی، آزمایشگاهی و درمانگاهی با ضمانت اصالت و استانداردهای بین‌المللی."
      products={medical}
      category="medical"
      href="/products?category=medical"
    />
  );
}
