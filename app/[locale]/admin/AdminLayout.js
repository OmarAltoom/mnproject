"use client";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function AdminLayout({ children, breadcrumbs, adminName = "المسؤول", adminImage = "/admin-placeholder.png" }) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const [collapsed, setCollapsed] = useState(false);
  // عرض الشريط الجانبي
  const sidebarWidth = collapsed ? 80 : 256; // w-20 أو w-64 بالبكسل
  const marginStyle = locale === "ar"
    ? { marginRight: `${sidebarWidth}px` }
    : { marginLeft: `${sidebarWidth}px` };
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-950`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div style={{ position: "fixed", top: 0, [locale === "ar" ? "right" : "left"]: 0, height: "100vh", width: `${sidebarWidth}px`, zIndex: 50 }}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className="flex-1" style={marginStyle}>
        {children}
      </div>
    </div>
  );
}
