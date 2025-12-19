import React from "react";

export default function DashboardCard({ icon, title, value, color }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 ${color || 'border-yellow-200'}`}>
      <div className="mb-3 text-4xl">{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-zinc-700">{title}</div>
    </div>
  );
}
