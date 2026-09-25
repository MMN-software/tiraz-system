"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="بازگشت به بالای صفحه"
      className="hidden sm:flex fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-white border border-ink-200 text-brand-600 shadow-lg hover:bg-brand-50 hover:border-brand-300 transition-colors items-center justify-center"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
