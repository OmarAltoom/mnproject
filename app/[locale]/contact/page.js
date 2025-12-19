import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function generateMetadata() {
  const t = await getTranslations("meta.contact");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      type: "website",
    },
  };
}

export default async function ContactPage() {
  const headerList = headers();
  const rawPath = headerList.get("x-forwarded-uri") || headerList.get("referer") || "/";
  const locale = rawPath.startsWith("/en") ? "en" : "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const content = (await import(`../locales/${locale}/content.json`)).default.content;
  const t = content.contactPage;

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-red-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-20" dir={dir} lang={locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              {t.title || "تواصل معنا"}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.description || "نحن هنا لمساعدتك. تواصل معنا لأي استفسارات أو اقتراحات"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl animate-slideUp">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t.form?.name || "الاسم الكامل"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors"
                  placeholder={t.form?.name || "أدخل اسمك الكامل"}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t.form?.email || "البريد الإلكتروني"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t.form?.phone || "رقم الهاتف"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors"
                  placeholder="+966 5XXXXXXXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t.form?.subject || "الموضوع"}
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors"
                  defaultValue=""
                >
                  <option value="" disabled>{t.form?.subjectPlaceholder || "اختر الموضوع"}</option>
                  <option value="general">{t.form?.options?.general || "استفسار عام"}</option>
                  <option value="technical">{t.form?.options?.technical || "دعم تقني"}</option>
                  <option value="business">{t.form?.options?.business || "استفسار تجاري"}</option>
                  <option value="feedback">{t.form?.options?.feedback || "ملاحظات واقتراحات"}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t.form?.message || "الرسالة"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors resize-none"
                  placeholder={t.form?.messagePlaceholder || "اكتب رسالتك هنا..."}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {t.form?.submit || "إرسال الرسالة"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-slideUp" style={{ animationDelay: "0.2s" }}>
            {/* Info Cards */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-linear-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-2xl">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.info?.emailTitle || "البريد الإلكتروني"}</h3>
                  {(t.info?.emails || ["support@detect-ai.com", "info@detect-ai.com"]).map((email) => (
                    <p key={email} className="text-gray-600 dark:text-gray-400">{email}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-linear-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.info?.phoneTitle || "الهاتف"}</h3>
                  {(t.info?.phones || ["+966 50 123 4567", "+966 50 765 4321"]).map((phone) => (
                    <p key={phone} className="text-gray-600 dark:text-gray-400" dir="ltr">{phone}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-linear-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.info?.addressTitle || "العنوان"}</h3>
                  {(t.info?.addressLines || ["الرياض، المملكة العربية السعودية", "حي السليمانية، طريق الملك فهد"]).map((line) => (
                    <p key={line} className="text-gray-600 dark:text-gray-400">{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.info?.hoursTitle || "ساعات العمل"}</h3>
                  {(t.info?.hours || ["الأحد - الخميس: 9:00 ص - 6:00 م", "الجمعة - السبت: مغلق"]).map((line) => (
                    <p key={line} className="text-gray-600 dark:text-gray-400">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
