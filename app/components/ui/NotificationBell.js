"use client";
import React, { useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";

const NotificationBell = ({ notifications = [], onRead = () => {} }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    onRead(id);
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-2xl z-50 w-96 border border-gray-200 dark:border-slate-700 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white">الإشعارات</h3>
            <button
              onClick={() => setShowDropdown(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                لا توجد إشعارات جديدة
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition cursor-pointer ${
                    notif.read ? "" : "bg-blue-50 dark:bg-blue-900/20"
                  }`}
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.read ? "bg-transparent" : "bg-blue-600"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {notif.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        {notif.message}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                عرض جميع الإشعارات
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
