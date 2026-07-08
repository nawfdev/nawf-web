import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/auth";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  const all = await db.select().from(posts).orderBy(desc(posts.createdAt));
  if (session?.user) return NextResponse.json(all);
  return NextResponse.json(all.filter((p) => p.published));
}

import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const validatedData = postSchema.parse(body);
    const { title, slug, excerpt, content, coverImage, published } = validatedData;

    const [{ id: insertId }] = await db
      .insert(posts)
      .values({
        title,
        slug,
        excerpt,
        content,
        coverImage,
        published: !!published,
        publishedAt: published ? new Date() : null,
      })
      .$returningId();

    const [created] = await db.select().from(posts).where(eq(posts.id, insertId)).limit(1);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
