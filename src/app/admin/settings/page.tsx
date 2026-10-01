"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  Share2,
  Search,
  RotateCcw,
} from "lucide-react";
import {
  fetchAllSettings,
  updateSettings,
  type SettingItem,
} from "@/lib/api/settings-repository";

const GROUP_LABELS: Record<string, string> = {
  general: "اطلاعات شرکت",
  social: "شبکه‌های اجتماعی",
  seo: "تنظیمات SEO",
};

const GROUP_ICONS: Record<string, typeof Building2> = {
  general: Building2,
  social: Share2,
  seo: Search,
};

export default function AdminSettingsPage() {
  const [items, setItems] = useState<SettingItem[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadData() {
    setLoading(true);
    const list = await fetchAllSettings();
    setItems(list);
    const d: Record<string, string> = {};
    list.forEach((s) => {
      d[s.key] = s.value;
    });
    setDraft(d);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const grouped = useMemo(() => {
    const map: Record<string, SettingItem[]> = {};
    items.forEach((s) => {
      if (!map[s.group]) map[s.group] = [];
      map[s.group].push(s);
    });
    return map;
  }, [items]);

  const hasChanges = useMemo(() => {
    return items.some((s) => draft[s.key] !== s.value);
  }, [items, draft]);

  function handleChange(key: string, value: string) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    const d: Record<string, string> = {};
    items.forEach((s) => {
      d[s.key] = s.value;
    });
    setDraft(d);
  }

  async function handleSave() {
    const updates = items
      .filter((s) => draft[s.key] !== s.value)
      .map((s) => ({ key: s.key, value: draft[s.key] }));

    if (updates.length === 0) {
      setToast({ type: "error", message: "تغییری برای ذخیره وجود ندارد." });
      return;
    }

    setSaving(true);
    try {
      const res = await updateSettings(updates);
      if (!res.ok) throw new Error(res.error || "خطا");
      await loadData();
      setToast({
        type: "success",
        message: `${updates.length} تنظیم با موفقیت ذخیره شد.`,
      });
    } catch (e) {
      setToast({
        type: "error",
        message: e instanceof Error ? e.message : "خطا",
      });
    } finally {
      setSaving(false);
    }
  }

  const groupKeys = Object.keys(grouped).sort((a, b) => {
    const order = ["general", "social", "seo"];
    return order.indexOf(a) - order.indexOf(b);
  });

  return (
    <div className="space-y-5">
      {toast && (
        <div
          role="alert"
          className={`flex items-center gap-2 p-3 rounded-lg border text-xs ${
            toast.type === "success"
              ? "bg-accent-50 border-accent-200 text-accent-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* هدر */}
      <div className="bg-white rounded-2xl border border-ink-200 p-5">
        <h1 className="text-xl font-bold text-brand-700 mb-1 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" aria-hidden="true" />
          تنظیمات سایت
        </h1>
        <p className="text-sm text-ink-500">
          اطلاعات شرکت، شبکه‌های اجتماعی و تنظیمات SEO
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-10 flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 text-brand-600 animate-spin" aria-hidden="true" />
          <span className="text-sm text-ink-500">در حال بارگذاری...</span>
        </div>
      ) : (
        <>
          {groupKeys.map((groupKey) => {
            const groupItems = grouped[groupKey];
            const GroupIcon = GROUP_ICONS[groupKey] || Building2;
            return (
              <div
                key={groupKey}
                className="bg-white rounded-2xl border border-ink-200 overflow-hidden"
              >
                <div className="p-4 border-b border-ink-100 flex items-center gap-2">
                  <span className="inline-flex w-8 h-8 rounded-lg bg-brand-50 text-brand-600 items-center justify-center">
                    <GroupIcon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <h2 className="font-bold text-brand-700">
                    {GROUP_LABELS[groupKey] || groupKey}
                  </h2>
                </div>
                <div className="divide-y divide-ink-100">
                  {groupItems.map((item) => (
                    <SettingField
                      key={item.key}
                      item={item}
                      value={draft[item.key] ?? ""}
                      onChange={(v) => handleChange(item.key, v)}
                      isChanged={draft[item.key] !== item.value}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* نوار پایین ثابت */}
          {hasChanges && (
            <div className="sticky bottom-2 z-30 flex justify-center">
              <div className="bg-brand-700 text-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-md w-full">
                <span className="text-xs flex-1">
                  تغییرات ذخیره‌نشده دارید
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  لغو
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-accent-500 hover:bg-accent-600 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Save className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  {saving ? "..." : "ذخیره"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SettingField({
  item,
  value,
  onChange,
  isChanged,
}: {
  item: SettingItem;
  value: string;
  onChange: (v: string) => void;
  isChanged: boolean;
}) {
  const isLong = item.value.length > 60 || item.key.includes("description") || item.key.includes("address");
  const isUrl = item.key.includes("social_") || item.value.startsWith("http");

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-medium text-ink-700">
          {item.label || item.key}
        </label>
        {isChanged && (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            تغییر
          </span>
        )}
      </div>
      {isLong ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm rounded-lg border border-ink-200 p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-y min-h-[80px]"
        />
      ) : (
        <input
          type={isUrl ? "url" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={isUrl ? "ltr" : "rtl"}
          className="w-full h-11 px-3 text-sm rounded-lg border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
        />
      )}
      <div className="text-[10px] text-ink-400 mt-1" dir="ltr">
        {item.key}
      </div>
    </div>
  );
}
