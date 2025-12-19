import React from "react";

export default function ConfirmDialog({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        <p className="mb-4">{message || "هل أنت متأكد؟"}</p>
        <div className="flex gap-4">
          <button onClick={onConfirm} className="px-4 py-2 bg-green-500 text-white rounded">تأكيد</button>
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
        </div>
      </div>
    </div>
  );
}
