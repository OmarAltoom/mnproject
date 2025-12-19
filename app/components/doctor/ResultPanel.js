export default function ResultPanel() {
  // بيانات نتيجة وهمية
  const result = {
    diagnosis: "Pneumonia",
    confidence: "92%",
    time: "3.2s",
  };
  return (
    <section className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow p-6 mt-4">
      <h3 className="text-lg font-bold mb-4 text-black dark:text-zinc-50">Result</h3>
      <div className="mb-2">Diagnosis: <span className="font-semibold">{result.diagnosis}</span></div>
      <div className="mb-2">Confidence: {result.confidence}</div>
      <div className="mb-2">Time: {result.time}</div>
      <button className="mt-2 w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Save</button>
    </section>
  );
}
