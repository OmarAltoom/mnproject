"use client";
import { useState } from "react";
import AdminLayout from "../AdminLayout";
import { useToast } from "@/app/components/ui/Toast";
import useLocale from "@/app/hooks/useLocale";
import {
  FaFileLines,
  FaMagnifyingGlass,
  FaPlus,
  FaDownload,
  FaEye,
  FaX,
  FaFloppyDisk,
  FaCalendar,
  FaClock,
  FaCheck,
  FaExclamation,
  FaHourglass,
  FaChartLine,
  FaUser,
  FaImage,
} from "react-icons/fa6";


export default function AnalysisPage() {
  const { showToast, ToastContainer } = useToast();
  const { t, locale } = useLocale();
  const ad = t.adminAnalysis || {};

  const tr = locale === "en" ? {
    breadcrumbs: ["Home", "Analyses"],
    headerTitle: "Medical Analyses",
    headerSubtitle: "Review and manage medical analyses and imaging",
    buttons: {
      export: "Export"
    },
    stats: {
      total: "Total Analyses",
      completed: "Completed",
      reviewing: "Under Review",
      pending: "Pending"
    },
    filters: {
      searchPlaceholder: "Search by patient, type, doctor...",
      allTypes: "All types",
      allStatuses: "All statuses"
    },
    table: {
      patient: "Patient",
      type: "Type",
      dateTime: "Date & Time",
      doctor: "Doctor",
      status: "Status",
      result: "Result",
      actions: "Actions",
      noMatches: "No analyses match the current filters."
    },
    actions: {
      view: "View",
      details: "Details"
    },
    viewModal: {
      title: "View Analysis",
      imageLabel: "Analysis image",
      type: "Type",
      result: "Result",
      notes: "Notes"
    },
    detailsModal: {
      title: "Analysis Details",
      patientInfo: "Patient Info",
      analysisType: "Analysis type",
      doctorInCharge: "Doctor in charge",
      status: "Status",
      result: "Result",
      date: "Date",
      time: "Time",
      findings: "Medical notes",
      extraNotes: "Additional notes",
      image: "Analysis image"
    },
    csvHeaders: ["Analysis ID", "Patient", "Type", "Date", "Status", "Result"],
    toast: {
      exportSuccess: "Data exported successfully"
    },
    statuses: {
      completed: "Completed",
      reviewing: "Under Review",
      pending: "Pending"
    },
    types: {
      xray: "X-ray",
      ct: "CT Scan",
      lab: "Lab Test"
    },
    results: {
      positive: "Positive",
      negative: "Negative",
      pending: "Pending"
    }
  } : {
    breadcrumbs: ["الرئيسية", "التحليلات"],
    headerTitle: "إدارة التحليلات الطبية",
    headerSubtitle: "عرض وإدارة التحليلات والأشعات الطبية",
    buttons: {
      export: "تصدير"
    },
    stats: {
      total: "إجمالي التحليلات",
      completed: "مكتملة",
      reviewing: "قيد المراجعة",
      pending: "قيد الانتظار"
    },
    filters: {
      searchPlaceholder: "بحث بالاسم، المريض، النوع، أو الطبيب...",
      allTypes: "جميع الأنواع",
      allStatuses: "جميع الحالات"
    },
    table: {
      patient: "المريض",
      type: "النوع",
      dateTime: "التاريخ والوقت",
      doctor: "الطبيب",
      status: "الحالة",
      result: "النتيجة",
      actions: "الإجراءات",
      noMatches: "لا توجد تحليلات مطابقة للفلاتر المحددة"
    },
    actions: {
      view: "عرض التفاصيل",
      details: "تفاصيل كاملة"
    },
    viewModal: {
      title: "عرض التحليل",
      imageLabel: "صورة التحليل",
      type: "النوع",
      result: "النتيجة",
      notes: "الملاحظات"
    },
    detailsModal: {
      title: "تفاصيل التحليل",
      patientInfo: "معلومات المريض",
      analysisType: "نوع التحليل",
      doctorInCharge: "الطبيب المسؤول",
      status: "الحالة",
      result: "النتيجة",
      date: "التاريخ",
      time: "الوقت",
      findings: "الملاحظات الطبية",
      extraNotes: "ملاحظات إضافية",
      image: "صورة التحليل"
    },
    csvHeaders: ["رقم التحليل", "اسم المريض", "النوع", "التاريخ", "الحالة", "النتيجة"],
    toast: {
      exportSuccess: "تم تصدير البيانات بنجاح"
    },
    statuses: {
      completed: "مكتمل",
      reviewing: "قيد المراجعة",
      pending: "قيد الانتظار"
    },
    types: {
      xray: "أشعة سينية",
      ct: "أشعة مقطعية",
      lab: "فحص مخبري"
    },
    results: {
      positive: "موجب",
      negative: "سالب",
      pending: "معلق"
    }
  };

  // State
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Sample Data
  const [analyses, setAnalyses] = useState([
    {
      id: 1,
      patientName: "منى عبد الله محمد",
      patientId: "PAT-001",
      type: "xray",
      date: "2025-12-03",
      time: "10:30",
      status: "completed",
      doctor: "د. محمد سالم",
      findings: "طبيعي",
      notes: "لا توجد ملاحظات طبية",
      imageUrl: "🩻",
      result: "negative",
    },
    {
      id: 2,
      patientName: "سعيد حسن إبراهيم",
      patientId: "PAT-002",
      type: "ct",
      date: "2025-12-02",
      time: "14:15",
      status: "reviewing",
      doctor: "د. ليلى حسن",
      findings: "تحت الدراسة",
      notes: "في انتظار مراجعة الطبيب",
      imageUrl: "🔬",
      result: "pending",
    },
    {
      id: 3,
      patientName: "هالة يوسف علي",
      patientId: "PAT-003",
      type: "lab",
      date: "2025-12-01",
      time: "09:45",
      status: "completed",
      doctor: "د. سامي يوسف",
      findings: "متوازن",
      notes: "النتائج ضمن المعدل الطبيعي",
      imageUrl: "🧪",
      result: "positive",
    },
    {
      id: 4,
      patientName: "أحمد محمود خالد",
      patientId: "PAT-004",
      type: "xray",
      date: "2025-11-30",
      time: "11:00",
      status: "completed",
      doctor: "د. فاطمة أحمد",
      findings: "تحسن ملحوظ",
      notes: "تحسن الحالة مقارنة بالأشعة السابقة",
      imageUrl: "🩻",
      result: "positive",
    },
    {
      id: 5,
      patientName: "فاطمة سالم محمد",
      patientId: "PAT-005",
      type: "lab",
      date: "2025-11-28",
      time: "16:30",
      status: "completed",
      doctor: "د. عمر خالد",
      findings: "طبيعي",
      notes: "جميع المؤشرات طبيعية",
      imageUrl: "🧪",
      result: "negative",
    },
    {
      id: 6,
      patientName: "علي عمر محمد",
      patientId: "PAT-006",
      type: "ct",
      date: "2025-11-25",
      time: "13:20",
      status: "pending",
      doctor: "د. نور محمود",
      findings: "قيد الفحص",
      notes: "في انتظار مراجعة الطبيب المختص",
      imageUrl: "🔬",
      result: "pending",
    },
  ]);

  // Mappings
  const statusMap = {
    completed: ad.statuses?.completed || tr.statuses.completed,
    reviewing: ad.statuses?.reviewing || tr.statuses.reviewing,
    pending: ad.statuses?.pending || tr.statuses.pending,
  };

  const typeMap = {
    xray: ad.types?.xray || tr.types.xray,
    ct: ad.types?.ct || tr.types.ct,
    lab: ad.types?.lab || tr.types.lab,
  };

  const resultMap = {
    positive: ad.results?.positive || tr.results.positive,
    negative: ad.results?.negative || tr.results.negative,
    pending: ad.results?.pending || tr.results.pending,
  };

  // Stats Configuration
  const stats = [
    {
      title: ad.stats?.total || tr.stats.total,
      value: analyses.length,
      icon: FaFileLines,
      color: "text-blue-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: ad.stats?.completed || tr.stats.completed,
      value: analyses.filter((a) => a.status === "completed").length,
      icon: FaCheck,
      color: "text-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: ad.stats?.reviewing || tr.stats.reviewing,
      value: analyses.filter((a) => a.status === "reviewing").length,
      icon: FaChartLine,
      color: "text-orange-600",
      bgLight: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: ad.stats?.pending || tr.stats.pending,
      value: analyses.filter((a) => a.status === "pending").length,
      icon: FaHourglass,
      color: "text-purple-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  // Helper Functions
  const types = ["xray", "ct", "lab"];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheck className="text-green-600" />;
      case "reviewing":
        return <FaChartLine className="text-orange-600" />;
      case "pending":
        return <FaHourglass className="text-purple-600" />;
      default:
        return <FaExclamation className="text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
      case "reviewing":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300";
      case "pending":
        return "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300";
      default:
        return "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case "positive":
        return "text-red-600";
      case "negative":
        return "text-green-600";
      case "pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  // Event Handlers
  const handleExport = () => {
    const headers = ad.csvHeaders || tr.csvHeaders;
    const csv = [
      headers,
      ...analyses.map((a) => [a.id, a.patientName, typeMap[a.type] || a.type, a.date, statusMap[a.status] || a.status, resultMap[a.result] || a.result]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analyses.csv";
    a.click();
    showToast(ad.toast?.exportSuccess || tr.toast.exportSuccess, "success");
  };

  const openDetailsModal = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowDetailsModal(true);
  };

  const openViewModal = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowViewModal(true);
  };

  // Filtering
  const filteredAnalyses = analyses.filter((analysis) => {
    const matchSearch =
      analysis.patientName.includes(search) ||
      analysis.patientId.includes(search) ||
      analysis.type.includes(search) ||
      analysis.doctor.includes(search);
    const matchStatus = filterStatus === "all" || analysis.status === filterStatus;
    const matchType = filterType === "all" || analysis.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

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
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaDownload />
            <span>{ad.buttons?.export || tr.buttons.export}</span>
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{ad.filters?.allTypes || tr.filters.allTypes}</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {typeMap[type] || type}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{ad.filters?.allStatuses || tr.filters.allStatuses}</option>
              <option value="completed">{statusMap.completed}</option>
              <option value="reviewing">{statusMap.reviewing}</option>
              <option value="pending">{statusMap.pending}</option>
            </select>
          </div>
        </div>

        {/* Analyses Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{ad.table?.patient || tr.table.patient}</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{ad.table?.type || tr.table.type}</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{ad.table?.dateTime || tr.table.dateTime}</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{ad.table?.doctor || tr.table.doctor}</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{ad.table?.status || tr.table.status}</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{ad.table?.result || tr.table.result}</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-white">{ad.table?.actions || tr.table.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredAnalyses.map((analysis) => (
                  <tr key={analysis.id} className="hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{analysis.patientName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{analysis.patientId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-2xl">{analysis.imageUrl}</span>
                        {typeMap[analysis.type] || analysis.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-gray-400" />
                        {analysis.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <FaClock className="text-gray-400" />
                        {analysis.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{analysis.doctor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border flex items-center gap-2 w-fit ${getStatusColor(analysis.status)}`}>
                        {getStatusIcon(analysis.status)}
                        {statusMap[analysis.status] || analysis.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${getResultColor(analysis.result)}`}>
                        {resultMap[analysis.result] || analysis.result}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openViewModal(analysis)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title={ad.actions?.view || tr.actions.view}
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openDetailsModal(analysis)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title={ad.actions?.details || tr.actions.details}
                        >
                          <FaImage />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAnalyses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{ad.table?.noMatches || tr.table.noMatches}</p>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ad.viewModal?.title || tr.viewModal.title}</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center p-8 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-8xl mb-4">{selectedAnalysis.imageUrl}</div>
                  <p className="text-gray-600 dark:text-gray-400">{ad.viewModal?.imageLabel || tr.viewModal.imageLabel} ({typeMap[selectedAnalysis.type] || selectedAnalysis.type})</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ad.viewModal?.type || tr.viewModal.type}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{typeMap[selectedAnalysis.type] || selectedAnalysis.type}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ad.viewModal?.result || tr.viewModal.result}</p>
                    <p className={`font-bold ${getResultColor(selectedAnalysis.result)}`}>{resultMap[selectedAnalysis.result] || selectedAnalysis.result}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">{ad.viewModal?.notes || tr.viewModal.notes}</p>
                  <p className="text-blue-900 dark:text-blue-100">{selectedAnalysis.notes}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ad.detailsModal?.title || tr.detailsModal.title}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <FaX className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Patient Info */}
                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <FaUser />
                    <span className="text-sm font-medium">{ad.detailsModal?.patientInfo || tr.detailsModal.patientInfo}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 dark:text-white">{selectedAnalysis.patientName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedAnalysis.patientId}</p>
                  </div>
                </div>

                {/* Analysis Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">{ad.detailsModal?.analysisType || tr.detailsModal.analysisType}</p>
                    <p className="font-bold text-blue-900 dark:text-blue-100">{typeMap[selectedAnalysis.type] || selectedAnalysis.type}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300 mb-1">{ad.detailsModal?.doctorInCharge || tr.detailsModal.doctorInCharge}</p>
                    <p className="font-bold text-green-900 dark:text-green-100">{selectedAnalysis.doctor}</p>
                  </div>
                </div>

                {/* Status and Result */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-orange-700 dark:text-orange-300 mb-1">{ad.detailsModal?.status || tr.detailsModal.status}</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedAnalysis.status)}
                      <span className="font-bold text-orange-900 dark:text-orange-100">{statusMap[selectedAnalysis.status] || selectedAnalysis.status}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">{ad.detailsModal?.result || tr.detailsModal.result}</p>
                    <p className={`font-bold ${getResultColor(selectedAnalysis.result)}`}>{resultMap[selectedAnalysis.result] || selectedAnalysis.result}</p>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <FaCalendar />
                      <span className="text-sm">{ad.detailsModal?.date || tr.detailsModal.date}</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedAnalysis.date}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <FaClock />
                      <span className="text-sm">{ad.detailsModal?.time || tr.detailsModal.time}</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedAnalysis.time}</p>
                  </div>
                </div>

                {/* Findings */}
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-2 font-medium">{ad.detailsModal?.findings || tr.detailsModal.findings}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">{ad.detailsModal?.findings || tr.detailsModal.findings}:</p>
                      <p className="text-indigo-900 dark:text-indigo-100">{selectedAnalysis.findings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">{ad.detailsModal?.extraNotes || tr.detailsModal.extraNotes}:</p>
                      <p className="text-indigo-900 dark:text-indigo-100">{selectedAnalysis.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="text-center p-6 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-6xl mb-2">{selectedAnalysis.imageUrl}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ad.detailsModal?.image || tr.detailsModal.image}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
