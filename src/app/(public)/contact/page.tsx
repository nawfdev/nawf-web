import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { CopyEmailButton } from "@/components/copy-email-button";

export const revalidate = 60;

/* Simple Icons slugs, matched loosely against the link label. */
const iconSlugs: Record<string, string> = {
  github: "github",
  linkedin: "linkedin",
  twitter: "x",
  x: "x",
  instagram: "instagram",
  youtube: "youtube",
  dribbble: "dribbble",
  behance: "behance",
  telegram: "telegram",
  whatsapp: "whatsapp",
  discord: "discord",
  medium: "medium",
  "dev.to": "devdotto",
  devto: "devdotto",
  tiktok: "tiktok",
  threads: "threads",
  gitlab: "gitlab",
};

function iconSlugFor(label: string) {
  const key = label.trim().toLowerCase();
  return iconSlugs[key] ?? null;
}

export default async function ContactPage() {
  const [info] = await db.select().from(contactInfo).limit(1);
  const links: { label: string; url: string }[] = info?.socialLinks
    ? JSON.parse(info.socialLinks)
    : [];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-14">
      <Reveal>
        <header className="flex flex-col items-start gap-3">
          <span className="glass-accent inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Open to new projects
          </span>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl">
            Let&apos;s build{" "}
            <span className="font-serif italic text-sky-400">something</span>.
          </h1>
          <p className="max-w-md text-neutral-400">
            Got a project, a role, or just a question? Drop a line below — I
            read every message myself.
          </p>
        </header>
      </Reveal>

      {info?.email ? (
        <Reveal delay={100}>
          <div className="hero-in overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-xs text-neutral-500">
                new-message.eml
              </span>
            </div>
            <div className="flex flex-col gap-6 p-8 sm:p-10">
              <div className="flex flex-col gap-1 font-mono text-sm">
                <div className="flex gap-3 text-neutral-500">
                  <span className="shrink-0">to</span>
                  <span className="text-neutral-200">{info.email}</span>
                </div>
                <div className="flex gap-3 text-neutral-500">
                  <span className="shrink-0">re</span>
                  <span className="text-neutral-200">
                    Let&apos;s work together
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${info.email}`}
                  className="press inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-400"
                >
                  Send an email
                  <ArrowUpRight />
                </a>
                <CopyEmailButton email={info.email} />
              </div>
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={100}>
          <div className="glass rounded-2xl p-10 text-center text-neutral-400">
            Contact details are on their way.
          </div>
        </Reveal>
      )}

      {links.length > 0 && (
        <Reveal delay={180}>
          <div className="flex flex-col gap-5">
            <h2 className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
              Elsewhere
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((link, i) => {
                const slug = iconSlugFor(link.label);
                return (
                  <Reveal key={link.url} delay={i * 80}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="card-lift glass group flex items-center gap-4 rounded-2xl p-5"
                    >
                      <span className="glass-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                        {slug ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://cdn.simpleicons.org/${slug}/e0f2fe`}
                            alt=""
                            width={18}
                            height={18}
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-mono text-sm text-sky-300">
                            {link.label.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-medium text-neutral-200 transition-colors group-hover:text-white">
                        {link.label}
                      </span>
                      <ArrowUpRight className="shrink-0 text-neutral-500 transition-colors group-hover:text-sky-400" />
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
