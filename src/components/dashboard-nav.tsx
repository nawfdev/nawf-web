"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/about", label: "About" },
  { href: "/dashboard/contact", label: "Contact" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="glass sticky top-0 flex min-h-[100dvh] w-56 shrink-0 flex-col justify-between border-y-0 border-l-0 p-4">
      <div>
        <Link href="/" className="block px-2 pb-6 font-semibold text-white">
          nawf.dev
        </Link>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition-colors",
                pathname === l.href
                  ? "bg-white/15 text-white"
                  : "text-neutral-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="press rounded-full px-3.5 py-2 text-left text-sm text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        Sign out
      </button>
    </aside>
  );
}
