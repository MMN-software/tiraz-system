"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? Math.min((scrolled / total) * 100, 100) : 0;
      setProgress(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 h-0.5 z-[85] pointer-events-none"
      role="progressbar"
      aria-label="پیشرفت مطالعه"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full w-full origin-right bg-gradient-to-l from-brand-600 via-accent-500 to-brand-600 transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
