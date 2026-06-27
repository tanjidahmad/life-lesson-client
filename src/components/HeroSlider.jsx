"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Share Your Life Lessons",
    description:
      "Turn your experiences into meaningful lessons that inspire and guide others.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Learn From Real Experiences",
    description:
      "Discover valuable insights, wisdom, and personal stories from people around the world.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Grow Through Shared Wisdom",
    description:
      "Build a community where every challenge becomes a lesson and every lesson inspires growth.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="h-[90vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex h-full items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70"></div>

              {/* Content */}
              <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
                  {slide.title}
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300 md:text-xl">
                  {slide.description}
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/lessons"
                    className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white transition hover:scale-105"
                  >
                    Explore Lessons
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                  >
                    Start Sharing
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}