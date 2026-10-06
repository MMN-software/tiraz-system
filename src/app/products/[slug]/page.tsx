import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Package,
  Tag,
  Award,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Target,
  Phone,
  FileText,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInquiryForm } from "@/components/products/ProductInquiryForm";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductNavigation } from "@/components/products/ProductNavigation";
import { StickyProductActions } from "@/components/products/StickyProductActions";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { CopyButton } from "@/components/common/CopyButton";
import { WishlistButton } from "@/components/common/WishlistButton";
import { CompareButton } from "@/components/common/CompareButton";
import { products, getProductBySlug } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const faq = product.faq ?? [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDesc,
    sku: product.code,
    brand: { "@type": "Brand", name: product.brand },
    category: category?.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IRR",
      url: `https://tirazsystem.ir/products/${product.slug}`,
    },
  };

  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Breadcrumb
        items={[
          { label: "محصولات", href: "/products" },
          category
            ? {
                label: category.name,
                href: `/products?category=${category.slug}`,
              }
            : { label: "" },
          { label: product.name },
        ].filter((b) => b.label)}
      />

      <section className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery productName={product.name} />

            <div>
              {category && (
                <Link
                  href={`/products?category=${category.slug}`}
                  className="inline-block text-xs font-bold text-accent-500 mb-2 hover:text-accent-600 transition-colors"
                >
                  {category.name}
                </Link>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700 leading-tight mb-3">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-ink-600 leading-loose mb-5">
                {product.shortDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2.5 bg-ink-50 border border-ink-100 rounded-xl px-3 py-2.5">
                  <span className="inline-flex w-9 h-9 shrink-0 rounded-lg bg-white text-brand-600 items-center justify-center border border-ink-100">
                    <Tag className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-ink-400">کد محصول</div>
                    <div
                      className="text-sm font-bold text-brand-700 truncate num"
                      dir="ltr"
                      style={{ textAlign: "right" }}
                    >
                      {product.code}
                    </div>
                  </div>
                  <CopyButton
                    text={product.code}
                    label="کد محصول"
                    toastMessage="کد محصول کپی شد"
                    ariaLabel="کپی کد محصول"
                  />
                </div>

                <InfoChip icon={Award} label="برند" value={product.brand} />
                {category && (
                  <InfoChip
                    icon={Layers}
                    label="دسته"
                    value={category.shortName}
                  />
                )}
                <InfoChip
                  icon={ShieldCheck}
                  label="گارانتی"
                  value="۱۸ ماه"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <a
                  href="tel:+982112345678"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  تماس فوری
                </a>
                <Link
                  href="#inquiry"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 bg-white hover:bg-ink-50 text-brand-700 font-medium rounded-xl border border-ink-200 transition-colors"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  درخواست اطلاعات
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  position="detail"
                />
                <CompareButton
                  productId={product.id}
                  productName={product.name}
                  variant="text"
                />
              </div>

              <p className="text-xs text-ink-500 mt-4 leading-relaxed">
                ✓ ضمانت اصالت کالا &nbsp;·&nbsp; ✓ ارسال به سراسر کشور
                &nbsp;·&nbsp; ✓ خدمات پس از فروش
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-ink-200 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-brand-700 mb-3">
                  توضیحات محصول
                </h2>
                <p className="text-sm text-ink-600 leading-loose">
                  {product.description}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-ink-200 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-brand-700 mb-3">
                  ویژگی‌های کلیدی
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-ink-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0 text-accent-500"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-ink-100">
                  <h2 className="text-lg font-bold text-brand-700">
                    مشخصات فنی
                  </h2>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-ink-50/60" : "bg-white"}
                      >
                        <th
                          scope="row"
                          className="text-right font-medium text-ink-600 px-5 sm:px-6 py-3 w-1/3"
                        >
                          {s.label}
                        </th>
                        <td className="text-ink-800 px-5 sm:px-6 py-3">
                          {s.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-2xl border border-ink-200 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-brand-700 mb-3 flex items-center gap-2">
                  <Target
                    className="w-5 h-5 text-accent-500"
                    aria-hidden="true"
                  />
                  کاربردهای محصول
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center bg-brand-50 text-brand-700 text-sm font-medium px-3 py-1.5 rounded-full border border-brand-100"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <ProductFAQ items={faq} />
            </div>

            <aside id="inquiry" className="lg:sticky lg:top-24 lg:self-start">
              <ProductInquiryForm
                productName={product.name}
                productCode={product.code}
              />

              <div className="bg-brand-700 text-white rounded-2xl p-5 mt-4">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  راه‌های ارتباط سریع
                </h3>
                <p className="text-xs text-white/70 mb-3 leading-relaxed">
                  اگر عجله دارید، مستقیم تماس بگیرید.
                </p>
                <a
                  href="tel:+982112345678"
                  className="block text-center h-11 leading-[2.75rem] bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg num transition-colors"
                >
                  ۰۹۹۶۳۸۰۲۹۵۷
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-ink-200 p-5 mt-4 text-xs text-ink-600 space-y-2.5">
                <div className="flex items-start gap-2">
                  <Package
                    className="w-4 h-4 mt-0.5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <span>ارسال سریع به سراسر کشور</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 mt-0.5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <span>گارانتی اصالت و خدمات پس از فروش</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award
                    className="w-4 h-4 mt-0.5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <span>منطبق با استانداردهای ملی و بین‌المللی</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ProductNavigation product={product} />

      <RelatedProducts product={product} />

      <StickyProductActions
        productName={product.name}
        productCode={product.code}
      />
    </>
  );
}

function InfoChip({
  icon: Icon,
  label,
  value,
  ltr,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-ink-50 border border-ink-100 rounded-xl px-3 py-2.5">
      <span className="inline-flex w-9 h-9 shrink-0 rounded-lg bg-white text-brand-600 items-center justify-center border border-ink-100">
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] text-ink-400">{label}</div>
        <div
          className={`text-sm font-bold text-brand-700 truncate ${
            ltr ? "num" : ""
          }`}
          dir={ltr ? "ltr" : "rtl"}
          style={ltr ? { textAlign: "right" } : undefined}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
