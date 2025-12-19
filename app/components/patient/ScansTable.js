"use client";
import { formatDate } from "@/app/lib/date";
import useLocale from "@/hooks/useLocale";

export default function ScansTable({ scans = [], onView, onDownload, onRequestReview }) {
  const { locale } = useLocale();
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">فحوصاتي</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>رقم الفحص</Th>
              <Th>النوع</Th>
              <Th>تاريخ الرفع</Th>
              <Th>الحالة</Th>
              <Th>ملخص الذكاء الاصطناعي</Th>
              <Th>ملاحظات الطبيب</Th>
              <Th>إجراءات</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {scans.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={7}>
                  لا توجد فحوصات حتى الآن
                </td>
              </tr>
            ) : (
              scans.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <Td className="font-mono">{s.id}</Td>
                  <Td>{typeLabel(s.type)}</Td>
                  <Td>{formatDate(s.date, locale)}</Td>
                  <Td>
                    <StatusBadge status={s.status} />
                  </Td>
                  <Td className="text-sm text-gray-700">{s.aiSummary || "—"}</Td>
                  <Td className="text-sm text-gray-700">{s.doctorNotes || "—"}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      <ActionButton onClick={() => onView?.(s)}>عرض</ActionButton>
                      <ActionButton onClick={() => onDownload?.(s)} variant="secondary">
                        تنزيل
                      </ActionButton>
                      <ActionButton onClick={() => onRequestReview?.(s)} variant="accent">
                        طلب مراجعة
                      </ActionButton>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-right text-gray-900 ${className}`}>{children}</td>;
}

function StatusBadge({ status }) {
  const map = {
    reviewed: { label: "تمت المراجعة", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    pending: { label: "قيد المراجعة", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  };
  const fallback = { label: status || "غير معروف", className: "bg-gray-50 text-gray-700 ring-gray-200" };
  const { label, className } = map[status] || fallback;
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium ring-1 ring-inset ${className}`}>
      {label}
    </span>
  );
}

function typeLabel(type) {
  const map = { xray: "أشعة سينية", ct: "أشعة مقطعية", mri: "تصوير بالرنين" };
  return map[type] || type || "—";
}


function ActionButton({ children, onClick, variant = "primary" }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
    accent: "bg-indigo-600 hover:bg-indigo-700 text-white",
  };
  return (
    <button onClick={onClick} className={`rounded-md px-3 py-1.5 text-sm transition ${variants[variant]}`}>
      {children}
    </button>
  );
}
