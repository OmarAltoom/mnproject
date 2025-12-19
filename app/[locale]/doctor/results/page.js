"use client";

import DoctorLayout from "../DoctorLayout";
import { useToast } from "@/app/components/ui/Toast";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FaXRay,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaCompressArrowsAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaFileAlt,
  FaTimes,
  FaExpand,
  FaCompress,
  FaPrint,
  FaShare,
} from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";
import { formatDate } from "@/app/lib/date";

export default function DoctorResultsPage() {
  const { showToast, ToastContainer } = useToast();
  const { locale } = useLocale();
  const dr = {};

  const labels = locale === "en"
    ? {
        title: "Results",
        subtitle: "Manage and review patient scan results",
        searchPlaceholder: "Search by patient name or ID...",
        filters: { allTypes: "All types", allStatuses: "All statuses" },
        statuses: { completed: "Completed", pending: "Pending", urgent: "Urgent" },
        typeLabel: "Type:",
        bodyPartLabel: "Body part:",
        aiSummaryLabel: "AI Summary:",
        patientIdLabel: "ID:",
        actions: { view: "View", download: "Download", print: "Print", close: "Close" },
        toast: {
          viewingScan: "Opening scan viewer",
          downloadStart: "Download started",
          printStart: "Printing report",
          shareCopied: "Share link copied",
        },
        viewer: {
          title: "Scan Viewer",
          patientInfo: "Patient information",
          scanDetails: "Scan details",
          findings: "Findings",
          aiAnalysis: "AI Analysis",
        },
        emptyState: "No results found",
      }
    : {
        title: "النتائج",
        subtitle: "إدارة ومراجعة نتائج فحوصات المرضى",
        searchPlaceholder: "ابحث باسم المريض أو المعرف...",
        filters: { allTypes: "جميع الأنواع", allStatuses: "جميع الحالات" },
        statuses: { completed: "مكتمل", pending: "قيد المراجعة", urgent: "عاجل" },
        typeLabel: "النوع:",
        bodyPartLabel: "الجزء:",
        aiSummaryLabel: "ملخص AI:",
        patientIdLabel: "المعرف:",
        actions: { view: "عرض", download: "تحميل", print: "طباعة", close: "إغلاق" },
        toast: {
          viewingScan: "فتح عارض الفحص",
          downloadStart: "بدأ التحميل",
          printStart: "طباعة التقرير",
          shareCopied: "تم نسخ رابط المشاركة",
        },
        viewer: {
          title: "عارض الفحص",
          patientInfo: "معلومات المريض",
          scanDetails: "تفاصيل الفحص",
          findings: "النتائج",
          aiAnalysis: "تحليل AI",
        },
        emptyState: "لا توجد نتائج",
      };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedScan, setSelectedScan] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scansTemplate = useMemo(
    () =>
      locale === "en"
        ? [
            {
              id: 1,
              patientName: "Mohammed Ahmed",
              patientId: "P-2024-001",
              type: "x-ray",
              bodyPart: "Chest",
              date: "2025-12-04",
              time: "09:30 AM",
              status: "completed",
              aiSummary: "No obvious abnormal signs. Lungs are clear.",
              thumbnail: "https://via.placeholder.com/150?text=X-Ray",
              findings: [
                { type: "normal", text: "Lungs are clear" },
                { type: "normal", text: "Heart size normal" },
              ],
            },
            {
              id: 2,
              patientName: "Fatima Ali",
              patientId: "P-2024-002",
              type: "ct",
              bodyPart: "Head",
              date: "2025-12-04",
              time: "11:00 AM",
              status: "pending",
              aiSummary: "Awaiting final review",
              thumbnail: "https://via.placeholder.com/150?text=CT",
              findings: [],
            },
            {
              id: 3,
              patientName: "Ahmed Khaled",
              patientId: "P-2024-003",
              type: "mri",
              bodyPart: "Knee",
              date: "2025-12-03",
              time: "02:00 PM",
              status: "completed",
              aiSummary: "Minor tear in the medial meniscus",
              thumbnail: "https://via.placeholder.com/150?text=MRI",
              findings: [
                { type: "warning", text: "Minor cartilage tear" },
                { type: "normal", text: "Ligaments intact" },
              ],
            },
            {
              id: 4,
              patientName: "Sarah Mahmoud",
              patientId: "P-2024-004",
              type: "x-ray",
              bodyPart: "Shoulder",
              date: "2025-12-03",
              time: "10:15 AM",
              status: "completed",
              aiSummary: "Minor inflammation in soft tissues",
              thumbnail: "https://via.placeholder.com/150?text=X-Ray",
              findings: [
                { type: "info", text: "Mild inflammation in tissues" },
              ],
            },
            {
              id: 5,
              patientName: "Omar Hassan",
              patientId: "P-2024-005",
              type: "ultrasound",
              bodyPart: "Abdomen",
              date: "2025-12-02",
              time: "03:30 PM",
              status: "completed",
              aiSummary: "Normal exam for liver and kidneys",
              thumbnail: "https://via.placeholder.com/150?text=US",
              findings: [
                { type: "normal", text: "Liver normal" },
                { type: "normal", text: "Kidneys intact" },
              ],
            },
          ]
        : [
            {
              id: 1,
              patientName: "محمد أحمد",
              patientId: "P-2024-001",
              type: "x-ray",
              bodyPart: "الصدر",
              date: "2025-12-04",
              time: "09:30 ص",
              status: "completed",
              aiSummary: "لا توجد علامات غير طبيعية واضحة. الرئتان نظيفتان.",
              thumbnail: "https://via.placeholder.com/150?text=X-Ray",
              findings: [
                { type: "normal", text: "الرئتان نظيفتان" },
                { type: "normal", text: "القلب بحجم طبيعي" },
              ],
            },
            {
              id: 2,
              patientName: "فاطمة علي",
              patientId: "P-2024-002",
              type: "ct",
              bodyPart: "الرأس",
              date: "2025-12-04",
              time: "11:00 ص",
              status: "pending",
              aiSummary: "في انتظار المراجعة النهائية",
              thumbnail: "https://via.placeholder.com/150?text=CT",
              findings: [],
            },
            {
              id: 3,
              patientName: "أحمد خالد",
              patientId: "P-2024-003",
              type: "mri",
              bodyPart: "الركبة",
              date: "2025-12-03",
              time: "02:00 م",
              status: "completed",
              aiSummary: "تمزق طفيف في الغضروف الهلالي الإنسي",
              thumbnail: "https://via.placeholder.com/150?text=MRI",
              findings: [
                { type: "warning", text: "تمزق طفيف في الغضروف" },
                { type: "normal", text: "الأربطة سليمة" },
              ],
            },
            {
              id: 4,
              patientName: "سارة محمود",
              patientId: "P-2024-004",
              type: "x-ray",
              bodyPart: "الكتف",
              date: "2025-12-03",
              time: "10:15 ص",
              status: "completed",
              aiSummary: "التهاب بسيط في الأنسجة الرخوة",
              thumbnail: "https://via.placeholder.com/150?text=X-Ray",
              findings: [
                { type: "info", text: "التهاب بسيط في الأنسجة" },
              ],
            },
            {
              id: 5,
              patientName: "عمر حسن",
              patientId: "P-2024-005",
              type: "ultrasound",
              bodyPart: "البطن",
              date: "2025-12-02",
              time: "03:30 م",
              status: "completed",
              aiSummary: "فحص طبيعي للكبد والكلى",
              thumbnail: "https://via.placeholder.com/150?text=US",
              findings: [
                { type: "normal", text: "الكبد طبيعي" },
                { type: "normal", text: "الكلى سليمة" },
              ],
            },
          ],
    [locale]
  );

  const [scans, setScans] = useState(scansTemplate);

  useEffect(() => {
    setScans(scansTemplate);
  }, [scansTemplate]);

  const stats = {
    total: scans.length,
    completed: scans.filter((s) => s.status === "completed").length,
    pending: scans.filter((s) => s.status === "pending").length,
    today: scans.filter((s) => s.date === "2025-12-04").length,
  };

  const filteredScans = scans
    .filter((scan) => {
      if (filterType !== "all" && scan.type !== filterType) return false;
      if (filterStatus !== "all" && scan.status !== filterStatus) return false;
      if (searchQuery) {
        return (
          scan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scan.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scan.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    });

  const handleViewScan = (scan) => {
    setSelectedScan(scan);
    setViewerOpen(true);
    showToast(labels.toast.viewingScan, "info");
  };

  const handleDownload = (scan) => {
    showToast(labels.toast.downloadStart, "info");
    setTimeout(() => {
      showToast(labels.toast.downloadStart, "success");
    }, 1500);
  };

  const handlePrint = (scan) => {
    showToast(labels.toast.printStart, "info");
  };

  const handleShare = (scan) => {
    showToast(labels.toast.shareCopied, "success");
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { label: labels.statuses.completed, color: "bg-green-100 text-green-700 border-green-200", icon: FaCheckCircle },
      pending: { label: labels.statuses.pending, color: "bg-orange-100 text-orange-700 border-orange-200", icon: FaHourglassHalf },
      urgent: { label: labels.statuses.urgent, color: "bg-red-100 text-red-700 border-red-200", icon: FaExclamationTriangle },
    };
    const c = config[status] || config.pending;
    const Icon = c.icon;
    return (
      <span className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${c.color}`}>
        <Icon />
        {c.label}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const typeConfig = {
      "X-Ray": { icon: "🩻", color: "bg-blue-100 text-blue-700" },
      "CT Scan": { icon: "🔬", color: "bg-purple-100 text-purple-700" },
      "MRI": { icon: "🧲", color: "bg-green-100 text-green-700" },
      "Ultrasound": { icon: "📡", color: "bg-orange-100 text-orange-700" },
    };
    const config = typeConfig[type] || typeConfig["X-Ray"];
    return (
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color} text-xl`}>
        {config.icon}
      </div>
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
                <FaXRay className="text-blue-600" />
                {labels.title}
              </h1>
              <p className="mt-2 text-gray-600">{labels.subtitle}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{dr.stats?.total || "Total scans"}</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FaXRay className="text-3xl text-blue-600" />
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{dr.stats?.completed || "Completed"}</p>
                  <p className="mt-1 text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <FaCheckCircle className="text-3xl text-green-600" />
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{dr.stats?.pending || "Under review"}</p>
                  <p className="mt-1 text-3xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <FaHourglassHalf className="text-3xl text-orange-600" />
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{dr.stats?.today || "Today"}</p>
                  <p className="mt-1 text-3xl font-bold text-blue-600">{stats.today}</p>
                </div>
                <FaCalendarAlt className="text-3xl text-blue-600" />
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
                    placeholder={dr.searchPlaceholder || "Search by patient name or ID..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">{labels.filters.allTypes}</option>
                <option value="X-Ray">X-Ray</option>
                <option value="CT Scan">CT Scan</option>
                <option value="MRI">MRI</option>
                <option value="Ultrasound">Ultrasound</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">{labels.filters.allStatuses}</option>
                <option value="completed">{labels.statuses.completed}</option>
                <option value="pending">{labels.statuses.pending}</option>
              </select>
            </div>
          </div>

          {/* Scans Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredScans.map((scan) => (
              <div
                key={scan.id}
                className="group rounded-xl bg-white p-6 shadow-lg border border-gray-100 transition-all hover:shadow-2xl"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  {getTypeIcon(scan.type)}
                  {getStatusBadge(scan.status)}
                </div>

                {/* Patient Info */}
                <div className="mb-4 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{scan.patientName}</h3>
                  <p className="text-sm text-gray-600">{labels.patientIdLabel} {scan.patientId}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-blue-600" />
                      {formatDate(scan.date, locale)}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-purple-600" />
                      {scan.time}
                    </div>
                  </div>
                </div>

                {/* Scan Details */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{labels.typeLabel}</span>
                    <span className="text-sm text-gray-600">{scan.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{labels.bodyPartLabel}</span>
                    <span className="text-sm text-gray-600">{scan.bodyPart}</span>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <p className="text-xs font-medium text-blue-900 mb-1">{labels.aiSummaryLabel}</p>
                  <p className="text-sm text-blue-800">{scan.aiSummary}</p>
                </div>

                {/* Findings */}
                {scan.findings.length > 0 && (
                  <div className="mb-4 space-y-1">
                    {scan.findings.slice(0, 2).map((finding, idx) => (
                      <div
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${
                          finding.type === "normal"
                            ? "bg-green-50 text-green-700"
                            : finding.type === "warning"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        • {finding.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewScan(scan)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                  >
                    <FaEye />
                    {labels.actions.view}
                  </button>
                  <button
                    onClick={() => handleDownload(scan)}
                    className="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-all hover:bg-gray-200"
                    title={labels.actions.download}
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => handlePrint(scan)}
                    className="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-all hover:bg-gray-200"
                    title={labels.actions.print}
                  >
                    <FaPrint />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredScans.length === 0 && (
            <div className="rounded-xl bg-white p-12 text-center shadow-lg border border-gray-100">
              <FaXRay className="mx-auto mb-4 text-5xl text-gray-300" />
              <p className="text-lg text-gray-600">{labels.emptyState}</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {viewerOpen && selectedScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className={`relative bg-white rounded-xl shadow-2xl overflow-hidden ${isFullscreen ? "w-full h-full" : "max-w-5xl w-full max-h-[90vh]"}`}>
            {/* Viewer Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedScan.patientName}</h2>
                <p className="text-sm text-gray-600">
                  {selectedScan.type} - {selectedScan.bodyPart}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-200"
                  title={isFullscreen ? (locale === "en" ? "Exit fullscreen" : "تصغير") : (locale === "en" ? "Fullscreen" : "ملء الشاشة")}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
                <button
                  onClick={() => handleDownload(selectedScan)}
                  className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-200"
                  title={labels.actions.download}
                >
                  <FaDownload />
                </button>
                <button
                  onClick={() => handleShare(selectedScan)}
                  className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-200"
                  title={locale === "en" ? "Share" : "مشاركة"}
                >
                  <FaShare />
                </button>
                <button
                  onClick={() => setViewerOpen(false)}
                  className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-200"
                  title={labels.actions.close}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: isFullscreen ? "calc(100vh - 80px)" : "70vh" }}>
              <div className="mb-6 relative w-full overflow-hidden rounded-lg border border-gray-300 aspect-video bg-black">
                <Image
                  src={selectedScan.thumbnail}
                  alt={selectedScan.patientName}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-contain"
                />
              </div>

              {/* AI Analysis */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-4">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <FaFileAlt />
                  {labels.viewer.aiAnalysis}
                </h3>
                <p className="text-blue-800">{selectedScan.aiSummary}</p>
              </div>

              {/* Findings */}
              {selectedScan.findings.length > 0 && (
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-3">{labels.viewer.findings}:</h3>
                  <div className="space-y-2">
                    {selectedScan.findings.map((finding, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          finding.type === "normal"
                            ? "bg-green-50 border border-green-200"
                            : finding.type === "warning"
                            ? "bg-orange-50 border border-orange-200"
                            : "bg-blue-50 border border-blue-200"
                        }`}
                      >
                        <p className="text-sm font-medium">{finding.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DoctorLayout>
  );
}
