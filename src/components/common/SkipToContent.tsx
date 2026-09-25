"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[200] focus:inline-flex focus:items-center focus:h-10 focus:px-4 focus:bg-brand-600 focus:text-white focus:text-sm focus:font-medium focus:rounded-lg focus:shadow-lg focus:outline-none"
    >
      پرش به محتوای اصلی
    </a>
  );
}
