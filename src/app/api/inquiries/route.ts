// POST /api/inquiries
// ثبت درخواست جدید (عمومی — هم برای مهمان هم کاربر لاگین‌شده)

import { NextResponse } from "next/server";
import { db, inquiries, sessions } from "@/lib/db";
import { and, eq, gt } from "drizzle-orm";

export const dynamic = "force-dynamic";

function generateInquiryId(): string {
  return "RQ-" + Date.now().toString(36).toUpperCase().slice(-6);
}

interface InquiryBody {
  type?: string;
  subject?: string;
  message?: string;
  productId?: number;
  productName?: string;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InquiryBody;

    // ---- اعتبارسنجی ----
    const errors: Record<string, string> = {};
    if (!body.subject?.trim() || body.subject.trim().length < 3)
      errors.subject = "موضوع حداقل ۳ حرف باشد.";
    if (!body.message?.trim() || body.message.trim().length < 10)
      errors.message = "متن پیام حداقل ۱۰ حرف باشد.";
    if (
      !body.type ||
      !["quote", "consultation", "support", "other"].includes(body.type)
    )
      errors.type = "نوع درخواست نامعتبر است.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ناقص است.", errors },
        { status: 400 }
      );
    }

    // ---- چک لاگین بودن کاربر ----
    let userId = "guest";
    let guestName: string | null = null;
    let guestPhone: string | null = null;
    let guestEmail: string | null = null;

    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (token) {
      const sessionRows = await db
        .select()
        .from(sessions)
        .where(
          and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
        )
        .limit(1);

      if (sessionRows.length > 0) {
        userId = sessionRows[0].userId;
      }
    }

    // ---- اگه مهمان بود، اطلاعات مهمان اجباری ----
    if (userId === "guest") {
      if (!body.guestName?.trim())
        return NextResponse.json(
          { ok: false, error: "نام برای مهمان الزامی است." },
          { status: 400 }
        );
      if (
        !body.guestPhone?.trim() ||
        !/^09\d{9}$/.test(body.guestPhone.replace(/\s/g, ""))
      )
        return NextResponse.json(
          { ok: false, error: "شماره موبایل معتبر الزامی است." },
          { status: 400 }
        );

      guestName = body.guestName.trim();
      guestPhone = body.guestPhone.replace(/\s/g, "");
      guestEmail = body.guestEmail?.trim() || null;
    }

    // ---- درج در دیتابیس ----
    const id = generateInquiryId();

    await db.insert(inquiries).values({
      id,
      userId,
      type: body.type as "quote" | "consultation" | "support" | "other",
      subject: body.subject!.trim(),
      message: body.message!.trim(),
      productId: body.productId ?? null,
      productName: body.productName?.trim() || null,
      guestName,
      guestPhone,
      guestEmail,
      status: "pending",
    });

    const inserted = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id))
      .limit(1);

    const i = inserted[0];

    return NextResponse.json(
      {
        ok: true,
        inquiry: {
          ...i,
          createdAt: i.createdAt.toISOString(),
          updatedAt: i.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[inquiries POST] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
