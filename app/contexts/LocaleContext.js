"use client";

import React, { createContext, useCallback } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  // Toggle language function
  const toggleLocale = useCallback(() => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    router.push(pathname, { locale: newLocale });
  }, [pathname, currentLocale, router]);

  // Change to specific locale
  const setLocale = useCallback(
    (locale) => {
      if (locale === currentLocale) return;
      router.push(pathname, { locale });
    },
    [pathname, currentLocale, router]
  );

  const value = {
    locale: currentLocale,
    toggleLocale,
    setLocale,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
