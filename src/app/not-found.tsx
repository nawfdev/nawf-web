import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-neutral-950 px-6">
      <div className="bg-dots pointer-events-none fixed inset-0" />
      <div className="glass-strong relative flex w-full max-w-md flex-col items-start gap-4 rounded-2xl p-8 sm:p-10">
        <p className="font-mono text-sm text-sky-400">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="text-sm leading-relaxed text-neutral-400">
          This page does not exist or has been moved.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/"
            className="press inline-flex items-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-400"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="press glass inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
