"use client";

import Link from "next/link";
import { GitCompareArrows, X, Trash2, PackageX } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useCompare } from "@/components/common/Compare";
import { useToast } from "@/components/common/Toast";
import { products } from "@/lib/data/products";
import { getCategoryBySlug } from "@/lib/data/categories";

export default function ComparePage() {
  const { items, count, remove, clear, ready } = useCompare();
  const { toast } = useToast();

  const selected = products.filter((p) => items.includes(p.id));

  function handleClear() {
    if (!confirm("همه محصولات از مقایسه حذف شوند؟")) return;
    clear();
    toast("لیست مقایسه پاک شد", "info");
  }

  return (
    <>
      <Breadcrumb items={[{ label: "مقایسه محصولات" }]} />

      <section className="bg-white border-b border-ink-200">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-700 mb-2 flex items-center gap-3">
                <GitCompareArrows
                  className="w-7 h-7 text-brand-600"
                  aria-hidden="true"
                />
                مقایسه محصولات
              </h1>
              <p className="text-sm sm:text-base text-ink-500 leading-loose">
                حداکثر ۳ محصول را کنار هم مقایسه کنید.
              </p>
              {ready && (
                <p className="text-xs text-ink-400 mt-3 num">
                  {count.toLocaleString("fa-IR")} محصول انتخاب‌شده
                </p>
              )}
            </div>

            {ready && count > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="self-start sm:self-auto inline-flex items-center gap-2 h-10 px-4 bg-white hover:bg-red-50 text-red-600 border border-ink-200 hover:border-red-200 text-sm font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                پاک کردن همه
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          {!ready ? (
            <div className="text-center py-16 text-ink-500 text-sm">
              در حال بارگذاری...
            </div>
          ) : count === 0 ? (
            <div className="bg-white rounded-2xl border border-ink-200 p-10 sm:p-16 text-center max-w-2xl mx-auto">
              <span className="inline-flex w-20 h-20 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-5">
                <PackageX className="w-10 h-10" aria-hidden="true" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-brand-700 mb-3">
                هنوز محصولی برای مقایسه انتخاب نکرده‌اید
              </h2>
              <p className="text-sm text-ink-500 leading-loose mb-6 max-w-md mx-auto">
                روی آیکون مقایسه در کارت هر محصول بزنید تا اینجا نمایش داده
                شود. حداقل ۲ محصول برای مقایسه لازم است.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-11 px-6 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : count === 1 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
              <p className="text-sm font-medium text-amber-700 mb-4">
                برای مقایسه، حداقل ۲ محصول نیاز است. یک محصول دیگر اضافه
                کنید.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-10 px-5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                افزودن محصول دیگر
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="bg-ink-50 border-b border-ink-200">
                      <th className="text-right font-medium text-ink-600 px-4 py-3 w-40 sticky right-0 bg-ink-50 z-10">
                        مشخصه
                      </th>
                      {selected.map((p) => (
                        <th
                          key={p.id}
                          className="text-right font-medium text-ink-600 px-4 py-3 min-w-[200px] align-top"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Link
                              href={`/products/${p.slug}`}
                              className="text-brand-700 font-bold text-sm leading-snug hover:text-accent-500 transition-colors line-clamp-2"
                            >
                              {p.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => remove(p.id)}
                              aria-label={`حذف ${p.name}`}
                              className="w-6 h-6 rounded-full hover:bg-red-50 text-ink-400 hover:text-red-500 flex items-center justify-center shrink-0 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <Row
                      label="کد محصول"
                      values={selected.map((p) => p.code)}
                      ltr
                    />
                    <Row label="برند" values={selected.map((p) => p.brand)} />
                    <Row
                      label="دسته"
                      values={selected.map(
                        (p) => getCategoryBySlug(p.category)?.name ?? "-"
                      )}
                    />
                    <Row
                      label="گارانتی"
                      values={selected.map(() => "۱۸ ماه")}
                    />
                    <Row
                      label="توضیح کوتاه"
                      values={selected.map((p) => p.shortDesc)}
                    />
                    <Row
                      label="ویژگی‌های کلیدی"
                      values={selected.map((p) => p.features.join("، "))}
                    />
                    {Array.from(
                      new Set(selected.flatMap((p) => p.specs.map((s) => s.label)))
                    ).map((specLabel) => (
                      <Row
                        key={specLabel}
                        label={specLabel}
                        values={selected.map(
                          (p) =>
                            p.specs.find((s) => s.label === specLabel)?.value ??
                            "—"
                        )}
                      />
                    ))}
                    <Row
                      label="کاربردها"
                      values={selected.map((p) => p.applications.join("، "))}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({
  label,
  values,
  ltr,
}: {
  label: string;
  values: string[];
  ltr?: boolean;
}) {
  return (
    <tr className="border-b border-ink-100 last:border-b-0">
      <th
        scope="row"
        className="text-right font-medium text-ink-600 px-4 py-3 bg-ink-50/60 sticky right-0 z-10 align-top"
      >
        {label}
      </th>
      {values.map((v, i) => (
        <td
          key={i}
          className="text-ink-800 px-4 py-3 leading-relaxed align-top"
          dir={ltr ? "ltr" : "rtl"}
          style={ltr ? { textAlign: "right" } : undefined}
        >
          {v || "—"}
        </td>
      ))}
    </tr>
  );
}
