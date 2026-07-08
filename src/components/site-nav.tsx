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
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="nav-container flex w-full max-w-xl justify-between px-2 sm:px-1">
        <Link href="/" className="px-3 py-1.5 text-sm font-semibold text-white">
          nawf.dev
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("nav-item", pathname === l.href && "active")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "press ml-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
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
              onClick={() => setOpen(false)}
              className={cn(
                "nav-item block w-full text-left",
                pathname === l.href && "active"
              )}
            >
              {l.label}
            </Link>
          ))}
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
