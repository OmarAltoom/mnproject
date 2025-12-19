"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((message, duration) => addToast(message, "success", duration), [addToast]);
  const showError = useCallback((message, duration) => addToast(message, "error", duration), [addToast]);
  const showWarning = useCallback((message, duration) => addToast(message, "warning", duration), [addToast]);
  const showInfo = useCallback((message, duration) => addToast(message, "info", duration), [addToast]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, removeToast }) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none" dir="rtl">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body
  );
}

function Toast({ id, message, type, onClose }) {
  const types = {
    success: {
      bg: "bg-gradient-to-r from-green-500 to-green-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: "bg-gradient-to-r from-red-500 to-red-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    info: {
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const config = types[type] || types.info;

  return (
    <div
      className={`${config.bg} text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md pointer-events-auto animate-fadeIn`}
      role="alert"
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <p className="flex-1 font-semibold text-sm">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="إغلاق"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
