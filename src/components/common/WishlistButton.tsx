"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "./Wishlist";
import { useToast } from "./Toast";

interface Props {
  productId: number;
  productName: string;
  position?: "card" | "detail";
}

export function WishlistButton({
  productId,
  productName,
  position = "card",
}: Props) {
  const { has, toggle, ready } = useWishlist();
  const { toast } = useToast();
  const active = ready && has(productId);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
    if (active) {
      toast(`«${productName}» از علاقه‌مندی‌ها حذف شد`, "info");
    } else {
      toast(`«${productName}» به علاقه‌مندی‌ها اضافه شد`, "success");
    }
  }

  if (position === "detail") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        aria-pressed={active}
        className={`inline-flex items-center justify-center gap-2 h-12 px-6 font-medium rounded-xl border transition-colors ${
          active
            ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
            : "bg-white border-ink-200 text-brand-700 hover:bg-ink-50"
        }`}
      >
        <Heart
          className="w-4 h-4"
          fill={active ? "currentColor" : "none"}
          aria-hidden="true"
        />
        {active ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      aria-pressed={active}
      title={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={`absolute top-3 left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-sm border transition-all ${
        active
          ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
          : "bg-white/90 backdrop-blur border-ink-200 text-ink-500 hover:text-red-500 hover:border-red-300"
      }`}
    >
      <Heart
        className="w-4 h-4"
        fill={active ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
