"use client";

export default function PatientSettings({ onSave }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">إعدادات الحساب</h2>
      </header>
      <form
        className="space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave?.();
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm text-gray-700">كلمة المرور الجديدة</label>
            <input type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-700">البريد الإلكتروني</label>
            <input type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm text-gray-700">خصوصية الظهور للطبيب</label>
            <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option>مرئي بالكامل</option>
              <option>مخفى بعض المعلومات</option>
              <option>خاص</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700">اللغة والمظهر</label>
            <div className="mt-1 flex gap-2">
              <select className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>العربية</option>
                <option>English</option>
              </select>
              <select className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>فاتح</option>
                <option>داكن</option>
              </select>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">حفظ</button>
        </div>
      </form>
    </section>
  );
}
