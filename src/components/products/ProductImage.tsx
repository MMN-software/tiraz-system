import type { CategorySlug } from "@/lib/types";

interface Props {
  src?: string;
  alt: string;
  category: CategorySlug;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  category,
  className = "",
}: Props) {
  if (src) {
    return (
      <div className={`relative w-full h-full bg-ink-100 overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div className={`absolute inset-0 ${bgGradient(category)}`} aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className={`relative z-10 w-2/3 h-2/3 ${iconColor(category)}`}>
        {renderIcon(category)}
      </div>
    </div>
  );
}

function bgGradient(c: CategorySlug): string {
  switch (c) {
    case "medical":
      return "bg-gradient-to-br from-brand-50 via-white to-brand-100";
    case "beauty":
      return "bg-gradient-to-br from-rose-100 via-white to-gold-50";
  }
}

function iconColor(c: CategorySlug): string {
  switch (c) {
    case "medical":
      return "text-brand-600";
    case "beauty":
      return "text-rose-500";
  }
}

function renderIcon(c: CategorySlug) {
  switch (c) {
    case "medical":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M25 15v18c0 6 4 11 10 11s10-5 10-11V15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="25" cy="12" r="3" fill="currentColor" />
          <circle cx="45" cy="12" r="3" fill="currentColor" />
          <path
            d="M35 44v18c0 6 4 10 10 10h8c6 0 10-4 10-10V50"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="63" cy="44" r="6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "beauty":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* بطری سرم */}
          <rect
            x="38"
            y="30"
            width="24"
            height="50"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <rect
            x="44"
            y="18"
            width="12"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M42 45h16M42 55h16M42 65h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* برگ تزئینی */}
          <path
            d="M30 40c0-8 6-14 14-14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
