// PATCH /api/admin/inquiries/[id] → تغییر وضعیت + ثبت پاسخ
// DELETE /api/admin/inquiries/[id] → حذف درخواست

import { NextResponse } from "next/server";
import { db, inquiries } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface PatchBody {
  status?: string;
  adminReply?: string;
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

    const found = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "درخواست یافت نشد." },
        { status: 404 }
      );
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };

    if (body.status !== undefined) {
      if (
        !["pending", "in_review", "answered", "closed"].includes(body.status)
      ) {
        return NextResponse.json(
          { ok: false, error: "وضعیت نامعتبر است." },
          { status: 400 }
        );
      }
      updates.status = body.status;
    }

    if (body.adminReply !== undefined) {
      updates.adminReply = body.adminReply.trim() || null;
    }

    await db
      .update(inquiries)
      .set(updates)
      .where(eq(inquiries.id, id));

    const updated = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id))
      .limit(1);

    const i = updated[0];
    return NextResponse.json(
      {
        ok: true,
        inquiry: {
          ...i,
          createdAt: i.createdAt.toISOString(),
          updatedAt: i.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/inquiries PATCH] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}

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
      .from(inquiries)
      .where(eq(inquiries.id, id))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "درخواست یافت نشد." },
        { status: 404 }
      );
    }

    await db.delete(inquiries).where(eq(inquiries.id, id));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[admin/inquiries DELETE] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
