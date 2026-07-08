"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [flashHref, setFlashHref] = useState<string | null>(null);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function flash(href: string) {
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    setFlashHref(href);
    flashTimeout.current = setTimeout(() => setFlashHref(null), 600);
  }

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="glass-dark flex w-full max-w-xl items-center justify-between gap-2 rounded-full px-4 py-2 sm:px-2">
        <Link href="/" className="px-3 py-1.5 text-sm font-semibold text-white">
          nawf.dev
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => flash(l.href)}
              className={cn(
                "nav-glow relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                flashHref === l.href && "nav-flash",
                pathname === l.href
                  ? "bg-neutral-800 font-semibold text-white"
                  : "text-neutral-500 hover:text-white"
              )}
            >
              {pathname === l.href && (
                <span className="absolute left-1/2 top-0.5 h-[2px] w-5 -translate-x-1/2 rounded-full bg-white/80" />
              )}
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => flash("/contact")}
            className={cn(
              "nav-glow press ml-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              flashHref === "/contact" && "nav-flash",
              pathname === "/contact"
                ? "bg-sky-400 text-white"
                : "bg-sky-500 text-white hover:bg-sky-400"
            )}
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-200 sm:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform",
                open && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-opacity",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-transform",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="glass-dark absolute top-16 flex w-[calc(100%-2rem)] max-w-xl flex-col gap-1 rounded-2xl p-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => {
                flash(l.href);
                setOpen(false);
              }}
              className={cn(
                "nav-glow relative rounded-2xl px-4 py-2.5 text-sm transition-colors",
                flashHref === l.href && "nav-flash",
                pathname === l.href
                  ? "bg-neutral-800 font-semibold text-white"
                  : "text-neutral-500 hover:text-white"
              )}
            >
              {pathname === l.href && (
                <span className="absolute left-1/2 top-0.5 h-[2px] w-5 -translate-x-1/2 rounded-full bg-white/80" />
              )}
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => {
              flash("/contact");
              setOpen(false);
            }}
            className={cn(
              "nav-glow rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white",
              flashHref === "/contact" && "nav-flash"
            )}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
