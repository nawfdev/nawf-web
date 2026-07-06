import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  const all = await db.select().from(posts).orderBy(desc(posts.createdAt));
  if (session?.user) return NextResponse.json(all);
  return NextResponse.json(all.filter((p) => p.published));
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, slug, excerpt, content, coverImage, published } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug and content are required" }, { status: 400 });
  }

  const [created] = await db
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
    .returning();

  return NextResponse.json(created, { status: 201 });
}
