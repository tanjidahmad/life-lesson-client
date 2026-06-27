// "use client";

// import { useState } from "react";
// import toast from "react-hot-toast";

// import {
//   updateProfile,
// } from "@/lib/api/users";

// export default function AdminProfileCard({
//   user,
// }) {
//   const [name, setName] =
//     useState(user?.name || "");

//   const [image, setImage] =
//     useState(user?.image || "");

//  const handleSave =
//   async () => {
//     const result =
//       await updateProfile(
//         user.email,
//         {
//           name,
//           image,
//         }
//       );

//     if (
//       result.modifiedCount > 0
//     ) {
//       toast.success(
//         "Profile updated successfully"
//       );
//     } else {
//       toast.error(
//         "Nothing changed"
//       );
//     }
//   };

//   return (
//     <div className="max-w-3xl rounded-2xl bg-zinc-900 p-8">

//       <div className="flex flex-col gap-6 md:flex-row">

//         <img
//           src={image}
//           alt={name}
//           className="h-32 w-32 rounded-full object-cover"
//         />

//         <div className="flex-1">

//           <label className="mb-2 block text-sm text-zinc-400">
//             Display Name
//           </label>

//           <input
//             value={name}
//             onChange={(e) =>
//               setName(
//                 e.target.value
//               )
//             }
//             className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
//           />

//           <label className="mb-2 block text-sm text-zinc-400">
//             Profile Photo URL
//           </label>

//           <input
//             value={image}
//             onChange={(e) =>
//               setImage(
//                 e.target.value
//               )
//             }
//             className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
//           />

//         </div>

//       </div>

//       <div className="mt-6 rounded-xl border border-zinc-800 p-4">

//         <p className="text-zinc-400">
//           Email
//         </p>

//         <p className="text-white">
//           {user?.email}
//         </p>

//         <div className="mt-4">
//           <span className="rounded-full bg-violet-600 px-4 py-1 text-sm text-white">
//             Admin
//           </span>
//         </div>

//       </div>

//       <div className="mt-6 rounded-xl border border-zinc-800 p-4">

//         <h3 className="mb-2 text-lg font-semibold text-white">
//           Activity Summary
//         </h3>

//         <p className="text-zinc-400">
//           Lessons Moderated: 0
//         </p>

//         <p className="text-zinc-400">
//           Actions Taken: 0
//         </p>

//       </div>

//       <button
//         onClick={handleSave}
//         className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-white"
//       >
//         Save Changes
//       </button>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { updateProfile } from "@/lib/api/users";

export default function AdminProfileCard({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleSave = async () => {
    const result = await updateProfile(user.email, {
      name,
      image,
    });

    if (result.modifiedCount > 0) {
      toast.success("Profile updated successfully.Please login again.");
       setTimeout(() => {
    router.push("/login");
  }, 2000);
    } else {
      toast.error("Nothing changed");
    }
  };

  return (
    <div className="max-w-3xl rounded-2xl bg-zinc-900 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start">
        <div className="flex justify-center md:block">
          <img
            src={image}
            alt={name}
            className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
        </div>

        <div className="flex-1">
          <label className="mb-2 block text-sm text-zinc-400">
            Display Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm text-white outline-none sm:text-base"
          />

          <label className="mb-2 block text-sm text-zinc-400">
            Profile Photo URL
          </label>

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm text-white outline-none sm:text-base"
          />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 p-4 sm:mt-6">
        <p className="text-sm text-zinc-400 sm:text-base">Email</p>

        <p className="break-all text-sm text-white sm:text-base">
          {user?.email}
        </p>

        <div className="mt-4">
          <span className="rounded-full bg-violet-600 px-4 py-1 text-sm text-white">
            Admin
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 p-4 sm:mt-6">
        <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
          Activity Summary
        </h3>

        <p className="text-sm text-zinc-400 sm:text-base">
          Lessons Moderated: 0
        </p>

        <p className="text-sm text-zinc-400 sm:text-base">
          Actions Taken: 0
        </p>
      </div>

      <button
        onClick={handleSave}
        className="mt-5 w-full rounded-xl bg-violet-600 px-5 py-3 text-sm text-white transition hover:bg-violet-700 sm:mt-6 sm:w-auto sm:text-base"
      >
        Save Changes
      </button>
    </div>
  );
}