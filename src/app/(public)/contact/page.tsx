import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { Reveal } from "@/components/reveal";

export const revalidate = 60;

export default async function ContactPage() {
  const [info] = await db.select().from(contactInfo).limit(1);
  const links: { label: string; url: string }[] = info?.socialLinks
    ? JSON.parse(info.socialLinks)
    : [];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
      <Reveal>
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-neutral-400">
            Open to interesting projects and conversations.
          </p>
        </header>
      </Reveal>

      <Reveal delay={100}>
        <div className="glass flex flex-col gap-8 rounded-2xl p-6 sm:p-10">
        {info?.email && (
          <div>
            <p className="text-sm text-neutral-400">Email</p>
            <a
              href={`mailto:${info.email}`}
              className="mt-1 inline-block text-xl font-medium text-sky-400 transition-colors hover:text-sky-300 sm:text-2xl"
            >
              {info.email}
            </a>
          </div>
        )}

        {links.length > 0 && (
          <div>
            <p className="text-sm text-neutral-400">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="press rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                  {" ↗︎"}
                </a>
              ))}
            </div>
          </div>
        )}

          {!info?.email && links.length === 0 && (
            <p className="text-center text-neutral-400">
              Contact details are on their way.
            </p>
          )}
        </div>
      </Reveal>
    </div>
  );
}
