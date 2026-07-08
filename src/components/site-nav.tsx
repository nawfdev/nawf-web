"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="justify-self-start text-sm font-semibold text-white">
          nawf.dev
        </Link>

        {/* Desktop center pill */}
        <nav className="glass-dark hidden items-center gap-1 justify-self-center rounded-full px-2 py-1.5 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                pathname === l.href
                  ? "bg-sky-500/15 text-sky-300"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-5 justify-self-end sm:flex">
          <a
            href="https://github.com/nawfdev"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-300 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <Link
            href="/contact"
            className={cn(
              "press rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
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
          className="glass-dark flex h-9 w-9 items-center justify-center rounded-full justify-self-end text-neutral-200 sm:hidden"
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
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="glass-dark absolute right-4 top-16 flex w-[calc(100%-2rem)] max-w-xs flex-col gap-1 rounded-2xl p-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-2.5 text-sm transition-colors",
                pathname === l.href
                  ? "bg-sky-500/15 text-sky-300"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/nawfdev"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-4 py-2.5 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
