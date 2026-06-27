"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
// Better Auth Session
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Avatar Dropdown State
const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Better Auth Session
  const { data: session, isPending } = useSession();

  console.log(session); // 👈 F12 Console এ session দেখার জন্য

  const isLoggedIn = !!session?.user;

  // Logout Function
const handleLogout = async () => {
  await signOut();
};

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Lessons",
      href: "/lessons",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent"
        >
          Life Lessons
        </Link>

        {/* Desktop Menu */}
       {/* Desktop Menu */}
<nav className="hidden items-center gap-8 md:flex">

  {/* Home */}
  <Link
    href="/"
    className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-white"
  >
    Home
  </Link>

  {/* Lessons */}
  <Link
    href="/lessons"
    className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-white"
  >
    Lessons
  </Link>

  {/* Add Lesson */}
{isLoggedIn && session?.user?.role !== "admin" && (
  <Link
    href="/dashboard/add-lesson"
    className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-white"
  >
    Add Lesson
  </Link>
)}

{/* My Lessons */}
{isLoggedIn && session?.user?.role !== "admin" && (
  <Link
    href="/dashboard/my-lessons"
    className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-white"
  >
    My Lessons
  </Link>
)}

  {/* ===== FREE USER ONLY (ADMIN HIDE) ===== */}
{isLoggedIn &&
  session?.user?.role !== "admin" &&
  session?.user?.plan === "free" && (
    <Link
      href="/pricing"
      className="text-sm font-medium text-zinc-300 transition duration-300 hover:text-white"
    >
      Pricing
    </Link>
)}

  {/* PREMIUM USER ONLY */}
  {isLoggedIn &&
    session?.user?.plan === "premium" && (
      <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-black">
        Premium ⭐
      </span>
    )}

</nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-4 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-105"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="relative">
  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex items-center gap-3"
  >
    <img
      src={session?.user?.image}
      alt={session?.user?.name}
      className="h-10 w-10 rounded-full border-2 border-violet-500 object-cover"
    />
  </button>

  {showProfileMenu && (
    <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
      
      {/* User Info */}
<div className="border-b border-zinc-800 p-4">

  <h4 className="font-semibold text-white">
    {session?.user?.name}
  </h4>

  <p className="truncate text-xs text-zinc-400">
    {session?.user?.email}
  </p>

  {/* ===== ADMIN BADGE ===== */}
  {session?.user?.role === "admin" && (
    <span className="mt-2 inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
      Admin
    </span>
  )}

</div>

      {/* Dropdown Menu */}
      <div className="flex flex-col p-2">

  {/* ================= PROFILE ================= */}
  {/* Admin হলে Admin Profile, User হলে User Profile */}
  {session?.user?.role === "admin" ? (
    <Link
      href="/dashboard/admin/profile"
      className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
    >
      Profile
    </Link>
  ) : (
    <Link
      href="/dashboard/profile"
      className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
    >
      Profile
    </Link>
  )}

  {/* ================= DASHBOARD ================= */}
  {session?.user?.role === "admin" ? (
    <Link
      href="/dashboard/admin"
      className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
    >
      Dashboard
    </Link>
  ) : (
    <Link
      href="/dashboard"
      className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
    >
      Dashboard
    </Link>
  )}

  {/* ================= LOGOUT ================= */}
  <button
    onClick={handleLogout}
    className="rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-800"
  >
    Logout
  </button>

</div>
    </div>
  )}
</div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {/* Home */}
<Link
  href="/"
  onClick={() => setIsOpen(false)}
  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
>
  Home
</Link>

{/* Lessons */}
<Link
  href="/lessons"
  onClick={() => setIsOpen(false)}
  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
>
  Lessons
</Link>

{/* ===== FREE USER ONLY (ADMIN HIDE) ===== */}
{isLoggedIn &&
  session?.user?.role !== "admin" &&
  session?.user?.plan === "free" && (
    <Link
      href="/pricing"
      onClick={() => setIsOpen(false)}
      className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
    >
      Pricing
    </Link>
)}

{/* PREMIUM USER ONLY */}
{isLoggedIn &&
  session?.user?.plan === "premium" && (
    <div className="rounded-lg bg-amber-500 px-3 py-2 text-center text-sm font-semibold text-black">
      Premium ⭐
    </div>
  )}

            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-center text-sm font-medium text-zinc-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
             ) : (
  <>
    {/* ===== Mobile User Info ===== */}
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
      <div className="flex items-center gap-3">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-medium text-white">
            {session?.user?.name}
          </h4>

          <p className="text-xs text-zinc-400">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>

    {/* ===== Profile ===== */}
    <Link
      href="/profile"
      onClick={() => setIsOpen(false)}
      className="rounded-lg border border-zinc-700 px-3 py-2 text-center text-sm font-medium text-zinc-300"
    >
      Profile
    </Link>

    {/* ===== Dashboard ===== */}
   {session?.user?.role === "admin" ? (
  <Link
    href="/dashboard/admin"
    onClick={() => setIsOpen(false)}
    className="rounded-lg border border-zinc-700 px-3 py-2 text-center text-sm font-medium text-zinc-300"
  >
    Admin Dashboard
  </Link>
) : (
  <Link
    href="/dashboard"
    onClick={() => setIsOpen(false)}
    className="rounded-lg border border-zinc-700 px-3 py-2 text-center text-sm font-medium text-zinc-300"
  >
    Dashboard
  </Link>
)}

    {/* ===== Logout ===== */}
    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white"
    >
      Logout
    </button>
  </>
)}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


