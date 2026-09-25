import Link from "next/link";
import { Home, ChevronLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="bg-white border-b border-ink-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-xs sm:text-sm text-ink-500">
          <li>
            <Link
              href="/"
              aria-label="صفحه اصلی"
              className="flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">صفحه اصلی</span>
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronLeft
                className="w-3.5 h-3.5 text-ink-300"
                aria-hidden="true"
              />
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink-700 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
