// import { getUserSession } from "@/lib/core/session";
// import AdminProfileCard from "@/components/dashboard/admin/AdminProfileCard";

// export default async function AdminProfilePage() {
//   const user = await getUserSession();

//   return (
//     <div>
//       <h1 className="mb-8 text-4xl font-bold text-white">
//         Admin Profile
//       </h1>

//       <AdminProfileCard
//         user={user}
//       />
//     </div>
//   );
// }

import { getUserSession } from "@/lib/core/session";
import AdminProfileCard from "@/components/dashboard/admin/AdminProfileCard";

export default async function AdminProfilePage() {
  const user = await getUserSession();

  return (
    <div className="px-3 sm:px-4 md:px-0">
      <h1 className="mb-5 text-2xl font-bold text-white sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
        Admin Profile
      </h1>

      <AdminProfileCard user={user} />
    </div>
  );
}