import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
};

const sizes = {
  sm: { mark: 32, title: "text-base", sub: "text-[10px]" },
  md: { mark: 40, title: "text-lg", sub: "text-[11px]" },
  lg: { mark: 48, title: "text-xl", sub: "text-xs" },
};

export function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const s = sizes[size];
  const titleColor = variant === "dark" ? "text-brand-800" : "text-white";
  const subColor = variant === "dark" ? "text-ink-500" : "text-white/70";

  return (
    <Link
      href="/"
      aria-label="صفحه اصلی تیرازیس طب ایرانیان"
      className="inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      <Image
        src="/logo.png"
        alt="تیرازیس طب ایرانیان"
        width={s.mark}
        height={s.mark}
        priority
        className="shrink-0"
      />
      <span className="flex flex-col leading-tight">
        <span className={`${s.title} font-extrabold ${titleColor}`}>
          تیرازیس طب
        </span>
        <span className={`${s.sub} font-medium ${subColor}`}>ایرانیان</span>
      </span>
    </Link>
  );
}

export default Logo;