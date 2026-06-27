"use client";

 import { useSession } from "@/lib/auth-client";
 import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import React, { useState } from 'react';

export default function PricingPage() {
   const router = useRouter();
  const { data: session } =
    useSession();

  const currentPlan =
    session?.user?.plan || "free";
   

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-white">
          Pricing & Upgrade
        </h1>

        <p className="mx-auto max-w-3xl text-zinc-400">
          Upgrade to Premium and unlock exclusive
          lessons, premium content creation, and
          additional community benefits.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        {/* Free */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="mb-2 text-3xl font-bold text-white">
            Free Plan
          </h2>

          <p className="mb-6 text-zinc-400">
            Perfect for exploring and sharing
            public life lessons.
          </p>

          <div className="mb-6">
            <h3 className="text-4xl font-bold text-white">
              ৳0
            </h3>

            <p className="text-zinc-500">
              Forever Free
            </p>
          </div>

          <ul className="space-y-3 text-zinc-300">
            <li>✓ Access Public Lessons</li>
            <li>✓ Create Free Lessons</li>
            <li>✓ Like Lessons</li>
            <li>✓ Save Favorites</li>
            <li>✓ Comment on Lessons</li>
          </ul>

          <button
            disabled
            className="mt-8 w-full rounded-2xl bg-zinc-800 px-5 py-3 font-semibold text-white"
          >
            {currentPlan === "free"
              ? "Current Plan"
              : "Free Plan"}
          </button>
        </div>

        {/* Premium */}
        <div className="rounded-3xl border border-amber-500 bg-zinc-900 p-8">
          <div className="mb-4 inline-block rounded-full bg-amber-500 px-4 py-1 text-sm font-semibold text-black">
            Premium ⭐
          </div>

          <h2 className="mb-2 text-3xl font-bold text-white">
            Premium Plan
          </h2>

          <p className="mb-6 text-zinc-400">
            Unlock all premium features and
            premium lessons forever.
          </p>

          <div className="mb-6">
            <h3 className="text-4xl font-bold text-white">
              ৳1500
            </h3>

            <p className="text-zinc-500">
              One-Time Payment
            </p>

            <p className="text-zinc-500">
              Lifetime Access
            </p>
          </div>

          <ul className="space-y-3 text-zinc-300">
            <li>✓ Access Premium Lessons</li>
            <li>✓ Create Premium Lessons</li>
            <li>✓ All Free Features</li>
            <li>✓ Priority Listing</li>
            <li>✓ Community Badge</li>
            <li>✓ Ad-Free Experience</li>
          </ul>

          {currentPlan === "premium" ? (
  <button
    disabled
    className="mt-8 w-full rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-black"
  >
    Current Plan
  </button>
) : (
  // ===== STRIPE CHECKOUT FORM START =====
  <form
  action="/api/checkout_sessions"
  method="POST"
  className="mt-8"
  onSubmit={(e) => {
    if (!session?.user) {
      e.preventDefault();

      toast.error(
        "Please login first"
      );

      router.push("/login");

      return;
    }
  }}
>
  <input
    type="hidden"
    name="plan_id"
    value="premium"
  />

  {session?.user?.email && (
    <input
      type="hidden"
      name="email"
      value={session.user.email}
    />
  )}

  <button
    type="submit"
    className="w-full rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:opacity-90"
  >
    Upgrade to Premium
  </button>
</form>
  // ===== STRIPE CHECKOUT FORM END =====
)}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-3xl font-bold text-white">
            Free vs Premium Comparison
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="p-4 text-left text-white">
                  Features
                </th>

                <th className="p-4 text-center text-white">
                  Free
                </th>

                <th className="p-4 text-center text-white">
                  Premium
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="p-4 text-zinc-300">
                  Create Lessons
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>

              <tr className="border-b border-zinc-800">
                <td className="p-4 text-zinc-300">
                  Premium Lesson Creation
                </td>

                <td className="p-4 text-center text-red-500">
                  ✕
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>

              <tr className="border-b border-zinc-800">
                <td className="p-4 text-zinc-300">
                  Premium Lesson Access
                </td>

                <td className="p-4 text-center text-red-500">
                  ✕
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>

              <tr className="border-b border-zinc-800">
                <td className="p-4 text-zinc-300">
                  Ad-Free Experience
                </td>

                <td className="p-4 text-center text-red-500">
                  ✕
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>

              <tr className="border-b border-zinc-800">
                <td className="p-4 text-zinc-300">
                  Priority Listing
                </td>

                <td className="p-4 text-center text-red-500">
                  ✕
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>

              <tr className="border-b border-zinc-800">
                <td className="p-4 text-zinc-300">
                  Community Badge
                </td>

                <td className="p-4 text-center text-red-500">
                  ✕
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>

              <tr>
                <td className="p-4 text-zinc-300">
                  Lifetime Access
                </td>

                <td className="p-4 text-center text-red-500">
                  ✕
                </td>

                <td className="p-4 text-center text-green-500">
                  ✓
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}