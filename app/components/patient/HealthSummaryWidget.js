"use client";

export default function HealthSummaryWidget({ weight, height, bmi, allergies = [], chronic = [] }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">ملخص صحي</h2>
      </header>
      <div className="grid gap-4 p-4 sm:grid-cols-3">
        <Info label="الوزن" value={weight ? `${weight} كجم` : "—"} />
        <Info label="الطول" value={height ? `${height} سم` : "—"} />
        <Info label="BMI" value={bmi ?? "—"} />
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <List label="حساسيات" items={allergies} />
        <List label="أمراض مزمنة" items={chronic} />
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-base font-medium text-gray-900">{value}</div>
    </div>
  );
}

function List({ label, items }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="mb-1 text-sm text-gray-600">{label}</div>
      {items && items.length > 0 ? (
        <ul className="list-disc space-y-1 pl-4 text-sm text-gray-800">
          {items.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500">لا توجد بيانات</div>
      )}
    </div>
  );
}
