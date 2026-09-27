"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Package, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { products } from "@/lib/data/products";
import { articles } from "@/lib/data/articles";

interface ProductHit {
  type: "product";
  id: number;
  title: string;
  code: string;
  category: string;
  href: string;
}

interface ArticleHit {
  type: "article";
  id: number;
  title: string;
  category: string;
  href: string;
}

type Hit = ProductHit | ArticleHit;

const MAX_RESULTS = 8;

export function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, setIsPending] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // debounce
  useEffect(() => {
    setIsPending(true);
    const t = setTimeout(() => {
      setDebounced(query.trim());
      setIsPending(false);
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  // بستن با کلیک بیرون
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Escape برای بستن
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // نتایج
  const hits: Hit[] = useMemo(() => {
    const q = debounced.toLowerCase();
    if (!q || q.length < 2) return [];

    const productHits: ProductHit[] = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
      .slice(0, MAX_RESULTS)
      .map((p) => ({
        type: "product",
        id: p.id,
        title: p.name,
        code: p.code,
        category: p.brand,
        href: `/products/${p.slug}`,
      }));

    const articleHits: ArticleHit[] = articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
      .slice(0, MAX_RESULTS - productHits.length)
      .map((a) => ({
        type: "article",
        id: a.id,
        title: a.title,
        category: "مقاله",
        href: `/blog/${a.slug}`,
      }));

    return [...productHits, ...articleHits].slice(0, MAX_RESULTS);
  }, [debounced]);

  // reset active index
  useEffect(() => {
    setActiveIndex(-1);
  }, [debounced]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && hits[activeIndex]) {
        e.preventDefault();
        router.push(hits[activeIndex].href);
        setOpen(false);
        setQuery("");
      } else if (query.trim()) {
        e.preventDefault();
        router.push(`/products?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
        setQuery("");
      }
    }
  }

  const showPanel = open && query.trim().length >= 2;
  const showHint = open && query.trim().length > 0 && query.trim().length < 2;
  const showEmpty =
    open && debounced.length >= 2 && !isPending && hits.length === 0;

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="جست‌وجو..."
          aria-label="جست‌وجو در محصولات و مقالات"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          className="w-full h-10 pr-9 pl-9 text-sm rounded-lg border border-ink-200 bg-ink-100 hover:bg-ink-200/70 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 outline-none transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن جست‌وجو"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* پنل نتایج */}
      {showPanel && (
        <div
          role="listbox"
          className="absolute top-full mt-2 inset-x-0 z-50 bg-white border border-ink-200 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_0.15s_ease-out]"
        >
          {isPending ? (
            <div className="p-4 flex items-center justify-center gap-2 text-sm text-ink-500">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              در حال جست‌وجو...
            </div>
          ) : hits.length > 0 ? (
            <>
              <ul className="max-h-[60vh] overflow-y-auto">
                {hits.map((hit, i) => (
                  <li key={`${hit.type}-${hit.id}`}>
                    <Link
                      href={hit.href}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 hover:bg-brand-50 transition-colors ${
                        activeIndex === i ? "bg-brand-50" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex w-8 h-8 shrink-0 rounded-lg items-center justify-center ${
                          hit.type === "product"
                            ? "bg-brand-50 text-brand-600"
                            : "bg-accent-50 text-accent-500"
                        }`}
                      >
                        {hit.type === "product" ? (
                          <Package className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <FileText className="w-4 h-4" aria-hidden="true" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink-800 truncate">
                          {hit.title}
                        </p>
                        <p className="text-[10px] text-ink-400 truncate">
                          {hit.type === "product"
                            ? `${hit.category} • کد: ${hit.code}`
                            : hit.category}
                        </p>
                      </div>
                      <ArrowLeft
                        className="w-3.5 h-3.5 text-ink-300 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/products?q=${encodeURIComponent(debounced)}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="block px-3 py-2.5 text-center text-xs font-medium text-brand-600 hover:text-brand-700 bg-ink-50 hover:bg-brand-50 border-t border-ink-100 transition-colors"
              >
                مشاهده همه نتایج برای «{debounced}»
              </Link>
            </>
          ) : (
            <div className="p-5 text-center text-sm text-ink-500">
              نتیجه‌ای یافت نشد.
            </div>
          )}
        </div>
      )}

      {/* پیام کوتاه */}
      {showHint && (
        <div className="absolute top-full mt-2 inset-x-0 z-50 bg-white border border-ink-200 rounded-xl shadow-xl px-3 py-2 text-xs text-ink-500 animate-[fadeIn_0.15s_ease-out]">
          حداقل ۲ حرف تایپ کنید...
        </div>
      )}

      {/* پیام نتیجه خالی */}
      {showEmpty && (
        <div className="absolute top-full mt-2 inset-x-0 z-50 bg-white border border-ink-200 rounded-xl shadow-xl p-5 text-center text-sm text-ink-500 animate-[fadeIn_0.15s_ease-out]">
          برای «{debounced}» نتیجه‌ای پیدا نشد.
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
