"use client";

import { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }

  return context;
}
