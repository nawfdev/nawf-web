import { SiteNav } from "@/components/site-nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-white/10 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Nawfal. Built with Next.js.
      </footer>
    </>
  );
}
