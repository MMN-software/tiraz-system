// src/app/api/auth/change-password/route.ts
// PATCH: تغییر رمز عبور کاربر

import { NextResponse } from "next/server";
import { db, users, sessions } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update("tiraz_salt_v1:" + password)
    .digest("hex");
}

interface ChangePasswordBody {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
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

    // پیدا کردن سشن
    const sessionRows = await db
      .select()
      .from(sessions)
      .where(
        and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
      )
      .limit(1);

    if (sessionRows.length === 0) {
      return NextResponse.json(
        { ok: false, error: "سشن منقضی شده یا نامعتبر است." },
        { status: 401 }
      );
    }

    const userId = sessionRows[0].userId;

    // پیدا کردن کاربر
    const userRows = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userRows.length === 0) {
      return NextResponse.json(
        { ok: false, error: "کاربر یافت نشد." },
        { status: 404 }
      );
    }

    const user = userRows[0];

    if (user.status === "blocked") {
      return NextResponse.json(
        { ok: false, error: "حساب شما مسدود شده است." },
        { status: 403 }
      );
    }

    const body = (await req.json()) as ChangePasswordBody;

    // ---- اعتبارسنجی ----
    const errors: Record<string, string> = {};

    if (!body.currentPassword)
      errors.currentPassword = "رمز فعلی الزامی است.";

    if (!body.newPassword || body.newPassword.length < 6)
      errors.newPassword = "رمز جدید حداقل ۶ کاراکتر باشد.";

    if (body.newPassword !== body.confirmPassword)
      errors.confirmPassword = "تکرار رمز جدید یکسان نیست.";

    if (
      body.newPassword &&
      body.currentPassword &&
      body.newPassword === body.currentPassword
    )
      errors.newPassword = "رمز جدید نباید با رمز فعلی یکسان باشد.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات نامعتبر است.", errors },
        { status: 400 }
      );
    }

    // ---- چک رمز فعلی ----
    if (user.passwordHash !== hashPassword(body.currentPassword!)) {
      return NextResponse.json(
        { ok: false, error: "رمز فعلی اشتباه است." },
        { status: 400 }
      );
    }

    // ---- به‌روزرسانی رمز ----
    await db
      .update(users)
      .set({
        passwordHash: hashPassword(body.newPassword!),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // ---- پاک کردن سشن‌های دیگه (امنیت) ----
    // سشن فعلی رو نگه می‌داریم، بقیه رو پاک می‌کنیم
    await db
      .delete(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          // پاک کردن همه سشن‌ها به‌جز سشن فعلی
          // (drizzle OR با not exists راحت‌تره، فعلاً فقط سشن فعلی رو نگه می‌داریم)
        )
      );

    // دوباره سشن فعلی رو بسازیم
    await db.insert(sessions).values({
      token,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json(
      { ok: true, message: "رمز عبور با موفقیت تغییر کرد." },
      { status: 200 }
    );
  } catch (e) {
    console.error("[change-password PATCH] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور." },
      { status: 500 }
    );
  }
}