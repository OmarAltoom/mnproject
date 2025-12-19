"use client";

import DoctorLayout from "../DoctorLayout";
import { useToast } from "@/app/components/ui/Toast";
import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaEye,
  FaComments,
  FaFileAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaUserPlus,
  FaTimes,
  FaHistory,
  FaHospital,
} from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";
import { formatDate } from "@/app/lib/date";

export default function DoctorPatientsPage() {
  const { showToast, ToastContainer } = useToast();
  const { t, locale } = useLocale();
  const dp = t.doctorPatients || {};

  const tr = locale === "en"
    ? {
        title: "Patients",
        subtitle: "Manage and follow up patient records",
        addButton: "Add patient",
        ageSuffix: "yrs",
        toast: {
          addSoon: "New patient coming soon",
          viewDetails: "Viewing patient",
          chat: "Starting chat with",
          call: "Calling",
        },
        stats: { total: "Total patients", stable: "Stable", critical: "Critical", recovering: "Recovering" },
        searchPlaceholder: "Search patient by name, phone, or diagnosis...",
        filters: { all: "All statuses" },
        statuses: { stable: "Stable", critical: "Critical", recovering: "Recovering" },
        labels: {
          lastVisit: "Last visit:",
          nextAppointment: "Next appointment:",
          diagnosis: "Diagnosis:",
          bloodType: "Blood type:",
          scans: "Scans:",
          chronic: "Chronic conditions:",
          phone: "Phone:",
          email: "Email:",
          status: "Status:",
        },
        sections: {
          contact: "Contact information",
          medical: "Medical information",
          diagnosis: "Current diagnosis",
          appointments: "Appointments",
          stats: "Statistics",
        },
        actions: { view: "View", chat: "Chat", call: "Call" },
        emptyState: "No results",
      }
    : {
        title: "المرضى",
        subtitle: "إدارة ومتابعة ملفات المرضى",
        addButton: "إضافة مريض",
        ageSuffix: "سنة",
        toast: {
          addSoon: "ميزة إضافة مريض قريباً",
          viewDetails: "عرض بيانات المريض",
          chat: "بدء محادثة مع",
          call: "الاتصال بـ",
        },
        stats: { total: "إجمالي المرضى", stable: "مستقر", critical: "حرج", recovering: "قيد التعافي" },
        searchPlaceholder: "ابحث عن مريض بالاسم أو الهاتف أو التشخيص...",
        filters: { all: "جميع الحالات" },
        statuses: { stable: "مستقر", critical: "حرج", recovering: "قيد التعافي" },
        labels: {
          lastVisit: "آخر زيارة:",
          nextAppointment: "الموعد القادم:",
          diagnosis: "التشخيص:",
          bloodType: "فصيلة الدم:",
          scans: "الفحوصات:",
          chronic: "حالات مزمنة:",
          phone: "الهاتف:",
          email: "البريد:",
          status: "الحالة:",
        },
        sections: {
          contact: "معلومات الاتصال",
          medical: "المعلومات الطبية",
          diagnosis: "التشخيص الحالي",
          appointments: "المواعيد",
          stats: "الإحصائيات",
        },
        actions: { view: "عرض", chat: "محادثة", call: "اتصال" },
        emptyState: "لا توجد نتائج",
      };

  const labels = {
    ...tr,
    ...dp,
    toast: { ...tr.toast, ...(dp.toast || {}) },
    stats: { ...tr.stats, ...(dp.stats || {}) },
    filters: { ...tr.filters, ...(dp.filters || {}) },
    statuses: { ...tr.statuses, ...(dp.statuses || {}) },
    labels: { ...tr.labels, ...(dp.labels || {}) },
    sections: { ...tr.sections, ...(dp.sections || {}) },
    actions: { ...tr.actions, ...(dp.actions || {}) },
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const patientsTemplate = useMemo(
    () =>
      locale === "en"
        ? [
            {
              id: 1,
              name: "Mohammed Ahmed Ali",
              age: 45,
              gender: "Male",
              phone: "+966 50 123 4567",
              email: "mohammed@email.com",
              status: "stable",
              lastVisit: "2025-12-04",
              nextAppointment: "2025-12-15",
              diagnosis: "Respiratory inflammation",
              scansCount: 5,
              avatar: "👨",
              bloodType: "O+",
              conditions: ["Hypertension"],
            },
            {
              id: 2,
              name: "Fatima Ali Hassan",
              age: 32,
              gender: "Female",
              phone: "+966 55 234 5678",
              email: "fatima@email.com",
              status: "critical",
              lastVisit: "2025-12-03",
              nextAppointment: "2025-12-05",
              diagnosis: "Meniscus tear",
              scansCount: 8,
              avatar: "👩",
              bloodType: "A+",
              conditions: ["Type 2 diabetes"],
            },
            {
              id: 3,
              name: "Ahmed Khaled Mahmoud",
              age: 28,
              gender: "Male",
              phone: "+966 54 345 6789",
              email: "ahmed@email.com",
              status: "stable",
              lastVisit: "2025-12-02",
              nextAppointment: "2025-12-20",
              diagnosis: "Shoulder fracture",
              scansCount: 3,
              avatar: "👨",
              bloodType: "B+",
              conditions: [],
            },
            {
              id: 4,
              name: "Sarah Mahmoud Yousef",
              age: 38,
              gender: "Female",
              phone: "+966 56 456 7890",
              email: "sarah@email.com",
              status: "recovering",
              lastVisit: "2025-12-01",
              nextAppointment: "2025-12-10",
              diagnosis: "Arthritis",
              scansCount: 12,
              avatar: "👩",
              bloodType: "AB+",
              conditions: ["Asthma allergy"],
            },
            {
              id: 5,
              name: "Omar Hassan Ibrahim",
              age: 52,
              gender: "Male",
              phone: "+966 53 567 8901",
              email: "omar@email.com",
              status: "stable",
              lastVisit: "2025-11-30",
              nextAppointment: "2025-12-18",
              diagnosis: "Routine check",
              scansCount: 15,
              avatar: "👨",
              bloodType: "O-",
              conditions: ["Heart", "Cholesterol"],
            },
          ]
        : [
            {
              id: 1,
              name: "محمد أحمد علي",
              age: 45,
              gender: "ذكر",
              phone: "+966 50 123 4567",
              email: "mohammed@email.com",
              status: "stable",
              lastVisit: "2025-12-04",
              nextAppointment: "2025-12-15",
              diagnosis: "التهاب في الجهاز التنفسي",
              scansCount: 5,
              avatar: "👨",
              bloodType: "O+",
              conditions: ["ضغط دم مرتفع"],
            },
            {
              id: 2,
              name: "فاطمة علي حسن",
              age: 32,
              gender: "أنثى",
              phone: "+966 55 234 5678",
              email: "fatima@email.com",
              status: "critical",
              lastVisit: "2025-12-03",
              nextAppointment: "2025-12-05",
              diagnosis: "تمزق في الغضروف",
              scansCount: 8,
              avatar: "👩",
              bloodType: "A+",
              conditions: ["سكري النوع 2"],
            },
            {
              id: 3,
              name: "أحمد خالد محمود",
              age: 28,
              gender: "ذكر",
              phone: "+966 54 345 6789",
              email: "ahmed@email.com",
              status: "stable",
              lastVisit: "2025-12-02",
              nextAppointment: "2025-12-20",
              diagnosis: "كسر في الكتف",
              scansCount: 3,
              avatar: "👨",
              bloodType: "B+",
              conditions: [],
            },
            {
              id: 4,
              name: "سارة محمود يوسف",
              age: 38,
              gender: "أنثى",
              phone: "+966 56 456 7890",
              email: "sarah@email.com",
              status: "recovering",
              lastVisit: "2025-12-01",
              nextAppointment: "2025-12-10",
              diagnosis: "التهاب المفاصل",
              scansCount: 12,
              avatar: "👩",
              bloodType: "AB+",
              conditions: ["حساسية الربو"],
            },
            {
              id: 5,
              name: "عمر حسن إبراهيم",
              age: 52,
              gender: "ذكر",
              phone: "+966 53 567 8901",
              email: "omar@email.com",
              status: "stable",
              lastVisit: "2025-11-30",
              nextAppointment: "2025-12-18",
              diagnosis: "فحص دوري",
              scansCount: 15,
              avatar: "👨",
              bloodType: "O-",
              conditions: ["قلب", "كوليسترول"],
            },
          ],
    [locale]
  );

  const [patients, setPatients] = useState(patientsTemplate);

  useEffect(() => {
    setPatients(patientsTemplate);
  }, [patientsTemplate]);

  const stats = {
    total: patients.length,
    stable: patients.filter((p) => p.status === "stable").length,
    critical: patients.filter((p) => p.status === "critical").length,
    recovering: patients.filter((p) => p.status === "recovering").length,
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      searchQuery === "" ||
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setViewModalOpen(true);
    showToast(`${labels.toast.viewDetails} ${patient.name}`, "info");
  };

  const handleStartChat = (patient) => {
    showToast(`${labels.toast.chat} ${patient.name}`, "info");
  };

  const handleCall = (patient) => {
    showToast(`${labels.toast.call} ${patient.name}...`, "info");
  };

  const getStatusConfig = (status) => {
    const config = {
      stable: { label: labels.statuses.stable, color: "bg-green-100 text-green-700 border-green-200", icon: FaCheckCircle },
      critical: { label: labels.statuses.critical, color: "bg-red-100 text-red-700 border-red-200", icon: FaExclamationTriangle },
      recovering: { label: labels.statuses.recovering, color: "bg-orange-100 text-orange-700 border-orange-200", icon: FaClock },
    };
    return config[status] || config.stable;
  };

  const getStatusBadge = (status) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;
    return (
      <span className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${config.color}`}>
        <Icon />
        {config.label}
      </span>
    );
  };

  return (
    <DoctorLayout>
      <ToastContainer />
      <div
        className={`min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 text-gray-900 dark:text-gray-100
        [&_div.bg-white]:dark:bg-zinc-900 [&_div.bg-white]:dark:border-zinc-800
        [&_p.text-gray-900]:dark:text-white [&_p.text-gray-600]:dark:text-gray-300 [&_p.text-gray-500]:dark:text-gray-400
        [&_span.text-gray-900]:dark:text-white [&_span.text-gray-600]:dark:text-gray-300
        [&_input.bg-white]:dark:bg-zinc-900 [&_input.border-gray-300]:dark:border-zinc-700 [&_input.text-gray-900]:dark:text-gray-100`}
      >
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaUsers className="text-blue-600" />
                {labels.title}
              </h1>
              <p className="mt-2 text-gray-600">{labels.subtitle}</p>
            </div>

            <button
              onClick={() => showToast(labels.toast.addSoon, "info")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaUserPlus />
              {labels.addButton}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{labels.stats.total}</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FaUsers className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{labels.statuses.stable}</p>
                  <p className="mt-1 text-3xl font-bold text-green-600">{stats.stable}</p>
                </div>
                <FaCheckCircle className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{labels.statuses.critical}</p>
                  <p className="mt-1 text-3xl font-bold text-red-600">{stats.critical}</p>
                </div>
                <FaExclamationTriangle className="text-3xl text-red-600" />
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{labels.statuses.recovering}</p>
                  <p className="mt-1 text-3xl font-bold text-orange-600">{stats.recovering}</p>
                </div>
                <FaClock className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={labels.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">{labels.filters.all}</option>
                  <option value="stable">{labels.statuses.stable}</option>
                  <option value="critical">{labels.statuses.critical}</option>
                  <option value="recovering">{labels.statuses.recovering}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Patients Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="group rounded-xl bg-white p-6 shadow-lg border border-gray-100 transition-all hover:shadow-2xl"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-3xl">
                      {patient.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} {labels.ageSuffix} • {patient.gender}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(patient.status)}
                </div>

                {/* Patient Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaPhone className="text-blue-600" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaEnvelope className="text-purple-600" />
                    {patient.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-green-600" />
                    {labels.labels.lastVisit} {formatDate(patient.lastVisit, locale)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-orange-600" />
                    {labels.labels.nextAppointment} {formatDate(patient.nextAppointment, locale)}
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <p className="text-xs font-medium text-blue-900 mb-1">{labels.labels.diagnosis}</p>
                  <p className="text-sm text-blue-800">{patient.diagnosis}</p>
                </div>

                {/* Medical Info */}
                <div className="mb-4 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">{labels.labels.bloodType}</span>
                    <span className="ml-2 font-bold text-red-600">{patient.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{labels.labels.scans}</span>
                    <span className="ml-2 font-bold text-blue-600">{patient.scansCount}</span>
                  </div>
                </div>

                {/* Conditions */}
                {patient.conditions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-1">{labels.labels.chronic}</p>
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-orange-100 border border-orange-200 px-2 py-1 text-xs text-orange-700"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(patient)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                  >
                    <FaEye />
                    {labels.actions.view}
                  </button>
                  <button
                    onClick={() => handleStartChat(patient)}
                    className="flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-white transition-all hover:bg-green-700"
                    title={labels.actions.chat}
                  >
                    <FaComments />
                  </button>
                  <button
                    onClick={() => handleCall(patient)}
                    className="flex items-center justify-center rounded-lg bg-purple-600 px-3 py-2 text-white transition-all hover:bg-purple-700"
                    title={labels.actions.call}
                  >
                    <FaPhone />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="rounded-xl bg-white p-12 text-center shadow-lg border border-gray-100">
              <FaUsers className="mx-auto mb-4 text-5xl text-gray-300" />
              <p className="text-lg text-gray-600">{labels.emptyState}</p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Details Modal */}
      {viewModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-4xl">
                  {selectedPatient.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-gray-600">
                    {selectedPatient.age} {labels.ageSuffix} • {selectedPatient.gender}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewModalOpen(false)}
                className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Contact Info */}
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                  <h3 className="mb-3 font-bold text-gray-900 flex items-center gap-2">
                    <FaPhone className="text-blue-600" />
                    {labels.sections.contact}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">{labels.labels.phone}</span>
                      <span className="mr-2 font-medium">{selectedPatient.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{labels.labels.email}</span>
                      <span className="mr-2 font-medium">{selectedPatient.email}</span>
                    </div>
                  </div>
                </div>

                {/* Medical Info */}
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                  <h3 className="mb-3 font-bold text-gray-900 flex items-center gap-2">
                    <FaHospital className="text-red-600" />
                    {labels.sections.medical}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">{labels.labels.bloodType}</span>
                      <span className="mr-2 font-bold text-red-600">{selectedPatient.bloodType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{labels.labels.status}</span>
                      <span className="mr-2">{getStatusBadge(selectedPatient.status)}</span>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="md:col-span-2 rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <h3 className="mb-2 font-bold text-blue-900 flex items-center gap-2">
                    <FaFileAlt />
                    {labels.sections.diagnosis}
                  </h3>
                  <p className="text-blue-800">{selectedPatient.diagnosis}</p>
                </div>

                {/* Appointments */}
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                  <h3 className="mb-3 font-bold text-gray-900 flex items-center gap-2">
                    <FaCalendarAlt className="text-green-600" />
                    {labels.sections.appointments}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">{labels.labels.lastVisit}</span>
                      <span className="mr-2 font-medium">
                        {formatDate(selectedPatient.lastVisit, locale)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">{labels.labels.nextAppointment}</span>
                      <span className="mr-2 font-medium">
                        {formatDate(selectedPatient.nextAppointment, locale)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                  <h3 className="mb-3 font-bold text-gray-900 flex items-center gap-2">
                    <FaHistory className="text-purple-600" />
                    {labels.sections.stats}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">{labels.labels.scans}</span>
                      <span className="mr-2 font-bold text-blue-600">{selectedPatient.scansCount}</span>
                    </div>
                  </div>
                </div>

                {/* Chronic Conditions */}
                {selectedPatient.conditions.length > 0 && (
                  <div className="md:col-span-2 rounded-lg bg-orange-50 border border-orange-200 p-4">
                    <h3 className="mb-3 font-bold text-orange-900">{labels.labels.chronic}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.conditions.map((condition, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-orange-100 border border-orange-300 px-3 py-1 text-sm text-orange-800"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DoctorLayout>
  );
}
