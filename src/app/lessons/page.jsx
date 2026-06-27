

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function LessonsPage() {
  const { data: session } = useSession();

  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const lessonsPerPage = 6;

  const userPlan = session?.user?.plan || "free";
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const loadLessons = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons?limit=1000`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        setAllLessons(data?.lessons || []);
      } catch (error) {
        console.log(error);
        setAllLessons([]);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    let filtered = allLessons.filter(
      (lesson) => lesson.visibility === "public"
    );

    if (search) {
      filtered = filtered.filter((lesson) =>
        lesson.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (lesson) => lesson.category === category
      );
    }

    if (tone) {
      filtered = filtered.filter(
        (lesson) => lesson.emotionalTone === tone
      );
    }

    if (sort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (sort === "saved") {
      filtered.sort(
        (a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0)
      );
    }

    return filtered;
  }, [allLessons, search, category, tone, sort]);

  const totalPages = Math.ceil(
    filteredLessons.length / lessonsPerPage
  );

  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * lessonsPerPage,
    currentPage * lessonsPerPage
  );

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-5xl font-bold text-white">
          Life Lessons
        </h1>

        <p className="mx-auto max-w-2xl text-zinc-400">
          Discover powerful experiences, mindset shifts, relationship
          wisdom, financial lessons and personal growth stories shared
          by our community.
        </p>
      </div>

      <div className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white"
          >
            <option value="">All Categories</option>
            <option value="Relationship">Relationship</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Mindset">Mindset</option>
            <option value="Personal Growth">Personal Growth</option>
          </select>

          <select
            value={tone}
            onChange={(e) => {
              setTone(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white"
          >
            <option value="">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Realization">Realization</option>
            <option value="Inspirational">Inspirational</option>
            <option value="Gratitude">Gratitude</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white"
          >
            <option value="">Sort</option>
            <option value="newest">Newest</option>
            <option value="saved">Most Saved</option>
          </select>
        </div>
      </div>

      {paginatedLessons.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <h3 className="mb-2 text-2xl font-bold text-white">
            No Lessons Found
          </h3>

          <p className="text-zinc-400">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedLessons.map((lesson) => {
              const isPremium = lesson.accessLevel === "premium";

              const isLocked =
                isPremium &&
                userPlan !== "premium" &&
                !isAdmin;

              return (
                <div
                  key={lesson._id}
                  className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500"
                >
                  <div className={`${isLocked ? "blur-sm" : ""}`}>
                    <img
                      src={
                        lesson.imageUrl ||
                        lesson.image ||
                        "https://placehold.co/600x400"
                      }
                      alt={lesson.title}
                      className="h-56 w-full object-cover"
                    />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-medium text-white">
                        {lesson.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium text-white ${
                          lesson.accessLevel === "premium"
                            ? "bg-amber-500"
                            : "bg-emerald-600"
                        }`}
                      >
                        {lesson.accessLevel}
                      </span>

                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                        {lesson.emotionalTone}
                      </span>
                    </div>

                    {lesson.isFeatured && (
                      <div className="absolute right-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <img
                        src={
                          lesson.creatorImage ||
                          "https://ui-avatars.com/api/?name=User"
                        }
                        alt={lesson.creatorName}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {lesson.creatorName}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {lesson.createdAt
                            ? new Date(
                                lesson.createdAt
                              ).toLocaleDateString()
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <h2 className="mb-2 line-clamp-1 text-xl font-bold text-white">
                      {lesson.title}
                    </h2>

                    <p className="mb-4 line-clamp-3 text-sm text-zinc-400">
                      {lesson.description}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                        ❤️ {lesson.likesCount || 0}
                      </span>

                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                        ⭐ {lesson.favoritesCount || 0}
                      </span>
                    </div>

                    {!isLocked && (
                      <Link
                        href={`/lessons/${lesson._id}`}
                        className="block w-full rounded-xl bg-violet-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
                      >
                        View Details
                      </Link>
                    )}

                    {isLocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-center">
                        <div className="mb-4 text-6xl">🔒</div>

                        <h3 className="text-2xl font-bold text-white">
                          Premium Lesson
                        </h3>

                        <p className="mt-2 text-zinc-300">
                          Upgrade to Premium to unlock this lesson.
                        </p>

                        <Link
                          href="/pricing"
                          className="mt-5 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black"
                        >
                          Upgrade Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`rounded-xl px-4 py-2 font-medium transition ${
                  currentPage === i + 1
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}