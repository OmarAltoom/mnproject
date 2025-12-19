import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";
import { ThemeProvider } from "../theme-provider";
import { LocaleProvider } from "../contexts/LocaleContext";
import SkipToContent from "../components/ui/SkipToContent";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleProvider>
        <ThemeProvider>
          <SkipToContent />
          {/* Animated SVG Background */}
          <div className="fixed inset-0 -z-50 w-full h-full pointer-events-none select-none">
            <Image src="/animated-bg.svg" alt="Animated Background" fill className="w-full h-full object-cover" draggable="false" priority />
          </div>
          <Suspense>
            <main id="main-content">
              {children}
            </main>
          </Suspense>
        </ThemeProvider>
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
