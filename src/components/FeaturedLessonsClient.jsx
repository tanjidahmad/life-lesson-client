"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function FeaturedLessonsClient({
  lessons,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: true,
      }}
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{
          once: true,
        }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold text-white">
          Featured Life Lessons
        </h2>

        <p className="mt-3 text-zinc-400">
          Hand-picked lessons highlighted by admins.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons?.map((lesson) => (
          <motion.div
            key={lesson._id}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <span className="rounded-full bg-violet-600 px-3 py-1 text-xs text-white">
              {lesson.category}
            </span>

            <h3 className="mt-4 text-xl font-bold text-white">
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}