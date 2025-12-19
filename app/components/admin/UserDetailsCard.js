import RolesBadge from "./RolesBadge";

export default function UserDetailsCard({ user, onClose }) {
  if (!user) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-100 max-w-md mx-auto mt-8">
      <h3 className="font-bold text-xl mb-4 text-yellow-700">تفاصيل المستخدم</h3>
      <div className="mb-2"><span className="font-bold">الاسم:</span> {user.name}</div>
      <div className="mb-2"><span className="font-bold">البريد الإلكتروني:</span> {user.email}</div>
      <div className="mb-2"><span className="font-bold">الدور:</span> <RolesBadge role={user.role} /></div>
      <button className="mt-6 px-6 py-2 rounded-full bg-yellow-400 text-white font-bold" onClick={onClose}>إغلاق</button>
    </div>
  );
}
