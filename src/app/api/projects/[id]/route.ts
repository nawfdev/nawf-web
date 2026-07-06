import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, slug, description, image, url, repoUrl, tags, featured, sortOrder } = body;

  const [updated] = await db
    .update(projects)
    .set({
      title,
      slug,
      description,
      image,
      url,
      repoUrl,
      tags,
      featured: !!featured,
      sortOrder: sortOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, Number(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(projects).where(eq(projects.id, Number(id)));
  return NextResponse.json({ ok: true });
}
