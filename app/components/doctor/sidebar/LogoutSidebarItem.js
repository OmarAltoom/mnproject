"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogoutSidebarItem() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";

  return (
    <Link href={`${basePrefix}/doctor/logout`} className="py-2 px-4 rounded text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 font-medium block">
      Logout
    </Link>
  );
}
