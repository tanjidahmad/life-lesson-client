// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// export default function AdminLessonPagination({
//   currentPage,
//   totalPages,
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const goToPage = (page) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", page);
//     router.push(`/dashboard/admin/manage-lessons?${params.toString()}`);
//   };

//   if (totalPages <= 1) return null;

//   return (
//     <div className="mt-8 flex items-center justify-center gap-3">
//       <button
//         onClick={() => goToPage(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white disabled:opacity-40"
//       >
//         Prev
//       </button>

//       <div className="text-sm text-zinc-300">
//         Page {currentPage} of {totalPages}
//       </div>

//       <button
//         onClick={() => goToPage(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white disabled:opacity-40"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLessonPagination({
  currentPage,
  totalPages,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`/dashboard/admin/manage-lessons?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-full rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        Prev
      </button>

      <div className="text-center text-sm text-zinc-300">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-full rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        Next
      </button>
    </div>
  );
}