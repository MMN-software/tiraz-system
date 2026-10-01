// PATCH /api/admin/articles/[id] → ویرایش مقاله
// DELETE /api/admin/articles/[id] → حذف مقاله

import { NextResponse } from "next/server";
import { db, articles } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface PatchBody {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: number;
  image?: string;
  featured?: boolean;
  isPublished?: boolean;
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
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json(
        { ok: false, error: "شناسه نامعتبر است." },
        { status: 400 }
      );
    }

    const body = (await req.json()) as PatchBody;

    const found = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "مقاله یافت نشد." },
        { status: 404 }
      );
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt.trim();
    if (body.content !== undefined) updates.content = body.content.trim();
    if (body.category !== undefined) updates.category = body.category;
    if (body.author !== undefined) updates.author = body.author.trim();
    if (body.date !== undefined) updates.date = body.date.trim();
    if (body.readTime !== undefined) updates.readTime = body.readTime;
    if (body.image !== undefined) updates.image = body.image || null;
    if (body.featured !== undefined) updates.featured = body.featured;
    if (body.isPublished !== undefined) updates.isPublished = body.isPublished;

    await db
      .update(articles)
      .set(updates)
      .where(eq(articles.id, articleId));

    const updated = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId))
      .limit(1);

    const a = updated[0];
    return NextResponse.json(
      {
        ok: true,
        article: {
          ...a,
          createdAt: a.createdAt.toISOString(),
          updatedAt: a.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/articles PATCH] error:", e);
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
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json(
        { ok: false, error: "شناسه نامعتبر است." },
        { status: 400 }
      );
    }

    const found = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId))
      .limit(1);

    if (found.length === 0) {
      return NextResponse.json(
        { ok: false, error: "مقاله یافت نشد." },
        { status: 404 }
      );
    }

    await db.delete(articles).where(eq(articles.id, articleId));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[admin/articles DELETE] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
