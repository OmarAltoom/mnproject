"use client";
import { useToast } from "@/app/components/ui/Toast";
import { useState, useRef } from "react";
import Image from "next/image";
import HoloButton from "@/app/components/ui/HoloButton";
import GlassCard from "@/app/components/ui/GlassCard";
import useLocale from "@/app/hooks/useLocale";

export default function UploadXRayPage() {
  const { locale } = useLocale();
  const { showToast, ToastContainer } = useToast();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recent, setRecent] = useState([
    { id: "U1", name: "xray-shoulder.png", size: "1.2MB", status: locale === "ar" ? "جاهز" : "ready" },
    { id: "U2", name: "ct-chest-2025-12.dcm", size: "5.8MB", status: locale === "ar" ? "بانتظار المراجعة" : "pending_review" },
  ]);
  const inputRef = useRef(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(locale === "ar" ? "الكل" : "all");

  const labels = {
    pageTitle: locale === "ar" ? "رفع صور الأشعة" : "Upload X-Ray Images",
    fileTypes: locale === "ar" ? "PNG • JPG • DICOM • حد" : "PNG • JPG • DICOM • Max",
    mb: "MB",
    uploadCard: {
      title: locale === "ar" ? "رفع ملف الأشعة" : "Upload X-Ray File",
      selectFile: locale === "ar" ? "اختَر الملف أو اسحب وأفلت هنا" : "Choose File or Drag & Drop Here",
      preview: locale === "ar" ? "معاينة" : "Preview",
      notesLabel: locale === "ar" ? "ملاحظات للطبيب (اختياري)" : "Notes for Doctor (Optional)",
      notesPlaceholder: locale === "ar" ? "اكتب أي تفاصيل مهمة عن الحالة" : "Write any important details about the condition",
    },
    buttons: {
      upload: locale === "ar" ? "رفع" : "Upload",
      uploading: locale === "ar" ? "جاري الرفع..." : "Uploading...",
      cancel: locale === "ar" ? "إلغاء" : "Cancel",
    },
    progress: {
      label: locale === "ar" ? "نسبة التقدم:" : "Progress:",
    },
    recentFiles: {
      title: locale === "ar" ? "الملفات المرفوعة حديثاً" : "Recently Uploaded Files",
      searchPlaceholder: locale === "ar" ? "ابحث بالاسم..." : "Search by name...",
      size: locale === "ar" ? "الحجم:" : "Size:",
      noFiles: locale === "ar" ? "لا توجد ملفات بعد" : "No files yet",
    },
    filter: {
      all: locale === "ar" ? "الكل" : "All",
      ready: locale === "ar" ? "جاهز" : "Ready",
      pending: locale === "ar" ? "بانتظار المراجعة" : "Pending Review",
    },
    status: {
      ready: locale === "ar" ? "جاهز" : "Ready",
      pending_review: locale === "ar" ? "بانتظار المراجعة" : "Pending Review",
    },
    toast: {
      fileSelected: locale === "ar" ? "تم تحديد الملف:" : "File selected:",
      uploading: locale === "ar" ? "جاري رفع الملف..." : "Uploading file...",
      uploadSuccess: locale === "ar" ? "تم رفع الملف بنجاح وإرساله للمراجعة" : "File uploaded successfully and sent for review",
      errorNoFile: locale === "ar" ? "يرجى اختيار ملف أولاً" : "Please select a file first",
      errorUnsupportedType: locale === "ar" ? "نوع الملف غير مدعوم. الصيغ المسموحة: PNG, JPG, DICOM" : "Unsupported file type. Allowed formats: PNG, JPG, DICOM",
      errorFileSize: locale === "ar" ? "الحجم كبير" : "File size too large",
      errorFileSizeMax: locale === "ar" ? "الحد الأقصى" : "Maximum",
    },
  };

  const MAX_MB = 20;
  const allowedExt = ["png", "jpg", "jpeg", "dcm"];

  function onSelect(e) {
    setError("");
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase();
    const sizeMB = f.size / (1024 * 1024);
    if (!ext || !allowedExt.includes(ext)) {
      const errorMsg = labels.toast.errorUnsupportedType;
      setError(errorMsg);
      showToast(errorMsg, "error");
      clearSelection();
      return;
    }
    if (sizeMB > MAX_MB) {
      const errorMsg = `${labels.toast.errorFileSize} (${sizeMB.toFixed(1)}${labels.mb}). ${labels.toast.errorFileSizeMax} ${MAX_MB}${labels.mb}`;
      setError(errorMsg);
      showToast(errorMsg, "error");
      clearSelection();
      return;
    }
    setFile(f);
    if (ext !== "dcm") {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    showToast(`${labels.toast.fileSelected} ${f.name}`, "success");
  }

  function clearSelection() {
    setFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer?.files?.[0];
    if (!f) return;
    const fakeEvent = { target: { files: [f] } };
    onSelect(fakeEvent);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function mockUpload() {
    if (!file) {
      const errorMsg = labels.toast.errorNoFile;
      setError(errorMsg);
      showToast(errorMsg, "error");
      return;
    }
    setError("");
    setUploading(true);
    setProgress(0);
    showToast(labels.toast.uploading, "info");
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / 1500) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setUploading(false);
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + labels.mb;
        setRecent((r) => [
          { id: `U${Date.now()}`, name: file.name, size: sizeMB, status: locale === "ar" ? "بانتظار المراجعة" : "pending_review" },
          ...r,
        ]);
        const successMsg = labels.toast.uploadSuccess;
        setSuccessMsg(successMsg);
        showToast(successMsg, "success");
        clearSelection();
        setNotes("");
        setTimeout(() => setSuccessMsg(""), 2500);
      }
    }, 100);
  }

  return (
    <>
      <ToastContainer />
      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{labels.pageTitle}</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">{labels.fileTypes} {MAX_MB}{labels.mb}</span>
        </header>

        <GlassCard title={labels.uploadCard.title}>
          <div className="space-y-4">
            {successMsg && (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 px-3 py-2 text-sm text-green-700 dark:text-green-300">{successMsg}</div>
            )}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 px-3 py-2 text-sm text-red-700 dark:text-red-300">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.uploadCard.selectFile}</label>
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 px-3 py-3"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.dcm"
                  onChange={onSelect}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              {previewUrl && (
                <div className="mt-3 relative h-64 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  <Image src={previewUrl} alt={labels.uploadCard.preview} fill className="object-contain" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.uploadCard.notesLabel}</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder={labels.uploadCard.notesPlaceholder}
              />
            </div>

            <div className="flex items-center gap-3">
              <HoloButton onClick={mockUpload} disabled={uploading || !file}>
                {uploading ? labels.buttons.uploading : labels.buttons.upload}
              </HoloButton>
              <HoloButton variant="outline" onClick={clearSelection}>{labels.buttons.cancel}</HoloButton>
            </div>

            {uploading && (
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{labels.progress.label} {progress}%</div>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard title={labels.recentFiles.title}>
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{labels.recentFiles.title}</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder={labels.recentFiles.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-48 md:w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value={locale === "ar" ? "الكل" : "all"}>{labels.filter.all}</option>
                <option value={locale === "ar" ? "جاهز" : "ready"}>{labels.filter.ready}</option>
                <option value={locale === "ar" ? "بانتظار المراجعة" : "pending_review"}>{labels.filter.pending}</option>
              </select>
            </div>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {recent
              .filter((f) => (statusFilter === (locale === "ar" ? "الكل" : "all") ? true : f.status === statusFilter))
              .filter((f) => (query ? f.name.toLowerCase().includes(query.toLowerCase()) : true))
              .map((f) => (
              <li key={f.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{f.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{labels.recentFiles.size} {f.size}</div>
                </div>
                <StatusBadge status={f.status} labels={labels} />
              </li>
            ))}
            {recent.length === 0 && <li className="py-3 text-sm text-gray-500 dark:text-gray-400">{labels.recentFiles.noFiles}</li>}
          </ul>
        </GlassCard>
      </section>
    </>
  );
}

function StatusBadge({ status, labels }) {
  const isReady = status === "جاهز" || status === "ready";
  const isPending = status === "بانتظار المراجعة" || status === "pending_review";
  
  const style =
    isReady
      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
      : isPending
      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700"
      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
  
  const displayText = isReady ? labels.status.ready : isPending ? labels.status.pending_review : status;
  
  return <span className={`text-xs rounded-full border px-2 py-1 ${style}`}>{displayText}</span>;
}
