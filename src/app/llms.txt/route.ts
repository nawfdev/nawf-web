import { db } from "@/db";
import { aboutContent, projects, posts } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nawf.dev";

export async function GET() {
  const [about] = await db.select().from(aboutContent).limit(1);
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));
  const publishedPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));

  const lines = [
    `# nawf.dev`,
    ``,
    `> ${about?.bio ?? "Full-stack developer building web platforms, POS systems, and automation tools."}`,
    ``,
    `## Pages`,
    ``,
    `- [Home](${siteUrl}/): profile, skills, and featured work`,
    `- [Projects](${siteUrl}/projects): full project list`,
    `- [Blog](${siteUrl}/blog): technical writing`,
    `- [Contact](${siteUrl}/contact): email and social links`,
    ``,
  ];

  if (allProjects.length > 0) {
    lines.push(`## Projects`, ``);
    for (const p of allProjects) {
      const link = p.url ?? p.repoUrl;
      lines.push(`- ${p.title}${link ? ` (${link})` : ""}: ${p.description}`);
    }
    lines.push(``);
  }

  if (publishedPosts.length > 0) {
    lines.push(`## Blog posts`, ``);
    for (const post of publishedPosts) {
      lines.push(
        `- [${post.title}](${siteUrl}/blog/${post.slug})${post.excerpt ? `: ${post.excerpt}` : ""}`
      );
    }
    lines.push(``);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
