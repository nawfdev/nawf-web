import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div className="bg-dots pointer-events-none fixed inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent_0,black_160px)]" />
      <SiteNav />
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        {children}
      </main>
      <footer className="mt-12 border-t border-white/10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-white">nawf.dev</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
              Full-stack developer building web platforms, POS systems, and
              automation tools.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Pages</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-400">
              <Link href="/projects" className="w-fit transition-colors hover:text-white">
                Projects
              </Link>
              <Link href="/blog" className="w-fit transition-colors hover:text-white">
                Blog
              </Link>
              <Link href="/contact" className="w-fit transition-colors hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Elsewhere</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-400">
              <a
                href="https://github.com/nawfdev"
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-colors hover:text-white"
              >
                {"GitHub ↗︎"}
              </a>
              <a
                href="mailto:ngnawfal808@gmail.com"
                className="w-fit transition-colors hover:text-white"
              >
                ngnawfal808@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Nawfal
            </p>
            <p className="text-xs text-neutral-500">Built with Next.js</p>
          </div>
        </div>
      </footer>
    </>
  );
}
