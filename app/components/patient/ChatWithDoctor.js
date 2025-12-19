"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatWithDoctor({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">الدردشة مع الطبيب</h2>
      </header>
      <div className="flex h-96 flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[75%] rounded-md px-3 py-2 text-sm ${m.role === "patient" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"}`}>
              <div className="text-xs opacity-75">{m.role === "patient" ? "مريض" : "طبيب"}</div>
              <div>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900">
              <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-500" />
              <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: "0.1s" }} />
              <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: "0.2s" }} />
              <span>الطبيب يكتب...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <form
          className="flex items-center gap-2 border-t border-gray-200 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            setMessages((prev) => [...prev, { role: "patient", text }]);
            setText("");
            // محاكاة رد الطبيب واجهةً فقط
            setTyping(true);
            setTimeout(() => {
              setTyping(false);
              setMessages((prev) => [...prev, { role: "doctor", text: "تم استلام الرسالة، سنراجع قريبًا." }]);
            }, 1000);
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">إرسال</button>
        </form>
      </div>
    </section>
  );
}
