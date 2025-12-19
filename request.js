const { getRequestConfig } = require('next-intl/server');

module.exports = getRequestConfig(async ({ requestLocale }) => {
  const locales = ['en', 'ar'];
  const locale = requestLocale && locales.includes(requestLocale) ? requestLocale : 'en';

  try {
    const messages = (await import(`./app/locales/${locale}/common.json`)).default;
    return {
      locale,
      messages,
    };
  } catch (err) {
    return {
      locale,
      messages: {},
    };
  }
});
