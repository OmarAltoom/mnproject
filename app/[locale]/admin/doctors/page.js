"use client";
import { useState } from "react";
import AdminLayout from "../AdminLayout";
import DoctorsTable from "../../../components/admin/DoctorsTable";
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
  FaStethoscope,
  FaVial,
  FaCertificate,
  FaStar,
} from "react-icons/fa6";


export default function DoctorsPage() {
  const { showToast, ToastContainer } = useToast();
  const { t, locale } = useLocale();
  const ad = t.adminDoctors || {};

  const tr = locale === "en" ? {
    breadcrumbs: ["Home", "Doctors"],
    headerTitle: "Doctors Management",
    headerSubtitle: "View and manage doctor accounts and licenses",
    buttons: {
      export: "Export",
      addDoctor: "Add Doctor",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      saveChanges: "Save changes",
      cancel: "Cancel"
    },
    stats: {
      totalDoctors: "Total Doctors",
      activeDoctors: "Active Doctors",
      todayAppointments: "Today's Appointments",
      totalPatients: "Total Patients"
    },
    filters: {
      searchPlaceholder: "Search by name, email, phone or license ID...",
      specialtyAll: "All specialties",
      statusAll: "All statuses"
    },
    specialties: {
      radiology: "Radiology",
      pulmonology: "Pulmonology",
      orthopedics: "Orthopedic Surgery",
      gynecology: "Gynecology & Obstetrics",
      cardiology: "Cardiology",
      internal: "Internal Medicine",
      general: "General"
    },
    statuses: {
      active: "Active",
      suspended: "Suspended",
      banned: "Banned"
    },
    cards: {
      experience: "Experience",
      patients: "Patients",
      today: "Today",
      joinDate: "Join date"
    },
    reviewLabel: "reviews",
    expUnit: "yr",
    modals: {
      addTitle: "Add New Doctor",
      editTitle: "Edit Doctor",
      detailsTitle: "Doctor Details",
      fullName: "Full name",
      email: "Email",
      phone: "Mobile number",
      specialty: "Specialty",
      experience: "Years of experience",
      licenseNumber: "License number",
      status: "Status"
    },
    confirmDelete: {
      title: "Delete confirmation",
      description: "Are you sure you want to delete doctor {{name}}? This action cannot be undone.",
      yes: "Yes, delete",
      no: "Cancel"
    },
    table: {
      noMatches: "No doctors match the current filters."
    },
    sections: {
      qualifications: "Qualifications",
      appointmentsToday: "Scheduled today"
    },
    csvHeaders: ["License No.", "Name", "Email", "Phone", "Specialty", "Experience", "Status"],
    toast: {
      fillFields: "Please fill all fields",
      doctorAdded: "Doctor added successfully",
      doctorUpdated: "Doctor updated successfully",
      doctorDeleted: "Doctor deleted",
      exportStarted: "Exporting data..."
    }
  } : {
    breadcrumbs: ["الرئيسية", "الأطباء"],
    headerTitle: "إدارة الأطباء",
    headerSubtitle: "عرض وإدارة حسابات الأطباء والترخيصات الطبية",
    buttons: {
      export: "تصدير",
      addDoctor: "إضافة طبيب",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      saveChanges: "حفظ التغييرات",
      cancel: "إلغاء"
    },
    stats: {
      totalDoctors: "إجمالي الأطباء",
      activeDoctors: "الأطباء النشطون",
      todayAppointments: "مواعيد اليوم",
      totalPatients: "إجمالي المرضى"
    },
    filters: {
      searchPlaceholder: "بحث بالاسم، البريد، الجوال، أو رقم الترخيص...",
      specialtyAll: "جميع التخصصات",
      statusAll: "جميع الحالات"
    },
    specialties: {
      radiology: "الأشعة",
      pulmonology: "أمراض الصدرية",
      orthopedics: "جراحة العظام",
      gynecology: "طب النساء والتوليد",
      cardiology: "طب القلب",
      internal: "الأمراض الباطنية",
      general: "عام"
    },
    statuses: {
      active: "نشط",
      suspended: "معلق",
      banned: "محظور"
    },
    cards: {
      experience: "الخبرة",
      patients: "المرضى",
      today: "اليوم",
      joinDate: "تاريخ الانضمام"
    },
    reviewLabel: "تقييم",
    expUnit: "سنة",
    modals: {
      addTitle: "إضافة طبيب جديد",
      editTitle: "تعديل بيانات الطبيب",
      detailsTitle: "تفاصيل الطبيب",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      specialty: "التخصص",
      experience: "سنوات الخبرة",
      licenseNumber: "رقم الترخيص",
      status: "الحالة"
    },
    confirmDelete: {
      title: "تأكيد الحذف",
      description: "هل أنت متأكد من حذف الطبيب {{name}}؟ لا يمكن التراجع عن هذا الإجراء.",
      yes: "نعم، احذف",
      no: "إلغاء"
    },
    table: {
      noMatches: "لا توجد أطباء مطابقة للفلاتر المحددة"
    },
    sections: {
      qualifications: "المؤهلات العلمية",
      appointmentsToday: "المواعيد المجدولة اليوم"
    },
    csvHeaders: ["رقم الترخيص", "الاسم", "البريد الإلكتروني", "رقم الجوال", "التخصص", "سنوات الخبرة", "الحالة"],
    toast: {
      fillFields: "يرجى تعبئة جميع الحقول",
      doctorAdded: "تم إضافة الطبيب بنجاح",
      doctorUpdated: "تم تحديث بيانات الطبيب",
      doctorDeleted: "تم حذف الطبيب",
      exportStarted: "جاري تصدير البيانات..."
    }
  };

  // State
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "general",
    experience: "",
    status: "active",
  });

  // Sample Data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: locale === "en" ? "Dr. Mohammed Salem Ali" : "د. محمد سالم علي",
      email: "m.salem@hospital.com",
      phone: "0501234567",
      specialty: "radiology",
      experience: 12,
      status: "verified",
      joinDate: "2013-05-20",
      licenseNumber: "MED-2013-001",
      avatar: "👨‍⚕️",
      rating: 4.8,
      reviewsCount: 156,
      patientsCount: 320,
      appointmentsToday: 8,
      qualifications: ["بكالوريوس طب", "ماجستير الأشعة", "شهادة البورد"],
    },
    {
      id: 2,
      name: "د. ليلى حسن محمود",
      email: "l.hassan@hospital.com",
      phone: "0502345678",
      specialty: "pulmonology",
      experience: 10,
      status: "pending",
      joinDate: "2015-03-10",
      licenseNumber: "MED-2015-002",
      avatar: "👩‍⚕️",
      rating: 4.9,
      reviewsCount: 203,
      patientsCount: 285,
      appointmentsToday: 6,
      qualifications: ["بكالوريوس طب", "ماجستير الصدرية"],
    },
    {
      id: 3,
      name: "د. سامي يوسف إبراهيم",
      email: "s.youssef@hospital.com",
      phone: "0503456789",
      specialty: "orthopedics",
      experience: 15,
      status: "pending",
      joinDate: "2010-01-15",
      licenseNumber: "MED-2010-003",
      avatar: "👨‍⚕️",
      rating: 4.7,
      reviewsCount: 189,
      patientsCount: 410,
      appointmentsToday: 10,
      qualifications: ["بكالوريوس طب", "ماجستير الجراحة", "شهادة البورد الأمريكي"],
    },
    {
      id: 4,
      name: "د. فاطمة أحمد محمد",
      email: "f.ahmed@hospital.com",
      phone: "0504567890",
      specialty: "gynecology",
      experience: 8,
      status: "rejected",
      joinDate: "2017-07-22",
      licenseNumber: "MED-2017-004",
      avatar: "👩‍⚕️",
      rating: 4.6,
      reviewsCount: 142,
      patientsCount: 215,
      appointmentsToday: 5,
      qualifications: ["بكالوريوس طب", "ماجستير النساء والتوليد"],
    },
    {
      id: 5,
      name: "د. عمر خالد السيد",
      email: "o.khalid@hospital.com",
      phone: "0505678901",
      specialty: "cardiology",
      experience: 13,
      status: "verified",
      joinDate: "2012-09-05",
      licenseNumber: "MED-2012-005",
      avatar: "👨‍⚕️",
      rating: 4.9,
      reviewsCount: 218,
      patientsCount: 350,
      appointmentsToday: 7,
      qualifications: ["بكالوريوس طب", "ماجستير القلب", "شهادة البورد"],
    },
    {
      id: 6,
      name: "د. نور محمود علي",
      email: "n.mahmoud@hospital.com",
      phone: "0506789012",
      specialty: "internal",
      experience: 9,
      status: "pending",
      joinDate: "2016-02-18",
      licenseNumber: "MED-2016-006",
      avatar: "👩‍⚕️",
      rating: 4.5,
      reviewsCount: 127,
      patientsCount: 280,
      appointmentsToday: 6,
      qualifications: ["بكالوريوس طب", "ماجستير الأمراض الباطنية"],
    },
  ]);

  // Stats Configuration
  const stats = [
    {
      title: ad.stats?.totalDoctors || tr.stats.totalDoctors,
      value: doctors.length,
      icon: FaUsers,
      color: "text-blue-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: ad.stats?.activeDoctors || tr.stats.activeDoctors,
      value: doctors.filter((d) => d.status === "active").length,
      icon: FaStethoscope,
      color: "text-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: ad.stats?.todayAppointments || tr.stats.todayAppointments,
      value: doctors.reduce((sum, d) => sum + d.appointmentsToday, 0),
      icon: FaCalendar,
      color: "text-orange-600",
      bgLight: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: ad.stats?.totalPatients || tr.stats.totalPatients,
      value: doctors.reduce((sum, d) => sum + d.patientsCount, 0),
      icon: FaVial,
      color: "text-purple-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  // Helper Functions
  const specialtiesMap = {
    radiology: ad.specialties?.radiology || tr.specialties.radiology,
    pulmonology: ad.specialties?.pulmonology || tr.specialties.pulmonology,
    orthopedics: ad.specialties?.orthopedics || tr.specialties.orthopedics,
    gynecology: ad.specialties?.gynecology || tr.specialties.gynecology,
    cardiology: ad.specialties?.cardiology || tr.specialties.cardiology,
    internal: ad.specialties?.internal || tr.specialties.internal,
    general: ad.specialties?.general || tr.specialties.general,
  };
  
  const statusesMap = {
    active: ad.statuses?.active || tr.statuses.active,
    suspended: ad.statuses?.suspended || tr.statuses.suspended,
    banned: ad.statuses?.banned || tr.statuses.banned,
  };
  
  const specialties = Object.keys(specialtiesMap);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "suspended":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300";
      case "banned":
        return "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300";
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.7) return "text-yellow-500";
    if (rating >= 4.5) return "text-yellow-400";
    return "text-gray-400";
  };

  // Event Handlers
  const handleAddDoctor = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.specialty) {
      showToast(ad.toast?.fillFields || tr.toast.fillFields, "error");
      return;
    }
    const newDoctor = {
      id: doctors.length + 1,
      ...formData,
      joinDate: new Date().toISOString().split("T")[0],
      licenseNumber: `MED-${new Date().getFullYear()}-${String(doctors.length + 1).padStart(3, "0")}`,
      avatar: "👨‍⚕️",
      rating: 4.5,
      reviewsCount: 0,
      patientsCount: 0,
      appointmentsToday: 0,
      qualifications: [],
    };
    setDoctors([...doctors, newDoctor]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialty: "general",
      experience: "",
      status: "active",
    });
    setShowAddModal(false);
    showToast(ad.toast?.doctorAdded || tr.toast.doctorAdded, "success");
  };

  const handleEditDoctor = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.specialty) {
      showToast(ad.toast?.fillFields || tr.toast.fillFields, "error");
      return;
    }
    setDoctors(
      doctors.map((d) =>
        d.id === selectedDoctor.id ? { ...d, ...formData } : d
      )
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialty: "general",
      experience: "",
      status: "active",
    });
    setShowEditModal(false);
    showToast(ad.toast?.doctorUpdated || tr.toast.doctorUpdated, "success");
  };

  const handleDeleteDoctor = () => {
    setDoctors(doctors.filter((d) => d.id !== selectedDoctor.id));
    setShowDeleteModal(false);
    showToast(ad.toast?.doctorDeleted || tr.toast.doctorDeleted, "success");
  };

  const handleExport = () => {
    const headers = ad.csvHeaders || tr.csvHeaders;
    const csv = [
      headers,
      ...doctors.map((d) => [
        d.licenseNumber,
        d.name,
        d.email,
        d.phone,
        specialtiesMap[d.specialty] || d.specialty,
        d.experience,
        statusesMap[d.status] || d.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doctors.csv";
    a.click();
    showToast(ad.toast?.exportStarted || tr.toast.exportStarted, "success");
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialty: doctor.specialty,
      experience: doctor.experience,
      status: doctor.status,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsModal(true);
  };


  // Filtering
  const filteredDoctors = doctors.filter((doctor) => {
    const matchSearch =
      doctor.name.includes(search) ||
      doctor.email.includes(search) ||
      doctor.phone.includes(search) ||
      doctor.licenseNumber.includes(search);
    const matchSpecialty =
      filterSpecialty === "all" || doctor.specialty === filterSpecialty;
    const matchStatus = filterStatus === "all" || doctor.status === filterStatus;
    return matchSearch && matchSpecialty && matchStatus;
  });

  // Approve/Reject handlers
  const handleApproveDoctor = (doctor) => {
    setDoctors(doctors.map((d) =>
      d.id === doctor.id ? { ...d, status: locale === "ar" ? "موثق" : "Verified" } : d
    ));
    showToast(locale === "ar" ? "تم توثيق الطبيب بنجاح" : "Doctor verified successfully", "success");
  };
  const handleRejectDoctor = (doctor) => {
    setDoctors(doctors.map((d) =>
      d.id === doctor.id ? { ...d, status: locale === "ar" ? "مرفوض" : "Rejected" } : d
    ));
    showToast(locale === "ar" ? "تم رفض الطبيب" : "Doctor rejected", "info");
  };

  return (
    <AdminLayout breadcrumbs={ad.breadcrumbs || tr.breadcrumbs}>
      <ToastContainer />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{ad.headerTitle || tr.headerTitle}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{ad.headerSubtitle || tr.headerSubtitle}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaDownload />
              <span>{ad.buttons?.export || tr.buttons.export}</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus />
              <span>{ad.buttons?.addDoctor || tr.buttons.addDoctor}</span>
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
                placeholder={ad.filters?.searchPlaceholder || tr.filters.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{ad.filters?.specialtyAll || tr.filters.specialtyAll}</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {specialtiesMap[spec] || spec}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{ad.filters?.statusAll || tr.filters.statusAll}</option>
              <option value="active">{statusesMap.active}</option>
              <option value="suspended">{statusesMap.suspended}</option>
              <option value="banned">{statusesMap.banned}</option>
            </select>
          </div>
        </div>


        {/* Doctors Table (with verification actions) */}
        <DoctorsTable
          doctors={filteredDoctors}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          onDetails={openDetailsModal}
          onAdd={() => setShowAddModal(true)}
          onApprove={handleApproveDoctor}
          onReject={handleRejectDoctor}
          locale={locale}
        />

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{ad.table?.noMatches || tr.table.noMatches}</p>
          </div>
        )}

        {/* Add Doctor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ad.modals?.addTitle || tr.modals.addTitle}</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.fullName || tr.modals.fullName}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.email || tr.modals.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.phone || tr.modals.phone}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.specialty || tr.modals.specialty}</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  >
                    {specialties.map((spec) => (
                      <option key={spec} value={spec}>
                        {specialtiesMap[spec] || spec}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.experience || tr.modals.experience}</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddDoctor}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <FaFloppyDisk />
                  <span>{ad.buttons?.save || tr.buttons.save}</span>
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {ad.buttons?.cancel || tr.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Doctor Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ad.modals?.editTitle || tr.modals.editTitle}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.fullName || tr.modals.fullName}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.email || tr.modals.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.phone || tr.modals.phone}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.specialty || tr.modals.specialty}</label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  >
                    {specialties.map((spec) => (
                      <option key={spec} value={spec}>
                        {specialtiesMap[spec] || spec}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.experience || tr.modals.experience}</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{ad.modals?.status || tr.modals.status}</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  >
                    <option value="active">{statusesMap.active}</option>
                    <option value="suspended">{statusesMap.suspended}</option>
                    <option value="banned">{statusesMap.banned}</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditDoctor}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <FaFloppyDisk />
                  <span>{ad.buttons?.saveChanges || tr.buttons.saveChanges}</span>
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {ad.buttons?.cancel || tr.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal (bilingual, with approve/reject) */}
        {showDetailsModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <DoctorDetailsCard
              doctor={selectedDoctor}
              onClose={() => setShowDetailsModal(false)}
              onApprove={handleApproveDoctor}
              onReject={handleRejectDoctor}
            />
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ad.confirmDelete?.title || tr.confirmDelete.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {(ad.confirmDelete?.description || tr.confirmDelete.description).replace("{{name}}", selectedDoctor.name)}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteDoctor}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  {ad.confirmDelete?.yes || tr.confirmDelete.yes}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {ad.confirmDelete?.no || tr.confirmDelete.no}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
