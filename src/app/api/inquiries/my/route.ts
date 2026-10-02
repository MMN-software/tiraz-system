// GET /api/inquiries/my
// دریافت درخواست‌های کاربر لاگین‌شده

import { NextResponse } from "next/server";
import { db, inquiries, sessions } from "@/lib/db";
import { eq, and, gt, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "توکن ارسال نشده است." },
        { status: 401 }
      );
    }

    const sessionRows = await db
      .select()
      .from(sessions)
      .where(
        and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
      )
      .limit(1);

    if (sessionRows.length === 0) {
      return NextResponse.json(
        { ok: false, error: "سشن نامعتبر است." },
        { status: 401 }
      );
    }

    const userId = sessionRows[0].userId;

    const rows = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.userId, userId))
      .orderBy(desc(inquiries.createdAt));

    const items = rows.map((i) => ({
      ...i,
      createdAt: i.createdAt.toISOString(),
      updatedAt: i.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      { ok: true, inquiries: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[inquiries/my GET] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
