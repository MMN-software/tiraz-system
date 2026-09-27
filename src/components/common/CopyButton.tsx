"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "./Toast";

interface Props {
  text: string;
  label?: string;
  toastMessage?: string;
  size?: "sm" | "md";
  variant?: "ghost" | "box";
  ariaLabel?: string;
}

export function CopyButton({
  text,
  label,
  toastMessage = "کپی شد",
  size = "sm",
  variant = "ghost",
  ariaLabel,
}: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // روش قدیمی برای مرورگرهای قدیمی
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      toast(toastMessage, "success");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("کپی نشد. لطفاً دستی انتخاب کنید.", "error");
    }
  }

  const sizeCls =
    size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconCls =
    size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  if (variant === "box") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={ariaLabel ?? `کپی ${label ?? text}`}
        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-ink-200 hover:border-brand-300 hover:bg-brand-50 text-ink-600 hover:text-brand-600 text-xs font-medium transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-accent-500" aria-hidden="true" />
            کپی شد
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            کپی
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel ?? `کپی ${label ?? text}`}
      title="کپی"
      className={`inline-flex items-center justify-center ${sizeCls} rounded-lg text-ink-400 hover:text-brand-600 hover:bg-brand-50 transition-colors shrink-0`}
    >
      {copied ? (
        <Check className={`${iconCls} text-accent-500`} aria-hidden="true" />
      ) : (
        <Copy className={iconCls} aria-hidden="true" />
      )}
    </button>
  );
}
