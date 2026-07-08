import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100dvh] bg-neutral-950">
      <div className="bg-dots pointer-events-none fixed inset-0" />
      <DashboardNav />
      <main className="relative flex-1 p-8">{children}</main>
    </div>
  );
}
