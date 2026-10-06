"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  FileText,
  MessageSquare,
  Settings,
  Home,
  LogOut,
  ChevronLeft,
  Users,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";

const items = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "محصولات", icon: Package },
  { href: "/admin/categories", label: "دسته‌بندی‌ها", icon: Layers },
  { href: "/admin/articles", label: "مقالات", icon: FileText },
  { href: "/admin/messages", label: "درخواست‌ها و پیام‌ها", icon: MessageSquare },
  { href: "/admin/users", label: "کاربران", icon: Users },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-ink-100/70">
        {/* نوار بالای ادمین */}
        <div className="bg-brand-800 text-white text-xs">
          <div className="container mx-auto px-4 h-9 flex items-center justify-between">
            <span className="font-medium">
              پنل مدیریت تیرازیس طب
              {user?.name ? ` — ${user.name}` : ""}
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-accent-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              بازگشت به سایت
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[260px_1fr] gap-6">
            {/* سایدبار */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
                <div className="p-4 border-b border-ink-100">
                  <Logo size="sm" />
                </div>
                <nav aria-label="منوی پنل مدیریت" className="p-2">
                  {items.map((item) => {
                    const isActive = item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-brand-600 text-white font-medium"
                            : "text-ink-700 hover:bg-brand-50 hover:text-brand-700"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-ink-400"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="flex-1">{item.label}</span>
                        {!isActive && (
                          <ChevronLeft
                            className="w-3.5 h-3.5 text-ink-300"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    );
                  })}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-ink-100 pt-3"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>خروج از پنل</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* محتوا */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
