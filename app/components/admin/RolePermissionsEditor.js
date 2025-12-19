import { useState } from "react";

const roles = ["أدمن", "طبيب", "مريض"];
const permissions = ["قراءة", "كتابة", "تعديل", "حذف"];

export default function RolePermissionsEditor() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [rolePerms, setRolePerms] = useState({
    "أدمن": ["قراءة", "كتابة", "تعديل", "حذف"],
    "طبيب": ["قراءة", "كتابة", "تعديل"],
    "مريض": ["قراءة"]
  });

  const togglePerm = (perm) => {
    setRolePerms(prev => {
      const perms = prev[selectedRole];
      return {
        ...prev,
        [selectedRole]: perms.includes(perm)
          ? perms.filter(p => p !== perm)
          : [...perms, perm]
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-100 max-w-xl mx-auto mt-8">
      <h3 className="font-bold text-xl mb-4 text-yellow-700">تعديل صلاحيات الدور</h3>
      <select className="mb-4 px-4 py-2 border rounded" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
        {roles.map(role => <option key={role} value={role}>{role}</option>)}
      </select>
      <div className="flex gap-4 flex-wrap">
        {permissions.map(perm => (
          <label key={perm} className="flex items-center gap-2">
            <input type="checkbox" checked={rolePerms[selectedRole].includes(perm)} onChange={() => togglePerm(perm)} />
            {perm}
          </label>
        ))}
      </div>
    </div>
  );
}
