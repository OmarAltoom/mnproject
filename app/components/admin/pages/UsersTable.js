import { FaUserPlus } from "react-icons/fa";
import UserRow from "../UserRow";

export default function UsersTable({ users, onEdit, onDelete, onDetails, onAdd }) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white rounded-2xl shadow-xl border border-zinc-200">
        <thead>
          <tr className="bg-linear-to-r from-yellow-100 via-red-100/40 to-white">
            <th className="py-3 px-4 text-zinc-700 font-bold">#</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">الاسم</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">البريد الإلكتروني</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">الدور</th>
            <th className="py-3 px-4 text-zinc-700 font-bold">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} onDetails={onDetails} />
          ))}
        </tbody>
      </table>
      <button className="mt-6 px-8 py-3 rounded-full bg-linear-to-r from-yellow-400 via-red-400 to-red-600 text-white font-bold text-lg shadow hover:scale-105 flex items-center gap-2 mx-auto" onClick={onAdd}>
        <FaUserPlus /> إضافة مستخدم جديد
      </button>
    </div>
  );
}
