export default function ChatSystem() {
  // بيانات دردشة وهمية
  const patients = [
    { id: 1, name: "Mohamed Salah", lastMsg: "Thank you, doctor!", time: "10:30" },
    { id: 2, name: "Sara Ali", lastMsg: "I uploaded my X-ray.", time: "09:15" },
  ];
  const messages = [
    { from: "doctor", text: "Hello, how can I help you?", time: "10:00" },
    { from: "patient", text: "I have a cough.", time: "10:01" },
    { from: "doctor", text: "Please upload your X-ray.", time: "10:02" },
    { from: "patient", text: "I uploaded my X-ray.", time: "10:15" },
    { from: "doctor", text: "Thank you, doctor!", time: "10:30" },
  ];
  return (
    <section className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow p-6 mt-4 flex flex-col md:flex-row gap-4" style={{minHeight: 320}}>
      {/* Chat Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-200 dark:border-zinc-800 pr-4 mb-4 md:mb-0">
        <h4 className="font-bold mb-2">Patients</h4>
        <ul>
          {patients.map((p) => (
            <li key={p.id} className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span>{p.name}</span>
              <span className="text-xs text-zinc-400">{p.time}</span>
            </li>
          ))}
        </ul>
      </aside>
      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "doctor" ? "justify-end" : "justify-start"} mb-1`}>
              <div className={`rounded-xl px-4 py-2 max-w-xs ${msg.from === "doctor" ? "bg-blue-600 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50"}`}>
                <span>{msg.text}</span>
                <span className="block text-xs text-zinc-300 mt-1 text-right">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        <form className="flex gap-2">
          <input type="text" placeholder="Type a message..." className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-zinc-50" />
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Send</button>
        </form>
      </div>
    </section>
  );
}
