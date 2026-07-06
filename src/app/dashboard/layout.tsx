import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      <DashboardNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
