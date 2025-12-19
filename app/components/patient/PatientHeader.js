"use client";

import Image from "next/image";

export default function PatientHeader({ fullName, avatarUrl, notificationsCount = 0, onSettings, onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* زر همبرغر يظهر على الشاشات الصغيرة */}
        <button
          aria-label="فتح القائمة"
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 lg:hidden"
        >
          ☰
        </button>
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={fullName || "avatar"}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">👤</div>
          )}
        </div>
        <div className="text-base font-semibold text-gray-900">{fullName || "—"}</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100">
          الإشعارات
          {notificationsCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
              {notificationsCount}
            </span>
          )}
        </button>
        <button onClick={onSettings} className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black">الإعدادات</button>
      </div>
    </header>
  );
}
