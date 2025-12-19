"use client";
import { useState } from "react";
import { useDoctorChangeRequests, approveDoctorChangeRequest, rejectDoctorChangeRequest } from "./doctor-change-requests";
import AdminLayout from "./AdminLayout";
import useLocale from "@/app/hooks/useLocale";
import { FaCheck, FaTimes, FaUserMd, FaUser } from "react-icons/fa";

export default function DoctorChangeRequestsPage() {
  const { locale } = useLocale();
  const requests = useDoctorChangeRequests();
  const [_, setRerender] = useState(0);

  const handleApprove = (id) => {
    approveDoctorChangeRequest(id);
    setRerender(r => r + 1);
  };
  const handleReject = (id) => {
    rejectDoctorChangeRequest(id);
    setRerender(r => r + 1);
  };

  return (
    <AdminLayout breadcrumbs={[{ label: locale === "ar" ? "طلبات تغيير الطبيب" : "Doctor Change Requests", href: "/admin/doctor-change-requests" }]}> 
      <div className="py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-6">{locale === "ar" ? "طلبات تغيير الطبيب" : "Doctor Change Requests"}</h1>
        {requests.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-8 text-center">
            <FaUserMd size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {locale === "ar" ? "لا توجد طلبات تغيير طبيب حالياً" : "No doctor change requests yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {requests.map(req => (
              <div key={req.id} className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-l-4 border-yellow-500">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <FaUser size={20} className="text-blue-500" />
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{req.patientName || (locale === "ar" ? "مريض مجهول" : "Unknown Patient")}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{locale === "ar" ? "الطبيب الجديد:" : "New Doctor:"}</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{req.newDoctorLabel}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{locale === "ar" ? "سبب التغيير:" : "Reason:"}</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{req.reason}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{locale === "ar" ? "الحالة:" : "Status:"}</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${req.status === "pending" ? "bg-yellow-100 text-yellow-800" : req.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {locale === "ar"
                        ? req.status === "pending" ? "قيد المراجعة" : req.status === "approved" ? "تمت الموافقة" : "مرفوض"
                        : req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </div>
                </div>
                {req.status === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleApprove(req.id)} className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition" title={locale === "ar" ? "موافقة" : "Approve"}>
                      <FaCheck size={18} />
                    </button>
                    <button onClick={() => handleReject(req.id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition" title={locale === "ar" ? "رفض" : "Reject"}>
                      <FaTimes size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
