"use client";
import { useState } from "react";
import AdminLayout from "../AdminLayout";
import { useToast } from "@/app/components/ui/Toast";
import useLocale from "@/app/hooks/useLocale";
import {
  FaUsers,
  FaMagnifyingGlass,
  FaPlus,
  FaDownload,
  FaEye,
  FaPencil,
  FaTrash,
  FaX,
  FaFloppyDisk,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaClock,
  FaHeart,
  FaVial,
} from "react-icons/fa6";


export default function PatientsPage() {
  const { showToast, ToastContainer } = useToast();
  const { t, locale } = useLocale();
  const ap = t.adminPatients || {};

  const tr = locale === "en" ? {
    breadcrumbs: ["Home", "Patients"],
    headerTitle: "Patients Management",
    headerSubtitle: "View and manage patient records and appointments",
    buttons: {
      export: "Export",
      addPatient: "Add Patient",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      saveChanges: "Save changes",
      cancel: "Cancel"
    },
    stats: {
      totalPatients: "Total Patients",
      activePatients: "Active Patients",
      todayVisits: "Today's Visits",
      totalReports: "Total Reports"
    },
    filters: {
      searchPlaceholder: "Search by name, email, phone or patient ID...",
      genderAll: "All genders",
      statusAll: "All statuses"
    },
    genders: {
      male: "Male",
      female: "Female"
    },
    statuses: {
      active: "Active",
      pending: "Pending",
      banned: "Banned"
    },
    cards: {
      appointments: "Appointments",
      reports: "Reports",
      lastVisit: "Last visit"
    },
    ageUnit: "yrs",
    modals: {
      addTitle: "Add New Patient",
      editTitle: "Edit Patient",
      detailsTitle: "Patient Details",
      fullName: "Full name",
      email: "Email",
      phone: "Mobile number",
      gender: "Gender",
      age: "Age",
      bloodType: "Blood type",
      joinDate: "Join date",
      allergies: "Allergies",
      chronicDiseases: "Chronic diseases",
      medicalAppointments: "Medical appointments",
      medicalReports: "Medical reports"
    },
    confirmDelete: {
      title: "Delete confirmation",
      description: "Are you sure you want to delete patient {{name}}? This action cannot be undone.",
      yes: "Yes, delete",
      no: "Cancel"
    },
    table: {
      noMatches: "No patients match the current filters."
    },
    csvHeaders: ["Patient ID", "Name", "Email", "Phone", "Gender", "Age", "Status"],
    toast: {
      fillFields: "Please fill all fields",
      patientAdded: "Patient added successfully",
      patientUpdated: "Patient updated successfully",
      patientDeleted: "Patient deleted",
      exportStarted: "Exporting data..."
    }
  } : {
    breadcrumbs: ["الرئيسية", "المرضى"],
    headerTitle: "إدارة المرضى",
    headerSubtitle: "عرض وإدارة بيانات المرضى والمواعيد الطبية",
    buttons: {
      export: "تصدير",
      addPatient: "إضافة مريض",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      saveChanges: "حفظ التغييرات",
      cancel: "إلغاء"
    },
    stats: {
      totalPatients: "إجمالي المرضى",
      activePatients: "المرضى النشطون",
      todayVisits: "زيارات اليوم",
      totalReports: "إجمالي التقارير"
    },
    filters: {
      searchPlaceholder: "بحث بالاسم، البريد، الجوال، أو رقم المريض...",
      genderAll: "جميع الأنواع",
      statusAll: "جميع الحالات"
    },
    genders: {
      male: "ذكر",
      female: "أنثى"
    },
    statuses: {
      active: "نشط",
      pending: "معلق",
      banned: "محظور"
    },
    cards: {
      appointments: "المواعيد",
      reports: "التقارير",
      lastVisit: "آخر زيارة"
    },
    ageUnit: "سنة",
    modals: {
      addTitle: "إضافة مريض جديد",
      editTitle: "تعديل بيانات المريض",
      detailsTitle: "تفاصيل المريض",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      gender: "النوع",
      age: "العمر",
      bloodType: "فصيلة الدم",
      joinDate: "تاريخ الانضمام",
      allergies: "الحساسية",
      chronicDiseases: "الأمراض المزمنة",
      medicalAppointments: "المواعيد الطبية",
      medicalReports: "التقارير الطبية"
    },
    confirmDelete: {
      title: "تأكيد الحذف",
      description: "هل أنت متأكد من حذف المريض {{name}}؟ لا يمكن التراجع عن هذا الإجراء.",
      yes: "نعم، احذف",
      no: "إلغاء"
    },
    table: {
      noMatches: "لا توجد نتائج مطابقة للفلاتر المحددة"
    },
    csvHeaders: ["رقم المريض", "الاسم", "البريد الإلكتروني", "رقم الجوال", "النوع", "العمر", "الحالة"],
    toast: {
      fillFields: "يرجى تعبئة جميع الحقول",
      patientAdded: "تم إضافة المريض بنجاح",
      patientUpdated: "تم تحديث بيانات المريض",
      patientDeleted: "تم حذف المريض",
      exportStarted: "جاري تصدير البيانات..."
    }
  };

  // State
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", gender: "male", age: "", medicalId: "" });

  // Sample Data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "منى عبد الله محمد",
      email: "mona.abdullah@patient.com",
      phone: "0501234567",
      gender: "female",
      age: 32,
      status: "active",
      joinDate: "2023-03-15",
      lastVisit: "2025-12-02 14:30",
      medicalId: "PAT-001",
      avatar: "👩‍🦰",
      bloodType: "AB+",
      allergies: ["بنسلين"],
      chronicDiseases: ["السكري"],
      appointmentsCount: 12,
      reportsCount: 5,
    },
    {
      id: 2,
      name: "سعيد حسن إبراهيم",
      email: "saeed.hassan@patient.com",
      phone: "0502345678",
      gender: "male",
      age: 45,
      status: "active",
      joinDate: "2023-07-20",
      lastVisit: "2025-12-01 10:15",
      medicalId: "PAT-002",
      avatar: "👨‍🦱",
      bloodType: "O+",
      allergies: [],
      chronicDiseases: ["ارتفاع ضغط الدم"],
      appointmentsCount: 8,
      reportsCount: 3,
    },
    {
      id: 3,
      name: "هالة يوسف علي",
      email: "hala.youssef@patient.com",
      phone: "0503456789",
      gender: "female",
      age: 28,
      status: "active",
      joinDate: "2024-01-10",
      lastVisit: "2025-11-28 16:45",
      medicalId: "PAT-003",
      avatar: "👩",
      bloodType: "A-",
      allergies: ["مورفين"],
      chronicDiseases: [],
      appointmentsCount: 5,
      reportsCount: 2,
    },
    {
      id: 4,
      name: "أحمد محمود خالد",
      email: "ahmed.mahmoud@patient.com",
      phone: "0504567890",
      gender: "male",
      age: 55,
      status: "pending",
      joinDate: "2023-05-05",
      lastVisit: "2025-11-15 09:00",
      medicalId: "PAT-004",
      avatar: "👨‍🦲",
      bloodType: "B+",
      allergies: [],
      chronicDiseases: ["قصور القلب", "السكري"],
      appointmentsCount: 15,
      reportsCount: 8,
    },
    {
      id: 5,
      name: "فاطمة سالم محمد",
      email: "fatima.salem@patient.com",
      phone: "0505678901",
      gender: "female",
      age: 38,
      status: "active",
      joinDate: "2023-09-12",
      lastVisit: "2025-12-03 13:20",
      medicalId: "PAT-005",
      avatar: "👩‍🦱",
      bloodType: "O-",
      allergies: ["أسبرين"],
      chronicDiseases: [],
      appointmentsCount: 10,
      reportsCount: 4,
    },
    {
      id: 6,
      name: "علي عمر محمد",
      email: "ali.omar@patient.com",
      phone: "0506789012",
      gender: "male",
      age: 50,
      status: "active",
      joinDate: "2024-02-18",
      lastVisit: "2025-12-03 11:00",
      medicalId: "PAT-006",
      avatar: "👨",
      bloodType: "AB-",
      allergies: [],
      chronicDiseases: ["قصور الكلى"],
      appointmentsCount: 7,
      reportsCount: 3,
    },
  ]);

  // Stats Configuration
  const stats = [
    {
      title: ap.stats?.totalPatients || tr.stats.totalPatients,
      value: patients.length,
      icon: FaUsers,
      color: "text-blue-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: ap.stats?.activePatients || tr.stats.activePatients,
      value: patients.filter((p) => p.status === "active").length,
      icon: FaHeart,
      color: "text-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: ap.stats?.todayVisits || tr.stats.todayVisits,
      value: patients.reduce((sum, p) => sum + p.appointmentsCount, 0),
      icon: FaCalendar,
      color: "text-orange-600",
      bgLight: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: ap.stats?.totalReports || tr.stats.totalReports,
      value: patients.reduce((sum, p) => sum + p.reportsCount, 0),
      icon: FaVial,
      color: "text-purple-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  // Helper Functions
  const gendersMap = {
    male: ap.genders?.male || tr.genders.male,
    female: ap.genders?.female || tr.genders.female,
  };

  const statusesMap = {
    active: ap.statuses?.active || tr.statuses.active,
    pending: ap.statuses?.pending || tr.statuses.pending,
    banned: ap.statuses?.banned || tr.statuses.banned,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "pending":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300";
      case "banned":
        return "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300";
    }
  };

  const getGenderColor = (gender) => {
    return gender === "male" ? "text-blue-600" : "text-pink-600";
  };

  // Event Handlers
  const handleAddPatient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast(ap.toast?.fillFields || tr.toast.fillFields, "error");
      return;
    }
    const newPatient = {
      id: patients.length + 1,
      ...formData,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      lastVisit: new Date().toLocaleString(locale === "en" ? "en-US" : "ar-SA"),
      medicalId: `PAT-${String(patients.length + 1).padStart(3, "0")}`,
      avatar: formData.gender === "male" ? "👨" : "👩",
      bloodType: "O+",
      allergies: [],
      chronicDiseases: [],
      appointmentsCount: 0,
      reportsCount: 0,
    };
    setPatients([...patients, newPatient]);
    setFormData({ name: "", email: "", phone: "", gender: "male", age: "" });
    setShowAddModal(false);
    showToast(ap.toast?.patientAdded || tr.toast.patientAdded, "success");
  };

  const handleEditPatient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast(ap.toast?.fillFields || tr.toast.fillFields, "error");
      return;
    }
    setPatients(
      patients.map((p) =>
        p.id === selectedPatient.id ? { ...p, ...formData } : p
      )
    );
    setFormData({ name: "", email: "", phone: "", gender: "male", age: "" });
    setShowEditModal(false);
    showToast(ap.toast?.patientUpdated || tr.toast.patientUpdated, "success");
  };

  const handleDeletePatient = () => {
    setPatients(patients.filter((p) => p.id !== selectedPatient.id));
    setShowDeleteModal(false);
    showToast(ap.toast?.patientDeleted || tr.toast.patientDeleted, "success");
  };

  const handleExport = () => {
    const headers = ap.csvHeaders || tr.csvHeaders;
    const csv = [
      headers,
      ...patients.map((p) => [
        p.medicalId,
        p.name,
        p.email,
        p.phone,
        gendersMap[p.gender] || p.gender,
        p.age,
        statusesMap[p.status] || p.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patients.csv";
    a.click();
    showToast(ap.toast?.exportStarted || tr.toast.exportStarted, "success");
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      age: patient.age,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (patient) => {
    setSelectedPatient(patient);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  // Filtering
  const filteredPatients = patients.filter((patient) => {
    const matchSearch =
      patient.name.includes(search) ||
      patient.email.includes(search) ||
      patient.phone.includes(search) ||
      patient.medicalId.includes(search);
    const matchGender = filterGender === "all" || patient.gender === filterGender;
    const matchStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchSearch && matchGender && matchStatus;
  });

  return (
    <AdminLayout breadcrumbs={ap.breadcrumbs || tr.breadcrumbs}>
      <ToastContainer />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{ap.headerTitle || tr.headerTitle}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{ap.headerSubtitle || tr.headerSubtitle}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaDownload />
              <span>{ap.buttons?.export || tr.buttons.export}</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus />
              <span>{ap.buttons?.addPatient || tr.buttons.addPatient}</span>
            </button>
          </div>
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
                  <stat.icon className={`text-2xl ${stat.color}`} />
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
              <FaMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={ap.filters?.searchPlaceholder || tr.filters.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{ap.filters?.genderAll || tr.filters.genderAll}</option>
              <option value="male">{gendersMap.male}</option>
              <option value="female">{gendersMap.female}</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{ap.filters?.statusAll || tr.filters.statusAll}</option>
              <option value="active">{statusesMap.active}</option>
              <option value="pending">{statusesMap.pending}</option>
              <option value="banned">{statusesMap.banned}</option>
            </select>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                {/* Patient Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{patient.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{patient.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{patient.medicalId}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(patient.status)}`}>
                        {statusesMap[patient.status] || patient.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FaEnvelope className="text-gray-400" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FaPhone className="text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className={getGenderColor(patient.gender)}>
                      {patient.gender === "male" ? "♂️" : "♀️"}
                    </span>
                    <span>{gendersMap[patient.gender] || patient.gender} • {patient.age} {ap.ageUnit || tr.ageUnit}</span>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">{ap.cards?.appointments || tr.cards.appointments}</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{patient.appointmentsCount}</p>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">{ap.cards?.reports || tr.cards.reports}</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{patient.reportsCount}</p>
                  </div>
                </div>

                {/* Last Visit */}
                <div className="mb-4 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <FaClock className="text-gray-400" />
                    <span>{ap.cards?.lastVisit || tr.cards.lastVisit}:</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.lastVisit}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openDetailsModal(patient)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <FaEye />
                    {ap.buttons?.view || tr.buttons.view}
                  </button>
                  <button
                    onClick={() => openEditModal(patient)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <FaPencil />
                    {ap.buttons?.edit || tr.buttons.edit}
                  </button>
                  <button
                    onClick={() => openDeleteModal(patient)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <FaTrash />
                    {ap.buttons?.delete || tr.buttons.delete}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{ap.table?.noMatches || tr.table.noMatches}</p>
          </div>
        )}

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ap.modals?.addTitle || tr.modals.addTitle}</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.fullName || tr.modals.fullName}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.email || tr.modals.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.phone || tr.modals.phone}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.gender || tr.modals.gender}</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      <option value="male">{gendersMap.male}</option>
                      <option value="female">{gendersMap.female}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.age || tr.modals.age}</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddPatient}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <FaFloppyDisk />
                  <span>{ap.buttons?.save || tr.buttons.save}</span>
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {ap.buttons?.cancel || tr.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Patient Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ap.modals?.editTitle || tr.modals.editTitle}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.fullName || tr.modals.fullName}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.email || tr.modals.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.phone || tr.modals.phone}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.gender || tr.modals.gender}</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      <option value="male">{gendersMap.male}</option>
                      <option value="female">{gendersMap.female}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ap.modals?.age || tr.modals.age}</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditPatient}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <FaFloppyDisk />
                  <span>{ap.buttons?.saveChanges || tr.buttons.saveChanges}</span>
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {ap.buttons?.cancel || tr.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ap.modals?.detailsTitle || tr.modals.detailsTitle}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <div className="text-5xl">{selectedPatient.avatar}</div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPatient.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedPatient.medicalId}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(selectedPatient.status)}`}>
                      {statusesMap[selectedPatient.status] || selectedPatient.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <FaEnvelope />
                    <span className="text-sm">{ap.modals?.email || tr.modals.email}</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.email}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <FaPhone />
                    <span className="text-sm">{ap.modals?.phone || tr.modals.phone}</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.phone}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <span className={getGenderColor(selectedPatient.gender)}>{selectedPatient.gender === "male" ? "♂️" : "♀️"}</span>
                    <span className="text-sm">{ap.modals?.gender || tr.modals.gender} & {ap.modals?.age || tr.modals.age}</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{gendersMap[selectedPatient.gender] || selectedPatient.gender} - {selectedPatient.age} {ap.ageUnit || tr.ageUnit}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <FaHeart className="text-red-500" />
                    <span className="text-sm">{ap.modals?.bloodType || tr.modals.bloodType}</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.bloodType}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <FaCalendar />
                    <span className="text-sm">{ap.modals?.joinDate || tr.modals.joinDate}</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.joinDate}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <FaClock />
                    <span className="text-sm">{ap.cards?.lastVisit || tr.cards.lastVisit}</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedPatient.lastVisit}</p>
                </div>
              </div>

              {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h5 className="font-bold text-red-900 dark:text-red-300 mb-2">⚠️ {ap.modals?.allergies || tr.modals.allergies}</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies.map((allergy, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPatient.chronicDiseases && selectedPatient.chronicDiseases.length > 0 && (
                <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h5 className="font-bold text-orange-900 dark:text-orange-300 mb-2">🏥 {ap.modals?.chronicDiseases || tr.modals.chronicDiseases}</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.chronicDiseases.map((disease, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">{ap.modals?.medicalAppointments || tr.modals.medicalAppointments}</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{selectedPatient.appointmentsCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">{ap.modals?.medicalReports || tr.modals.medicalReports}</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{selectedPatient.reportsCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ap.confirmDelete?.title || tr.confirmDelete.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {(ap.confirmDelete?.description || tr.confirmDelete.description).replace("{{name}}", selectedPatient.name)}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDeletePatient}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  {ap.confirmDelete?.yes || tr.confirmDelete.yes}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {ap.confirmDelete?.no || tr.confirmDelete.no}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
