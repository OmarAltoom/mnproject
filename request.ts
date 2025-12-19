import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locales = ['en', 'ar'];
  const locale = requestLocale && locales.includes(requestLocale) ? requestLocale : 'en';

  try {
    const messages = (await import(`./app/locales/${locale}/common.json`)).default;
    return {
      locale,
      messages,
      timeZone: 'UTC',
    };
  } catch (err) {
    return {
      locale,
      messages: {},
      timeZone: 'UTC',
    };
  }
});
