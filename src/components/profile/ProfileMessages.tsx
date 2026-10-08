"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Loader2,
  Send,
  User as UserIcon,
  ShieldCheck,
  Clock,
  Package,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getInquiriesByUser } from "@/lib/api/inquiry-repository";
import type { Inquiry, InquiryStatus } from "@/lib/types/inquiry";

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

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function ProfileMessages() {
  const { user } = useAuth();
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      const list = await getInquiriesByUser(user!.id);
      if (!cancelled) {
        setItems(list);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // فقط پیام‌هایی که پاسخ ادمین دارن
  const answeredItems = items.filter((i) => i.adminReply);

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
      {/* هدر */}
      <div className="bg-white rounded-2xl border border-ink-200 p-5">
        <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
          پیام‌ها
        </h1>
        <p className="text-sm text-ink-500">
          پیام‌های ارسالی و پاسخ‌های کارشناسان ما
        </p>
      </div>

      {/* حالت خالی */}
      {answeredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-8 sm:p-12 text-center">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-ink-100 text-ink-400 items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-bold text-brand-700 mb-2">
            هنوز پیامی ندارید
          </h2>
          <p className="text-sm text-ink-500 leading-relaxed mb-6 max-w-md mx-auto">
            پس از ارسال درخواست از طریق فرم تماس و دریافت پاسخ از
            کارشناسان، مکاتبات شما در این بخش نمایش داده می‌شود.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            ارسال پیام جدید
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {answeredItems.map((item) => (
            <MessageThread key={item.id} inquiry={item} />
          ))}
        </div>
      )}

      {/* راهنما */}
      <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-4 text-xs text-ink-500 leading-relaxed flex items-start gap-2">
        <AlertCircle
          className="w-4 h-4 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <span>
          برای پیگیری درخواست‌های در حال بررسی، از بخش
          «درخواست‌های من» استفاده کنید.
        </span>
      </div>
    </div>
  );
}

// ===== یک گفتگو =====

function MessageThread({ inquiry }: { inquiry: Inquiry }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
      {/* هدر گفتگو */}
      <div className="p-4 border-b border-ink-100 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
          <Package className="w-3 h-3" aria-hidden="true" />
          {inquiry.subject}
        </span>
        <span
          className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            statusClasses[inquiry.status]
          }`}
        >
          {statusLabels[inquiry.status]}
        </span>
        <span className="text-[10px] text-ink-400 num ml-auto">
          کد: {inquiry.id}
        </span>
      </div>

      {/* پیام‌ها */}
      <div className="p-4 sm:p-5 space-y-4 bg-ink-50/30">
        {/* پیام کاربر */}
        <ChatBubble
          side="right"
          icon={UserIcon}
          name="شما"
          date={inquiry.createdAt}
          text={inquiry.message}
          color="brand"
        />

        {/* پاسخ ادمین */}
        {inquiry.adminReply && (
          <ChatBubble
            side="left"
            icon={ShieldCheck}
            name="کارشناس تیرازیستر"
            date={inquiry.updatedAt}
            text={inquiry.adminReply}
            color="accent"
          />
        )}
      </div>

      {/* اکشن */}
      <div className="p-3 border-t border-ink-100 flex justify-end">
        <Link
          href={`/contact`}
          className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 transition-colors"
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          پیام جدید
        </Link>
      </div>
    </div>
  );
}

// ===== حباب پیام =====

function ChatBubble({
  side,
  icon: Icon,
  name,
  date,
  text,
  color,
}: {
  side: "right" | "left";
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  date: string;
  text: string;
  color: "brand" | "accent";
}) {
  const isRight = side === "right";

  const bubbleColor =
    color === "brand"
      ? "bg-brand-600 text-white"
      : "bg-white border border-accent-200 text-ink-800";

  const iconColor =
    color === "brand" ? "bg-brand-100 text-brand-700" : "bg-accent-100 text-accent-700";

  return (
    <div
      className={`flex gap-2.5 ${isRight ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* آواتار */}
      <span
        className={`inline-flex w-9 h-9 rounded-full items-center justify-center shrink-0 ${iconColor}`}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>

      {/* محتوا */}
      <div
        className={`flex-1 max-w-[80%] ${
          isRight ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <div
          className={`flex items-center gap-2 mb-1 ${
            isRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="text-xs font-bold text-ink-700">{name}</span>
          <span className="text-[10px] text-ink-400 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" aria-hidden="true" />
            {formatDate(date)} · {formatTime(date)}
          </span>
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isRight ? "rounded-tr-sm" : "rounded-tl-sm"
          } ${bubbleColor}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}