import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (!post || !post.published) return {};

  const description = post.excerpt ?? post.content.slice(0, 160);
  const image = post.coverImage ?? `https://picsum.photos/seed/${post.slug}/1600/840`;

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      images: [{ url: image }],
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);

  if (!post || !post.published) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nawf.dev";
  const image = post.coverImage ?? `https://picsum.photos/seed/${post.slug}/1600/840`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.content.slice(0, 160),
    image,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : undefined,
    author: { "@type": "Person", name: "Nawfal", url: siteUrl },
  };

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex flex-col gap-4">
        <Link
          href="/blog"
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← All posts
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
          {post.publishedAt && (
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <span className="h-px w-6 bg-white/15" />
          <span>
            {Math.max(1, Math.round(post.content.split(/\s+/).length / 200))} min read
          </span>
        </div>
      </header>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage ?? `https://picsum.photos/seed/${post.slug}/1600/840`}
          alt={post.title}
          className="aspect-[1.9/1] w-full object-cover"
        />
      </div>
      <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-white prose-p:leading-relaxed prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-neutral-200 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-zinc-900/80 sm:prose-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
