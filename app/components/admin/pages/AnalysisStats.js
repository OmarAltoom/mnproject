import { FaChartLine, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function AnalysisStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-yellow-200">
        <FaChartLine className="text-4xl text-yellow-500 mb-3" />
        <div className="text-2xl font-bold text-yellow-700 mb-1">230</div>
        <div className="text-zinc-700">عدد التحليلات الكلي</div>
      </div>
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-green-200">
        <FaCheckCircle className="text-4xl text-green-600 mb-3" />
        <div className="text-2xl font-bold text-green-700 mb-1">180</div>
        <div className="text-zinc-700">تحليلات ناجحة</div>
      </div>
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-red-200">
        <FaTimesCircle className="text-4xl text-red-500 mb-3" />
        <div className="text-2xl font-bold text-red-700 mb-1">50</div>
        <div className="text-zinc-700">تحليلات فاشلة</div>
      </div>
    </div>
  );
}
