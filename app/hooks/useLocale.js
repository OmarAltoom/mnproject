"use client";

import { useCallback } from "react";
import { useLocale as useIntlLocale, useMessages } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function useLocale() {
  const locale = useIntlLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = useMessages();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const buildPath = useCallback(
    (targetLocale, path = pathname) => {
      const cleanPath = path.replace(/^\/(en|ar)/, "");
      const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
      return `/${targetLocale}${normalized}`;
    },
    [pathname]
  );

  const switchLocale = useCallback(() => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(buildPath(nextLocale));
  }, [locale, pathname, router, buildPath]);

  return {
    locale,
    dir,
    isRTL: dir === "rtl",
    t: messages,
    switchLocale,
    buildPath,
  };
}
