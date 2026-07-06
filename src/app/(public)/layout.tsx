import { SiteNav } from "@/components/site-nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Nawfal. Built with Next.js.
      </footer>
    </>
  );
}
