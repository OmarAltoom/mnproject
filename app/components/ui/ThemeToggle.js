"use client";

import { useTheme } from "@/app/theme-provider";

export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
        dark ? "bg-zinc-800 text-white" : "bg-yellow-200 text-yellow-800"
      } ${className}`}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <span className="font-semibold">{dark ? "داكن" : "فاتح"}</span>
    </button>
  );
}
