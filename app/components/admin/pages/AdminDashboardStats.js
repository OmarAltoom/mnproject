import { FaUserMd, FaUserInjured, FaUsers, FaChartBar, FaCogs, FaComments } from "react-icons/fa";

export default function AdminDashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-yellow-200">
        <FaUsers className="text-4xl text-yellow-500 mb-3" />
        <div className="text-2xl font-bold text-yellow-700 mb-1">120</div>
        <div className="text-zinc-700">إجمالي المستخدمين</div>
      </div>
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-red-200">
        <FaUserMd className="text-4xl text-red-500 mb-3" />
        <div className="text-2xl font-bold text-red-700 mb-1">35</div>
        <div className="text-zinc-700">عدد الأطباء</div>
      </div>
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-yellow-300">
        <FaUserInjured className="text-4xl text-yellow-600 mb-3" />
        <div className="text-2xl font-bold text-yellow-800 mb-1">85</div>
        <div className="text-zinc-700">عدد المرضى</div>
      </div>
    </div>
  );
}
