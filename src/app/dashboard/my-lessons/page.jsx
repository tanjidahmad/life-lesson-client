
"use client";

import { useEffect, useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MyLessonsPage() {
  const { data: session } = useSession();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadLessons = async () => {
      if (!session?.user?.email) return;

      try {
        const { data: tokenData } =
          await authClient.token();

        const res = await fetch(
          `${baseUrl}/api/my-lessons/${session.user.email}`,
          {
            method: "GET",
            headers: {
              "content-type":
                "application/json",
              authorization: `Bearer ${tokenData?.token}`,
            },
            cache: "no-store",
          }
        );

        const data = await res.json();

        setLessons(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to load lessons"
        );
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [session, baseUrl]);

  const handleDelete = async (id) => {
  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${baseUrl}/api/lessons/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.message || "Failed to delete lesson"
      );
    }

    setLessons((prev) =>
      prev.filter((lesson) => lesson._id !== id)
    );

    toast.success("Lesson deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete lesson");
  }
};

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        My Lessons
      </h1>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-4 text-left text-white">
                Title
              </th>
              <th className="p-4 text-left text-white">
                Category
              </th>
              <th className="p-4 text-left text-white">
                Visibility
              </th>
              <th className="p-4 text-left text-white">
                Access
              </th>
              <th className="p-4 text-left text-white">
                Favorites
              </th>
              <th className="p-4 text-left text-white">
                Date
              </th>
              <th className="p-4 text-left text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr
                key={lesson._id}
                className="border-b border-zinc-800"
              >
                <td className="p-4 text-zinc-300">
                  {lesson.title}
                </td>

                <td className="p-4 text-zinc-300">
                  {lesson.category}
                </td>

                <td className="p-4 text-zinc-300">
                  {lesson.visibility}
                </td>

                <td className="p-4 text-zinc-300">
                  {lesson.accessLevel}
                </td>

                <td className="p-4 text-zinc-300">
                  {lesson.favoritesCount || 0}
                </td>

                <td className="p-4 text-zinc-300">
                  {lesson.createdAt
                    ? new Date(
                        lesson.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/my-lessons/${lesson._id}`}
                      className="rounded-lg bg-blue-600 px-3 py-1 text-white"
                    >
                      Details
                    </Link>

                    <Link
                      href={`/dashboard/update-lesson/${lesson._id}`}
                      className="rounded-lg bg-green-600 px-3 py-1 text-white"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          lesson._id
                        )
                      }
                      className="rounded-lg bg-red-600 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {lessons.length === 0 && (
          <div className="p-6 text-zinc-400">
            No lessons found
          </div>
        )}
      </div>
    </div>
  );
}