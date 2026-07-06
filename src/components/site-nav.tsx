"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="glass flex w-full max-w-xl items-center justify-between gap-2 rounded-full px-4 py-2 shadow-lg shadow-black/20 sm:px-2">
        <Link href="/" className="px-3 py-1.5 text-sm font-semibold text-white">
          nawf.dev
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                pathname === l.href
                  ? "bg-white/15 text-white"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
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
        <div className="glass absolute top-16 flex w-[calc(100%-2rem)] max-w-xl flex-col gap-1 rounded-3xl p-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-2.5 text-sm transition-colors",
                pathname === l.href
                  ? "bg-white/15 text-white"
                  : "text-neutral-300 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
