import React from "react";
import { FaComments } from "react-icons/fa";

export default function RecentChats() {
  const chats = [
    { id: 1, doctor: "د. محمد سالم", patient: "منى عبد الله", lastMsg: "تم إرسال النتائج." },
    { id: 2, doctor: "د. ليلى حسن", patient: "سعيد حسن", lastMsg: "يرجى رفع صورة الأشعة." },
    { id: 3, doctor: "د. سامي يوسف", patient: "هالة يوسف", lastMsg: "تمت مراجعة الحالة." },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-red-100 mt-8">
      <h3 className="font-bold text-lg mb-4 text-red-700">الدردشات الأخيرة</h3>
      <ul className="space-y-3">
        {chats.map(chat => (
          <li key={chat.id} className="flex items-center gap-2 text-zinc-700">
            <FaComments className="text-yellow-400" />
            <span className="font-bold">{chat.doctor}</span>
            <span className="mx-2 text-zinc-400">→</span>
            <span className="font-bold">{chat.patient}</span>
            <span className="ml-2 text-xs text-zinc-400">{chat.lastMsg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
