import { useLocale, useTranslations } from "next-intl";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Detect AI",
};

export default function TermsPage() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-20" dir={dir} lang={locale}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              {t("termsPage.title")}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("termsPage.lastUpdate")}: {new Date().toLocaleDateString(locale === "en" ? "en-US" : "ar-EG")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl animate-slideUp">
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.acceptance.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("termsPage.acceptance.content")}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.serviceDescription.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t("termsPage.serviceDescription.intro")}
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("termsPage.serviceDescription.items")) && t.raw("termsPage.serviceDescription.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.registration.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t("termsPage.registration.intro")}
              </p>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("termsPage.registration.items")) && t.raw("termsPage.registration.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.serviceUsage.heading")}</h2>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">{t("termsPage.serviceUsage.allowed.title")}</h3>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                {Array.isArray(t.raw("termsPage.serviceUsage.allowed.items")) && t.raw("termsPage.serviceUsage.allowed.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">{t("termsPage.serviceUsage.prohibited.title")}</h3>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("termsPage.serviceUsage.prohibited.items")) && t.raw("termsPage.serviceUsage.prohibited.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                <h2 className="text-3xl font-bold mb-4 text-red-900 dark:text-red-200">{t("termsPage.medicalDisclaimer.heading")}</h2>
                <p className="text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                  {t("termsPage.medicalDisclaimer.content")}
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.limitation.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("termsPage.limitation.items")) && t.raw("termsPage.limitation.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.changes.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("termsPage.changes.content")}
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("termsPage.contact.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("termsPage.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
