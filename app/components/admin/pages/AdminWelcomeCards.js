import Image from "next/image";

export default function AdminWelcomeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-yellow-200">
        <Image src="/icons/ai.svg" alt="AI" width={56} height={56} className="mb-4" />
        <h3 className="text-xl font-bold mb-2 text-yellow-700">لوحة التحكم</h3>
        <p className="text-zinc-700 text-center">إدارة النظام والإحصائيات العامة.</p>
      </div>
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-red-200">
        <Image src="/icons/users.svg" alt="Users" width={56} height={56} className="mb-4" />
        <h3 className="text-xl font-bold mb-2 text-red-700">المستخدمون</h3>
        <p className="text-zinc-700 text-center">إدارة حسابات المستخدمين والصلاحيات.</p>
      </div>
      <div className="bg-linear-to-br from-yellow-100 via-red-100/40 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border-2 border-yellow-300">
        <Image src="/icons/settings.svg" alt="Settings" width={56} height={56} className="mb-4" />
        <h3 className="text-xl font-bold mb-2 text-yellow-800">الإعدادات</h3>
        <p className="text-zinc-700 text-center">ضبط إعدادات النظام والتطبيق.</p>
      </div>
    </div>
  );
}
