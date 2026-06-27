
import { serverFetch } from "@/lib/core/server";
import UsersTable from "@/components/dashboard/admin/UsersTable";

export default async function ManageUsersPage() {
  const users = await serverFetch("/api/users");

  return (
    <div className="px-3 sm:px-4 md:px-0">
      <h1 className="mb-5 text-2xl font-bold text-white sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
        Manage Users
      </h1>

      <UsersTable users={users} />
    </div>
  );
}