import { headers } from "next/headers";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// Localized metadata for Privacy
export async function generateMetadata() {
  const headerList = await headers();
  const rawPath = headerList.get("x-forwarded-uri") || headerList.get("referer") || "/";
  const locale = rawPath.startsWith("/en") ? "en" : "ar";
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}/en/privacy`,
      languages: {
        en: `${base}/en/privacy`,
        ar: `${base}/ar/privacy`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${base}/${locale}/privacy`,
      type: "article",
    },
  };
}

export default function PrivacyPage() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = useTranslations("privacyPage");
  const pp = t.raw ? t.raw() : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-20" dir={dir} lang={locale}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              {pp.title || "Privacy Policy"}
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
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("introduction.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("introduction.content")}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("informationCollection.heading")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("informationCollection.personal.title")}</h3>
                  <ul className="list-disc pr-6 space-y-1 text-gray-600 dark:text-gray-400">
                    {(pp.informationCollection?.personal?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("informationCollection.medical.title")}</h3>
                  <ul className="list-disc pr-6 space-y-1 text-gray-600 dark:text-gray-400">
                    {(pp.informationCollection?.medical?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("informationCollection.technical.title")}</h3>
                  <ul className="list-disc pr-6 space-y-1 text-gray-600 dark:text-gray-400">
                    {(pp.informationCollection?.technical?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("dataUsage.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(pp.dataUsage?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("dataProtection.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(pp.dataProtection?.measures || []).map((measure, idx) => <li key={idx}>{measure}</li>)}
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("dataSecurity.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("dataSecurity.content")}
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("thirdParty.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("thirdParty.content")}
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("userRights.heading")}</h2>
              <ul className="list-disc pr-6 space-y-2 text-gray-600 dark:text-gray-400">
                {(pp.userRights?.items || []).map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("cookies.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("cookies.content")}
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("policyChanges.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("policyChanges.content")}
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("contact.heading")}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t("contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
