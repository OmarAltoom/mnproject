import Image from "next/image";
import React from "react";
import DoctorChangeRequestsSidebarItem from "./sidebar/DoctorChangeRequestsSidebarItem";
import DashboardSidebarItem from "./sidebar/DashboardSidebarItem";
import UsersSidebarItem from "./sidebar/UsersSidebarItem";
import DoctorsSidebarItem from "./sidebar/DoctorsSidebarItem";
import PatientsSidebarItem from "./sidebar/PatientsSidebarItem";
import AnalysisSidebarItem from "./sidebar/AnalysisSidebarItem";
import ChatSidebarItem from "./sidebar/ChatSidebarItem";
import SettingsSidebarItem from "./sidebar/SettingsSidebarItem";
import LogoutSidebarItem from "./sidebar/LogoutSidebarItem";
import { useTheme } from "@/app/theme-provider";
import useLocale from "@/app/hooks/useLocale";

export default function SidebarNavigation() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const { locale, switchLocale } = useLocale();
  return (
    <aside className="w-full md:w-60 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-full flex flex-col p-4 gap-2" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* شعار PneumoDetect مع أيقونة الرئتين */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 via-red-400 to-red-600 rounded-full shadow-lg">
          <span className="text-xl" aria-label="Lung icon">🫁</span>
        </div>
        <span className="font-black text-lg bg-gradient-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent">PneumoDetect</span>
      </div>
      <nav className="flex flex-col gap-2">
        <DashboardSidebarItem locale={locale} />
        <UsersSidebarItem locale={locale} />
        <DoctorsSidebarItem locale={locale} />
        <PatientsSidebarItem locale={locale} />
        <DoctorChangeRequestsSidebarItem locale={locale} />
        <AnalysisSidebarItem locale={locale} />
        <ChatSidebarItem locale={locale} />
        <SettingsSidebarItem locale={locale} />
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex items-center gap-3 py-2.5 px-4 rounded-xl font-bold text-zinc-700 dark:text-zinc-200 hover:bg-yellow-50 dark:hover:bg-zinc-800 transition group"
          title={isDark ? "الوضع النهاري" : "الوضع الليلي"}
        >
          <span className="text-xl">{isDark ? "☀️" : "🌙"}</span>
          <span className="text-base font-bold">{isDark ? "الوضع النهاري" : "الوضع الليلي"}</span>
        </button>
        <button
          onClick={switchLocale}
          className="flex items-center gap-3 py-2.5 px-4 rounded-xl font-bold text-zinc-700 dark:text-zinc-200 hover:bg-yellow-50 dark:hover:bg-zinc-800 transition group"
          title={locale === "ar" ? "English" : "العربية"}
        >
          <span className="text-xl">🌐</span>
          <span className="text-base font-bold">{locale === "ar" ? "English" : "العربية"}</span>
        </button>
        <LogoutSidebarItem locale={locale} />
      </nav>
    </aside>
  );
}
