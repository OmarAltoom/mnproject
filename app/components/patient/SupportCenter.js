"use client";

export default function SupportCenter() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">مركز الدعم</h2>
      </header>
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <form
          className="space-y-3 rounded-md border border-gray-200 bg-white p-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("تم إرسال المشكلة (واجهة فقط)");
          }}
        >
          <div className="text-sm font-medium text-gray-900">إرسال مشكلة</div>
          <input placeholder="العنوان" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <textarea placeholder="الوصف" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" rows={4} />
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">إرسال</button>
        </form>

        <div className="space-y-3 rounded-md border border-gray-200 bg-white p-3">
          <div className="text-sm font-medium text-gray-900">الأسئلة الشائعة</div>
          <ul className="list-disc space-y-1 pl-4 text-sm text-gray-800">
            <li>كيف أحمّل صورة أشعة؟</li>
            <li>كيف أطلب مراجعة من الطبيب؟</li>
            <li>كيف أعدّل بيانات الحساب؟</li>
          </ul>
          <div className="text-sm text-gray-700">حالة الطلبات: قيد التطوير (واجهة فقط)</div>
        </div>
      </div>
    </section>
  );
}
