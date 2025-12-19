"use client";

export default function PreviousAppointmentsCard({ visits = [], onViewDetails }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">الزيارات السابقة</h2>
      </header>
      <ul className="divide-y divide-gray-100">
        {visits.length === 0 ? (
          <li className="p-4 text-gray-500">لا يوجد سجل زيارات</li>
        ) : (
          visits.map((v) => (
            <li key={v.id} className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <div className="text-sm text-gray-500">التاريخ</div>
                <div className="text-base font-medium text-gray-900">{formatDate(v.date)}</div>
                <div className="text-sm text-gray-700">{v.type}</div>
                <div className="text-sm text-gray-700">الطبيب: {v.doctorName}</div>
              </div>
              <button
                onClick={() => onViewDetails?.(v)}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                عرض التفاصيل
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}
