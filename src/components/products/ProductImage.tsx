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
            // اگه عکس لود نشد، مخفی کن تا SVG fallback ببینی
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
    case "medical": return "bg-gradient-to-br from-brand-50 via-white to-accent-50";
    case "lab": return "bg-gradient-to-br from-accent-50 via-white to-brand-50";
    case "industrial": return "bg-gradient-to-br from-ink-100 via-white to-brand-50";
    case "parts": return "bg-gradient-to-br from-coral-50 via-white to-brand-50";
    case "imported": return "bg-gradient-to-br from-brand-50 via-white to-coral-50";
    case "consumables": return "bg-gradient-to-br from-accent-50 via-white to-coral-50";
  }
}

function iconColor(c: CategorySlug): string {
  switch (c) {
    case "medical": return "text-brand-600";
    case "lab": return "text-accent-600";
    case "industrial": return "text-ink-700";
    case "parts": return "text-coral-500";
    case "imported": return "text-brand-700";
    case "consumables": return "text-accent-500";
  }
}

function renderIcon(c: CategorySlug) {
  switch (c) {
    case "medical":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M25 15v18c0 6 4 11 10 11s10-5 10-11V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="25" cy="12" r="3" fill="currentColor" />
          <circle cx="45" cy="12" r="3" fill="currentColor" />
          <path d="M35 44v18c0 6 4 10 10 10h8c6 0 10-4 10-10V50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="63" cy="44" r="6" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "lab":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M40 15v25L25 65c-2 4 1 8 5 8h40c4 0 7-4 5-8L60 40V15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M35 15h30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "industrial":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "parts":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M40 20h20v55c0 4-3 7-7 7h-6c-4 0-7-3-7-7V20z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case "imported":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path d="M20 35L50 20l30 15v35L50 85 20 70V35z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case "consumables":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="20" y="35" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
  }
}
