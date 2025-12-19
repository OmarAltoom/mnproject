import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  localePrefix: 'always',
  localeDetection: false,
});

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
