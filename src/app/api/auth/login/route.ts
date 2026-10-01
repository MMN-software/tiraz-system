export const dynamic = "force-dynamic";

// POST /api/auth/login
// ورود کاربر با ایمیل یا موبایل

import { NextResponse } from "next/server";
import { db, users, sessions } from "@/lib/db";
import { eq, or, and, gt } from "drizzle-orm";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update("tiraz_salt_v1:" + password)
    .digest("hex");
}

function generateToken(): string {
  return (
    "t_" +
    crypto.randomBytes(24).toString("hex")
  );
}

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // ۷ روز

interface LoginBody {
  identifier?: string;
  password?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;

    const identifier = body.identifier?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!identifier || !password) {
      return NextResponse.json(
        { ok: false, error: "ایمیل/موبایل و رمز عبور الزامی است." },
        { status: 400 }
      );
    }

    // ---- پیدا کردن کاربر با ایمیل یا موبایل ----
    const normalizedPhone = identifier.replace(/\s/g, "");
    const found = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, identifier),
          eq(users.phone, normalizedPhone)
        )
      )
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "نام کاربری یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    const user = found[0];

    // ---- چک پسورد ----
    if (user.passwordHash !== hashPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "نام کاربری یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    // ---- چک وضعیت ----
    if (user.status === "blocked") {
      return NextResponse.json(
        { ok: false, error: "حساب شما مسدود شده است." },
        { status: 403 }
      );
    }
    if (user.status === "pending") {
      return NextResponse.json(
        { ok: false, error: "حساب شما در انتظار تأیید است." },
        { status: 403 }
      );
    }

    // ---- ساخت سشن ----
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    // پاک کردن سشن‌های قبلی این کاربر (اختیاری)
    await db.delete(sessions).where(eq(sessions.userId, user.id));

    // ---- به‌روزرسانی lastSeenAt ----
    await db
      .update(users)
      .set({ lastSeenAt: new Date() })
      .where(eq(users.id, user.id));

    await db.insert(sessions).values({
      token,
      userId: user.id,
      expiresAt,
    });

    // ---- پاسخ ----
    return NextResponse.json(
      {
        ok: true,
        token,
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
        expiresAt: expiresAt.toISOString(),
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[login] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error:
          e instanceof Error ? e.message : "خطای سرور در ورود.",
      },
      { status: 500 }
    );
  }
}
