// src/app/api/auth/me/route.ts
// GET: دریافت کاربر فعلی از روی توکن
// PATCH: به‌روزرسانی اطلاعات کاربر

import { NextResponse } from "next/server";
import { db, users, sessions } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";

export const dynamic = "force-dynamic";

// ===== GET =====
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

    const found = await db
      .select({
        token: sessions.token,
        expiresAt: sessions.expiresAt,
        userId: sessions.userId,
      })
      .from(sessions)
      .where(
        and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
      )
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "سشن منقضی شده یا نامعتبر است." },
        { status: 401 }
      );
    }

    const session = found[0];

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

    if (user.status === "blocked") {
      await db.delete(sessions).where(eq(sessions.token, token));
      return NextResponse.json(
        { ok: false, error: "حساب شما مسدود شده است." },
        { status: 403 }
      );
    }

    // به‌روزرسانی lastSeenAt
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
          lastSeenAt: user.lastSeenAt
            ? user.lastSeenAt.toISOString()
            : null,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[me GET] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور." },
      { status: 500 }
    );
  }
}

// ===== PATCH =====
interface PatchBody {
  name?: string;
  phone?: string;
  organizationName?: string;
  nationalId?: string;
  companyRegNumber?: string;
}

export async function PATCH(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "توکن ارسال نشده است." },
        { status: 401 }
      );
    }

    const found = await db
      .select()
      .from(sessions)
      .where(
        and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
      )
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "سشن منقضی شده یا نامعتبر است." },
        { status: 401 }
      );
    }

    const userId = found[0].userId;

    const userFound = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userFound.length === 0) {
      return NextResponse.json(
        { ok: false, error: "کاربر یافت نشد." },
        { status: 404 }
      );
    }

    const currentUser = userFound[0];

    if (currentUser.status === "blocked") {
      return NextResponse.json(
        { ok: false, error: "حساب شما مسدود شده است." },
        { status: 403 }
      );
    }

    const body = (await req.json()) as PatchBody;

    // ---- اعتبارسنجی ----
    const errors: Record<string, string> = {};

    if (body.name !== undefined) {
      if (!body.name.trim() || body.name.trim().length < 3)
        errors.name = "نام باید حداقل ۳ حرف باشد.";
    }

    if (body.phone !== undefined) {
      if (!/^09\d{9}$/.test(body.phone.replace(/\s/g, "")))
        errors.phone = "شماره موبایل معتبر نیست.";
    }

    if (body.nationalId !== undefined && body.nationalId.trim()) {
      if (!/^\d{10}$/.test(body.nationalId.replace(/\s/g, "")))
        errors.nationalId = "کد ملی باید ۱۰ رقم باشد.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات نامعتبر است.", errors },
        { status: 400 }
      );
    }

    // ---- چک تکراری بودن موبایل ----
    if (body.phone !== undefined) {
      const newPhone = body.phone.replace(/\s/g, "");
      if (newPhone !== currentUser.phone) {
        const phoneExists = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.phone, newPhone))
          .limit(1);

        if (
          phoneExists.length > 0 &&
          phoneExists[0].id !== currentUser.id
        ) {
          return NextResponse.json(
            { ok: false, error: "این شماره موبایل قبلاً ثبت شده است." },
            { status: 409 }
          );
        }
      }
    }

    // ---- آماده‌سازی به‌روزرسانی ----
    const updates: Record<string, unknown> = { updatedAt: new Date() };

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.phone !== undefined)
      updates.phone = body.phone.replace(/\s/g, "");
    if (body.organizationName !== undefined)
      updates.organizationName = body.organizationName.trim() || null;
    if (body.nationalId !== undefined)
      updates.nationalId = body.nationalId.replace(/\s/g, "") || null;
    if (body.companyRegNumber !== undefined)
      updates.companyRegNumber = body.companyRegNumber.trim() || null;

    await db.update(users).set(updates).where(eq(users.id, userId));

    const updated = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const u = updated[0];

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          role: u.role,
          status: u.status,
          customerType: u.customerType,
          organizationName: u.organizationName,
          nationalId: u.nationalId,
          companyRegNumber: u.companyRegNumber,
          createdAt: u.createdAt.toISOString(),
          lastSeenAt: u.lastSeenAt ? u.lastSeenAt.toISOString() : null,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[me PATCH] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور." },
      { status: 500 }
    );
  }
}