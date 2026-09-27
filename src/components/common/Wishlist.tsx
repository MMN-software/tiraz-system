"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface WishlistContextValue {
  items: number[];
  count: number;
  ready: boolean;
  has: (id: number) => boolean;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "tiraz_wishlist";

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  }
  return ctx;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  // خواندن از LocalStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((n) => typeof n === "number"));
        }
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  // ذخیره در LocalStorage
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, ready]);

  const has = useCallback((id: number) => items.includes(id), [items]);

  const toggle = useCallback((id: number) => {
    setItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{ items, count: items.length, ready, has, toggle, remove, clear }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
