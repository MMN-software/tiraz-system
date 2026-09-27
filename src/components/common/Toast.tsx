"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

const typeStyles: Record<ToastType, { cls: string; icon: ReactNode }> = {
  success: {
    cls: "border-accent-200",
    icon: (
      <CheckCircle2
        className="w-5 h-5 text-accent-500 shrink-0"
        aria-hidden="true"
      />
    ),
  },
  error: {
    cls: "border-red-200",
    icon: (
      <AlertCircle
        className="w-5 h-5 text-red-500 shrink-0"
        aria-hidden="true"
      />
    ),
  },
  info: {
    cls: "border-brand-200",
    icon: (
      <Info className="w-5 h-5 text-brand-500 shrink-0" aria-hidden="true" />
    ),
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setItems((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const remove = (id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none"
      >
        {items.map((t) => {
          const s = typeStyles[t.type];
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex items-center gap-3 bg-white ${s.cls} border rounded-xl px-4 py-3 shadow-lg text-sm font-medium text-ink-800 animate-[toastIn_0.25s_ease-out]`}
            >
              {s.icon}
              <span className="flex-1 leading-relaxed">{t.message}</span>
              <button
                type="button"
                onClick={() => remove(t.id)}
                aria-label="بستن پیام"
                className="w-6 h-6 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-400 hover:text-ink-600 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
