"use client";

import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        My Profile
      </h1>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <img
            src={
              user?.image ||
              "https://ui-avatars.com/api/?name=User"
            }
            alt={user?.name}
            className="h-28 w-28 rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="mb-2 text-3xl font-bold text-white">
              {user?.name}
            </h2>

            <p className="mb-4 text-zinc-400">
              {user?.email}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white">
                Role: {user?.role}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium text-white ${
                  user?.plan === "premium"
                    ? "bg-amber-500"
                    : "bg-emerald-600"
                }`}
              >
                Plan: {user?.plan}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}