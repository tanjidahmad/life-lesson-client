

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  isOpen,
  onClose,
}) {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard Home",
      href: "/dashboard/admin",
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
    },
    {
      name: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
    },
    {
      name: "Reported Lessons",
      href: "/dashboard/admin/reported-lessons",
    },
    {
      name: "Admin Profile",
      href: "/dashboard/admin/profile",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform border-r border-zinc-800 bg-zinc-900 p-6 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:h-auto lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between lg:block">
          <h2 className="text-2xl font-bold text-white">
            Admin Panel
          </h2>

          {/* mobile close btn */}
          <button
            onClick={onClose}
            className="rounded-md p-2 text-white hover:bg-zinc-800 lg:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-xl px-4 py-3 transition ${
                pathname === link.href
                  ? "bg-violet-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}