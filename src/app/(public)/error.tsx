"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="glass-strong flex w-full max-w-md flex-col items-start gap-4 rounded-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Something went wrong
        </h2>
        <p className="text-sm leading-relaxed text-neutral-400">
          This page failed to load. Try again, or come back later.
        </p>
        <button
          onClick={() => reset()}
          className="press mt-2 rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-400"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
