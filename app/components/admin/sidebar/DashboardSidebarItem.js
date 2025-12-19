"use client";

import Link from "next/link";
import { FaTachometerAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function DashboardSidebarItem() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";

  return (
    <Link href={`${basePrefix}/admin/dashboard`} className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-yellow-50 dark:hover:bg-zinc-800 font-bold text-zinc-700 dark:text-zinc-200 transition group">
      <FaTachometerAlt className="text-yellow-500 text-lg group-hover:scale-110 transition-transform" />
      <span>{locale === "ar" ? "لوحة التحكم" : "Dashboard"}</span>
    </Link>
  );
}
