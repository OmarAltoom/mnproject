
import SpecialtyBadge from "./SpecialtyBadge";
import { useEffect, useState } from "react";

const LABELS = {
  en: {
    details: "Doctor Details",
    name: "Name",
    email: "Email",
    specialty: "Specialty",
    license: "License No.",
    phone: "Phone",
    status: "Status",
    approve: "Approve",
    reject: "Reject",
    close: "Close",
    pending: "Pending",
    verified: "Verified",
    rejected: "Rejected",
  },
  ar: {
    details: "تفاصيل الطبيب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    specialty: "التخصص",
    license: "رقم الترخيص",
    phone: "رقم الجوال",
    status: "الحالة",
    approve: "قبول",
    reject: "رفض",
    close: "إغلاق",
    pending: "قيد المراجعة",
    verified: "موثق",
    rejected: "مرفوض",
  },
};

function getLocale() {
  if (typeof window !== 'undefined') {
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }
  return 'en';
}

export default function DoctorDetailsCard({ doctor, onClose, onApprove, onReject }) {
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    setLocale(getLocale());
  }, []);
  const t = LABELS[locale];
  if (!doctor) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100 max-w-md mx-auto mt-8">
      <h3 className="font-bold text-xl mb-4 text-red-700">{t.details}</h3>
      <div className="mb-2"><span className="font-bold">{t.name}:</span> {doctor.name}</div>
      <div className="mb-2"><span className="font-bold">{t.email}:</span> {doctor.email}</div>
      <div className="mb-2"><span className="font-bold">{t.specialty}:</span> <SpecialtyBadge specialty={doctor.specialty} /></div>
      <div className="mb-2"><span className="font-bold">{t.license}:</span> {doctor.licenseNumber}</div>
      <div className="mb-2"><span className="font-bold">{t.phone}:</span> {doctor.phone}</div>
      <div className="mb-2"><span className="font-bold">{t.status}:</span> {doctor.status === 'Pending' || doctor.status === 'قيد المراجعة' ? t.pending : doctor.status === 'Verified' || doctor.status === 'موثق' ? t.verified : doctor.status === 'Rejected' || doctor.status === 'مرفوض' ? t.rejected : doctor.status}</div>
      {(doctor.status === 'Pending' || doctor.status === 'قيد المراجعة') && (
        <div className="flex gap-3 mt-6">
          <button className="flex-1 px-6 py-2 rounded-full bg-green-500 text-white font-bold" onClick={() => onApprove?.(doctor)}>{t.approve}</button>
          <button className="flex-1 px-6 py-2 rounded-full bg-red-500 text-white font-bold" onClick={() => onReject?.(doctor)}>{t.reject}</button>
        </div>
      )}
      <button className="mt-6 px-6 py-2 rounded-full bg-gray-400 text-white font-bold w-full" onClick={onClose}>{t.close}</button>
    </div>
  );
}
