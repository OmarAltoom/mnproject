"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ui/Toast";
import { FaCalendarAlt, FaFileAlt, FaEnvelope, FaHeartbeat, FaUserMd, FaClipboardList, FaArrowUp, FaArrowDown, FaBell } from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function PatientDashboard() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const basePrefix = locale === "en" ? "/en" : "/ar";
  const { showToast, ToastContainer } = useToast();
  const pd = t.patientDashboard || {};

  // Bilingual labels
  const labels = locale === "en" ? {
    welcome: "Welcome",
    quickActionsTitle: "Quick Actions",
    quickActionsMore: "More",
    upcomingAppointmentsTitle: "Upcoming Appointments",
    recentReportsTitle: "Recent Reports",
    recentActivityTitle: "Recent Activity",
    viewAll: "View All",
    changeSince: "since last month",
    stats: {
      upcomingAppointments: "Upcoming Appointments",
      readyReports: "Ready Reports",
      newMessages: "New Messages",
      healthScore: "Health Score"
    },
    quickActions: {
      bookAppointment: "Book Appointment",
      bookAppointmentDesc: "Schedule a new appointment with a doctor",
      uploadXray: "Upload X-ray",
      uploadXrayDesc: "Upload new medical imaging for analysis",
      viewReports: "View Reports",
      viewReportsDesc: "Access your medical reports and results",
      contactDoctor: "Contact Doctor",
      contactDoctorDesc: "Send a message to your healthcare provider"
    },
    status: {
      confirmed: "Confirmed",
      pending: "Pending",
      ready: "Ready",
      review: "Under Review"
    },
    priority: {
      urgent: "Urgent",
      normal: "Normal"
    },
    type: {
      clinic: "Clinic",
      online: "Online"
    }
  } : {
    welcome: "مرحباً",
    quickActionsTitle: "إجراءات سريعة",
    quickActionsMore: "المزيد",
    upcomingAppointmentsTitle: "المواعيد القادمة",
    recentReportsTitle: "التقارير الحديثة",
    recentActivityTitle: "النشاط الأخير",
    viewAll: "عرض الكل",
    changeSince: "من الشهر الماضي",
    stats: {
      upcomingAppointments: "المواعيد القادمة",
      readyReports: "التقارير الجاهزة",
      newMessages: "الرسائل الجديدة",
      healthScore: "المؤشر الصحي"
    },
    quickActions: {
      bookAppointment: "حجز موعد",
      bookAppointmentDesc: "احجز موعد جديد مع طبيب",
      uploadXray: "رفع أشعة",
      uploadXrayDesc: "قم برفع صور طبية جديدة للتحليل",
      viewReports: "عرض التقارير",
      viewReportsDesc: "اطلع على تقاريرك ونتائجك الطبية",
      contactDoctor: "تواصل مع الطبيب",
      contactDoctorDesc: "أرسل رسالة لطبيبك المعالج"
    },
    status: {
      confirmed: "مؤكد",
      pending: "قيد الانتظار",
      ready: "جاهز",
      review: "قيد المراجعة"
    },
    priority: {
      urgent: "عاجل",
      normal: "عادي"
    },
    type: {
      clinic: "العيادة",
      online: "أونلاين"
    }
  };

  // Get current date
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const arabicDate = locale === "ar" ? now.toLocaleDateString('ar-EG', options) : now.toLocaleDateString('en-US', options);

  const stats = [
    {
      title: labels.stats.upcomingAppointments,
      value: "3",
      change: "+1",
      changePercent: "+50%",
      icon: FaCalendarAlt,
      color: "bg-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      trend: "up"
    },
    {
      title: labels.stats.readyReports,
      value: "8",
      change: "+2",
      changePercent: "+33%",
      icon: FaFileAlt,
      color: "bg-green-500",
      bgLight: "bg-green-50 dark:bg-green-900/20",
      trend: "up"
    },
    {
      title: labels.stats.newMessages,
      value: "12",
      change: "+5",
      changePercent: "+71%",
      icon: FaEnvelope,
      color: "bg-purple-500",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
      trend: "up"
    },
    {
      title: labels.stats.healthScore,
      value: locale === "en" ? "Stable" : "مستقرة",
      icon: FaHeartbeat,
      color: "bg-emerald-500",
      bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
      subtext: locale === "en" ? "Last check: 3 days ago" : "آخر فحص: منذ 3 أيام"
    }
  ];

  const quickActions = [
    {
      title: labels.quickActions.bookAppointment,
      description: labels.quickActions.bookAppointmentDesc,
      icon: "📅",
      gradient: "from-yellow-500 to-red-500",
      action: () => router.push(`${basePrefix}/patient/appointments`)
    },
    {
      title: labels.quickActions.uploadXray,
      description: labels.quickActions.uploadXrayDesc,
      icon: "🩻",
      gradient: "from-yellow-400 to-orange-500",
      action: () => router.push(`${basePrefix}/patient/upload-xray`)
    },
    {
      title: labels.quickActions.viewReports,
      description: labels.quickActions.viewReportsDesc,
      icon: "📋",
      gradient: "from-red-500 to-red-600",
      action: () => router.push(`${basePrefix}/patient/results`)
    },
    {
      title: labels.quickActions.contactDoctor,
      description: labels.quickActions.contactDoctorDesc,
      icon: "💬",
      gradient: "from-yellow-500 to-amber-500",
      action: () => router.push(`${basePrefix}/patient/chat`)
    }
  ];

  const upcomingAppointments = locale === "en" ? [
    {
      id: 1,
      doctor: "Dr. Sarah Ahmed",
      specialty: "Radiology Consultant",
      date: "Dec 05, 2025",
      time: "10:00 AM",
      type: "clinic",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Mohammed Ali",
      specialty: "Orthopedic Surgeon",
      date: "Dec 07, 2025",
      time: "02:30 PM",
      type: "online",
      status: "pending"
    },
    {
      id: 3,
      doctor: "Dr. Fatima Hassan",
      specialty: "General Practitioner",
      date: "Dec 10, 2025",
      time: "11:00 AM",
      type: "clinic",
      status: "confirmed"
    }
  ] : [
    {
      id: 1,
      doctor: "د. سارة أحمد",
      specialty: "أخصائي أشعة",
      date: "2025-12-05",
      time: "10:00 صباحاً",
      type: "clinic",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "د. محمد علي",
      specialty: "جراح عظام",
      date: "2025-12-07",
      time: "02:30 مساءً",
      type: "online",
      status: "pending"
    },
    {
      id: 3,
      doctor: "د. فاطمة حسن",
      specialty: "طب عام",
      date: "2025-12-10",
      time: "11:00 صباحاً",
      type: "clinic",
      status: "confirmed"
    }
  ];

  const recentReports = locale === "en" ? [
    {
      id: 1,
      title: "Chest X-ray",
      date: "Dec 02, 2025",
      status: "ready",
      priority: "normal",
      doctor: "Dr. Sarah Ahmed"
    },
    {
      id: 2,
      title: "Complete Blood Count",
      date: "Dec 01, 2025",
      status: "ready",
      priority: "normal",
      doctor: "Dr. Mohammed Ali"
    },
    {
      id: 3,
      title: "Knee X-ray",
      date: "Nov 28, 2025",
      status: "review",
      priority: "urgent",
      doctor: "Dr. Fatima Hassan"
    }
  ] : [
    {
      id: 1,
      title: "أشعة الصدر",
      date: "2025-12-02",
      status: "ready",
      priority: "normal",
      doctor: "د. سارة أحمد"
    },
    {
      id: 2,
      title: "تحليل دم شامل",
      date: "2025-12-01",
      status: "ready",
      priority: "normal",
      doctor: "د. محمد علي"
    },
    {
      id: 3,
      title: "أشعة الركبة",
      date: "2025-11-28",
      status: "review",
      priority: "urgent",
      doctor: "د. فاطمة حسن"
    }
  ];

  const recentActivities = locale === "en" ? [
    { id: 1, action: "Uploaded new X-ray", time: "1h ago", icon: "🩻", color: "blue" },
    { id: 2, action: "Reply from Dr. Sarah", time: "2h ago", icon: "💬", color: "purple" },
    { id: 3, action: "Thursday appointment confirmed", time: "3h ago", icon: "✅", color: "green" },
    { id: 4, action: "New report ready", time: "5h ago", icon: "📄", color: "orange" }
  ] : [
    { id: 1, action: "تم تحميل أشعة جديدة", time: "منذ ساعة", icon: "🩻", color: "blue" },
    { id: 2, action: "رد من د. سارة على استفسارك", time: "منذ 2 ساعة", icon: "💬", color: "purple" },
    { id: 3, action: "تأكيد موعد يوم الخميس", time: "منذ 3 ساعات", icon: "✅", color: "green" },
    { id: 4, action: "تقرير جديد متاح للعرض", time: "منذ 5 ساعات", icon: "📄", color: "orange" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "ready":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      case "pending":
      case "review":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      case "normal":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {labels.welcome}، أحمد محمد 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{arabicDate}</p>
          </div>
          <button
            onClick={() => router.push(`${basePrefix}/patient/notifications`)}
            className="relative p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <FaBell className="text-xl text-gray-700 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgLight}`}>
                  <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                    <span>{stat.changePercent}</span>
                  </div>
                )}
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              {stat.change && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {stat.change} {labels.changeSince}
                </p>
              )}
              {stat.subtext && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {stat.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{labels.quickActionsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`bg-linear-to-br ${action.gradient} text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 group`}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
                <div className="mt-4 flex items-center gap-2 opacity-80 group-hover:gap-3 transition-all">
                  <span className="text-sm">{labels.quickActionsMore}</span>
                  <span className="group-hover:-translate-x-1 transition-transform">{locale === "en" ? "→" : "←"}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{labels.upcomingAppointmentsTitle}</h2>
              <button
                onClick={() => router.push(`${basePrefix}/patient/appointments`)}
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                {labels.viewAll}
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(appointment.status)}`}>
                      {labels.status[appointment.status] || appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      📅 {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      🕐 {appointment.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {appointment.type === "clinic" ? "📍" : "📹"} {labels.type[appointment.type] || appointment.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{labels.recentReportsTitle}</h2>
              <button
                onClick={() => router.push(`${basePrefix}/patient/results`)}
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                {labels.viewAll}
              </button>
            </div>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`${basePrefix}/patient/results`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{report.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{report.doctor}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(report.priority)}`}>
                      {labels.priority[report.priority] || report.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(report.status)}`}>
                      {labels.status[report.status] || report.status}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">📅 {report.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{labels.recentActivityTitle}</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="text-3xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
