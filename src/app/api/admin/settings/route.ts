// GET /api/admin/settings
// دریافت همه تنظیمات با جزئیات (فقط ادمین)

import { NextResponse } from "next/server";
import { db, settings } from "@/lib/db";
import { asc } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    const rows = await db
      .select()
      .from(settings)
      .orderBy(asc(settings.group), asc(settings.key));

    const items = rows.map((s) => ({
      ...s,
      updatedAt: s.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      { ok: true, settings: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/settings GET] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/settings
// به‌روزرسانی چند تنظیم به‌صورت یکجا

interface PatchBody {
  updates: Array<{ key: string; value: string }>;
}

export async function PATCH(req: Request) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    const body = (await req.json()) as PatchBody;

    if (!Array.isArray(body.updates) || body.updates.length === 0) {
      return NextResponse.json(
        { ok: false, error: "هیچ به‌روزرسانی‌ای ارسال نشده." },
        { status: 400 }
      );
    }

    // اعتبارسنجی
    for (const u of body.updates) {
      if (!u.key || typeof u.value !== "string") {
        return NextResponse.json(
          { ok: false, error: "ساختار به‌روزرسانی نامعتبر است." },
          { status: 400 }
        );
      }
    }

    // اعمال به‌روزرسانی‌ها
    const { eq } = await import("drizzle-orm");
    for (const u of body.updates) {
      await db
        .update(settings)
        .set({ value: u.value, updatedAt: new Date() })
        .where(eq(settings.key, u.key));
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[admin/settings PATCH] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
