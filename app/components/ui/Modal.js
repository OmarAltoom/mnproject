"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children, size = "md", closeOnOverlay = true }) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full mx-4",
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative ${sizes[size]} w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl transform transition-all animate-fadeIn`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
            <h2
              id="modal-title"
              className="text-2xl font-bold bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="إغلاق"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modalContent, document.body);
}

// Confirm Dialog Component
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "تأكيد", cancelText = "إلغاء", variant = "danger" }) {
  const variants = {
    danger: "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    success: "bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    warning: "bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnOverlay={false}>
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-linear-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2.5 ${variants[variant]} text-white rounded-full font-semibold transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
