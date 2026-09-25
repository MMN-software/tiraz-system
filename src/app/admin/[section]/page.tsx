import Link from "next/link";
import {
  Layers,
  FileText,
  MessageSquare,
  Settings,
  Construction,
  ArrowLeft,
} from "lucide-react";

interface SectionInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const sectionInfo: Record<string, SectionInfo> = {
  categories: {
    icon: Layers,
    title: "مدیریت دسته‌بندی‌ها",
    desc: "افزودن، ویرایش و حذف دسته‌بندی محصولات، تنظیم ترتیب نمایش و مدیریت زیردسته‌ها.",
  },
  articles: {
    icon: FileText,
    title: "مدیریت مقالات",
    desc: "ایجاد، ویرایش و انتشار مقالات تخصصی، مدیریت دسته‌بندی مقالات و زمان‌بندی انتشار.",
  },
  messages: {
    icon: MessageSquare,
    title: "درخواست‌ها و پیام‌ها",
    desc: "مشاهده و پاسخ به درخواست‌های مشاوره، پیام‌های فرم تماس و پیگیری درخواست‌های کاربران.",
  },
  settings: {
    icon: Settings,
    title: "تنظیمات سایت",
    desc: "مدیریت اطلاعات شرکت، شماره‌های تماس، شبکه‌های اجتماعی و تنظیمات SEO.",
  },
};

export function generateStaticParams() {
  return Object.keys(sectionInfo).map((section) => ({ section }));
}

interface PageProps {
  params: Promise<{ section: string }>;
}

export default async function AdminSectionPage({ params }: PageProps) {
  const { section } = await params;
  const info = sectionInfo[section];

  if (!info) {
    return (
      <div className="bg-white rounded-2xl border border-ink-200 p-10 text-center">
        <h1 className="text-lg font-bold text-brand-700 mb-3">
          این بخش وجود ندارد
        </h1>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          بازگشت به داشبورد
        </Link>
      </div>
    );
  }

  const Icon = info.icon;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-10 text-center">
        <span className="inline-flex w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 items-center justify-center mb-5">
          <Icon className="w-8 h-8" aria-hidden="true" />
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-brand-700 mb-3">
          {info.title}
        </h1>
        <p className="text-sm text-ink-500 leading-loose max-w-xl mx-auto mb-6">
          {info.desc}
        </p>
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-2 rounded-full">
          <Construction className="w-3.5 h-3.5" aria-hidden="true" />
          این بخش در نسخه بعدی تکمیل می‌شود
        </div>
      </div>

      <div className="bg-ink-100/70 rounded-2xl border border-ink-200 p-5 text-xs text-ink-500 leading-relaxed">
        فرم‌های ویرایش، افزودن و حذف در این بخش با اتصال به دیتابیس واقعی و
        پیاده‌سازی Server Actions اضافه خواهند شد.
      </div>
    </div>
  );
}
