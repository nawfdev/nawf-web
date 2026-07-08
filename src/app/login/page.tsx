import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-neutral-950 px-6">
      <div className="bg-dots pointer-events-none fixed inset-0" />
      <div className="glass-strong relative w-full max-w-sm rounded-2xl p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-400">Dashboard access only.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-neutral-400 hover:text-sky-400 transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
