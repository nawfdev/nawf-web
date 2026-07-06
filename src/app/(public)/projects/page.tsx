import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const all = await db.select().from(projects).orderBy(asc(projects.sortOrder));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {all.map((p) => {
          const tags = p.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];
          return (
            <a
              key={p.id}
              href={p.url ?? p.repoUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-3 rounded-xl border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
            >
              <h2 className="font-medium text-white group-hover:text-blue-400">{p.title}</h2>
              <p className="text-sm text-neutral-400">{p.description}</p>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          );
        })}
      </div>
      {all.length === 0 && <p className="text-neutral-500">No projects yet.</p>}
    </div>
  );
}
