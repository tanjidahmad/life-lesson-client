
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useSession,
  authClient,
} from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateLessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession();

  const [loading, setLoading] =
    useState(true);
  const [saving, setSaving] =
    useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  const isPremiumUser =
    session?.user?.plan === "premium";

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      emotionalTone: "",
      imageUrl: "",
      visibility: "public",
      accessLevel: "free",
    });

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const { data: tokenData } =
          await authClient.token();

        const res = await fetch(
          `${baseUrl}/api/lessons/${id}`,
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

        const lesson =
          await res.json();

        if (!res.ok) {
          throw new Error(
            lesson?.message ||
              "Failed to load lesson"
          );
        }

        setFormData({
          title: lesson.title || "",
          description:
            lesson.description || "",
          category:
            lesson.category || "",
          emotionalTone:
            lesson.emotionalTone || "",
          imageUrl:
            lesson.imageUrl || "",
          visibility:
            lesson.visibility ||
            "public",
          accessLevel:
            lesson.accessLevel ||
            "free",
        });
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to load lesson"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadLesson();
    }
  }, [id, baseUrl]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const { data: tokenData } =
        await authClient.token();

      const payload = {
        ...formData,
        accessLevel: isPremiumUser
          ? formData.accessLevel
          : "free",
      };

      const res = await fetch(
        `${baseUrl}/api/lessons/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type":
              "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            "Failed to update lesson"
        );
      }

      toast.success(
        "Lesson updated successfully"
      );

      router.push(
        "/dashboard/my-lessons"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error.message ||
          "Failed to update lesson"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Update Lesson
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Lesson Title"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
            required
          />

          <textarea
            rows={6}
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
            required
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
            required
          />

          <input
            type="text"
            name="emotionalTone"
            value={
              formData.emotionalTone
            }
            onChange={handleChange}
            placeholder="Emotional Tone"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
            required
          />

          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <select
              name="visibility"
              value={
                formData.visibility
              }
              onChange={handleChange}
              className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
            >
              <option value="public">
                Public
              </option>

              <option value="private">
                Private
              </option>
            </select>

            <select
              name="accessLevel"
              value={
                formData.accessLevel
              }
              onChange={handleChange}
              disabled={!isPremiumUser}
              className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="free">
                Free
              </option>

              <option value="premium">
                Premium
              </option>
            </select>
          </div>

          {!isPremiumUser && (
            <p className="text-sm text-amber-400">
              Upgrade to Premium
              to create or edit
              Premium lessons.
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white"
          >
            {saving
              ? "Updating..."
              : "Update Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
}