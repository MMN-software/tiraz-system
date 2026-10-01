// GET /api/settings
// دریافت همه تنظیمات به‌صورت key-value (عمومی)

import { NextResponse } from "next/server";
import { db, settings } from "@/lib/db";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(settings)
      .orderBy(asc(settings.group), asc(settings.key));

    // تبدیل به object key-value
    const map: Record<string, string> = {};
    rows.forEach((s) => {
      map[s.key] = s.value;
    });

    return NextResponse.json(
      { ok: true, settings: map, count: rows.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[settings GET] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
