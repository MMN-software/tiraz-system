"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";

const views = [
  // نمای ۱: دستگاه با waveform
  (
    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none">
      <rect
        x="30"
        y="60"
        width="140"
        height="90"
        rx="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M60 105h15l8-15 8 30 8-15h25"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="40" r="8" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  // نمای ۲: نمایشگر بزرگ
  (
    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none">
      <rect
        x="40"
        y="40"
        width="120"
        height="120"
        rx="12"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M70 100h20M110 100h20M100 70v20M100 110v20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  // نمای ۳: چرخ‌دنده / قطعه
  (
    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none">
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="3" />
      <path
        d="M100 40v20M100 140v20M40 100h20M140 100h20M60 60l14 14M126 126l14 14M60 140l14-14M126 74l14-14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  // نمای ۴: کارت الکترونیکی / برد
  (
    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none">
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        rx="8"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect
        x="70"
        y="70"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect
        x="110"
        y="70"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect
        x="70"
        y="110"
        width="60"
        height="20"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  ),
];

export function ProductGallery({ productName }: { productName: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* تصویر اصلی */}
      <div
        className="relative aspect-square rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 border border-ink-200 flex items-center justify-center overflow-hidden group"
        role="img"
        aria-label={`تصویر ${productName}`}
      >
        <div className="text-brand-300 group-hover:scale-105 transition-transform duration-300">
          {views[active]}
        </div>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 text-ink-600 text-[10px] font-medium px-2 py-1 rounded-full border border-ink-200">
          <ZoomIn className="w-3 h-3" aria-hidden="true" />
          نمای {active + 1} از {views.length}
        </span>
      </div>

      {/* تصاویر کوچک */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {views.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`نمایش تصویر ${i + 1} از ${productName}`}
            aria-pressed={active === i}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all overflow-hidden ${
              active === i
                ? "border-brand-600 bg-brand-50"
                : "border-ink-200 bg-white hover:border-brand-300"
            }`}
          >
            <div
              className={
                active === i ? "text-brand-600" : "text-ink-400"
              }
            >
              {v}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
