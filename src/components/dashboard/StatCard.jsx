import React from "react";

export const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-400">
          {title}
        </h3>

        <Icon className="size-6 text-violet-400" />
      </div>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
};