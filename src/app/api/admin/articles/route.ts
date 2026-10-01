// GET /api/admin/articles → لیست همه مقالات
// POST /api/admin/articles → ساخت مقاله جدید

import { NextResponse } from "next/server";
import { db, articles } from "@/lib/db";
import { desc } from "drizzle-orm";
import { authenticateAdmin } from "@/lib/api/server-auth";

export const dynamic = "force-dynamic";

interface ArticleBody {
  slug?: string;
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

export async function GET(req: Request) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    const rows = await db
      .select()
      .from(articles)
      .orderBy(desc(articles.createdAt));

    const items = rows.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      { ok: true, articles: items, count: items.length },
      { status: 200 }
    );
  } catch (e) {
    console.error("[admin/articles GET] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.ok || !auth.user) {
      return NextResponse.json(
        { ok: false, error: auth.error ?? "دسترسی غیرمجاز" },
        { status: auth.status ?? 401 }
      );
    }

    const body = (await req.json()) as ArticleBody;

    // اعتبارسنجی
    const errors: Record<string, string> = {};
    if (!body.title?.trim() || body.title.trim().length < 5)
      errors.title = "عنوان حداقل ۵ حرف باشد.";
    if (!body.slug?.trim()) errors.slug = "slug الزامی است.";
    if (!body.excerpt?.trim()) errors.excerpt = "خلاصه الزامی است.";
    if (!body.content?.trim()) errors.content = "متن مقاله الزامی است.";
    if (!body.category) errors.category = "دسته‌بندی الزامی است.";
    if (!body.author?.trim()) errors.author = "نویسنده الزامی است.";
    if (!body.date?.trim()) errors.date = "تاریخ الزامی است.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ناقص است.", errors },
        { status: 400 }
      );
    }

    const slug = body.slug!.trim().toLowerCase().replace(/\s+/g, "-");

    // چک یکتایی slug
    const { eq } = await import("drizzle-orm");
    const existing = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { ok: false, error: "این slug قبلاً استفاده شده." },
        { status: 409 }
      );
    }

    const inserted = await db
      .insert(articles)
      .values({
        slug,
        title: body.title!.trim(),
        excerpt: body.excerpt!.trim(),
        content: body.content!.trim(),
        category: body.category as "medical" | "lab" | "industrial" | "guide",
        author: body.author!.trim(),
        date: body.date!.trim(),
        readTime: Number(body.readTime) || 5,
        image: body.image?.trim() || null,
        featured: !!body.featured,
        isPublished: body.isPublished !== false,
      })
      .returning();

    const a = inserted[0];
    return NextResponse.json(
      {
        ok: true,
        article: {
          ...a,
          createdAt: a.createdAt.toISOString(),
          updatedAt: a.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("[admin/articles POST] error:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطای سرور" },
      { status: 500 }
    );
  }
}
