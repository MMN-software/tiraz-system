"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isAdmin, isLoading } = useAuth();

  // ادمین‌ها نباید پنل کاربری عادی ببینن — می‌رن پنل مدیریت
  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, isLoading, router]);

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
