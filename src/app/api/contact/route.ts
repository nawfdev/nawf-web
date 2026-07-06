import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { email, socialLinks } = body;

  const [existing] = await db.select().from(contactInfo).limit(1);

  if (!existing) {
    const [created] = await db
      .insert(contactInfo)
      .values({ email, socialLinks })
      .returning();
    return NextResponse.json(created, { status: 201 });
  }

  const [updated] = await db
    .update(contactInfo)
    .set({ email, socialLinks, updatedAt: new Date() })
    .where(eq(contactInfo.id, existing.id))
    .returning();

  return NextResponse.json(updated);
}
