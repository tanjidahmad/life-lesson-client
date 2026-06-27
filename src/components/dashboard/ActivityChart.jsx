"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ActivityChart({
  lessons,
}) {
  const monthlyData = {};

  lessons.forEach((lesson) => {
    const month = new Date(
      lesson.createdAt
    ).toLocaleString("en-US", {
      month: "short",
    });

    monthlyData[month] =
      (monthlyData[month] || 0) + 1;
  });

  const chartData = Object.entries(
    monthlyData
  ).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={250}
    >
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" />
      </BarChart>
    </ResponsiveContainer>
  );
}