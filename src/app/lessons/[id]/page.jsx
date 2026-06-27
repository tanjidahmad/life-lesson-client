

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LessonDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { data: session } = useSession();

  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [liked, setLiked] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (session === undefined) return;

    if (!session?.user) {
      router.push("/login");
    }
  }, [session, router]);

  // -----------------------------
  // LOAD LESSON + COMMENTS
  // -----------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // lesson details
        const lessonRes = await fetch(
          `${baseUrl}/api/lessons/${params.id}`,
          {
            cache: "no-store",
          }
        );

        if (!lessonRes.ok) {
          throw new Error("Failed to load lesson");
        }

        const lessonData = await lessonRes.json();
        setLesson(lessonData);

        // comments
        const commentsRes = await fetch(
          `${baseUrl}/api/comments/${params.id}`,
          {
            cache: "no-store",
          }
        );

        if (!commentsRes.ok) {
          throw new Error("Failed to load comments");
        }

        const commentsData = await commentsRes.json();
        setComments(Array.isArray(commentsData) ? commentsData : []);

        if (
          lessonData?.likes?.includes(session?.user?.email)
        ) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      loadData();
    }
  }, [params?.id, session?.user?.email, baseUrl]);

  // -----------------------------
  // GET JWT TOKEN
  // -----------------------------
  const getJwtToken = async () => {
    const { data: tokenData } = await authClient.token();
    return tokenData?.token;
  };

  // -----------------------------
  // LIKE
  // -----------------------------
  const handleLike = async () => {
    if (!session?.user?.email) {
      return toast.error("Please login first");
    }

    try {
      const token = await getJwtToken();

      if (!token) {
        return toast.error("Token not found");
      }

      const res = await fetch(
        `${baseUrl}/api/lessons/like/${lesson._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userEmail: session.user.email,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Like failed");
      }

      if (result.liked) {
        setLiked(true);
        setLesson((prev) => ({
          ...prev,
          likesCount: (prev.likesCount || 0) + 1,
        }));
      } else {
        setLiked(false);
        setLesson((prev) => ({
          ...prev,
          likesCount: Math.max((prev.likesCount || 1) - 1, 0),
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update like");
    }
  };

  // -----------------------------
  // FAVORITE
  // -----------------------------
  const handleFavorite = async () => {
    if (!session?.user?.email) {
      return toast.error("Please login first");
    }

    try {
      const token = await getJwtToken();

      if (!token) {
        return toast.error("Token not found");
      }

      const res = await fetch(`${baseUrl}/api/favorites`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lessonId: lesson._id,
          userEmail: session.user.email,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Favorite failed");
      }

      setLesson((prev) => ({
        ...prev,
        favoritesCount: (prev.favoritesCount || 0) + 1,
      }));

      toast.success("Added to favorites");
    } catch (error) {
      console.log(error);
      toast.error("Already favorited or request failed");
    }
  };

  // -----------------------------
  // COMMENT
  // -----------------------------
  const handleComment = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      return toast.error("Please login first");
    }

    if (!comment.trim()) {
      return toast.error("Write a comment first");
    }

    try {
      const token = await getJwtToken();

      if (!token) {
        return toast.error("Token not found");
      }

      const newComment = {
        lessonId: lesson._id,
        userName: session.user.name,
        userEmail: session.user.email,
        comment,
      };

      const res = await fetch(`${baseUrl}/api/comments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Comment failed");
      }

      // reload comments
      const commentsRes = await fetch(
        `${baseUrl}/api/comments/${lesson._id}`,
        {
          cache: "no-store",
        }
      );

      const updatedComments = await commentsRes.json();
      setComments(Array.isArray(updatedComments) ? updatedComments : []);
      setComment("");

      toast.success("Comment added");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    }
  };

  // -----------------------------
  // REPORT
  // -----------------------------
  const handleReport = async () => {
    if (!session?.user?.email) {
      return toast.error("Please login first");
    }

    if (!reportReason.trim()) {
      return toast.error("Please write a reason");
    }

    try {
      const token = await getJwtToken();

      if (!token) {
        return toast.error("Token not found");
      }

      const res = await fetch(`${baseUrl}/api/reports`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lessonId: lesson._id,
          userEmail: session.user.email,
          reason: reportReason,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Report failed");
      }

      setReportReason("");
      toast.success("Report submitted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit report");
    }
  };

  // -----------------------------
  // UI STATES
  // -----------------------------
  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="py-20 text-center text-white">
        Lesson not found
      </div>
    );
  }

  const isAdmin = session?.user?.role === "admin";

  const isPremiumLocked =
    lesson.accessLevel === "premium" &&
    session?.user?.plan !== "premium" &&
    !isAdmin;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {isPremiumLocked ? (
        <div className="rounded-3xl border border-amber-500/30 bg-zinc-900 p-10 text-center">
          <div className="mb-6 text-7xl">🔒</div>

          <h1 className="mb-4 text-4xl font-bold text-white">
            Premium Lesson
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-zinc-400">
            This lesson is available only for premium members.
            Upgrade your account to unlock premium content.
          </p>

          <a
            href="/pricing"
            className="inline-block rounded-2xl bg-amber-500 px-6 py-3 font-semibold text-black"
          >
            Upgrade Now
          </a>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
            <img
              src={
                lesson.imageUrl ||
                lesson.image ||
                "https://placehold.co/1200x600"
              }
              alt={lesson.title}
              className="h-[400px] w-full object-cover"
            />

            <div className="p-8">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-violet-600 px-4 py-1 text-sm text-white">
                  {lesson.category}
                </span>

                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm text-white">
                  {lesson.emotionalTone}
                </span>

                <span
                  className={`rounded-full px-4 py-1 text-sm text-white ${
                    lesson.accessLevel === "premium"
                      ? "bg-amber-500"
                      : "bg-emerald-600"
                  }`}
                >
                  {lesson.accessLevel}
                </span>

                <span className="rounded-full bg-zinc-700 px-4 py-1 text-sm text-white">
                  {lesson.visibility}
                </span>

                {lesson.isFeatured && (
                  <span className="rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-black">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-4xl font-bold text-white">
                {lesson.title}
              </h1>

              <div className="mb-8 flex items-center gap-3">
                <img
                  src={
                    lesson.creatorImage ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt={lesson.creatorName}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-white">
                    {lesson.creatorName}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>

                <p className="text-sm text-zinc-500">
                  Updated:{" "}
                  {lesson.updatedAt
                    ? new Date(lesson.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="mb-8 rounded-2xl bg-zinc-950 p-6">
                <h2 className="mb-3 text-xl font-semibold text-white">
                  Lesson Description
                </h2>

                <p className="leading-8 text-zinc-300">
                  {lesson.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleLike}
                  className={`rounded-xl px-5 py-3 font-semibold ${
                    liked
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  ❤️ Like ({lesson.likesCount || 0})
                </button>

                <button
                  onClick={handleFavorite}
                  className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black"
                >
                  ⭐ Favorite ({lesson.favoritesCount || 0})
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Comments ({comments.length})
              </h2>

              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="mb-3 h-28 w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white"
                >
                  Add Comment
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-zinc-950 p-4"
                  >
                    <p className="mb-1 font-semibold text-white">
                      {item.userName}
                    </p>

                    <p className="text-zinc-400">
                      {item.comment}
                    </p>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-zinc-500">
                    No comments yet.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Report Lesson
              </h2>

              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Explain the issue..."
                className="mb-4 h-40 w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none"
              />

              <button
                onClick={handleReport}
                className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
              >
                Submit Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}