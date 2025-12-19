"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useTheme } from "../../theme-provider";
import { useLocaleContext } from "../../hooks/useLocaleContext";

export default function DoctorLayout({ 
  children, 
  doctorName = "د. أحمد", 
  profileImage = "/default-doctor.png", 
  breadcrumbs = [] 
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toggleLocale } = useLocaleContext();
  const localeValue = useLocale();
  // Use context locale directly to avoid hydration mismatch (pathname is client-only)
  const locale = localeValue || "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";
  const isDark = theme === "dark";

  const ui = locale === "en"
    ? {
        collapseOpen: "Expand sidebar",
        collapseClose: "Collapse sidebar",
        themeLight: "Light mode",
        themeDark: "Dark mode",
        switchTo: "العربية",
        switchToEn: "English",
      }
    : {
        collapseOpen: "فتح الشريط",
        collapseClose: "إغلاق الشريط",
        themeLight: "الوضع النهاري",
        themeDark: "الوضع الليلي",
        switchTo: "English",
        switchToEn: "English",
      };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation labels with inline defaults per locale
  const nav = locale === "en"
    ? {
        home: "Home",
        patients: "Patients",
        results: "Results",
        chat: "Chat",
        appointments: "Appointments",
        analytics: "Analytics",
        notifications: "Notifications",
        settings: "Settings",
        logout: "Logout",
      }
    : {
        home: "الرئيسية",
        patients: "المرضى",
        results: "النتائج",
        chat: "المحادثات",
        appointments: "المواعيد",
        analytics: "التحليلات",
        notifications: "الإشعارات",
        settings: "الإعدادات",
        logout: "تسجيل الخروج",
      };

  const doctorNavItems = [
    { href: `${basePrefix}/doctor/dashboard`, label: nav.home, icon: "🏠" },
    { href: `${basePrefix}/doctor/patients`, label: nav.patients, icon: "👥" },
    { href: `${basePrefix}/doctor/results`, label: nav.results, icon: "🩻" },
    { href: `${basePrefix}/doctor/chat`, label: nav.chat, icon: "💬" },
    { href: `${basePrefix}/doctor/appointments`, label: nav.appointments, icon: "📅" },
    { href: `${basePrefix}/doctor/analytics`, label: nav.analytics, icon: "📊" },
    { href: `${basePrefix}/doctor/notifications`, label: nav.notifications, icon: "🔔" },
    { href: `${basePrefix}/doctor/settings`, label: nav.settings, icon: "⚙️" },
    { href: "__logout__", label: nav.logout, icon: "🚪" },
  ];

  const handleLogout = () => {
    router.push(`${basePrefix}`);
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
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-zinc-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full blur opacity-40" />
                <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 via-red-400 to-red-600 rounded-full shadow-lg">
                  <span className="text-xl" aria-label="Lung icon">🫁</span>
                </div>
              </div>
              <span className="font-black text-lg bg-gradient-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent">PneumoDetect</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
            title={collapsed ? ui.collapseOpen : ui.collapseClose}
          >
            {collapsed ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {doctorNavItems.map((item) => {
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
                <a
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
                </a>
              );
            })}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-all w-full"
              title={collapsed ? (isDark ? ui.themeLight : ui.themeDark) : ""}
            >
              <span className="text-lg shrink-0">{mounted && isDark ? "☀️" : "🌙"}</span>
              {!collapsed && <span className="text-sm font-medium">{mounted ? (isDark ? ui.themeLight : ui.themeDark) : "..."}</span>}
            </button>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all w-full"
              title={collapsed ? (locale === "ar" ? ui.switchToEn : "العربية") : ""}
            >
              <span className="text-lg shrink-0">🌐</span>
              {!collapsed && <span className="text-sm font-medium">{mounted ? (locale === "ar" ? ui.switchToEn : "العربية") : "..."}</span>}
            </button>
          </div>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-gray-200 dark:border-zinc-700 p-3 text-xs text-gray-500 dark:text-zinc-400 space-y-1">
            <div>{locale === "en" ? "Version 1.0.0" : "الإصدار 1.0.0"}</div>
            <div>{locale === "en" ? "All systems operational" : "جميع الأنظمة تعمل"}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        locale === "ar"
          ? collapsed ? "mr-20" : "mr-64"
          : collapsed ? "ml-20" : "ml-64"
      }`}>
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
