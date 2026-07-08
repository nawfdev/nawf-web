import Link from "next/link";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const all = await db.select().from(projects).orderBy(asc(projects.sortOrder));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <Link href="/dashboard/projects/new">
          <Button>New project</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {all.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-neutral-800 p-4"
          >
            <div>
              <p className="font-medium text-white">
                {p.title} {p.featured && <span className="text-xs text-sky-400">★ featured</span>}
              </p>
              <p className="text-xs text-neutral-500">/{p.slug}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/projects/${p.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <DeleteButton endpoint={`/api/projects/${p.id}`} />
            </div>
          </div>
        ))}
        {all.length === 0 && <p className="text-neutral-500">No projects yet.</p>}
      </div>
    </div>
  );
}
