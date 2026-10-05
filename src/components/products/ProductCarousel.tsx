"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Props = {
  products: readonly Product[];
  autoScrollMs?: number;
  accent?: "gold" | "brand" | "rose";
};

export function ProductCarousel({
  products,
  autoScrollMs = 7000,
  accent = "brand",
}: Props) {
  const accentActive = {
    gold: "bg-gold-500",
    brand: "bg-brand-600",
    rose: "bg-rose-500",
  }[accent];

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // تعداد کارت‌های قابل مشاهده (برای محاسبه dots)
  const [visibleCount, setVisibleCount] = useState(4);

  // محاسبه اسکرول و active index
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);

    // پیدا کردن کارت فعال (نزدیک‌ترین به ابتدای دید در RTL)
    const children = Array.from(el.children) as HTMLElement[];
    const scrollLeft = Math.abs(el.scrollLeft);
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - scrollLeft - el.clientWidth / 2);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  // محاسبه تعداد کارت‌های قابل مشاهده
  const updateVisibleCount = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (!firstChild) return;
    const cardWidth = firstChild.clientWidth + 20; // + gap
    setVisibleCount(Math.max(1, Math.round(el.clientWidth / cardWidth)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    updateVisibleCount();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", () => {
      updateScrollState();
      updateVisibleCount();
    });
    return () => {
      el.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState, updateVisibleCount]);

  // اسکرول خودکار
  useEffect(() => {
    if (paused || !autoScrollMs) return;
    const el = trackRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (Math.abs(el.scrollLeft) >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = (el.firstElementChild as HTMLElement)?.clientWidth ?? 300;
        el.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
      }
    }, autoScrollMs);

    return () => clearInterval(interval);
  }, [paused, autoScrollMs]);

  const scrollBy = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = (el.firstElementChild as HTMLElement)?.clientWidth ?? 300;
    const delta =
      direction === "next" ? -(cardWidth + 20) : cardWidth + 20;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const goToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  // اگه تعداد محصولات <= visibleCount باشه، dots نشون نده
  const showDots = products.length > visibleCount;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* فلش راست */}
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

      {/* نقطه‌های نشانگر */}
      {showDots && (
        <div className="hidden sm:flex items-center justify-center gap-2 mt-6">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`رفتن به محصول ${i + 1}`}
              aria-current={i === activeIndex}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? `w-8 h-2 ${accentActive}`
                  : "w-2 h-2 bg-ink-300 hover:bg-ink-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
