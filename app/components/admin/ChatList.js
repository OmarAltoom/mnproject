export default function ChatList({ chats, onSelect }) {
  return (
    <ul className="space-y-3">
      {chats.map(chat => (
        <li key={chat.id} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow cursor-pointer hover:bg-yellow-50" onClick={() => onSelect(chat)}>
          <span className="font-bold text-zinc-700">{chat.doctor}</span>
          <span className="mx-2 text-zinc-400">→</span>
          <span className="font-bold text-zinc-700">{chat.patient}</span>
          <span className="ml-auto text-xs text-zinc-400">{chat.lastMsg}</span>
        </li>
      ))}
    </ul>
  );
}
