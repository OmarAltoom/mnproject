"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PatientLogoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const basePrefix = locale === "en" ? "/en" : "/ar";
  
  useEffect(() => {
    // Clear any auth tokens/data here if needed
    localStorage.clear();
    sessionStorage.clear();
    router.replace(basePrefix);
  }, [router, basePrefix]);
  return null;
}
