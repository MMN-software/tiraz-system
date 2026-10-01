export const dynamic = "force-dynamic";

// POST /api/auth/register
// ثبت‌نام کاربر جدید + ساخت سشن خودکار

import { NextResponse } from "next/server";
import { db, users, sessions } from "@/lib/db";
import { eq, or } from "drizzle-orm";
import crypto from "crypto";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // ۷ روز

function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update("tiraz_salt_v1:" + password)
    .digest("hex");
}

function generateUserId(): string {
  return (
    "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

function generateToken(): string {
  return "t_" + crypto.randomBytes(24).toString("hex");
}

interface RegisterBody {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  customerType?: string;
  organizationName?: string;
  nationalId?: string;
  companyRegNumber?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterBody;

    // ---- اعتبارسنجی ----
    const errors: Record<string, string> = {};
    if (!body.name?.trim() || body.name.trim().length < 3)
      errors.name = "نام باید حداقل ۳ حرف باشد.";
    if (!body.email?.trim() || !/^\S+@\S+\.\S+$/.test(body.email))
      errors.email = "ایمیل معتبر نیست.";
    if (!body.phone?.trim() || !/^09\d{9}$/.test(body.phone.replace(/\s/g, "")))
      errors.phone = "شماره موبایل معتبر نیست.";
    if (!body.password || body.password.length < 6)
      errors.password = "رمز عبور حداقل ۶ کاراکتر باشد.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ورودی نامعتبر است.", errors },
        { status: 400 }
      );
    }

    const email = body.email!.trim().toLowerCase();
    const phone = body.phone!.replace(/\s/g, "");

    // ---- چک تکراری بودن ----
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.phone, phone)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { ok: false, error: "قبلاً با این ایمیل یا موبایل ثبت‌نام شده است." },
        { status: 409 }
      );
    }

    // ---- ساخت کاربر ----
    const newUser = {
      id: generateUserId(),
      name: body.name!.trim(),
      email,
      phone,
      passwordHash: hashPassword(body.password!),
      role: "customer" as const,
      status: "active" as const,
      customerType: (body.customerType ?? "individual") as
        | "individual"
        | "company"
        | "hospital"
        | "clinic"
        | "lab",
      organizationName: body.organizationName?.trim() || null,
      nationalId: body.nationalId?.replace(/\s/g, "") || null,
      companyRegNumber: body.companyRegNumber?.trim() || null,
    };

    await db.insert(users).values(newUser);

    // ---- ساخت سشن خودکار ----
    const token = generateToken();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await db.insert(sessions).values({
      token,
      userId: newUser.id,
      expiresAt,
    });

    // ---- پاسخ (بدون پسورد) ----
    return NextResponse.json(
      {
        ok: true,
        token,
        expiresAt: expiresAt.toISOString(),
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          status: newUser.status,
          customerType: newUser.customerType,
          organizationName: newUser.organizationName,
          nationalId: newUser.nationalId,
          companyRegNumber: newUser.companyRegNumber,
          createdAt: new Date().toISOString(),
          lastSeenAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[register] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error:
          e instanceof Error ? e.message : "خطای سرور در ثبت‌نام.",
      },
      { status: 500 }
    );
  }
}
