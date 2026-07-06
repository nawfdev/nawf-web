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
    <aside className="w-56 shrink-0 border-r border-neutral-800 p-4 flex flex-col justify-between min-h-screen">
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
                "rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === l.href
                  ? "bg-blue-600 text-white"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-lg px-3 py-2 text-left text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white"
      >
        Sign out
      </button>
    </aside>
  );
}
