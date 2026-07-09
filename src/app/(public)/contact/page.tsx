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

const faq = [
  {
    q: "What should I include?",
    a: "A short brief of what you're building, a rough timeline, and a budget range if you have one. A loose idea is fine too — we can shape the scope together.",
  },
  {
    q: "How fast do you reply?",
    a: "I read every message myself and reply within a couple of days, sometimes sooner. No support ticket queue, no auto-responder.",
  },
  {
    q: "Do you work on fixed rate or hourly?",
    a: "Either, depending on how well-defined the project is. Fixed rate for scoped work, hourly for ongoing or exploratory work.",
  },
  {
    q: "Can we sign an NDA first?",
    a: "Yes. Happy to sign one before we get into specifics if the project needs it.",
  },
];

export default async function ContactPage() {
  const [info] = await db.select().from(contactInfo).limit(1);
  const links: { label: string; url: string }[] = info?.socialLinks
    ? JSON.parse(info.socialLinks)
    : [];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-16">
      <Reveal>
        <header className="bg-dots -mx-6 flex flex-col gap-4 rounded-2xl px-6 py-10 sm:py-14">
          <span className="font-mono text-xs tracking-wide text-neutral-500">
            01 / contact
          </span>
          <h1 className="max-w-2xl text-5xl font-bold leading-[1.02] tracking-tighter text-white sm:text-7xl">
            No forms, no{" "}
            <span className="font-serif italic text-sky-400">chatbot</span>.
          </h1>
          <p className="max-w-md text-neutral-400">
            Whatever you send goes straight to my inbox. Email, or pick a
            link below.
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

      <section className="flex flex-col">
        <Reveal>
          <p className="pb-3 font-mono text-xs text-neutral-500">
            02 / before you reach out
          </p>
        </Reveal>
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-transform duration-300 hover:translate-x-2 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-sky-400 group-open:text-sky-400 sm:text-xl">
                    {item.q}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg text-neutral-300 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="acc-content pb-6">
                  <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                    {item.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
