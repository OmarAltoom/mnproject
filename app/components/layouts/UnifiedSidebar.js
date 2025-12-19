"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function UnifiedSidebar({ items = [], onLogout, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";

  const buildPath = (targetLocale, path = pathname || "/") => {
    const clean = path.replace(/^\/(en|ar)/, "");
    const normalized = clean.startsWith("/") ? clean : `/${clean}`;
    return `/${targetLocale}${normalized}`;
  };

  const handleLogout = () => {
    router.push(buildPath(locale, "/login"));
    onClose?.();
  };

  return (
    <>
      {/* Permanent sidebar on large screens */}
      <aside className="sticky top-4 hidden w-72 shrink-0 rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm lg:block dark:border-slate-700 dark:bg-slate-800/70">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const isLogout = item.href === "__logout__";

            if (isLogout) {
              return (
                <button
                  key="logout"
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-700"
                  onClick={handleLogout}
                >
                  <span aria-hidden>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                <span aria-hidden>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay sidebar */}
      {onClose && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
          <aside
            className="fixed inset-y-0 right-0 z-50 w-72 rounded-l-xl border border-gray-200 bg-white/90 p-4 shadow-lg transition-transform lg:hidden dark:border-slate-700 dark:bg-slate-800/90"
            style={{ transform: typeof onClose === "function" ? "translateX(0)" : "translateX(100%)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                القائمة
              </div>
              <button
                onClick={onClose}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600"
              >
                إغلاق
              </button>
            </div>
            <nav className="space-y-1">
              {items.map((item) => {
                const isActive = pathname?.startsWith(item.href);
                const isLogout = item.href === "__logout__";

                if (isLogout) {
                  return (
                    <button
                      key="logout"
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-700"
                      onClick={() => {
                        handleLogout();
                        onClose?.();
                      }}
                    >
                      <span aria-hidden>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-slate-700"
                    }`}
                    onClick={onClose}
                  >
                    <span aria-hidden>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
