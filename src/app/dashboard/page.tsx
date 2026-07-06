import { db } from "@/db";
import { posts, projects } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const allPosts = await db.select().from(posts);
  const allProjects = await db.select().from(projects);
  const published = allPosts.filter((p) => p.published).length;

  const stats = [
    { label: "Posts", value: allPosts.length },
    { label: "Published", value: published },
    { label: "Drafts", value: allPosts.length - published },
    { label: "Projects", value: allProjects.length },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-white">Overview</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-800 p-5">
            <p className="text-sm text-neutral-400">{s.label}</p>
            <p className="mt-1 text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
