import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="text-center text-gray-400 py-8">
      <p>{message || "لا توجد بيانات لعرضها."}</p>
    </div>
  );
}
