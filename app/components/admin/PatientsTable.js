import { FaUserInjured, FaUserPlus } from "react-icons/fa";
import Button from "@/app/components/ui/Button";
import { Table, THead, TRow, TH, TD } from "@/app/components/ui/Table";
import Pagination from "@/app/components/ui/Pagination";

export default function PatientsTable({ patients, onEdit, onDelete, onDetails, onAdd, page = 1, pageCount = 1, onPageChange }) {
  return (
    <div className="mt-8">
      <Table>
        <THead>
          <TRow className="bg-linear-to-r from-yellow-100 via-red-100/40 to-white dark:from-zinc-800 dark:via-zinc-800/60 dark:to-zinc-900">
            <TH>#</TH>
            <TH>الاسم</TH>
            <TH>العمر</TH>
            <TH>البريد الإلكتروني</TH>
            <TH>إجراءات</TH>
          </TRow>
        </THead>
        <tbody>
          {patients.map((patient, i) => (
            <TRow key={patient.id} className="hover:bg-yellow-50/40 dark:hover:bg-zinc-800/40">
              <TD className="text-center font-bold">{i + 1}</TD>
              <TD className="text-center">
                <span className="inline-flex items-center gap-2 justify-center">
                  <FaUserInjured className="text-red-400" />{patient.name}
                </span>
              </TD>
              <TD className="text-center">{patient.age}</TD>
              <TD className="text-center">{patient.email}</TD>
              <TD>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" className="px-3 py-2" title="تعديل" onClick={() => onEdit(patient)}>تعديل</Button>
                  <Button variant="ghost" className="px-3 py-2 text-red-700" title="حذف" onClick={() => onDelete(patient)}>حذف</Button>
                  <Button variant="ghost" className="px-3 py-2 text-blue-700" title="تفاصيل" onClick={() => onDetails(patient)}>تفاصيل</Button>
                </div>
              </TD>
            </TRow>
          ))}
        </tbody>
      </Table>

      <div className="flex items-center justify-between mt-6">
        <Button variant="primary" className="px-6" onClick={onAdd}>
          <span className="inline-flex items-center gap-2"><FaUserPlus /> إضافة مريض جديد</span>
        </Button>
        <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
