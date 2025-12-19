"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebarItem() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";

  return (
    <Link href={`${basePrefix}/doctor/dashboard`} className="py-2 px-4 rounded hover:bg-blue-100 dark:hover:bg-zinc-800 font-medium block">
      Dashboard
    </Link>
  );
}
