import { useState } from "react";

export default function NotificationSettings() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-100 max-w-xl mx-auto mt-8">
      <h3 className="font-bold text-xl mb-4 text-yellow-700">إعدادات الإشعارات</h3>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
        تفعيل الإشعارات
      </label>
    </div>
  );
}
