export const dynamic = "force-dynamic";

// GET /api/auth/me
// دریافت اطلاعات کاربر فعلی از روی توکن

import { NextResponse } from "next/server";
import { db, users, sessions } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    // ---- استخراج توکن ----
    // توکن رو از هدر Authorization می‌گیریم: "Bearer t_xxxx"
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "توکن ارسال نشده است." },
        { status: 401 }
      );
    }

    // ---- پیدا کردن سشن معتبر ----
    const found = await db
      .select({
        token: sessions.token,
        expiresAt: sessions.expiresAt,
        userId: sessions.userId,
      })
      .from(sessions)
      .where(
        and(
          eq(sessions.token, token),
          gt(sessions.expiresAt, new Date())
        )
      )
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "سشن منقضی شده یا نامعتبر است." },
        { status: 401 }
      );
    }

    const session = found[0];

    // ---- پیدا کردن کاربر ----
    const userFound = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);

    if (userFound.length === 0) {
      return NextResponse.json(
        { ok: false, error: "کاربر یافت نشد." },
        { status: 404 }
      );
    }

    const user = userFound[0];

    // ---- چک وضعیت ----
        // ---- به‌روزرسانی lastSeenAt ----
    await db
      .update(users)
      .set({ lastSeenAt: new Date() })
      .where(eq(users.id, user.id));

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          customerType: user.customerType,
          organizationName: user.organizationName,
          nationalId: user.nationalId,
          companyRegNumber: user.companyRegNumber,
          createdAt: user.createdAt.toISOString(),
          lastSeenAt: user.lastSeenAt ? user.lastSeenAt.toISOString() : null,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[me] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور.",
      },
      { status: 500 }
    );
  }
}
