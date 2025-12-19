"use client";

import Image from "next/image";

export default function UnifiedTopbar({
  userName,
  avatarUrl,
  notificationsCount = 0,
  onSettings,
  onToggleSidebar,
  actions = [], // Array of { label, icon, onClick, variant: 'primary'|'secondary' }
}) {
  return (
    <header className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger menu */}
        <button
          aria-label="فتح القائمة"
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700"
        >
          ☰
        </button>
        
        {/* Avatar */}
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-700">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={userName || "avatar"}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400 dark:text-gray-500">👤</div>
          )}
        </div>
        
        {/* User name */}
        <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {userName || "—"}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        {notificationsCount !== undefined && (
          <button className="relative rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700">
            الإشعارات
            {notificationsCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                {notificationsCount}
              </span>
            )}
          </button>
        )}

        {/* Custom actions */}
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className={`rounded-md px-3 py-1.5 text-sm ${
              action.variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700"
            }`}
          >
            {action.icon && <span className="mr-1">{action.icon}</span>}
            {action.label}
          </button>
        ))}

        {/* Settings button */}
        {onSettings && (
          <button
            onClick={onSettings}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            الإعدادات
          </button>
        )}
      </div>
    </header>
  );
}
