import { FaChartBar, FaChartPie, FaChartArea } from "react-icons/fa";

export default function AnalysisCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center border-2 border-yellow-200">
        <FaChartBar className="text-3xl text-yellow-500 mb-2" />
        <span className="font-bold text-zinc-700 mb-2">إحصائية شهرية</span>
        <div className="w-full h-24 bg-linear-to-r from-yellow-100 via-red-100/40 to-white rounded-xl" />
      </div>
      <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center border-2 border-red-200">
        <FaChartPie className="text-3xl text-red-500 mb-2" />
        <span className="font-bold text-zinc-700 mb-2">نسبة النجاح</span>
        <div className="w-full h-24 bg-linear-to-r from-yellow-100 via-red-100/40 to-white rounded-xl" />
      </div>
      <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center border-2 border-yellow-300">
        <FaChartArea className="text-3xl text-yellow-600 mb-2" />
        <span className="font-bold text-zinc-700 mb-2">توزيع الحالات</span>
        <div className="w-full h-24 bg-linear-to-r from-yellow-100 via-red-100/40 to-white rounded-xl" />
      </div>
    </div>
  );
}
