
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  // ===== ADMIN ROUTE =====
  if (user?.role === "admin") {
    return children;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}