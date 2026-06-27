import {
  getTopContributors,
} from "@/lib/api/lessons";

export default async function TopContributors() {
  const contributors =
    await getTopContributors();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white">
          Top Contributors
        </h2>

        <p className="mt-3 text-zinc-400">
          Members sharing the most
          valuable life lessons.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contributors?.map(
          (user, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex items-center gap-4">

                <img
                  src={
                    user.image
                  }
                  alt={
                    user.name
                  }
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-white">
                    {user.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {
                      user.totalLessons
                    }{" "}
                    lessons
                  </p>

                  {user.plan ===
                    "premium" && (
                    <span className="mt-1 inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs text-black">
                      Premium
                    </span>
                  )}
                </div>

              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}