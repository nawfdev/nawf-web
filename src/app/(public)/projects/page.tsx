import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";

export const revalidate = 60;

export default async function ProjectsPage() {
  const all = await db.select().from(projects).orderBy(asc(projects.sortOrder));

  return (
    <div className="flex flex-col gap-10 min-h-[calc(100dvh-16rem)]">
      <Reveal>
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-neutral-400">
            Things I have built, shipped, and maintained.
          </p>
        </header>
      </Reveal>

      {all.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {all.map((p, i) => {
            const tags = p.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];
            const href = p.url ?? p.repoUrl;
            const Wrapper = href ? "a" : "div";
            return (
              <Reveal key={p.id} delay={(i % 2) * 120}>
                <Wrapper
                  {...(href
                    ? { href, target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="card-lift glass group flex h-full flex-col overflow-hidden rounded-2xl hover:bg-white/10"
                >
                  {p.image && (
                    <div className="relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="aspect-[2/1] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-lg font-medium text-white transition-colors group-hover:text-sky-400">
                        {p.title}
                      </h2>
                      {href && (
                        <span className="text-neutral-500 transition-colors group-hover:text-sky-400">
                          <ArrowUpRight />
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {p.description}
                    </p>
                    {tags.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="glass flex flex-col items-center gap-2 rounded-2xl px-6 py-16 text-center">
          <p className="font-medium text-white">Nothing here yet</p>
          <p className="text-sm text-neutral-400">
            Projects will show up here once they are published.
          </p>
        </div>
      )}
    </div>
  );
}
