import "dotenv/config";
import { hash } from "bcryptjs";
import { db } from "../src/db";
import { adminUsers, aboutContent, contactInfo } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.");
  }

  const [existing] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);

  if (existing) {
    console.log(`Admin user ${email} already exists, skipping.`);
  } else {
    const passwordHash = await hash(password, 12);
    await db.insert(adminUsers).values({ email, passwordHash, name: "Admin" });
    console.log(`Created admin user ${email}`);
  }

  const [about] = await db.select().from(aboutContent).limit(1);
  if (!about) {
    await db.insert(aboutContent).values({
      headline: "Software Engineer",
      bio: "Write something about yourself here. Edit this from the dashboard.",
      skills: "TypeScript, Next.js, Node.js",
    });
    console.log("Seeded default about content.");
  }

  const [contact] = await db.select().from(contactInfo).limit(1);
  if (!contact) {
    await db.insert(contactInfo).values({
      email,
      socialLinks: JSON.stringify([{ label: "GitHub", url: "https://github.com/nawfdev" }]),
    });
    console.log("Seeded default contact info.");
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
