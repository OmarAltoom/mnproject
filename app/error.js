"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-yellow-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
          عذراً! حدث خطأ ما
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {error.message || "حدث خطأ غير متوقع. نعمل على حل المشكلة."}
        </p>

        {/* Error Details (Dev Mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-left overflow-auto max-h-40">
            <pre className="text-xs text-red-800 dark:text-red-200">
              {error.stack}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            إعادة المحاولة
          </button>
          
          <Link
            href="/"
            className="px-8 py-3 bg-white dark:bg-zinc-800 border-2 border-red-500 text-red-600 dark:text-red-400 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            العودة للرئيسية
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          إذا استمرت المشكلة، يرجى{" "}
          <Link href="/contact" className="text-red-600 dark:text-red-400 hover:underline font-semibold">
            التواصل معنا
          </Link>
        </p>
      </div>
    </div>
  );
}
