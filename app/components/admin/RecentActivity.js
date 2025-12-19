import React from "react";

export default function RecentActivity() {
  const activities = [
    { id: 1, text: "تم إضافة مستخدم جديد: أحمد علي", time: "قبل دقيقة" },
    { id: 2, text: "تم تعديل بيانات مريض: منى عبد الله", time: "قبل 5 دقائق" },
    { id: 3, text: "تم حذف طبيب: د. سامي يوسف", time: "قبل 10 دقائق" },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-100 mt-8">
      <h3 className="font-bold text-lg mb-4 text-yellow-700">آخر الأنشطة</h3>
      <ul className="space-y-3">
        {activities.map(act => (
          <li key={act.id} className="flex justify-between text-zinc-700">
            <span>{act.text}</span>
            <span className="text-xs text-zinc-400">{act.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
