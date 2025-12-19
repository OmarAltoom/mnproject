import { useLocale, useTranslations } from "next-intl";

export const metadata = {
  title: "Privacy Policy",
  description: "How we protect your data and privacy in Detect AI",
};

export default function PrivacyPage() {
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
              {t("privacyPage.title")}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("privacyPage.lastUpdate")}: {new Date().toLocaleDateString(locale === "en" ? "en-US" : "ar-EG")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl animate-slideUp">
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.introduction.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("privacyPage.introduction.content")}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.informationCollection.heading")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("privacyPage.informationCollection.personal.title")}</h3>
                  <ul className="list-disc pr-6 space-y-1 text-gray-600 dark:text-gray-400">
                    {Array.isArray(t.raw("privacyPage.informationCollection.personal.items")) && t.raw("privacyPage.informationCollection.personal.items").map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("privacyPage.informationCollection.medical.title")}</h3>
                  <ul className="list-disc pr-6 space-y-1 text-gray-600 dark:text-gray-400">
                    {Array.isArray(t.raw("privacyPage.informationCollection.medical.items")) && t.raw("privacyPage.informationCollection.medical.items").map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("privacyPage.informationCollection.technical.title")}</h3>
                  <ul className="list-disc pr-6 space-y-1 text-gray-600 dark:text-gray-400">
                    {Array.isArray(t.raw("privacyPage.informationCollection.technical.items")) && t.raw("privacyPage.informationCollection.technical.items").map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.dataUsage.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("privacyPage.dataUsage.items")) && t.raw("privacyPage.dataUsage.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.dataProtection.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("privacyPage.dataProtection.measures")) && t.raw("privacyPage.dataProtection.measures").map((measure, idx) => <li key={idx}>{measure}</li>)}
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.dataSecurity.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("privacyPage.dataSecurity.content")}
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.thirdParty.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("privacyPage.thirdParty.content")}
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.userRights.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {Array.isArray(t.raw("privacyPage.userRights.items")) && t.raw("privacyPage.userRights.items").map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.cookies.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("privacyPage.cookies.content")}
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.policyChanges.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("privacyPage.policyChanges.content")}
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("privacyPage.contact.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t("privacyPage.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
