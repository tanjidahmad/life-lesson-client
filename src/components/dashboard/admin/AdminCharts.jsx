"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AdminCharts({
  lessonGrowth,
  userGrowth,
}) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">

      {/* Lesson Growth */}
      <div className="rounded-2xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Lesson Growth
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={lessonGrowth}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Lessons"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth */}
      <div className="rounded-2xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">
          User Growth
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={userGrowth}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#06b6d4"
              strokeWidth={3}
              name="Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}