import React from "react";

export default function AnalysesChart() {
  // رسم بياني وهمي
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-red-200 mt-8">
      <h3 className="font-bold text-lg mb-4 text-red-700">رسم بياني للتحليلات</h3>
      <div className="w-full h-32 bg-linear-to-r from-yellow-100 via-red-100/40 to-white rounded-xl" />
    </div>
  );
}
