"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable; the mailto link next to this button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "press glass inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors",
        copied
          ? "text-sky-300"
          : "text-neutral-300 hover:bg-white/10 hover:text-white"
      )}
    >
      {copied ? (
        <>
          <svg
            viewBox="0 0 16 16"
            width={14}
            height={14}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 16 16"
            width={14}
            height={14}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M2.5 10.5v-7A1 1 0 0 1 3.5 2.5h7" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
