import { FaUserShield, FaPalette, FaBell, FaSave } from "react-icons/fa";

export default function AdminSettingsForm() {
  return (
    <form className="max-w-2xl mx-auto mt-10 bg-white rounded-3xl shadow-xl border-2 border-yellow-100 p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-zinc-700 flex items-center gap-2"><FaUserShield className="text-yellow-500" /> اسم النظام</label>
        <input type="text" className="rounded-xl border border-zinc-200 px-4 py-3 focus:ring-2 focus:ring-yellow-300 outline-none" placeholder="مثال: نظام إدارة الأشعة" defaultValue="نظام إدارة الأشعة" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-zinc-700 flex items-center gap-2"><FaPalette className="text-red-400" /> اللون الرئيسي</label>
        <input type="color" className="w-16 h-10 rounded-xl border border-zinc-200 cursor-pointer" defaultValue="#FFD600" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-zinc-700 flex items-center gap-2"><FaBell className="text-yellow-600" /> تفعيل الإشعارات</label>
        <select className="rounded-xl border border-zinc-200 px-4 py-3 focus:ring-2 focus:ring-yellow-300 outline-none">
          <option>مفعّل</option>
          <option>غير مفعّل</option>
        </select>
      </div>
      <button type="submit" className="mt-2 px-8 py-4 rounded-full bg-linear-to-r from-yellow-400 via-red-400 to-red-600 text-white font-bold text-lg shadow hover:scale-105 flex items-center gap-2 mx-auto">
        <FaSave /> حفظ الإعدادات
      </button>
    </form>
  );
}
