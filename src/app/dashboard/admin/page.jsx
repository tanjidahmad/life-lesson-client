

import AdminCharts from "@/components/dashboard/admin/AdminCharts";
import { getUserToken } from "@/lib/core/session";

export default async function AdminDashboard() {
  const token = await getUserToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stats`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const stats = await res.json();

  if (!res.ok) {
    throw new Error(
      stats?.message || "Failed to load admin stats"
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-0">
      <h1 className="mb-5 text-2xl font-bold text-white sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <div className="rounded-2xl bg-zinc-900 p-4 sm:p-5 md:p-6">
          <h3 className="text-sm text-zinc-400 sm:text-base">
            Total Users
          </h3>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {stats.totalUsers}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-4 sm:p-5 md:p-6">
          <h3 className="text-sm text-zinc-400 sm:text-base">
            Public Lessons
          </h3>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {stats.totalPublicLessons}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-4 sm:p-5 md:p-6">
          <h3 className="text-sm text-zinc-400 sm:text-base">
            Reported Lessons
          </h3>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {stats.totalReportedLessons}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-4 sm:p-5 md:p-6">
          <h3 className="text-sm text-zinc-400 sm:text-base">
            Today&apos;s Lessons
          </h3>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {stats.todaysLessons}
          </p>
        </div>
      </div>

      {/* Contributors */}
      <div className="mt-6 rounded-2xl bg-zinc-900 p-4 sm:mt-8 sm:p-5 md:mt-10 md:p-6">
        <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
          Most Active Contributors
        </h2>

        {stats.contributors?.length > 0 ? (
          <div className="space-y-3">
            {stats.contributors.map((user) => (
              <div
                key={user._id}
                className="flex flex-col gap-2 rounded-xl border border-zinc-800 p-3 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4 sm:text-base"
              >
                <span className="break-all text-zinc-200">
                  {user._id}
                </span>

                <span className="shrink-0 font-medium text-white">
                  {user.totalLessons}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400 sm:text-base">
            No contributors found.
          </p>
        )}
      </div>

      {/* Charts */}
      <div className="mt-6 sm:mt-8 md:mt-10">
        <AdminCharts
          lessonGrowth={stats.lessonGrowth}
          userGrowth={stats.userGrowth}
        />
      </div>
    </div>
  );
}