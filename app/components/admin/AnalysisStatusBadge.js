export default function AnalysisStatusBadge({ status }) {
  let color = "bg-gray-200 text-gray-700";
  if (status === "ناجح") color = "bg-green-200 text-green-700";
  if (status === "فاشل") color = "bg-red-200 text-red-700";
  if (status === "قيد الانتظار") color = "bg-yellow-200 text-yellow-700";
  return (
    <span className={`px-3 py-1 rounded-full font-bold text-sm ${color}`}>{status}</span>
  );
}
