"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MAX_COMPARE = 3;
const STORAGE_KEY = "tiraz_compare";

interface CompareContextValue {
  items: number[];
  count: number;
  ready: boolean;
  max: number;
  has: (id: number) => boolean;
  toggle: (id: number) => "added" | "removed" | "full";
  remove: (id: number) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside <CompareProvider>");
  return ctx;
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .filter((n) => typeof n === "number")
              .slice(0, MAX_COMPARE)
          );
        }
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, ready]);

  const has = useCallback((id: number) => items.includes(id), [items]);

  const toggle = useCallback(
    (id: number): "added" | "removed" | "full" => {
      if (items.includes(id)) {
        setItems((prev) => prev.filter((x) => x !== id));
        return "removed";
      }
      if (items.length >= MAX_COMPARE) {
        return "full";
      }
      setItems((prev) => [...prev, id]);
      return "added";
    },
    [items]
  );

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider
      value={{
        items,
        count: items.length,
        ready,
        max: MAX_COMPARE,
        has,
        toggle,
        remove,
        clear,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
