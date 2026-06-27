
"use client";

import { useRouter } from "next/navigation";

export default function UsersTable({ users }) {
  const router = useRouter();

  const handleMakeAdmin = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/admin/${id}`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-left">
              <th className="p-3 text-sm font-semibold text-white sm:p-4">
                Name
              </th>

              <th className="p-3 text-sm font-semibold text-white sm:p-4">
                Email
              </th>

              <th className="p-3 text-sm font-semibold text-white sm:p-4">
                Role
              </th>

              <th className="p-3 text-sm font-semibold text-white sm:p-4">
                Plan
              </th>

              <th className="p-3 text-sm font-semibold text-white sm:p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-zinc-800 last:border-b-0"
                >
                  <td className="p-3 text-sm text-zinc-300 sm:p-4">
                    <div className="max-w-[180px] break-words sm:max-w-[220px] md:max-w-[260px]">
                      {user.name}
                    </div>
                  </td>

                  <td className="p-3 text-sm text-zinc-300 sm:p-4">
                    <div className="max-w-[220px] break-all sm:max-w-[260px] md:max-w-[320px]">
                      {user.email}
                    </div>
                  </td>

                  <td className="p-3 sm:p-4">
                    <span className="rounded-full bg-violet-600 px-3 py-1 text-xs text-white sm:text-sm">
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="p-3 sm:p-4">
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs text-black sm:text-sm">
                      {user.plan || "free"}
                    </span>
                  </td>

                  <td className="p-3 sm:p-4">
                    {(user.role || "user") !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-sm text-white transition hover:bg-green-700 sm:px-4"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-sm text-zinc-400 sm:p-8"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}