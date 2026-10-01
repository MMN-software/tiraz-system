// PATCH /api/admin/categories/[slug] → ویرایش دسته‌بندی

import { NextResponse } from "next/server";
import { db, categories } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

interface PatchBody {
  name?: string;
  shortName?: string;
  description?: string;
  count?: number;
  order?: number;
  isActive?: boolean;
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

    const { slug } = await ctx.params;
    const body = (await req.json()) as PatchBody;

    const found = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug as never))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "دسته‌بندی یافت نشد." },
        { status: 404 }
      );
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.shortName !== undefined)
      updates.shortName = body.shortName.trim();
    if (body.description !== undefined)
      updates.description = body.description.trim();
    if (body.count !== undefined) updates.count = body.count;
    if (body.order !== undefined) updates.order = body.order;
    if (body.isActive !== undefined) updates.isActive = body.isActive;

    await db
      .update(categories)
      .set(updates)
      .where(eq(categories.slug, slug as never));

    const updated = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug as never))
      .limit(1);

    const c = updated[0];
    return NextResponse.json(
      {
        ok: true,
        category: {
          ...c,
          createdAt: c.createdAt.toISOString(),
          updatedAt: c.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/categories PATCH] error:", e);
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "خطای سرور",
      },
      { status: 500 }
    );
  }
}
