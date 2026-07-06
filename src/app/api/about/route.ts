import { NextResponse } from "next/server";
import { db } from "@/db";
import { aboutContent } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { headline, bio, avatarUrl, skills } = body;

  const [existing] = await db.select().from(aboutContent).limit(1);

  if (!existing) {
    const [{ id: insertId }] = await db
      .insert(aboutContent)
      .values({ headline, bio, avatarUrl, skills })
      .$returningId();
    const [created] = await db
      .select()
      .from(aboutContent)
      .where(eq(aboutContent.id, insertId))
      .limit(1);
    return NextResponse.json(created, { status: 201 });
  }

  await db
    .update(aboutContent)
    .set({ headline, bio, avatarUrl, skills, updatedAt: new Date() })
    .where(eq(aboutContent.id, existing.id));

  const [updated] = await db
    .select()
    .from(aboutContent)
    .where(eq(aboutContent.id, existing.id))
    .limit(1);

  return NextResponse.json(updated);
}
