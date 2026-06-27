// "use client";

// import {
//   getFavorites,
//   removeFavorite,
// } from "@/lib/api/lessons";

// import { useSession } from "@/lib/auth-client";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function MyFavoritesPage() {
//   const { data: session } =
//     useSession();

//   const [favorites, setFavorites] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     const loadFavorites =
//       async () => {
//         if (
//           !session?.user?.email
//         )
//           return;

//         try {
//           const data =
//             await getFavorites(
//               session.user.email
//             );

//           setFavorites(data || []);
//         } catch (error) {
//           console.log(error);
//         } finally {
//           setLoading(false);
//         }
//       };

//     loadFavorites();
//   }, [session?.user?.email]);

//   const handleRemove =
//     async (id) => {
//       try {
//         await removeFavorite(id);

//         setFavorites((prev) =>
//           prev.filter(
//             (item) =>
//               item._id !== id
//           )
//         );

//         toast.success(
//           "Removed from favorites"
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     };

//   if (loading) {
//     return (
//       <div className="flex h-[500px] items-center justify-center">
//         <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (
//     favorites.length === 0
//   ) {
//     return (
//       <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
//         <h2 className="mb-2 text-3xl font-bold text-white">
//           No Favorite Lessons
//         </h2>

//         <p className="text-zinc-400">
//           You have not saved any
//           lessons yet.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-10">
//       <h1 className="mb-8 text-4xl font-bold text-white">
//         My Favorites
//       </h1>

//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {favorites.map(
//           (favorite) => (
//             <div
//               key={favorite._id}
//               className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
//             >
//               <h2 className="mb-3 text-xl font-bold text-white">
//                 {
//                   favorite
//                     ?.lesson
//                     ?.title
//                 }
//               </h2>

//               <div className="space-y-2 text-sm text-zinc-400">
//                 <p>
//                   Category:
//                   {" "}
//                   {
//                     favorite
//                       ?.lesson
//                       ?.category
//                   }
//                 </p>

//                 <p>
//                   Emotional Tone:
//                   {" "}
//                   {
//                     favorite
//                       ?.lesson
//                       ?.emotionalTone
//                   }
//                 </p>

//                 <p>
//                   Access Level:
//                   {" "}
//                   {
//                     favorite
//                       ?.lesson
//                       ?.accessLevel
//                   }
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   handleRemove(
//                     favorite._id
//                   )
//                 }
//                 className="mt-5 rounded-xl bg-red-600 px-4 py-2 font-medium text-white"
//               >
//                 Remove Favorite
//               </button>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyFavoritesPage() {
  const { data: session } = useSession();

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadFavorites =
      async () => {
        if (!session?.user?.email)
          return;

        try {
          const { data: tokenData } =
            await authClient.token();

          const res = await fetch(
            `${baseUrl}/api/favorites/${session.user.email}`,
            {
              method: "GET",
              headers: {
                "content-type":
                  "application/json",
                authorization: `Bearer ${tokenData?.token}`,
              },
              cache: "no-store",
            }
          );

          const data = await res.json();

          setFavorites(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.log(error);
          toast.error(
            "Failed to load favorites"
          );
        } finally {
          setLoading(false);
        }
      };

    loadFavorites();
  }, [session?.user?.email, baseUrl]);

  const handleRemove =
    async (id) => {
      try {
        const { data: tokenData } =
          await authClient.token();

        const res = await fetch(
          `${baseUrl}/api/favorites/${id}`,
          {
            method: "DELETE",
            headers: {
              "content-type":
                "application/json",
              authorization: `Bearer ${tokenData?.token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
              "Failed to remove favorite"
          );
        }

        setFavorites((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );

        toast.success(
          "Removed from favorites"
        );
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to remove favorite"
        );
      }
    };

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">
          No Favorite Lessons
        </h2>

        <p className="text-zinc-400">
          You have not saved any
          lessons yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        My Favorites
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map(
          (favorite) => (
            <div
              key={favorite._id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h2 className="mb-3 text-xl font-bold text-white">
                {
                  favorite
                    ?.lesson
                    ?.title
                }
              </h2>

              <div className="space-y-2 text-sm text-zinc-400">
                <p>
                  Category:{" "}
                  {
                    favorite
                      ?.lesson
                      ?.category
                  }
                </p>

                <p>
                  Emotional Tone:{" "}
                  {
                    favorite
                      ?.lesson
                      ?.emotionalTone
                  }
                </p>

                <p>
                  Access Level:{" "}
                  {
                    favorite
                      ?.lesson
                      ?.accessLevel
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  handleRemove(
                    favorite._id
                  )
                }
                className="mt-5 rounded-xl bg-red-600 px-4 py-2 font-medium text-white"
              >
                Remove Favorite
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}