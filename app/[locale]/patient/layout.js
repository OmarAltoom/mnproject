"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../../theme-provider";
import { useLocaleContext } from "../../hooks/useLocaleContext";

export default function PatientLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { toggleLocale } = useLocaleContext();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const basePath = locale === "en" ? "/en" : "/ar";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bilingual labels
  const navLabels = locale === "en" ? {
    home: "Home",
    appointments: "Appointments",
    results: "Results",
    chat: "Messages",
    profile: "Profile",
    logout: "Logout",
    brand: "PneumoDetect",
    lightTheme: "Light Mode",
    darkTheme: "Dark Mode",
    version: "v1.0.0",
    status: "Active"
  } : {
    home: "الرئيسية",
    appointments: "المواعيد",
    results: "النتائج",
    chat: "الرسائل",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    brand: "PneumoDetect",
    lightTheme: "الوضع الفاتح",
    darkTheme: "الوضع الداكن",
    version: "v1.0.0",
    status: "نشط"
  };

  const patientNavItems = [
    { href: `${basePath}/patient/dashboard`, label: navLabels.home, icon: "🏠" },
    { href: `${basePath}/patient/appointments`, label: navLabels.appointments, icon: "📅" },
    { href: `${basePath}/patient/results`, label: navLabels.results, icon: "📄" },
    { href: `${basePath}/patient/chat`, label: navLabels.chat, icon: "💬" },
    { href: `${basePath}/patient/profile`, label: navLabels.profile, icon: "👤" },
    { href: "__logout__", label: navLabels.logout, icon: "🚪" },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
    router.push(`${basePath}/patient/logout`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Fixed Sidebar */}
      <div
        className={`fixed ${locale === "ar" ? "right-0" : "left-0"} top-0 h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-2xl transition-all duration-300 z-50 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-red-600 rounded-full blur opacity-40" />
                <div className="relative flex items-center justify-center w-10 h-10 bg-linear-to-br from-yellow-400 via-red-400 to-red-600 rounded-full shadow-lg">
                  <span className="text-xl" aria-label="Lung icon">🫁</span>
                </div>
              </div>
              <span className="font-black text-lg bg-linear-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent">{navLabels.brand}</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
            title={collapsed ? (locale === "ar" ? "فتح الشريط" : "Expand sidebar") : (locale === "ar" ? "إغلاق الشريط" : "Collapse sidebar")}
          >
            {collapsed ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {patientNavItems.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const isLogout = item.href === "__logout__";

              if (isLogout) {
                return (
                  <button
                    key="logout"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-linear-to-r from-yellow-500 to-red-500 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700/50"
                  }`}
                  title={collapsed ? item.label : ""}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                </Link>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-all w-full"
              title={collapsed ? (isDark ? navLabels.lightTheme : navLabels.darkTheme) : ""}
            >
              <span className="text-lg shrink-0">{mounted ? (isDark ? "☀️" : "🌙") : "🌙"}</span>
              {!collapsed && <span className="text-sm font-medium">{mounted ? (isDark ? navLabels.lightTheme : navLabels.darkTheme) : navLabels.darkTheme}</span>}
            </button>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all w-full"
              title={collapsed ? "تبديل اللغة" : ""}
            >
              <span className="text-lg shrink-0">🌐</span>
              {!collapsed && <span className="text-sm font-medium">{locale === "ar" ? "English" : "العربية"}</span>}
            </button>
          </div>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-gray-200 dark:border-zinc-700 p-3 text-xs text-gray-500 dark:text-zinc-400 space-y-1">
            <div>{navLabels.version}</div>
            <div>{navLabels.status}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? (locale === "ar" ? "mr-20" : "ml-20") : (locale === "ar" ? "mr-64" : "ml-64")
        }`}
      >
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
}
