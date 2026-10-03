import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
};

const sizes = {
  sm: { mark: "h-8 w-8", title: "text-base", sub: "text-[10px]" },
  md: { mark: "h-10 w-10", title: "text-lg", sub: "text-[11px]" },
  lg: { mark: "h-12 w-12", title: "text-xl", sub: "text-xs" },
};

export function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const s = sizes[size];
  const titleColor = variant === "dark" ? "text-brand-700" : "text-white";
  const subColor = variant === "dark" ? "text-ink-500" : "text-white/70";

  return (
    <Link
      href="/"
      aria-label="صفحه اصلی تیرازیستر ایرانیان"
      className="inline-flex items-center gap-2.5 focus-visible:outline-none"
    >
      <span
        className={`${s.mark} rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white flex items-center justify-center shrink-0 shadow-sm`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-3/4 h-3/4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 8h20M16 8v16M11 24h10"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="26" cy="6" r="2.5" fill="currentColor" opacity="0.7" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`${s.title} font-extrabold ${titleColor}`}>
          تیرازیستر
        </span>
        <span className={`${s.sub} ${subColor} font-medium`}>
          ایرانیان
        </span>
      </span>
    </Link>
  );
}
