import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-white">Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}
