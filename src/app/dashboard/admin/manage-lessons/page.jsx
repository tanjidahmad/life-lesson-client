
import { serverFetch } from "@/lib/core/server";
import ManageLessonsTable from "@/components/dashboard/admin/ManageLessonsTable";
import AdminLessonPagination from "@/components/dashboard/admin/AdminLessonPagination";

export default async function ManageLessonsPage({ searchParams }) {
  const params = await searchParams;   // ✅ important
  const page = Number(params?.page) || 1;
  const limit = 6; // বা 10, যেটা চাস

  const lessonsData = await serverFetch(
    `/api/lessons?admin=true&page=${page}&limit=${limit}`
  );

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-white">
        Manage Lessons
      </h1>

      <ManageLessonsTable lessons={lessonsData.lessons} />

      <AdminLessonPagination
        currentPage={lessonsData.currentPage}
        totalPages={lessonsData.totalPages}
      />
    </div>
  );
}