"use client";
import React from "react";

const Spinner = ({ size = "md", fullScreen = false }) => {
  const sizeClass = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  }[size];

  const spinner = (
    <div className={`${sizeClass} border-blue-300 border-t-blue-600 rounded-full animate-spin`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center z-40">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;

// مكون Overlay محسّن
export const LoadingOverlay = ({ show = false, message = "جاري التحميل..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-700 dark:text-gray-300 font-medium text-center">{message}</p>
      </div>
    </div>
  );
};
