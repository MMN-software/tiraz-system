// GET /api/categories
// لیست همه دسته‌بندی‌های فعال (عمومی)

import { NextResponse } from "next/server";
import { db, categories } from "@/lib/db";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.order));

    return NextResponse.json(
      { ok: true, categories: rows, count: rows.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[categories GET] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
