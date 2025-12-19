"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ui/Toast";
import { FaCalendarAlt, FaVideo, FaMapMarkerAlt, FaClock, FaUserMd, FaSearch, FaFilter, FaPlus, FaPhone, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function PatientAppointmentsPage() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const basePrefix = locale === "en" ? "/en" : "/ar";
  const copy = t.appointments;
  const { showToast, ToastContainer } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showBookModal, setShowBookModal] = useState(false);

  const initialAppointments = useMemo(() => locale === "en" ? [
    {
      id: 1,
      doctorName: "Dr. Sarah Ahmed",
      specialty: "Radiology Consultant",
      date: "Dec 05, 2025",
      time: "10:00 AM",
      type: "clinic",
      status: "confirmed",
      location: "Al Noor Medical Clinic - 2nd floor",
      phone: "0123456789",
      reason: "Review X-ray results",
      notes: "Please bring previous scans"
    },
    {
      id: 2,
      doctorName: "Dr. Mohammed Ali",
      specialty: "Orthopedic Surgeon",
      date: "Dec 07, 2025",
      time: "02:30 PM",
      type: "online",
      status: "pending",
      phone: "0123456780",
      reason: "Consultation about knee pain",
      notes: "Zoom appointment"
    },
    {
      id: 3,
      doctorName: "Dr. Fatima Hassan",
      specialty: "General Practitioner",
      date: "Dec 10, 2025",
      time: "11:00 AM",
      type: "clinic",
      status: "confirmed",
      location: "Al Salam Hospital - Outpatient",
      phone: "0123456781",
      reason: "Routine checkup",
      notes: ""
    },
    {
      id: 4,
      doctorName: "Dr. Ahmed Khalid",
      specialty: "Cardiologist",
      date: "Nov 28, 2025",
      time: "09:00 AM",
      type: "clinic",
      status: "completed",
      location: "Heart Specialty Center",
      phone: "0123456782",
      reason: "Cardiac exam",
      notes: "ECG completed"
    },
    {
      id: 5,
      doctorName: "Dr. Laila Youssef",
      specialty: "Neurologist",
      date: "Nov 20, 2025",
      time: "03:00 PM",
      type: "online",
      status: "cancelled",
      phone: "0123456783",
      reason: "Chronic headache consult",
      notes: "Cancelled by patient"
    },
    {
      id: 6,
      doctorName: "Dr. Omar El-Sayed",
      specialty: "Gastroenterologist",
      date: "Dec 15, 2025",
      time: "01:00 PM",
      type: "clinic",
      status: "pending",
      location: "Al Hayat Hospital - 3rd floor",
      phone: "0123456784",
      reason: "Colon treatment follow-up",
      notes: "8-hour fasting before visit"
    }
  ] : [
    {
      id: 1,
      doctorName: "د. سارة أحمد",
      specialty: "أخصائي أشعة",
      date: "2025-12-05",
      time: "10:00 صباحاً",
      type: "clinic",
      status: "confirmed",
      location: "عيادة النور الطبية - الطابق الثاني",
      phone: "0123456789",
      reason: "مراجعة نتائج الأشعة",
      notes: "يرجى إحضار الأشعة السابقة"
    },
    {
      id: 2,
      doctorName: "د. محمد علي",
      specialty: "جراح عظام",
      date: "2025-12-07",
      time: "02:30 مساءً",
      type: "online",
      status: "pending",
      phone: "0123456780",
      reason: "استشارة حول آلام الركبة",
      notes: "موعد عبر Zoom"
    },
    {
      id: 3,
      doctorName: "د. فاطمة حسن",
      specialty: "طب عام",
      date: "2025-12-10",
      time: "11:00 صباحاً",
      type: "clinic",
      status: "confirmed",
      location: "مستشفى السلام - قسم العيادات الخارجية",
      phone: "0123456781",
      reason: "فحص دوري",
      notes: ""
    },
    {
      id: 4,
      doctorName: "د. أحمد خالد",
      specialty: "أخصائي قلب",
      date: "2025-11-28",
      time: "09:00 صباحاً",
      type: "clinic",
      status: "completed",
      location: "مركز القلب التخصصي",
      phone: "0123456782",
      reason: "فحص القلب",
      notes: "تم إجراء تخطيط القلب"
    },
    {
      id: 5,
      doctorName: "د. ليلى يوسف",
      specialty: "أخصائي أعصاب",
      date: "2025-11-20",
      time: "03:00 مساءً",
      type: "online",
      status: "cancelled",
      phone: "0123456783",
      reason: "استشارة عن الصداع المزمن",
      notes: "تم الإلغاء من قبل المريض"
    },
    {
      id: 6,
      doctorName: "د. عمر السيد",
      specialty: "أخصائي جهاز هضمي",
      date: "2025-12-15",
      time: "01:00 مساءً",
      type: "clinic",
      status: "pending",
      location: "مستشفى الحياة - الطابق الثالث",
      phone: "0123456784",
      reason: "متابعة علاج القولون",
      notes: "صيام 8 ساعات قبل الموعد"
    }
  ]
  , [locale]);

  const [appointments, setAppointments] = useState(initialAppointments);

  useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  const stats = [
    {
      title: copy.stats.total,
      value: appointments.length,
      icon: FaCalendarAlt,
      color: "bg-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: copy.stats.confirmed,
      value: appointments.filter(a => a.status === "confirmed").length,
      icon: FaCheckCircle,
      color: "bg-green-500",
      bgLight: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: copy.stats.pending,
      value: appointments.filter(a => a.status === "pending").length,
      icon: FaHourglassHalf,
      color: "bg-orange-500",
      bgLight: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: copy.stats.cancelled,
      value: appointments.filter(a => a.status === "cancelled").length,
      icon: FaTimesCircle,
      color: "bg-red-500",
      bgLight: "bg-red-50 dark:bg-red-900/20"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      case "completed":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  const handleConfirmAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "confirmed" } : app
    ));
    showToast(copy.toast.confirm, "success");
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "cancelled" } : app
    ));
    showToast(copy.toast.cancel, "info");
  };

  const handleReschedule = (id) => {
    showToast(copy.toast.reschedule, "info");
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesType = filterType === "all" || app.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const upcomingAppointments = filteredAppointments.filter(app => 
    new Date(app.date) >= new Date() && app.status !== "cancelled" && app.status !== "completed"
  );

  const pastAppointments = filteredAppointments.filter(app => 
    new Date(app.date) < new Date() || app.status === "cancelled" || app.status === "completed"
  );

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{copy.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{copy.subtitle}</p>
          </div>
          <button
            onClick={() => setShowBookModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
          >
            <FaPlus />
            <span>{copy.newButton}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgLight}`}>
                  <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={copy.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">{copy.status.all}</option>
                <option value="confirmed">{copy.status.confirmed}</option>
                <option value="pending">{copy.status.pending}</option>
                <option value="cancelled">{copy.status.cancelled}</option>
                <option value="completed">{copy.status.completed}</option>
              </select>
            </div>
            <div className="relative">
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">{copy.type.all}</option>
                <option value="clinic">{copy.type.clinic}</option>
                <option value="online">{copy.type.online}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{copy.upcoming}</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-slate-700">
              <FaCalendarAlt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">{copy.noUpcoming}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FaUserMd className="text-2xl text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(appointment.status)}`}>
                      {copy.status[appointment.status] ?? appointment.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="text-blue-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <FaClock className="text-green-500" />
                      <span>{appointment.time}</span>
                    </div>
                    {appointment.type === "clinic" && appointment.location && (
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                    )}
                    {appointment.type === "online" && (
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <FaVideo className="text-purple-500" />
                        <span className="text-sm">{copy.onlineLabel}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <FaPhone className="text-orange-500" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{copy.reasonLabel}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.reason}</p>
                    {appointment.notes && (
                      <>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 mb-1">{copy.notesLabel}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.notes}</p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {appointment.status === "pending" && (
                      <button
                        onClick={() => handleConfirmAppointment(appointment.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        {copy.actions.confirm}
                      </button>
                    )}
                    <button
                      onClick={() => handleReschedule(appointment.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      {copy.actions.reschedule}
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      {copy.actions.cancel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{copy.past}</h2>
          {pastAppointments.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-slate-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">{copy.noPast}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <FaUserMd className="text-xl text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.date}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{appointment.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(appointment.status)}`}>
                        {copy.status[appointment.status] ?? appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Book Appointment Modal */}
        {showBookModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{copy.modalTitle}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {copy.modalBody}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`${basePrefix}/patient/chat`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {copy.chatButton}
                </button>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {copy.closeButton}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
