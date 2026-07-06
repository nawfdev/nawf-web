import { notFound } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);

  if (!post || !post.published) notFound();

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        {post.publishedAt && (
          <p className="text-sm text-neutral-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        )}
      </header>
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-blue-400">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
