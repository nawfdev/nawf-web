import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const published = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Blog</h1>
      <div className="flex flex-col gap-6">
        {published.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
          >
            <h2 className="font-medium text-white group-hover:text-blue-400">{post.title}</h2>
            {post.excerpt && <p className="mt-2 text-sm text-neutral-400">{post.excerpt}</p>}
            {post.publishedAt && (
              <p className="mt-3 text-xs text-neutral-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
        {published.length === 0 && <p className="text-neutral-500">No posts yet.</p>}
      </div>
    </div>
  );
}
