import AnalysisStatusBadge from "./AnalysisStatusBadge";
import Button from "@/app/components/ui/Button";
import { Table, THead, TRow, TH, TD } from "@/app/components/ui/Table";
import Pagination from "@/app/components/ui/Pagination";

export default function AnalysesTable({ analyses, onView, onDetails, onCompare, page = 1, pageCount = 1, onPageChange }) {
  return (
    <div className="mt-8">
      <Table>
        <THead>
          <TRow className="bg-linear-to-r from-yellow-100 via-red-100/40 to-white dark:from-zinc-800 dark:via-zinc-800/60 dark:to-zinc-900">
            <TH>#</TH>
            <TH>اسم المريض</TH>
            <TH>تاريخ التحليل</TH>
            <TH>الحالة</TH>
            <TH>إجراءات</TH>
          </TRow>
        </THead>
        <tbody>
          {analyses.map((analysis, i) => (
            <TRow key={analysis.id} className="hover:bg-yellow-50/40 dark:hover:bg-zinc-800/40">
              <TD className="text-center font-bold">{i + 1}</TD>
              <TD className="text-center">{analysis.patientName}</TD>
              <TD className="text-center">{analysis.date}</TD>
              <TD className="text-center"><AnalysisStatusBadge status={analysis.status} /></TD>
              <TD>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" className="px-3 py-2 text-blue-700" title="عرض" onClick={() => onView(analysis)}>عرض</Button>
                  <Button variant="ghost" className="px-3 py-2" title="تفاصيل" onClick={() => onDetails(analysis)}>تفاصيل</Button>
                  <Button variant="ghost" className="px-3 py-2 text-green-700" title="مقارنة" onClick={() => onCompare(analysis)}>مقارنة</Button>
                </div>
              </TD>
            </TRow>
          ))}
        </tbody>
      </Table>
      <div className="flex items-center justify-end mt-6">
        <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
