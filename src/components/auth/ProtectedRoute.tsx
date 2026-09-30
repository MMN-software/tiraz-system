"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
  /** اگر true باشد، فقط ادمین‌ها دسترسی دارند */
  adminOnly?: boolean;
}

/**
 * محافظ مسیرها:
 * - کاربر لاگین‌نکرده → /login
 * - کاربر عادی که adminOnly خواسته → /profile
 */
export function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // کاربر لاگین نکرده
    if (!user) {
      router.replace("/login");
      return;
    }

    // فقط ادمین باید دسترسی داشته باشه
    if (adminOnly && !isAdmin) {
      router.replace("/profile");
    }
  }, [user, isLoading, isAdmin, adminOnly, router]);

  // در حال بررسی سشن
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span
            className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"
            aria-hidden="true"
          />
          <p className="text-sm text-ink-500">در حال بررسی دسترسی...</p>
        </div>
      </div>
    );
  }

  // کاربر لاگین نکرده یا دسترسی نداره
  if (!user) return null;
  if (adminOnly && !isAdmin) return null;

  return <>{children}</>;
}
