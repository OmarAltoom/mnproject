"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-6 focus:py-3 focus:bg-linear-to-r focus:from-yellow-600 focus:to-red-600 focus:text-white focus:rounded-full focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
    >
      تخطي إلى المحتوى الرئيسي
    </a>
  );
}
