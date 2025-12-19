"use client";

import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function LogoutSidebarItem() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";

  return (
    <Link href={`${basePrefix}/admin/logout`} className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 font-bold transition group">
      <FaSignOutAlt className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
      <span>{locale === "ar" ? "تسجيل الخروج" : "Logout"}</span>
    </Link>
  );
}
