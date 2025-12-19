import { FaUserMd, FaUserInjured, FaComments } from "react-icons/fa";

export default function AdminChatList() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {[{
        id: 1, doctor: "د. محمد سالم", patient: "منى عبد الله", lastMsg: "تم إرسال النتائج.", time: "قبل دقيقة"
      }, {
        id: 2, doctor: "د. ليلى حسن", patient: "سعيد حسن", lastMsg: "يرجى رفع صورة الأشعة.", time: "قبل 5 دقائق"
      }, {
        id: 3, doctor: "د. سامي يوسف", patient: "هالة يوسف", lastMsg: "تمت مراجعة الحالة.", time: "قبل 10 دقائق"
      }].map((chat) => (
        <div key={chat.id} className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <FaUserMd className="text-yellow-600 text-xl" />
            <span className="font-bold text-zinc-700">{chat.doctor}</span>
            <span className="mx-2 text-zinc-400">→</span>
            <FaUserInjured className="text-red-400 text-xl" />
            <span className="font-bold text-zinc-700">{chat.patient}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <FaComments className="text-yellow-400" />
            <span>{chat.lastMsg}</span>
            <span className="ml-auto text-xs text-zinc-400">{chat.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
