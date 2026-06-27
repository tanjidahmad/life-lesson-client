"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white lg:flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">
        {/* Mobile topbar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-white transition hover:bg-zinc-800"
          >
            ☰
          </button>

          <h2 className="text-lg font-semibold text-white">
            Admin Panel
          </h2>

          <div className="w-9" />
        </div>

        <main className="p-4 sm:p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}