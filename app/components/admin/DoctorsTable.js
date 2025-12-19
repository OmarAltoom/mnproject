
import { FaUserMd, FaUserPlus } from "react-icons/fa";
import SpecialtyBadge from "./SpecialtyBadge";
import Button from "@/app/components/ui/Button";
import { Table, THead, TRow, TH, TD } from "@/app/components/ui/Table";
import Pagination from "@/app/components/ui/Pagination";

// Bilingual labels
const LABELS = {
  en: {
    name: "Name",
    specialty: "Specialty",
    email: "Email",
    license: "License No.",
    phone: "Phone",
    status: "Status",
    actions: "Actions",
    approve: "Approve",
    reject: "Reject",
    details: "Details",
    edit: "Edit",
    delete: "Delete",
    add: "Add Doctor",
    statusLabels: {
      pending: "Pending",
      verified: "Verified",
      rejected: "Rejected",
    },
  },
  ar: {
    name: "الاسم",
    specialty: "التخصص",
    email: "البريد الإلكتروني",
    license: "رقم الترخيص",
    phone: "رقم الجوال",
    status: "الحالة",
    actions: "إجراءات",
    approve: "قبول",
    reject: "رفض",
    details: "تفاصيل",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة طبيب جديد",
    statusLabels: {
      pending: "قيد المراجعة",
      verified: "موثق",
      rejected: "مرفوض",
    },
  },
};

export default function DoctorsTable({ doctors, onEdit, onDelete, onDetails, onAdd, onApprove, onReject, page = 1, pageCount = 1, onPageChange, locale = 'en' }) {
  const t = LABELS[locale];
  return (
    <div className="mt-8">
      <Table>
        <THead>
          <TRow className="bg-linear-to-r from-yellow-100 via-red-100/40 to-white dark:from-zinc-800 dark:via-zinc-800/60 dark:to-zinc-900">
            <TH>#</TH>
            <TH>{t.name}</TH>
            <TH>{t.specialty}</TH>
            <TH>{t.license}</TH>
            <TH>{t.phone}</TH>
            <TH>{t.email}</TH>
            <TH>{t.status}</TH>
            <TH>{t.actions}</TH>
          </TRow>
        </THead>
        <tbody>
          {doctors.map((doctor, i) => (
            <TRow key={doctor.id} className="hover:bg-yellow-50/40 dark:hover:bg-zinc-800/40">
              <TD className="text-center font-bold">{i + 1}</TD>
              <TD className="text-center">
                <span className="inline-flex items-center gap-2 justify-center">
                  <FaUserMd className="text-yellow-600" />{doctor.name}
                </span>
              </TD>
              <TD className="text-center"><SpecialtyBadge specialty={doctor.specialty} /></TD>
              <TD className="text-center">{doctor.licenseNumber}</TD>
              <TD className="text-center">{doctor.phone}</TD>
              <TD className="text-center">{doctor.email}</TD>
              <TD className="text-center">
                {doctor.status === 'pending' ? (
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-bold text-xs">{t.statusLabels.pending}</span>
                ) : doctor.status === 'verified' ? (
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 font-bold text-xs">{t.statusLabels.verified}</span>
                ) : doctor.status === 'rejected' ? (
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs">{t.statusLabels.rejected}</span>
                ) : (
                  <span>{doctor.status}</span>
                )}
              </TD>
              <TD>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Button variant="ghost" className="px-3 py-2" title={t.edit} onClick={() => onEdit(doctor)}>{t.edit}</Button>
                  <Button variant="ghost" className="px-3 py-2 text-red-700" title={t.delete} onClick={() => onDelete(doctor)}>{t.delete}</Button>
                  <Button variant="ghost" className="px-3 py-2 text-blue-700" title={t.details} onClick={() => onDetails(doctor)}>{t.details}</Button>
                  {doctor.status === 'pending' && (
                    <>
                      <Button variant="ghost" className="px-3 py-2 text-green-700" title={t.approve} onClick={() => onApprove?.(doctor)}>{t.approve}</Button>
                      <Button variant="ghost" className="px-3 py-2 text-red-700" title={t.reject} onClick={() => onReject?.(doctor)}>{t.reject}</Button>
                    </>
                  )}
                </div>
              </TD>
            </TRow>
          ))}
        </tbody>
      </Table>

      <div className="flex items-center justify-between mt-6">
        <Button variant="primary" className="px-6" onClick={onAdd}>
          <span className="inline-flex items-center gap-2"><FaUserPlus /> {t.add}</span>
        </Button>
        <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
