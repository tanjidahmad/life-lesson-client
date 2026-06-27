// import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";

// export default function AdminLayout({
//   children,
// }) {
//   return (
//     <div className="flex min-h-screen bg-zinc-950">
//       <AdminSidebar />

//       <main className="flex-1 p-6">
//         {children}
//       </main>
//     </div>
//   );
// }

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