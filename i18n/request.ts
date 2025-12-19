import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar"];
const namespaces = ["messages", "common", "legal", "patient", "doctor", "admin", "dashboard", "meta", "auth", "content"];

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;
  const locale: string = resolvedLocale && locales.includes(resolvedLocale) ? resolvedLocale : "ar";

  const merged: Record<string, any> = {};
  for (const name of namespaces) {
    try {
      const mod = (await import(`../app/locales/${locale}/${name}.json`)).default;
      Object.assign(merged, mod);
    } catch (err) {
      // ignore missing optional namespaces
    }
  }

  return {
    locale,
    messages: merged,
  };
});

