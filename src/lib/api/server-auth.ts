// src/lib/api/server-auth.ts
// کمکی‌های احراز هویت برای API Routes

import { db, users, sessions } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";

export interface AuthResult {
  ok: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "customer" | "admin";
    status: "active" | "pending" | "blocked";
    customerType?: string | null;
    organizationName?: string | null;
    nationalId?: string | null;
    companyRegNumber?: string | null;
    createdAt: Date;
  };
  error?: string;
  status?: number;
}

/**
 * احراز هویت کاربر از روی هدر Authorization
 */
export async function authenticate(req: Request): Promise<AuthResult> {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return { ok: false, error: "توکن ارسال نشده است.", status: 401 };
  }

  const sessionRows = await db
    .select()
    .from(sessions)
    .where(
      and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
    )
    .limit(1);

  if (sessionRows.length === 0) {
    return {
      ok: false,
      error: "سشن منقضی شده یا نامعتبر است.",
      status: 401,
    };
  }

  const session = sessionRows[0];

  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (userRows.length === 0) {
    return { ok: false, error: "کاربر یافت نشد.", status: 404 };
  }

  const user = userRows[0];

  if (user.status === "blocked") {
    return { ok: false, error: "حساب شما مسدود شده است.", status: 403 };
  }

  return { ok: true, user };
}

/**
 * احراز هویت ادمین (فقط ادمین‌ها مجاز هستند)
 */
export async function authenticateAdmin(
  req: Request
): Promise<AuthResult> {
  const result = await authenticate(req);
  if (!result.ok) return result;

  if (result.user?.role !== "admin") {
    return {
      ok: false,
      error: "دسترسی فقط برای مدیران مجاز است.",
      status: 403,
    };
  }

  return result;
}
