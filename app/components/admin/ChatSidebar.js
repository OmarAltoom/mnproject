export default function ChatSidebar({ chats, onSelect }) {
  return (
    <aside className="w-64 h-full bg-white shadow-lg p-4">
      <h3 className="font-bold text-lg mb-4 text-yellow-700">قائمة الدردشات</h3>
      <ul className="space-y-3">
        {chats.map(chat => (
          <li key={chat.id} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 shadow cursor-pointer hover:bg-yellow-100" onClick={() => onSelect(chat)}>
            <span className="font-bold text-zinc-700">{chat.doctor}</span>
            <span className="mx-2 text-zinc-400">→</span>
            <span className="font-bold text-zinc-700">{chat.patient}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
