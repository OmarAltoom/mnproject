"use client";

import Image from "next/image";

export default function PatientProfileCard({
  fullName,
  age,
  gender,
  patientId,
  healthStatus,
  avatarUrl,
}) {
  const displayGender = gender === "male" ? "ذكر" : gender === "female" ? "أنثى" : gender || "—";

  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm p-4 md:p-6">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={fullName || "Patient Avatar"} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">👤</div>
          )}
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <div className="text-sm text-gray-500">الاسم الكامل</div>
            <div className="text-base font-semibold text-gray-900">{fullName || "—"}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-gray-500">العمر</div>
              <div className="text-base font-medium text-gray-900">{age ?? "—"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">الجنس</div>
              <div className="text-base font-medium text-gray-900">{displayGender}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">رقم المريض (Patient ID)</div>
            <div className="font-mono text-base font-medium text-gray-900">{patientId || "—"}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">الحالة الصحية العامة</div>
            <HealthStatusBadge status={healthStatus} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HealthStatusBadge({ status }) {
  const map = {
    stable: { label: "مستقرة", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    attention: { label: "تحتاج متابعة", className: "bg-amber-50 text-amber-700 ring-amber-200" },
    critical: { label: "حرجة", className: "bg-red-50 text-red-700 ring-red-200" },
  };
  const fallback = { label: status || "غير محددة", className: "bg-gray-50 text-gray-700 ring-gray-200" };
  const { label, className } = map[status] || fallback;

  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium ring-1 ring-inset ${className}`}>
      {label}
    </span>
  );
}
