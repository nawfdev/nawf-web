import Link from "next/link";
import { db } from "@/db";
import { aboutContent, projects, posts } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [about] = await db.select().from(aboutContent).limit(1);
  const featuredProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(asc(projects.sortOrder))
    .limit(3);
  const latestPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))
    .limit(3);

  const skills = about?.skills?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {about?.headline ?? "Software Engineer"}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-neutral-400">{about?.bio}</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </section>

      {featuredProjects.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Featured projects</h2>
            <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300">
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                href={p.url ?? p.repoUrl ?? "/projects"}
                className="group rounded-xl border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
              >
                <h3 className="font-medium text-white group-hover:text-blue-400">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-neutral-400">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Latest posts</h2>
            <Link href="/blog" className="text-sm text-blue-400 hover:text-blue-300">
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
              >
                <h3 className="font-medium text-white group-hover:text-blue-400">{post.title}</h3>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-400">{post.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
