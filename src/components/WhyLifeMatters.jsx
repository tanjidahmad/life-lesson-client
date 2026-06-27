import {
  BookOpen,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";

export default function WhyLifeMatters() {
  const benefits = [
    {
      title:
        "Learn From Real Experiences",
      description:
        "Discover valuable lessons shared by people from different backgrounds and life journeys.",
      icon: <BookOpen size={32} />,
    },
    {
      title:
        "Build Emotional Wisdom",
      description:
        "Understand emotions, relationships, and personal growth through authentic stories.",
      icon: <Heart size={32} />,
    },
    {
      title:
        "Connect With Others",
      description:
        "Explore perspectives and insights from a supportive community of learners.",
      icon: <Users size={32} />,
    },
    {
      title:
        "Inspire Positive Change",
      description:
        "Apply meaningful lessons in your own life and become a source of inspiration.",
      icon: <Sparkles size={32} />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white">
          Why Learning From Life Matters
        </h2>

        <p className="mt-4 text-zinc-400">
          Preserve wisdom, learn from experiences,
          and grow through shared stories.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map(
          (item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-4 text-violet-500">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-zinc-400">
                {item.description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}