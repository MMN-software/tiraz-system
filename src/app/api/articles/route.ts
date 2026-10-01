// GET /api/articles
// لیست مقالات منتشرشده (عمومی)

import { NextResponse } from "next/server";
import { db, articles } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.isPublished, true))
      .orderBy(desc(articles.createdAt));

    const items = rows.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      { ok: true, articles: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[articles GET] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
