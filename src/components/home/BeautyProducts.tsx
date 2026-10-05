import { products } from "@/lib/data/products";
import { ProductSection } from "./ProductSection";

export function BeautyProducts() {
  const beauty = products.filter((p) => p.category === "beauty");

  return (
    <ProductSection
      kicker="آرایشی و بهداشتی"
      title="محصولات"
      titleAccent="آرایشی و بهداشتی"
      description="محصولات مراقبت پوست، زیبایی و بهداشتی از برندهای معتبر با ضمانت اصالت و کیفیت."
      products={beauty}
      category="beauty"
      href="/products?category=beauty"
    />
  );
}
