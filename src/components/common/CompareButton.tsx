"use client";

import { GitCompareArrows } from "lucide-react";
import { useCompare } from "./Compare";
import { useToast } from "./Toast";

interface Props {
  productId: number;
  productName: string;
  variant?: "icon" | "box" | "text";
}

export function CompareButton({
  productId,
  productName,
  variant = "icon",
}: Props) {
  const { has, toggle, ready } = useCompare();
  const { toast } = useToast();
  const active = ready && has(productId);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const result = toggle(productId);
    if (result === "added") {
      toast(`«${productName}» به مقایسه اضافه شد`, "success");
    } else if (result === "removed") {
      toast(`«${productName}» از مقایسه حذف شد`, "info");
    } else {
      toast("حداکثر ۳ محصول می‌توانید مقایسه کنید", "error");
    }
  }

  if (variant === "box") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        aria-label={active ? "حذف از مقایسه" : "افزودن به مقایسه"}
        className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-xs font-medium transition-colors ${
          active
            ? "bg-brand-600 border-brand-600 text-white hover:bg-brand-700"
            : "bg-white border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-600"
        }`}
      >
        <GitCompareArrows className="w-3.5 h-3.5" aria-hidden="true" />
        {active ? "در مقایسه" : "مقایسه"}
      </button>
    );
  }

  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`inline-flex items-center justify-center gap-2 h-12 px-6 font-medium rounded-xl border transition-colors ${
          active
            ? "bg-brand-600 border-brand-600 text-white hover:bg-brand-700"
            : "bg-white border-ink-200 text-brand-700 hover:bg-ink-50"
        }`}
      >
        <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
        {active ? "در مقایسه" : "افزودن به مقایسه"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "حذف از مقایسه" : "افزودن به مقایسه"}
      title={active ? "حذف از مقایسه" : "افزودن به مقایسه"}
      className={`absolute top-14 left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-sm border transition-all ${
        active
          ? "bg-brand-600 border-brand-600 text-white hover:bg-brand-700"
          : "bg-white/90 backdrop-blur border-ink-200 text-ink-500 hover:text-brand-600 hover:border-brand-300"
      }`}
    >
      <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
