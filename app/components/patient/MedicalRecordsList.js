"use client";

export default function MedicalRecordsList({ records = [], onView }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">التقارير والصور الشعاعية</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>الملف</Th>
              <Th>النوع</Th>
              <Th>تاريخ الفحص</Th>
              <Th>حالة التقرير</Th>
              <Th>إجراء</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {records.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={5}>لا توجد سجلات</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <Td className="font-mono">{r.name}</Td>
                  <Td>{typeLabel(r.type)}</Td>
                  <Td>{formatDate(r.date)}</Td>
                  <Td>
                    <StatusBadge status={r.status} />
                  </Td>
                  <Td>
                    <button
                      onClick={() => onView?.(r)}
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                    >
                      عرض التفصيل
                    </button>
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
    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">{children}</th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-right text-gray-900 ${className}`}>{children}</td>;
}
function StatusBadge({ status }) {
  const map = {
    ready: { label: "جاهز", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    processing: { label: "قيد الإعداد", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  };
  const fallback = { label: status || "—", className: "bg-gray-50 text-gray-700 ring-gray-200" };
  const { label, className } = map[status] || fallback;
  return <span className={`inline-flex rounded-md px-2.5 py-1 text-sm ring-1 ring-inset ${className}`}>{label}</span>;
}
function typeLabel(type) {
  const map = { xray: "X-Ray", mri: "MRI", ct: "CT" };
  return map[type] || type || "—";
}
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}
