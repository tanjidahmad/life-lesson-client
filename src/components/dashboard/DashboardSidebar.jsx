"use client";

import { useState } from "react";
import Link from "next/link";
import {
House,
SquarePlus,
Bookmark,
Person,
Bars,
Xmark,
} from "@gravity-ui/icons";

export function DashboardSidebar() {
const [open, setOpen] = useState(false);

const navItems = [
{
  icon: House,
  href: "/",
  label: "Home",
},

{
icon: House,
href: "/dashboard",
label: "Dashboard",
},
{
icon: SquarePlus,
href: "/dashboard/add-lesson",
label: "Add Lesson",
},
{
icon: Bookmark,
href: "/dashboard/my-lessons",
label: "My Lessons",
},
{
icon: Bookmark,
href: "/dashboard/favorites",
label: "Favorites",
},
{
icon: Person,
href: "/dashboard/profile",
label: "Profile",
},
];

return (
<>
{/* Mobile Menu Button */}
<button
onClick={() => setOpen(true)}
className="fixed left-4 top-4 z-50 rounded-lg bg-zinc-900 p-2 text-white lg:hidden"
> <Bars className="size-6" /> </button>


  {/* Overlay */}
  {open && (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-40 bg-black/50 lg:hidden"
    />
  )}

  {/* Mobile Sidebar */}
  <aside
    className={`fixed left-0 top-0 z-50 h-full w-64 bg-zinc-900 p-4 transition-transform duration-300 lg:hidden ${
      open
        ? "translate-x-0"
        : "-translate-x-full"
    }`}
  >
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">
        Dashboard
      </h2>

      <button
        onClick={() => setOpen(false)}
        className="text-white"
      >
        <Xmark className="size-6" />
      </button>
    </div>

    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  </aside>

  {/* Desktop Sidebar */}
  <aside className="hidden w-64 border-r border-zinc-800 bg-zinc-900 p-4 lg:block">
    <h2 className="mb-8 text-2xl font-bold text-white">
      Dashboard
    </h2>

    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  </aside>
</>


);
}
