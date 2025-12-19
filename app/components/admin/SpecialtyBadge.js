export default function SpecialtyBadge({ specialty }) {
  let color = "bg-gray-200 text-gray-700";
  if (specialty === "أشعة") color = "bg-yellow-200 text-yellow-700";
  if (specialty === "صدرية") color = "bg-red-200 text-red-700";
  if (specialty === "عظام") color = "bg-blue-200 text-blue-700";
  return (
    <span className={`px-3 py-1 rounded-full font-bold text-sm ${color}`}>{specialty}</span>
  );
}
