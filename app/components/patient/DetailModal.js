"use client";

export default function DetailModal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-lg">
        <header className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-200">إغلاق</button>
        </header>
        <div className="p-4 text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
}
