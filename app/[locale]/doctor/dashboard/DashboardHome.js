"use client";
import { useMemo } from "react";
import { useToast } from "@/app/components/ui/Toast";
import { useRouter } from "next/navigation";
import {
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaXRay,
  FaComments,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowRight,
  FaClock,
  FaBell,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function DashboardHome() {
  const { showToast, ToastContainer } = useToast();
  const router = useRouter();
  const { t, locale } = useLocale();
  const basePrefix = locale === "en" ? "/en" : "/ar";
  const dd = t.doctorDashboard || {};

  const tr = locale === "en"
    ? {
        title: "Medical Dashboard",
        welcome: "Welcome Dr.",
        stats: {
          patients: "Total patients",
          todayAppointments: "Today's appointments",
          pendingScans: "Pending scans",
          newMessages: "New messages",
          changeSince: "since last month",
        },
        quickActions: {
          viewPatients: "View patients",
          viewPatientsDesc: "Manage your patient list",
          medicalImages: "Medical images",
          medicalImagesDesc: "Review radiology exams",
          appointments: "Appointments",
          appointmentsDesc: "Manage schedule",
          chats: "Chats",
          chatsDesc: "Communicate with patients",
        },
        todayAppointments: {
          title: "Today's appointments",
          viewAll: "View All",
          types: { xray: "X-ray", consult: "Consultation", followup: "Follow-up", ct: "CT Scan" },
          status: { confirmed: "Confirmed", pending: "Pending" },
        },
        pendingScans: {
          title: "Pending scans",
          priority: { high: "High", medium: "Medium", low: "Low" },
          viewAll: "View all scans",
        },
        recentActivityTitle: "Recent activity",
      }
    : {
        title: "لوحة التحكم الطبية",
        welcome: "مرحباً بك د.",
        stats: {
          patients: "إجمالي المرضى",
          todayAppointments: "مواعيد اليوم",
          pendingScans: "الفحوصات المعلقة",
          newMessages: "الرسائل الجديدة",
          changeSince: "من الشهر الماضي",
        },
        quickActions: {
          viewPatients: "عرض المرضى",
          viewPatientsDesc: "إدارة قائمة مرضاك",
          medicalImages: "الصور الطبية",
          medicalImagesDesc: "مراجعة الأشعة والفحوصات",
          appointments: "المواعيد",
          appointmentsDesc: "إدارة جدول المواعيد",
          chats: "المحادثات",
          chatsDesc: "التواصل مع المرضى",
        },
        todayAppointments: {
          title: "مواعيد اليوم",
          viewAll: "عرض الكل",
          types: { xray: "أشعة", consult: "استشارة", followup: "متابعة", ct: "أشعة مقطعية" },
          status: { confirmed: "مؤكد", pending: "معلق" },
        },
        pendingScans: {
          title: "فحوصات معلقة",
          priority: { high: "عالي", medium: "متوسط", low: "منخفض" },
          viewAll: "عرض جميع الفحوصات",
        },
        recentActivityTitle: "النشاط الأخير",
      };

  const labels = {
    title: dd.title || tr.title,
    welcome: dd.welcome || tr.welcome,
    stats: { ...tr.stats, ...(dd.stats || {}) },
    quickActions: { ...tr.quickActions, ...(dd.quickActions || {}) },
    todayAppointments: {
      ...tr.todayAppointments,
      ...(dd.todayAppointments || {}),
      types: { ...tr.todayAppointments.types, ...(dd.todayAppointments?.types || {}) },
      status: { ...tr.todayAppointments.status, ...(dd.todayAppointments?.status || {}) },
    },
    pendingScans: {
      ...tr.pendingScans,
      ...(dd.pendingScans || {}),
      priority: { ...tr.pendingScans.priority, ...(dd.pendingScans?.priority || {}) },
    },
    recentActivityTitle: dd.recentActivity?.title || tr.recentActivityTitle,
  };

  const formattedDate = new Date().toLocaleDateString(locale === "en" ? "en-US" : "ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const stats = [
    {
      title: labels.stats.patients,
      value: "156",
      change: "+12",
      changePercent: "+8.3%",
      icon: FaUsers,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "up",
    },
    {
      title: labels.stats.todayAppointments,
      value: "12",
      change: "+3",
      changePercent: "+25%",
      icon: FaCalendarAlt,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      trend: "up",
    },
    {
      title: labels.stats.pendingScans,
      value: "8",
      change: "-2",
      changePercent: "-20%",
      icon: FaXRay,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
      trend: "down",
    },
    {
      title: labels.stats.newMessages,
      value: "24",
      change: "+5",
      changePercent: "+26%",
      icon: FaComments,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "up",
    },
  ];

  const todayAppointments = useMemo(() => locale === "en" ? [
    { id: 1, time: "09:00 AM", patient: "Mohammed Ahmed", type: "xray", status: "confirmed" },
    { id: 2, time: "10:30 AM", patient: "Fatima Ali", type: "consult", status: "confirmed" },
    { id: 3, time: "11:00 AM", patient: "Ahmed Khaled", type: "followup", status: "pending" },
    { id: 4, time: "02:00 PM", patient: "Sarah Mahmoud", type: "ct", status: "confirmed" },
  ] : [
    { id: 1, time: "09:00 ص", patient: "محمد أحمد", type: "xray", status: "confirmed" },
    { id: 2, time: "10:30 ص", patient: "فاطمة علي", type: "consult", status: "confirmed" },
    { id: 3, time: "11:00 ص", patient: "أحمد خالد", type: "followup", status: "pending" },
    { id: 4, time: "02:00 م", patient: "سارة محمود", type: "ct", status: "confirmed" },
  ], [locale]);

  const recentActivity = useMemo(() => locale === "en" ? [
    { id: 1, action: "Reviewed X-ray for Mohammed Ali", time: "10 min ago", icon: FaCheckCircle, color: "text-green-600" },
    { id: 2, action: "New appointment with Fatima Ahmed", time: "25 min ago", icon: FaCalendarAlt, color: "text-blue-600" },
    { id: 3, action: "New message from Ahmed Hassan", time: "45 min ago", icon: FaComments, color: "text-purple-600" },
    { id: 4, action: "Report ready for Sarah Khalid", time: "1 hour ago", icon: FaClipboardList, color: "text-orange-600" },
  ] : [
    { id: 1, action: "تم فحص صورة أشعة لـ محمد علي", time: "منذ 10 دقائق", icon: FaCheckCircle, color: "text-green-600" },
    { id: 2, action: "موعد جديد مع فاطمة أحمد", time: "منذ 25 دقيقة", icon: FaCalendarAlt, color: "text-blue-600" },
    { id: 3, action: "رسالة جديدة من أحمد حسن", time: "منذ 45 دقيقة", icon: FaComments, color: "text-purple-600" },
    { id: 4, action: "تقرير جاهز لسارة خالد", time: "منذ ساعة", icon: FaClipboardList, color: "text-orange-600" },
  ], [locale]);

  const pendingScans = useMemo(() => locale === "en" ? [
    { id: 1, patient: "Omar Hassan", type: "X-Ray", date: "Today", priority: "high" },
    { id: 2, patient: "Laila Mahmoud", type: "CT Scan", date: "Today", priority: "medium" },
    { id: 3, patient: "Youssef Ali", type: "MRI", date: "Yesterday", priority: "low" },
  ] : [
    { id: 1, patient: "عمر حسن", type: "X-Ray", date: "اليوم", priority: "high" },
    { id: 2, patient: "ليلى محمود", type: "CT Scan", date: "اليوم", priority: "medium" },
    { id: 3, patient: "يوسف علي", type: "MRI", date: "أمس", priority: "low" },
  ], [locale]);

  const quickActions = [
    {
      title: labels.quickActions.viewPatients,
      description: labels.quickActions.viewPatientsDesc,
      icon: FaUsers,
      color: "from-blue-600 to-blue-500",
      link: `${basePrefix}/doctor/patients`,
    },
    {
      title: labels.quickActions.medicalImages,
      description: labels.quickActions.medicalImagesDesc,
      icon: FaXRay,
      color: "from-green-600 to-green-500",
      link: `${basePrefix}/doctor/results`,
    },
    {
      title: labels.quickActions.appointments,
      description: labels.quickActions.appointmentsDesc,
      icon: FaCalendarAlt,
      color: "from-purple-600 to-purple-500",
      link: `${basePrefix}/doctor/appointments`,
    },
    {
      title: labels.quickActions.chats,
      description: labels.quickActions.chatsDesc,
      icon: FaComments,
      color: "from-orange-600 to-orange-500",
      link: `${basePrefix}/doctor/chat`,
    },
  ];

  const handleQuickAction = (link) => {
    router.push(link);
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 text-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FaUserMd className="text-blue-600" />
                {labels.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{labels.welcome} أحمد محمد - {formattedDate}</p>
            </div>
            <button
              onClick={() => router.push(`${basePrefix}/doctor/notifications`)}
              className="relative rounded-lg bg-blue-600 p-3 text-white transition-all hover:bg-blue-700"
            >
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                5
              </span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-2xl"
                >
                  <div className={`absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full ${stat.bgLight} opacity-50 transition-transform group-hover:scale-150`}></div>
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                        <Icon className="text-2xl text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        <FaArrowUp className={stat.trend === "down" ? "rotate-180" : ""} />
                        {stat.changePercent}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                      <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {stat.change} {labels.stats.changeSince}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.link)}
                  className={`group rounded-xl bg-linear-to-r ${action.color} p-6 text-white shadow-lg transition-all hover:shadow-2xl hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="text-3xl" />
                    <FaArrowRight className="transition-transform group-hover:-translate-x-1" />
                  </div>
                  <h3 className="text-lg font-bold">{action.title}</h3>
                  <p className="mt-1 text-sm opacity-90">{action.description}</p>
                </button>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Today's Appointments */}
            <div className="lg:col-span-2 rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-gray-100 dark:border-zinc-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  {labels.todayAppointments.title}
                </h2>
                <button
                  onClick={() => router.push(`${basePrefix}/doctor/appointments`)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {labels.todayAppointments.viewAll}
                </button>
              </div>
              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-zinc-800 p-4 transition-all hover:bg-gray-50 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                        <FaClock className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{apt.patient}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{labels.todayAppointments.types[apt.type] || apt.type}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{apt.time}</p>
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          apt.status === "confirmed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-200"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-200"
                        }`}
                      >
                        {labels.todayAppointments.status[apt.status] || apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Scans */}
            <div className="rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-gray-100 dark:border-zinc-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaXRay className="text-orange-600" />
                  {labels.pendingScans.title}
                </h2>
              </div>
              <div className="space-y-3">
                {pendingScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="rounded-lg border border-gray-200 dark:border-zinc-800 p-4 transition-all hover:bg-gray-50 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-900 dark:text-white">{scan.patient}</p>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          scan.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-200"
                            : scan.priority === "medium"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-200"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200"
                        }`}
                      >
                        {labels.pendingScans.priority[scan.priority] || scan.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{scan.type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{scan.date}</p>
                  </div>
                ))}
                <button
                  onClick={() => router.push(`${basePrefix}/doctor/results`)}
                  className="w-full rounded-lg bg-orange-600 py-2 text-sm font-medium text-white transition-all hover:bg-orange-700"
                >
                  {labels.pendingScans.viewAll}
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg border border-gray-100 dark:border-zinc-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaChartLine className="text-purple-600" />
                {labels.recentActivityTitle}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="rounded-lg border border-gray-200 dark:border-zinc-800 p-4 transition-all hover:bg-gray-50 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${activity.color}`}>
                        <Icon className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
