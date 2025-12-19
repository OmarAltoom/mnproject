export default function ChatSearch({ value, onChange }) {
  return (
    <div className="my-2">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="بحث في الدردشات..."
        className="w-full px-3 py-2 border rounded shadow-sm"
      />
    </div>
  );
}
