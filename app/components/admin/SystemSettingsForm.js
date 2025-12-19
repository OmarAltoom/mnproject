export default function SystemSettingsForm({ onSave }) {
  return (
    <form className="max-w-2xl mx-auto mt-10 bg-white rounded-3xl shadow-xl border-2 border-yellow-100 p-8 flex flex-col gap-8" onSubmit={e => {e.preventDefault(); onSave && onSave();}}>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-zinc-700">اسم النظام</label>
        <input type="text" className="rounded-xl border border-zinc-200 px-4 py-3" placeholder="مثال: نظام إدارة الأشعة" defaultValue="نظام إدارة الأشعة" />
      </div>
      <button type="submit" className="mt-2 px-8 py-4 rounded-full bg-yellow-500 text-white font-bold text-lg shadow">حفظ الإعدادات</button>
    </form>
  );
}
