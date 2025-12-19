import { useState } from "react";

export default function PatientFormModal({ open, onClose, onSave, patient }) {
  const [name, setName] = useState(patient?.name || "");
  const [age, setAge] = useState(patient?.age || "");
  const [email, setEmail] = useState(patient?.email || "");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl min-w-[400px] max-w-[500px] w-full flex flex-col gap-5 border border-gray-200 dark:border-zinc-800" onSubmit={e => {e.preventDefault(); onSave({ name, age, email });}}>
        <h3 className="font-bold text-2xl mb-2 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">{patient ? "تعديل مريض" : "إضافة مريض جديد"}</h3>
        <input type="text" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder="الاسم" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder="العمر" value={age} onChange={e => setAge(e.target.value)} required />
        <input type="email" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
        <div className="flex gap-3 mt-4">
          <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02]">حفظ</button>
          <button type="button" className="flex-1 px-6 py-3 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-all" onClick={onClose}>إلغاء</button>
        </div>
      </form>
    </div>
  );
}
