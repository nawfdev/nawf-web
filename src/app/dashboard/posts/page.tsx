import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";

export const dynamic = "force-dynamic";

export default async function DashboardPostsPage() {
  const all = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Posts</h1>
        <Link href="/dashboard/posts/new">
          <Button>New post</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {all.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl border border-neutral-800 p-4"
          >
            <div>
              <p className="font-medium text-white">{post.title}</p>
              <p className="text-xs text-neutral-500">
                /{post.slug} · {post.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/posts/${post.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <DeleteButton endpoint={`/api/posts/${post.id}`} />
            </div>
          </div>
        ))}
        {all.length === 0 && <p className="text-neutral-500">No posts yet.</p>}
      </div>
    </div>
  );
}
