"use client";
import { formatDateTimeASCII } from "@/app/lib/date";

export default function PatientNotifications({ items = [] }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">الإشعارات</h2>
      </header>
      <ul className="divide-y divide-gray-100">
        {items.length === 0 ? (
          <li className="p-4 text-gray-500">لا توجد إشعارات</li>
        ) : (
          items.map((n) => (
            <li key={n.id} className="flex items-start justify-between p-4">
              <div>
                <div className="text-sm font-medium text-gray-900">{n.title}</div>
                <div className="text-sm text-gray-700">{n.description}</div>
              </div>
              <span className="text-xs text-gray-500">{formatDateTimeASCII(n.datetime)}</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
