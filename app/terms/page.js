import { headers } from "next/headers";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// Localized metadata for Terms
export async function generateMetadata() {
  const headerList = await headers();
  const rawPath = headerList.get("x-forwarded-uri") || headerList.get("referer") || "/";
  const locale = rawPath.startsWith("/en") ? "en" : "ar";
  const t = await getTranslations({ locale, namespace: "termsPage" });
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}/en/terms`,
      languages: {
        en: `${base}/en/terms`,
        ar: `${base}/ar/terms`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${base}/${locale}/terms`,
      type: "article",
    },
  };
}

export default function TermsPage() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = useTranslations("termsPage");
  const tp = t.raw ? t.raw() : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-20" dir={dir} lang={locale}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              {tp.title || "Terms of Service"}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("lastUpdate")}: {new Date().toLocaleDateString(locale === "en" ? "en-US" : "ar-EG")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl animate-slideUp">
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("acceptance.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("acceptance.content")}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("serviceDescription.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t("serviceDescription.intro")}
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(tp.serviceDescription?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("registration.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t("registration.intro")}
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(tp.registration?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("serviceUsage.heading")}</h2>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">{t("serviceUsage.allowed.title")}</h3>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                {(tp.serviceUsage?.allowed?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">{t("serviceUsage.prohibited.title")}</h3>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(tp.serviceUsage?.prohibited?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                <h2 className="text-3xl font-bold mb-4 text-red-900 dark:text-red-200">{t("medicalDisclaimer.heading")}</h2>
                <p className="text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                  {t("medicalDisclaimer.content")}
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("limitation.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(tp.limitation?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("changes.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("changes.content")}
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("contact.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
