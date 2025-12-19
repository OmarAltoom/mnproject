import ChatMessage from "./ChatMessage";

export default function ChatViewer({ messages }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-100 mt-8 max-h-96 overflow-y-auto">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} isDoctor={msg.isDoctor} />
      ))}
    </div>
  );
}
