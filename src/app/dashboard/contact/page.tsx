import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { ContactForm } from "@/components/contact-form";

export const dynamic = "force-dynamic";

export default async function DashboardContactPage() {
  const [info] = await db.select().from(contactInfo).limit(1);
  const socialLinks = info?.socialLinks ? JSON.parse(info.socialLinks) : [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">Contact</h1>
      <ContactForm initial={{ email: info?.email ?? "", socialLinks }} />
    </div>
  );
}
