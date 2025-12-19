"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-red-600 rounded-full animate-pulse opacity-20 blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute inset-2 bg-white dark:bg-zinc-900 rounded-full" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
          جاري التحميل...
        </h2>
        
        {/* Loading Bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 animate-gradient bg-[length:200%_100%]" />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
