export default function RolesBadge({ role }) {
  let color = "bg-gray-200 text-gray-700";
  if (role === "أدمن") color = "bg-yellow-200 text-yellow-700";
  if (role === "طبيب") color = "bg-red-200 text-red-700";
  if (role === "مريض") color = "bg-blue-200 text-blue-700";
  return (
    <span className={`px-3 py-1 rounded-full font-bold text-sm ${color}`}>{role}</span>
  );
}
