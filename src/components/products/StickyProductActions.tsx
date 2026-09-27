"use client";

import { useEffect, useState } from "react";
import { Phone, FileText, ArrowLeft } from "lucide-react";

interface Props {
  productName: string;
  productCode: string;
}

export function StickyProductActions({ productName, productCode }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // از 300 پیکسل اسکرول به بعد ظاهر می‌شه
      setVisible(window.scrollY > 300);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToInquiry(e: React.MouseEvent) {
    e.preventDefault();
    const target = document.getElementById("inquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#inquiry";
    }
  }

  return (
    <div
      aria-hidden={!visible}
      className={`sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-ink-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* نام محصول و کد */}
        <div className="flex items-center gap-2 px-2 pb-2 mb-2 border-b border-ink-100">
          <span className="inline-flex w-7 h-7 shrink-0 rounded-lg bg-brand-50 text-brand-600 items-center justify-center">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-brand-700 truncate leading-tight">
              {productName}
            </p>
            <p
              className="text-[9px] text-ink-400 num truncate"
              dir="ltr"
              style={{ textAlign: "right" }}
            >
              کد: {productCode}
            </p>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:+982112345678"
            className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-accent-500 active:bg-accent-600 text-white text-[13px] font-medium transition-colors"
            aria-label="تماس فوری"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            تماس فوری
          </a>
          <a
            href="#inquiry"
            onClick={scrollToInquiry}
            className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-brand-600 active:bg-brand-700 text-white text-[13px] font-medium transition-colors"
            aria-label="استعلام قیمت"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            استعلام قیمت
          </a>
        </div>
      </div>
    </div>
  );
}
