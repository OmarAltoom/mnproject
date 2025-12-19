"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function FixedSidebar({ items = [], userRole = "patient" }) {
  const [collapsed, setCollapsed] = useState(false);
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
  };

  return (
    <>
      {/* Fixed Sidebar Container */}
      <div
        className={`fixed left-0 top-0 h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 z-50 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DX</span>
              </div>
              <span className="text-white font-bold text-lg hidden lg:inline">PneumoDetect</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
            title={collapsed ? "فتح الشريط" : "إغلاق الشريط"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const isLogout = item.href === "__logout__";

              if (isLogout) {
                return (
                  <button
                    key="logout"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-red-500/20 transition-all group"
                    title={collapsed ? item.label : ""}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                    isActive
                      ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                  title={collapsed ? item.label : ""}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Info */}
        {!collapsed && (
          <div className="border-t border-slate-700 p-3 text-xs text-slate-400 space-y-1">
            <div className="text-slate-500">الإصدار: 1.0</div>
            <div className="text-slate-500">الحالة: متصل ✓</div>
          </div>
        )}
      </div>

      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div 
        className="main-content-wrapper transition-all duration-300"
        style={{ marginLeft: collapsed ? "80px" : "256px" }}
      />
    </>
  );
}
