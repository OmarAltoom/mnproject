"use client";
import { useState } from "react";
import { useToast } from "@/app/components/ui/Toast";
import { FaBell, FaTrash, FaCheck, FaCheckDouble } from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function PatientNotificationsPage() {
  const { locale } = useLocale();
  const { showToast, ToastContainer } = useToast();
  const [filter, setFilter] = useState("all");

  // Bilingual labels
  const labels = locale === "en" ? {
    // Page header
    pageTitle: "My Notifications",
    unreadCount: (unread, total) => `You have ${unread} unread notification${unread !== 1 ? 's' : ''} out of ${total}`,
    allRead: (total) => `All notifications read (${total})`,
    
    // Filter labels
    filterAll: "All",
    filterUnread: "Unread",
    filterRead: "Read",
    
    // Action buttons
    markAllRead: "Mark All as Read",
    deleteAll: "Delete All",
    markAsRead: "Mark as read",
    markAsUnread: "Mark as unread",
    deleteNotification: "Delete notification",
    
    // Notification types
    typeAppointment: "Appointment",
    typeResult: "Result",
    typeMessage: "Message",
    typeReminder: "Reminder",
    typeSystem: "System",
    
    // Empty states
    noUnread: "No unread notifications",
    noRead: "No read notifications",
    noNotifications: "No notifications",
    
    // Stats section
    statsTotal: "Total Notifications",
    statsUnread: "Unread",
    statsRead: "Read",
    
    // Toast messages
    toast: {
      notificationDeleted: "Notification deleted",
      allDeleted: "All notifications deleted",
      markedRead: "Marked as read",
      allMarkedRead: "All notifications marked as read",
      markedUnread: "Marked as unread"
    },
    
    // Confirm dialog
    confirmDeleteAll: "Do you want to delete all notifications?",
    
    // Time formats
    timeMinutesAgo: (mins) => `${mins} minute${mins !== 1 ? 's' : ''} ago`,
    timeHourAgo: "1 hour ago",
    timeHoursAgo: (hours) => `${hours} hours ago`,
    timeDaysAgo: (days) => `${days} day${days !== 1 ? 's' : ''} ago`,
    timeJustNow: "Just now"
  } : {
    // Page header
    pageTitle: "إشعاراتي",
    unreadCount: (unread, total) => `لديك ${unread} إشعار غير مقروء من أصل ${total}`,
    allRead: (total) => `جميع الإشعارات مقروءة (${total})`,
    
    // Filter labels
    filterAll: "الكل",
    filterUnread: "غير المقروءة",
    filterRead: "المقروءة",
    
    // Action buttons
    markAllRead: "تحديد الكل كمقروء",
    deleteAll: "حذف الكل",
    markAsRead: "تحديد كمقروء",
    markAsUnread: "تحديد كغير مقروء",
    deleteNotification: "حذف الإشعار",
    
    // Notification types
    typeAppointment: "موعد",
    typeResult: "نتيجة",
    typeMessage: "رسالة",
    typeReminder: "تذكير",
    typeSystem: "نظام",
    
    // Empty states
    noUnread: "لا توجد إشعارات غير مقروءة",
    noRead: "لا توجد إشعارات مقروءة",
    noNotifications: "لا توجد إشعارات",
    
    // Stats section
    statsTotal: "إجمالي الإشعارات",
    statsUnread: "غير المقروءة",
    statsRead: "المقروءة",
    
    // Toast messages
    toast: {
      notificationDeleted: "تم حذف الإشعار",
      allDeleted: "تم حذف جميع الإشعارات",
      markedRead: "تم تحديد كمقروء",
      allMarkedRead: "تم تحديد جميع الإشعارات كمقروءة",
      markedUnread: "تم تحديد كغير مقروء"
    },
    
    // Confirm dialog
    confirmDeleteAll: "هل تريد حذف جميع الإشعارات؟",
    
    // Time formats
    timeMinutesAgo: (mins) => `منذ ${mins} ${mins === 1 ? 'دقيقة' : mins === 2 ? 'دقيقتين' : 'دقائق'}`,
    timeHourAgo: "منذ ساعة",
    timeHoursAgo: (hours) => `منذ ${hours} ${hours === 2 ? 'ساعتين' : 'ساعات'}`,
    timeDaysAgo: (days) => `منذ ${days} ${days === 1 ? 'يوم' : days === 2 ? 'يومين' : 'أيام'}`,
    timeJustNow: "الآن"
  };
  
  // Bilingual notifications seed data
  const [notifications, setNotifications] = useState(
    locale === "en" ? [
      { 
        id: 1, 
        title: "Your Doctor Appointment", 
        message: "Your appointment with Dr. Mohamed Salem has been confirmed for tomorrow at 3 PM", 
        time: labels.timeMinutesAgo(10), 
        read: false, 
        type: "appointment" 
      },
      { 
        id: 2, 
        title: "Test Results Ready", 
        message: "Your medical test results are now available, please review them", 
        time: labels.timeMinutesAgo(20), 
        read: false, 
        type: "result" 
      },
      { 
        id: 3, 
        title: "Doctor Response", 
        message: "Dr. Layla Hassan replied to your question about the medication", 
        time: labels.timeHourAgo, 
        read: true, 
        type: "message" 
      },
      { 
        id: 4, 
        title: "Appointment Reminder", 
        message: "You have an appointment with Dr. Sami Youssef in 3 days", 
        time: labels.timeHoursAgo(2), 
        read: true, 
        type: "reminder" 
      },
      { 
        id: 5, 
        title: "Account Update", 
        message: "Your personal information has been successfully updated", 
        time: labels.timeDaysAgo(2), 
        read: false, 
        type: "system" 
      }
    ] : [
      { 
        id: 1, 
        title: "موعدك مع الدكتور", 
        message: "تم تأكيد موعدك مع د. محمد سالم غداً الساعة 3 مساءً", 
        time: labels.timeMinutesAgo(10), 
        read: false, 
        type: "appointment" 
      },
      { 
        id: 2, 
        title: "نتيجة الفحص جاهزة", 
        message: "نتائج فحصك الطبي أخيراً متاحة الآن، يرجى مراجعتها", 
        time: labels.timeMinutesAgo(20), 
        read: false, 
        type: "result" 
      },
      { 
        id: 3, 
        title: "رد من الدكتور", 
        message: "د. ليلى حسن ردت على استفسارك بخصوص الدواء", 
        time: labels.timeHourAgo, 
        read: true, 
        type: "message" 
      },
      { 
        id: 4, 
        title: "تذكير بالموعد", 
        message: "لديك موعد مع د. سامي يوسف في خلال 3 أيام", 
        time: labels.timeHoursAgo(2), 
        read: true, 
        type: "reminder" 
      },
      { 
        id: 5, 
        title: "تحديث الحساب", 
        message: "تم تحديث بياناتك الشخصية بنجاح", 
        time: labels.timeDaysAgo(2), 
        read: false, 
        type: "system" 
      }
    ]
  );

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    showToast(labels.toast.notificationDeleted, "info");
  };

  const handleDeleteAll = () => {
    if (window.confirm(labels.confirmDeleteAll)) {
      setNotifications([]);
      showToast(labels.toast.allDeleted, "success");
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    showToast(labels.toast.markedRead, "info");
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast(labels.toast.allMarkedRead, "success");
  };

  const handleMarkAsUnread = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: false } : n
    ));
    showToast(labels.toast.markedUnread, "info");
  };

  const getTypeIcon = (type) => {
    const icons = {
      appointment: "📅",
      result: "📊",
      message: "💬",
      reminder: "🔔",
      system: "⚙️"
    };
    return icons[type] || "🔔";
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      appointment: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      result: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      message: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      reminder: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      system: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    };
    return colors[type] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      appointment: labels.typeAppointment,
      result: labels.typeResult,
      message: labels.typeMessage,
      reminder: labels.typeReminder,
      system: labels.typeSystem
    };
    return typeLabels[type] || labels.typeSystem;
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4">
      <ToastContainer />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{labels.pageTitle}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount > 0 ? labels.unreadCount(unreadCount, totalCount) : labels.allRead(totalCount)}
            </p>
          </div>
          <FaBell size={32} className="text-green-600 dark:text-green-400" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "all"
                ? "bg-green-600 text-white dark:bg-green-600"
                : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            {labels.filterAll} ({totalCount})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "unread"
                ? "bg-green-600 text-white dark:bg-green-600"
                : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            {labels.filterUnread} ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "read"
                ? "bg-green-600 text-white dark:bg-green-600"
                : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            {labels.filterRead} ({notifications.filter(n => n.read).length})
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg transition"
          >
            <FaCheckDouble size={14} />
            {labels.markAllRead}
          </button>
          <button
            onClick={handleDeleteAll}
            disabled={totalCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg transition"
          >
            <FaTrash size={14} />
            {labels.deleteAll}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-12 text-center">
              <FaBell size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {filter === "unread" ? labels.noUnread : 
                 filter === "read" ? labels.noRead : 
                 labels.noNotifications}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-l-4 transition hover:shadow-lg ${
                  notif.read 
                    ? "border-l-gray-400 dark:border-l-slate-600" 
                    : "border-l-green-600 dark:border-l-green-400"
                } ${!notif.read ? "bg-green-50 dark:bg-green-900/10" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-2xl">{getTypeIcon(notif.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {notif.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(notif.type)}`}>
                        {getTypeLabel(notif.type)}
                      </span>
                      {!notif.read && (
                        <div className="w-3 h-3 bg-green-600 rounded-full ml-auto shrink-0"></div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {notif.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {notif.time}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 shrink-0">
                    {!notif.read ? (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        title={labels.markAsRead}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition"
                      >
                        <FaCheck size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsUnread(notif.id)}
                        title={labels.markAsUnread}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                      >
                        <FaCheck size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      title={labels.deleteNotification}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {totalCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-t-4 border-blue-600 dark:border-blue-500">
              <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{labels.statsTotal}</h4>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-t-4 border-yellow-600 dark:border-yellow-500">
              <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{labels.statsUnread}</h4>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-t-4 border-green-600 dark:border-green-500">
              <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{labels.statsRead}</h4>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{notifications.filter(n => n.read).length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
