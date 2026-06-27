// "use client";

// import { useState } from "react";
// import { useSession } from "@/lib/auth-client";
// import { createLesson } from "@/lib/actions/lessons";
// import toast from "react-hot-toast";

// export default function AddLessonPage() {
//   const { data: session } = useSession();

//   const [loading, setLoading] = useState(false);

//   const isPremium =
//     session?.user?.plan === "premium";

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     emotionalTone: "",
//     imageUrl: "",
//     visibility: "public",
//     accessLevel: "free",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       const lessonData = {
//         ...formData,

//         accessLevel: isPremium
//           ? formData.accessLevel
//           : "free",

//         creatorName: session?.user?.name,
//         creatorEmail: session?.user?.email,
//       };

//       await createLesson(lessonData);

//       toast.success(
//         "Lesson added successfully"
//       );

//       setFormData({
//         title: "",
//         description: "",
//         category: "",
//         emotionalTone: "",
//         imageUrl: "",
//         visibility: "public",
//         accessLevel: "free",
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add lesson");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-4xl">
//       <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
//         <h1 className="mb-8 text-3xl font-bold text-white">
//           Add New Lesson
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="grid gap-5"
//         >
//           <div>
//             <label className="mb-2 block text-sm text-zinc-300">
//               Lesson Title
//             </label>

//             <input
//               type="text"
//               name="title"
//               required
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-zinc-300">
//               Description
//             </label>

//             <textarea
//               name="description"
//               rows={5}
//               required
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
//             />
//           </div>

//           <div className="grid gap-5 md:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-sm text-zinc-300">
//                 Category
//               </label>

//               <select
//                 name="category"
//                 required
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
//               >
//                 <option value="">
//                   Select Category
//                 </option>

//                 <option value="Personal Growth">
//                   Personal Growth
//                 </option>

//                 <option value="Career">
//                   Career
//                 </option>

//                 <option value="Relationships">
//                   Relationships
//                 </option>

//                 <option value="Mindset">
//                   Mindset
//                 </option>

//                 <option value="Mistakes Learned">
//                   Mistakes Learned
//                 </option>
//               </select>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-zinc-300">
//                 Emotional Tone
//               </label>

//               <select
//                 name="emotionalTone"
//                 required
//                 value={formData.emotionalTone}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
//               >
//                 <option value="">
//                   Select Tone
//                 </option>

//                 <option value="Motivational">
//                   Motivational
//                 </option>

//                 <option value="Sad">
//                   Sad
//                 </option>

//                 <option value="Realization">
//                   Realization
//                 </option>

//                 <option value="Gratitude">
//                   Gratitude
//                 </option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-sm text-zinc-300">
//               Image URL (Optional)
//             </label>

//             <input
//               type="url"
//               name="imageUrl"
//               value={formData.imageUrl}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
//             />
//           </div>

//           <div className="grid gap-5 md:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-sm text-zinc-300">
//                 Visibility
//               </label>

//               <select
//                 name="visibility"
//                 value={formData.visibility}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
//               >
//                 <option value="public">
//                   Public
//                 </option>

//                 <option value="private">
//                   Private
//                 </option>
//               </select>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-zinc-300">
//                 Access Level
//               </label>

//               <select
//                 name="accessLevel"
//                 value={formData.accessLevel}
//                 onChange={handleChange}
//                 disabled={!isPremium}
//                 className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <option value="free">
//                   Free
//                 </option>

//                 {isPremium && (
//                   <option value="premium">
//                     Premium
//                   </option>
//                 )}
//               </select>

//               {!isPremium && (
//                 <p className="mt-2 text-sm text-amber-400">
//                   Upgrade to Premium to create
//                   paid lessons.
//                 </p>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
//           >
//             {loading
//               ? "Adding Lesson..."
//               : "Add Lesson"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  useSession,
  authClient,
} from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddLessonPage() {
  const { data: session } =
    useSession();

  const [loading, setLoading] =
    useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  const isPremium =
    session?.user?.plan === "premium";

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      emotionalTone: "",
      imageUrl: "",
      visibility: "public",
      accessLevel: "free",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      return toast.error(
        "Please login first"
      );
    }

    setLoading(true);

    try {
      const lessonData = {
        ...formData,
        accessLevel: isPremium
          ? formData.accessLevel
          : "free",
        creatorName:
          session?.user?.name,
        creatorEmail:
          session?.user?.email,
      };

      const { data: tokenData } =
        await authClient.token();
        console.log(tokenData.token)

      const res = await fetch(
        `${baseUrl}/api/lessons`,
        {
          method: "POST",
          headers: {
            "content-type":
              "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(
            lessonData
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            "Failed to add lesson"
        );
      }

      toast.success(
        "Lesson added successfully"
      );

      setFormData({
        title: "",
        description: "",
        category: "",
        emotionalTone: "",
        imageUrl: "",
        visibility: "public",
        accessLevel: "free",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.message ||
          "Failed to add lesson"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Add New Lesson
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Lesson Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Category
              </label>

              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Personal Growth">
                  Personal Growth
                </option>

                <option value="Career">
                  Career
                </option>

                <option value="Relationships">
                  Relationships
                </option>

                <option value="Mindset">
                  Mindset
                </option>

                <option value="Mistakes Learned">
                  Mistakes Learned
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Emotional Tone
              </label>

              <select
                name="emotionalTone"
                required
                value={formData.emotionalTone}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
              >
                <option value="">
                  Select Tone
                </option>

                <option value="Motivational">
                  Motivational
                </option>

                <option value="Sad">
                  Sad
                </option>

                <option value="Realization">
                  Realization
                </option>

                <option value="Gratitude">
                  Gratitude
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Image URL (Optional)
            </label>

            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Visibility
              </label>

              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white"
              >
                <option value="public">
                  Public
                </option>

                <option value="private">
                  Private
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Access Level
              </label>

              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                disabled={!isPremium}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="free">
                  Free
                </option>

                {isPremium && (
                  <option value="premium">
                    Premium
                  </option>
                )}
              </select>

              {!isPremium && (
                <p className="mt-2 text-sm text-amber-400">
                  Upgrade to Premium to create
                  paid lessons.
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            {loading
              ? "Adding Lesson..."
              : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
}