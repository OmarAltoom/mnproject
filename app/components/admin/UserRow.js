import RolesBadge from "./RolesBadge";

export default function UserRow({ user, onEdit, onDelete, onDetails }) {
  return (
    <tr className="border-t border-zinc-100 hover:bg-yellow-50/40">
      <td className="py-2 px-4 text-center font-bold">{user.id}</td>
      <td className="py-2 px-4 text-center">{user.name}</td>
      <td className="py-2 px-4 text-center">{user.email}</td>
      <td className="py-2 px-4 text-center"><RolesBadge role={user.role} /></td>
      <td className="py-2 px-4 flex items-center justify-center gap-3">
        <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700" title="تعديل" onClick={() => onEdit(user)}>تعديل</button>
        <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700" title="حذف" onClick={() => onDelete(user)}>حذف</button>
        <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700" title="تفاصيل" onClick={() => onDetails(user)}>تفاصيل</button>
      </td>
    </tr>
  );
}
