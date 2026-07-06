import Link from "next/link";
import { db } from "@/db";
import { aboutContent, projects, posts } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { HeroSequence } from "@/components/hero-sequence";

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
      <section className="-mx-6 -mt-12 sm:-mx-6">
        <HeroSequence basePath="/hero/frame" frameCount={60}>
          <div className="glass-strong w-full max-w-xl rounded-3xl p-6 sm:p-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {about?.headline ?? "Software Engineer"}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-200 sm:text-lg">
              {about?.bio}
            </p>
            {skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </HeroSequence>
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
                className="glass group rounded-2xl p-5 transition-colors hover:bg-white/10"
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
                className="glass group rounded-2xl p-5 transition-colors hover:bg-white/10"
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
