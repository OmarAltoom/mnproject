
"use client";


import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";
  
  useEffect(() => {
    router.push(basePrefix);
  }, [router, basePrefix]);
  return null;
}
