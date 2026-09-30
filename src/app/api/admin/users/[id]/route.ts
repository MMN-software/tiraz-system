// PATCH /api/admin/users/[id]  → تغییر وضعیت کاربر
// DELETE /api/admin/users/[id] → حذف کاربر

import { NextResponse } from "next/server";
import { db, users, sessions } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// ===== تغییر وضعیت =====

interface PatchBody {
  status?: "active" | "pending" | "blocked";
}

export async function PATCH(req: Request, ctx: RouteContext) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    const { id } = await ctx.params;
    const body = (await req.json()) as PatchBody;

    if (
      !body.status ||
      !["active", "pending", "blocked"].includes(body.status)
    ) {
      return NextResponse.json(
        { ok: false, error: "وضعیت نامعتبر است." },
        { status: 400 }
      );
    }

    // ---- پیدا کردن کاربر ----
    const found = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "کاربر یافت نشد." },
        { status: 404 }
      );
    }

    const target = found[0];

    // ---- جلوگیری از بلاک کردن ادمین ----
    if (target.role === "admin" && body.status === "blocked") {
      return NextResponse.json(
        { ok: false, error: "نمی‌توان حساب مدیر سیستم را مسدود کرد." },
        { status: 400 }
      );
    }

    // ---- به‌روزرسانی ----
    await db
      .update(users)
      .set({ status: body.status, updatedAt: new Date() })
      .where(eq(users.id, id));

    // ---- اگه بلاک شد، سشن‌ها رو پاک کن ----
    if (body.status === "blocked") {
      await db.delete(sessions).where(eq(sessions.userId, id));
    }

    // ---- پاسخ ----
    const updated = await db
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
      .where(eq(users.id, id))
      .limit(1);

    const u = updated[0];
    return NextResponse.json(
      {
        ok: true,
        user: { ...u, createdAt: u.createdAt.toISOString() },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/users PATCH] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}

// ===== حذف کاربر =====

export async function DELETE(req: Request, ctx: RouteContext) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    const { id } = await ctx.params;

    const found = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "کاربر یافت نشد." },
        { status: 404 }
      );
    }

    const target = found[0];

    if (target.role === "admin") {
      return NextResponse.json(
        { ok: false, error: "نمی‌توان حساب مدیر سیستم را حذف کرد." },
        { status: 400 }
      );
    }

    // ---- پاک کردن سشن‌ها ----
    await db.delete(sessions).where(eq(sessions.userId, id));

    // ---- حذف کاربر ----
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[admin/users DELETE] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
