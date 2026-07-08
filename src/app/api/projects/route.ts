import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/auth";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  const all = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  return NextResponse.json(all);
}

import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  url: z.string().optional(),
  repoUrl: z.string().optional(),
  tags: z.string().optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const validatedData = projectSchema.parse(body);
    const { title, slug, description, image, url, repoUrl, tags, featured, sortOrder } = validatedData;

    const [{ id: insertId }] = await db
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
      .$returningId();

    const [created] = await db.select().from(projects).where(eq(projects.id, insertId)).limit(1);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
