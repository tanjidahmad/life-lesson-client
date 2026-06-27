// "use client";

// import { useRouter } from "next/navigation";

// import {
//   deleteLesson,
//   featureLesson,
//   reviewLesson,
// } from "@/lib/api/lessons";

// export default function ManageLessonsTable({
//   lessons,
// }) {
//   const router = useRouter();

//   const handleFeature = async (
//     id
//   ) => {
//     await featureLesson(id);
//     router.refresh();
//   };

//   const handleReview = async (
//     id
//   ) => {
//     await reviewLesson(id);
//     router.refresh();
//   };

//   const handleDelete = async (
//     id
//   ) => {
//     const confirmDelete =
//       confirm(
//         "Are you sure you want to delete this lesson?"
//       );

//     if (!confirmDelete) return;

//     await deleteLesson(id);

//     router.refresh();
//   };

//   return (
//     <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b border-zinc-800">
//             <th className="p-4 text-left text-white">
//               Title
//             </th>

//             <th className="p-4 text-left text-white">
//               Creator
//             </th>

//             <th className="p-4 text-left text-white">
//               Category
//             </th>

//             <th className="p-4 text-left text-white">
//               Visibility
//             </th>

//             <th className="p-4 text-left text-white">
//               Featured
//             </th>

//             <th className="p-4 text-left text-white">
//               Reviewed
//             </th>

//             <th className="p-4 text-left text-white">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {lessons?.map(
//             (lesson) => (
//               <tr
//                 key={lesson._id}
//                 className="border-b border-zinc-800"
//               >
//                 <td className="p-4 text-zinc-300">
//                   {lesson.title}
//                 </td>

//                 <td className="p-4 text-zinc-300">
//                   {
//                     lesson.creatorEmail
//                   }
//                 </td>

//                 <td className="p-4 text-zinc-300">
//                   {lesson.category}
//                 </td>

//                 <td className="p-4">
//                   <span className="rounded-full bg-cyan-600 px-3 py-1 text-sm text-white">
//                     {
//                       lesson.visibility
//                     }
//                   </span>
//                 </td>

//                 <td className="p-4">
//                   {lesson.isFeatured ? (
//                     <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
//                       Yes
//                     </span>
//                   ) : (
//                     <span className="rounded-full bg-red-600 px-3 py-1 text-sm text-white">
//                       No
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-4">
//                   {lesson.isReviewed ? (
//                     <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
//                       Yes
//                     </span>
//                   ) : (
//                     <span className="rounded-full bg-red-600 px-3 py-1 text-sm text-white">
//                       No
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-4">
//                   <div className="flex flex-wrap gap-2">
//                     {!lesson.isFeatured && (
//                      <button
//   onClick={() =>
//     handleFeature(
//       lesson._id
//     )
//   }
//   className={`rounded-lg px-3 py-2 text-sm font-medium ${
//     lesson.isFeatured
//       ? "bg-red-600 text-white"
//       : "bg-amber-500 text-black"
//   }`}
// >
//   {lesson.isFeatured
//     ? "Unfeature"
//     : "Feature"}
// </button>
//                     )}

//                     {!lesson.isReviewed && (
//                       <button
//                         onClick={() =>
//                           handleReview(
//                             lesson._id
//                           )
//                         }
//                         className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
//                       >
//                         Review
//                       </button>
//                     )}

//                     <button
//                       onClick={() =>
//                         handleDelete(
//                           lesson._id
//                         )
//                       }
//                       className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";

import {
  deleteLesson,
  featureLesson,
  reviewLesson,
} from "@/lib/api/lessons";

export default function ManageLessonsTable({ lessons }) {
  const router = useRouter();

  const deleteConfirmRef = useRef({});

  const handleFeature = async (id) => {
    await featureLesson(id);
    router.refresh();
  };

  const handleReview = async (id) => {
    await reviewLesson(id);
    router.refresh();
  };

  const handleDelete = async (id) => {
    const now = Date.now();
    const lastClick = deleteConfirmRef.current[id];

    // If not clicked recently, ask for confirmation with toast
    if (!lastClick || now - lastClick > 3000) {
      deleteConfirmRef.current[id] = now;

      toast((t) => (
  <div className="rounded-xl bg-zinc-900 p-4 text-white shadow-lg">
    <p className="mb-3 text-sm font-medium text-white">
      Click delete again within 3 seconds to confirm.
    </p>

    <button
      onClick={() => toast.dismiss(t.id)}
      className="rounded-md bg-zinc-700 px-3 py-1 text-xs text-white transition hover:bg-zinc-600"
    >
      Cancel
    </button>
  </div>
));
      return;
    }

    // Confirmed
    deleteConfirmRef.current[id] = null;

    const promise = deleteLesson(id);

    toast.promise(promise, {
      loading: "Deleting lesson...",
      success: "Lesson deleted successfully",
      error: "Failed to delete lesson",
    });

    await promise;
    router.refresh();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1100px] w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Title
              </th>

              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Creator
              </th>

              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Category
              </th>

              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Visibility
              </th>

              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Featured
              </th>

              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Reviewed
              </th>

              <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {lessons?.length > 0 ? (
              lessons.map((lesson) => (
                <tr
                  key={lesson._id}
                  className="border-b border-zinc-800 last:border-b-0"
                >
                  <td className="p-3 text-sm text-zinc-300 sm:p-4">
                    <div className="max-w-[220px] break-words sm:max-w-[260px] md:max-w-[320px]">
                      {lesson.title}
                    </div>
                  </td>

                  <td className="p-3 text-sm text-zinc-300 sm:p-4">
                    <div className="max-w-[220px] break-all sm:max-w-[260px] md:max-w-[320px]">
                      {lesson.creatorEmail}
                    </div>
                  </td>

                  <td className="p-3 text-sm text-zinc-300 sm:p-4">
                    <div className="max-w-[160px] break-words">
                      {lesson.category}
                    </div>
                  </td>

                  <td className="p-3 sm:p-4">
                    <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs text-white sm:text-sm">
                      {lesson.visibility}
                    </span>
                  </td>

                  <td className="p-3 sm:p-4">
                    {lesson.isFeatured ? (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white sm:text-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white sm:text-sm">
                        No
                      </span>
                    )}
                  </td>

                  <td className="p-3 sm:p-4">
                    {lesson.isReviewed ? (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white sm:text-sm">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white sm:text-sm">
                        No
                      </span>
                    )}
                  </td>

                  <td className="p-3 sm:p-4">
                    <div className="flex min-w-[240px] flex-col gap-2 md:min-w-0 md:flex-row md:flex-wrap">
                      {!lesson.isFeatured && (
                        <button
                          onClick={() => handleFeature(lesson._id)}
                          className={`w-full rounded-lg px-3 py-2 text-sm font-medium md:w-auto ${
                            lesson.isFeatured
                              ? "bg-red-600 text-white"
                              : "bg-amber-500 text-black"
                          }`}
                        >
                          {lesson.isFeatured ? "Unfeature" : "Feature"}
                        </button>
                      )}

                      {!lesson.isReviewed && (
                        <button
                          onClick={() => handleReview(lesson._id)}
                          className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white md:w-auto"
                        >
                          Review
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white md:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-center text-sm text-zinc-400 sm:p-8"
                >
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}