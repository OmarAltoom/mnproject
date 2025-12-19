export default function ChatMessage({ message, isDoctor }) {
  return (
    <div className={`flex ${isDoctor ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs px-4 py-2 rounded-xl shadow ${isDoctor ? 'bg-yellow-100 text-yellow-800' : 'bg-zinc-100 text-zinc-700'}`}>
        {message.text}
        <div className="text-xs text-zinc-400 mt-1">{message.time}</div>
      </div>
    </div>
  );
}
