import Link from "next/link";
import {
  getMostSavedLessons,
} from "@/lib/api/lessons";

export default async function MostSavedLessons() {
  const lessons =
    await getMostSavedLessons();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white">
          Most Saved Lessons
        </h2>

        <p className="mt-3 text-zinc-400">
          Lessons loved and saved by the community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons?.map(
          (lesson) => (
            <div
              key={lesson._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-violet-600 px-3 py-1 text-xs text-white">
                  {lesson.category}
                </span>

                <span className="text-sm text-yellow-400">
                  ❤️{" "}
                  {
                    lesson.favoritesCount
                  }
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {lesson.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-zinc-400">
                {lesson.description}
              </p>

              <Link
                href={`/lessons/${lesson._id}`}
                className="mt-5 inline-block text-violet-400"
              >
                Read More →
              </Link>
            </div>
          )
        )}
      </div>
    </section>
  );
}