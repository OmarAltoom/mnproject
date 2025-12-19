import { headers } from "next/headers";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import LoginSide from "../../components/LoginSide";

export const metadata = {
  title: "Reset Password - Detect AI",
  description: "Reset your password to access your Detect AI account",
  openGraph: {
    title: "Reset Password - Detect AI",
    description: "Reset your password to access your Detect AI account",
    type: "website",
  },
};

export default async function ForgotPasswordPage() {
  const headerList = await headers();
  const rawPath = headerList.get("x-forwarded-uri") || headerList.get("referer") || "/";
  const locale = rawPath.startsWith("/en") ? "en" : "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const homeHref = locale === "en" ? "/en" : "/ar";
  const authCopy = (await import(`../../locales/${locale}/auth.json`)).default.auth;

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-linear-to-br from-yellow-50 via-white to-red-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" dir={dir} lang={locale}>
      <div className="w-full md:w-1/2 h-72 md:h-auto order-2 md:order-1 flex items-stretch justify-center relative p-4">
        <LoginSide />
        <div className="absolute top-6 right-6 z-40">
          <Link
            href={homeHref}
            className="w-14 h-14 flex items-center justify-center bg-linear-to-br from-yellow-400 via-red-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-white text-2xl rounded-full shadow-lg border-4 border-yellow-400/40 hover:border-red-400/40 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400/60"
            aria-label={authCopy.homeAria || "العودة للرئيسية"}
          >
            <FaHome className="text-3xl drop-shadow-lg" />
            <span className="sr-only">{authCopy.homeAria || "العودة للرئيسية"}</span>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-auto order-1 md:order-2 flex items-center justify-center p-4">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
