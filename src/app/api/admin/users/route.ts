// GET /api/admin/users
// دریافت لیست همه کاربران (فقط برای ادمین)

import { NextResponse } from "next/server";
import { db, users } from "@/lib/db";
import { desc } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

export async function GET(req: Request) {
  try {
    // ---- احراز هویت ادمین ----
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    // ---- دریافت کاربران ----
    const rows = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        status: users.status,
        customerType: users.customerType,
        organizationName: users.organizationName,
        nationalId: users.nationalId,
        companyRegNumber: users.companyRegNumber,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    // ---- تبدیل Date به string ----
    const items = rows.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
    }));

    return NextResponse.json(
      { ok: true, users: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/users GET] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
