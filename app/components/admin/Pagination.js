import React from "react";

export default function Pagination({ current, total, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 my-4">
      <button disabled={current === 1} onClick={() => onPageChange(current - 1)} className="px-2 py-1 bg-gray-200 rounded">السابق</button>
      <span>{current} / {total}</span>
      <button disabled={current === total} onClick={() => onPageChange(current + 1)} className="px-2 py-1 bg-gray-200 rounded">التالي</button>
    </div>
  );
}
