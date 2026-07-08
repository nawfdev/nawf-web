import "dotenv/config";
import { hash } from "bcryptjs";
import { db } from "../src/db";
import { adminUsers, aboutContent, contactInfo, projects } from "../src/db/schema";
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
      headline: "Building software that runs real businesses.",
      bio: "I'm Nawfal, a full-stack developer from Indonesia. I design and ship web platforms, point-of-sale systems, finance tools, and automation bots, from database schema to production deploy.",
      skills:
        "TypeScript, Next.js, React, Node.js, Go, Python, FastAPI, MySQL, PostgreSQL, Docker, MQL5",
    });
    console.log("Seeded about content.");
  }

  const existingProjects = await db.select().from(projects).limit(1);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "Onyx Residence",
        slug: "onyx-residence",
        description:
          "Online booking engine and kost management system with IoT room monitoring. Handles reservations, billing, and live sensor data per room.",
        repoUrl: "https://github.com/nawfdev/onyx-residence",
        tags: "JavaScript, IoT, Booking",
        featured: true,
        sortOrder: 1,
      },
      {
        title: "Kasir Kyuzu",
        slug: "kasir-kyuzu",
        description:
          "Point-of-sale system for food retail stores. React + Vite frontend with a FastAPI backend, built for fast daily cashier flow.",
        repoUrl: "https://github.com/nawfdev/kasirKyuzu",
        tags: "React, FastAPI, POS",
        featured: true,
        sortOrder: 2,
      },
      {
        title: "Tabungan Bot",
        slug: "tabungan-bot",
        description:
          "WhatsApp financial assistant bot for tracking savings and expenses, paired with an admin web dashboard.",
        repoUrl: "https://github.com/nawfdev/tabungan-bot",
        tags: "Node.js, WhatsApp API, Automation",
        featured: true,
        sortOrder: 3,
      },
      {
        title: "NC Finance",
        slug: "nc-finance",
        description:
          "Finance and accounting web application for recording transactions, budgets, and reports.",
        repoUrl: "https://github.com/nawfdev/nc-finance",
        tags: "TypeScript, Accounting",
        sortOrder: 4,
      },
      {
        title: "Open Kasir",
        slug: "open-kasir",
        description:
          "Modern POS system for retail and food stores. React + Vite frontend backed by a Go API.",
        repoUrl: "https://github.com/nawfdev/open_kasir",
        tags: "React, Go, POS",
        sortOrder: 5,
      },
      {
        title: "Home Panel",
        slug: "home-panel",
        description:
          "Homelab management dashboard for monitoring and controlling self-hosted services.",
        repoUrl: "https://github.com/nawfdev/home_panel",
        tags: "JavaScript, Homelab",
        sortOrder: 6,
      },
      {
        title: "CF Panel",
        slug: "cf-panel",
        description:
          "Control panel for managing a home server exposed through Cloudflare Tunnel.",
        repoUrl: "https://github.com/nawfdev/cf_panel",
        tags: "JavaScript, Cloudflare",
        sortOrder: 7,
      },
      {
        title: "MQ5 Skills",
        slug: "mq5-skills",
        description:
          "AI skill for building production-ready MetaTrader 5 Expert Advisors in MQL5, covering risk engines and prop-firm safety rules.",
        repoUrl: "https://github.com/nawfdev/mq5_skills",
        tags: "MQL5, Python, Trading",
        sortOrder: 8,
      },
    ]);
    console.log("Seeded 8 projects from GitHub.");
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
