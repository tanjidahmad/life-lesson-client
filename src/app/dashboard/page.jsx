
"use client";

import { useEffect, useState } from "react";
import {
  useSession,
  authClient,
} from "@/lib/auth-client";
import ActivityChart from "@/components/dashboard/ActivityChart";
import {
  CircleInfo,
  Bookmark,
  Person,
} from "@gravity-ui/icons";
import { DashboardStats } from "@/components/dashboard/DashboardStats";

export default function DashboardHomePage() {
  const { data: session } = useSession();

  const [lessons, setLessons] = useState([]);
  const [favorites, setFavorites] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (session === undefined) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const { data: tokenData } =
          await authClient.token();

        if (!tokenData?.token) {
          throw new Error("No token found");
        }

        // ===== MY LESSONS =====
        const lessonsRes = await fetch(
          `${baseUrl}/api/my-lessons/${session.user.email}`,
          {
            method: "GET",
            headers: {
              "content-type":
                "application/json",
              authorization: `Bearer ${tokenData.token}`,
            },
            cache: "no-store",
          }
        );

        const lessonsData =
          await lessonsRes.json();

        if (!lessonsRes.ok) {
          throw new Error(
            lessonsData?.message ||
              "Failed to load lessons"
          );
        }

        // ===== MY FAVORITES =====
        const favoritesRes = await fetch(
          `${baseUrl}/api/favorites/${session.user.email}`,
          {
            method: "GET",
            headers: {
              "content-type":
                "application/json",
              authorization: `Bearer ${tokenData.token}`,
            },
            cache: "no-store",
          }
        );

        const favoritesData =
          await favoritesRes.json();

        if (!favoritesRes.ok) {
          throw new Error(
            favoritesData?.message ||
              "Failed to load favorites"
          );
        }

        setLessons(
          Array.isArray(lessonsData)
            ? lessonsData
            : []
        );

        setFavorites(
          Array.isArray(favoritesData)
            ? favoritesData
            : []
        );
      } catch (error) {
        console.error(error);
        setLessons([]);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session, baseUrl]);

  const safeLessons = Array.isArray(lessons)
    ? lessons
    : [];

  const safeFavorites = Array.isArray(
    favorites
  )
    ? favorites
    : [];

  const stats = [
    {
      title: "My Lessons",
      value: safeLessons.length,
      icon: CircleInfo,
    },
    {
      title: "Favorites",
      value: safeFavorites.length,
      icon: Bookmark,
    },
    {
      title: "Recent Lessons",
      value: safeLessons.slice(0, 5).length,
      icon: CircleInfo,
    },
    {
      title: "Plan",
      value:
        session?.user?.plan === "premium"
          ? "Premium"
          : "Free",
      icon: Person,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome Back,{" "}
          {session?.user?.name}
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your lessons and track
          your activity.
        </p>
      </div>

      <DashboardStats statsData={stats} />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Weekly Activity
        </h2>

        <ActivityChart
          lessons={safeLessons}
        />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Recent Lessons
        </h2>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
          {safeLessons.length === 0 ? (
            <div className="p-6 text-zinc-400">
              No lessons found.
            </div>
          ) : (
            safeLessons
              .slice(0, 5)
              .map((lesson) => (
                <div
                  key={lesson._id}
                  className="border-b border-zinc-800 p-4 last:border-b-0"
                >
                  <h3 className="font-medium text-white">
                    {lesson.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {lesson.category}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}