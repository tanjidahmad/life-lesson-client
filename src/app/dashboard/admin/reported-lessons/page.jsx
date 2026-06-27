// import {
//   getReportedLessons,
// } from "@/lib/api/lessons";

// import ReportedLessonsTable from "@/components/dashboard/admin/ReportedLessonsTable";

// export default async function ReportedLessonsPage() {
//   const lessons =
//     await getReportedLessons();

//   return (
//     <div>
//       <h1 className="mb-8 text-4xl font-bold text-white">
//         Reported Lessons
//       </h1>

//       <ReportedLessonsTable
//         lessons={lessons}
//       />
//     </div>
//   );
// }

// import ReportedLessonsTable from "@/components/dashboard/admin/ReportedLessonsTable";
// import { getUserToken } from "@/lib/core/session";

// export default async function ReportedLessonsPage() {
//   const token = await getUserToken();

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/reported-lessons`,
//     {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const lessons = await res.json();

//   if (!res.ok) {
//     throw new Error(
//       lessons?.message ||
//         "Failed to load reported lessons"
//     );
//   }

//   return (
//     <div>
//       <h1 className="mb-8 text-4xl font-bold text-white">
//         Reported Lessons
//       </h1>

//       <ReportedLessonsTable
//         lessons={lessons}
//       />
//     </div>
//   );
// }

import ReportedLessonsTable from "@/components/dashboard/admin/ReportedLessonsTable";
import { getUserToken } from "@/lib/core/session";

export default async function ReportedLessonsPage() {
  const token = await getUserToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/reported-lessons`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const lessons = await res.json();

  if (!res.ok) {
    throw new Error(
      lessons?.message || "Failed to load reported lessons"
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-0">
      <h1 className="mb-5 text-2xl font-bold text-white sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
        Reported Lessons
      </h1>

      <ReportedLessonsTable lessons={lessons} />
    </div>
  );
}