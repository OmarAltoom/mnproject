export default function PatientHistoryList({ history }) {
  if (!history || history.length === 0) return (
    <div className="text-center text-gray-400 py-4">لا يوجد سجل للمريض.</div>
  );
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-yellow-100 mt-8">
      <h3 className="font-bold text-lg mb-4 text-yellow-700">سجل المريض</h3>
      <ul className="space-y-3">
        {history.map((item, idx) => (
          <li key={idx} className="flex justify-between text-zinc-700">
            <span>{item.event}</span>
            <span className="text-xs text-zinc-400">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
