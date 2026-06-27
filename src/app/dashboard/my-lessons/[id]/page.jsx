import { getLessonById } from "@/lib/api/lessons";

export default async function LessonDetailsPage({
  params,
}) {
  const { id } = await params;

  const lesson = await getLessonById(id);

  if (!lesson) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <h1 className="text-2xl font-bold text-white">
          Lesson Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-6 text-4xl font-bold text-white">
          {lesson.title}
        </h1>

        <div className="mb-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-violet-600 px-4 py-2 text-sm text-white">
            {lesson.category}
          </span>

          <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm text-white">
            {lesson.emotionalTone}
          </span>

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">
            {lesson.accessLevel}
          </span>

          <span className="rounded-full bg-amber-600 px-4 py-2 text-sm text-white">
            {lesson.visibility}
          </span>
        </div>

        {lesson.imageUrl && (
          <img
            src={lesson.imageUrl}
            alt={lesson.title}
            className="mb-8 h-[400px] w-full rounded-2xl object-cover"
          />
        )}

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Description
          </h2>

          <p className="leading-8 text-zinc-300">
            {lesson.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-zinc-800 p-5">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Creator Information
            </h3>

            <p className="text-zinc-300">
              Name: {lesson.creatorName}
            </p>

            <p className="mt-2 text-zinc-300">
              Email: {lesson.creatorEmail}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-800 p-5">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Lesson Statistics
            </h3>

            <p className="text-zinc-300">
              Favorites: {lesson.favoritesCount}
            </p>

            <p className="mt-2 text-zinc-300">
              Likes: {lesson.likesCount}
            </p>

            <p className="mt-2 text-zinc-300">
              Created:{" "}
              {new Date(
                lesson.createdAt
              ).toLocaleDateString()}
            </p>

            <p className="mt-2 text-zinc-300">
              Updated:{" "}
              {new Date(
                lesson.updatedAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}