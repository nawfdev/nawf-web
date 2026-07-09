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

const sections = [
  { id: "email", label: "Email" },
  { id: "elsewhere", label: "Elsewhere" },
  { id: "faq", label: "FAQ" },
];

export default async function ContactPage() {
  const [info] = await db.select().from(contactInfo).limit(1);
  const links: { label: string; url: string }[] = info?.socialLinks
    ? JSON.parse(info.socialLinks)
    : [];

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[200px_1fr] lg:gap-20">
      <Reveal>
        <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="font-mono text-xs text-neutral-500">01</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Contact
            </h1>
            <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-neutral-400">
              No forms, no chatbot. Whatever you send goes straight to my
              inbox.
            </p>
          </div>
          <nav className="flex flex-row gap-4 border-t border-white/10 pt-5 text-sm lg:flex-col lg:gap-2.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-neutral-500 transition-colors hover:text-sky-400"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>
      </Reveal>

      <div className="flex flex-col gap-14">
        <section id="email" className="scroll-mt-28">
          <Reveal delay={60}>
            <p className="pb-3 font-mono text-xs text-neutral-500">email</p>
            {info?.email ? (
              <div className="flex flex-col justify-between gap-6 border-y border-white/10 py-6 sm:flex-row sm:items-center">
                <p className="truncate text-2xl font-medium tracking-tight text-neutral-100 sm:text-3xl">
                  {info.email}
                </p>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
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
          </Reveal>
        </section>

        {links.length > 0 && (
          <section id="elsewhere" className="scroll-mt-28">
            <Reveal delay={100}>
              <p className="pb-3 font-mono text-xs text-neutral-500">
                elsewhere
              </p>
            </Reveal>
            <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {links.map((link, i) => {
                const slug = iconSlugFor(link.label);
                return (
                  <Reveal key={link.url} delay={120 + i * 60}>
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
          </section>
        )}

        <section id="faq" className="scroll-mt-28">
          <Reveal>
            <p className="pb-3 font-mono text-xs text-neutral-500">faq</p>
          </Reveal>
          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-transform duration-300 hover:translate-x-2 [&::-webkit-details-marker]:hidden">
                    <h2 className="text-lg font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-sky-400 group-open:text-sky-400 sm:text-xl">
                      {item.q}
                    </h2>
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
    </div>
  );
}
