// GET /api/admin/inquiries
// لیست همه درخواست‌ها همراه با اطلاعات کاربر (فقط ادمین)

import { NextResponse } from "next/server";
import { db, inquiries, users } from "@/lib/db";
import { desc } from "drizzle-orm";
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
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt));

    // گرفتن همه کاربران برای ترکیب
    const userRows = await db.select().from(users);
    const userMap = new Map(userRows.map((u) => [u.id, u]));

    const items = rows.map((i) => {
      const isGuest = i.userId === "guest";
      const u = isGuest ? null : userMap.get(i.userId);

      return {
        ...i,
        isGuest,
        user: u
          ? {
              id: u.id,
              name: u.name,
              email: u.email,
              phone: u.phone,
              customerType: u.customerType,
            }
          : null,
        createdAt: i.createdAt.toISOString(),
        updatedAt: i.updatedAt.toISOString(),
      };
    });

    return NextResponse.json(
      { ok: true, inquiries: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/inquiries GET] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
