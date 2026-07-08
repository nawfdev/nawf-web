import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Reveal } from "@/components/reveal";

export const revalidate = 60;

function readingTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function coverSrc(post: { coverImage: string | null; slug: string }) {
  return post.coverImage ?? `https://picsum.photos/seed/${post.slug}/1200/630`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const published = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));

  const [featured, ...rest] = published;

  return (
    <div className="flex flex-col gap-12">
      <Reveal>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 text-neutral-400">
            Notes on software, tools, and things I learn along the way.
          </p>
        </header>
      </Reveal>

      {featured ? (
        <div className="flex flex-col gap-10">
          {/* Featured story: wide split card */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="card-lift glass group grid overflow-hidden rounded-2xl hover:bg-white/10 lg:grid-cols-5"
            >
              <div className="overflow-hidden lg:col-span-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverSrc(featured)}
                  alt={featured.title}
                  className="aspect-[1.9/1] h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-7 lg:col-span-2 lg:p-10">
                <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                  {featured.publishedAt && (
                    <time>{formatDate(new Date(featured.publishedAt))}</time>
                  )}
                  <span className="h-px w-6 bg-white/15" />
                  <span>{readingTime(featured.content)} min read</span>
                </div>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-sky-400 lg:text-3xl">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
                    {featured.excerpt}
                  </p>
                )}
                <span className="text-sm text-sky-400">Read article →</span>
              </div>
            </Link>
          </Reveal>

          {/* Older stories: card grid */}
          {rest.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 100}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-lift glass group flex h-full flex-col overflow-hidden rounded-2xl hover:bg-white/10"
                  >
                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverSrc(post)}
                        alt={post.title}
                        className="aspect-[1.9/1] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                        {post.publishedAt && (
                          <time>{formatDate(new Date(post.publishedAt))}</time>
                        )}
                        <span className="h-px w-6 bg-white/15" />
                        <span>{readingTime(post.content)} min read</span>
                      </div>
                      <h2 className="font-semibold leading-snug text-white transition-colors group-hover:text-sky-400">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="line-clamp-2 text-sm text-neutral-400">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="glass flex flex-col items-center gap-2 rounded-2xl px-6 py-16 text-center">
          <p className="font-medium text-white">No posts yet</p>
          <p className="text-sm text-neutral-400">
            Published posts will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
