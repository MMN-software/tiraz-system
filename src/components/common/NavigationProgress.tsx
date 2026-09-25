"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 h-0.5 z-[100] overflow-hidden bg-brand-100"
      role="progressbar"
      aria-label="در حال بارگذاری"
    >
      <div className="h-full w-1/2 bg-gradient-to-l from-brand-600 via-accent-500 to-brand-600 animate-[shimmer_1s_ease-in-out_infinite]" />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-250%);
          }
        }
      `}</style>
    </div>
  );
}
