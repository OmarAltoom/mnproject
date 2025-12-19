import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        {children}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">إغلاق</button>
      </div>
    </div>
  );
}
