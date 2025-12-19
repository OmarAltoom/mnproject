"use client";
import React, { useState, useRef } from "react";
import useLocale from "@/app/hooks/useLocale";

const mockRecentUploads = {
  en: [
    { id: 1, patientName: "Mohammed Ali", type: "X-Ray", date: "2025-12-01", status: "completed", notes: "Clear and high quality image" },
    { id: 2, patientName: "Sarah Youssef", type: "CT", date: "2025-11-30", status: "reviewing", notes: "Awaiting analysis" },
    { id: 3, patientName: "Ahmed Mahmoud", type: "MRI", date: "2025-11-28", status: "completed", notes: "No issues found" }
  ],
  ar: [
    { id: 1, patientName: "محمد علي", type: "X-Ray", date: "2025-12-01", status: "completed", notes: "صورة واضحة وجودة عالية" },
    { id: 2, patientName: "سارة يوسف", type: "CT", date: "2025-11-30", status: "reviewing", notes: "في انتظار التحليل" },
    { id: 3, patientName: "أحمد محمود", type: "MRI", date: "2025-11-28", status: "completed", notes: "لم تظهر مشاكل" }
  ]
};

export default function UploadXRayPageContent() {
  const { t, locale } = useLocale();
  const du = t.doctorUploadXRay || {};
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [imageType, setImageType] = useState("xray");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = () => {
    if (!patientName || files.length === 0) {
      alert(du.toast?.selectPatient || "Please select a patient and file");
      return;
    }

    setUploading(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
          setFiles([]);
          setPatientName("");
          setNotes("");
          alert(du.toast?.uploaded || "Upload completed successfully");
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 400);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{du.title || "Upload X-Ray"}</h1>

      {/* Upload Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">
        <div className="space-y-4">
          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{du.patientName || "Patient Name"}</label>
            <input
              type="text"
              placeholder="اسم المريض أو رقم الملف"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{du.imageType || "Image Type"}</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="xray">{du.types?.xray || "X-Ray"}</option>
              <option value="ct">{du.types?.ct || "CT Scan"}</option>
              <option value="mri">{du.types?.mri || "MRI"}</option>
              <option value="ultrasound">{du.types?.ultrasound || "Ultrasound"}</option>
            </select>
          </div>

          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.dcm"
              onChange={handleChange}
              className="hidden"
            />
            <div className="space-y-2">
              <div className="text-3xl">📁</div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{du.dragDrop || "Drag and drop files here"} {du.orText || "or"} {du.selectFiles || "select files"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">صور JPG, PNG, أو ملفات DICOM</p>
            </div>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">الملفات المختارة</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-lg">📄</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{du.notes || "Additional Notes"}</label>
            <textarea
              placeholder="أي ملاحظات حول الأشعة؟"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !patientName || files.length === 0}
            className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-medium py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 transition"
          >
            {uploading ? `${du.uploading || "Uploading..."} ${Math.round(progress)}%` : du.upload || "Upload"}
          </button>

          {/* Progress Bar */}
          {uploading && (
            <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-linear-to-r from-blue-600 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{du.recentUploads || "Recent Uploads"}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-300 dark:border-slate-600">
              <tr>
                <th className="text-right py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">{du.patientName || "Patient"}</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">{du.imageType || "Type"}</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">{du.date || "Date"}</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">{du.status || "Status"}</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">{du.notes || "Notes"}</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentUploads[locale]?.map((upload) => (
                <tr key={upload.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{upload.patientName}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{upload.type}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{upload.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      upload.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {upload.status === "completed" ? du.statuses?.completed || "Completed" : du.statuses?.reviewing || "Under Review"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{upload.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
