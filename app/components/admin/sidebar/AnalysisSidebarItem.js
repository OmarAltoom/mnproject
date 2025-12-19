"use client";

import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function AnalysisSidebarItem() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";

  return (
    <Link href={`${basePrefix}/admin/analysis`} className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-yellow-50 dark:hover:bg-zinc-800 font-bold text-zinc-700 dark:text-zinc-200 transition group">
      <FaChartLine className="text-yellow-500 text-lg group-hover:scale-110 transition-transform" />
      <span>{locale === "ar" ? "التحليلات" : "Analysis"}</span>
    </Link>
  );
}
