// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import {
//   deleteLesson,
//   ignoreReports,
//   getLessonReports,
// } from "@/lib/api/lessons";

// import ReportModal from "./ReportModal";

// export default function ReportedLessonsTable({
//   lessons,
// }) {
//   const router = useRouter();

//   const [reports, setReports] =
//     useState([]);

//   const [showModal,
//     setShowModal] =
//     useState(false);

//   const handleIgnore =
//     async (lessonId) => {
//       await ignoreReports(
//         lessonId
//       );

//       router.refresh();
//     };

//   const handleDelete =
//     async (lessonId) => {
//       const ok = confirm(
//         "Delete this lesson?"
//       );

//       if (!ok) return;

//       await deleteLesson(
//         lessonId
//       );

//       router.refresh();
//     };

//   const handleViewReports =
//     async (lessonId) => {
//       const data =
//         await getLessonReports(
//           lessonId
//         );

//       setReports(data);

//       setShowModal(true);
//     };

//   return (
//     <>
//       <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-zinc-800">
//               <th className="p-4 text-left text-white">
//                 Lesson Title
//               </th>

//               <th className="p-4 text-left text-white">
//                 Reports
//               </th>

//               <th className="p-4 text-left text-white">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {lessons?.map(
//               (item) => (
//                 <tr
//                   key={
//                     item.lessonId
//                   }
//                   className="border-b border-zinc-800"
//                 >
//                   <td className="p-4 text-zinc-300">
//                     {
//                       item.lesson
//                         ?.title
//                     }
//                   </td>

//                   <td className="p-4 text-zinc-300">
//                     {
//                       item.reportCount
//                     }
//                   </td>

//                   <td className="p-4">
//                     <div className="flex gap-2">

//                       <button
//                         onClick={() =>
//                           handleViewReports(
//                             item.lessonId
//                           )
//                         }
//                         className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
//                       >
//                         View Reports
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleIgnore(
//                             item.lessonId
//                           )
//                         }
//                         className="rounded-lg bg-amber-500 px-3 py-2 text-sm text-black"
//                       >
//                         Ignore
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(
//                             item.lessonId
//                           )
//                         }
//                         className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
//                       >
//                         Delete
//                       </button>

//                     </div>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <ReportModal
//           reports={reports}
//           onClose={() =>
//             setShowModal(false)
//           }
//         />
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  deleteLesson,
  ignoreReports,
  getLessonReports,
} from "@/lib/api/lessons";

import ReportModal from "./ReportModal";

export default function ReportedLessonsTable({ lessons }) {
  const router = useRouter();

  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleIgnore = async (lessonId) => {
    await ignoreReports(lessonId);
    router.refresh();
  };

  const handleDelete = async (lessonId) => {
  try {
    await deleteLesson(lessonId);

    toast.success("Lesson deleted successfully");

    router.refresh();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete lesson");
  }
};

  const handleViewReports = async (lessonId) => {
    const data = await getLessonReports(lessonId);
    setReports(data);
    setShowModal(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[760px] w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                  Lesson Title
                </th>

                <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                  Reports
                </th>

                <th className="p-3 text-left text-sm font-semibold text-white sm:p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {lessons?.length > 0 ? (
                lessons.map((item) => (
                  <tr
                    key={item.lessonId}
                    className="border-b border-zinc-800 last:border-b-0"
                  >
                    <td className="p-3 align-top text-sm text-zinc-300 sm:p-4">
                      <div className="max-w-[240px] sm:max-w-[320px] md:max-w-[420px] break-words">
                        {item.lesson?.title}
                      </div>
                    </td>

                    <td className="p-3 align-top text-sm text-zinc-300 sm:p-4">
                      {item.reportCount}
                    </td>

                    <td className="p-3 sm:p-4">
                      <div className="flex min-w-[220px] flex-col gap-2 sm:min-w-0 md:flex-row md:flex-wrap">
                        <button
                          onClick={() => handleViewReports(item.lessonId)}
                          className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-700 md:w-auto"
                        >
                          View Reports
                        </button>

                        <button
                          onClick={() => handleIgnore(item.lessonId)}
                          className="w-full rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-black transition hover:bg-amber-400 md:w-auto"
                        >
                          Ignore
                        </button>

                        <button
                          onClick={() => handleDelete(item.lessonId)}
                          className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700 md:w-auto"
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
                    colSpan={3}
                    className="p-6 text-center text-sm text-zinc-400 sm:p-8"
                  >
                    No reported lessons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ReportModal
          reports={reports}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}