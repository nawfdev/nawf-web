import Link from "next/link";
import { db } from "@/db";
import { aboutContent, projects, posts } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";

export const revalidate = 60;

const services = [
  {
    title: "Full-stack web platforms",
    description:
      "Booking engines, dashboards, and content-driven sites built with Next.js, React, and typed APIs end to end.",
  },
  {
    title: "POS and business systems",
    description:
      "Point-of-sale, finance, and accounting tools that handle real transactions daily, with Go and FastAPI backends.",
  },
  {
    title: "Automation and trading tools",
    description:
      "WhatsApp bots, homelab panels, and MetaTrader 5 Expert Advisors that work while you sleep.",
  },
];

const process = [
  {
    title: "Scope",
    description: "Understand the business problem before writing any code.",
  },
  {
    title: "Build",
    description: "Typed code, real data models, and honest progress updates.",
  },
  {
    title: "Ship",
    description: "Deploy to your infrastructure, from VPS to shared hosting.",
  },
  {
    title: "Support",
    description: "Bugs fixed, features added, systems kept running.",
  },
];

/* Simple Icons slugs for the tools marquee; null = text-only pill. */
const iconSlugs: Record<string, string | null> = {
  TypeScript: "typescript",
  "Next.js": "nextdotjs",
  React: "react",
  "Node.js": "nodedotjs",
  Go: "go",
  Python: "python",
  FastAPI: "fastapi",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  Docker: "docker",
  MQL5: null,
};

function ToolPill({ name }: { name: string }) {
  const slug = iconSlugs[name];
  return (
    <span className="glass mx-1.5 flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-neutral-200">
      {slug && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          width={18}
          height={18}
          loading="lazy"
        />
      )}
      {name}
    </span>
  );
}

export default async function HomePage() {
  const [about] = await db.select().from(aboutContent).limit(1);
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));
  const latestPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))
    .limit(3);

  const skills = about?.skills?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  const headline = about?.headline ?? "Software Engineer";
  const headlineWords = headline.split(" ");
  const headlineLast = headlineWords.pop();
  const headlineLead = headlineWords.join(" ");
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);
  const [firstProject, ...restProjects] = featuredProjects;
  const moreProjects = allProjects.filter((p) => !p.featured).slice(0, 5);

  /* Real language split across public repos on github.com/nawfdev. */
  const languages = [
    { name: "JavaScript", repos: 6, color: "#f1e05a" },
    { name: "TypeScript", repos: 3, color: "#3178c6" },
    { name: "Go", repos: 1, color: "#00ADD8" },
    { name: "Python", repos: 1, color: "#3572A5" },
    { name: "MQL5", repos: 1, color: "#94a3b8" },
  ];
  const totalRepos = languages.reduce((sum, l) => sum + l.repos, 0);

  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      {/* Statement hero: fills the first viewport, marquee anchored at its foot */}
      <section className="relative flex min-h-[calc(100dvh-8rem)] flex-col justify-center">
        <div className="hero-in">
          <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl">
            {headlineLead}{" "}
            <span className="text-sky-400">{headlineLast}</span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
              {about?.bio ??
                "Full-stack developer building web platforms, POS systems, and automation tools."}
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/projects"
                className="press inline-flex items-center rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-400"
              >
                View projects
              </Link>
              <a
                href="https://github.com/nawfdev"
                target="_blank"
                rel="noreferrer"
                className="press glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 16 16"
                  width={16}
                  height={16}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.62 7.62 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="relative -mx-6 mt-14 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <p className="sr-only">Tools I work with: {skills.join(", ")}</p>
            <div className="marquee" aria-hidden="true">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex" aria-hidden={copy === 1}>
                  {skills.map((skill) => (
                    <ToolPill key={`${copy}-${skill}`} name={skill} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Work: featured showcase + dense index, one section instead of two competing headers */}
      {(featuredProjects.length > 0 || moreProjects.length > 0) && (
        <section className="flex flex-col gap-8">
          {featuredProjects.length > 0 && (
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Selected work
              </h2>
              <Link
                href="/projects"
                className="text-sm text-sky-400 hover:text-sky-300"
              >
                All projects →
              </Link>
            </div>
          </Reveal>
          )}

          {firstProject && (
            <Reveal>
              <Link
                href={firstProject.url ?? firstProject.repoUrl ?? "/projects"}
                className="card-lift glass group grid overflow-hidden rounded-2xl hover:bg-white/10 lg:grid-cols-5"
              >
                {firstProject.image && (
                  <div className="relative overflow-hidden lg:col-span-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={firstProject.image}
                      alt={firstProject.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />
                  </div>
                )}
                <div className="flex flex-col justify-center gap-4 p-7 lg:col-span-2 lg:p-10">
                  <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-sky-400">
                    {firstProject.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
                    {firstProject.description}
                  </p>
                  {firstProject.tags && (
                    <div className="flex flex-wrap gap-2">
                      {firstProject.tags.split(",").map((tag) => (
                        <span
                          key={tag.trim()}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm text-sky-400">
                    Open project
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {restProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 130}>
                <Link
                  href={p.url ?? p.repoUrl ?? "/projects"}
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
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="text-lg font-medium text-white transition-colors group-hover:text-sky-400">
                      {p.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-neutral-400">
                      {p.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Project index: dense stack/link directory, nested under Work instead of a competing header */}
          {moreProjects.length > 0 && (
          <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
          <Reveal>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Also in the stack
            </h3>
          </Reveal>
          <Reveal delay={80}>
            <div className="-mx-6 overflow-x-auto px-6 pb-2 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
              <div className="flex snap-x snap-mandatory gap-4">
                {moreProjects.map((p) => {
                  const tags =
                    p.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];
                  const href = p.url ?? p.repoUrl;
                  return (
                    <div
                      key={p.id}
                      className="card-lift glass flex w-56 shrink-0 snap-start flex-col gap-3 rounded-2xl p-5"
                    >
                      <h3 className="font-medium text-white">{p.title}</h3>
                      {tags[0] && (
                        <span className="font-mono text-xs text-neutral-500">
                          {tags[0]}
                        </span>
                      )}
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300"
                        >
                          {p.url ? "Live" : "Code"}
                          <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
          </div>
          )}
        </section>
      )}

      {/* Services: large-type interactive rows */}
      <section className="flex flex-col">
        <Reveal>
          <h2 className="pb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What I do
          </h2>
        </Reveal>
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-8 transition-transform duration-300 hover:translate-x-2 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-xl font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-sky-400 group-open:text-sky-400 sm:text-2xl lg:text-3xl">
                    {s.title}
                  </h3>
                  <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-neutral-300 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="acc-content pb-8">
                  <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                    {s.description}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process: numbered timeline, vertical on mobile, horizontal on desktop */}
      <section className="flex flex-col gap-10">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How I work
          </h2>
        </Reveal>
        <div className="relative flex flex-col gap-8 sm:grid sm:grid-cols-4 sm:gap-6">
          <div className="absolute left-5 top-5 bottom-5 w-px bg-white/10 sm:left-[12.5%] sm:right-[12.5%] sm:top-5 sm:bottom-auto sm:h-px sm:w-auto" />
          {process.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="relative flex gap-4 sm:flex-col sm:gap-5">
                <span className="glass-accent relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm text-sky-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 sm:pt-1">
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GitHub activity: real contribution graph */}
      <section className="flex flex-col gap-8">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              GitHub activity
            </h2>
            <a
              href="https://github.com/nawfdev"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-sky-400 hover:text-sky-300"
            >
              @nawfdev →
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="glass overflow-x-auto rounded-2xl p-6 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/38bdf8/nawfdev"
              alt="GitHub contribution chart for nawfdev"
              width={663}
              height={104}
              className="h-auto w-full min-w-[640px] opacity-80 invert hue-rotate-180 brightness-110"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-semibold tracking-tight text-white">
                Written in
              </h3>
              <span className="shrink-0 font-mono text-xs text-neutral-500">
                {totalRepos} public repos
              </span>
            </div>
            <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full">
              {languages.map((l) => (
                <div
                  key={l.name}
                  style={{
                    width: `${(l.repos / totalRepos) * 100}%`,
                    backgroundColor: l.color,
                  }}
                  className="transition-all duration-500 hover:opacity-80"
                  title={`${l.name}: ${l.repos} repos`}
                />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {languages.map((l) => (
                <span
                  key={l.name}
                  className="flex items-center gap-2 text-sm text-neutral-300"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: l.color }}
                  />
                  {l.name}
                  <span className="font-mono text-xs text-neutral-500">
                    {Math.round((l.repos / totalRepos) * 100)}%
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="flex flex-col gap-2">
          <Reveal>
            <div className="flex items-baseline justify-between pb-4">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Latest posts
              </h2>
              <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300">
                View all →
              </Link>
            </div>
          </Reveal>
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
            {latestPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-1 py-5 transition-transform duration-300 hover:translate-x-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="min-w-0">
                    <h3 className="font-medium text-white transition-colors group-hover:text-sky-400">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-1 line-clamp-1 text-sm text-neutral-400">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  {post.publishedAt && (
                    <time className="shrink-0 font-mono text-xs text-neutral-500">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Big-type contact CTA */}
      <Reveal>
        <section className="glass-accent rounded-2xl p-8 sm:p-14">
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tighter text-white sm:text-5xl">
            Have a project in mind?
          </h2>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-neutral-400">
              I take on freelance and contract work. Tell me what you are building.
            </p>
            <Link
              href="/contact"
              className="press inline-flex w-fit shrink-0 items-center rounded-full bg-sky-500 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-sky-400"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
