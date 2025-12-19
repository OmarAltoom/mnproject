import { FaUserInjured, FaUserEdit, FaUserTimes, FaUserPlus } from "react-icons/fa";

export default function PatientsTable() {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white rounded-2xl shadow-xl border border-zinc-200">
        <thead>
          <tr className="bg-linear-to-r from-yellow-100 via-red-100/40 to-white">
            <th className="py-3 px-4 text-zinc-700 font-bold">#</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">الاسم</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">العمر</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">البريد الإلكتروني</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {[{
            id: 1, name: "منى عبد الله", age: 32, email: "mona@patient.com"
          }, {
            id: 2, name: "سعيد حسن", age: 45, email: "saeed@patient.com"
          }, {
            id: 3, name: "هالة يوسف", age: 28, email: "hala@patient.com"
          }].map((patient, i) => (
            <tr key={patient.id} className="border-t border-zinc-100 hover:bg-yellow-50/40">
              <td className="py-2 px-4 text-center font-bold">{i+1}</td>
              <td className="py-2 px-4 text-center flex items-center gap-2 justify-center"><FaUserInjured className="text-red-400" />{patient.name}</td>
              <td className="py-2 px-4 text-center">{patient.age}</td>
              <td className="py-2 px-4 text-center">{patient.email}</td>
              <td className="py-2 px-4 flex items-center justify-center gap-3">
                <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700" title="تعديل"><FaUserEdit /></button>
                <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700" title="حذف"><FaUserTimes /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 px-8 py-3 rounded-full bg-linear-to-r from-yellow-400 via-red-400 to-red-600 text-white font-bold text-lg shadow hover:scale-105 flex items-center gap-2 mx-auto">
        <FaUserPlus /> إضافة مريض جديد
      </button>
    </div>
  );
}
