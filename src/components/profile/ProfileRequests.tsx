"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Loader2,
  Plus,
  FileText,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  getInquiriesByUser,
  getUserInquiryStats,
} from "@/lib/api/inquiry-repository";
import type {
  Inquiry,
  InquiryStatus,
  InquiryType,
  UserInquiryStats,
} from "@/lib/types/inquiry";

const statusLabels: Record<InquiryStatus, string> = {
  pending: "در انتظار بررسی",
  in_review: "در حال بررسی",
  answered: "پاسخ داده شده",
  closed: "بسته شده",
};

const statusClasses: Record<InquiryStatus, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  in_review: "bg-brand-50 text-brand-600 border-brand-200",
  answered: "bg-accent-50 text-accent-600 border-accent-200",
  closed: "bg-ink-100 text-ink-500 border-ink-200",
};

const typeLabels: Record<InquiryType, string> = {
  quote: "درخواست قیمت",
  consultation: "مشاوره فنی",
  support: "پشتیبانی",
  other: "سایر",
};

const typeIcons: Record<InquiryType, typeof Package> = {
  quote: Package,
  consultation: MessageSquare,
  support: Wrench,
  other: HelpCircle,
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export function ProfileRequests() {
  const { user } = useAuth();
  const [items, setItems] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<UserInquiryStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      const [list, s] = await Promise.all([
        getInquiriesByUser(user!.id),
        getUserInquiryStats(user!.id),
      ]);
      if (!cancelled) {
        setItems(list);
        setStats(s);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-10 flex items-center justify-center gap-3">
        <Loader2
          className="w-5 h-5 text-brand-600 animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm text-ink-500">در حال بارگذاری...</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* آمار */}
      {stats && stats.total > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <StatBox
            label="کل درخواست‌ها"
            value={stats.total}
            color="text-brand-700 bg-brand-50"
            icon={Package}
          />
          <StatBox
            label="در جریان"
            value={stats.pending}
            color="text-amber-600 bg-amber-50"
            icon={Clock}
          />
          <StatBox
            label="پاسخ داده شده"
            value={stats.answered}
            color="text-accent-600 bg-accent-50"
            icon={CheckCircle2}
          />
        </div>
      )}

      {/* سرصفحه */}
      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-bold text-brand-700 flex items-center gap-2">
            <Package className="w-4 h-4" aria-hidden="true" />
            درخواست‌های من
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            درخواست جدید
          </Link>
        </div>

        {/* لیست */}
        {items.length === 0 ? (
          <div className="p-8 sm:p-10 text-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-3">
              <FileText className="w-6 h-6" aria-hidden="true" />
            </span>
            <p className="text-sm text-ink-500 mb-1">
              هنوز درخواستی ثبت نکرده‌اید.
            </p>
            <p className="text-xs text-ink-400 mb-4">
              می‌توانید از طریق فرم تماس، درخواست قیمت یا مشاوره ثبت کنید.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              ثبت اولین درخواست
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-ink-100">
            {items.map((item) => {
              const TypeIcon = typeIcons[item.type];
              return (
                <li key={item.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex w-10 h-10 rounded-xl bg-brand-50 text-brand-600 items-center justify-center shrink-0">
                        <TypeIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-ink-800 truncate">
                            {item.subject}
                          </span>
                          <span
                            className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              statusClasses[item.status]
                            }`}
                          >
                            {statusLabels[item.status]}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
                          <span className="num">کد: {item.id}</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {formatDate(item.createdAt)}
                          </span>
                          <span className="text-ink-500">
                            {typeLabels[item.type]}
                          </span>
                        </div>
                        {item.productName && (
                          <p className="text-xs text-ink-500 mt-1.5 truncate">
                            محصول: {item.productName}
                          </p>
                        )}
                        <p className="text-xs text-ink-500 mt-2 leading-relaxed line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                    </div>

                    {/* پاسخ ادمین */}
                    {item.adminReply && (
                      <div className="mr-13 sm:mr-13 bg-accent-50 border border-accent-100 rounded-lg p-3 text-xs">
                        <div className="flex items-center gap-1.5 text-accent-700 font-medium mb-1">
                          <MessageSquare
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                          پاسخ کارشناس
                        </div>
                        <p className="text-accent-800 leading-relaxed">
                          {item.adminReply}
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* راهنما */}
      <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-4 text-xs text-ink-500 leading-relaxed flex items-start gap-2">
        <AlertCircle
          className="w-4 h-4 shrink-0 mt-0.5 text-ink-400"
          aria-hidden="true"
        />
        <span>
          درخواست‌های شما پس از ثبت، توسط کارشناسان بررسی و در اسرع وقت پاسخ
          داده می‌شوند. در صورت نیاز به پیگیری، کد درخواست را در تماس‌های
          بعدی اعلام کنید.
        </span>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Package;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-3 sm:p-4 text-center">
      <span
        className={`inline-flex w-9 h-9 mb-2 rounded-xl ${color} items-center justify-center`}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="text-lg sm:text-xl font-extrabold text-brand-700 num">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-ink-500 mt-0.5">{label}</div>
    </div>
  );
}
