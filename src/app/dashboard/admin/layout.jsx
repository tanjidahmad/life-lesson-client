

import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import AdminLayoutShell from "@/components/dashboard/admin/AdminLayoutShell";

export default async function AdminLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayoutShell>
      {children}
    </AdminLayoutShell>
  );
}