import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/auth";
import { asc } from "drizzle-orm";

export async function GET() {
  const all = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  return NextResponse.json(all);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, slug, description, image, url, repoUrl, tags, featured, sortOrder } = body;

  if (!title || !slug || !description) {
    return NextResponse.json({ error: "title, slug and description are required" }, { status: 400 });
  }

  const [created] = await db
    .insert(projects)
    .values({
      title,
      slug,
      description,
      image,
      url,
      repoUrl,
      tags,
      featured: !!featured,
      sortOrder: sortOrder ?? 0,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
