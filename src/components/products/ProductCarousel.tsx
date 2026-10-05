"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Props = {
  products: readonly Product[];
  autoScrollMs?: number;
};

/**
 * ProductCarousel — اسکرول افقی محصولات
 * - فلش چپ/راست برای اسکرول دستی
 * - اسکرول خودکار بعد از وقفه (پیش‌فرض ۷ ثانیه)
 * - RTL-aware
 * - pause روی hover/touch
 */
export function ProductCarousel({ products, autoScrollMs = 7000 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [paused, setPaused] = useState(false);

  // بروزرسانی وضعیت فلش‌ها
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // اسکرول خودکار
  useEffect(() => {
    if (paused || !autoScrollMs) return;
    const el = trackRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        // برگرد به ابتدا
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // برو یه کارت جلوتر
        const cardWidth = el.firstElementChild?.clientWidth ?? 300;
        el.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
      }
    }, autoScrollMs);

    return () => clearInterval(interval);
  }, [paused, autoScrollMs]);

  // اسکرول با فلش (RTL: چپ = به راست، راست = به چپ)
  const scrollBy = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 300;
    const delta = direction === "next" ? cardWidth + 20 : -(cardWidth + 20);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* فلش راست (به سمت کارت‌های قبلی — RTL) */}
      <button
        type="button"
        onClick={() => scrollBy("prev")}
        disabled={!canScrollLeft}
        aria-label="محصولات قبلی"
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-0 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-ink-200 shadow-lg hover:bg-brand-50 hover:border-brand-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-6 h-6 text-brand-700" aria-hidden="true" />
      </button>

      {/* فلش چپ */}
      <button
        type="button"
        onClick={() => scrollBy("next")}
        disabled={!canScrollRight}
        aria-label="محصولات بعدی"
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-ink-200 shadow-lg hover:bg-brand-50 hover:border-brand-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-brand-700" aria-hidden="true" />
      </button>

      {/* گرادیان‌های محو کنار */}
      <div
        className="hidden sm:block absolute top-0 bottom-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-ink-50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute top-0 bottom-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-ink-50 to-transparent"
        aria-hidden="true"
      />

      {/* تراک */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="shrink-0 w-[80%] sm:w-[calc((100%-2.5rem)/2.5)] lg:w-[calc((100%-3.75rem)/4)] snap-start"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
