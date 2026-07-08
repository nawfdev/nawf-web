import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email().optional(),
  socialLinks: z.any().optional(), // Depending on how it's stored
});

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    const { email, socialLinks } = validatedData;

    const [existing] = await db.select().from(contactInfo).limit(1);

    if (!existing) {
      const [{ id: insertId }] = await db
        .insert(contactInfo)
        .values({ email, socialLinks })
        .$returningId();
      const [created] = await db
        .select()
        .from(contactInfo)
        .where(eq(contactInfo.id, insertId))
        .limit(1);
      return NextResponse.json(created, { status: 201 });
    }

    await db
      .update(contactInfo)
      .set({ email, socialLinks, updatedAt: new Date() })
      .where(eq(contactInfo.id, existing.id));

    const [updated] = await db
      .select()
      .from(contactInfo)
      .where(eq(contactInfo.id, existing.id))
      .limit(1);

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
