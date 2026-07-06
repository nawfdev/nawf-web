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
    const [created] = await db
      .insert(aboutContent)
      .values({ headline, bio, avatarUrl, skills })
      .returning();
    return NextResponse.json(created, { status: 201 });
  }

  const [updated] = await db
    .update(aboutContent)
    .set({ headline, bio, avatarUrl, skills, updatedAt: new Date() })
    .where(eq(aboutContent.id, existing.id))
    .returning();

  return NextResponse.json(updated);
}
