import React, { useState } from "react";
import NotificationBell from "../ui/NotificationBell";

export default function AdminTopbar() {
  const [notifications] = useState([
    { id: 1, title: "مستخدم جديد", message: "تم إضافة مستخدم جديد للنظام", time: "منذ 5 دقائق", read: false },
    { id: 2, title: "فحص جديد", message: "تم رفع فحص طبي جديد للمراجعة", time: "منذ 15 دقيقة", read: false },
    { id: 3, title: "تنبيه النظام", message: "استخدام الذاكرة 85%", time: "منذ 30 دقيقة", read: true }
  ]);

  return (
    <header className="w-full h-16 bg-linear-to-r from-yellow-400 via-red-400 to-red-700 flex items-center justify-between px-6 shadow">
      <h2 className="text-xl font-bold text-white">لوحة تحكم الأدمن</h2>
      <NotificationBell notifications={notifications} />
    </header>
  );
}
