import { db } from "@/db";
import { aboutContent } from "@/db/schema";
import { AboutForm } from "@/components/about-form";

export const dynamic = "force-dynamic";

export default async function DashboardAboutPage() {
  const [about] = await db.select().from(aboutContent).limit(1);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">About</h1>
      <AboutForm
        initial={{
          headline: about?.headline ?? "",
          bio: about?.bio ?? "",
          avatarUrl: about?.avatarUrl ?? "",
          skills: about?.skills ?? "",
        }}
      />
    </div>
  );
}
