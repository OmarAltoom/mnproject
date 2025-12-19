
"use client";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useTheme } from "../theme-provider";

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <button
        disabled
        className="group relative p-3 rounded-full bg-linear-to-br from-yellow-100 to-red-100 dark:from-yellow-900/50 dark:to-red-900/50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Loading..."
      >
        <svg className="w-5 h-5 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative p-3 rounded-full bg-linear-to-br from-yellow-100 to-red-100 dark:from-yellow-900/50 dark:to-red-900/50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "الوضع النهاري" : "الوضع الليلي"}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();
  const homeHref = "/"; // Link will prefix locale automatically

  const handleSwitchLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-linear-to-r from-white/95 via-yellow-50/90 to-red-50/95 dark:from-zinc-900/95 dark:via-zinc-800/90 dark:to-zinc-900/95 border-b border-yellow-200/50 dark:border-yellow-600/20 shadow-lg">
      {/* Animated gradient line at the top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 via-red-400 to-red-600 opacity-70 animate-pulse" />
      
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo Section */}
        <Link href={homeHref} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-red-600 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative flex items-center justify-center w-14 h-14 bg-linear-to-br from-yellow-400 via-red-400 to-red-600 rounded-full shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl drop-shadow-sm" aria-label="Lung icon">🫁</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-2xl bg-linear-to-r from-yellow-600 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-sm">
              {t("brand", { defaultValue: "Detect AI" })}
            </span>
            <div className="text-xs text-yellow-600/80 dark:text-yellow-400/80 font-semibold">
              {t("navTagline", { defaultValue: "Advanced Medical AI" })}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2">
          {!(pathname === "/" || pathname === "/ar" || pathname === "/en") && (
            <li>
              <Link 
                href={homeHref}
                className="group relative px-5 py-2.5 rounded-full font-bold text-yellow-800 dark:text-yellow-200 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Image src="/icons/chat.svg" alt="Home" width={20} height={20} />
                  {t("home", { defaultValue: "الرئيسية" })}
                </span>
                <div className="absolute inset-0 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
            </li>
          )}
          <li>
            <ThemeToggleButton />
          </li>
          <li>
            <button
              className="group relative px-5 py-2.5 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl"
              onClick={handleSwitchLocale}
              aria-label={t("langSwitchAria", { defaultValue: "Switch language" })}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-red-400 to-yellow-400 bg-size-[200%_100%] animate-gradient" />
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-red-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center gap-2 text-white">
                <span className="transform group-hover:rotate-180 transition-transform duration-500">
                  <Image src="/icons/settings.svg" alt="Language" width={20} height={20} className="invert" />
                </span>
                <span className="text-sm font-black tracking-wider">{t("langSwitch", { defaultValue: "EN" })}</span>
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg bg-linear-to-br from-yellow-100 to-red-100 dark:from-yellow-900/50 dark:to-red-900/50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-yellow-800 dark:text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-yellow-200/50 dark:border-yellow-600/20 shadow-2xl animate-fadeIn">
          <ul className="flex flex-col p-4 space-y-2">
            {!(pathname === "/" || pathname === "/ar" || pathname === "/en") && (
              <li>
                <Link 
                  href={homeHref}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-linear-to-r from-yellow-50 to-red-50 dark:from-yellow-900/30 dark:to-red-900/30 font-bold text-yellow-800 dark:text-yellow-200 hover:shadow-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image src="/icons/chat.svg" alt="Home" width={24} height={24} />
                    {t("home", { defaultValue: "الرئيسية" })}
              </Link>
            </li>
            )}
            <li>
              <div className="px-4 py-3">
                <ThemeToggleButton />
              </div>
            </li>
            <li>
              <button
                className="group relative w-full px-4 py-3 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => {
                  handleSwitchLocale();
                  setMobileMenuOpen(false);
                }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-red-400 to-yellow-400 bg-size-[200%_100%] animate-gradient" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-red-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3 text-white">
                  <span className="transform group-hover:rotate-180 transition-transform duration-500">
                    <Image src="/icons/settings.svg" alt="Language" width={24} height={24} className="invert" />
                  </span>
                  <span className="font-black tracking-wider">{t("langSwitch", { defaultValue: "EN" })}</span>
                </span>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Animated gradient line at the bottom */}
      <div className="absolute left-0 bottom-0 w-full h-0.5 bg-linear-to-r from-yellow-400 via-red-400 to-red-600 opacity-50" />
    </header>
  );
}
