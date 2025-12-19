import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";
import { ThemeProvider } from "../../theme-provider";
import { LocaleProvider } from "../../contexts/LocaleContext";

export default async function AdminLocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleProvider>
        <ThemeProvider>
          <Suspense>
            <main id="main-content" dir={dir}>
              {children}
            </main>
          </Suspense>
        </ThemeProvider>
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
