import { NextResponse } from "next/server";
import { db } from "@/db";
import { aboutContent } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

import { z } from "zod";

const aboutSchema = z.object({
  headline: z.string().min(1),
  bio: z.string().min(1),
  avatarUrl: z.string().optional(),
  skills: z.any().optional(), // Depending on how skills are stored (JSON)
});

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const validatedData = aboutSchema.parse(body);
    const { headline, bio, avatarUrl, skills } = validatedData;

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
