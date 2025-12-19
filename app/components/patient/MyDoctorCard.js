"use client";

export default function MyDoctorCard({ name, specialty, status, contact }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">طبيبي</h2>
      </header>
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="text-base font-semibold text-gray-900">{name || "—"}</div>
          <div className="text-sm text-gray-700">{specialty || "—"}</div>
          <StatusBadge status={status} />
        </div>
        <div className="text-right text-sm text-gray-700">
          {contact?.email && <div>البريد: {contact.email}</div>}
          {contact?.phone && <div>الهاتف: {contact.phone}</div>}
          <button className="mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700">طلب استشارة</button>
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const map = {
    online: { label: "متاح", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    offline: { label: "غير متاح", className: "bg-gray-50 text-gray-700 ring-gray-200" },
  };
  const fallback = { label: status || "—", className: "bg-gray-50 text-gray-700 ring-gray-200" };
  const { label, className } = map[status] || fallback;
  return <span className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-xs ring-1 ring-inset ${className}`}>{label}</span>;
}
