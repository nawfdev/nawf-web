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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-14">
      <Reveal>
        <header className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-wide text-neutral-500">
            01 / contact
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl">
            Let&apos;s build{" "}
            <span className="font-serif italic text-sky-400">something</span>.
          </h1>
          <p className="max-w-md text-neutral-400">
            Got a project, a role, or just a question? Drop a line — I read
            every message myself.
          </p>
        </header>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal delay={80}>
          <div className="flex h-full flex-col">
            <p className="pb-3 font-mono text-xs text-neutral-500">email</p>
            {info?.email ? (
              <div className="flex flex-1 flex-col justify-between gap-6 border-y border-white/10 py-6">
                <p className="truncate text-2xl font-medium tracking-tight text-neutral-100 sm:text-3xl">
                  {info.email}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${info.email}`}
                    className="press inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-400"
                  >
                    Send an email
                    <ArrowUpRight />
                  </a>
                  <CopyEmailButton email={info.email} />
                </div>
              </div>
            ) : (
              <div className="border-y border-white/10 py-10 text-neutral-400">
                Contact details are on their way.
              </div>
            )}
          </div>
        </Reveal>

        {links.length > 0 && (
          <Reveal delay={140}>
            <div className="flex flex-col">
              <p className="pb-3 font-mono text-xs text-neutral-500">
                elsewhere
              </p>
              <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                {links.map((link, i) => {
                  const slug = iconSlugFor(link.label);
                  return (
                    <Reveal key={link.url} delay={180 + i * 60}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 py-4 transition-transform duration-300 hover:translate-x-2"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5">
                          {slug ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://cdn.simpleicons.org/${slug}/e0f2fe`}
                              alt=""
                              width={16}
                              height={16}
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-mono text-xs text-sky-300">
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
    </div>
  );
}
