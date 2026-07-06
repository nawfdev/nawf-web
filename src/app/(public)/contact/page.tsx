import { db } from "@/db";
import { contactInfo } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [info] = await db.select().from(contactInfo).limit(1);
  const links: { label: string; url: string }[] = info?.socialLinks
    ? JSON.parse(info.socialLinks)
    : [];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Contact</h1>
      {info?.email && (
        <a
          href={`mailto:${info.email}`}
          className="text-lg text-blue-400 hover:text-blue-300"
        >
          {info.email}
        </a>
      )}
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-600 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
