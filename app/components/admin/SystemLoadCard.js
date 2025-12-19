import React from "react";
import { FaServer } from "react-icons/fa";

export default function SystemLoadCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-green-200 mt-8">
      <FaServer className="text-4xl text-green-500 mb-3" />
      <div className="text-2xl font-bold mb-1">%65</div>
      <div className="text-zinc-700">استهلاك النظام الحالي</div>
    </div>
  );
}
