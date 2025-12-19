"use client";
import React, { useState } from "react";
import DoctorSettingsModal from "../../../doctor/components/DoctorSettingsModal";
import ErrorBoundary from "../../../doctor/components/ErrorBoundary";
import SkeletonLoader from "../../../doctor/components/SkeletonLoader";
import ConfirmationDialog from "../../../doctor/components/ConfirmationDialog";

const initialDoctor = {
  availability: { days: "الأحد - الخميس", start: "08:00", end: "16:00" },
  notifications: { email: true, sms: false, inApp: true },
  password: ""
};

export default function SettingsPageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [doctor, setDoctor] = useState(initialDoctor);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = (settings) => {
    setLoading(true);
    setTimeout(() => {
      setDoctor(settings);
      setLoading(false);
    }, 1200);
  };

  const handleSensitiveAction = () => {
    setShowConfirm(true);
  };

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">إعدادات الحساب</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModalOpen(true)}>
          فتح نافذة الإعدادات
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleSensitiveAction}>
          إجراء حساس (مثال حذف الحساب)
        </button>
        {loading && <SkeletonLoader height={32} count={2} />}
        <DoctorSettingsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          doctor={doctor}
          onSave={handleSave}
        />
        <ConfirmationDialog
          open={showConfirm}
          message="هل أنت متأكد من تنفيذ هذا الإجراء الحساس؟"
          onConfirm={() => { setShowConfirm(false); /* تنفيذ الإجراء */ }}
          onCancel={() => setShowConfirm(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
