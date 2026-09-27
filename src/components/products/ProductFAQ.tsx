"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { FAQItem } from "@/lib/types";

interface Props {
  items?: FAQItem[];
}

export function ProductFAQ({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-ink-100">
        <h2 className="text-lg font-bold text-brand-700 flex items-center gap-2">
          <HelpCircle
            className="w-5 h-5 text-accent-500"
            aria-hidden="true"
          />
          پرسش‌های متداول
        </h2>
        <p className="text-xs text-ink-500 mt-1">
          پاسخ سؤال‌های پرتکرار درباره این محصول
        </p>
      </div>

      <ul className="divide-y divide-ink-100">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center gap-3 px-5 sm:px-6 py-4 text-right hover:bg-ink-50/60 transition-colors"
              >
                <span
                  className={`inline-flex w-7 h-7 shrink-0 rounded-full items-center justify-center text-xs font-bold num transition-colors ${
                    isOpen
                      ? "bg-brand-600 text-white"
                      : "bg-ink-100 text-ink-500"
                  }`}
                  aria-hidden="true"
                >
                  {(i + 1).toLocaleString("fa-IR")}
                </span>
                <span className="flex-1 text-sm font-bold text-brand-700 leading-relaxed">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-ink-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                hidden={!isOpen}
                className="px-5 sm:px-6 pb-5"
              >
                <div className="pr-10">
                  <p className="text-sm text-ink-600 leading-loose">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
