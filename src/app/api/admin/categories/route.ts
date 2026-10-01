// GET /api/admin/categories
// لیست همه دسته‌بندی‌ها (فقط ادمین)

import { NextResponse } from "next/server";
import { db, categories } from "@/lib/db";
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
      .from(categories)
      .orderBy(asc(categories.order));

    const items = rows.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      { ok: true, categories: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/categories GET] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
