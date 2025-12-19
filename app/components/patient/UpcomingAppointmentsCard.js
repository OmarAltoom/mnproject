"use client";
import { formatDateTime } from "@/app/lib/date";
import useLocale from "@/hooks/useLocale";

export default function UpcomingAppointmentsCard({ appointments = [] }) {
  const { locale } = useLocale();
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">المواعيد القادمة</h2>
      </header>
      <ul className="divide-y divide-gray-100">
        {appointments.length === 0 ? (
          <li className="p-4 text-gray-500">لا توجد مواعيد قادمة</li>
        ) : (
          appointments.map((a) => (
            <li key={a.id} className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <div className="text-sm text-gray-500">الطبيب</div>
                <div className="text-base font-medium text-gray-900">{a.doctorName}</div>
                <div className="text-sm text-gray-700">{a.type}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">الموعد</div>
                <div className="text-base font-medium text-gray-900">{formatDateTime(a.datetime, locale)}</div>
                <StatusBadge status={a.status} />
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function StatusBadge({ status }) {
  const map = {
    confirmed: { label: "مؤكد", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    pending: { label: "منتظر", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  };
  const fallback = { label: status || "—", className: "bg-gray-50 text-gray-700 ring-gray-200" };
  const { label, className } = map[status] || fallback;
  return <span className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-xs ring-1 ring-inset ${className}`}>{label}</span>;
}

