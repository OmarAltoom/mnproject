"use client";
import { useState } from "react";
import { FaEnvelope, FaShield, FaArrowLeft } from "react-icons/fa6";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useLocaleContext } from "../hooks/useLocaleContext";

export default function ForgotPasswordForm() {
  const locale = useLocale();
  const t = useTranslations();
  const { toggleLocale } = useLocaleContext();
  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError(t("auth.forgotPassword.errors.invalidEmail") || "البريد الإلكتروني غير صحيح");
        setLoading(false);
        return;
      }

      // Simulate email sent
      setSuccess(true);
      setForm({ email: "" });
      setLoading(false);
    }, 1200);
  };

  // Bilingual labels
  const labels = locale === "en" ? {
    title: "Reset Password",
    subtitle: "Enter your email to receive a password reset link",
    emailLabel: "Email Address",
    emailPlaceholder: "example@email.com",
    submitButton: "Send Reset Link",
    loading: "Sending...",
    backToLogin: "Back to Login",
    successMessage: "Reset link sent! Check your email for instructions.",
    invalidEmail: "Please enter a valid email address",
    tryAnother: "Try another email",
    noAccount: "Don't have an account?",
    signup: "Sign up here",
  } : {
    title: "إعادة تعيين كلمة المرور",
    subtitle: "أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "example@email.com",
    submitButton: "إرسال رابط التعيين",
    loading: "جاري الإرسال...",
    backToLogin: "العودة لتسجيل الدخول",
    successMessage: "تم إرسال الرابط! تحقق من بريدك الإلكتروني للتعليمات.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    tryAnother: "جرب بريد آخر",
    noAccount: "ليس لديك حساب؟",
    signup: "سجل هنا",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-yellow-100 dark:border-zinc-800 space-y-6"
    >
      {/* Language Toggle */}
      <div className="absolute top-6 right-6">
        <button
          type="button"
          onClick={toggleLocale}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors font-medium text-sm"
          title={locale === "ar" ? "Switch to English" : "التبديل للعربية"}
        >
          <span>🌐</span>
          <span>{locale === "ar" ? "EN" : "AR"}</span>
        </button>
      </div>

      {/* Title and Icon */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-4 bg-gradient-to-br from-yellow-100 to-red-100 dark:from-yellow-900/30 dark:to-red-900/30 rounded-2xl">
          <FaShield className="text-5xl text-yellow-600 dark:text-yellow-400" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
          {labels.title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">{labels.subtitle}</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-800 rounded-xl p-4 text-green-700 dark:text-green-400 text-base flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">✅</span>
          <div className="flex-1 space-y-2">
            <p className="font-semibold">{labels.successMessage}</p>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setForm({ email: "" });
              }}
              className="text-sm font-medium hover:underline"
            >
              {labels.tryAnother}
            </button>
          </div>
        </div>
      )}

      {/* Email Field */}
      {!success && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {labels.emailLabel}
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 dark:text-yellow-400 text-xl" />
              <input
                type="email"
                name="email"
                placeholder={labels.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400 text-base flex items-center gap-3">
              <span className="text-xl shrink-0">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {labels.loading}
              </span>
            ) : (
              labels.submitButton
            )}
          </button>
        </>
      )}

      {/* Back to Login */}
      <div className="flex flex-col gap-3 text-center text-sm">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors"
        >
          <FaArrowLeft className="text-lg" />
          {labels.backToLogin}
        </Link>
        <div className="text-gray-600 dark:text-gray-400">
          {labels.noAccount}{" "}
          <Link href="/signup" className="text-yellow-600 dark:text-yellow-400 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors">
            {labels.signup}
          </Link>
        </div>
      </div>
    </form>
  );
}
