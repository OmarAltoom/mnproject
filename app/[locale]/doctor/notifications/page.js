"use client";
import { useState, useMemo } from "react";
import DoctorLayout from "../DoctorLayout";
import { useToast } from "@/app/components/ui/Toast";
import { FaBell, FaTrash, FaCheck, FaCheckDouble, FaFilter } from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function NotificationsPage() {
  const { t, locale } = useLocale();
  // Tabs, stats, and button labels (bilingual)
  const filterLabels = locale === "ar"
    ? { all: "الكل", unread: "غير المقروءة", read: "المقروءة" }
    : { all: "All", unread: "Unread", read: "Read" };
  const unreadText = locale === "ar" ? "غير المقروءة" : "unread";
  const markAllReadText = locale === "ar" ? "تحديد الكل كمقروء" : "Mark All as Read";
  const deleteAllText = locale === "ar" ? "حذف الكل" : "Delete All";
  const markAsReadText = locale === "ar" ? "تحديد كمقروء" : "Mark as Read";
  const markAsUnreadText = locale === "ar" ? "تحديد كغير مقروء" : "Mark as Unread";
  const deleteText = locale === "ar" ? "حذف" : "Delete";
  const noNotificationsText = locale === "ar" ? "لا توجد إشعارات" : "No notifications";
  const toastDeleted = locale === "ar" ? "تم حذف الإشعار" : "Notification deleted";
  const toastAllDeleted = locale === "ar" ? "تم حذف جميع الإشعارات" : "All notifications deleted";
  const toastMarkedRead = locale === "ar" ? "تم تحديد كمقروء" : "Marked as read";
  const toastAllMarkedRead = locale === "ar" ? "تم تحديد الجميع كمقروء" : "All marked as read";
  const toastConfirmDeleteAll = locale === "ar" ? "هل تريد حذف جميع الإشعارات؟" : "Delete all notifications?";
  const { showToast, ToastContainer } = useToast();
  const dn = t.doctorNotifications || {};
  const [filter, setFilter] = useState("all");

  // نوع الإشعار (بالعربية/إنجليزية)
  const typeLabels = locale === "ar"
    ? { appointment: "موعد", result: "نتيجة", message: "رسالة", system: "نظام" }
    : { appointment: "Appointment", result: "Result", message: "Message", system: "System" };
  
  const notificationsTemplate = useMemo(
    () =>
      locale === "en"
        ? [
            { id: 1, title: "New Patient Appointment", message: "Mohammed Ali wants to book an appointment with you tomorrow", time: "5 minutes ago", read: false, type: "appointment" },
            { id: 2, title: "New Test Result", message: "A new test result has been added for patient Sarah Mohammed", time: "15 minutes ago", read: false, type: "result" },
            { id: 3, title: "Message from Patient", message: "Mohammed is asking about the medication he should take", time: "30 minutes ago", read: true, type: "message" },
            { id: 4, title: "System Update", message: "System updated successfully, please reload the page", time: "1 hour ago", read: true, type: "system" },
            { id: 5, title: "Upcoming Appointment", message: "You have an appointment with Khaled Youssef in 1 hour", time: "2 hours ago", read: false, type: "appointment" }
          ]
        : [
            { id: 1, title: "موعد جديد مع المريض", message: "محمد علي يريد حجز موعد معك غداً", time: "منذ 5 دقائق", read: false, type: "appointment" },
            { id: 2, title: "نتيجة فحص جديدة", message: "تم إضافة نتيجة فحص جديدة للمريض سارة محمد", time: "منذ 15 دقيقة", read: false, type: "result" },
            { id: 3, title: "رسالة من مريض", message: "محمد يسأل عن الدواء المفروض تناوله", time: "منذ 30 دقيقة", read: true, type: "message" },
            { id: 4, title: "تحديث في النظام", message: "تم تحديث النظام بنجاح، يرجى إعادة تحميل الصفحة", time: "منذ ساعة", read: true, type: "system" },
            { id: 5, title: "موعد قادم", message: "لديك موعد مع خالد يوسف في خلال ساعة", time: "منذ 2 ساعة", read: false, type: "appointment" }
          ],
    [locale]
  );

  const [notifications, setNotifications] = useState(notificationsTemplate);

  // فلترة الإشعارات
  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    showToast(toastDeleted, "info");
  };

  const handleDeleteAll = () => {
    if (window.confirm(toastConfirmDeleteAll)) {
      setNotifications([]);
      showToast(toastAllDeleted, "success");
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    showToast(toastMarkedRead, "info");
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast(toastAllMarkedRead, "success");
  };

  // تحديد كغير مقروء
  const handleMarkAsUnread = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: false } : n
    ));
  };

  // الحصول على أيقونة النوع
  const getTypeIcon = (type) => {
    const icons = {
      appointment: "📅",
      result: "📊",
      message: "💬",
      system: "⚙️"
    };
    return icons[type] || "🔔";
  };

  // الحصول على لون النوع
  const getTypeBadgeColor = (type) => {
      // نوع الإشعار (بالعربية/إنجليزية)
      const typeLabels = locale === "ar"
        ? { appointment: "موعد", result: "نتيجة", message: "رسالة", system: "نظام" }
        : { appointment: "Appointment", result: "Result", message: "Message", system: "System" };
    const colors = {
      appointment: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      result: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      message: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      system: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  return (
    <DoctorLayout breadcrumbs={[{ label: locale === "ar" ? "الإشعارات" : "Notifications", href: "/doctor/notifications" }]}> 
      <ToastContainer />
      
      <div className="py-8 px-4 md:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{locale === "ar" ? "الإشعارات" : "Notifications"}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount > 0
                ? `${unreadCount} ${unreadText} / ${totalCount}`
                : `${locale === "ar" ? "جميع الإشعارات مقروءة" : "All notifications read"} (${totalCount})`}
            </p>
          </div>
          <FaBell size={32} className="text-blue-600 dark:text-blue-400" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300"
            }`}
          >
            {filterLabels.all} ({totalCount})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300"
            }`}
          >
            {filterLabels.unread} ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "read"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300"
            }`}
          >
            {filterLabels.read} ({notifications.filter(n => n.read).length})
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition"
          >
            <FaCheckDouble size={14} />
            {markAllReadText}
          </button>
          <button
            onClick={handleDeleteAll}
            disabled={totalCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition"
          >
            <FaTrash size={14} />
            {deleteAllText}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4 max-w-4xl">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-12 text-center">
              <FaBell size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {noNotificationsText}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-l-4 transition hover:shadow-lg ${
                  notif.read 
                    ? "border-l-gray-400 dark:border-l-slate-600" 
                    : "border-l-blue-600 dark:border-l-blue-400"
                } ${!notif.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(notif.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {notif.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(notif.type)}`}>
                        {typeLabels[notif.type]}
                      </span>
                      {!notif.read && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full ml-auto shrink-0"></div>
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
                        title={markAsReadText}
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition"
                      >
                        <FaCheck size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsUnread(notif.id)}
                        title={markAsUnreadText}
                        className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                      >
                        <FaCheck size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      title={deleteText}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-t-4 border-blue-600">
              <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{locale === "ar" ? "إجمالي الإشعارات" : "Total notifications"}</h4>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-t-4 border-yellow-600">
              <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{locale === "ar" ? "غير المقروءة" : "Unread"}</h4>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-t-4 border-green-600">
              <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{locale === "ar" ? "المقروءة" : "Read"}</h4>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{notifications.filter(n => n.read).length}</p>
            </div>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
}
